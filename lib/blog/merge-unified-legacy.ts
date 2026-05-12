import type { Category, Post } from '@/types/blog'

/** Collapse visually duplicate titles (e.g. unified vs legacy with different slugs). */
const categoryDisplayTitleKey = (title: string): string =>
  title
    .normalize('NFC')
    .toLocaleLowerCase('cs')
    .replace(/\s+/g, ' ')
    .trim()

/** Matches `/udalosti` nav labels — excluded from články filters and card tags. */
const EVENTS_NAV_SLUGS = new Set(['udalosti', 'events', 'veranstaltungen'])

const EVENTS_NAV_TITLE_KEYS = new Set(
  ['Události', 'Events', 'Veranstaltungen'].map(categoryDisplayTitleKey)
)

export const isEventsNavBlogCategory = (c: Category): boolean => {
  const slug = c.slug.current.trim().toLowerCase()
  if (slug.length > 0 && EVENTS_NAV_SLUGS.has(slug)) {
    return true
  }
  return EVENTS_NAV_TITLE_KEYS.has(categoryDisplayTitleKey(c.title))
}

export const excludeEventsNavFromCategoryList = (
  categories: Category[]
): Category[] => categories.filter((c) => !isEventsNavBlogCategory(c))

export const stripEventsNavCategoriesFromPost = (post: Post): Post => ({
  ...post,
  categories: post.categories.filter((c) => !isEventsNavBlogCategory(c))
})

export const stripEventsNavFromPostCategories = (posts: Post[]): Post[] =>
  posts.map((post) => stripEventsNavCategoriesFromPost(post))

/**
 * One row per visible title; first wins (merge order + sort keeps unified before
 * legacy for equal titles under stable sort).
 */
export const dedupeCategoriesByDisplayTitle = (
  categories: Category[]
): Category[] => {
  const seen = new Set<string>()
  const out: Category[] = []
  for (const c of categories) {
    const key = categoryDisplayTitleKey(c.title)
    if (key.length === 0 || seen.has(key)) {
      continue
    }
    seen.add(key)
    out.push(c)
  }
  return out
}

/** Dedup by slug: unified wins; sort by publishedAt descending. */
export const mergeUnifiedAndLegacyPosts = (
  unifiedMapped: Post[],
  legacy: Post[]
): Post[] => {
  const slugSet = new Set(unifiedMapped.map((p) => p.slug.current))
  const dedupedLegacy = legacy.filter((p) => !slugSet.has(p.slug.current))
  const merged = [...unifiedMapped, ...dedupedLegacy]

  merged.sort((a, b) => {
    const tb = Date.parse(b.publishedAt)
    const ta = Date.parse(a.publishedAt)
    return (Number.isFinite(tb) ? tb : 0) - (Number.isFinite(ta) ? ta : 0)
  })

  return merged
}

/** Dedup by slug: unified wins; sort by title. */
export const mergeUnifiedAndLegacyCategories = (
  unifiedMapped: Category[],
  legacy: Category[]
): Category[] => {
  const slugSet = new Set(unifiedMapped.map((c) => c.slug.current))
  const dedupedLegacy = legacy.filter((c) => !slugSet.has(c.slug.current))

  return [...unifiedMapped, ...dedupedLegacy].sort((a, b) =>
    a.title.localeCompare(b.title)
  )
}

/**
 * Map each post tag to a row from `categories`: match slug first, then visible title.
 * Use together with `dedupeCategoriesByDisplayTitle` so list and post refs stay aligned.
 */
export const normalizePostCategoriesAgainstList = (
  posts: Post[],
  categories: Category[]
): Post[] => {
  const canonicalBySlug = new Map<string, Category>()
  const canonicalByTitle = new Map<string, Category>()
  for (const c of categories) {
    const slug = c.slug.current
    if (slug.length > 0 && !canonicalBySlug.has(slug)) {
      canonicalBySlug.set(slug, c)
    }
    const titleKey = categoryDisplayTitleKey(c.title)
    if (titleKey.length > 0 && !canonicalByTitle.has(titleKey)) {
      canonicalByTitle.set(titleKey, c)
    }
  }

  return posts.map((post) => {
    const mapped = post.categories.map((cat) => {
      const slug = cat.slug.current
      if (slug.length > 0) {
        const bySlug = canonicalBySlug.get(slug)
        if (bySlug) {
          return bySlug
        }
      }
      const titleKey = categoryDisplayTitleKey(cat.title)
      if (titleKey.length > 0) {
        const byTitle = canonicalByTitle.get(titleKey)
        if (byTitle) {
          return byTitle
        }
      }
      return cat
    })

    const seen = new Set<string>()
    const categories: Category[] = []
    for (const c of mapped) {
      if (seen.has(c._id)) {
        continue
      }
      seen.add(c._id)
      categories.push(c)
    }

    return { ...post, categories }
  })
}
