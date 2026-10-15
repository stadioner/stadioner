import createImageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'

import { dataset, projectId } from '../env'

// https://www.sanity.io/docs/image-url
const builder = createImageUrlBuilder({ projectId, dataset })

export const urlFor = (source: SanityImageSource) => {
  return builder.image(source).url()
}

/** Portable text body: whole image visible (no hotspot/crop rectangle), capped width. */
export const urlForPortableBodyImage = (source: SanityImageSource) => {
  return builder.image(source).width(1600).fit('max').auto('format').url()
}

/** Fullscreen lightbox variant for portable text images. */
export const urlForPortableBodyImageFullscreen = (
  source: SanityImageSource
) => {
  return builder.image(source).width(2400).fit('max').auto('format').url()
}

/** Gallery grid thumbnail. */
export const urlForGalleryThumbnail = (source: SanityImageSource) => {
  return builder.image(source).width(800).height(800).fit('crop').auto('format').url()
}

/** Full lightbox frame, uncropped. ignoreImageParams skips the builder's hotspot crop. */
export const urlForGalleryFullscreen = (source: SanityImageSource) => {
  return builder
    .image(source)
    .ignoreImageParams()
    .width(1920)
    .height(1440)
    .fit('max')
    .auto('format')
    .quality(75)
    .url()
}
