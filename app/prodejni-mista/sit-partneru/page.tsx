import { Metadata } from 'next'
import { Intro } from '@/app/prodejni-mista/_components/intro'
import { buildPageMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'Síť partnerů - Kde koupit STADIONER',
  description:
    'Najděte produkty STADIONER v restauracích, obchodech a dalších partnerských místech v Plzeňském kraji.',
  canonicalPath: '/cs/prodejni-mista/sit-partneru',
  keywords: [
    'síť partnerů',
    'prodejní místa',
    'kde koupit',
    'pivovar',
    'STADIONER',
    'Kout na Šumavě',
    'Plzeňský kraj',
    'restaurace',
    'obchody'
  ]
})

export default function SitPartneruPage() {
  return (
    <main className='bg-brand-primary pt-32 pb-20 md:pt-40'>
      <Intro />
    </main>
  )
}
