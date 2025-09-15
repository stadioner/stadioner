'use client'

import { Container } from '@/components/container'
import { RippedPaperSVG } from '@/components/ripped-paper-svg'
import { useLanguage } from '@/store/use-language'
import { PhoneIcon } from 'lucide-react'

export const VydejniMisto = () => {
  const { language } = useLanguage()

  return (
    <section className='bg-brand-primary'>
      <RippedPaperSVG flip />
      <div
        className='bg-brand-action 
      py-12'
      >
        <Container
          className='grid 
        md:grid-cols-2 gap-6'
        >
          <div
            className='flex flex-col 
          justify-between'
          >
            <div>
              <div>
                <h2 className='text-brand-primary text-3xl md:text-4xl lg:text-6xl font-bold flex-nowrap text-nowrap'>
                  {language === 'cs' && 'Výdejní Místo'}
                  {language === 'en' && 'Distribution Point'}
                  {language === 'de' && 'Verkaufsstelle'}
                </h2>
                <p
                  className='text-zinc-100 
                mt-1'
                >
                  Kout na Šumavě 2, 345 02 Kout na Šumavě
                </p>
              </div>
              <img
                src='/vydejni-misto.webp'
                alt='Výdejní místo 
                Stadioner (Kout na Šumavě)'
                className='md:hidden py-4'
              />
              <div
                className='text-zinc-100 
              md:mt-6 space-y-4'
              >
                <p>
                  {language === 'cs' && (
                    <>
                      Hlavní výdejní místo pivovaru STADIONER se nachází přímo v
                      areálu pivovaru v Koutě na Šumavě. Zde si můžete zakoupit
                      všechny naše produkty přímo od výrobce, včetně čerstvých
                      piv, limonád a vod ze šumavských pramenů. Nabízíme také
                      možnost vrácení prázdných lahví. Možnost zakoupit lahvové
                      i sudové pivo.
                    </>
                  )}
                  {language === 'en' && (
                    <>
                      The main distribution point of STADIONER brewery is
                      located directly in the brewery premises in Kout na
                      Šumavě. Here you can purchase all our products directly
                      from the manufacturer, including fresh beers, lemonades,
                      and waters from Šumava springs. We also offer bottle
                      returns. You can purchase both bottled and draft beer.
                    </>
                  )}
                  {language === 'de' && (
                    <>
                      Die Hauptverkaufsstelle der STADIONER Brauerei befindet
                      sich direkt auf dem Brauereigelände in Kout na Šumavě.
                      Hier können Sie alle unsere Produkte direkt vom Hersteller
                      kaufen, einschließlich frischer Biere, Limonaden und
                      Wasser aus den Böhmerwaldquellen. Wir bieten auch
                      Flaschenrückgabe an. Sie können sowohl Flaschen- als auch
                      Fassbier kaufen.
                    </>
                  )}
                </p>

                <div
                  className='border-t 
                border-zinc-600 pt-4'
                >
                  <h4
                    className='font-semibold 
                  text-brand-primary mb-2 
                  text-xl'
                  >
                    {language === 'cs' && 'Otevírací doba'}
                    {language === 'en' && 'Opening Hours'}
                    {language === 'de' && 'Öffnungszeiten'}
                  </h4>
                  <div
                    className='text-sm 
                  space-y-0.5'
                  >
                    <div
                      className='flex 
                    justify-between 
                    items-center'
                    >
                      <span>
                        {language === 'cs' && 'Pondělí - Pátek'}
                        {language === 'en' && 'Monday - Friday'}
                        {language === 'de' && 'Montag - Freitag'}
                      </span>
                      <span
                        className='font-medium
                      '
                      >
                        9:00 - 17:00
                      </span>
                    </div>
                    <div
                      className='flex 
                    justify-between 
                    items-center'
                    >
                      <span>
                        {language === 'cs' && 'Sobota'}
                        {language === 'en' && 'Saturday'}
                        {language === 'de' && 'Samstag'}
                      </span>
                      <span
                        className='font-medium
                      '
                      >
                        9:00 - 15:00
                      </span>
                    </div>
                    <div
                      className='flex 
                    justify-between 
                    items-center'
                    >
                      <span>
                        {language === 'cs' && 'Neděle'}
                        {language === 'en' && 'Sunday'}
                        {language === 'de' && 'Sonntag'}
                      </span>
                      <span
                        className='font-medium
                       text-zinc-400'
                      >
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
              className='text-brand-primary 
              flex gap-1 items-center mt-8 
              md:mt-10'
            >
              <PhoneIcon size={16} />
              +420 111 222 333
            </a>
          </div>
          <img
            src='/vydejni-misto.webp'
            alt='Výdejní místo Stadioner 
            (Kout na Šumavě)'
            className='hidden md:block'
          />
        </Container>
      </div>
      <RippedPaperSVG />
    </section>
  )
}
