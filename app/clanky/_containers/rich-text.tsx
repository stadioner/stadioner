import { urlFor } from '@/sanity/lib/image'
import Link from 'next/link'
import { PropsWithChildren } from 'react'

export const RichText = {
  types: {
    image: ({ value }: { value: string }) => (
      <img src={urlFor(value)} alt='Blog Post Image' className='mb-10' />
    ),
  },

  list: {
    bullet: ({ children }: PropsWithChildren) => (
      <ul className='list-disc my-4 space-y-2 list-inside text-lg mb-2'>
        {children}
      </ul>
    ),
    number: ({ children }: PropsWithChildren) => (
      <ol className='list-decimal list-inside text-lg mb-2'>{children}</ol>
    ),
  },

  block: {
    normal: ({ children }: PropsWithChildren) => (
      <p className='text-zinc-800 font-stabil text-justify text-lg mb-2'>
        {children}
      </p>
    ),
    h1: ({ children }: PropsWithChildren) => (
      <h1 className='mt-10 mb-4 text-4xl xl:text-5xl font-bold font-labil '>
        {children}
      </h1>
    ),
    h2: ({ children }: PropsWithChildren) => (
      <h2 className='mt-10 mb-4 text-3xl sm:text-4xl font-bold font-labil'>
        {children}
      </h2>
    ),
    h3: ({ children }: PropsWithChildren) => (
      <h3 className='mt-10 mb-4 text-2xl sm:text-3xl font-bold font-labil '>
        {children}
      </h3>
    ),
    h4: ({ children }: PropsWithChildren) => (
      <h4 className='mt-10 mb-4 text-xl xl:text-2xl font-bold font-labil'>
        {children}
      </h4>
    ),
    blockquote: ({ children }: PropsWithChildren) => (
      <blockquote className='py-5 pl-5 my-5 border-l-4 border-l-brand-action text-lg'>
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
          className='underline decoration-brand-action hover:decoration-black text-brand-action'
        >
          {children}
        </Link>
      )
    },
  },
}
