import { PropsWithChildren } from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ochrana osobních údajů',
  description:
    'Informace o zpracování osobních údajů na webových stránkách pivovaru Stadioner v souladu s GDPR. Zjistěte, jak zpracováváme vaše osobní údaje.',
  keywords: [
    'GDPR',
    'ochrana osobních údajů',
    'soukromí',
    'osobní údaje',
    'Stadioner',
    'pivovar',
    'zpracování údajů',
  ],
  openGraph: {
    title: 'Ochrana osobních údajů - Stadioner',
    description:
      'Informace o zpracování osobních údajů na webových stránkách pivovaru Stadioner v souladu s GDPR.',
    type: 'website',
  },
}

export default function CookiesLayout({ children }: PropsWithChildren) {
  return children
}
