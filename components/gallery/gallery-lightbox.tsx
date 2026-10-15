'use client'

import { Container } from '@/components/container'
import { preloadGalleryImage } from '@/lib/gallery/preload-image'
import type { GalleryPhoto } from '@/types/gallery'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { ChevronLeft, ChevronRight, XIcon } from 'lucide-react'
import { useEffect } from 'react'

interface GalleryLightboxProps {
  photos: GalleryPhoto[]
  index: number | null
  onClose: () => void
  onIndexChange: (index: number) => void
  closeLabel: string
  previousLabel: string
  nextLabel: string
}

export function GalleryLightbox({
  photos,
  index,
  onClose,
  onIndexChange,
  closeLabel,
  previousLabel,
  nextLabel
}: GalleryLightboxProps) {
  const isOpen = index !== null && photos.length > 0
  const currentIndex = index ?? 0
  const photo = isOpen ? photos[currentIndex] : null
  const hasMultiple = photos.length > 1

  useEffect(() => {
    if (!isOpen || photos.length === 0) return

    for (const offset of [1, -1]) {
      const neighbor =
        photos[(currentIndex + offset + photos.length) % photos.length]
      if (neighbor) preloadGalleryImage(neighbor.fullscreenSrc, 'low')
    }
  }, [isOpen, currentIndex, photos])

  useEffect(() => {
    if (!isOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        onIndexChange((currentIndex - 1 + photos.length) % photos.length)
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault()
        onIndexChange((currentIndex + 1) % photos.length)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isOpen, currentIndex, photos.length, onIndexChange])

  return (
    <DialogPrimitive.Root
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose()
      }}
    >
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className='data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/90' />
        <DialogPrimitive.Content className='fixed inset-x-0 bottom-0 top-28 z-50 flex items-center justify-center p-4 outline-none sm:p-8 lg:top-32'>
          <DialogPrimitive.Title className='sr-only'>
            {photo?.alt ?? ''}
          </DialogPrimitive.Title>

          <div className='pointer-events-none absolute inset-x-0 top-4 z-10'>
            <Container className='relative w-full'>
              <div className='relative flex items-center justify-end px-4'>
                {photo && (
                  <p className='pointer-events-none absolute left-1/2 -translate-x-1/2 text-sm text-white/80'>
                    {currentIndex + 1} / {photos.length}
                  </p>
                )}
                <DialogPrimitive.Close
                  className='pointer-events-auto cursor-pointer rounded-sm p-2 text-white opacity-90 transition-opacity hover:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70'
                  aria-label={closeLabel}
                >
                  <XIcon className='size-6' />
                </DialogPrimitive.Close>
              </div>
            </Container>
          </div>

          {hasMultiple && (
            <>
              <button
                type='button'
                onClick={() =>
                  onIndexChange(
                    (currentIndex - 1 + photos.length) % photos.length
                  )
                }
                className='absolute top-1/2 left-2 z-10 -translate-y-1/2 cursor-pointer rounded-sm p-2 text-white opacity-90 transition-opacity hover:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 sm:left-4'
                aria-label={previousLabel}
              >
                <ChevronLeft className='size-8' />
              </button>
              <button
                type='button'
                onClick={() =>
                  onIndexChange((currentIndex + 1) % photos.length)
                }
                className='absolute top-1/2 right-2 z-10 -translate-y-1/2 cursor-pointer rounded-sm p-2 text-white opacity-90 transition-opacity hover:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 sm:right-4'
                aria-label={nextLabel}
              >
                <ChevronRight className='size-8' />
              </button>
            </>
          )}

          {photo && (
            <div className='relative h-full w-full'>
              {/* eslint-disable-next-line @next/next/no-img-element -- Sanity CDN URL; next/image re-encodes each photo and stalls the swap. */}
              <img
                src={photo.fullscreenSrc}
                alt={photo.alt}
                decoding='async'
                fetchPriority='high'
                className='absolute inset-0 h-full w-full object-contain'
              />
            </div>
          )}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}
