import { revalidateTag } from 'next/cache'

import { supportedLanguages } from '@/lib/i18n/site-languages'

const blogListTags = [
  'blog:unified:posts:list',
  'blog:unified:categories:list',
  'blog:unified:recent',
  'blog:unified:paths',
  'blog:unified:sitemap'
] as const

const collectSlugStrings = (slug: unknown): string[] => {
  if (!slug || typeof slug !== 'object') {
    return []
  }

  const s = slug as Record<string, unknown>
  const out: string[] = []

  if ('current' in s && typeof s.current === 'string' && s.current.length > 0) {
    out.push(s.current)
  }

  for (const lang of supportedLanguages) {
    const localized = s[lang]
    if (
      localized &&
      typeof localized === 'object' &&
      'current' in localized &&
      typeof localized.current === 'string' &&
      localized.current.length > 0
    ) {
      out.push(localized.current)
    }
  }

  return [...new Set(out)]
}

/** Invalidates all Sanity fetch caches used by blog listing, sidebar, paths, and sitemap. */
export const revalidateAllBlogFetchTags = (): void => {
  for (const tag of blogListTags) {
    revalidateTag(tag)
  }

  for (const lang of supportedLanguages) {
    revalidateTag(`blog:posts:${lang}`)
    revalidateTag(`blog:categories:${lang}`)
    revalidateTag(`blog:paths:${lang}`)
    revalidateTag(`blog:recent:${lang}`)
    revalidateTag(`blog:sitemap:${lang}`)
  }
}

const revalidateDetailTagsForDocument = (doc: Record<string, unknown>): void => {
  const type = doc._type

  if (type === 'unifiedPost') {
    for (const slug of collectSlugStrings(doc.slug)) {
      revalidateTag(`blog:unified:detail:${slug}`)
    }
  }

  if (type === 'post') {
    const language = doc.language
    if (typeof language === 'string' && language.length > 0) {
      for (const slug of collectSlugStrings(doc.slug)) {
        revalidateTag(`blog:post:${language}:${slug}`)
      }
    }
  }

  const translationKey = doc.translationKey
  if (typeof translationKey === 'string' && translationKey.length > 0) {
    revalidateTag(`blog:variants:${translationKey}`)
  }
}

export const revalidateBlogCachesForWebhookDocument = (
  doc: Record<string, unknown> | null
): void => {
  revalidateAllBlogFetchTags()

  if (doc) {
    revalidateDetailTagsForDocument(doc)
  }
}

export const blogWebhookDocumentTypes = new Set([
  'post',
  'unifiedPost',
  'category',
  'unifiedCategory'
])
