import type { SupportedLanguage } from '@/lib/i18n/site-languages'

export const salesLocationsSectionIds = {
  partners: 'sit-partneru',
  pickup: 'vydejni-misto',
  taproom: 'vycep-na-salade'
} as const

type SalesLocationsNavLabels = {
  trigger: string
  partners: string
  pickup: string
  taproom: string
}

const labelsByLanguage: Record<SupportedLanguage, SalesLocationsNavLabels> = {
  cs: {
    trigger: 'Prodejní Místa',
    partners: 'Síť partnerů',
    pickup: 'Výdejní místo',
    taproom: 'Výčep na Šalandě'
  },
  en: {
    trigger: 'Sales Locations',
    partners: 'Partner Network',
    pickup: 'Pickup Point',
    taproom: 'Taproom at Šalanda'
  },
  de: {
    trigger: 'Verkaufsstellen',
    partners: 'Partnernetzwerk',
    pickup: 'Abholstelle',
    taproom: 'Ausschank auf Šalanda'
  }
}

export const getSalesLocationsNavLabels = (
  language: SupportedLanguage
): SalesLocationsNavLabels => labelsByLanguage[language]

export const getSalesLocationsNavItems = (
  language: SupportedLanguage,
  localizedRootPath: string
) => {
  const labels = getSalesLocationsNavLabels(language)
  const basePath = `${localizedRootPath}/prodejni-mista`

  return [
    {
      label: labels.partners,
      href: `${basePath}#${salesLocationsSectionIds.partners}`
    },
    {
      label: labels.pickup,
      href: `${basePath}#${salesLocationsSectionIds.pickup}`
    },
    {
      label: labels.taproom,
      href: `${basePath}#${salesLocationsSectionIds.taproom}`
    }
  ] as const
}
