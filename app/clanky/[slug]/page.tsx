import { Post } from '../_containers/post'
import { cachedClient } from '@/sanity/lib/client'
import { PostQuery, PostsPathsQuery } from '@/sanity/lib/queries'

export async function generateStaticParams() {
  const posts = await cachedClient(PostsPathsQuery)

  return posts
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const post = await cachedClient(PostQuery, { slug })

  return (
    <main className='bg-brand-primary pt-32 md:pt-40 pb-20'>
      <Post post={post} />
    </main>
  )
}
