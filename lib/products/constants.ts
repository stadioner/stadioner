import type { Category, Language } from '@/types/products'

export const categories: Record<Language, Category[]> = {
  cs: [
    { id: 'pivo', label: 'Piva' },
    { id: 'limo', label: 'Limonády' },
    { id: 'voda', label: 'Vody' }
  ],
  en: [
    { id: 'pivo', label: 'Beers' },
    { id: 'limo', label: 'Lemonades' },
    { id: 'voda', label: 'Water' }
  ],
  de: [
    { id: 'pivo', label: 'Biere' },
    { id: 'limo', label: 'Limonaden' },
    { id: 'voda', label: 'Wasser' }
  ]
}

export const uiLabels = {
  cs: {
    composition: 'Složení',
    compositionTitle: 'Složení a Alergeny',
    depositNote: 'Lahve jsou zálohované.',
    buy: 'Koupit',
    preparing: 'Připravujeme',
    packaging: 'Balení',
    selectPackaging: 'Vyberte balení...',
    bottle: 'Lahev',
    crate: 'Bedna',
    barrel: 'Sud',
    barrel30: 'Sud 30 l',
    barrel50: 'Sud 50 l',
    noveltyNote:
      'Novinka MALINOVKA — dostupná v lahvích 0.5 l a sudech 20 l, 30 l a 50 l.'
  },
  en: {
    composition: 'Ingredients',
    compositionTitle: 'Ingredients & Allergens',
    depositNote: 'Bottles are subject to a deposit.',
    buy: 'Buy',
    preparing: 'Coming soon',
    packaging: 'Packaging',
    selectPackaging: 'Select packaging...',
    bottle: 'Bottle',
    crate: 'Crate',
    barrel: 'Keg',
    barrel30: 'Keg 30 l',
    barrel50: 'Keg 50 l',
    noveltyNote:
      'New: MALINOVKA — available in 0.5 l bottles and 20 l, 30 l and 50 l kegs.'
  },
  de: {
    composition: 'Zutaten',
    compositionTitle: 'Zutaten & Allergene',
    depositNote: 'Die Flaschen sind pfandpflichtig.',
    buy: 'Kaufen',
    preparing: 'In Vorbereitung',
    packaging: 'Verpackung',
    selectPackaging: 'Verpackung auswählen...',
    bottle: 'Flasche',
    crate: 'Kiste',
    barrel: 'Fass',
    barrel30: 'Fass 30 l',
    barrel50: 'Fass 50 l',
    noveltyNote:
      'Neu: MALINOVKA — erhältlich in 0,5-l-Flaschen und 20-l-, 30-l- und 50-l-Fässern.'
  }
} as const
