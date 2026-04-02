import { createHash } from 'crypto'
import { createClient } from 'next-sanity'
import type { PortableTextBlock } from 'sanity'
import { apiVersion, dataset, projectId } from '@/sanity/env'
import { type SupportedLanguage } from '@/types/blog'
import { type UnifiedEvent } from '@/types/unified-event'

export interface LegacyEventDocument {
  _id: string
  _type: 'event'
  language?: SupportedLanguage
  translationKey?: string
  title?: string
  slug?: {
    current?: string
  }
  dateTime?: string
  endDateTime?: string
  location?: string
  isComingSoon?: boolean
  rsvpCount?: number
  rsvpVoterHashes?: string[]
  mainImage?: UnifiedEvent['mainImage']
  description?: PortableTextBlock[]
  recap?: PortableTextBlock[]
}

export interface MigrationConflict {
  field: string
  valuesByLanguage: Partial<Record<SupportedLanguage, string>>
  chosenLanguage: SupportedLanguage
  chosenValue: string
}

export interface UnifiedEventMigrationRecord {
  targetId: string
  translationKey: string
  sourceEventIds: string[]
  unifiedEvent: UnifiedEvent & { _type: 'unifiedEvent' }
  conflicts: MigrationConflict[]
  missingLanguages: SupportedLanguage[]
}

const localizedFieldNames = ['title', 'slug', 'description', 'recap'] as const

const migrationLanguages: SupportedLanguage[] = ['cs', 'en', 'de']

const stringifyValue = (value: unknown): string => JSON.stringify(value ?? null)
const normalizeNullable = <T>(value: T | null | undefined): T | undefined =>
  value ?? undefined

const assignLocalizedValue = <T>(
  target: Partial<Record<SupportedLanguage, T>>,
  language: SupportedLanguage,
  value: T | null | undefined
) => {
  const normalizedValue = normalizeNullable(value)

  if (normalizedValue !== undefined) {
    target[language] = normalizedValue
  }
}

const chooseCanonicalLanguage = (
  events: LegacyEventDocument[]
): SupportedLanguage => {
  const czechVariant = events.find((event) => event.language === 'cs')
  return czechVariant?.language ?? events[0]?.language ?? 'cs'
}

const resolveSharedField = <T>(
  events: LegacyEventDocument[],
  field: keyof Pick<
    LegacyEventDocument,
    | 'dateTime'
    | 'endDateTime'
    | 'location'
    | 'isComingSoon'
    | 'mainImage'
    | 'rsvpCount'
    | 'rsvpVoterHashes'
  >
): { value: T | undefined; conflict?: MigrationConflict } => {
  const chosenLanguage = chooseCanonicalLanguage(events)
  const chosenEvent =
    events.find((event) => event.language === chosenLanguage) ?? events[0]
  const chosenValue = normalizeNullable(
    chosenEvent?.[field] as T | null | undefined
  )

  const valuesByLanguage = events.reduce<
    Partial<Record<SupportedLanguage, string>>
  >((acc, event) => {
    if (!event.language) {
      return acc
    }

    acc[event.language] = stringifyValue(event[field])
    return acc
  }, {})

  const distinctValues = Array.from(new Set(Object.values(valuesByLanguage)))

  if (distinctValues.length <= 1) {
    return { value: chosenValue }
  }

  return {
    value: chosenValue,
    conflict: {
      field,
      valuesByLanguage,
      chosenLanguage,
      chosenValue: stringifyValue(chosenValue)
    }
  }
}

const toTargetId = (translationKey: string, sourceIds: string[]): string => {
  if (translationKey.length > 0) {
    return `unifiedEvent.${translationKey}`
  }

  const digest = createHash('sha256').update(sourceIds.join('|')).digest('hex')
  return `unifiedEvent.legacy-${digest.slice(0, 16)}`
}

const toUnifiedEventRecord = (
  translationKey: string,
  events: LegacyEventDocument[]
): UnifiedEventMigrationRecord => {
  const conflicts: MigrationConflict[] = []

  const dateTimeResult = resolveSharedField<string>(events, 'dateTime')
  const endDateTimeResult = resolveSharedField<string>(events, 'endDateTime')
  const locationResult = resolveSharedField<string>(events, 'location')
  const isComingSoonResult = resolveSharedField<boolean>(events, 'isComingSoon')
  const mainImageResult = resolveSharedField<UnifiedEvent['mainImage']>(
    events,
    'mainImage'
  )
  const rsvpCountResult = resolveSharedField<number>(events, 'rsvpCount')
  const rsvpHashesResult = resolveSharedField<string[]>(
    events,
    'rsvpVoterHashes'
  )

  for (const result of [
    dateTimeResult,
    endDateTimeResult,
    locationResult,
    isComingSoonResult,
    mainImageResult,
    rsvpCountResult,
    rsvpHashesResult
  ]) {
    if (result.conflict) {
      conflicts.push(result.conflict)
    }
  }

  const title = { _type: 'localizedString' } as UnifiedEvent['title'] & {
    _type: 'localizedString'
  }
  const slug = { _type: 'localizedSlug' } as UnifiedEvent['slug'] & {
    _type: 'localizedSlug'
  }
  const description = {
    _type: 'localizedBlockContent'
  } as UnifiedEvent['description'] & { _type: 'localizedBlockContent' }
  const recap = {
    _type: 'localizedBlockContent'
  } as UnifiedEvent['recap'] & { _type: 'localizedBlockContent' }
  const sourceEventIds = events.map((event) => event._id)

  for (const event of events) {
    if (!event.language) {
      continue
    }

    assignLocalizedValue(title, event.language, event.title)
    assignLocalizedValue(slug, event.language, event.slug)
    assignLocalizedValue(description, event.language, event.description)
    assignLocalizedValue(recap, event.language, event.recap)
  }

  const missingLanguages = migrationLanguages.filter(
    (language) => !events.some((event) => event.language === language)
  )

  const safeTranslationKey =
    translationKey.length > 0 ? translationKey : `legacy-${sourceEventIds[0]}`

  return {
    targetId: toTargetId(safeTranslationKey, sourceEventIds),
    translationKey: safeTranslationKey,
    sourceEventIds,
    conflicts,
    missingLanguages,
    unifiedEvent: {
      _id: toTargetId(safeTranslationKey, sourceEventIds),
      _type: 'unifiedEvent',
      dateTime: dateTimeResult.value ?? '',
      endDateTime: normalizeNullable(endDateTimeResult.value),
      location: normalizeNullable(locationResult.value),
      isComingSoon: isComingSoonResult.value ?? false,
      mainImage: normalizeNullable(mainImageResult.value),
      rsvpCount: rsvpCountResult.value ?? 0,
      rsvpVoterHashes: rsvpHashesResult.value ?? [],
      title,
      slug,
      description,
      recap
    }
  }
}

export const createMigrationClients = () => {
  const readClient = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false
  })

  const token = process.env.SANITY_API_WRITE_TOKEN

  const writeClient =
    typeof token === 'string' && token.length > 0 ?
      createClient({
        projectId,
        dataset,
        apiVersion,
        useCdn: false,
        token
      })
    : null

  return { readClient, writeClient }
}

export const groupLegacyEvents = (
  legacyEvents: LegacyEventDocument[]
): Map<string, LegacyEventDocument[]> => {
  const groups = new Map<string, LegacyEventDocument[]>()

  for (const event of legacyEvents) {
    const key =
      (
        typeof event.translationKey === 'string' &&
        event.translationKey.length > 0
      ) ?
        event.translationKey
      : `missing:${event._id}`

    const existing = groups.get(key)

    if (existing) {
      existing.push(event)
    } else {
      groups.set(key, [event])
    }
  }

  return groups
}

export const buildUnifiedMigrationRecords = (
  legacyEvents: LegacyEventDocument[]
): UnifiedEventMigrationRecord[] => {
  const groups = groupLegacyEvents(legacyEvents)

  return Array.from(groups.entries()).map(([translationKey, events]) =>
    toUnifiedEventRecord(
      translationKey.startsWith('missing:') ? '' : translationKey,
      events
    )
  )
}

export const getUnifiedEventUnsetPaths = (
  unifiedEvent: UnifiedEventMigrationRecord['unifiedEvent']
): string[] => {
  const unsetPaths: string[] = []

  if (unifiedEvent.endDateTime === undefined) {
    unsetPaths.push('endDateTime')
  }

  if (unifiedEvent.location === undefined) {
    unsetPaths.push('location')
  }

  if (unifiedEvent.mainImage === undefined) {
    unsetPaths.push('mainImage')
  }

  for (const fieldName of localizedFieldNames) {
    const localizedField = unifiedEvent[fieldName]

    for (const language of migrationLanguages) {
      if (!localizedField?.[language]) {
        unsetPaths.push(`${fieldName}.${language}`)
      }
    }
  }

  return unsetPaths
}
