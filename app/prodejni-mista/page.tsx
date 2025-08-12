'use client'

import { Border } from '@/components/border'
import { Container } from '@/components/container'
import { MapLegend } from '@/components/map-legend'
import { RippedPaperSVG } from '@/components/ripped-paper-svg'
import { useLanguage } from '@/store/use-language'
import dynamic from 'next/dynamic'
const Map = dynamic(
  () => import('@/components/map').then(mod => ({ default: mod.Map })),
  { ssr: false }
)

export default function ProdejniMistaPage() {
  const { language } = useLanguage()

  return (
    <main className='bg-brand-primary pt-44 pb-20'>
      <Container className='pb-20'>
        <section>
          <div className='pb-6'>
            <h2 className='text-brand-action text-6xl font-bold flex-nowrap text-nowrap'>
              {language === 'cs' && 'Nejsme jen v Koutě na Šumavě'}
              {language === 'en' && 'We are not only in Kout na Šumavě'}
              {language === 'de' && 'Wir sind nicht nur in Kout na Šumavě'}
            </h2>
            <p className='max-w-[100ch]'>
              {language === 'cs' &&
                'Naše hlavní výdejní místo najdete v pivovaru STADIONER v Koutě na Šumavě. Zde si můžete přímo zakoupit naše produkty nebo vrátit prázdné lahve. Kromě toho jsou naše produkty k dostání i v řadě restaurací, hospod a obchodů napříč Plzeňským krajem.'}
              {language === 'en' &&
                'Our main distribution point is located at the STADIONER brewery in Kout na Šumavě. Here you can purchase our products directly or return empty bottles. In addition, our products are available in a number of restaurants, pubs, and shops across the Plzeň Region.'}
              {language === 'de' &&
                'Unsere Hauptverkaufsstelle befindet sich in der Brauerei STADIONER in Kout na Šumavě. Hier können Sie unsere Produkte direkt kaufen oder leere Flaschen zurückgeben. Darüber hinaus sind unsere Produkte auch in einer Reihe von Restaurants, Gaststätten und Geschäften in der gesamten Region Pilsen erhältlich.'}
            </p>
          </div>

          <div className='relative'>
            <Border>
              <Map />
            </Border>
            <MapLegend />
          </div>
        </section>
      </Container>

      <RippedPaperSVG flip />
      <section className='bg-brand-action py-12'>
        <Container className='grid grid-cols-2'>
          <div>
            <h2 className='text-brand-primary text-5xl font-bold'>
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
            <h2 className='text-brand-action text-5xl font-bold'>
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
