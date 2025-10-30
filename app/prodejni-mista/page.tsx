import { Metadata } from 'next'
import { PojizdnaProdejna } from './_containers/pojizdna-prodejna'
import { VydejniMisto } from './_containers/vydejni-misto'
import { Intro } from './_containers/intro'

export const metadata: Metadata = {
  title: 'Prodejní místa - Kde koupit naše produkty',
  description:
    'Najděte naše produkty v Plzeňském kraji. Hlavní výdejní místo v pivovaru Kout na Šumavě a další prodejní místa v restauracích a obchodech.',
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
  openGraph: {
    title: 'Prodejní místa - Kde koupit naše produkty',
    description:
      'Najděte naše produkty v Plzeňském kraji. Hlavní výdejní místo v pivovaru a další prodejní místa.',
    type: 'website',
  },
}

export default function ProdejniMistaPage() {
  return (
    <main className='pt-40 bg-brand-primary'>
      <VydejniMisto />
      <Intro />
      {/* <PojizdnaProdejna /> */}
    </main>
  )
}
