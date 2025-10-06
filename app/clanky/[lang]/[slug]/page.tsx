import { Post } from '../../_containers/post'
import { cachedClient } from '@/sanity/lib/client'
import {
  postBySlugQuery,
  postsPathsByLanguageQuery,
} from '@/sanity/lib/queries'
import { SupportedLanguage } from '@/types/blog'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import createImageUrlBuilder from '@sanity/image-url'
import { dataset, projectId } from '@/sanity/env'
import { Sidebar } from '../../_containers/sidebar'
import { Container } from '@/components/container'

interface Props {
  params: Promise<{ lang: string; slug: string }>
}

const supportedLanguages: SupportedLanguage[] = ['cs', 'en', 'de']

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params

  if (!supportedLanguages.includes(lang as SupportedLanguage)) {
    return {
      title: 'Post Not Found',
    }
  }

  const post = await cachedClient(postBySlugQuery, { slug, language: lang })

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  const title = post.seo?.metaTitle || post.title
  const description = post.seo?.metaDescription || ''
  const keywords = post.seo?.keywords || []
  const imageUrl = post.mainImage
    ? createImageUrlBuilder({ projectId, dataset })
        .image(post.mainImage)
        .width(1200)
        .height(630)
        .url()
    : ''

  return {
    title,
    description,
    keywords: keywords.join(', '),
    openGraph: {
      title,
      description,
      type: 'article',
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
      const posts = await cachedClient(postsPathsByLanguageQuery, {
        language: lang,
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

  if (!supportedLanguages.includes(lang as SupportedLanguage)) {
    notFound()
  }

  const post = await cachedClient(postBySlugQuery, { slug, language: lang })

  if (!post) {
    notFound()
  }

  return (
    <main className='bg-brand-primary pt-32 md:pt-40 pb-20'>
      <Container className='lg:grid grid-cols-[1.5fr_1fr] gap-10 relative'>
        <Post post={post} />
        <Sidebar language={lang as SupportedLanguage} />
      </Container>
    </main>
  )
}
