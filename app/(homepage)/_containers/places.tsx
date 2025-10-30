'use client'

import { Border } from '@/components/border'
import { Container } from '@/components/container'
import { MapLegend } from '@/components/map-legend'
import { useLanguage } from '@/store/use-language'
import dynamic from 'next/dynamic'
import Link from 'next/link'
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
            {language === 'cs' && 'Spustili jsme prodej'}
            {language === 'en' && 'We have launched sales'}
            {language === 'de' && 'Wir haben den Verkauf gestartet'}
          </h2>
          <p className='max-w-[100ch]'>
            {language === 'cs' && (
              <>
                Naše produkty si nyní můžete zakoupit přímo v pivovaru. Prodej
                postupně rozšiřujeme do restaurací a obchodů napříč Plzeňským
                krajem. Nepropásněte novinky – přihlaste se k našemu{' '}
                <Link href='/newsletter' className='underline font-bold'>
                  newsletteru
                </Link>
                . Zboží si můžete také rezervovat na našem{' '}
                <Link
                  href='https://eshop.stadioner.cz'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='underline font-bold'
                >
                  e‑shopu
                </Link>{' '}
                a vyzvednout na výdejním místě.
              </>
            )}
            {language === 'en' && (
              <>
                You can now purchase our products directly at the brewery. We
                are gradually expanding sales to restaurants and shops across
                the Plzeň Region. Stay in the loop — subscribe to our{' '}
                <Link href='/newsletter' className='underline font-bold'>
                  newsletter
                </Link>
                . You can also reserve goods on our{' '}
                <Link
                  href='https://eshop.stadioner.cz'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='underline font-bold'
                >
                  e‑shop
                </Link>{' '}
                and pick them up at the pickup point.
              </>
            )}
            {language === 'de' && (
              <>
                Unsere Produkte können Sie jetzt direkt in der Brauerei kaufen.
                Wir erweitern den Verkauf nach und nach auf Restaurants und
                Geschäfte im gesamten Bezirk Pilsen. Bleiben Sie auf dem
                Laufenden – abonnieren Sie unseren{' '}
                <Link href='/newsletter' className='underline font-bold'>
                  Newsletter
                </Link>
                . Sie können die Ware auch in unserem{' '}
                <Link
                  href='https://eshop.stadioner.cz'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='underline font-bold'
                >
                  E‑Shop
                </Link>{' '}
                reservieren und am Abholpunkt abholen.
              </>
            )}
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
