import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Container } from '@/components/container'
import { Posts } from '../_components/posts'
import {
  isSupportedLanguage,
  supportedLanguages
} from '@/lib/i18n/site-languages'
import { sanityFetch } from '@/sanity/lib/fetch'
import {
  categoriesByLanguageQuery,
  postsListByLanguageQuery,
  unifiedCategoriesQuery,
  unifiedPostsQuery
} from '@/sanity/lib/queries'
import { type Category, type Post, type SupportedLanguage } from '@/types/blog'
import { createLocalizedListingAlternates } from '@/lib/seo/alternates'
import { type LocalizedSeoLocale } from '@/lib/seo/site'
import { buildPageMetadata } from '@/lib/seo/metadata'
import {
  mapUnifiedCategoryToCategory,
  mapUnifiedPostToPost
} from '@/lib/blog/unified-post-mapper'
import { type UnifiedCategory } from '@/types/unified-category'
import { type UnifiedPost } from '@/types/unified-post'

interface Props {
  params: Promise<{ lang: string }>
}

const languageNames = {
  cs: 'Články',
  en: 'Articles',
  de: 'Artikel'
} as const

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params

  if (!isSupportedLanguage(lang)) {
    return {
      title: 'Blog Not Found'
    }
  }

  const title = languageNames[lang]
  const description =
    lang === 'cs' ?
      'Přečtěte si nejnovější články a novinky ze světa piva a gastronomie.'
    : lang === 'en' ?
      'Read the latest articles and news from the world of beer and gastronomy.'
    : 'Lesen Sie die neuesten Artikel und Nachrichten aus der Welt des Bieres und der Gastronomie.'
  const alternates = createLocalizedListingAlternates(
    'clanky',
    lang as LocalizedSeoLocale
  )

  return buildPageMetadata({
    title,
    description,
    canonicalPath: alternates.canonical,
    alternates,
    locale: lang as LocalizedSeoLocale,
    twitterCard: 'summary'
  })
}

export async function generateStaticParams() {
  return supportedLanguages.map((lang) => ({
    lang
  }))
}

export const revalidate = 60

export default async function Page({ params }: Props) {
  const { lang } = await params

  if (!isSupportedLanguage(lang)) {
    notFound()
  }

  const [posts, categories] = await Promise.all([
    sanityFetch<UnifiedPost[]>({
      query: unifiedPostsQuery,
      tags: ['blog:unified:posts:list'],
      revalidate: 60
    }),
    sanityFetch<UnifiedCategory[]>({
      query: unifiedCategoriesQuery,
      tags: ['blog:unified:categories:list'],
      revalidate: 300
    })
  ])

  const mappedUnifiedPosts = posts
    .map((post) => mapUnifiedPostToPost(post, lang as SupportedLanguage))
    .filter((post): post is Post => post !== null)
  const mappedUnifiedCategories = categories
    .map((category) =>
      mapUnifiedCategoryToCategory(category, lang as SupportedLanguage)
    )
    .filter((category): category is Category => category !== null)

  const resolvedPosts =
    mappedUnifiedPosts.length > 0 ?
      mappedUnifiedPosts
    : await sanityFetch<Post[]>({
        query: postsListByLanguageQuery,
        params: { language: lang },
        tags: [`blog:posts:${lang}`],
        revalidate: 60
      })

  const resolvedCategories =
    mappedUnifiedCategories.length > 0 ?
      mappedUnifiedCategories
    : await sanityFetch<Category[]>({
        query: categoriesByLanguageQuery,
        params: { language: lang },
        tags: [`blog:categories:${lang}`],
        revalidate: 300
      })

  return (
    <main className='bg-brand-primary pt-32 pb-28 md:pt-40'>
      <h1 className='sr-only'>{languageNames[lang]}</h1>
      <Container>
        <Posts
          posts={resolvedPosts}
          categories={resolvedCategories}
          language={lang as SupportedLanguage}
        />
      </Container>
    </main>
  )
}
