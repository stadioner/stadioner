import { PropsWithChildren } from 'react'
import { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: 'Události',
    description: 'Události v pivovaru STADIONER v Koutě na Šumavě.',
    canonicalPath: '/cs/udalosti',
    keywords: [
      'události',
      'pivovar',
      'STADIONER',
      'Kout na Šumavě',
      'events',
      'Šumava'
    ]
  }),
  title: {
    default: 'Události',
    template: '%s | STADIONER'
  }
}

export default function UdalostiLayout({ children }: PropsWithChildren) {
  return children
}
