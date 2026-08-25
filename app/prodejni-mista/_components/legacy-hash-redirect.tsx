'use client'

import { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { salesLocationsLegacyHashRedirects } from '@/lib/i18n/sales-locations-nav'

export const LegacySalesLocationsHashRedirect = () => {
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const hash = window.location.hash.replace(/^#/, '')
    if (!hash) {
      return
    }

    const targetSuffix = salesLocationsLegacyHashRedirects[hash]
    if (!targetSuffix) {
      return
    }

    const currentPath = pathname ?? ''
    if (currentPath.endsWith(`/${targetSuffix}`)) {
      window.history.replaceState(null, '', currentPath)
      return
    }

    const basePath = currentPath.replace(/\/prodejni-mista.*$/, '/prodejni-mista')
    router.replace(`${basePath}/${targetSuffix}`)
  }, [pathname, router])

  return null
}
