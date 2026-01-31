'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { format, parseISO } from 'date-fns'
import { cs, enUS, de } from 'date-fns/locale'
import {
  Calendar as CalendarIcon,
  MapPin,
  Clock,
  ChevronRight,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { client } from '@/sanity/lib/client'
import { eventsByLanguageQuery } from '@/sanity/lib/queries'
import { useLanguage } from '@/store/use-language'
import { Border } from '@/components/border'
import Link from 'next/link'

interface Event {
  _id: string
  title: string
  slug: { current: string }
  dateTime: string
  endDateTime?: string
  location?: string
  mainImage?: any
  description?: any
}

export function CalendarView() {
  const { language } = useLanguage()
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)

  const locale = language === 'cs' ? cs : language === 'de' ? de : enUS

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true)
      try {
        const data = await client.fetch(eventsByLanguageQuery, { language })
        setEvents(data)
      } catch (error) {
        console.error('Failed to fetch events', error)
      } finally {
        setLoading(false)
      }
    }
    fetchEvents()
  }, [language])

  return (
    <div className='max-w-4xl mx-auto'>
      <Border className='h-full'>
        <div className='p-2 md:p-4 h-full bg-brand-action'>
          <h3 className='text-2xl font-bold text-brand-primary mb-8 flex items-start justify-center gap-3 uppercase font-mohave tracking-widest'>
            <CalendarIcon className='w-7 h-7 text-brand-primary' />
            <span>
              {language === 'cs'
                ? 'Nadcházející události'
                : language === 'de'
                  ? 'Kommende Veranstaltungen'
                  : 'Upcoming Events'}
            </span>
          </h3>

          <div className='space-y-4'>
            {loading ? (
              <div className='text-brand-primary/50 text-center py-10'>
                {language === 'cs'
                  ? 'Načítám akce...'
                  : language === 'de'
                    ? 'Laden...'
                    : 'Loading...'}
              </div>
            ) : events.length > 0 ? (
              <AnimatePresence mode='popLayout'>
                {events.map(event => (
                  <motion.div
                    key={event._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className='bg-transparent hover:bg-brand-primary/5 border border-brand-primary/20 transition-colors group'
                  >
                    <Link
                      href={`/akce/${event.slug.current}`}
                      className='block p-4'
                    >
                      <div className='flex gap-4 items-center'>
                        <div className='flex flex-col items-center justify-center bg-brand-primary px-4 py-2 min-w-[80px] border border-brand-action/20'>
                          <span className='text-brand-action font-bold text-2xl font-mohave'>
                            {format(parseISO(event.dateTime), 'd')}
                          </span>
                          <span className='text-brand-action/80 text-xs uppercase font-bold tracking-wider'>
                            {format(parseISO(event.dateTime), 'MMM', {
                              locale,
                            })}
                          </span>
                        </div>

                        <div className='flex-1 min-w-0'>
                          <h4 className='text-xl md:text-2xl font-bold text-brand-primary group-hover:text-brand-primary transition-colors mb-2 font-mohave uppercase truncate'>
                            {event.title}
                          </h4>
                          <div className='flex flex-wrap gap-x-6 gap-y-2 text-sm text-brand-primary/70'>
                            <div className='flex items-center gap-1.5'>
                              <Clock className='w-4 h-4' />
                              {format(parseISO(event.dateTime), 'HH:mm')}
                              {event.endDateTime &&
                                ` - ${format(
                                  parseISO(event.endDateTime),
                                  'HH:mm',
                                )}`}
                            </div>
                            {event.location && (
                              <div className='flex items-center gap-1.5'>
                                <MapPin className='w-4 h-4' />
                                {event.location}
                              </div>
                            )}
                          </div>
                        </div>

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
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            ) : (
              <div className='text-center py-20 text-brand-primary/40'>
                <p>
                  {language === 'cs'
                    ? 'Žádné nadcházející akce.'
                    : language === 'de'
                      ? 'Keine bevorstehenden Veranstaltungen.'
                      : 'No upcoming events.'}
                </p>
              </div>
            )}
          </div>
        </div>
      </Border>
    </div>
  )
}
