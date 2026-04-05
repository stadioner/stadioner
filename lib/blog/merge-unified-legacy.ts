import type { Category, Post } from '@/types/blog'

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
