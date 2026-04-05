import type { PortableTextComponents } from '@portabletext/react'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { urlForPortableBodyImage } from '@/sanity/lib/image'
import Image from 'next/image'
import {
  createPortableTextListComponents,
  isPortableTextBlockEmpty,
  type PortableTextBlockLike
} from '@/sanity/lib/portable-text'
import Link from 'next/link'
import { PropsWithChildren } from 'react'

type BodyImageValue = SanityImageSource & { alt?: string }

export const RichText: PortableTextComponents = {
  types: {
    image: ({ value }: { value: BodyImageValue }) => {
      const alt =
        typeof value.alt === 'string' && value.alt.length > 0 ?
          value.alt
        : 'Article image'

      return (
        <figure className='my-10 w-full'>
          <Image
            src={urlForPortableBodyImage(value)}
            alt={alt}
            width={1600}
            height={1200}
            sizes='(max-width: 768px) 100vw, min(896px, 85vw)'
            className='h-auto w-full max-w-full object-contain'
          />
        </figure>
      )
    }
  },

  ...createPortableTextListComponents({
    listClassName: 'text-lg'
  }),

  block: {
    normal: ({
      children,
      value
    }: PropsWithChildren<{ value?: PortableTextBlockLike }>) =>
      isPortableTextBlockEmpty(value) ?
        <div
          aria-hidden='true'
          className='h-8'
        />
      : <p className='font-stabil mb-4 !text-justify text-lg !leading-[1.15] text-zinc-800'>
          {children}
        </p>,
    h1: ({ children }: PropsWithChildren) => (
      <h1 className='font-labil mt-10 mb-4 text-4xl font-bold xl:text-5xl'>
        {children}
      </h1>
    ),
    h2: ({ children }: PropsWithChildren) => (
      <h2 className='font-labil mt-10 mb-4 text-3xl font-bold sm:text-4xl'>
        {children}
      </h2>
    ),
    h3: ({ children }: PropsWithChildren) => (
      <h3 className='font-labil mt-10 mb-4 text-2xl font-bold sm:text-3xl'>
        {children}
      </h3>
    ),
    h4: ({ children }: PropsWithChildren) => (
      <h4 className='font-labil mt-10 mb-4 text-xl font-bold xl:text-2xl'>
        {children}
      </h4>
    ),
    blockquote: ({ children }: PropsWithChildren) => (
      <blockquote className='border-l-brand-action my-5 border-l-4 py-5 pl-5 text-lg'>
        {children}
      </blockquote>
    )
  },

  marks: {
    link: ({
      children,
      value
    }: PropsWithChildren<{ value?: { href: string } }>) => {
      const rel =
        value?.href && !value.href.startsWith('/') ?
          'noreferrer noopener'
        : undefined

      return (
        <Link
          href={value?.href || '#'}
          rel={rel}
          className='decoration-brand-action text-brand-action underline hover:decoration-black'
        >
          {children}
        </Link>
      )
    }
  }
}
