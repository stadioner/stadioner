import { MetadataRoute } from 'next'
import { sanityFetch } from '@/sanity/lib/fetch'
import {
  eventsForSitemapByLanguageQuery,
  postsForSitemapByLanguageQuery,
} from '@/sanity/lib/queries'
import { localizedSeoLocales, toAbsoluteUrl } from '@/lib/seo/site'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  const createEntry = (
    path: string,
    changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'],
    priority: number,
    lastModified: Date = now,
  ): MetadataRoute.Sitemap[number] => ({
    url: toAbsoluteUrl(path),
    lastModified,
    changeFrequency,
    priority,
  })

  const staticLocalizedPaths = localizedSeoLocales.flatMap(locale => [
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
    `/${locale}/obchodni-podminky`,
  ])

  const staticPages = staticLocalizedPaths.map(path => {
    const changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] =
      path.includes('/cookies') ||
      path.includes('/gdpr') ||
      path.includes('/obchodni-podminky')
        ? 'yearly'
        : path.endsWith('/produkty') || path.endsWith('/kontakt')
          ? 'weekly'
          : 'daily'

    const priority =
      path.split('/').length <= 2
        ? 1
        : path.endsWith('/produkty')
          ? 0.9
          : path.endsWith('/kontakt') || path.endsWith('/prodejni-mista')
            ? 0.8
            : path.endsWith('/cookies') ||
                path.endsWith('/gdpr') ||
                path.endsWith('/obchodni-podminky')
              ? 0.3
              : 0.7

    return createEntry(path, changeFrequency, priority)
  })

  const blogListingPages = localizedSeoLocales.map(lang =>
    createEntry(`/${lang}/clanky`, 'daily', 0.7),
  )

  const eventListingPages = localizedSeoLocales.map(lang =>
    createEntry(`/${lang}/udalosti`, 'daily', 0.7),
  )

  const postsByLanguage = await Promise.all(
    localizedSeoLocales.map(async lang => {
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
          revalidate: 300,
        }).catch(() => [])) ?? []

      return posts.map(post =>
        createEntry(
          `/${lang}/clanky/${post.slug.current}`,
          'weekly',
          0.6,
          post.publishedAt ? new Date(post.publishedAt) : now,
        ),
      )
    }),
  )

  const eventsByLanguage = await Promise.all(
    localizedSeoLocales.map(async lang => {
      const events =
        (await sanityFetch<
          {
            slug: { current: string }
            dateTime?: string
            endDateTime?: string
            _updatedAt?: string
          }[]
        >({
          query: eventsForSitemapByLanguageQuery,
          params: { language: lang },
          tags: [`events:sitemap:${lang}`],
          revalidate: 300,
        }).catch(() => [])) ?? []

      return events
        .filter(event => {
          if (!event.dateTime) {
            return false
          }

          const eventEnd = new Date(event.endDateTime ?? event.dateTime)
          return Number.isFinite(eventEnd.getTime()) && eventEnd >= now
        })
        .map(event =>
          createEntry(
            `/${lang}/udalosti/${event.slug.current}`,
            'weekly',
            0.6,
            event._updatedAt
              ? new Date(event._updatedAt)
              : event.endDateTime
                ? new Date(event.endDateTime)
                : event.dateTime
                  ? new Date(event.dateTime)
                  : now,
          ),
        )
    }),
  )

  return [
    ...staticPages,
    ...blogListingPages,
    ...eventListingPages,
    ...postsByLanguage.flat(),
    ...eventsByLanguage.flat(),
  ]
}
