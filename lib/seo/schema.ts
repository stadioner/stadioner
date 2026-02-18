import { toAbsoluteUrl } from '@/lib/seo/site'

type JsonLd = Record<string, unknown>

const organizationId = toAbsoluteUrl('/#organization')
const websiteId = toAbsoluteUrl('/#website')

interface PortableTextChild {
  _type?: string
  text?: string
}

interface PortableTextBlockLike {
  _type?: string
  children?: PortableTextChild[]
}

interface BlogPostingSchemaInput {
  headline: string
  description: string
  url: string
  datePublished: string
  dateModified?: string
  imageUrl?: string
  language: string
  keywords?: string[]
}

interface EventSchemaInput {
  name: string
  description: string
  url: string
  startDate: string
  endDate?: string
  imageUrl?: string
  location?: string
  language: string
}

type ProductAvailability = 'InStock' | 'OutOfStock' | 'PreOrder'

interface ProductSchemaInput {
  name: string
  description: string
  sku: string
  imageUrl: string
  productUrl: string
  language: string
  availability?: ProductAvailability
}

export const jsonLdToHtml = (schema: JsonLd) => ({
  __html: JSON.stringify(schema),
})

export const portableTextToPlainText = (
  blocks?: readonly PortableTextBlockLike[],
) => {
  if (!blocks || blocks.length === 0) {
    return ''
  }

  const text = blocks
    .map(block =>
      Array.isArray(block.children)
        ? block.children
            .map(child => (typeof child.text === 'string' ? child.text : ''))
            .join(' ')
        : '',
    )
    .filter(Boolean)
    .join(' ')

  return text.replace(/\s+/g, ' ').trim()
}

export const buildOrganizationSchema = (): JsonLd => ({
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': organizationId,
  name: 'Stadioner Pivovar Kout na Šumavě',
  url: toAbsoluteUrl('/'),
  logo: toAbsoluteUrl('/logo.svg'),
  image: toAbsoluteUrl('/hero/main.svg'),
  email: 'info@stadioner.cz',
  telephone: '+420601535416',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Kout na Šumavě 2',
    postalCode: '34502',
    addressLocality: 'Kout na Šumavě',
    addressCountry: 'CZ',
  },
  sameAs: [
    'https://www.facebook.com/stadioner.cz',
    'https://www.instagram.com/stadioner.cz/',
  ],
})

export const buildWebSiteSchema = (): JsonLd => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': websiteId,
  url: toAbsoluteUrl('/'),
  name: 'Stadioner',
  inLanguage: 'cs',
  publisher: {
    '@id': organizationId,
  },
})

export const buildBlogPostingSchema = ({
  headline,
  description,
  url,
  datePublished,
  dateModified,
  imageUrl,
  language,
  keywords = [],
}: BlogPostingSchemaInput): JsonLd => ({
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  mainEntityOfPage: url,
  headline,
  description,
  datePublished,
  dateModified: dateModified ?? datePublished,
  inLanguage: language,
  image: imageUrl ? [imageUrl] : undefined,
  keywords: keywords.length > 0 ? keywords : undefined,
  author: {
    '@type': 'Organization',
    name: 'Stadioner',
  },
  publisher: {
    '@id': organizationId,
  },
})

export const buildEventSchema = ({
  name,
  description,
  url,
  startDate,
  endDate,
  imageUrl,
  location,
  language,
}: EventSchemaInput): JsonLd => ({
  '@context': 'https://schema.org',
  '@type': 'Event',
  name,
  description,
  url,
  inLanguage: language,
  startDate,
  endDate: endDate ?? undefined,
  image: imageUrl ? [imageUrl] : undefined,
  eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  eventStatus: 'https://schema.org/EventScheduled',
  organizer: {
    '@id': organizationId,
  },
  location: location
    ? {
        '@type': 'Place',
        name: location,
      }
    : undefined,
})

export const buildProductSchema = ({
  name,
  description,
  sku,
  imageUrl,
  productUrl,
  language,
  availability = 'InStock',
}: ProductSchemaInput): JsonLd => ({
  '@context': 'https://schema.org',
  '@type': 'Product',
  name,
  description,
  sku,
  inLanguage: language,
  image: [imageUrl],
  brand: {
    '@type': 'Brand',
    name: 'Stadioner',
  },
  offers: {
    '@type': 'Offer',
    url: productUrl,
    availability: `https://schema.org/${availability}`,
    seller: {
      '@id': organizationId,
    },
  },
})
