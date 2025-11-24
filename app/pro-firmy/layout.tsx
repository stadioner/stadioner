import { Metadata } from 'next'
import { PropsWithChildren } from 'react'

export const metadata: Metadata = {
  title: 'Pro Firmy',
  description:
    'B2B spolupráce s pivovarem Stadioner. Nabízíme řemeslná piva, limonády a vodu ze šumavských pramenů pro firmy a obchodní partnery.',
  keywords: [
    'B2B',
    'pro firmy',
    'obchodní spolupráce',
    'pivovar',
    'Stadioner',
    'Kout na Šumavě',
    'řemeslné pivo',
    'velkoobchod',
    'firemní spolupráce',
    'obchodní partneři',
  ],
  openGraph: {
    title: 'Pro Firmy - Stadioner Pivovar',
    description:
      'B2B spolupráce s pivovarem Stadioner. Nabízíme řemeslná piva, limonády a vodu ze šumavských pramenů pro firmy a obchodní partnery.',
    type: 'website',
  },
}

export default function ProFirmyLayout({ children }: PropsWithChildren) {
  return children
}

