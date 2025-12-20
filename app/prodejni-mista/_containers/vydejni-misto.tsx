'use client'

import { Container } from '@/components/container'
import { RippedPaperSVG } from '@/components/ripped-paper-svg'
import { useLanguage } from '@/store/use-language'

export const VydejniMisto = () => {
  const { language } = useLanguage()

  return (
    <section className='bg-brand-primary'>
      <RippedPaperSVG flip />
      <div className='bg-brand-action py-12'>
        <Container className='grid md:grid-cols-2 gap-10'>
          <div className='flex flex-col justify-between'>
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
                  className='mt-3 
                text-sm text-zinc-200'
                >
                  {language === 'cs' && (
                    <p>Zálohy: lahev 5 Kč, bedna 100 Kč, sud 1500 Kč.</p>
                  )}
                  {language === 'en' && (
                    <p>Deposits: bottle 5 CZK, crate 100 CZK, keg 1500 CZK.</p>
                  )}
                  {language === 'de' && (
                    <p>Pfand: Flasche 5 CZK, Kiste 100 CZK, Fass 1500 CZK.</p>
                  )}
                </div>
                <div className='text-sm text-zinc-200'>
                  {language === 'cs' && (
                    <p>Platba možná na místě v hotovosti i kartou.</p>
                  )}
                  {language === 'en' && (
                    <p>Payment possible on site by cash or card.</p>
                  )}
                  {language === 'de' && (
                    <p>Zahlung vor Ort in bar oder mit Karte möglich.</p>
                  )}
                </div>

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
                        9:00 - 11:30 | 12:30 - 16:00
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
                        9:00 - 12:00
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
                      <span className='font-medium text-red-400'>
                        {language === 'cs' && 'ZAVŘENO'}
                        {language === 'en' && 'CLOSED'}
                        {language === 'de' && 'GESCHLOSSEN'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className='border-t border-zinc-600 pt-4 mt-4'>
                  <h4 className='font-semibold text-brand-primary mb-2 text-xl'>
                    {language === 'cs' && 'OTEVÍRACÍ DOBA BĚHEM SVÁTKŮ'}
                    {language === 'en' && 'HOLIDAY OPENING HOURS'}
                    {language === 'de' &&
                      'ÖFFNUNGSZEITEN WÄHREND DER FEIERTAGE'}
                  </h4>
                  <div className='text-sm space-y-0.5'>
                    <div className='flex justify-between items-center'>
                      <span>22. 12.</span>
                      <span className='font-medium'>9:00–16:00</span>
                    </div>
                    <div className='flex justify-between items-center'>
                      <span>23. 12.</span>
                      <span className='font-medium'>9:00–12:00</span>
                    </div>
                    <div className='flex justify-between items-center'>
                      <span>24. – 28. 12.</span>
                      <span className='font-medium text-red-400'>
                        {language === 'cs' && 'ZAVŘENO'}
                        {language === 'en' && 'CLOSED'}
                        {language === 'de' && 'GESCHLOSSEN'}
                      </span>
                    </div>
                    <div className='flex justify-between items-center'>
                      <span>29. 12.</span>
                      <span className='font-medium'>9:00–16:00</span>
                    </div>
                    <div className='flex justify-between items-center'>
                      <span>30. 12.</span>
                      <span className='font-medium'>9:00–12:00</span>
                    </div>
                    <div className='flex justify-between items-center'>
                      <span>31. 12. – 4. 1.</span>
                      <span className='font-medium text-red-400'>
                        {language === 'cs' && 'ZAVŘENO'}
                        {language === 'en' && 'CLOSED'}
                        {language === 'de' && 'GESCHLOSSEN'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <a
              href='tel:+420721980257'
              className='text-brand-primary 
              flex gap-1 items-center mt-8 
              md:mt-10'
            >
              <PhoneIcon size={16} />
              +420 721 980 257
            </a> */}
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
