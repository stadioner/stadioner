'use client'

import Image from 'next/image'
import { Container } from '@/components/container'
import { RippedPaperSVG } from '@/components/ripped-paper-svg'
import {
  isSupportedLanguage,
  type SupportedLanguage
} from '@/lib/i18n/site-languages'
import { cn } from '@/lib/utils'
import { useLanguage } from '@/store/use-language'

type OpeningHourRow = {
  key: string
  label: string
  value: string
  closed: boolean
}

type PickupPointContent = {
  sectionTitle: string
  address: string
  imageAlt: string
  intro: string
  depositInfo: string
  paymentInfo: string
  taproomNote: string
  openingHoursTitle: string
  openingHours: OpeningHourRow[]
  closedLabel: string
}

const contentByLanguage: Record<SupportedLanguage, PickupPointContent> = {
  cs: {
    sectionTitle: 'Výdejní Místo',
    address: 'Kout na Šumavě 2, 345 02 Kout na Šumavě',
    imageAlt: 'Výdejní místo STADIONER v Koutě na Šumavě',
    intro:
      'Hlavní výdejní místo pivovaru STADIONER se nachází přímo v areálu pivovaru v Koutě na Šumavě. Zde si můžete zakoupit všechny naše produkty přímo od výrobce, včetně čerstvých piv, limonád a vod ze šumavských pramenů. Nabízíme také možnost vrácení prázdných lahví. Možnost zakoupit lahvové i sudové pivo.',
    depositInfo:
      'Zálohy: lahev 5 Kč, bedna 100 Kč, sud (30L, 50L) 1500 Kč, sud (10L, 20.5L) 2000 Kč',
    paymentInfo: 'Platba možná na místě v hotovosti i kartou.',
    taproomNote:
      'Od 3. 4. 2026 je na výdejním místě otevřen i výčep, a to ve stejné otevírací době jako výdejní místo. Informace o tom, jaké pivo a kdy bude na čepu, najdete na našich sociálních sítích.',
    openingHoursTitle: 'Otevírací doba',
    openingHours: [
      { key: 'mon', label: 'Pondělí', value: 'ZAVŘENO', closed: true },
      {
        key: 'tue-thu',
        label: 'Úterý - Čtvrtek',
        value: '14:00 - 17:00',
        closed: false
      },
      { key: 'fri', label: 'Pátek', value: '9:00 - 17:00', closed: false },
      { key: 'sat', label: 'Sobota', value: '9:00 - 12:00', closed: false },
      { key: 'sun', label: 'Neděle', value: 'ZAVŘENO', closed: true }
    ],
    closedLabel: 'ZAVŘENO'
  },
  en: {
    sectionTitle: 'Pickup Point',
    address: 'Kout na Šumavě 2, 345 02 Kout na Šumavě',
    imageAlt: 'STADIONER pickup point in Kout na Šumavě',
    intro:
      'The main pickup point of STADIONER brewery is located directly in the brewery premises in Kout na Šumavě. Here you can purchase all our products directly from the producer, including fresh beers, lemonades, and water from Šumava springs. We also offer bottle returns. You can purchase both bottled and keg beer.',
    depositInfo:
      'Deposits: bottle 5 CZK, crate 100 CZK, keg (30L, 50L) 1500 CZK, keg (10L, 20.5L) 2000 CZK',
    paymentInfo: 'Payment on site is possible both in cash and by card.',
    taproomNote:
      'From April 3, 2026, a taproom is also open at the pickup point during the same opening hours as the pickup point. Updates on which beer will be on tap and when will be shared on our social media.',
    openingHoursTitle: 'Opening hours',
    openingHours: [
      { key: 'mon', label: 'Monday', value: 'CLOSED', closed: true },
      {
        key: 'tue-thu',
        label: 'Tuesday - Thursday',
        value: '14:00 - 17:00',
        closed: false
      },
      { key: 'fri', label: 'Friday', value: '9:00 - 17:00', closed: false },
      { key: 'sat', label: 'Saturday', value: '9:00 - 12:00', closed: false },
      { key: 'sun', label: 'Sunday', value: 'CLOSED', closed: true }
    ],
    closedLabel: 'CLOSED'
  },
  de: {
    sectionTitle: 'Abholstelle',
    address: 'Kout na Šumavě 2, 345 02 Kout na Šumavě',
    imageAlt: 'STADIONER Abholstelle in Kout na Šumavě',
    intro:
      'Die Hauptabholstelle der Brauerei STADIONER befindet sich direkt auf dem Brauereigelände in Kout na Šumavě. Hier können Sie alle unsere Produkte direkt vom Hersteller kaufen, einschließlich frischer Biere, Limonaden und Wasser aus den Böhmerwaldquellen. Wir bieten auch die Rückgabe leerer Flaschen an. Sie können sowohl Flaschenbier als auch Bier im Fass kaufen.',
    depositInfo:
      'Pfand: Flasche 5 CZK, Kiste 100 CZK, Fass (30L, 50L) 1500 CZK, Fass (10L, 20.5L) 2000 CZK',
    paymentInfo: 'Zahlung vor Ort ist bar oder mit Karte möglich.',
    taproomNote:
      'Ab dem 3. 4. 2026 ist an der Abholstelle auch ein Ausschank geöffnet, und zwar zu denselben Öffnungszeiten wie die Abholstelle. Informationen dazu, welches Bier wann vom Fass ausgeschenkt wird, finden Sie in unseren sozialen Netzwerken.',
    openingHoursTitle: 'Öffnungszeiten',
    openingHours: [
      { key: 'mon', label: 'Montag', value: 'GESCHLOSSEN', closed: true },
      {
        key: 'tue-thu',
        label: 'Dienstag - Donnerstag',
        value: '14:00 - 17:00',
        closed: false
      },
      { key: 'fri', label: 'Freitag', value: '9:00 - 17:00', closed: false },
      { key: 'sat', label: 'Samstag', value: '9:00 - 12:00', closed: false },
      { key: 'sun', label: 'Sonntag', value: 'GESCHLOSSEN', closed: true }
    ],
    closedLabel: 'GESCHLOSSEN'
  }
}

const dayToRowKey: Partial<Record<number, OpeningHourRow['key']>> = {
  0: 'sun',
  1: 'mon',
  2: 'tue-thu',
  3: 'tue-thu',
  4: 'tue-thu',
  5: 'fri',
  6: 'sat'
}

export const PickupPointSection = ({
  showBottomRippedPaper = true
}: {
  showBottomRippedPaper?: boolean
}) => {
  const language = useLanguage((state) => state.language)
  const currentLanguage = isSupportedLanguage(language) ? language : 'cs'
  const content = contentByLanguage[currentLanguage]
  const currentDayKey = dayToRowKey[new Date().getDay()]

  return (
    <section className='bg-brand-primary'>
      <RippedPaperSVG flip />
      <div className='bg-brand-action py-12'>
        <Container className='grid gap-10 md:grid-cols-2'>
          <div className='flex flex-col justify-between'>
            <div>
              <div>
                <h2 className='text-brand-primary flex-nowrap text-3xl font-bold text-nowrap md:text-4xl lg:text-6xl'>
                  {content.sectionTitle}
                </h2>
                <p className='mt-1 text-zinc-100'>{content.address}</p>
              </div>

              <Image
                src='/vydejni-misto-zima.webp'
                alt={content.imageAlt}
                width={1200}
                height={900}
                sizes='100vw'
                className='py-4 md:hidden'
              />

              <div className='space-y-4 text-zinc-100 md:mt-6'>
                <p>{content.intro}</p>

                <div className='text-brand-primary border-t border-zinc-600 pt-4 text-sm font-bold md:text-base'>
                  <p>{content.taproomNote}</p>
                </div>

                <div className='text-sm text-zinc-200'>
                  <p>{content.depositInfo}</p>
                </div>

                <div className='text-sm text-zinc-200'>
                  <p>{content.paymentInfo}</p>
                </div>

                <div className='border-t border-zinc-600 pt-4'>
                  <h4 className='text-brand-primary mb-2 text-xl font-semibold'>
                    {content.openingHoursTitle}
                  </h4>

                  <div className='space-y-1'>
                    {content.openingHours.map((row) => {
                      const isToday = row.key === currentDayKey

                      return (
                        <div
                          key={row.key}
                          className={cn(
                            'flex items-center justify-between px-3 py-2 transition-colors',
                            isToday && 'bg-brand-primary text-brand-action'
                          )}
                        >
                          <span className={cn(isToday && 'font-bold')}>
                            {row.label}
                          </span>
                          <span
                            className={cn(
                              'font-medium',
                              row.value === content.closedLabel &&
                                !isToday &&
                                'text-red-400',
                              isToday && 'font-bold'
                            )}
                          >
                            {row.value}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Image
            src='/vydejni-misto-zima.webp'
            alt={content.imageAlt}
            width={1200}
            height={900}
            sizes='(min-width: 768px) 50vw, 100vw'
            className='hidden md:block'
          />
        </Container>
      </div>
      {showBottomRippedPaper ?
        <RippedPaperSVG />
      : null}
    </section>
  )
}
