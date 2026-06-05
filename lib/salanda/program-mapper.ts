import { pickLocalizedString } from '@/lib/i18n/pick-localized'
import type { SupportedLanguage } from '@/lib/i18n/site-languages'
import type {
  SalandaProgramDay,
  SalandaProgramDayGroup,
  SalandaWeeklyProgramView,
  SanitySalandaProgramItem,
  SanitySalandaWeeklyProgram
} from '@/types/salanda-program'

const dayOrder: SalandaProgramDay[] = [
  'mon',
  'tue',
  'wed',
  'thu',
  'fri',
  'sat',
  'sun'
]

const dayLabelsByLanguage: Record<
  SupportedLanguage,
  Record<SalandaProgramDay, string>
> = {
  cs: {
    mon: 'Pondělí',
    tue: 'Úterý',
    wed: 'Středa',
    thu: 'Čtvrtek',
    fri: 'Pátek',
    sat: 'Sobota',
    sun: 'Neděle'
  },
  en: {
    mon: 'Monday',
    tue: 'Tuesday',
    wed: 'Wednesday',
    thu: 'Thursday',
    fri: 'Friday',
    sat: 'Saturday',
    sun: 'Sunday'
  },
  de: {
    mon: 'Montag',
    tue: 'Dienstag',
    wed: 'Mittwoch',
    thu: 'Donnerstag',
    fri: 'Freitag',
    sat: 'Samstag',
    sun: 'Sonntag'
  }
}

const mapProgramItem = (
  item: SanitySalandaProgramItem,
  language: SupportedLanguage
) => {
  const title = pickLocalizedString(item.title, language)
  if (!title) {
    return null
  }

  const description = pickLocalizedString(item.description, language)

  return {
    time: item.time?.trim() || undefined,
    title,
    description
  }
}

export const mapSalandaWeeklyProgram = (
  program: SanitySalandaWeeklyProgram | null,
  language: SupportedLanguage
): SalandaWeeklyProgramView | null => {
  if (!program) {
    return null
  }

  const title = pickLocalizedString(program.title, language)
  if (!title || !program.weekStart || !program.weekEnd) {
    return null
  }

  const groupedEntries = new Map<
    SalandaProgramDay,
    SalandaProgramDayGroup['entries']
  >()

  for (const item of program.programItems ?? []) {
    const mappedItem = mapProgramItem(item, language)
    if (!mappedItem) {
      continue
    }

    const existing = groupedEntries.get(item.day) ?? []
    existing.push(mappedItem)
    groupedEntries.set(item.day, existing)
  }

  const dayGroups = dayOrder
    .map((day) => {
      const entries = groupedEntries.get(day)
      if (!entries?.length) {
        return null
      }

      return {
        day,
        label: dayLabelsByLanguage[language][day],
        entries
      }
    })
    .filter((group): group is SalandaProgramDayGroup => group !== null)

  if (dayGroups.length === 0) {
    return null
  }

  return {
    id: program._id,
    title,
    weekStart: program.weekStart,
    weekEnd: program.weekEnd,
    dayGroups
  }
}
