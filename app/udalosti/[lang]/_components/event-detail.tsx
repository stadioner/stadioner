import { PortableText, type PortableTextComponents } from '@portabletext/react'
import { type SanityImageSource } from '@sanity/image-url/lib/types/types'
import {
  Calendar as CalendarIcon,
  MapPin,
  Clock,
  ArrowLeft,
} from 'lucide-react'
import Link from 'next/link'
import { Border } from '@/components/border'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import {
  createPortableTextListComponents,
  isPortableTextBlockEmpty,
} from '@/sanity/lib/portable-text'
import { Event } from '@/types/event'
import { SupportedLanguage } from '@/types/blog'
import { type ReactNode } from 'react'
import { EventRsvp } from './event-rsvp'
import { formatEventDate, formatEventTime } from '@/lib/events/date-time'

interface EventDetailProps {
  event: Event
  language: SupportedLanguage
}

const eventRichTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }: { value: SanityImageSource }) => (
      <div className='relative w-full aspect-video my-6 overflow-hidden'>
        <Image
          src={urlFor(value)}
          alt='Event Image'
          fill
          className='object-cover'
        />
      </div>
    ),
  },
  block: {
    normal: ({ children, value }) =>
      isPortableTextBlockEmpty(value) ? (
        <div aria-hidden='true' className='h-8' />
      ) : (
        <p className='mb-4 text-[1.0625rem] leading-[1.8] text-brand-action/80 md:text-[1.125rem]'>
          {children}
        </p>
      ),
    h1: ({ children }) => (
      <h1 className='mt-8 mb-4 text-3xl font-bold text-brand-action'>
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className='mt-8 mb-5 text-[2.1rem] leading-none font-bold text-brand-action md:text-[2.55rem]'>
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className='mt-8 mb-4 text-[1.65rem] leading-tight font-bold text-brand-action md:text-[2rem]'>
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className='mt-7 mb-3 text-[1.2rem] leading-snug font-semibold text-brand-action md:text-[1.35rem]'>
        {children}
      </h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className='my-5 border-l-4 border-brand-action/50 py-2 pl-4 text-[1.0625rem] italic leading-relaxed text-brand-action/70 md:text-[1.125rem]'>
        {children}
      </blockquote>
    ),
  },
  ...createPortableTextListComponents({
    listClassName:
      'text-[1.0625rem] leading-[1.8] text-brand-action/80 md:text-[1.125rem]',
  }),
  marks: {
    link: ({
      children,
      value,
    }: {
      children?: ReactNode
      value?: { href: string }
    }) => (
      <a
        href={value?.href}
        target='_blank'
        rel='noopener noreferrer'
        className='text-brand-action underline hover:text-brand-action/80 transition-colors'
      >
        {children}
      </a>
    ),
  },
}

export function EventDetail({ event, language }: EventDetailProps) {
  return (
    <div>
      <Link
        href={`/udalosti/${language}`}
        className='inline-flex items-center text-brand-action/70 hover:text-brand-action mb-2 transition-colors'
      >
        <ArrowLeft className='mr-2 h-4 w-4' />
        {language === 'cs'
          ? 'Zpět na přehled událostí'
          : language === 'de'
            ? 'Zurück zur Übersicht'
            : 'Back to events'}
      </Link>
      <Border>
        <div className='bg-brand-primary border-brand-action/20 border'>
          {/* Header Image */}
          {event.mainImage && (
            <div className='relative w-full aspect-video border-b border-brand-action/10 shrink-0 overflow-hidden max-h-[50vh]'>
              <img
                src={urlFor(event.mainImage)}
                alt={event.title}
                className='w-full h-full object-cover'
              />
            </div>
          )}

          <div className='p-6 md:p-10'>
            <div className='mb-8 border-b border-brand-action/10 pb-8'>
              <h1 className='text-3xl md:text-5xl font-bold text-brand-action mb-4 font-mohave uppercase'>
                {event.title}
              </h1>
              <div className='flex flex-wrap gap-x-8 gap-y-3 text-brand-action/70 text-lg'>
                <div className='flex items-center gap-2'>
                  <CalendarIcon className='w-5 h-5 text-brand-action' />
                  {formatEventDate(event.dateTime, language)}
                </div>
                <div className='flex items-center gap-2'>
                  <Clock className='w-5 h-5 text-brand-action' />
                  {formatEventTime(event.dateTime, language)}
                  {event.endDateTime &&
                    ` - ${formatEventTime(event.endDateTime, language)}`}
                </div>
                {event.location && (
                  <div className='flex items-center gap-2'>
                    <MapPin className='w-5 h-5 text-brand-action' />
                    {event.location}
                  </div>
                )}
              </div>
            </div>

            <div className='prose prose-invert prose-lg max-w-none text-brand-action/80'>
              {event.description ? (
                <PortableText
                  value={event.description}
                  components={eventRichTextComponents}
                />
              ) : (
                <p className='text-brand-action/60 italic'>
                  {language === 'cs'
                    ? 'Bez popisu.'
                    : language === 'de'
                      ? 'Keine Beschreibung.'
                      : 'No description.'}
                </p>
              )}
            </div>

            <EventRsvp eventId={event._id} language={language} />
          </div>
        </div>
      </Border>
    </div>
  )
}
