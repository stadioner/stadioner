import { NextRequest, NextResponse } from 'next/server'
import {
  defaultLocale,
  isLocalizedSeoLocale,
  localizedSeoLocales,
  type LocalizedSeoLocale,
} from '@/lib/seo/site'

const BOT_USER_AGENT_PATTERN =
  /bot|crawler|spider|crawling|googlebot|bingbot|yandex|duckduckbot|baiduspider/i

const isBypassPath = (pathname: string): boolean => {
  return pathname.startsWith('/api') || pathname.startsWith('/studio')
}

const getLocaleFromAcceptLanguage = (
  header: string | null,
): LocalizedSeoLocale | null => {
  if (!header) {
    return null
  }

  const firstLanguage = header
    .split(',')
    .map(item => item.trim())
    .map(item => item.split(';')[0]?.toLowerCase() ?? '')
    .find(Boolean)

  if (!firstLanguage) {
    return null
  }

  const languageCode = firstLanguage.split('-')[0] ?? ''
  return isLocalizedSeoLocale(languageCode) ? languageCode : null
}

const resolvePreferredLocale = (request: NextRequest): LocalizedSeoLocale => {
  const userAgent = request.headers.get('user-agent') ?? ''
  if (BOT_USER_AGENT_PATTERN.test(userAgent)) {
    return defaultLocale
  }

  const cookieLocale =
    request.cookies.get('NEXT_LOCALE')?.value ??
    request.cookies.get('language-storage')?.value

  if (cookieLocale && isLocalizedSeoLocale(cookieLocale)) {
    return cookieLocale
  }

  return (
    getLocaleFromAcceptLanguage(request.headers.get('accept-language')) ??
    defaultLocale
  )
}

const withLocaleCookies = (
  response: NextResponse,
  locale: LocalizedSeoLocale,
): NextResponse => {
  response.cookies.set('NEXT_LOCALE', locale, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax',
  })
  response.cookies.set('language-storage', locale, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax',
  })

  return response
}

const mapLocalizedPathToInternalRoute = (
  locale: LocalizedSeoLocale,
  restPath: string,
) => {
  if (!restPath || restPath === '/') {
    return '/'
  }

  const trimmed = restPath.startsWith('/') ? restPath.slice(1) : restPath
  const [firstSegment, ...remaining] = trimmed.split('/')
  const suffix = remaining.length > 0 ? `/${remaining.join('/')}` : ''

  if (firstSegment === 'clanky') {
    return `/clanky/${locale}${suffix}`
  }

  if (firstSegment === 'udalosti') {
    return `/udalosti/${locale}${suffix}`
  }

  return `/${trimmed}`
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  if (isBypassPath(pathname)) {
    return NextResponse.next()
  }

  if (pathname === '/') {
    const locale = resolvePreferredLocale(request)
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = `/${locale}`

    return withLocaleCookies(NextResponse.redirect(redirectUrl), locale)
  }

  const parts = pathname.split('/')
  const maybeLocale = parts[1]

  if (maybeLocale && localizedSeoLocales.includes(maybeLocale as LocalizedSeoLocale)) {
    const locale = maybeLocale as LocalizedSeoLocale
    const restPath = pathname.slice(locale.length + 1)
    const internalPath = mapLocalizedPathToInternalRoute(locale, restPath)

    const rewriteUrl = request.nextUrl.clone()
    rewriteUrl.pathname = internalPath

    return withLocaleCookies(NextResponse.rewrite(rewriteUrl), locale)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next|.*\\..*).*)'],
}
