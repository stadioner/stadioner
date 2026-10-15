import type { SanityImageSource } from '@sanity/image-url/lib/types/types'
import type { LocalizedValue } from '@/types/unified-event'

export interface GallerySanityImage {
  _key: string
  alt?: string
  asset?: {
    _ref: string
    _type?: string
  }
  hotspot?: {
    x?: number
    y?: number
    height?: number
    width?: number
  }
  crop?: {
    top?: number
    bottom?: number
    left?: number
    right?: number
  }
}

export interface GalleryEventFromSanity {
  _id: string
  dateTime: string
  title?: LocalizedValue<string>
  gallery?: GallerySanityImage[]
}

export interface GalleryPhoto {
  id: string
  eventId: string
  eventTitle: string
  alt: string
  thumbnailSrc: string
  fullscreenSrc: string
  source: SanityImageSource
}

export interface GalleryEventFilter {
  id: string
  title: string
  dateTime: string
}
