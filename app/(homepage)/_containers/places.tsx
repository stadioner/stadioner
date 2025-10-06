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
            {language === 'cs' && 'Již brzy začne prodej'}
            {language === 'en' && 'Sales starting soon'}
            {language === 'de' && 'Verkauf startet bald'}
          </h2>
          <p className='max-w-[100ch]'>
            {language === 'cs' && (
              <>
                Již brzy si budete moci zakoupit naše produkty přímo v pivovaru.
                Plánujeme rozšíření prodeje do restaurací a obchodů napříč
                Plzeňským krajem. Nenechte si to ujít! Přihlaste se k našemu{' '}
                <Link href='/newsletter' className='underline font-bold'>
                  newsletteru
                </Link>{' '}
                a buďte první, kdo se dozví o všech novinkách.
              </>
            )}
            {language === 'en' && (
              <>
                Soon you will be able to purchase our products directly at the
                brewery. We plan to expand sales to restaurants and shops across
                the Plzeň Region. Don’t miss out! Subscribe to our{' '}
                <Link href='/newsletter' className='underline font-bold'>
                  newsletter
                </Link>{' '}
                and be the first to hear about all updates.
              </>
            )}
            {language === 'de' && (
              <>
                Bald können Sie unsere Produkte direkt in der Brauerei kaufen.
                Wir planen den Verkauf auf Restaurants und Geschäfte im gesamten
                Bezirk Pilsen auszuweiten. Verpassen Sie nichts! Abonnieren Sie
                unseren{' '}
                <Link href='/newsletter' className='underline font-bold'>
                  Newsletter
                </Link>{' '}
                und erfahren Sie als Erste alle Neuigkeiten.
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
