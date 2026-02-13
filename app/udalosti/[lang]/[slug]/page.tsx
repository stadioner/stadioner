import { sanityFetch } from '@/sanity/lib/fetch'
import {
  eventLanguageVariantsBySlugQuery,
  eventBySlugQuery,
  eventsPathsByLanguageQuery,
} from '@/sanity/lib/queries'
import { type SupportedLanguage } from '@/types/blog'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import createImageUrlBuilder from '@sanity/image-url'
import { dataset, projectId } from '@/sanity/env'
import { Container } from '@/components/container'
import { EventDetail } from '../_components/event-detail'
import {
  isSupportedLanguage,
  supportedLanguages,
} from '@/lib/i18n/site-languages'
import { type Event } from '@/types/event'
import { createLocalizedDetailAlternates } from '@/lib/seo/alternates'
import {
  localizedSeoLocales,
  toAbsoluteUrl,
  type LocalizedSeoLocale,
} from '@/lib/seo/site'
import {
  buildEventSchema,
  jsonLdToHtml,
  portableTextToPlainText,
} from '@/lib/seo/schema'

interface Props {
  params: Promise<{ lang: string; slug: string }>
}

const imageUrlBuilder = createImageUrlBuilder({ projectId, dataset })

const isLocalizedSeoLocale = (
  locale: string,
): locale is LocalizedSeoLocale => {
  return localizedSeoLocales.includes(locale as LocalizedSeoLocale)
}

const getEventImageUrl = (event: Event) => {
  if (!event.mainImage) {
    return ''
  }

  return imageUrlBuilder.image(event.mainImage).width(1200).height(630).url()
}

const resolveEventAvailableLocales = async (slug: string) => {
  const variants =
    (await sanityFetch<{ language: string }[]>({
      query: eventLanguageVariantsBySlugQuery,
      params: { slug, languages: [...localizedSeoLocales] },
      tags: [`events:variants:${slug}`],
      revalidate: 300,
    }).catch(() => [])) ?? []

  return variants
    .map(variant => variant.language)
    .filter(isLocalizedSeoLocale)
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params

  if (!isSupportedLanguage(lang)) {
    return {
      title: 'Event Not Found',
    }
  }

  const event = await sanityFetch<Event | null>({
    query: eventBySlugQuery,
    params: { slug, language: lang },
    tags: [`events:detail:${lang}:${slug}`],
    revalidate: 60,
  })

  if (!event) {
    return {
      title: 'Event Not Found',
    }
  }

  const title = event.title
  const description = portableTextToPlainText(event.description) || title
  const imageUrl = getEventImageUrl(event)
  const availableLocales = await resolveEventAvailableLocales(slug)
  const alternates = createLocalizedDetailAlternates(
    'udalosti',
    lang,
    slug,
    availableLocales,
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
      publishedTime: event.dateTime,
      images: imageUrl
        ? [
            {
              url: imageUrl,
              width: 1200,
              height: 630,
              alt: event.mainImage?.alt || event.title,
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
      const events = await sanityFetch<{ params: { slug: string } }[]>({
        query: eventsPathsByLanguageQuery,
        params: { language: lang },
        tags: [`events:paths:${lang}`],
        revalidate: 300,
      })

      if (!Array.isArray(events)) return []
      return events.map((event: { params: { slug: string } }) => ({
        lang,
        slug: event.params.slug,
      }))
    }),
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

  const event = await sanityFetch<Event | null>({
    query: eventBySlugQuery,
    params: { slug, language: lang },
    tags: [`events:detail:${lang}:${slug}`],
    revalidate: 60,
  })

  if (!event) {
    notFound()
  }

  const eventEnd = new Date(event.endDateTime ?? event.dateTime)
  if (eventEnd.getTime() < Date.now()) {
    notFound()
  }

  const description = portableTextToPlainText(event.description) || event.title
  const imageUrl = getEventImageUrl(event) || undefined
  const eventSchema = buildEventSchema({
    name: event.title,
    description,
    url: toAbsoluteUrl(`/udalosti/${lang}/${encodeURIComponent(slug)}`),
    startDate: event.dateTime,
    endDate: event.endDateTime,
    imageUrl,
    location: event.location,
    language: lang,
  })

  return (
    <>
      <main className='bg-brand-primary pt-32 md:pt-40 pb-20'>
        <Container>
          <EventDetail event={event} language={lang as SupportedLanguage} />
        </Container>
      </main>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={jsonLdToHtml(eventSchema)}
      />
    </>
  )
}
