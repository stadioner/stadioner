'use client'

import { Border } from '@/components/border'
import { urlFor } from '@/sanity/lib/image'
import { Post } from '@/types/blog'
import Link from 'next/link'
import { useState } from 'react'

export const Posts = ({ posts }: { posts: Post[] }) => {
  const [categories, setCategories] = useState<string[]>([])

  const filteredPosts =
    categories.length === 0
      ? posts
      : posts.filter(post =>
          post.categories.some((cat: any) => categories.includes(cat))
        )

  console.log(posts)

  return (
    <section className='grid grid-cols-3 gap-10'>
      {posts.map((post: Post) => (
        <Link href={`/blog/${post.slug.current}`} key={post._id}>
          <Border>
            <div className='aspect-square overflow-hidden relative'>
              <img
                src={urlFor(post.mainImage)}
                alt={post.title}
                className='absolute inset-0 object-cover hover:scale-[102%] transition aspect-square overflow-hidden'
              />

              <div className='flex gap-2 absolute right-0 top-0 bg-brand-action p-2 text-brand-primary'>
                <img
                  src={urlFor(post.author.image)}
                  alt=''
                  className='rounded-full size-6'
                />
                <p>{post.author.name}</p>
              </div>

              <div className='absolute right-0 bottom-0'>
                {post.categories.map((category: any, id: number) => (
                  <p
                    key={post.categories[id]._id}
                    className='text-sm bg-brand-action p-1 text-brand-primary'
                  >
                    {category.title}
                  </p>
                ))}
              </div>
            </div>
          </Border>
          <h3 className='text-brand-action text-3xl mt-3 font-bold'>
            {post.title}
          </h3>
        </Link>
      ))}
    </section>
  )
}
