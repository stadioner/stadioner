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
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
            omnis natus impedit laudantium culpa maiores quae molestiae, unde
            hic officiis id doloribus aliquam quibusdam in maxime atque
            explicabo illum amet labore expedita sunt! Culpa ea incidunt ipsam
            eveniet, suscipit eligendi sapiente, beatae accusamus amet nihil at,
            rem odio consectetur ex?
          </p>
        </div>

        <div className='relative'>
          <Border>
            <Map />
          </Border>

          <div className='absolute top-5 right-5 z-[1000]'>
            <Border backgroundLight>
              <div className='text-xl p-4'>
                <p>🏠 Pivovar Stadioner</p>
                <p>🍺 Pivnice</p>
                <p>🍖 Restaurace</p>
              </div>
            </Border>
          </div>
        </div>
      </Container>
    </section>
  )
}
