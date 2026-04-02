import { sanityFetch } from '@/sanity/lib/fetch'
import {
  eventVariantsByTranslationKeyQuery,
  eventBySlugQuery,
  eventsPathsByLanguageQuery,
  unifiedEventByLocalizedSlugQuery,
  unifiedEventsQuery
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
  supportedLanguages
} from '@/lib/i18n/site-languages'
import { type Event } from '@/types/event'
import { createLocalizedDetailAlternatesFromVariants } from '@/lib/seo/alternates'
import {
  isLocalizedSeoLocale,
  localizedSeoLocales,
  toAbsoluteUrl,
  type LocalizedSeoLocale
} from '@/lib/seo/site'
import {
  buildEventSchema,
  jsonLdToHtml,
  portableTextToPlainText
} from '@/lib/seo/schema'
import { canAccessEventDetail } from '@/lib/events/visibility'
import {
  getUnifiedEventVariants,
  mapUnifiedEventToEvent
} from '@/lib/events/unified-event-mapper'
import { type UnifiedEvent } from '@/types/unified-event'

interface Props {
  params: Promise<{ lang: string; slug: string }>
}

const imageUrlBuilder = createImageUrlBuilder({ projectId, dataset })

const getEventImageUrl = (event: Event) => {
  if (!event.mainImage) {
    return ''
  }

  return imageUrlBuilder.image(event.mainImage).width(1200).height(630).url()
}

const resolveEventVariants = async (translationKey?: string) => {
  if (!translationKey) {
    return []
  }

  const variants =
    (await sanityFetch<{ language: string; slug?: string }[]>({
      query: eventVariantsByTranslationKeyQuery,
      params: { translationKey, languages: [...localizedSeoLocales] },
      tags: [`events:variants:${translationKey}`],
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

const getUnifiedEvent = async (slug: string): Promise<UnifiedEvent | null> =>
  sanityFetch<UnifiedEvent | null>({
    query: unifiedEventByLocalizedSlugQuery,
    params: { slug },
    tags: [`events:unified:detail:${slug}`],
    revalidate: 60
  })

const getLocalizedEvent = async (
  slug: string,
  language: SupportedLanguage
): Promise<{
  event: Event
  variants: Array<{ locale: LocalizedSeoLocale; slug: string }>
} | null> => {
  const unifiedEvent = await getUnifiedEvent(slug)

  if (unifiedEvent) {
    const mappedEvent = mapUnifiedEventToEvent(unifiedEvent, language)

    if (mappedEvent) {
      return {
        event: mappedEvent,
        variants: getUnifiedEventVariants(unifiedEvent)
      }
    }
  }

  const legacyEvent = await sanityFetch<Event | null>({
    query: eventBySlugQuery,
    params: { slug, language },
    tags: [`events:detail:${language}:${slug}`],
    revalidate: 60
  })

  if (!legacyEvent) {
    return null
  }

  return {
    event: legacyEvent,
    variants: await resolveEventVariants(legacyEvent.translationKey)
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params

  if (!isSupportedLanguage(lang)) {
    return {
      title: 'Event Not Found'
    }
  }

  const localizedEvent = await getLocalizedEvent(
    slug,
    lang as SupportedLanguage
  )

  if (!localizedEvent) {
    return {
      title: 'Event Not Found'
    }
  }

  const { event, variants } = localizedEvent

  if (!canAccessEventDetail(event)) {
    return {
      title: 'Event Not Found'
    }
  }

  const title = event.title
  const description =
    portableTextToPlainText(event.description) ||
    portableTextToPlainText(event.recap) ||
    title
  const imageUrl = getEventImageUrl(event)
  const alternates = createLocalizedDetailAlternatesFromVariants(
    'udalosti',
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
      publishedTime: event.dateTime,
      images:
        imageUrl ?
          [
            {
              url: imageUrl,
              width: 1200,
              height: 630,
              alt: event.mainImage?.alt || event.title
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
  const unifiedEvents = await sanityFetch<UnifiedEvent[]>({
    query: unifiedEventsQuery,
    tags: ['events:unified:paths'],
    revalidate: 300
  })

  if (unifiedEvents.length > 0) {
    return unifiedEvents.flatMap((event) =>
      getUnifiedEventVariants(event).map((variant) => ({
        lang: variant.locale,
        slug: variant.slug
      }))
    )
  }

  const allPaths = await Promise.all(
    supportedLanguages.map(async (lang) => {
      const events = await sanityFetch<{ params: { slug: string } }[]>({
        query: eventsPathsByLanguageQuery,
        params: { language: lang },
        tags: [`events:paths:${lang}`],
        revalidate: 300
      })

      if (!Array.isArray(events)) return []
      return events.map((event: { params: { slug: string } }) => ({
        lang,
        slug: event.params.slug
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

  const localizedEvent = await getLocalizedEvent(
    slug,
    lang as SupportedLanguage
  )

  if (!localizedEvent) {
    notFound()
  }

  const { event } = localizedEvent

  if (!canAccessEventDetail(event)) {
    notFound()
  }

  const description =
    portableTextToPlainText(event.description) ||
    portableTextToPlainText(event.recap) ||
    event.title
  const imageUrl = getEventImageUrl(event) || undefined
  const eventSchema = buildEventSchema({
    name: event.title,
    description,
    url: toAbsoluteUrl(`/${lang}/udalosti/${encodeURIComponent(slug)}`),
    startDate: event.dateTime,
    endDate: event.endDateTime,
    imageUrl,
    location: event.location,
    language: lang
  })

  return (
    <>
      <main className='bg-brand-primary pt-32 pb-20 md:pt-40'>
        <Container>
          <EventDetail
            event={event}
            language={lang as SupportedLanguage}
          />
        </Container>
      </main>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={jsonLdToHtml(eventSchema)}
      />
    </>
  )
}
