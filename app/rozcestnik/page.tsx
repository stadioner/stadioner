import { Rozcestnik } from './_containers/rozcestnik'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Rozcestník | Stadioner',
  description:
    'Všechny důležité odkazy na pivovar Stadioner na jednom místě. Sociální sítě, kontakt, produkty a další informace.',
  keywords: [
    'rozcestník',
    'odkazy',
    'Stadioner',
    'pivovar',
    'kontakt',
    'sociální sítě',
    'produkty',
  ],
  openGraph: {
    title: 'Rozcestník | Stadioner',
    description:
      'Všechny důležité odkazy na pivovar Stadioner na jednom místě.',
    type: 'website',
  },
}

export default function RozcestnikPage() {
  return <Rozcestnik />
}
