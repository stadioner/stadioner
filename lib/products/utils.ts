import type { ProductVariantUrls } from '@/types/products'

export const formatPriceCzk = (amount: number): string =>
  new Intl.NumberFormat('cs-CZ', {
    maximumFractionDigits: 0
  }).format(amount)

export const deriveVariantUrls = (
  baseImagePath: string,
  category: string,
  sharedKegImages = false
): ProductVariantUrls => {
  const baseDir = baseImagePath.replace(
    /(bottle|crate|barrel-20|barrel-30|barrel-50)\.webp$/,
    ''
  )

  const isBeer = category === 'pivo'
  const sharedBeerDir = '/products/pivo/'
  const kegDir = isBeer || sharedKegImages ? sharedBeerDir : baseDir

  return {
    bottle: `${baseDir}bottle.webp`,
    crate: isBeer ? `${sharedBeerDir}crate.webp` : `${baseDir}crate.webp`,
    barrel20:
      sharedKegImages ?
        `${sharedBeerDir}barrel-30.webp`
      : `${baseDir}barrel-20.webp`,
    barrel30: `${kegDir}barrel-30.webp`,
    barrel50: `${kegDir}barrel-50.webp`
  }
}

export const checkImageAvailability = (url: string): Promise<boolean> => {
  return new Promise<boolean>((resolve) => {
    const img = new Image()
    img.onload = () => resolve(true)
    img.onerror = () => resolve(false)
    img.src = url
  })
}
