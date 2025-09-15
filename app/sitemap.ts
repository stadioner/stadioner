import { MetadataRoute } from 'next'
import { cachedClient } from '@/sanity/lib/client'
import { postsByLanguageQuery } from '@/sanity/lib/queries'

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
  ]

  // Blog pages for each language
  const blogPages = []
  const languages = ['cs', 'en', 'de']

  for (const lang of languages) {
    blogPages.push({
      url: `${baseUrl}/clanky/${lang}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    })

    // Get posts for this language
    try {
      const posts = await cachedClient(postsByLanguageQuery, { language: lang })

      for (const post of posts) {
        blogPages.push({
          url: `${baseUrl}/clanky/${lang}/${post.slug.current}`,
          lastModified: new Date(post.publishedAt || new Date()),
          changeFrequency: 'monthly' as const,
          priority: 0.6,
        })
      }
    } catch (error) {
      console.error(`Error fetching posts for language ${lang}:`, error)
    }
  }

  return [...staticPages, ...blogPages]
}
