import { Container } from '@/components/container'
import { cachedClient } from '@/sanity/lib/client'
import { PostsQuery } from '@/sanity/lib/queries'
import { Posts } from './_containers/posts'

export default async function BlogPage() {
  const posts = await cachedClient(PostsQuery)

  return (
    <main className='bg-brand-primary pt-40 pb-28'>
      <Container>
        <Posts posts={posts} />
      </Container>
    </main>
  )
}
