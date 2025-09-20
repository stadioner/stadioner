import { PropsWithChildren } from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Historie pivovaru',
  description:
    'Poznejte bohatou historii pivovaru Stadioner v Koutě na Šumavě. Tradice, která pokračuje již po generace.',
  keywords: [
    'historie',
    'pivovar',
    'Stadioner',
    'Kout na Šumavě',
    'tradice',
    'Šumava',
  ],
  openGraph: {
    title: 'Historie pivovaru Stadioner',
    description:
      'Poznejte bohatou historii pivovaru Stadioner v Koutě na Šumavě. Tradice, která pokračuje již po generace.',
    type: 'website',
  },
}

export default function HistorieLayout({ children }: PropsWithChildren) {
  return children
}
