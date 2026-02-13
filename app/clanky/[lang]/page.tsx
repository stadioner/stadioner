import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Container } from '@/components/container'
import { Posts } from '../_components/posts'
import {
  isSupportedLanguage,
  supportedLanguages,
} from '@/lib/i18n/site-languages'
import { sanityFetch } from '@/sanity/lib/fetch'
import {
  categoriesByLanguageQuery,
  postsListByLanguageQuery,
} from '@/sanity/lib/queries'
import { type Category, type Post, type SupportedLanguage } from '@/types/blog'
import { createLocalizedListingAlternates } from '@/lib/seo/alternates'
import { type LocalizedSeoLocale } from '@/lib/seo/site'

interface Props {
  params: Promise<{ lang: string }>
}

const languageNames = {
  cs: 'Články',
  en: 'Articles',
  de: 'Artikel',
} as const

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params

  if (!isSupportedLanguage(lang)) {
    return {
      title: 'Blog Not Found',
    }
  }

  const title = languageNames[lang]
  const description =
    lang === 'cs'
      ? 'Přečtěte si nejnovější články a novinky ze světa piva a gastronomie.'
      : lang === 'en'
        ? 'Read the latest articles and news from the world of beer and gastronomy.'
        : 'Lesen Sie die neuesten Artikel und Nachrichten aus der Welt des Bieres und der Gastronomie.'
  const alternates = createLocalizedListingAlternates(
    'clanky',
    lang as LocalizedSeoLocale,
  )

  return {
    title,
    description,
    alternates,
    openGraph: {
      title,
      description,
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
  }
}

export async function generateStaticParams() {
  return supportedLanguages.map(lang => ({
    lang,
  }))
}

export const revalidate = 60

export default async function Page({ params }: Props) {
  const { lang } = await params

  if (!isSupportedLanguage(lang)) {
    notFound()
  }

  const [posts, categories] = await Promise.all([
    sanityFetch<Post[]>({
      query: postsListByLanguageQuery,
      params: { language: lang },
      tags: [`blog:posts:${lang}`],
      revalidate: 60,
    }),
    sanityFetch<Category[]>({
      query: categoriesByLanguageQuery,
      params: { language: lang },
      tags: [`blog:categories:${lang}`],
      revalidate: 300,
    }),
  ])

  return (
    <main className='bg-brand-primary pt-32 md:pt-40 pb-28'>
      <Container>
        <Posts
          posts={posts}
          categories={categories}
          language={lang as SupportedLanguage}
        />
      </Container>
    </main>
  )
}
