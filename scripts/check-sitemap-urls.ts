export {}

const baseUrl = process.env.SEO_BASE_URL ?? 'http://localhost:3000'

const fetchText = async (url: string) => {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status}`)
  }

  return response.text()
}

const extractSitemapUrls = (xml: string): string[] => {
  const matches = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)]
  return matches
    .map(match => match[1]?.trim() ?? '')
    .filter(Boolean)
}

const run = async () => {
  const sitemapUrl = `${baseUrl}/sitemap.xml`
  const xml = await fetchText(sitemapUrl)
  const urls = extractSitemapUrls(xml)

  if (urls.length === 0) {
    throw new Error('Sitemap is empty.')
  }

  const failed: Array<{ url: string; status: number }> = []

  for (const url of urls) {
    const response = await fetch(url, { redirect: 'follow' })
    if (response.status !== 200) {
      failed.push({ url, status: response.status })
    }
  }

  if (failed.length > 0) {
    throw new Error(
      [
        `Sitemap URL check failed (${failed.length} failing URLs):`,
        ...failed.map(item => `- ${item.status} ${item.url}`),
      ].join('\n'),
    )
  }

  console.log(`Sitemap URL check passed for ${urls.length} URLs.`)
}

run().catch(error => {
  console.error(error instanceof Error ? error.message : String(error))
  process.exit(1)
})
