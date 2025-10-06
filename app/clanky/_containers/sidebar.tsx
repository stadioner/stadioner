import { cachedClient } from '@/sanity/lib/client'
import { recentPostsQuery } from '@/sanity/lib/queries'
import { SupportedLanguage, Post } from '@/types/blog'
import Link from 'next/link'
import { Border } from '@/components/border'
import { urlFor } from '@/sanity/lib/image'
import { Facebook, Instagram } from 'lucide-react'

interface SidebarProps {
  language: SupportedLanguage
}

const t = {
  cs: {
    followUs: 'Sledujte nás',
    recent: 'Nejnovější články',
    more: 'Všechny články',
  },
  en: {
    followUs: 'Follow us',
    recent: 'Recent posts',
    more: 'All articles',
  },
  de: {
    followUs: 'Folgen Sie uns',
    recent: 'Neueste Beiträge',
    more: 'Alle Artikel',
  },
} as const

export const Sidebar = async ({ language }: SidebarProps) => {
  const recentPosts: Post[] = await cachedClient(recentPostsQuery, {
    language,
    limit: 2,
  })

  return (
    <Border>
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
            <Link
              href='https://www.tiktok.com/@stadioner.cz'
              target='_blank'
              rel='noopener noreferrer'
              className='inline-flex items-center gap-2 px-3 py-2 border border-brand-action text-brand-action hover:bg-brand-action hover:text-brand-primary transition'
            >
              <svg
                width='18'
                height='18'
                viewBox='0 0 24 24'
                fill='currentColor'
                aria-hidden='true'
              >
                <path d='M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z' />
              </svg>
              TikTok
            </Link>
          </div>
        </div>
      </section>
    </Border>
  )
}
