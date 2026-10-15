import {
  urlForGalleryFullscreen,
  urlForGalleryThumbnail
} from '@/sanity/lib/image'
import type { SupportedLanguage } from '@/types/blog'
import type {
  GalleryEventFilter,
  GalleryEventFromSanity,
  GalleryPhoto
} from '@/types/gallery'

const getLocalizedTitle = (
  title: GalleryEventFromSanity['title'],
  language: SupportedLanguage
): string => {
  return (
    title?.[language] ||
    title?.cs ||
    title?.en ||
    title?.de ||
    'Untitled'
  )
}

export const mapGalleryEvents = (
  events: GalleryEventFromSanity[],
  language: SupportedLanguage
): { filters: GalleryEventFilter[]; photos: GalleryPhoto[] } => {
  const filters: GalleryEventFilter[] = []
  const photos: GalleryPhoto[] = []

  for (const event of events) {
    const gallery = event.gallery?.filter((image) => image.asset?._ref) ?? []
    if (gallery.length === 0) {
      continue
    }

    const eventTitle = getLocalizedTitle(event.title, language)

    filters.push({
      id: event._id,
      title: eventTitle,
      dateTime: event.dateTime
    })

    for (const image of gallery) {
      const source = image as GalleryPhoto['source']

      photos.push({
        id: `${event._id}-${image._key}`,
        eventId: event._id,
        eventTitle,
        alt: image.alt?.trim() || eventTitle,
        thumbnailSrc: urlForGalleryThumbnail(source),
        fullscreenSrc: urlForGalleryFullscreen(source),
        source
      })
    }
  }

  return { filters, photos }
}
