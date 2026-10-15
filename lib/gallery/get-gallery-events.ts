import 'server-only'

import { sanityFetch } from '@/sanity/lib/fetch'
import { unifiedEventsWithGalleryQuery } from '@/sanity/lib/queries'
import { hasSanityWriteToken, writeClient } from '@/sanity/lib/write-client'
import type { GalleryEventFromSanity } from '@/types/gallery'

/**
 * Prefer the authenticated client when available — migrated `unifiedEvent.*`
 * documents are not returned by the anonymous public API (same pattern as events).
 */
export const getGalleryEvents = async (): Promise<GalleryEventFromSanity[]> => {
  if (hasSanityWriteToken) {
    return writeClient.fetch<GalleryEventFromSanity[]>(
      unifiedEventsWithGalleryQuery
    )
  }

  return sanityFetch<GalleryEventFromSanity[]>({
    query: unifiedEventsWithGalleryQuery,
    revalidate: 60,
    tags: ['gallery:list', 'event']
  })
}
