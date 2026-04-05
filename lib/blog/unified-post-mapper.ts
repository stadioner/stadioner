import type { SupportedLanguage, Category, Post } from '@/types/blog'
import type { LocalizedValue, UnifiedCategory } from '@/types/unified-category'
import type { UnifiedPost } from '@/types/unified-post'
import { supportedUnifiedLanguages } from '@/types/unified-category'
import { slugifyAscii } from '@/lib/utils'

const getLocalizedValue = <T>(
  value: { cs?: T; en?: T; de?: T } | undefined,
  language: SupportedLanguage
): T | undefined => value?.[language]

const localizedLanguageOrder = (
  preferred: SupportedLanguage
): SupportedLanguage[] => [
  preferred,
  ...supportedUnifiedLanguages.filter((l) => l !== preferred)
]

/** Prefer current locale, then other locales so labels show even if only one language is filled in Sanity. */
const pickLocalizedString = (
  value: LocalizedValue<string> | string | undefined,
  preferred: SupportedLanguage
): string | undefined => {
  if (typeof value === 'string' && value.trim().length > 0) {
    return value.trim()
  }
  if (!value || typeof value !== 'object') {
    return undefined
  }
  for (const lang of localizedLanguageOrder(preferred)) {
    const s = value[lang]
    if (typeof s === 'string' && s.trim().length > 0) {
      return s.trim()
    }
  }
  return undefined
}

const pickLocalizedSlugCurrent = (
  value: LocalizedValue<{ current?: string }> | { current?: string } | undefined,
  preferred: SupportedLanguage
): string | undefined => {
  if (!value || typeof value !== 'object') {
    return undefined
  }

  const record = value as Record<string, unknown>
  const hasLocaleNestedSlug = (['cs', 'en', 'de'] as const).some(
    (lang) =>
      record[lang] !== null &&
      typeof record[lang] === 'object' &&
      'current' in (record[lang] as object)
  )

  if (
    !hasLocaleNestedSlug &&
    typeof record.current === 'string' &&
    record.current.length > 0
  ) {
    return record.current
  }

  for (const lang of localizedLanguageOrder(preferred)) {
    const nested = record[lang]
    if (nested && typeof nested === 'object' && 'current' in nested) {
      const cur = (nested as { current?: string }).current
      if (typeof cur === 'string' && cur.length > 0) {
        return cur
      }
    }
  }
  return undefined
}

export const mapUnifiedCategoryToCategory = (
  unifiedCategory: UnifiedCategory,
  language: SupportedLanguage
): Category | null => {
  const doc = unifiedCategory as UnifiedCategory & {
    _type?: string
    language?: string
  }

  const title = pickLocalizedString(unifiedCategory.title, language)
  if (!title) {
    return null
  }

  let slugValue = pickLocalizedSlugCurrent(unifiedCategory.slug, language)
  if (!slugValue || slugValue.trim().length === 0) {
    slugValue = slugifyAscii(title)
  }

  const resolvedLanguage: string =
    doc._type === 'category' && typeof doc.language === 'string' && doc.language.length > 0 ?
      doc.language
    : language

  return {
    _id: unifiedCategory._id,
    title,
    slug: {
      current: slugValue
    },
    language: resolvedLanguage
  }
}

export const mapUnifiedPostToPost = (
  unifiedPost: UnifiedPost,
  language: SupportedLanguage
): Post | null => {
  const title = getLocalizedValue(unifiedPost.title, language)
  const slugValue = getLocalizedValue(unifiedPost.slug, language)?.current

  if (!title || !slugValue) {
    return null
  }

  return {
    _id: unifiedPost._id,
    title,
    slug: {
      current: slugValue
    },
    language,
    mainImage: unifiedPost.mainImage ?? {
      asset: {
        _ref: ''
      }
    },
    publishedAt: unifiedPost.publishedAt ?? '',
    featured: unifiedPost.featured ?? false,
    categories:
      unifiedPost.categories
        ?.map((category) => {
          if (category == null || typeof category !== 'object') {
            return null
          }

          if (!('title' in category)) {
            return null
          }

          return mapUnifiedCategoryToCategory(
            category as UnifiedCategory,
            language
          )
        })
        .filter((category): category is Category => category !== null) ?? [],
    body: getLocalizedValue(unifiedPost.body, language) ?? []
  }
}

export const getUnifiedPostVariants = (
  unifiedPost: UnifiedPost
): Array<{ locale: SupportedLanguage; slug: string }> =>
  supportedUnifiedLanguages.reduce<
    Array<{ locale: SupportedLanguage; slug: string }>
  >((acc, locale) => {
    const slug = unifiedPost.slug?.[locale]?.current

    if (!slug) {
      return acc
    }

    acc.push({ locale, slug })
    return acc
  }, [])
