import { createHash } from 'crypto'
import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from '@/sanity/env'
import type { SupportedLanguage } from '@/types/blog'
import type { UnifiedCategory } from '@/types/unified-category'

export interface LegacyCategoryDocument {
  _id: string
  _type: 'category'
  language?: SupportedLanguage
  title?: string
  slug?: {
    current?: string
  }
}

export interface LegacyPostCategoryUsageDocument {
  _id: string
  translationKey?: string
  categories?: Array<{
    _ref?: string
  }>
}

export interface UnifiedCategoryMigrationRecord {
  targetId: string
  groupingKey: string
  sourceCategoryIds: string[]
  unifiedCategory: UnifiedCategory & { _type: 'unifiedCategory' }
  missingLanguages: SupportedLanguage[]
  duplicateLanguages: SupportedLanguage[]
  translationKeys: string[]
}

const migrationLanguages: SupportedLanguage[] = ['cs', 'en', 'de']
const usageSimilarityThreshold = 0.5

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

const buildCategoryUsageMap = (
  posts: LegacyPostCategoryUsageDocument[]
): Map<string, Set<string>> => {
  const usageMap = new Map<string, Set<string>>()

  for (const post of posts) {
    const translationKey =
      (
        typeof post.translationKey === 'string' &&
        post.translationKey.length > 0
      ) ?
        post.translationKey
      : `missing:${post._id}`

    for (const category of post.categories ?? []) {
      const categoryId = category._ref

      if (!categoryId) {
        continue
      }

      const usage = usageMap.get(categoryId) ?? new Set<string>()
      usage.add(translationKey)
      usageMap.set(categoryId, usage)
    }
  }

  return usageMap
}

const stringifyUsage = (usage: Set<string> | undefined): string =>
  usage ? Array.from(usage).sort().join('|') : ''

const getUsageSimilarity = (
  left: Set<string> | undefined,
  right: Set<string> | undefined
): number => {
  if (!left || !right || left.size === 0 || right.size === 0) {
    return 0
  }

  const intersection = Array.from(left).filter((item) => right.has(item)).length
  const union = new Set([...left, ...right]).size

  return union === 0 ? 0 : intersection / union
}

const buildUsageUnion = (
  categories: LegacyCategoryDocument[],
  usageMap: Map<string, Set<string>>
): string[] => {
  const usage = new Set<string>()

  for (const category of categories) {
    for (const translationKey of usageMap.get(category._id) ?? []) {
      usage.add(translationKey)
    }
  }

  return Array.from(usage).sort()
}

const toTargetId = (groupingKey: string, sourceIds: string[]): string => {
  const digest = createHash('sha256')
    .update(`${groupingKey}|${sourceIds.slice().sort().join('|')}`)
    .digest('hex')

  return `unifiedCategory.${digest.slice(0, 16)}`
}

const createSingleCategoryRecord = (
  category: LegacyCategoryDocument,
  groupingKey: string,
  translationKeys: string[]
): UnifiedCategoryMigrationRecord => {
  const language = category.language ?? 'cs'
  const title = { _type: 'localizedString' } as UnifiedCategory['title'] & {
    _type: 'localizedString'
  }
  const slug = { _type: 'localizedSlug' } as UnifiedCategory['slug'] & {
    _type: 'localizedSlug'
  }

  assignLocalizedValue(title, language, category.title)
  assignLocalizedValue(slug, language, category.slug)

  return {
    targetId: toTargetId(groupingKey, [category._id]),
    groupingKey,
    sourceCategoryIds: [category._id],
    missingLanguages: migrationLanguages.filter((item) => item !== language),
    duplicateLanguages: [],
    translationKeys,
    unifiedCategory: {
      _id: toTargetId(groupingKey, [category._id]),
      _type: 'unifiedCategory',
      title,
      slug
    }
  }
}

const createGroupedCategoryRecord = (
  categories: LegacyCategoryDocument[],
  groupingKey: string,
  translationKeys: string[]
): UnifiedCategoryMigrationRecord => {
  const title = { _type: 'localizedString' } as UnifiedCategory['title'] & {
    _type: 'localizedString'
  }
  const slug = { _type: 'localizedSlug' } as UnifiedCategory['slug'] & {
    _type: 'localizedSlug'
  }
  const seenLanguages = new Map<SupportedLanguage, number>()

  for (const category of categories) {
    if (!category.language) {
      continue
    }

    assignLocalizedValue(title, category.language, category.title)
    assignLocalizedValue(slug, category.language, category.slug)
    seenLanguages.set(
      category.language,
      (seenLanguages.get(category.language) ?? 0) + 1
    )
  }

  const sourceCategoryIds = categories.map((category) => category._id)
  const duplicateLanguages = Array.from(seenLanguages.entries())
    .filter(([, count]) => count > 1)
    .map(([language]) => language)
  const missingLanguages = migrationLanguages.filter(
    (language) => !categories.some((category) => category.language === language)
  )

  return {
    targetId: toTargetId(groupingKey, sourceCategoryIds),
    groupingKey,
    sourceCategoryIds,
    missingLanguages,
    duplicateLanguages,
    translationKeys,
    unifiedCategory: {
      _id: toTargetId(groupingKey, sourceCategoryIds),
      _type: 'unifiedCategory',
      title,
      slug
    }
  }
}

export const buildUnifiedCategoryMigrationRecords = (
  legacyCategories: LegacyCategoryDocument[],
  legacyPosts: LegacyPostCategoryUsageDocument[]
): UnifiedCategoryMigrationRecord[] => {
  const usageMap = buildCategoryUsageMap(legacyPosts)
  const categoriesByLanguage = new Map<
    SupportedLanguage,
    LegacyCategoryDocument[]
  >()
  const records: UnifiedCategoryMigrationRecord[] = []
  const adjacencyMap = new Map<string, Set<string>>()
  const processedCategoryIds = new Set<string>()

  for (const category of legacyCategories) {
    if (!category.language) {
      continue
    }

    const categories = categoriesByLanguage.get(category.language) ?? []
    categories.push(category)
    categoriesByLanguage.set(category.language, categories)
    adjacencyMap.set(category._id, new Set<string>())
  }

  for (const leftLanguage of migrationLanguages) {
    for (const rightLanguage of migrationLanguages) {
      if (leftLanguage >= rightLanguage) {
        continue
      }

      const leftCategories = categoriesByLanguage.get(leftLanguage) ?? []
      const rightCategories = categoriesByLanguage.get(rightLanguage) ?? []

      const leftBestMatches = new Map<
        string,
        { categoryId: string; score: number } | null
      >()
      const rightBestMatches = new Map<
        string,
        { categoryId: string; score: number } | null
      >()

      for (const leftCategory of leftCategories) {
        let bestMatch: { categoryId: string; score: number } | null = null

        for (const rightCategory of rightCategories) {
          const score = getUsageSimilarity(
            usageMap.get(leftCategory._id),
            usageMap.get(rightCategory._id)
          )

          if (score < usageSimilarityThreshold) {
            continue
          }

          if (!bestMatch || score > bestMatch.score) {
            bestMatch = { categoryId: rightCategory._id, score }
          }
        }

        leftBestMatches.set(leftCategory._id, bestMatch)
      }

      for (const rightCategory of rightCategories) {
        let bestMatch: { categoryId: string; score: number } | null = null

        for (const leftCategory of leftCategories) {
          const score = getUsageSimilarity(
            usageMap.get(rightCategory._id),
            usageMap.get(leftCategory._id)
          )

          if (score < usageSimilarityThreshold) {
            continue
          }

          if (!bestMatch || score > bestMatch.score) {
            bestMatch = { categoryId: leftCategory._id, score }
          }
        }

        rightBestMatches.set(rightCategory._id, bestMatch)
      }

      for (const leftCategory of leftCategories) {
        const leftBestMatch = leftBestMatches.get(leftCategory._id)

        if (!leftBestMatch) {
          continue
        }

        const rightBestMatch = rightBestMatches.get(leftBestMatch.categoryId)

        if (rightBestMatch?.categoryId !== leftCategory._id) {
          continue
        }

        adjacencyMap.get(leftCategory._id)?.add(leftBestMatch.categoryId)
        adjacencyMap.get(leftBestMatch.categoryId)?.add(leftCategory._id)
      }
    }
  }

  const visitedCategoryIds = new Set<string>()

  for (const category of legacyCategories) {
    if (visitedCategoryIds.has(category._id)) {
      continue
    }

    const stack = [category._id]
    const componentIds: string[] = []

    while (stack.length > 0) {
      const currentId = stack.pop()

      if (!currentId || visitedCategoryIds.has(currentId)) {
        continue
      }

      visitedCategoryIds.add(currentId)
      componentIds.push(currentId)

      for (const nextId of adjacencyMap.get(currentId) ?? []) {
        if (!visitedCategoryIds.has(nextId)) {
          stack.push(nextId)
        }
      }
    }

    if (componentIds.length <= 1) {
      continue
    }

    const categories = componentIds
      .map((categoryId) =>
        legacyCategories.find((item) => item._id === categoryId)
      )
      .filter((item): item is LegacyCategoryDocument => Boolean(item))
    const uniqueLanguages = new Set(
      categories
        .map((item) => item.language)
        .filter((language): language is SupportedLanguage => Boolean(language))
    )

    if (uniqueLanguages.size !== categories.length) {
      continue
    }

    const translationKeys = buildUsageUnion(categories, usageMap)
    const groupingKey =
      translationKeys.length > 0 ?
        translationKeys.join('|')
      : componentIds.slice().sort().join('|')

    records.push(
      createGroupedCategoryRecord(categories, groupingKey, translationKeys)
    )

    for (const groupedCategory of categories) {
      processedCategoryIds.add(groupedCategory._id)
    }
  }

  for (const category of legacyCategories) {
    if (processedCategoryIds.has(category._id)) {
      continue
    }

    const signature = stringifyUsage(usageMap.get(category._id))
    const groupingKey =
      signature.length > 0 ?
        `${signature}|legacy:${category._id}`
      : `legacy:${category._id}`

    records.push(
      createSingleCategoryRecord(
        category,
        groupingKey,
        signature.split('|').filter(Boolean)
      )
    )
  }

  return records
}

export const getUnifiedCategoryUnsetPaths = (
  unifiedCategory: UnifiedCategoryMigrationRecord['unifiedCategory']
): string[] => {
  const unsetPaths: string[] = []

  for (const fieldName of ['title', 'slug'] as const) {
    const localizedField = unifiedCategory[fieldName]

    for (const language of migrationLanguages) {
      if (!localizedField?.[language]) {
        unsetPaths.push(`${fieldName}.${language}`)
      }
    }
  }

  return unsetPaths
}
