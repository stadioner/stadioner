import { sanityFetch } from '@/sanity/lib/fetch'
import { recentPostsQuery, unifiedRecentPostsQuery } from '@/sanity/lib/queries'
import { SupportedLanguage, Post } from '@/types/blog'
import Image from 'next/image'
import Link from 'next/link'
import { Border } from '@/components/border'
import { urlFor } from '@/sanity/lib/image'
import { Facebook, Instagram } from 'lucide-react'
import { NewsletterMiniForm } from './newsletter-mini-form'
import { type UnifiedPost } from '@/types/unified-post'
import { mergeUnifiedAndLegacyPosts } from '@/lib/blog/merge-unified-legacy'
import { mapUnifiedPostToPost } from '@/lib/blog/unified-post-mapper'

interface SidebarProps {
  language: SupportedLanguage
}

const t = {
  cs: {
    followUs: 'Sledujte nás',
    recent: 'Nejnovější články',
    more: 'Všechny články',
    newsletter: 'Newsletter'
  },
  en: {
    followUs: 'Follow us',
    recent: 'Recent posts',
    more: 'All articles',
    newsletter: 'Newsletter'
  },
  de: {
    followUs: 'Folgen Sie uns',
    recent: 'Neueste Beiträge',
    more: 'Alle Artikel',
    newsletter: 'Newsletter'
  }
} as const

const recentCandidatesLimit = 24

export const Sidebar = async ({ language }: SidebarProps) => {
  const [unifiedRecentPosts, legacyRecentPosts] = await Promise.all([
    sanityFetch<UnifiedPost[]>({
      query: unifiedRecentPostsQuery,
      params: {
        limit: recentCandidatesLimit
      },
      tags: ['blog:unified:recent'],
      revalidate: 120
    }),
    sanityFetch<Post[]>({
      query: recentPostsQuery,
      params: {
        language,
        limit: recentCandidatesLimit
      },
      tags: [`blog:recent:${language}`],
      revalidate: 120
    })
  ])

  const mappedUnifiedPosts = unifiedRecentPosts
    .map((post) => mapUnifiedPostToPost(post, language))
    .filter((post): post is Post => post !== null)

  const recentPosts = mergeUnifiedAndLegacyPosts(
    mappedUnifiedPosts,
    legacyRecentPosts
  ).slice(0, 2)

  return (
    <Border className='mt-8 ml-auto h-min max-w-[370px] self-start lg:sticky lg:top-28 lg:max-h-[calc(100vh-6rem)] lg:overflow-hidden'>
      <section className='space-y-8 p-2'>
        <div>
          <h3 className='text-brand-action mb-3 text-xl font-bold'>
            {t[language].recent}
          </h3>
          <div className='space-y-4'>
            {recentPosts?.map((post) => (
              <Link
                key={post._id}
                href={`/clanky/${language}/${post.slug.current}`}
                className='group block'
              >
                <Border>
                  <div className='flex items-center gap-3 p-3'>
                    <div className='relative h-16 w-16 flex-shrink-0 overflow-hidden'>
                      <Image
                        src={urlFor(post.mainImage)}
                        alt={post.mainImage?.alt || post.title}
                        fill
                        sizes='64px'
                        className='absolute inset-0 h-full w-full object-cover transition group-hover:scale-[1.02]'
                      />
                    </div>
                    <div className='min-w-0'>
                      <p className='text-brand-action line-clamp-2 leading-snug font-semibold'>
                        {post.title}
                      </p>
                      <div className='mt-1 flex flex-wrap gap-1'>
                        {post.categories?.slice(0, 2).map((cat) => (
                          <span
                            key={cat._id}
                            className='bg-brand-action/10 text-brand-action px-1.5 py-0.5 text-xs'
                          >
                            {cat.title}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Border>
              </Link>
            ))}
          </div>
          <div className='mt-3 text-right'>
            <Link
              href={`/clanky/${language}`}
              className='text-brand-action hover:text-brand-action/80 text-sm underline'
            >
              {t[language].more}
            </Link>
          </div>
        </div>

        <div>
          <h3 className='text-brand-action mb-3 text-xl font-bold'>
            {t[language].newsletter}
          </h3>
          <NewsletterMiniForm />
        </div>

        <div>
          <h3 className='text-brand-action mb-3 text-xl font-bold'>
            {t[language].followUs}
          </h3>
          <div className='flex gap-3'>
            <Link
              href='https://www.facebook.com/stadioner.cz'
              target='_blank'
              rel='noopener noreferrer'
              className='border-brand-action text-brand-action hover:bg-brand-action hover:text-brand-primary inline-flex items-center gap-2 border px-3 py-2 transition'
            >
              <Facebook size={18} /> Facebook
            </Link>
            <Link
              href='https://www.instagram.com/stadioner.cz/'
              target='_blank'
              rel='noopener noreferrer'
              className='border-brand-action text-brand-action hover:bg-brand-action hover:text-brand-primary inline-flex items-center gap-2 border px-3 py-2 transition'
            >
              <Instagram size={18} /> Instagram
            </Link>
          </div>
        </div>
      </section>
    </Border>
  )
}
