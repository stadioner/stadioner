import { PhotoGallery } from '@/components/gallery/photo-gallery'
import { getGalleryEvents } from '@/lib/gallery/get-gallery-events'

export const revalidate = 60

export default async function FotogaleriePage() {
  const events = await getGalleryEvents()

  return <PhotoGallery events={events ?? []} />
}
