import { PropsWithChildren } from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Informace o cookies',
  description:
    'Informace o používání cookies na webových stránkách pivovaru Stadioner. Zjistěte, jaké cookies používáme a jak je můžete spravovat.',
  keywords: [
    'cookies',
    'soubory cookie',
    'soukromí',
    'GDPR',
    'Stadioner',
    'pivovar',
    'ochrana údajů',
  ],
  openGraph: {
    title: 'Informace o cookies - Stadioner',
    description:
      'Informace o používání cookies na webových stránkách pivovaru Stadioner.',
    type: 'website',
  },
}

export default function CookiesLayout({ children }: PropsWithChildren) {
  return children
}
