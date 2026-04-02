'use client'

import { motion, AnimatePresence } from 'framer-motion'
import {
  Calendar as CalendarIcon,
  MapPin,
  Clock,
  ChevronRight
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Border } from '@/components/border'
import Link from 'next/link'
import { Container } from '@/components/container'
import { Event } from '@/types/event'
import { SupportedLanguage } from '@/types/blog'
import {
  formatEventDateNumeric,
  formatEventTime,
  isEventPast
} from '@/lib/events/date-time'
import { eventHasRecap } from '@/lib/events/visibility'

interface EventsPageProps {
  events: Event[]
  language: SupportedLanguage
}

const eventsPageTranslations: Record<
  SupportedLanguage,
  {
    upcomingTitle: string
    noUpcoming: string
    comingSoon: string
    pastTitle: string
  }
> = {
  cs: {
    upcomingTitle: 'Nadcházející události',
    noUpcoming: 'Žádné nadcházející události.',
    comingSoon: 'Připravujeme',
    pastTitle: 'Již proběhlo'
  },
  en: {
    upcomingTitle: 'Upcoming Events',
    noUpcoming: 'No upcoming events.',
    comingSoon: 'Coming Soon',
    pastTitle: 'Past Events'
  },
  de: {
    upcomingTitle: 'Kommende Veranstaltungen',
    noUpcoming: 'Keine bevorstehenden Veranstaltungen.',
    comingSoon: 'In Vorbereitung',
    pastTitle: 'Vergangene Veranstaltungen'
  }
}

export function EventsPage({ events, language }: EventsPageProps) {
  const t = eventsPageTranslations[language]
  const now = new Date()

  const pastEvents = events
    .filter((event) => isEventPast(event, now))
    .sort(
      (a, b) =>
        new Date(b.endDateTime ?? b.dateTime).getTime() -
        new Date(a.endDateTime ?? a.dateTime).getTime()
    )

  const upcomingEvents = events.filter((event) => !isEventPast(event, now))

  return (
    <main className='bg-brand-primary min-h-[80vh] pt-36 pb-20'>
      <Container>
        <div>
          <Border className='h-full'>
            <div className='bg-brand-action h-full p-2 md:p-4'>
              <h3 className='text-brand-primary font-mohave mb-8 flex items-start justify-center gap-3 text-2xl font-bold tracking-widest uppercase'>
                <CalendarIcon className='text-brand-primary h-7 w-7' />
                <span>{t.upcomingTitle}</span>
              </h3>

              <div className='space-y-4'>
                {upcomingEvents.length > 0 ?
                  <AnimatePresence mode='popLayout'>
                    {upcomingEvents.map((event) => {
                      const EventContent = (
                        <div className='flex items-stretch gap-4'>
                          <div className='border-brand-action/20 bg-brand-primary flex min-w-[104px] items-center justify-center self-stretch border px-3 py-2 text-center'>
                            <span className='text-brand-action text-sm font-semibold whitespace-nowrap md:text-base'>
                              {formatEventDateNumeric(event.dateTime)}
                            </span>
                          </div>

                          <div className='flex min-w-0 flex-1 flex-col justify-center'>
                            <h4 className='text-brand-primary group-hover:text-brand-primary font-mohave mb-2 truncate py-1 text-xl font-bold uppercase transition-colors md:text-2xl'>
                              {event.title}
                            </h4>
                            <div className='text-brand-primary/70 flex flex-wrap gap-x-6 gap-y-2 text-sm'>
                              <div className='flex items-center gap-1.5'>
                                <Clock className='h-4 w-4' />
                                {formatEventTime(event.dateTime, language)}
                                {event.endDateTime &&
                                  ` - ${formatEventTime(event.endDateTime, language)}`}
                              </div>
                              {event.location && (
                                <div className='flex items-center gap-1.5'>
                                  <MapPin className='h-4 w-4' />
                                  {event.location}
                                </div>
                              )}
                            </div>
                          </div>

                          {event.isComingSoon ?
                            <div className='bg-brand-primary/10 hidden self-center px-3 py-1 sm:block'>
                              <span className='text-brand-primary flex items-center gap-2 text-xs font-bold tracking-wider uppercase'>
                                {t.comingSoon}
                              </span>
                            </div>
                          : <div className='hidden self-center sm:block'>
                              <Button
                                size='icon'
                                variant='ghost'
                                className='text-brand-primary hover:bg-brand-primary/10'
                                asChild
                              >
                                <span>
                                  <ChevronRight className='h-4 w-4' />
                                </span>
                              </Button>
                            </div>
                          }
                        </div>
                      )

                      const isPastEvent = isEventPast(event, now)
                      const canOpenEvent = !isPastEvent || eventHasRecap(event)

                      return (
                        <motion.div
                          key={event._id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className={`border-brand-primary/20 group border bg-transparent transition-colors ${
                            event.isComingSoon ? 'cursor-default opacity-80'
                            : !canOpenEvent ? 'cursor-not-allowed opacity-60'
                            : 'hover:bg-brand-primary/5 cursor-pointer'
                          }`}
                        >
                          {event.isComingSoon ?
                            <div className='block p-4'>{EventContent}</div>
                          : canOpenEvent ?
                            <Link
                              href={`/udalosti/${language}/${event.slug.current}`}
                              className='block p-4'
                            >
                              {EventContent}
                            </Link>
                          : <div className='block p-4'>{EventContent}</div>}
                        </motion.div>
                      )
                    })}
                  </AnimatePresence>
                : <div className='text-brand-primary/40 py-20 text-center'>
                    <p>{t.noUpcoming}</p>
                  </div>
                }
              </div>

              {pastEvents.length > 0 && (
                <div className='mt-12'>
                  <h3 className='text-brand-primary/70 font-mohave mb-8 flex items-start justify-center gap-3 text-2xl font-bold tracking-widest uppercase'>
                    <CalendarIcon className='text-brand-primary/70 h-7 w-7' />
                    <span>{t.pastTitle}</span>
                  </h3>

                  <div className='space-y-4'>
                    <AnimatePresence mode='popLayout'>
                      {pastEvents.map((event) => {
                        const canOpenEvent = eventHasRecap(event)

                        return (
                          <motion.div
                            key={event._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className={`border-brand-primary/15 border bg-transparent opacity-60 ${
                              canOpenEvent ?
                                'group hover:bg-brand-primary/5 cursor-pointer transition-colors'
                              : 'cursor-not-allowed'
                            }`}
                          >
                            {canOpenEvent ?
                              <Link
                                href={`/udalosti/${language}/${event.slug.current}`}
                                className='block p-4'
                              >
                                <div className='flex items-stretch gap-4'>
                                  <div className='border-brand-primary/10 bg-brand-primary/80 flex min-w-[104px] items-center justify-center self-stretch border px-3 py-2 text-center'>
                                    <span className='text-brand-action/70 text-sm font-semibold whitespace-nowrap md:text-base'>
                                      {formatEventDateNumeric(event.dateTime)}
                                    </span>
                                  </div>

                                  <div className='flex min-w-0 flex-1 flex-col justify-center'>
                                    <h4 className='text-brand-primary/60 font-mohave mb-2 truncate text-xl font-bold uppercase transition-colors md:text-2xl'>
                                      {event.title}
                                    </h4>
                                    <div className='text-brand-primary/50 flex flex-wrap gap-x-6 gap-y-2 text-sm'>
                                      <div className='flex items-center gap-1.5'>
                                        <Clock className='h-4 w-4' />
                                        {formatEventTime(
                                          event.dateTime,
                                          language
                                        )}
                                        {event.endDateTime &&
                                          ` - ${formatEventTime(event.endDateTime, language)}`}
                                      </div>
                                      {event.location && (
                                        <div className='flex items-center gap-1.5'>
                                          <MapPin className='h-4 w-4' />
                                          {event.location}
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </Link>
                            : <div className='block p-4'>
                                <div className='flex items-stretch gap-4'>
                                  <div className='border-brand-primary/10 bg-brand-primary/80 flex min-w-[104px] items-center justify-center self-stretch border px-3 py-2 text-center'>
                                    <span className='text-brand-action/70 text-sm font-semibold whitespace-nowrap md:text-base'>
                                      {formatEventDateNumeric(event.dateTime)}
                                    </span>
                                  </div>

                                  <div className='flex min-w-0 flex-1 flex-col justify-center'>
                                    <h4 className='text-brand-primary/60 font-mohave mb-2 truncate text-xl font-bold uppercase transition-colors md:text-2xl'>
                                      {event.title}
                                    </h4>
                                    <div className='text-brand-primary/50 flex flex-wrap gap-x-6 gap-y-2 text-sm'>
                                      <div className='flex items-center gap-1.5'>
                                        <Clock className='h-4 w-4' />
                                        {formatEventTime(
                                          event.dateTime,
                                          language
                                        )}
                                        {event.endDateTime &&
                                          ` - ${formatEventTime(event.endDateTime, language)}`}
                                      </div>
                                      {event.location && (
                                        <div className='flex items-center gap-1.5'>
                                          <MapPin className='h-4 w-4' />
                                          {event.location}
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            }
                          </motion.div>
                        )
                      })}
                    </AnimatePresence>
                  </div>
                </div>
              )}
            </div>
          </Border>
        </div>
      </Container>
    </main>
  )
}
