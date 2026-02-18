import type { Metadata } from 'next'
import {
  toAbsoluteUrl,
  type LocalizedSeoLocale,
} from '@/lib/seo/site'

interface BuildPageMetadataInput {
  title: string
  description: string
  canonicalPath: string
  keywords?: string[]
  locale?: LocalizedSeoLocale
  alternates?: Metadata['alternates']
  openGraphType?: 'website' | 'article'
  twitterCard?: 'summary' | 'summary_large_image'
  openGraphImages?: NonNullable<Metadata['openGraph']>['images']
  twitterImages?: NonNullable<Metadata['twitter']>['images']
}

const ogLocaleMap: Record<LocalizedSeoLocale, string> = {
  cs: 'cs_CZ',
  en: 'en_US',
  de: 'de_DE',
}

export const buildPageMetadata = ({
  title,
  description,
  canonicalPath,
  keywords,
  locale = 'cs',
  alternates,
  openGraphType = 'website',
  twitterCard = 'summary',
  openGraphImages,
  twitterImages,
}: BuildPageMetadataInput): Metadata => {
  const canonicalUrl = toAbsoluteUrl(canonicalPath)

  return {
    title,
    description,
    keywords,
    alternates: alternates ?? {
      canonical: canonicalPath,
    },
    openGraph: {
      title,
      description,
      type: openGraphType,
      url: canonicalUrl,
      locale: ogLocaleMap[locale],
      images: openGraphImages,
    },
    twitter: {
      card: twitterCard,
      title,
      description,
      images: twitterImages,
    },
  }
}
