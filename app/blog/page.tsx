'use client'

import { Container } from '@/components/container'
import { useState } from 'react'
import { cachedClient } from '@/sanity/lib/client'
import { PostsQuery } from '@/sanity/lib/queries'
import { Posts } from './_containers/posts'

export default async function BlogPage() {
  const [categories, setCategories] = useState<string[]>([])

  const posts = await cachedClient(PostsQuery)

  const filteredPosts =
    categories.length === 0
      ? posts
      : posts.filter((post: any) =>
          post.categories.some((cat: any) => categories.includes(cat))
        )

  return (
    <main className='bg-brand-primary pt-40 pb-28'>
      <Container>
        <Posts posts={filteredPosts} />
      </Container>
    </main>
  )
}
