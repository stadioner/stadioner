import { cachedClient } from '@/sanity/lib/client'
import {
  postsByLanguageQuery,
  categoriesByLanguageQuery,
} from '@/sanity/lib/queries'
import { BlogPage } from './_containers/blog-page'
import { SupportedLanguage } from '@/types/blog'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'

interface Props {
  params: Promise<{ lang: string }>
}

const supportedLanguages: SupportedLanguage[] = ['cs', 'en', 'de']

const languageNames = {
  cs: 'Články',
  en: 'Articles',
  de: 'Artikel',
} as const

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params

  if (!supportedLanguages.includes(lang as SupportedLanguage)) {
    return {
      title: 'Blog Not Found',
    }
  }

  const title = `${languageNames[lang as keyof typeof languageNames]}`
  const description =
    lang === 'cs'
      ? 'Přečtěte si nejnovější články a novinky ze světa piva a gastronomie.'
      : lang === 'en'
        ? 'Read the latest articles and news from the world of beer and gastronomy.'
        : 'Lesen Sie die neuesten Artikel und Nachrichten aus der Welt des Bieres und der Gastronomie.'

  return {
    title,
    description,
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

// Enable ISR with 60 second revalidation
export const revalidate = 60

export default async function Page({ params }: Props) {
  const { lang } = await params

  if (!supportedLanguages.includes(lang as SupportedLanguage)) {
    notFound()
  }

  const [posts, categories] = await Promise.all([
    cachedClient(postsByLanguageQuery, { language: lang }),
    cachedClient(categoriesByLanguageQuery, { language: lang }),
  ])

  return (
    <BlogPage
      posts={posts}
      categories={categories}
      language={lang as SupportedLanguage}
    />
  )
}
