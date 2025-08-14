'use client'

import { Border } from '@/components/border'
import { Container } from '@/components/container'
import { MapLegend } from '@/components/map-legend'
import { RippedPaperSVG } from '@/components/ripped-paper-svg'
import { useLanguage } from '@/store/use-language'
import { ArrowLeftIcon, ArrowRightIcon, PhoneIcon } from 'lucide-react'
import { useMemo, useState } from 'react'
import dynamic from 'next/dynamic'
const Map = dynamic(
  () => import('@/components/map').then(mod => ({ default: mod.Map })),
  { ssr: false }
)

export default function ProdejniMistaPage() {
  const { language } = useLanguage()
  const schedule = useMemo(
    () => [
      {
        date: new Date(),
        place: 'Plzeň – Náměstí Republiky',
        text: 'Pojízdná prodejna dnes zastaví v Plzni na Náměstí Republiky. Těšíme se na vás! ',
        contact: '+420 123 456 789',
        position: [49.747741, 13.377586] as [number, number],
        iconUrl: '/map/restaurace.svg',
      },
      {
        date: new Date(new Date().setDate(new Date().getDate() + 1)),
        place: 'Klatovy – Švihovská',
        text: 'Zítra nás najdete v Klatovech u OC na Švihovské.',
        contact: '+420 123 456 789',
        position: [49.395524, 13.295081] as [number, number],
        iconUrl: '/map/restaurace.svg',
      },
      {
        date: new Date(new Date().setDate(new Date().getDate() + 2)),
        place: 'Domažlice – Náměstí Míru',
        text: 'Pozítří přijedeme do Domažlic na Náměstí Míru.',
        contact: '+420 123 456 789',
        position: [49.440921, 12.929018] as [number, number],
        iconUrl: '/map/restaurace.svg',
      },
    ],
    []
  )

  const [currentIndex, setCurrentIndex] = useState(0)
  const current = schedule[currentIndex]

  const goPrev = () => {
    setCurrentIndex(idx => (idx - 1 + schedule.length) % schedule.length)
  }
  const goNext = () => {
    setCurrentIndex(idx => (idx + 1) % schedule.length)
  }

  const formattedDate = useMemo(() => {
    const d = current.date
    return d.toLocaleDateString(
      language === 'de' ? 'de-DE' : language === 'en' ? 'en-GB' : 'cs-CZ',
      {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }
    )
  }, [current.date, language])

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
        <Container className='grid grid-cols-2 gap-6'>
          <div className='flex flex-col justify-between'>
            <div>
              <div>
                <h2 className='text-brand-primary text-5xl font-bold'>
                  Výdejní Místo
                </h2>
                <p className='text-zinc-100 mt-1'>
                  Kout na Šumavě 2, 345 02 Kout na Šumavě
                </p>
              </div>
              <p className='text-zinc-100 mt-6 text-sm'>
                {language === 'cs' && (
                  <>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Illum asperiores obcaecati, velit dolore ut quasi culpa
                    consectetur itaque repudiandae sed voluptas commodi ad ab
                    placeat consequatur dolor cum alias blanditiis officia eos
                    aliquid optio eum impedit corrupti. Repellendus, molestiae
                    fuga, nisi quae ducimus, at laboriosam laborum distinctio
                    dolore sunt nihil!
                  </>
                )}
                {language === 'en' && (
                  <>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Minus, eveniet voluptatem. Quibusdam excepturi atque ex
                    ducimus consequatur id, fugit nihil officiis vel porro ea
                    nesciunt neque cumque commodi omnis voluptates fugiat
                    perferendis asperiores temporibus. Consequatur totam natus,
                    temporibus omnis qui delectus commodi dolorem ratione
                    provident. Similique quaerat ipsam maxime eaque.
                  </>
                )}
                {language === 'de' && (
                  <>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Iusto nobis obcaecati laboriosam explicabo nostrum eius, a
                    hic saepe fugiat, placeat nam veniam fuga mollitia
                    asperiores perferendis facere, illo corporis. Totam, nulla
                    nobis explicabo aut, ipsa quod dolor eius corrupti aliquam
                    animi sed dolores dignissimos aperiam? Quam saepe ab fugiat
                    natus.
                  </>
                )}
              </p>
            </div>
            <a
              href='tel:'
              className='text-brand-primary flex gap-1 items-center'
            >
              <PhoneIcon size={16} />
              +420 111 222 333
            </a>
          </div>
          <img src='/placeholder-hl.webp' alt='' />
        </Container>
      </section>
      <RippedPaperSVG />

      <section className='py-12'>
        <Container>
          <h2 className='text-brand-action text-5xl font-bold mb-1'>
            Pojízdná prodejna
          </h2>
          <div className='grid grid-cols-2 gap-6'>
            <Border>
              <Map
                flexible
                center={current.position}
                markers={[
                  {
                    position: current.position,
                    iconUrl: current.iconUrl,
                    popupContent: (
                      <>
                        <h3 className='text-lg font-bold'>{current.place}</h3>
                        <p>{formattedDate}</p>
                      </>
                    ),
                  },
                ]}
              />
            </Border>
            <div>
              <div className='flex items-center gap-3 mb-4'>
                <button
                  aria-label='Předchozí'
                  onClick={goPrev}
                  className='p-2 rounded-md border border-brand-action text-brand-action hover:bg-brand-action hover:text-brand-primary transition-colors'
                >
                  <ArrowLeftIcon size={18} />
                </button>
                <p className='text-brand-action font-semibold'>
                  {formattedDate}
                </p>
                <button
                  aria-label='Další'
                  onClick={goNext}
                  className='p-2 rounded-md border border-brand-action text-brand-action hover:bg-brand-action hover:text-brand-primary transition-colors'
                >
                  <ArrowRightIcon size={18} />
                </button>
              </div>

              <h3 className='text-2xl font-bold text-brand-action'>
                {current.place}
              </h3>
              <p className='mt-2'>{current.text}</p>

              <a
                href={`tel:${current.contact.replace(/\s/g, '')}`}
                className='mt-4 inline-flex items-center gap-2 text-brand-action'
              >
                <PhoneIcon size={16} />
                {current.contact}
              </a>
            </div>
          </div>
        </Container>
      </section>
    </main>
  )
}
