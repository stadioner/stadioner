'use client'

import { Container } from '@/components/container'
import { RichText } from '@/app/blog/_containers/rich-text'
import { PortableText } from '@portabletext/react'
import { parseISO, format } from 'date-fns'

interface Props {
  post: any
}

export const Post = ({ post }: Props) => {
  const parsedDate = parseISO(post.publishedAt)
  const formattedDate = format(parsedDate, 'dd. MM. yy')

  return (
    <section className='scroll-mt-28'>
      <Container>
        <h1 className='mb-14 mt-2 text-3xl font-black sm:text-4xl md:text-5xl lg:text-6xl'>
          {post.title}
        </h1>
        <div className='font-stabil'>
          <p>{formattedDate}</p>
          <p>{post.author.name}</p>
          <div className='mt-5'>
            {post.categories.map((category: any) => (
              <p
                key={category.title}
                style={{ background: `#${category.color}` }}
                className='mb-1 rounded-2xl py-1 text-center text-xs lg:w-1/2'
              >
                {category.title}
              </p>
            ))}
          </div>
        </div>
        <div>
          <PortableText value={post.body} components={RichText} />
          <div className='mt-10' />
        </div>
      </Container>
    </section>
  )
}
