import { Border } from '@/components/border'
import { urlFor } from '@/sanity/lib/image'
import Link from 'next/link'

export const Posts = ({ posts }: { posts: any }) => {
  return (
    <section className='grid grid-cols-3 gap-10'>
      {posts.map((post: any) => (
        <Link href={`/blog/${post.slug.current}`} key={post.id}>
          <Border>
            <div className='aspect-square overflow-hidden relative'>
              <img
                src={urlFor(post.mainImage)}
                alt={post.title}
                className='absolute inset-0 object-cover hover:scale-[102%] transition aspect-square overflow-hidden'
              />
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
