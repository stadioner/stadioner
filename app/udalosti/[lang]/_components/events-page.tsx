'use client'

import { motion, AnimatePresence } from 'framer-motion'
import {
  Calendar as CalendarIcon,
  MapPin,
  Clock,
  ChevronRight,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Border } from '@/components/border'
import Link from 'next/link'
import { Container } from '@/components/container'
import { Event } from '@/types/event'
import { SupportedLanguage } from '@/types/blog'
import {
  formatEventDay,
  formatEventMonthShort,
  formatEventTime,
  formatEventYear,
  isEventPast,
} from '@/lib/events/date-time'

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
    pastTitle: 'Již proběhlo',
  },
  en: {
    upcomingTitle: 'Upcoming Events',
    noUpcoming: 'No upcoming events.',
    comingSoon: 'Coming Soon',
    pastTitle: 'Past Events',
  },
  de: {
    upcomingTitle: 'Kommende Veranstaltungen',
    noUpcoming: 'Keine bevorstehenden Veranstaltungen.',
    comingSoon: 'In Vorbereitung',
    pastTitle: 'Vergangene Veranstaltungen',
  },
}

export function EventsPage({ events, language }: EventsPageProps) {
  const t = eventsPageTranslations[language]
  const now = new Date()

  const pastEvents = events
    .filter(event => isEventPast(event, now))
    .sort(
      (a, b) =>
        new Date(b.endDateTime ?? b.dateTime).getTime() -
        new Date(a.endDateTime ?? a.dateTime).getTime(),
    )

  const upcomingEvents = events.filter(event => !isEventPast(event, now))

  return (
    <main className='bg-brand-primary pt-36 pb-20 min-h-[80vh]'>
      <Container>
        <div>
          <Border className='h-full'>
            <div className='p-2 md:p-4 h-full bg-brand-action'>
              <h3 className='text-2xl font-bold text-brand-primary mb-8 flex items-start justify-center gap-3 uppercase font-mohave tracking-widest'>
                <CalendarIcon className='w-7 h-7 text-brand-primary' />
                <span>{t.upcomingTitle}</span>
              </h3>

              <div className='space-y-4'>
                {upcomingEvents.length > 0 ? (
                  <AnimatePresence mode='popLayout'>
                    {upcomingEvents.map(event => {
                      const EventContent = (
                        <div className='flex gap-4 items-center'>
                          <div className='flex min-w-[80px] flex-col items-center justify-center border border-brand-action/20 bg-brand-primary px-4 py-2'>
                            <span className='text-brand-action font-bold text-2xl font-mohave'>
                              {formatEventDay(event.dateTime, language)}
                            </span>
                            <span className='text-brand-action/80 text-xs uppercase font-bold tracking-wider'>
                              {formatEventMonthShort(event.dateTime, language)}
                            </span>
                            <span className='mt-0.5 text-[0.6rem] font-medium uppercase tracking-[0.18em] text-brand-action/70'>
                              {formatEventYear(event.dateTime, language)}
                            </span>
                          </div>

                          <div className='flex-1 min-w-0'>
                            <h4 className='text-xl md:text-2xl font-bold text-brand-primary group-hover:text-brand-primary transition-colors mb-2 font-mohave uppercase truncate py-1'>
                              {event.title}
                            </h4>
                            <div className='flex flex-wrap gap-x-6 gap-y-2 text-sm text-brand-primary/70'>
                              <div className='flex items-center gap-1.5'>
                                <Clock className='w-4 h-4' />
                                {formatEventTime(event.dateTime, language)}
                                {event.endDateTime &&
                                  ` - ${formatEventTime(event.endDateTime, language)}`}
                              </div>
                              {event.location && (
                                <div className='flex items-center gap-1.5'>
                                  <MapPin className='w-4 h-4' />
                                  {event.location}
                                </div>
                              )}
                            </div>
                          </div>

                          {event.isComingSoon ? (
                            <div className='self-center hidden sm:block bg-brand-primary/10 px-3 py-1'>
                              <span className='text-xs font-bold text-brand-primary uppercase tracking-wider flex items-center gap-2'>
                                {t.comingSoon}
                              </span>
                            </div>
                          ) : (
                            <div className='self-center hidden sm:block'>
                              <Button
                                size='icon'
                                variant='ghost'
                                className='text-brand-primary hover:bg-brand-primary/10'
                                asChild
                              >
                                <span>
                                  <ChevronRight className='w-4 h-4' />
                                </span>
                              </Button>
                            </div>
                          )}
                        </div>
                      )

                      return (
                        <motion.div
                          key={event._id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className={`bg-transparent border border-brand-primary/20 transition-colors group ${
                            event.isComingSoon
                              ? 'opacity-80 cursor-default'
                              : 'hover:bg-brand-primary/5 cursor-pointer'
                          }`}
                        >
                          {event.isComingSoon ? (
                            <div className='block p-4'>{EventContent}</div>
                          ) : (
                            <Link
                              href={`/udalosti/${language}/${event.slug.current}`}
                              className='block p-4'
                            >
                              {EventContent}
                            </Link>
                          )}
                        </motion.div>
                      )
                    })}
                  </AnimatePresence>
                ) : (
                  <div className='text-center py-20 text-brand-primary/40'>
                    <p>{t.noUpcoming}</p>
                  </div>
                )}
              </div>

              {pastEvents.length > 0 && (
                <div className='mt-12'>
                  <h3 className='text-2xl font-bold text-brand-primary/70 mb-8 flex items-start justify-center gap-3 uppercase font-mohave tracking-widest'>
                    <CalendarIcon className='w-7 h-7 text-brand-primary/70' />
                    <span>{t.pastTitle}</span>
                  </h3>

                  <div className='space-y-4'>
                    <AnimatePresence mode='popLayout'>
                      {pastEvents.map(event => (
                        <motion.div
                          key={event._id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className='bg-transparent border border-brand-primary/15 opacity-60 cursor-not-allowed'
                        >
                          <div className='block p-4'>
                            <div className='flex gap-4 items-center'>
                              <div className='flex min-w-[80px] flex-col items-center justify-center border border-brand-primary/10 bg-brand-primary/80 px-4 py-2'>
                                <span className='text-brand-action/70 font-bold text-2xl font-mohave'>
                                  {formatEventDay(event.dateTime, language)}
                                </span>
                                <span className='text-brand-action/60 text-xs uppercase font-bold tracking-wider'>
                                  {formatEventMonthShort(
                                    event.dateTime,
                                    language,
                                  )}
                                </span>
                                <span className='mt-0.5 text-[0.6rem] font-medium uppercase tracking-[0.18em] text-brand-action/35'>
                                  {formatEventYear(event.dateTime, language)}
                                </span>
                              </div>

                              <div className='flex-1 min-w-0'>
                                <h4 className='text-xl md:text-2xl font-bold text-brand-primary/60 transition-colors mb-2 font-mohave uppercase truncate'>
                                  {event.title}
                                </h4>
                                <div className='flex flex-wrap gap-x-6 gap-y-2 text-sm text-brand-primary/50'>
                                  <div className='flex items-center gap-1.5'>
                                    <Clock className='w-4 h-4' />
                                    {formatEventTime(event.dateTime, language)}
                                    {event.endDateTime &&
                                      ` - ${formatEventTime(event.endDateTime, language)}`}
                                  </div>
                                  {event.location && (
                                    <div className='flex items-center gap-1.5'>
                                      <MapPin className='w-4 h-4' />
                                      {event.location}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
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
