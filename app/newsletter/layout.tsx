import type { Metadata } from 'next'
import type { PropsWithChildren } from 'react'
import { buildPageMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'Newsletter',
  description:
    'Přihlaste se k odběru novinek pivovaru STADIONER a získejte informace o produktech, událostech a speciálních nabídkách.',
  canonicalPath: '/cs/newsletter',
  keywords: ['newsletter', 'STADIONER', 'pivovar', 'novinky']
})

export default function NewsletterLayout({ children }: PropsWithChildren) {
  return children
}
