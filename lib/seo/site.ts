const sanitizeSiteUrl = (url: string): string => {
  const trimmed = url.trim().replace(/\/+$/, '')
  if (!trimmed) {
    return 'https://stadioner.cz'
  }

  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed
  }

  return `https://${trimmed}`
}

export const siteUrl = sanitizeSiteUrl(
  process.env.SITE_URL || 'https://stadioner.cz',
)

export const defaultLocale = 'cs' as const

export const localizedSeoLocales = ['cs', 'en', 'de'] as const

export type LocalizedSeoLocale = (typeof localizedSeoLocales)[number]

export const isLocalizedSeoLocale = (
  locale: string,
): locale is LocalizedSeoLocale => {
  return localizedSeoLocales.includes(locale as LocalizedSeoLocale)
}

export const toAbsoluteUrl = (path: string): string => {
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path
  }

  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return `${siteUrl}${normalizedPath}`
}

export const toLocalePath = (
  locale: LocalizedSeoLocale,
  path = '/',
): string => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  const withoutTrailingSlash =
    normalizedPath === '/' ? '' : normalizedPath.replace(/\/+$/, '')

  return `/${locale}${withoutTrailingSlash}`
}
