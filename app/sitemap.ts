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

  const staticPages = [
    createEntry('/', 'daily', 1),
    createEntry('/historie', 'weekly', 0.8),
    createEntry('/produkty', 'weekly', 0.9),
    createEntry('/kontakt', 'weekly', 0.8),
    createEntry('/prodejni-mista', 'weekly', 0.8),
    createEntry('/newsletter', 'weekly', 0.7),
    createEntry('/pro-firmy', 'weekly', 0.7),
    createEntry('/rozcestnik', 'weekly', 0.6),
    createEntry('/cookies', 'yearly', 0.3),
    createEntry('/gdpr', 'yearly', 0.3),
    createEntry('/obchodni-podminky', 'yearly', 0.3),
  ]

  const blogListingPages = localizedSeoLocales.map(lang =>
    createEntry(`/clanky/${lang}`, 'daily', 0.7),
  )

  const eventListingPages = localizedSeoLocales.map(lang =>
    createEntry(`/udalosti/${lang}`, 'daily', 0.7),
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
          `/clanky/${lang}/${post.slug.current}`,
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

      return events.map(event =>
        createEntry(
          `/udalosti/${lang}/${event.slug.current}`,
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
