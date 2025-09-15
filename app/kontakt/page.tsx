import { Metadata } from 'next'
import { Kontakt } from './_containers/kontakt'

export const metadata: Metadata = {
  title: 'Kontakt',
  description:
    'Kontaktujte pivovar Stadioner v Koutě na Šumavě. Telefon, email, adresa a sociální sítě.',
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
  openGraph: {
    title: 'Kontakt - Stadioner Pivovar',
    description:
      'Kontaktujte pivovar Stadioner v Koutě na Šumavě. Telefon, email, adresa a sociální sítě.',
    type: 'website',
  },
}

export default function KontaktPage() {
  return <Kontakt />
}
