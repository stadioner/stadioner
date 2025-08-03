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
        <div className='pb-6'>
          <h2 className='text-brand-action text-6xl font-bold flex-nowrap text-nowrap'>
            Nejsme jen v Koutě na Šumavě
          </h2>
          <p className='max-w-[100ch]'>
            Naše hlavní výdejní místo najdete v pivovaru STADIONER v Koutě na
            Šumavě. Zde si můžete přímo zakoupit naše produkty nebo vrátit
            prázdné lahve. Kromě toho jsou naše produkty k dostání i v řadě
            restaurací, hospod a obchodů napříč Plzeňským krajem. Podívejte se
            na mapu a najděte nejbližší místo ve vašem okolí.
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
