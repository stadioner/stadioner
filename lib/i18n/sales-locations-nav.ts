import type { SupportedLanguage } from '@/lib/i18n/site-languages'

export const salesLocationsBaseSegment = 'prodejni-mista'

export const salesLocationsPaths = {
  partners: 'sit-partneru',
  store: 'podnikova-prodejna',
  taproom: 'vycep-na-salade'
} as const

export type SalesLocationPage = keyof typeof salesLocationsPaths

export const salesLocationsLegacyHashRedirects: Record<string, string> = {
  'sit-partneru': salesLocationsPaths.partners,
  'vydejni-misto': salesLocationsPaths.store,
  'podnikova-prodejna': salesLocationsPaths.store,
  'vycep-na-salade': salesLocationsPaths.taproom
}

type SalesLocationsNavLabels = {
  trigger: string
  partners: string
  store: string
  taproom: string
}

const labelsByLanguage: Record<SupportedLanguage, SalesLocationsNavLabels> = {
  cs: {
    trigger: 'Prodejní Místa',
    partners: 'Síť partnerů',
    store: 'Podniková prodejna',
    taproom: 'Výčep na Šalandě'
  },
  en: {
    trigger: 'Sales Locations',
    partners: 'Partner Network',
    store: 'Company Store',
    taproom: 'Taproom at Šalanda'
  },
  de: {
    trigger: 'Verkaufsstellen',
    partners: 'Partnernetzwerk',
    store: 'Betriebsverkauf',
    taproom: 'Ausschank auf Šalanda'
  }
}

export const getSalesLocationsNavLabels = (
  language: SupportedLanguage
): SalesLocationsNavLabels => labelsByLanguage[language]

export const getSalesLocationsHref = (
  language: SupportedLanguage,
  page: SalesLocationPage
): string =>
  `/${language}/${salesLocationsBaseSegment}/${salesLocationsPaths[page]}`

export const getSalesLocationsNavItems = (language: SupportedLanguage) => {
  const labels = getSalesLocationsNavLabels(language)

  return [
    {
      key: 'partners',
      label: labels.partners,
      href: getSalesLocationsHref(language, 'partners')
    },
    {
      key: 'store',
      label: labels.store,
      href: getSalesLocationsHref(language, 'store')
    },
    {
      key: 'taproom',
      label: labels.taproom,
      href: getSalesLocationsHref(language, 'taproom')
    }
  ] as const
}
