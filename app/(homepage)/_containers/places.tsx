'use client'

import { Border } from '@/components/border'
import { Container } from '@/components/container'
import dynamic from 'next/dynamic'
const Map = dynamic(
  () => import('@/components/map').then(mod => ({ default: mod.Map })),
  { ssr: false }
)

export const Places = () => {
  return (
    <section className='bg-brand-primary pt-32 pb-10'>
      <Container>
        <div className='flex gap-32 pb-6'>
          <h2 className='text-brand-action text-6xl font-bold flex-nowrap text-nowrap'>
            Nejen v Koutě
          </h2>
          <p>
            Neustále se rozšiřujeme a snažíme se zajistit, aby naše pití mohl
            ochutnat každý. Lorem ipsum, dolor sit amet consectetur adipisicing
            elit. Mollitia dolores nostrum rem laudantium quidem incidunt hic
            rerum. Temporibus cumque non rerum! Magnam iste quam, explicabo quas
            commodi, odit earum architecto incidunt hic eveniet nostrum ipsam
            rem.
          </p>
        </div>

        <div className='flex justify-between'>
          <div className='text-xl'>
            <p>🏠 Pivovar Stadioner</p>
            <p>🍺 Pivnice</p>
            <p>🍖 Restaurace</p>
          </div>

          <Border>
            <Map />
          </Border>
        </div>
      </Container>
    </section>
  )
}
