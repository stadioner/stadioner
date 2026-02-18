import { PropsWithChildren } from 'react'
import { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'Rozcestník',
  description:
    'Všechny důležité odkazy na pivovar Stadioner na jednom místě. Sociální sítě, kontakt, produkty a další informace.',
  canonicalPath: '/cs/rozcestnik',
  keywords: [
    'rozcestník',
    'odkazy',
    'Stadioner',
    'pivovar',
    'kontakt',
    'sociální sítě',
    'produkty',
  ],
})

export default function RozcestnikLayout({ children }: PropsWithChildren) {
  return children
}
