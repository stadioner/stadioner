import { cookies } from 'next/headers'
import { permanentRedirect } from 'next/navigation'
import { getSalesLocationsHref } from '@/lib/i18n/sales-locations-nav'
import {
  defaultLocale,
  isLocalizedSeoLocale
} from '@/lib/seo/site'

export default async function ProdejniMistaPage() {
  const cookieStore = await cookies()
  const localeCookie = cookieStore.get('NEXT_LOCALE')?.value
  const locale =
    localeCookie && isLocalizedSeoLocale(localeCookie) ?
      localeCookie
    : defaultLocale

  permanentRedirect(getSalesLocationsHref(locale, 'partners'))
}
