import { PropsWithChildren } from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Akce',
  description: 'Akce v pivovaru Stadioner v Koutě na Šumavě.',
  keywords: [
    'akce',
    'pivovar',
    'Stadioner',
    'Kout na Šumavě',
    'events',
    'Šumava',
  ],
  openGraph: {
    title: 'Akce pivovaru Stadioner',
    description: 'Akce v pivovaru Stadioner v Koutě na Šumavě.',
    type: 'website',
  },
}

export default function HistorieLayout({ children }: PropsWithChildren) {
  return children
}
