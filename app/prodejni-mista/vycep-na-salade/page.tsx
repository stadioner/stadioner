import { Metadata } from 'next'
import { Suspense } from 'react'
import { VycepNaSaladeSection } from '@/app/prodejni-mista/_components/vycep-na-salade'
import { Products } from '@/components/products'
import { buildPageMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'Výčep na Šalandě - Pivovar Kout na Šumavě',
  description:
    'Výčep na Šalandě v areálu pivovaru STADIONER. Otevírací doba, týdenní program a možnost pronájmu.',
  canonicalPath: '/cs/prodejni-mista/vycep-na-salade',
  keywords: [
    'výčep',
    'Šalanda',
    'pivovar',
    'STADIONER',
    'Kout na Šumavě',
    'otevírací doba',
    'program'
  ]
})

export default function VycepNaSaladePage() {
  return (
    <main className='bg-brand-primary pt-32 md:pt-40'>
      <VycepNaSaladeSection />
      <Suspense fallback={<div className='bg-brand-action py-8' />}>
        <Products
          rippedPaper
          showBottomRippedPaper={false}
        />
      </Suspense>
    </main>
  )
}
