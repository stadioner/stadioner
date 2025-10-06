import { PropsWithChildren } from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Obchodní podmínky',
  description:
    'Všeobecné obchodní podmínky pro nákupy v e‑shopu Stadioner. Informace o objednávkách, platbách, dodání, reklamacích a odstoupení.',
  keywords: [
    'obchodní podmínky',
    'VOP',
    'reklamace',
    'odstoupení od smlouvy',
    'Stadioner',
    'pivovar',
  ],
  openGraph: {
    title: 'Obchodní podmínky - Stadioner',
    description: 'Všeobecné obchodní podmínky pro nákupy v e‑shopu Stadioner.',
    type: 'website',
  },
}

export default function TermsLayout({ children }: PropsWithChildren) {
  return children
}
