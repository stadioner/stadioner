import { Post } from '../../_components/post'
import { sanityFetch } from '@/sanity/lib/fetch'
import {
  postVariantsByTranslationKeyQuery,
  postBySlugQuery,
  postsPathsByLanguageQuery,
  unifiedPostByLocalizedSlugQuery,
  unifiedPostsQuery
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
  supportedLanguages
} from '@/lib/i18n/site-languages'
import { type Post as BlogPost } from '@/types/blog'
import { createLocalizedDetailAlternatesFromVariants } from '@/lib/seo/alternates'
import {
  isLocalizedSeoLocale,
  localizedSeoLocales,
  toAbsoluteUrl,
  type LocalizedSeoLocale
} from '@/lib/seo/site'
import {
  buildBlogPostingSchema,
  jsonLdToHtml,
  portableTextToPlainText
} from '@/lib/seo/schema'
import {
  getUnifiedPostVariants,
  mapUnifiedPostToPost
} from '@/lib/blog/unified-post-mapper'
import { type UnifiedPost } from '@/types/unified-post'

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
      revalidate: 300
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
        slug: variant.slug
      })

      return acc
    },
    []
  )
}

const getUnifiedPost = async (slug: string): Promise<UnifiedPost | null> =>
  sanityFetch<UnifiedPost | null>({
    query: unifiedPostByLocalizedSlugQuery,
    params: { slug },
    tags: [`blog:unified:detail:${slug}`],
    revalidate: 60
  })

const getLocalizedPost = async (
  slug: string,
  language: SupportedLanguage
): Promise<{
  post: BlogPost
  variants: Array<{ locale: LocalizedSeoLocale; slug: string }>
} | null> => {
  const unifiedPost = await getUnifiedPost(slug)

  if (unifiedPost) {
    const mappedPost = mapUnifiedPostToPost(unifiedPost, language)

    if (mappedPost) {
      return {
        post: mappedPost,
        variants: getUnifiedPostVariants(unifiedPost)
      }
    }
  }

  const legacyPost = await sanityFetch<BlogPost | null>({
    query: postBySlugQuery,
    params: { slug, language },
    tags: [`blog:post:${language}:${slug}`],
    revalidate: 60
  })

  if (!legacyPost) {
    return null
  }

  return {
    post: legacyPost,
    variants: await resolveBlogVariants(legacyPost.translationKey)
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params

  if (!isSupportedLanguage(lang)) {
    return {
      title: 'Post Not Found'
    }
  }

  const localizedPost = await getLocalizedPost(slug, lang as SupportedLanguage)

  if (!localizedPost) {
    return {
      title: 'Post Not Found'
    }
  }

  const { post, variants } = localizedPost
  const title = post.title
  const description = portableTextToPlainText(post.body) || post.title
  const imageUrl = getPostImageUrl(post)
  const alternates = createLocalizedDetailAlternatesFromVariants(
    'clanky',
    lang,
    slug,
    variants
  )
  const canonicalUrl = toAbsoluteUrl(alternates.canonical)

  return {
    title,
    description,
    alternates,
    openGraph: {
      title,
      description,
      type: 'article',
      url: canonicalUrl,
      publishedTime: post.publishedAt,
      images:
        imageUrl ?
          [
            {
              url: imageUrl,
              width: 1200,
              height: 630,
              alt: post.mainImage?.alt || post.title
            }
          ]
        : []
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: imageUrl ? [imageUrl] : []
    }
  }
}

export async function generateStaticParams() {
  const [unifiedPosts, ...legacyPostsByLang] = await Promise.all([
    sanityFetch<UnifiedPost[]>({
      query: unifiedPostsQuery,
      tags: ['blog:unified:paths'],
      revalidate: 300
    }),
    ...supportedLanguages.map((lang) =>
      sanityFetch<{ params: { slug: string } }[]>({
        query: postsPathsByLanguageQuery,
        params: { language: lang },
        tags: [`blog:paths:${lang}`],
        revalidate: 300
      })
    )
  ])

  const paramKey = (p: { lang: string; slug: string }) => `${p.lang}:${p.slug}`

  const fromUnified = unifiedPosts.flatMap((post) =>
    getUnifiedPostVariants(post).map((variant) => ({
      lang: variant.locale,
      slug: variant.slug
    }))
  )

  const unifiedKeys = new Set(fromUnified.map(paramKey))

  const fromLegacy = supportedLanguages.flatMap((lang, index) => {
    const posts = legacyPostsByLang[index] ?? []
    return posts
      .map((post: { params: { slug: string } }) => ({
        lang,
        slug: post.params.slug
      }))
      .filter((p) => !unifiedKeys.has(paramKey(p)))
  })

  return [...fromUnified, ...fromLegacy]
}

// Enable ISR with 60 second revalidation
export const revalidate = 60

export default async function Page({ params }: Props) {
  const { lang, slug } = await params

  if (!isSupportedLanguage(lang)) {
    notFound()
  }

  const localizedPost = await getLocalizedPost(slug, lang as SupportedLanguage)

  if (!localizedPost) {
    notFound()
  }

  const { post } = localizedPost
  const title = post.title
  const description = portableTextToPlainText(post.body) || post.title
  const imageUrl = getPostImageUrl(post) || undefined
  const articleSchema = buildBlogPostingSchema({
    headline: title,
    description,
    url: toAbsoluteUrl(`/${lang}/clanky/${encodeURIComponent(slug)}`),
    datePublished: post.publishedAt,
    imageUrl,
    language: lang
  })

  return (
    <>
      <main className='bg-brand-primary pt-32 pb-20 md:pt-40'>
        <Container className='relative grid-cols-[auto_auto] gap-10 lg:grid'>
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
