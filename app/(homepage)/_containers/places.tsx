'use client'

import { Border } from '@/components/border'
import { Container } from '@/components/container'
import { MapLegend } from '@/components/map-legend'
import { useLanguage } from '@/store/use-language'
import dynamic from 'next/dynamic'
const Map = dynamic(
  () => import('@/components/map').then(mod => ({ default: mod.Map })),
  { ssr: false }
)

export const Places = () => {
  const { language } = useLanguage()

  return (
    <section className='bg-brand-primary pt-20 pb-20'>
      <Container>
        <div className='pb-6'>
          <h2 className='text-brand-action text-3xl md:text-4xl lg:text-6xl font-bold'>
            {language === 'cs' && 'Brzy nebudeme jen v Koutě na Šumavě'}
            {language === 'en' && 'Soon we will not be only in Kout na Šumavě'}
            {language === 'de' && 'Bald sind wir nicht nur in Kout na Šumavě'}
          </h2>
          <p className='max-w-[100ch]'>
            {language === 'cs' &&
              'Pivovar STADIONER v Koutě na Šumavě je naše domovské místo, kde se připravují naše prémiová piva a limonády. Již brzy si budete moci zakoupit naše produkty přímo v pivovaru. Plánujeme rozšíření prodeje do restaurací a obchodů napříč Plzeňským krajem.'}
            {language === 'en' &&
              'The STADIONER brewery in Kout na Šumavě is our home base, where our premium beers and soft drinks are prepared. Soon you will be able to purchase our products directly at the brewery. We plan to expand sales to restaurants and shops across the Plzeň Region.'}
            {language === 'de' &&
              'Die Brauerei STADIONER in Kout na Šumavě ist unser Stammsitz, wo unsere Premium-Biere und Softdrinks hergestellt werden. Bald werden Sie unsere Produkte direkt in der Brauerei kaufen können. Wir planen die Erweiterung des Verkaufs in Restaurants und Geschäfte in der gesamten Region Pilsen.'}
          </p>
        </div>

        <div className='relative'>
          <Border>
            <Map />
          </Border>

          <MapLegend />
        </div>
      </Container>
    </section>
  )
}
