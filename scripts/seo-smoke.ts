export {}

interface RouteExpectation {
  path: string
  expectedTitle: string
  expectedCanonical: string
  expectedDescriptionIncludes: string
  expectedHreflangCount?: number
}

const baseUrl = process.env.SEO_BASE_URL ?? 'http://localhost:3000'

const expectations: RouteExpectation[] = [
  {
    path: '/cs',
    expectedTitle: 'Pivovar Kout na Šumavě | Stadioner',
    expectedCanonical: 'https://stadioner.cz/cs',
    expectedDescriptionIncludes: 'Tradiční pivovar Stadioner',
  },
  {
    path: '/cs/produkty',
    expectedTitle: 'Naše produkty - Piva, limonády a voda | Stadioner',
    expectedCanonical: 'https://stadioner.cz/cs/produkty',
    expectedDescriptionIncludes: 'Objevte naše řemeslné piva',
  },
  {
    path: '/cs/clanky',
    expectedTitle: 'Články | Stadioner',
    expectedCanonical: 'https://stadioner.cz/cs/clanky',
    expectedDescriptionIncludes: 'Přečtěte si nejnovější články',
    expectedHreflangCount: 4,
  },
  {
    path: '/cs/udalosti',
    expectedTitle: 'Události | Stadioner',
    expectedCanonical: 'https://stadioner.cz/cs/udalosti',
    expectedDescriptionIncludes: 'Nadcházející události',
    expectedHreflangCount: 4,
  },
]

const extractTag = (html: string, regex: RegExp): string | null => {
  const match = html.match(regex)
  return match?.[1] ?? null
}

const run = async () => {
  for (const route of expectations) {
    const url = `${baseUrl}${route.path}`
    const response = await fetch(url, { redirect: 'follow' })
    if (!response.ok) {
      throw new Error(`Failed to fetch ${url}: ${response.status}`)
    }

    const html = await response.text()
    const title = extractTag(html, /<title>(.*?)<\/title>/)
    const description = extractTag(
      html,
      /<meta name="description" content="(.*?)"\s*\/?>/,
    )
    const canonical = extractTag(
      html,
      /<link rel="canonical" href="(.*?)"\s*\/?>/,
    )
    const hreflangMatches = html.match(/<link rel="alternate" hrefLang="/g) ?? []

    if (title !== route.expectedTitle) {
      throw new Error(
        `${route.path}: unexpected <title>. Expected "${route.expectedTitle}", got "${title ?? 'null'}".`,
      )
    }

    if (!description?.includes(route.expectedDescriptionIncludes)) {
      throw new Error(
        `${route.path}: unexpected meta description. Expected to include "${route.expectedDescriptionIncludes}".`,
      )
    }

    if (canonical !== route.expectedCanonical) {
      throw new Error(
        `${route.path}: unexpected canonical. Expected "${route.expectedCanonical}", got "${canonical ?? 'null'}".`,
      )
    }

    if (
      typeof route.expectedHreflangCount === 'number' &&
      hreflangMatches.length !== route.expectedHreflangCount
    ) {
      throw new Error(
        `${route.path}: unexpected hreflang count. Expected ${route.expectedHreflangCount}, got ${hreflangMatches.length}.`,
      )
    }
  }

  console.log(`SEO smoke check passed for ${expectations.length} routes.`)
}

run().catch(error => {
  console.error(error instanceof Error ? error.message : String(error))
  process.exit(1)
})
