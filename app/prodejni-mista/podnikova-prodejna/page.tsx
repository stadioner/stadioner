import { Metadata } from 'next'
import { Suspense } from 'react'
import { PickupPointSection } from '@/components/pickup-point-section'
import { Products } from '@/components/products'
import { buildPageMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'Podniková prodejna - Pivovar Kout na Šumavě',
  description:
    'Podniková prodejna pivovaru STADIONER v Koutě na Šumavě. Nakupte pivo, limonády a vodu přímo od výrobce.',
  canonicalPath: '/cs/prodejni-mista/podnikova-prodejna',
  keywords: [
    'podniková prodejna',
    'pivovar',
    'STADIONER',
    'Kout na Šumavě',
    'kde koupit',
    'lahvové pivo',
    'sudové pivo'
  ]
})

export default function PodnikovaProdejnaPage() {
  return (
    <main className='bg-brand-primary pt-32 md:pt-40'>
      <PickupPointSection
        headingAs='h1'
        pageLayout
      />
      <Suspense fallback={<div className='bg-brand-action py-8' />}>
        <Products
          rippedPaper
          showBottomRippedPaper={false}
        />
      </Suspense>
    </main>
  )
}
