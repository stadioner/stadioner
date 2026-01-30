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
    barrel10: 'Sud 10 l',
    barrel20: 'Sud 20.5 l',
    barrel30: 'Sud 30 l',
    barrel50: 'Sud 50 l',
    kegNewsTrigger: 'Novinka ohledně sudů',
    kegNewsTitle: 'NOVINKA OHLEDNĚ SUDŮ',
    kegNewsContent1:
      'Nově nabízíme možnost stočení jakéhokoliv našeho piva do sudů o objemu 10 a 20.5 litrů.',
    kegNewsContent2: 'Objednávku je nutné provést alespoň týden předem.',
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
    barrel10: 'Keg 10 l',
    barrel20: 'Keg 20.5 l',
    barrel30: 'Keg 30 l',
    barrel50: 'Keg 50 l',
    kegNewsTrigger: 'Keg News',
    kegNewsTitle: 'KEG NEWS',
    kegNewsContent1:
      'We now offer the option to fill any of our beers into 10 and 20.5 liter kegs.',
    kegNewsContent2: 'Orders must be placed at least one week in advance.',
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
    barrel10: 'Fass 10 l',
    barrel20: 'Fass 20.5 l',
    barrel30: 'Fass 30 l',
    barrel50: 'Fass 50 l',
    kegNewsTrigger: 'Neuigkeiten zu Fässern',
    kegNewsTitle: 'NEUIGKEITEN ZU FÄSSERN',
    kegNewsContent1:
      'Ab sofort bieten wir die Möglichkeit, jedes unserer Biere in 10- und 20.5-Liter-Fässer abzufüllen.',
    kegNewsContent2:
      'Die Bestellung muss mindestens eine Woche im Voraus erfolgen.',
  },
} as const
