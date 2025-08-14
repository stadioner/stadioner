import { urlFor } from '@/sanity/lib/image'
import Image from 'next/image'
import Link from 'next/link'
import { PropsWithChildren } from 'react'
import type {} from '@portabletext/react'

export const RichText = {
  types: {
    image: ({ value }: { value: string }) => (
      <div className='relative w-full m-10 mx-auto h-96'>
        <Image
          className='object-contain'
          src={urlFor(value)}
          alt='Blog Post Image'
          fill
        />
      </div>
    ),
  },

  list: {
    bullet: ({ children }: PropsWithChildren) => (
      <ul className='list-disc my-4 space-y-2 list-inside'>{children}</ul>
    ),
    number: ({ children }: PropsWithChildren) => (
      <ol className='list-decimal list-inside'>{children}</ol>
    ),
  },

  block: {
    normal: ({ children }: PropsWithChildren) => (
      <p className='text-zinc-800 font-stabil'>{children}</p>
    ),
    h1: ({ children }: PropsWithChildren) => (
      <h1 className='mt-10 mb-2 text-4xl xl:text-5xl font-bold font-labil'>
        {children}
      </h1>
    ),
    h2: ({ children }: PropsWithChildren) => (
      <h2 className='mt-10 mb-2 text-4xl sm:text-5xl font-bold font-labil'>
        {children}
      </h2>
    ),
    h3: ({ children }: PropsWithChildren) => (
      <h3 className='mb-2 text-2xl sm:text-3xl font-bold font-labil mt-5'>
        {children}
      </h3>
    ),
    h4: ({ children }: PropsWithChildren) => (
      <h4 className='mt-10 mb-2 text-4xl xl:text-5xl font-bold font-labil'>
        {children}
      </h4>
    ),
    blockquote: ({ children }: PropsWithChildren) => (
      <blockquote className='py-5 pl-5 my-5 border-l-4 border-l-indigo-500'>
        {children}
      </blockquote>
    ),
  },

  marks: {
    link: ({
      children,
      value,
    }: PropsWithChildren<{ value?: { href: string } }>) => {
      const rel =
        value?.href && !value.href.startsWith('/')
          ? 'noreferrer noopener'
          : undefined

      return (
        <Link
          href={value?.href || '#'}
          rel={rel}
          className='underline decoration-indigo-500 hover:decoration-black'
        >
          {children}
        </Link>
      )
    },
  },
}
