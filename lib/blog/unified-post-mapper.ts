import type { SupportedLanguage, Category, Post } from '@/types/blog'
import type { UnifiedCategory } from '@/types/unified-category'
import type { UnifiedPost } from '@/types/unified-post'
import { supportedUnifiedLanguages } from '@/types/unified-category'

const getLocalizedValue = <T>(
  value: { cs?: T; en?: T; de?: T } | undefined,
  language: SupportedLanguage
): T | undefined => value?.[language]

export const mapUnifiedCategoryToCategory = (
  unifiedCategory: UnifiedCategory,
  language: SupportedLanguage
): Category | null => {
  const title = getLocalizedValue(unifiedCategory.title, language)
  const slugValue = getLocalizedValue(unifiedCategory.slug, language)?.current

  if (!title || !slugValue) {
    return null
  }

  return {
    _id: unifiedCategory._id,
    title,
    slug: {
      current: slugValue
    },
    language
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

          if (!('title' in category) || !('slug' in category)) {
            return null
          }

          return mapUnifiedCategoryToCategory(category, language)
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
