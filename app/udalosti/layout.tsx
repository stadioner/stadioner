import { PropsWithChildren } from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Události',
  description: 'Události v pivovaru Stadioner v Koutě na Šumavě.',
  keywords: [
    'události',
    'pivovar',
    'Stadioner',
    'Kout na Šumavě',
    'events',
    'Šumava',
  ],
  openGraph: {
    title: 'Události pivovaru Stadioner',
    description: 'Události v pivovaru Stadioner v Koutě na Šumavě.',
    type: 'website',
  },
}

export default function UdalostiLayout({ children }: PropsWithChildren) {
  return children
}
