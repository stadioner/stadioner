'use client'

import { Container } from '@/components/container'
import { RichText } from '@/app/clanky/_containers/rich-text'
import { PortableText } from '@portabletext/react'
import { Post as PostType } from '@/types/blog'

interface Props {
  post: PostType
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

  // Add back proper styling and structure
  return (
    <section>
      <Container className='!max-w-3xl'>
        <div className='flex items-center gap-10 mb-2'>
          <div className='flex gap-2'>
            {post.categories &&
              Array.isArray(post.categories) &&
              post.categories.map(category => (
                <span
                  key={category._id || category.title}
                  className='bg-brand-action py-1 px-2 w-min whitespace-nowrap text-brand-primary text-sm'
                >
                  {typeof category.title === 'string'
                    ? category.title
                    : 'Category'}
                </span>
              ))}
          </div>
        </div>

        <h1 className='md:mb-10 mb-6 text-5xl font-black lg:text-6xl text-brand-action'>
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
      </Container>
    </section>
  )
}
