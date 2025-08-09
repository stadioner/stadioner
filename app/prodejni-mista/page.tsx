'use client'

import { Border } from '@/components/border'
import { Container } from '@/components/container'
import { MapLegend } from '@/components/map-legend'
import { RippedPaperSVG } from '@/components/ripped-paper-svg'
import dynamic from 'next/dynamic'
const Map = dynamic(
  () => import('@/components/map').then(mod => ({ default: mod.Map })),
  { ssr: false }
)

export default function ProdejniMistaPage() {
  return (
    <main className='bg-brand-primary pt-44 pb-20'>
      <Container className='pb-20'>
        <section className='relative'>
          <Border>
            <Map />
          </Border>
          <MapLegend />
        </section>
      </Container>

      <RippedPaperSVG flip />
      <section className='bg-brand-action py-12'>
        <Container className='grid grid-cols-2'>
          <div>
            <h2 className='text-brand-primary text-5xl font-semibold'>
              Výdejní Místo
            </h2>
            <p className='text-zinc-100 mt-2'>
              Kout na Šumavě 2, 345 02 Kout na Šumavě
            </p>
          </div>
          <img src='/placeholder-hl.webp' alt='' />
        </Container>
      </section>
      <RippedPaperSVG />

      <section className='py-12'>
        <Container className='grid grid-cols-2'>
          <div>
            <h2 className='text-brand-action text-5xl font-semibold'>
              Pojízdná prodejna
            </h2>
            <p className='mt-2'>Kout na Šumavě 2, 345 02 Kout na Šumavě</p>
          </div>
          <img src='/placeholder-hl.webp' alt='' />
        </Container>
      </section>
    </main>
  )
}
