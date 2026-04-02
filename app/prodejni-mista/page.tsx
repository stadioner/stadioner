import { Metadata } from 'next'
import { Intro } from './_components/intro'
import { buildPageMetadata } from '@/lib/seo/metadata'
import { PickupPointSection } from '@/components/pickup-point-section'

export const metadata: Metadata = buildPageMetadata({
  title: 'Prodejní místa - Kde koupit naše produkty',
  description:
    'Najděte naše produkty v Plzeňském kraji. Hlavní výdejní místo v pivovaru Kout na Šumavě a další prodejní místa v restauracích a obchodech.',
  canonicalPath: '/cs/prodejni-mista',
  keywords: [
    'prodejní místa',
    'kde koupit',
    'pivovar',
    'STADIONER',
    'Kout na Šumavě',
    'Plzeňský kraj',
    'restaurace',
    'obchody',
    'výdejní místo'
  ]
})

export default function ProdejniMistaPage() {
  return (
    <main className='bg-brand-primary pt-40'>
      <h1 className='sr-only'>Prodejní místa STADIONER</h1>
      <PickupPointSection />
      <Intro />
      {/* <PojizdnaProdejna /> */}
    </main>
  )
}
