'use client'

import { Border } from '@/components/border'
import { Container } from '@/components/container'
import { MapLegend } from '@/components/map-legend'
import { useLanguage } from '@/store/use-language'
import dynamic from 'next/dynamic'
import Link from 'next/link'
const Map = dynamic(
  () => import('@/components/map').then((mod) => ({ default: mod.Map })),
  { ssr: false }
)

export const Places = () => {
  const { language } = useLanguage()

  return (
    <section className='bg-brand-primary pt-20 pb-20'>
      <Container>
        <div className='pb-6'>
          <h2 className='text-brand-action text-3xl font-bold md:text-4xl lg:text-6xl'>
            {language === 'cs' && 'Kde koupit STADIONER?'}
            {language === 'en' && 'Where to buy STADIONER?'}
            {language === 'de' && 'Wo kann man STADIONER kaufen?'}
          </h2>
          <p className='max-w-[100ch]'>
            {language === 'cs' && (
              <>
                Naše produkty jsou dostupné přímo v pivovaru a nově také ve
                vybraných restauracích a obchodech. Síť partnerů neustále
                rozšiřujeme. Zboží si můžete pohodlně{' '}
                <Link
                  href='https://eshop.stadioner.cz'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='font-bold underline'
                >
                  rezervovat online
                </Link>{' '}
                a vyzvednout na výdejním místě. Chcete mít přehled, kde nás
                najdete dál?{' '}
                <Link
                  href='/cs/newsletter'
                  className='font-bold underline'
                >
                  Přihlaste se k newsletteru.
                </Link>
              </>
            )}
            {language === 'en' && (
              <>
                Our products are available directly at the brewery and now also
                in selected restaurants and shops. We are constantly expanding
                our partner network. You can conveniently{' '}
                <Link
                  href='https://eshop.stadioner.cz'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='font-bold underline'
                >
                  reserve online
                </Link>
                and pick up your order at a pickup point. Want to stay up to
                date on where you can find us next?
                <Link
                  href='/en/newsletter'
                  className='font-bold underline'
                >
                  Sign up for the newsletter.
                </Link>
              </>
            )}
            {language === 'de' && (
              <>
                Unsere Produkte sind direkt in der Brauerei und ab sofort auch
                in ausgewahlten Restaurants und Geschafte erhaltlich. Unser
                Partnernetzwerk bauen wir laufend aus. Sie konnen die Ware
                bequem{' '}
                <Link
                  href='https://eshop.stadioner.cz'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='font-bold underline'
                >
                  online reservieren
                </Link>
                und an einer Abholstelle abholen. Mochten Sie den Uberblick
                behalten, wo Sie uns als Nachstes finden?
                <Link
                  href='/de/newsletter'
                  className='font-bold underline'
                >
                  Melden Sie sich fur den Newsletter an.
                </Link>
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
