import { RichText } from './rich-text'
import { PortableText } from '@portabletext/react'
import { Post as PostType } from '@/types/blog'

interface Props {
  post: PostType
}

export const Post = ({ post }: Props) => {
  // Safety check for post data
  if (!post || typeof post !== 'object') {
    return (
      <div className='py-20 text-center'>
        <p className='text-red-500'>Error: Invalid post data</p>
      </div>
    )
  }

  // Add back proper styling and structure
  return (
    <section>
      <div className='mb-2 flex items-center gap-10'>
        <div className='flex gap-2'>
          {post.categories &&
            Array.isArray(post.categories) &&
            post.categories.map((category) => (
              <span
                key={category._id || category.title}
                className='bg-brand-action text-brand-primary w-min px-2 py-1 text-sm whitespace-nowrap'
              >
                {typeof category.title === 'string' ?
                  category.title
                : 'Category'}
              </span>
            ))}
        </div>
      </div>

      <h1 className='text-brand-action mt-2 mb-6 py-2 text-5xl font-black md:mb-10 lg:text-6xl'>
        {typeof post.title === 'string' ? post.title : 'Untitled Post'}
      </h1>

      <div>
        {post.body && Array.isArray(post.body) && post.body.length > 0 ?
          <PortableText
            value={post.body}
            components={RichText}
          />
        : <p>No content available</p>}
        <div className='mt-10' />
      </div>
    </section>
  )
}
