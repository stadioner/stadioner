import { Post } from '../../_components/post'
import { sanityFetch } from '@/sanity/lib/fetch'
import {
  postVariantsByTranslationKeyQuery,
  postBySlugQuery,
  postsPathsByLanguageQuery,
} from '@/sanity/lib/queries'
import { type SupportedLanguage } from '@/types/blog'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import createImageUrlBuilder from '@sanity/image-url'
import { dataset, projectId } from '@/sanity/env'
import { Sidebar } from '../../_components/sidebar'
import { Container } from '@/components/container'
import {
  isSupportedLanguage,
  supportedLanguages,
} from '@/lib/i18n/site-languages'
import { type Post as BlogPost } from '@/types/blog'
import {
  createLocalizedDetailAlternatesFromVariants,
} from '@/lib/seo/alternates'
import {
  isLocalizedSeoLocale,
  localizedSeoLocales,
  toAbsoluteUrl,
  type LocalizedSeoLocale,
} from '@/lib/seo/site'
import {
  buildBlogPostingSchema,
  jsonLdToHtml,
} from '@/lib/seo/schema'

interface Props {
  params: Promise<{ lang: string; slug: string }>
}

const imageUrlBuilder = createImageUrlBuilder({ projectId, dataset })

const getPostImageUrl = (post: BlogPost) => {
  if (!post.mainImage) {
    return ''
  }

  return imageUrlBuilder.image(post.mainImage).width(1200).height(630).url()
}

const resolveBlogVariants = async (translationKey?: string) => {
  if (!translationKey) {
    return []
  }

  const variants =
    (await sanityFetch<{ language: string; slug?: string }[]>({
      query: postVariantsByTranslationKeyQuery,
      params: { translationKey, languages: [...localizedSeoLocales] },
      tags: [`blog:variants:${translationKey}`],
      revalidate: 300,
    }).catch(() => [])) ?? []

  return variants.reduce<Array<{ locale: LocalizedSeoLocale; slug: string }>>(
    (acc, variant) => {
      if (
        !isLocalizedSeoLocale(variant.language) ||
        typeof variant.slug !== 'string' ||
        variant.slug.length === 0
      ) {
        return acc
      }

      acc.push({
        locale: variant.language,
        slug: variant.slug,
      })

      return acc
    },
    [],
  )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params

  if (!isSupportedLanguage(lang)) {
    return {
      title: 'Post Not Found',
    }
  }

  const post = await sanityFetch<BlogPost | null>({
    query: postBySlugQuery,
    params: { slug, language: lang },
    tags: [`blog:post:${lang}:${slug}`],
    revalidate: 60,
  })

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  const title = post.seo?.metaTitle || post.title
  const description = post.seo?.metaDescription || post.title
  const keywords = post.seo?.keywords || []
  const imageUrl = getPostImageUrl(post)
  const variants = await resolveBlogVariants(post.translationKey)
  const alternates = createLocalizedDetailAlternatesFromVariants(
    'clanky',
    lang,
    slug,
    variants,
  )
  const canonicalUrl = toAbsoluteUrl(alternates.canonical)

  return {
    title,
    description,
    keywords,
    alternates,
    openGraph: {
      title,
      description,
      type: 'article',
      url: canonicalUrl,
      publishedTime: post.publishedAt,
      tags: keywords,
      images: imageUrl
        ? [
            {
              url: imageUrl,
              width: 1200,
              height: 630,
              alt: post.mainImage?.alt || post.title,
            },
          ]
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: imageUrl ? [imageUrl] : [],
    },
  }
}

export async function generateStaticParams() {
  const allPaths = await Promise.all(
    supportedLanguages.map(async lang => {
      const posts = await sanityFetch<{ params: { slug: string } }[]>({
        query: postsPathsByLanguageQuery,
        params: { language: lang },
        tags: [`blog:paths:${lang}`],
        revalidate: 300,
      })

      return posts.map((post: { params: { slug: string } }) => ({
        lang,
        slug: post.params.slug,
      }))
    })
  )

  return allPaths.flat()
}

// Enable ISR with 60 second revalidation
export const revalidate = 60

export default async function Page({ params }: Props) {
  const { lang, slug } = await params

  if (!isSupportedLanguage(lang)) {
    notFound()
  }

  const post = await sanityFetch<BlogPost | null>({
    query: postBySlugQuery,
    params: { slug, language: lang },
    tags: [`blog:post:${lang}:${slug}`],
    revalidate: 60,
  })

  if (!post) {
    notFound()
  }

  const title = post.seo?.metaTitle || post.title
  const description = post.seo?.metaDescription || post.title
  const imageUrl = getPostImageUrl(post) || undefined
  const articleSchema = buildBlogPostingSchema({
    headline: title,
    description,
    url: toAbsoluteUrl(`/${lang}/clanky/${encodeURIComponent(slug)}`),
    datePublished: post.publishedAt,
    imageUrl,
    language: lang,
    keywords: post.seo?.keywords || [],
  })

  return (
    <>
      <main className='bg-brand-primary pt-32 md:pt-40 pb-20'>
        <Container className='lg:grid grid-cols-[1.5fr_1fr] gap-10 lg:gap-20 relative'>
          <Post post={post} />
          <Sidebar language={lang as SupportedLanguage} />
        </Container>
      </main>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={jsonLdToHtml(articleSchema)}
      />
    </>
  )
}
