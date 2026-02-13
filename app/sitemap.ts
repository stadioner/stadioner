import { MetadataRoute } from 'next'
import { sanityFetch } from '@/sanity/lib/fetch'
import { postsForSitemapByLanguageQuery } from '@/sanity/lib/queries'
import { supportedLanguages } from '@/lib/i18n/site-languages'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://stadioner.cz'

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/historie`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/produkty`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/kontakt`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/prodejni-mista`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/cookies`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
  ]

  // Blog pages for each language
  const blogListingPages = supportedLanguages.map(lang => ({
    url: `${baseUrl}/clanky/${lang}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.8,
  }))

  const postsByLanguage = await Promise.all(
    supportedLanguages.map(async lang => {
      const posts = await sanityFetch<
        {
          slug: { current: string }
          publishedAt?: string
        }[]
      >({
        query: postsForSitemapByLanguageQuery,
        params: { language: lang },
        tags: [`blog:sitemap:${lang}`],
        revalidate: 300,
      }).catch(() => [])

      return posts.map(post => ({
        url: `${baseUrl}/clanky/${lang}/${post.slug.current}`,
        lastModified: new Date(post.publishedAt || new Date()),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      }))
    }),
  )

  const blogPages = [...blogListingPages, ...postsByLanguage.flat()]

  return [...staticPages, ...blogPages]
}
