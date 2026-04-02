import { MetadataRoute } from 'next'
import { sanityFetch } from '@/sanity/lib/fetch'
import {
  eventsForSitemapByLanguageQuery,
  postsForSitemapByLanguageQuery,
  unifiedEventsForSitemapQuery,
  unifiedPostsForSitemapQuery
} from '@/sanity/lib/queries'
import { canAccessEventDetail } from '@/lib/events/visibility'
import { localizedSeoLocales, toAbsoluteUrl } from '@/lib/seo/site'
import { type PortableTextBlock } from 'sanity'
import {
  getLocalizedRecap,
  getUnifiedEventVariants
} from '@/lib/events/unified-event-mapper'
import { type UnifiedEvent } from '@/types/unified-event'
import { type UnifiedPost } from '@/types/unified-post'
import { getUnifiedPostVariants } from '@/lib/blog/unified-post-mapper'
import { hasSanityWriteToken, writeClient } from '@/sanity/lib/write-client'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  const createEntry = (
    path: string,
    changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'],
    priority: number,
    lastModified: Date = now
  ): MetadataRoute.Sitemap[number] => ({
    url: toAbsoluteUrl(path),
    lastModified,
    changeFrequency,
    priority
  })

  const staticLocalizedPaths = localizedSeoLocales.flatMap((locale) => [
    `/${locale}`,
    `/${locale}/historie`,
    `/${locale}/produkty`,
    `/${locale}/kontakt`,
    `/${locale}/prodejni-mista`,
    `/${locale}/newsletter`,
    `/${locale}/pro-firmy`,
    `/${locale}/rozcestnik`,
    `/${locale}/cookies`,
    `/${locale}/gdpr`,
    `/${locale}/obchodni-podminky`
  ])

  const staticPages = staticLocalizedPaths.map((path) => {
    const changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] =
      (
        path.includes('/cookies') ||
        path.includes('/gdpr') ||
        path.includes('/obchodni-podminky')
      ) ?
        'yearly'
      : path.endsWith('/produkty') || path.endsWith('/kontakt') ? 'weekly'
      : 'daily'

    const priority =
      path.split('/').length <= 2 ? 1
      : path.endsWith('/produkty') ? 0.9
      : path.endsWith('/kontakt') || path.endsWith('/prodejni-mista') ? 0.8
      : (
        path.endsWith('/cookies') ||
        path.endsWith('/gdpr') ||
        path.endsWith('/obchodni-podminky')
      ) ?
        0.3
      : 0.7

    return createEntry(path, changeFrequency, priority)
  })

  const blogListingPages = localizedSeoLocales.map((lang) =>
    createEntry(`/${lang}/clanky`, 'daily', 0.7)
  )

  const eventListingPages = localizedSeoLocales.map((lang) =>
    createEntry(`/${lang}/udalosti`, 'daily', 0.7)
  )

  const postsByLanguage = await Promise.all(
    localizedSeoLocales.map(async (lang) => {
      const unifiedPosts = await sanityFetch<UnifiedPost[]>({
        query: unifiedPostsForSitemapQuery,
        tags: ['blog:unified:sitemap'],
        revalidate: 300
      }).catch(() => [])

      if (unifiedPosts.length > 0) {
        return unifiedPosts
          .map((post) => {
            const variant = getUnifiedPostVariants(post).find(
              (item) => item.locale === lang
            )

            if (!variant) {
              return null
            }

            return createEntry(
              `/${lang}/clanky/${variant.slug}`,
              'weekly',
              0.6,
              post._updatedAt ? new Date(post._updatedAt)
              : post.publishedAt ? new Date(post.publishedAt)
              : now
            )
          })
          .filter(
            (post): post is MetadataRoute.Sitemap[number] => post !== null
          )
      }

      const posts =
        (await sanityFetch<
          {
            slug: { current: string }
            publishedAt?: string
          }[]
        >({
          query: postsForSitemapByLanguageQuery,
          params: { language: lang },
          tags: [`blog:sitemap:${lang}`],
          revalidate: 300
        }).catch(() => [])) ?? []

      return posts.map((post) =>
        createEntry(
          `/${lang}/clanky/${post.slug.current}`,
          'weekly',
          0.6,
          post.publishedAt ? new Date(post.publishedAt) : now
        )
      )
    })
  )

  const eventsByLanguage = await Promise.all(
    localizedSeoLocales.map(async (lang) => {
      const unifiedEvents = await sanityFetch<UnifiedEvent[]>({
        query: unifiedEventsForSitemapQuery,
        tags: ['events:unified:sitemap'],
        revalidate: 300
      })
        .catch(async () =>
          hasSanityWriteToken ?
            writeClient.fetch<UnifiedEvent[]>(unifiedEventsForSitemapQuery)
          : []
        )
        .catch(() => [])

      if (unifiedEvents.length > 0) {
        return unifiedEvents
          .filter((event) =>
            getUnifiedEventVariants(event).some(
              (variant) => variant.locale === lang
            )
          )
          .filter((event) =>
            canAccessEventDetail(
              {
                dateTime: event.dateTime,
                endDateTime: event.endDateTime,
                recap: getLocalizedRecap(event, lang)
              },
              now
            )
          )
          .map((event) => {
            const variant = getUnifiedEventVariants(event).find(
              (item) => item.locale === lang
            )

            if (!variant) {
              return null
            }

            return createEntry(
              `/${lang}/udalosti/${variant.slug}`,
              'weekly',
              0.6,
              event._updatedAt ? new Date(event._updatedAt)
              : event.endDateTime ? new Date(event.endDateTime)
              : new Date(event.dateTime)
            )
          })
          .filter(
            (event): event is MetadataRoute.Sitemap[number] => event !== null
          )
      }

      const events =
        (await sanityFetch<
          {
            slug: { current: string }
            dateTime?: string
            endDateTime?: string
            recap?: PortableTextBlock[]
            _updatedAt?: string
          }[]
        >({
          query: eventsForSitemapByLanguageQuery,
          params: { language: lang },
          tags: [`events:sitemap:${lang}`],
          revalidate: 300
        }).catch(() => [])) ?? []

      return events
        .filter((event) => {
          if (!event.dateTime) {
            return false
          }

          return canAccessEventDetail(event, now)
        })
        .map((event) =>
          createEntry(
            `/${lang}/udalosti/${event.slug.current}`,
            'weekly',
            0.6,
            event._updatedAt ? new Date(event._updatedAt)
            : event.endDateTime ? new Date(event.endDateTime)
            : event.dateTime ? new Date(event.dateTime)
            : now
          )
        )
    })
  )

  return [
    ...staticPages,
    ...blogListingPages,
    ...eventListingPages,
    ...postsByLanguage.flat(),
    ...eventsByLanguage.flat()
  ]
}
