import { Metadata } from 'next'
import { Suspense } from 'react'
import { VycepNaSaladeSection } from '@/app/prodejni-mista/_components/vycep-na-salade'
import { Products } from '@/components/products'
import { buildPageMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'Výčep Šalanda - Pivovar Kout na Šumavě',
  description:
    'Výčep Šalanda v areálu pivovaru STADIONER. V zimním období uzavřen – výjimkou jsou adventní neděle 6., 13. a 20. prosince.',
  canonicalPath: '/cs/prodejni-mista/vycep-na-salade',
  keywords: [
    'výčep',
    'Šalanda',
    'pivovar',
    'STADIONER',
    'Kout na Šumavě',
    'otevírací doba',
    'program',
    'advent'
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
