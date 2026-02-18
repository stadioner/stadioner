import {
  defaultLocale,
  isLocalizedSeoLocale,
  localizedSeoLocales,
  toLocalePath,
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
      acc[localizedLocale] = toLocalePath(localizedLocale, `/${section}`)
      return acc
    },
    {},
  )

  return createLocalizedAlternates({
    canonicalPath: toLocalePath(locale, `/${section}`),
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
    acc[localeItem] = toLocalePath(localeItem, `/${section}/${normalizedSlug}`)
    return acc
  }, {})

  return createLocalizedAlternates({
    canonicalPath: toLocalePath(locale, `/${section}/${normalizedSlug}`),
    pathsByLocale,
  })
}

interface LocalizedSlugVariant {
  locale: string
  slug: string
}

export const createLocalizedDetailAlternatesFromVariants = (
  section: LocalizedSection,
  locale: LocalizedSeoLocale,
  currentSlug: string,
  variants: readonly LocalizedSlugVariant[],
) => {
  const pathsByLocale = variants.reduce<LocalizedPathMap>((acc, variant) => {
    if (!isLocalizedSeoLocale(variant.locale)) {
      return acc
    }

    acc[variant.locale] = toLocalePath(
      variant.locale,
      `/${section}/${encodeURIComponent(variant.slug)}`,
    )
    return acc
  }, {})

  const hasLocaleVariant = Boolean(pathsByLocale[locale])
  const canonicalPath = hasLocaleVariant
    ? (pathsByLocale[locale] as string)
    : toLocalePath(locale, `/${section}/${encodeURIComponent(currentSlug)}`)

  return createLocalizedAlternates({
    canonicalPath,
    pathsByLocale: hasLocaleVariant ? pathsByLocale : { [locale]: canonicalPath },
  })
}
