'use client'

import Link from 'next/link'
import { Container } from '@/components/container'
import { Border } from '@/components/border'
import { useLanguage } from '@/store/use-language'
import { formatEventDateNumeric, formatEventTime } from '@/lib/events/date-time'
import { type Event } from '@/types/event'
import { type SupportedLanguage } from '@/types/blog'

type HeroProps = {
  upcomingEventsByLanguage: Record<SupportedLanguage, Event | null>
}

const heroPanelCopy: Record<
  SupportedLanguage,
  {
    eyebrow: string
    pending: string
    locationFallback: string
  }
> = {
  cs: {
    eyebrow: 'Nejbližší akce',
    pending: 'Termín brzy upřesníme',
    locationFallback: 'Místo bude doplněno'
  },
  en: {
    eyebrow: 'Next event',
    pending: 'Date coming soon',
    locationFallback: 'Location to be announced'
  },
  de: {
    eyebrow: 'Nächste Veranstaltung',
    pending: 'Termin folgt in Kürze',
    locationFallback: 'Ort wird noch ergänzt'
  }
}

export const Hero = ({ upcomingEventsByLanguage }: HeroProps) => {
  const { language } = useLanguage()
  const activeLanguage =
    language === 'en' || language === 'de' ? language : 'cs'
  const upcomingEvent = upcomingEventsByLanguage[activeLanguage]
  const panelCopy = heroPanelCopy[activeLanguage]
  const hasSchedule = Boolean(upcomingEvent?.dateTime)

  return (
    <section className='relative h-[70vh] w-full sm:h-[86vh]'>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src='/hero/main.svg'
        alt='hero'
        className='absolute bottom-0 left-0 z-10 block w-full scale-200 object-bottom sm:scale-150 md:scale-100'
      />
      <div className='bg-brand-primary absolute bottom-0 left-0 h-full w-full'>
        <Container className='text-brand-action relative mt-32 h-full md:mt-44'>
          <h1 className='text-[23vw] font-bold uppercase md:text-[140px]'>
            STADIONER
          </h1>
          <h3 className='-mt-6 text-2xl font-semibold md:-mt-10 md:text-4xl'>
            {language === 'cs' &&
              'Pivovar, kde ožívá šlechtický odkaz, řemeslo a chuť.'}
            {language === 'en' &&
              'A brewery where aristocratic heritage, craftsmanship, and taste come to life.'}
            {language === 'de' &&
              'Eine Brauerei, in der das Erbe der Adelsfamilie, das Handwerk und der Geschmack wieder zum Leben erweckt werden.'}
          </h3>
          <p className='text-lg md:text-2xl'>est. 1736</p>

          {upcomingEvent && (
            <div className='mt-8 flex place-content-end'>
              <Link
                href={`/${activeLanguage}/udalosti/${upcomingEvent.slug.current}`}
                className='relative z-20 md:absolute md:right-4'
              >
                <Border
                  backgroundLight
                  className='max-w-[320px] shadow-[0_20px_45px_rgba(60,74,43,0.08)]'
                >
                  <div className='bg-brand-primary/95 flex flex-col gap-4 px-5 py-4 backdrop-blur-[2px]'>
                    <p className='text-brand-action/80 text-xs font-semibold tracking-[0.24em] uppercase'>
                      {panelCopy.eyebrow}
                    </p>

                    <div className='space-y-3'>
                      <h4 className='text-brand-action text-2xl leading-none font-bold uppercase'>
                        {upcomingEvent.title}
                      </h4>

                      <div className='text-brand-action/80 space-y-1 text-base leading-tight md:text-lg'>
                        <p>
                          {hasSchedule ?
                            <>
                              {formatEventDateNumeric(upcomingEvent.dateTime)}
                              {' · '}
                              {formatEventTime(
                                upcomingEvent.dateTime,
                                activeLanguage
                              )}
                              {upcomingEvent.endDateTime &&
                                ` - ${formatEventTime(upcomingEvent.endDateTime, activeLanguage)}`}
                            </>
                          : panelCopy.pending}
                        </p>
                        <p>
                          {upcomingEvent.location ?? panelCopy.locationFallback}
                        </p>
                      </div>
                    </div>
                  </div>
                </Border>
              </Link>
            </div>
          )}
        </Container>
      </div>
    </section>
  )
}
