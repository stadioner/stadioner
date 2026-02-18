import { Metadata } from 'next'
import { PropsWithChildren } from 'react'
import { buildPageMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'Kontakt',
  description:
    'Kontaktujte pivovar Stadioner v Koutě na Šumavě. Telefon, email, adresa a sociální sítě.',
  canonicalPath: '/cs/kontakt',
  keywords: [
    'kontakt',
    'pivovar',
    'Stadioner',
    'Kout na Šumavě',
    'telefon',
    'email',
    'adresa',
    'otevírací doba',
  ],
})

export default function KontaktLayout({ children }: PropsWithChildren) {
  return children
}
