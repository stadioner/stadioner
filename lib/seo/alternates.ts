import {
  defaultLocale,
  localizedSeoLocales,
  type LocalizedSeoLocale,
} from '@/lib/seo/site'

type LocalizedPathMap = Partial<Record<LocalizedSeoLocale, string>>

type LocalizedSection = 'clanky' | 'udalosti'

interface LocalizedAlternatesInput {
  canonicalPath: string
  pathsByLocale: LocalizedPathMap
}

const normalizePath = (path: string): string => {
  const withLeadingSlash = path.startsWith('/') ? path : `/${path}`
  if (withLeadingSlash === '/') {
    return withLeadingSlash
  }

  return withLeadingSlash.replace(/\/+$/, '')
}

export const createLocalizedAlternates = ({
  canonicalPath,
  pathsByLocale,
}: LocalizedAlternatesInput) => {
  const canonical = normalizePath(canonicalPath)
  const languages: Record<string, string> = {}

  for (const locale of localizedSeoLocales) {
    const localePath = pathsByLocale[locale]
    if (localePath) {
      languages[locale] = normalizePath(localePath)
    }
  }

  languages['x-default'] = languages[defaultLocale] ?? canonical

  return {
    canonical,
    languages,
  }
}

export const createLocalizedListingAlternates = (
  section: LocalizedSection,
  locale: LocalizedSeoLocale,
) => {
  const pathsByLocale = localizedSeoLocales.reduce<LocalizedPathMap>(
    (acc, localizedLocale) => {
      acc[localizedLocale] = `/${section}/${localizedLocale}`
      return acc
    },
    {},
  )

  return createLocalizedAlternates({
    canonicalPath: `/${section}/${locale}`,
    pathsByLocale,
  })
}

export const createLocalizedDetailAlternates = (
  section: LocalizedSection,
  locale: LocalizedSeoLocale,
  slug: string,
  availableLocales: readonly LocalizedSeoLocale[],
) => {
  const normalizedSlug = encodeURIComponent(slug)
  const locales =
    availableLocales.length > 0 ? availableLocales : ([locale] as const)

  const pathsByLocale = locales.reduce<LocalizedPathMap>((acc, localeItem) => {
    acc[localeItem] = `/${section}/${localeItem}/${normalizedSlug}`
    return acc
  }, {})

  return createLocalizedAlternates({
    canonicalPath: `/${section}/${locale}/${normalizedSlug}`,
    pathsByLocale,
  })
}
