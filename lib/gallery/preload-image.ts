const preloaded = new Set<string>()

/** Warm the browser cache so the lightbox can swap photos without a network wait. */
export const preloadGalleryImage = (
  src: string,
  priority: 'high' | 'low' | 'auto' = 'low'
) => {
  if (!src || preloaded.has(src) || typeof window === 'undefined') return

  preloaded.add(src)

  const image = new window.Image()
  image.decoding = 'async'
  image.fetchPriority = priority
  image.src = src
}
