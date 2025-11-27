import type { Category, Language } from '@/types/products'

export const categories: Record<Language, Category[]> = {
  cs: [
    { id: 'pivo', label: 'Piva' },
    { id: 'limo', label: 'Limonády' },
    { id: 'voda', label: 'Vody' },
  ],
  en: [
    { id: 'pivo', label: 'Beers' },
    { id: 'limo', label: 'Lemonades' },
    { id: 'voda', label: 'Water' },
  ],
  de: [
    { id: 'pivo', label: 'Biere' },
    { id: 'limo', label: 'Limonaden' },
    { id: 'voda', label: 'Wasser' },
  ],
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
  },
} as const
