'use client'

import { Container } from '@/components/container'
import { cn } from '@/lib/utils'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { XIcon, ZoomIn } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

interface PortableTextImageProps {
  src: string
  fullscreenSrc: string
  alt: string
  figureClassName?: string
  imageClassName?: string
}

export function PortableTextImage({
  src,
  fullscreenSrc,
  alt,
  figureClassName,
  imageClassName
}: PortableTextImageProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <figure className={figureClassName}>
        <button
          type='button'
          onClick={() => setOpen(true)}
          className='group relative block w-full cursor-zoom-in text-left'
          aria-label={`Zvětšit: ${alt}`}
        >
          <Image
            src={src}
            alt={alt}
            width={1600}
            height={1200}
            sizes='(max-width: 768px) 100vw, min(896px, 85vw)'
            className={cn(
              'h-auto w-full max-w-full object-contain',
              imageClassName
            )}
          />
          <span
            aria-hidden='true'
            className='pointer-events-none absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/10'
          >
            <span className='rounded-full bg-black/60 p-2 text-white opacity-0 transition-opacity group-hover:opacity-100'>
              <ZoomIn className='size-5' />
            </span>
          </span>
        </button>
      </figure>

      <DialogPrimitive.Root
        open={open}
        onOpenChange={setOpen}
      >
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay className='data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/90' />
          <DialogPrimitive.Content className='fixed inset-x-0 bottom-0 top-28 z-50 flex items-center justify-center p-4 outline-none sm:p-8 lg:top-32'>
            <DialogPrimitive.Title className='sr-only'>{alt}</DialogPrimitive.Title>
            <div className='pointer-events-none absolute inset-x-0 top-4 z-10'>
              <Container className='relative w-full'>
                <div className='relative px-4'>
                  <DialogPrimitive.Close
                    className='pointer-events-auto absolute top-0 right-0 rounded-sm p-2 text-white opacity-90 transition-opacity hover:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70'
                    aria-label='Zavřít'
                  >
                    <XIcon className='size-6' />
                  </DialogPrimitive.Close>
                </div>
              </Container>
            </div>
            <div className='relative h-full w-full'>
              <Image
                src={fullscreenSrc}
                alt={alt}
                fill
                sizes='100vw'
                className='object-contain'
                priority
              />
            </div>
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    </>
  )
}
