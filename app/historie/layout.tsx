import { PropsWithChildren } from 'react'
import { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'Historie pivovaru',
  description:
    'Poznejte bohatou historii pivovaru Stadioner v Koutě na Šumavě. Tradice, která pokračuje již po generace.',
  canonicalPath: '/cs/historie',
  keywords: [
    'historie',
    'pivovar',
    'Stadioner',
    'Kout na Šumavě',
    'tradice',
    'Šumava',
  ],
})

export default function HistorieLayout({ children }: PropsWithChildren) {
  return children
}
