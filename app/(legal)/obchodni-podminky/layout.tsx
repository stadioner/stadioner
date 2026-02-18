import { PropsWithChildren } from 'react'
import { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'Obchodní podmínky',
  description:
    'Všeobecné obchodní podmínky pro nákupy v e‑shopu Stadioner. Informace o objednávkách, platbách, dodání, reklamacích a odstoupení.',
  canonicalPath: '/cs/obchodni-podminky',
  keywords: [
    'obchodní podmínky',
    'VOP',
    'reklamace',
    'odstoupení od smlouvy',
    'Stadioner',
    'pivovar',
  ],
})

export default function TermsLayout({ children }: PropsWithChildren) {
  return children
}
