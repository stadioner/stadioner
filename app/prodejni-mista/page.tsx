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
        text:
          language === 'cs'
            ? 'Pojízdná prodejna dnes zastaví v Plzni na Náměstí Republiky, v srdci historického centra města. Budeme zde od 10:00 do 18:00 a přivezeme kompletní sortiment našich produktů. Ideální příležitost pro obyvatele Plzně a okolí ochutnat čerstvá piva přímo od výrobce. Nabídneme vám Profesor dvanáctku, Koutskou jedenáctku, všechny druhy limonád a vody ze šumavských pramenů. Přijďte si pro čerstvé pivo a potkat se s námi!'
            : language === 'en'
              ? 'Our mobile sales point will stop today in Plzeň at Náměstí Republiky, in the heart of the historic city center. We will be here from 10:00 to 18:00 and bring a complete range of our products. Perfect opportunity for residents of Plzeň and surrounding areas to taste fresh beer directly from the manufacturer. We will offer you Professor 12, Koutska 11, all types of lemonades and waters from Šumava springs. Come for fresh beer and meet us!'
              : 'Unser fahrbarer Verkaufsstand hält heute in Pilsen am Náměstí Republiky, im Herzen der historischen Altstadt. Wir sind hier von 10:00 bis 18:00 Uhr und bringen eine komplette Auswahl unserer Produkte mit. Perfekte Gelegenheit für Bewohner von Pilsen und Umgebung, frisches Bier direkt vom Hersteller zu probieren. Wir bieten Ihnen Professor 12, Koutska 11, alle Arten von Limonaden und Wasser aus den Böhmerwaldquellen an. Kommen Sie für frisches Bier und treffen Sie uns!',
        contact: '+420 123 456 789',
        position: [49.747741, 13.377586] as [number, number],
        iconUrl: '/map/restaurace.svg',
      },
      {
        date: new Date(new Date().setDate(new Date().getDate() + 1)),
        place: 'Klatovy – Švihovská',
        text:
          language === 'cs'
            ? 'Zítra nás najdete v Klatovech u obchodního centra na Švihovské ulici. Budeme zde od 9:00 do 17:00 a přivezeme vám čerstvé produkty ze šumavského pivovaru. Klatovy jsou známé svou bohatou historií a my jsme hrdí, že můžeme přinést naše tradiční řemeslné pivo do tohoto krásného města. Kromě piv nabídneme také osvěžující limonády a čistou vodu ze šumavských pramenů. Přijďte si pro čerstvé pivo a podpořte lokální řemeslo!'
            : language === 'en'
              ? 'Tomorrow you will find us in Klatovy at the shopping center on Švihovská Street. We will be here from 9:00 to 17:00 and bring you fresh products from the Šumava brewery. Klatovy is known for its rich history and we are proud to bring our traditional craft beer to this beautiful city. In addition to beers, we will also offer refreshing lemonades and pure water from Šumava springs. Come for fresh beer and support local craftsmanship!'
              : 'Morgen finden Sie uns in Klatovy beim Einkaufszentrum in der Švihovská Straße. Wir sind hier von 9:00 bis 17:00 Uhr und bringen Ihnen frische Produkte aus der Böhmerwald-Brauerei mit. Klatovy ist bekannt für seine reiche Geschichte und wir sind stolz darauf, unser traditionelles Craft-Bier in diese schöne Stadt zu bringen. Neben Bieren bieten wir auch erfrischende Limonaden und reines Wasser aus den Böhmerwaldquellen an. Kommen Sie für frisches Bier und unterstützen Sie lokales Handwerk!',
        contact: '+420 123 456 789',
        position: [49.395524, 13.295081] as [number, number],
        iconUrl: '/map/restaurace.svg',
      },
      {
        date: new Date(new Date().setDate(new Date().getDate() + 2)),
        place: 'Domažlice – Náměstí Míru',
        text:
          language === 'cs'
            ? 'Pozítří přijedeme do Domažlic na Náměstí Míru, do jednoho z nejkrásnějších měst Plzeňského kraje. Budeme zde od 10:00 do 16:00 a přivezeme kompletní sortiment našich produktů. Domažlice jsou známé svou chodskou kulturou a my jsme rádi, že můžeme přinést naše šumavské produkty do tohoto historického města. Nabídneme vám čerstvá piva, osvěžující limonády a čistou vodu ze šumavských pramenů. Přijďte si pro čerstvé pivo a užijte si atmosféru tohoto krásného města!'
            : language === 'en'
              ? 'The day after tomorrow we will come to Domažlice at Náměstí Míru, to one of the most beautiful cities in the Plzeň Region. We will be here from 10:00 to 16:00 and bring a complete range of our products. Domažlice is known for its Chod culture and we are glad to bring our Šumava products to this historic city. We will offer you fresh beers, refreshing lemonades and pure water from Šumava springs. Come for fresh beer and enjoy the atmosphere of this beautiful city!'
              : 'Übermorgen kommen wir nach Domažlice auf den Náměstí Míru, in eine der schönsten Städte der Region Pilsen. Wir sind hier von 10:00 bis 16:00 Uhr und bringen eine komplette Auswahl unserer Produkte mit. Domažlice ist bekannt für seine Chod-Kultur und wir freuen uns, unsere Böhmerwald-Produkte in diese historische Stadt zu bringen. Wir bieten Ihnen frische Biere, erfrischende Limonaden und reines Wasser aus den Böhmerwaldquellen an. Kommen Sie für frisches Bier und genießen Sie die Atmosphäre dieser schönen Stadt!',
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
    <main className='bg-brand-primary pt-32 md:pt-40 pb-20'>
      <Container className='pb-20'>
        <section>
          <div className='pb-6'>
            <h2 className='text-brand-action text-3xl md:text-4xl lg:text-6xl font-bold flex-nowrap text-nowrap'>
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
        <Container className='grid md:grid-cols-2 gap-6'>
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
              <img
                src='/vydejni-misto.webp'
                alt='Výdejní místo Stadioner (Kout na Šumavě)'
                className='md:hidden py-4'
              />
              <div className='text-zinc-100 md:mt-6 space-y-4'>
                <p>
                  {language === 'cs' && (
                    <>
                      Hlavní výdejní místo pivovaru STADIONER se nachází přímo v
                      areálu pivovaru v Koutě na Šumavě. Zde si můžete zakoupit
                      všechny naše produkty přímo od výrobce, včetně čerstvých
                      piv, limonád a vod ze šumavských pramenů. Nabízíme také
                      možnost vrácení prázdných lahví a prodej suvenýrů.
                    </>
                  )}
                  {language === 'en' && (
                    <>
                      The main distribution point of STADIONER brewery is
                      located directly in the brewery premises in Kout na
                      Šumavě. Here you can purchase all our products directly
                      from the manufacturer, including fresh beers, lemonades,
                      and waters from Šumava springs. We also offer bottle
                      returns and souvenir sales.
                    </>
                  )}
                  {language === 'de' && (
                    <>
                      Die Hauptverkaufsstelle der STADIONER Brauerei befindet
                      sich direkt auf dem Brauereigelände in Kout na Šumavě.
                      Hier können Sie alle unsere Produkte direkt vom Hersteller
                      kaufen, einschließlich frischer Biere, Limonaden und
                      Wasser aus den Böhmerwaldquellen. Wir bieten auch
                      Flaschenrückgabe und Souvenirverkauf an.
                    </>
                  )}
                </p>

                <div className='border-t border-zinc-600 pt-4'>
                  <h4 className='font-semibold text-brand-primary mb-2 text-xl'>
                    {language === 'cs' && 'Otevírací doba'}
                    {language === 'en' && 'Opening Hours'}
                    {language === 'de' && 'Öffnungszeiten'}
                  </h4>
                  <div className='text-sm space-y-0.5'>
                    <div className='flex justify-between items-center'>
                      <span>
                        {language === 'cs' && 'Pondělí - Pátek'}
                        {language === 'en' && 'Monday - Friday'}
                        {language === 'de' && 'Montag - Freitag'}
                      </span>
                      <span className='font-medium'>9:00 - 17:00</span>
                    </div>
                    <div className='flex justify-between items-center'>
                      <span>
                        {language === 'cs' && 'Sobota'}
                        {language === 'en' && 'Saturday'}
                        {language === 'de' && 'Samstag'}
                      </span>
                      <span className='font-medium'>9:00 - 15:00</span>
                    </div>
                    <div className='flex justify-between items-center'>
                      <span>
                        {language === 'cs' && 'Neděle'}
                        {language === 'en' && 'Sunday'}
                        {language === 'de' && 'Sonntag'}
                      </span>
                      <span className='font-medium text-zinc-400'>
                        {language === 'cs' && 'Zavřeno'}
                        {language === 'en' && 'Closed'}
                        {language === 'de' && 'Geschlossen'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <a
              href='tel:'
              className='text-brand-primary flex gap-1 items-center mt-8 md:mt-0'
            >
              <PhoneIcon size={16} />
              +420 111 222 333
            </a>
          </div>
          <img
            src='/vydejni-misto.webp'
            alt='Výdejní místo Stadioner (Kout na Šumavě)'
            className='hidden md:block'
          />
        </Container>
      </section>
      <RippedPaperSVG />

      <section className='py-12'>
        <Container>
          <div className='pb-6'>
            <h2 className='text-brand-action text-3xl md:text-4xl lg:text-6xl font-bold flex-nowrap text-nowrap'>
              {language === 'cs' && 'Pojízdná prodejna'}
              {language === 'en' && 'Mobile Sales Point'}
              {language === 'de' && 'Fahrbarer Verkaufsstand'}
            </h2>
            <p className='max-w-[100ch]'>
              {language === 'cs' &&
                'Naše pojízdná prodejna objíždí Plzeňský kraj a přináší vám naše produkty přímo k vám. Sledujte náš harmonogram a navštivte nás ve vašem městě. Vždy máme s sebou kompletní sortiment piv, limonád a vod ze šumavských pramenů.'}
              {language === 'en' &&
                'Our mobile sales point travels around the Plzeň Region, bringing our products directly to you. Follow our schedule and visit us in your city. We always carry a complete range of beers, lemonades, and waters from Šumava springs.'}
              {language === 'de' &&
                'Unser fahrbarer Verkaufsstand fährt durch die Region Pilsen und bringt unsere Produkte direkt zu Ihnen. Folgen Sie unserem Zeitplan und besuchen Sie uns in Ihrer Stadt. Wir haben immer eine komplette Auswahl an Bieren, Limonaden und Wasser aus den Böhmerwaldquellen dabei.'}
            </p>
          </div>
          <div className='grid md:grid-cols-2 gap-6'>
            <div className='order-2 md:order-1'>
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
            </div>
            <div className='order-1 md:order-2'>
              <div className='flex items-center gap-3 mb-4'>
                <button
                  aria-label='Předchozí'
                  onClick={goPrev}
                  className='p-2 rounded-md border border-brand-action text-brand-action hover:bg-brand-action hover:text-brand-primary transition-colors cursor-pointer'
                >
                  <ArrowLeftIcon size={18} />
                </button>
                <p className='text-brand-action font-semibold'>
                  {formattedDate}
                </p>
                <button
                  aria-label='Další'
                  onClick={goNext}
                  className='p-2 rounded-md border border-brand-action text-brand-action hover:bg-brand-action hover:text-brand-primary transition-colors cursor-pointer'
                >
                  <ArrowRightIcon size={18} />
                </button>
              </div>

              <h3 className='text-2xl md:text-4xl font-bold text-brand-action'>
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
