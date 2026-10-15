'use client'

import { GalleryLightbox } from '@/components/gallery/gallery-lightbox'
import { Container } from '@/components/container'
import { mapGalleryEvents } from '@/lib/gallery/map-gallery'
import { cn } from '@/lib/utils'
import type { GalleryEventFromSanity } from '@/types/gallery'
import { isSupportedLanguage } from '@/lib/i18n/site-languages'
import { useLanguage } from '@/store/use-language'
import Image from 'next/image'
import { useMemo, useState } from 'react'

interface PhotoGalleryProps {
  events: GalleryEventFromSanity[]
}

const copy = {
  cs: {
    title: 'Fotogalerie',
    all: 'Všechny',
    empty: 'Zatím zde nejsou žádné fotografie.',
    close: 'Zavřít',
    previous: 'Předchozí fotografie',
    next: 'Další fotografie',
    open: 'Zvětšit'
  },
  en: {
    title: 'Gallery',
    all: 'All',
    empty: 'No photos yet.',
    close: 'Close',
    previous: 'Previous photo',
    next: 'Next photo',
    open: 'Enlarge'
  },
  de: {
    title: 'Fotogalerie',
    all: 'Alle',
    empty: 'Noch keine Fotos vorhanden.',
    close: 'Schließen',
    previous: 'Vorheriges Foto',
    next: 'Nächstes Foto',
    open: 'Vergrößern'
  }
} as const

export function PhotoGallery({ events }: PhotoGalleryProps) {
  const { language } = useLanguage()
  const currentLanguage = isSupportedLanguage(language) ? language : 'cs'
  const labels = copy[currentLanguage]
  const [activeEventId, setActiveEventId] = useState<string | null>(null)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const { filters, photos } = useMemo(
    () => mapGalleryEvents(events, currentLanguage),
    [events, currentLanguage]
  )

  const visiblePhotos = useMemo(() => {
    if (!activeEventId) return photos
    return photos.filter((photo) => photo.eventId === activeEventId)
  }, [activeEventId, photos])

  return (
    <main className='bg-brand-primary pt-32 pb-28 md:pt-40'>
      <Container>
        <h1 className='text-brand-action mb-8 text-4xl font-bold md:text-5xl'>
          {labels.title}
        </h1>

        {photos.length === 0 ?
          <p className='text-brand-action/80 text-lg'>{labels.empty}</p>
        : <>
            {filters.length > 1 && (
              <div className='mb-10 flex flex-wrap gap-2'>
                <FilterChip
                  label={labels.all}
                  active={activeEventId === null}
                  onClick={() => {
                    setActiveEventId(null)
                    setLightboxIndex(null)
                  }}
                />
                {filters.map((filter) => (
                  <FilterChip
                    key={filter.id}
                    label={filter.title}
                    active={activeEventId === filter.id}
                    onClick={() => {
                      setActiveEventId(filter.id)
                      setLightboxIndex(null)
                    }}
                  />
                ))}
              </div>
            )}

            <div className='grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-4'>
              {visiblePhotos.map((photo, index) => (
                <button
                  key={photo.id}
                  type='button'
                  onClick={() => setLightboxIndex(index)}
                  className='group relative aspect-square cursor-pointer overflow-hidden bg-black/5 text-left'
                  aria-label={`${labels.open}: ${photo.alt}`}
                >
                  <Image
                    src={photo.thumbnailSrc}
                    alt={photo.alt}
                    fill
                    sizes='(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw'
                    className='object-cover transition-transform duration-300 group-hover:scale-[1.03]'
                  />
                  <span className='pointer-events-none absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/15' />
                </button>
              ))}
            </div>

            <GalleryLightbox
              photos={visiblePhotos}
              index={lightboxIndex}
              onClose={() => setLightboxIndex(null)}
              onIndexChange={setLightboxIndex}
              closeLabel={labels.close}
              previousLabel={labels.previous}
              nextLabel={labels.next}
            />
          </>
        }
      </Container>
    </main>
  )
}

function FilterChip({
  label,
  active,
  onClick
}: {
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      type='button'
      onClick={onClick}
      className={cn(
        'border-brand-action cursor-pointer border px-4 py-2 text-sm font-medium transition-colors',
        active ?
          'bg-brand-action text-brand-primary'
        : 'text-brand-action hover:bg-brand-action/10 bg-transparent'
      )}
    >
      {label}
    </button>
  )
}
