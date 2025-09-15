'use client'

import { Container } from '@/components/container'
import { RichText } from '@/app/clanky/_containers/rich-text'
import { PortableText } from '@portabletext/react'
import { parseISO, format } from 'date-fns'
import { urlFor } from '@/sanity/lib/image'
import { Post as PostType } from '@/types/blog'

interface Props {
  post: PostType
}

const dateFormats = {
  cs: 'dd. MM. yyyy',
  en: 'MMM dd, yyyy',
  de: 'dd. MMM yyyy',
}

export const Post = ({ post }: Props) => {
  // Safety check for post data
  if (!post || typeof post !== 'object') {
    return (
      <div className='text-center py-20'>
        <p className='text-red-500'>Error: Invalid post data</p>
      </div>
    )
  }

  const parsedDate = parseISO(post.publishedAt)
  const formattedDate = format(
    parsedDate,
    dateFormats[post.language as keyof typeof dateFormats] || dateFormats.en
  )

  // Add back proper styling and structure
  return (
    <section>
      <Container className='grid md:grid-cols-[1fr_4fr]'>
        <div className='grid grid-cols-2 md:grid-cols-1'>
          <div>
            <p className='text-sm text-gray-600'>{formattedDate}</p>
            <div className='flex gap-2 mt-2'>
              {post.author?.image && (
                <img
                  src={urlFor(post.author.image) || ''}
                  alt={
                    typeof post.author.name === 'string'
                      ? post.author.name
                      : 'Author'
                  }
                  className='size-7 rounded-full'
                />
              )}
              <div>
                <p className='font-medium'>
                  {typeof post.author?.name === 'string'
                    ? post.author.name
                    : 'Unknown Author'}
                </p>
                {post.author?.bio && typeof post.author.bio === 'string' && (
                  <p className='text-sm text-gray-600'>{post.author.bio}</p>
                )}
              </div>
            </div>
          </div>
          <div className='md:mt-10 justify-self-end md:justify-self-start flex flex-col gap-2'>
            {post.categories &&
              Array.isArray(post.categories) &&
              post.categories.map(category => (
                <span
                  key={category._id || category.title}
                  className='bg-brand-action py-1 px-2 w-min whitespace-nowrap text-brand-primary text-sm'
                  style={
                    category.color ? { backgroundColor: category.color } : {}
                  }
                >
                  {typeof category.title === 'string'
                    ? category.title
                    : 'Category'}
                </span>
              ))}
          </div>
        </div>
        <div>
          <h1 className='mt-16 md:mt-0 md:mb-10 mb-6 text-5xl font-black lg:text-6xl text-brand-action'>
            {typeof post.title === 'string' ? post.title : 'Untitled Post'}
          </h1>
          <div>
            {post.body && Array.isArray(post.body) && post.body.length > 0 ? (
              <PortableText value={post.body} components={RichText} />
            ) : (
              <p>No content available</p>
            )}
            <div className='mt-10' />
          </div>
        </div>
      </Container>
    </section>
  )
}
