import { PropsWithChildren } from 'react'
import { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'Cookies',
  description:
    'Informace o používání cookies na webových stránkách pivovaru Stadioner. Zjistěte, jaké cookies používáme a jak je můžete spravovat.',
  canonicalPath: '/cs/cookies',
  keywords: [
    'cookies',
    'soubory cookie',
    'soukromí',
    'GDPR',
    'Stadioner',
    'pivovar',
    'ochrana údajů',
  ],
})

export default function CookiesLayout({ children }: PropsWithChildren) {
  return children
}
