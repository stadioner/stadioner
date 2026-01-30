import type { ProductVariantUrls } from '@/types/products'

export const deriveVariantUrls = (
  baseImagePath: string,
  category: string,
): ProductVariantUrls => {
  const baseDir = baseImagePath.replace(
    /(bottle|crate|barrel-30|barrel-50)\.webp$/,
    '',
  )

  const isBeer = category === 'pivo'
  const sharedBeerDir = '/products/pivo/'

  return {
    bottle: `${baseDir}bottle.webp`,
    crate: isBeer ? `${sharedBeerDir}crate.webp` : `${baseDir}crate.webp`,
    barrel30: isBeer
      ? `${sharedBeerDir}barrel-30.webp`
      : `${baseDir}barrel-30.webp`,
    barrel50: isBeer
      ? `${sharedBeerDir}barrel-50.webp`
      : `${baseDir}barrel-50.webp`,
  }
}

export const checkImageAvailability = (url: string): Promise<boolean> => {
  return new Promise<boolean>(resolve => {
    const img = new Image()
    img.onload = () => resolve(true)
    img.onerror = () => resolve(false)
    img.src = url
  })
}
