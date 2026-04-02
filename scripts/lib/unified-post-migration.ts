import { createHash } from 'crypto'
import { createClient } from 'next-sanity'
import type { PortableTextBlock } from 'sanity'
import { apiVersion, dataset, projectId } from '@/sanity/env'
import type { SupportedLanguage } from '@/types/blog'
import type { UnifiedPost } from '@/types/unified-post'
import type {
  LegacyCategoryDocument,
  LegacyPostCategoryUsageDocument
} from './unified-category-migration'
import { buildUnifiedCategoryMigrationRecords } from './unified-category-migration'

export interface LegacyPostDocument extends LegacyPostCategoryUsageDocument {
  _type: 'post'
  language?: SupportedLanguage
  title?: string
  slug?: {
    current?: string
  }
  mainImage?: UnifiedPost['mainImage']
  publishedAt?: string
  featured?: boolean
  body?: PortableTextBlock[]
}

export interface PostMigrationConflict {
  field: string
  valuesByLanguage: Partial<Record<SupportedLanguage, string>>
  chosenLanguage: SupportedLanguage
  chosenValue: string
}

export interface UnifiedPostMigrationRecord {
  targetId: string
  translationKey: string
  sourcePostIds: string[]
  unifiedPost: UnifiedPost & { _type: 'unifiedPost' }
  conflicts: PostMigrationConflict[]
  missingLanguages: SupportedLanguage[]
  unmappedCategoryIds: string[]
}

const migrationLanguages: SupportedLanguage[] = ['cs', 'en', 'de']

const normalizeNullable = <T>(value: T | null | undefined): T | undefined =>
  value ?? undefined

const stringifyValue = (value: unknown): string => JSON.stringify(value ?? null)

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
  posts: LegacyPostDocument[]
): SupportedLanguage => {
  const czechVariant = posts.find((post) => post.language === 'cs')
  return czechVariant?.language ?? posts[0]?.language ?? 'cs'
}

const resolveSharedField = <T>(
  posts: LegacyPostDocument[],
  field: keyof Pick<
    LegacyPostDocument,
    'mainImage' | 'publishedAt' | 'featured'
  >
): { value: T | undefined; conflict?: PostMigrationConflict } => {
  const chosenLanguage = chooseCanonicalLanguage(posts)
  const chosenPost =
    posts.find((post) => post.language === chosenLanguage) ?? posts[0]
  const chosenValue = normalizeNullable(
    chosenPost?.[field] as T | null | undefined
  )

  const valuesByLanguage = posts.reduce<
    Partial<Record<SupportedLanguage, string>>
  >((acc, post) => {
    if (!post.language) {
      return acc
    }

    acc[post.language] = stringifyValue(post[field])
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
    return `unifiedPost.${translationKey}`
  }

  const digest = createHash('sha256').update(sourceIds.join('|')).digest('hex')
  return `unifiedPost.legacy-${digest.slice(0, 16)}`
}

const buildCategoryReferenceMap = (
  legacyCategories: LegacyCategoryDocument[],
  legacyPosts: LegacyPostCategoryUsageDocument[]
): Map<string, string> => {
  const categoryRecords = buildUnifiedCategoryMigrationRecords(
    legacyCategories,
    legacyPosts
  )
  const referenceMap = new Map<string, string>()

  for (const record of categoryRecords) {
    for (const sourceCategoryId of record.sourceCategoryIds) {
      referenceMap.set(sourceCategoryId, record.targetId)
    }
  }

  return referenceMap
}

const buildSharedCategoryReferences = (
  posts: LegacyPostDocument[],
  categoryReferenceMap: Map<string, string>
): {
  references: Array<{ _key: string; _type: 'reference'; _ref: string }>
  unmappedCategoryIds: string[]
} => {
  const uniqueTargetIds = new Set<string>()
  const unmappedCategoryIds = new Set<string>()

  for (const post of posts) {
    for (const category of post.categories ?? []) {
      const categoryId = category._ref

      if (!categoryId) {
        continue
      }

      const targetId = categoryReferenceMap.get(categoryId)

      if (!targetId) {
        unmappedCategoryIds.add(categoryId)
        continue
      }

      uniqueTargetIds.add(targetId)
    }
  }

  return {
    references: Array.from(uniqueTargetIds).map((targetId) => ({
      _key: targetId,
      _type: 'reference',
      _ref: targetId
    })),
    unmappedCategoryIds: Array.from(unmappedCategoryIds)
  }
}

const toUnifiedPostRecord = (
  translationKey: string,
  posts: LegacyPostDocument[],
  categoryReferenceMap: Map<string, string>
): UnifiedPostMigrationRecord => {
  const conflicts: PostMigrationConflict[] = []

  const mainImageResult = resolveSharedField<UnifiedPost['mainImage']>(
    posts,
    'mainImage'
  )
  const publishedAtResult = resolveSharedField<string>(posts, 'publishedAt')
  const featuredResult = resolveSharedField<boolean>(posts, 'featured')

  for (const result of [mainImageResult, publishedAtResult, featuredResult]) {
    if (result.conflict) {
      conflicts.push(result.conflict)
    }
  }

  const title = { _type: 'localizedString' } as UnifiedPost['title'] & {
    _type: 'localizedString'
  }
  const slug = { _type: 'localizedSlug' } as UnifiedPost['slug'] & {
    _type: 'localizedSlug'
  }
  const body = { _type: 'localizedBlockContent' } as UnifiedPost['body'] & {
    _type: 'localizedBlockContent'
  }
  const sourcePostIds = posts.map((post) => post._id)

  for (const post of posts) {
    if (!post.language) {
      continue
    }

    assignLocalizedValue(title, post.language, post.title)
    assignLocalizedValue(slug, post.language, post.slug)
    assignLocalizedValue(body, post.language, post.body)
  }

  const missingLanguages = migrationLanguages.filter(
    (language) => !posts.some((post) => post.language === language)
  )
  const safeTranslationKey =
    translationKey.length > 0 ? translationKey : `legacy-${sourcePostIds[0]}`
  const categoryResolution = buildSharedCategoryReferences(
    posts,
    categoryReferenceMap
  )

  return {
    targetId: toTargetId(safeTranslationKey, sourcePostIds),
    translationKey: safeTranslationKey,
    sourcePostIds,
    conflicts,
    missingLanguages,
    unmappedCategoryIds: categoryResolution.unmappedCategoryIds,
    unifiedPost: {
      _id: toTargetId(safeTranslationKey, sourcePostIds),
      _type: 'unifiedPost',
      mainImage: normalizeNullable(mainImageResult.value),
      publishedAt: normalizeNullable(publishedAtResult.value),
      featured: featuredResult.value ?? false,
      categories: categoryResolution.references,
      title,
      slug,
      body
    }
  }
}

export const buildUnifiedPostMigrationRecords = (
  legacyPosts: LegacyPostDocument[],
  legacyCategories: LegacyCategoryDocument[]
): UnifiedPostMigrationRecord[] => {
  const categoryReferenceMap = buildCategoryReferenceMap(
    legacyCategories,
    legacyPosts
  )
  const groups = new Map<string, LegacyPostDocument[]>()

  for (const post of legacyPosts) {
    const key =
      (
        typeof post.translationKey === 'string' &&
        post.translationKey.length > 0
      ) ?
        post.translationKey
      : `missing:${post._id}`
    const group = groups.get(key) ?? []
    group.push(post)
    groups.set(key, group)
  }

  return Array.from(groups.entries()).map(([translationKey, posts]) =>
    toUnifiedPostRecord(
      translationKey.startsWith('missing:') ? '' : translationKey,
      posts,
      categoryReferenceMap
    )
  )
}

export const getUnifiedPostUnsetPaths = (
  unifiedPost: UnifiedPostMigrationRecord['unifiedPost']
): string[] => {
  const unsetPaths: string[] = []

  if (unifiedPost.mainImage === undefined) {
    unsetPaths.push('mainImage')
  }

  if (unifiedPost.publishedAt === undefined) {
    unsetPaths.push('publishedAt')
  }

  if (!unifiedPost.categories || unifiedPost.categories.length === 0) {
    unsetPaths.push('categories')
  }

  for (const fieldName of ['title', 'slug', 'body'] as const) {
    const localizedField = unifiedPost[fieldName]

    for (const language of migrationLanguages) {
      if (!localizedField?.[language]) {
        unsetPaths.push(`${fieldName}.${language}`)
      }
    }
  }

  return unsetPaths
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
