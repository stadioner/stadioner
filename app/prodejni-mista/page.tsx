import { Metadata } from 'next'
import { VydejniMisto } from './_components/vydejni-misto'
import { Intro } from './_components/intro'
import { buildPageMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'Prodejní místa - Kde koupit naše produkty',
  description:
    'Najděte naše produkty v Plzeňském kraji. Hlavní výdejní místo v pivovaru Kout na Šumavě a další prodejní místa v restauracích a obchodech.',
  canonicalPath: '/cs/prodejni-mista',
  keywords: [
    'prodejní místa',
    'kde koupit',
    'pivovar',
    'Stadioner',
    'Kout na Šumavě',
    'Plzeňský kraj',
    'restaurace',
    'obchody',
    'výdejní místo',
  ],
})

export default function ProdejniMistaPage() {
  return (
    <main className='pt-40 bg-brand-primary'>
      <h1 className='sr-only'>Prodejní místa Stadioner</h1>
      <VydejniMisto />
      <Intro />
      {/* <PojizdnaProdejna /> */}
    </main>
  )
}
