import { sanityFetch } from '@/sanity/lib/fetch'
import { recentPostsQuery } from '@/sanity/lib/queries'
import { SupportedLanguage, Post } from '@/types/blog'
import Link from 'next/link'
import { Border } from '@/components/border'
import { urlFor } from '@/sanity/lib/image'
import { Facebook, Instagram } from 'lucide-react'
import { NewsletterMiniForm } from './newsletter-mini-form'

interface SidebarProps {
  language: SupportedLanguage
}

const t = {
  cs: {
    followUs: 'Sledujte nás',
    recent: 'Nejnovější články',
    more: 'Všechny články',
    newsletter: 'Newsletter',
  },
  en: {
    followUs: 'Follow us',
    recent: 'Recent posts',
    more: 'All articles',
    newsletter: 'Newsletter',
  },
  de: {
    followUs: 'Folgen Sie uns',
    recent: 'Neueste Beiträge',
    more: 'Alle Artikel',
    newsletter: 'Newsletter',
  },
} as const

export const Sidebar = async ({ language }: SidebarProps) => {
  const recentPosts = await sanityFetch<Post[]>({
    query: recentPostsQuery,
    params: {
      language,
      limit: 2,
    },
    tags: [`blog:recent:${language}`],
    revalidate: 120,
  })

  return (
    <Border className='h-min lg:sticky lg:top-28 self-start lg:max-h-[calc(100vh-6rem)] lg:overflow-hidden max-w-[370px] ml-auto'>
      <section className='space-y-8 p-2'>
        <div>
          <h3 className='text-brand-action font-bold text-xl mb-3'>
            {t[language].recent}
          </h3>
          <div className='space-y-4'>
            {recentPosts?.map(post => (
              <Link
                key={post._id}
                href={`/clanky/${language}/${post.slug.current}`}
                className='block group'
              >
                <Border>
                  <div className='flex gap-3 p-3 items-center'>
                    <div className='w-16 h-16 overflow-hidden relative flex-shrink-0'>
                      <img
                        src={urlFor(post.mainImage)}
                        alt={post.mainImage?.alt || post.title}
                        className='absolute inset-0 w-full h-full object-cover group-hover:scale-[1.02] transition'
                      />
                    </div>
                    <div className='min-w-0'>
                      <p className='text-brand-action font-semibold leading-snug line-clamp-2'>
                        {post.title}
                      </p>
                      <div className='flex gap-1 mt-1 flex-wrap'>
                        {post.categories?.slice(0, 2).map(cat => (
                          <span
                            key={cat._id}
                            className='text-xs bg-brand-action/10 text-brand-action px-1.5 py-0.5'
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
              className='text-sm underline text-brand-action hover:text-brand-action/80'
            >
              {t[language].more}
            </Link>
          </div>
        </div>

        <div>
          <h3 className='text-brand-action font-bold text-xl mb-3'>
            {t[language].newsletter}
          </h3>
          <NewsletterMiniForm />
        </div>

        <div>
          <h3 className='text-brand-action font-bold text-xl mb-3'>
            {t[language].followUs}
          </h3>
          <div className='flex gap-3'>
            <Link
              href='https://www.facebook.com/stadioner.cz'
              target='_blank'
              rel='noopener noreferrer'
              className='inline-flex items-center gap-2 px-3 py-2 border border-brand-action text-brand-action hover:bg-brand-action hover:text-brand-primary transition'
            >
              <Facebook size={18} /> Facebook
            </Link>
            <Link
              href='https://www.instagram.com/stadioner.cz/'
              target='_blank'
              rel='noopener noreferrer'
              className='inline-flex items-center gap-2 px-3 py-2 border border-brand-action text-brand-action hover:bg-brand-action hover:text-brand-primary transition'
            >
              <Instagram size={18} /> Instagram
            </Link>
          </div>
        </div>
      </section>
    </Border>
  )
}
