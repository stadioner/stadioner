import { PropsWithChildren } from 'react'
import { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: 'Události',
    description: 'Události v pivovaru Stadioner v Koutě na Šumavě.',
    canonicalPath: '/cs/udalosti',
    keywords: [
      'události',
      'pivovar',
      'Stadioner',
      'Kout na Šumavě',
      'events',
      'Šumava',
    ],
  }),
  title: {
    default: 'Události',
    template: '%s | Stadioner',
  },
}

export default function UdalostiLayout({ children }: PropsWithChildren) {
  return children
}
