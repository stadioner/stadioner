'use client'

import { Container } from '@/components/container'
import { RichText } from '@/app/blog/_containers/rich-text'
import { PortableText } from '@portabletext/react'
import { parseISO, format } from 'date-fns'
import { urlFor } from '@/sanity/lib/image'
import { Post as PostType } from '@/types/blog'

interface Props {
  post: PostType
}

export const Post = ({ post }: Props) => {
  const parsedDate = parseISO(post.publishedAt)
  const formattedDate = format(parsedDate, 'dd. MM. yyyy')

  return (
    <section>
      <Container className='grid grid-cols-[1fr_4fr]'>
        <div>
          <p>{formattedDate}</p>
          <div className='flex gap-2'>
            <img
              src={urlFor(post.author.image)}
              alt={post.author.name}
              className='size-7 rounded-full'
            />
            <p>{post.author.name}</p>
          </div>
          <div className='mt-10'>
            {post.categories.map(category => (
              <p
                key={category.title}
                className='bg-brand-action py-1 px-2 w-min whitespace-nowrap text-brand-primary'
              >
                {category.title}
              </p>
            ))}
          </div>
        </div>

        <div>
          <h1 className='mb-10 text-3xl font-black sm:text-4xl md:text-5xl lg:text-6xl text-brand-action'>
            {post.title}
          </h1>

          <div>
            <PortableText value={post.body} components={RichText} />
            <div className='mt-10' />
          </div>
        </div>
      </Container>
    </section>
  )
}
