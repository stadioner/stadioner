import { Metadata } from 'next'
import { PropsWithChildren } from 'react'
import { buildPageMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'Pro Firmy',
  description:
    'B2B spolupráce s pivovarem Stadioner. Nabízíme řemeslná piva, limonády a vodu ze šumavských pramenů pro firmy a obchodní partnery.',
  canonicalPath: '/cs/pro-firmy',
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
})

export default function ProFirmyLayout({ children }: PropsWithChildren) {
  return children
}
