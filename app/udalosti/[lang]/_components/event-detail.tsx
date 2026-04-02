import { PortableText, type PortableTextComponents } from '@portabletext/react'
import { type SanityImageSource } from '@sanity/image-url/lib/types/types'
import {
  Calendar as CalendarIcon,
  MapPin,
  Clock,
  ArrowLeft
} from 'lucide-react'
import Link from 'next/link'
import { Border } from '@/components/border'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import {
  createPortableTextListComponents,
  hasPortableTextContent,
  isPortableTextBlockEmpty
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
      <div className='relative my-6 aspect-video w-full overflow-hidden'>
        <Image
          src={urlFor(value)}
          alt='Event Image'
          fill
          className='object-cover'
        />
      </div>
    )
  },
  block: {
    normal: ({ children, value }) =>
      isPortableTextBlockEmpty(value) ?
        <div
          aria-hidden='true'
          className='h-8'
        />
      : <p className='text-brand-action/80 mb-4 text-[1.0625rem] leading-[1.8] md:text-[1.125rem]'>
          {children}
        </p>,
    h1: ({ children }) => (
      <h1 className='text-brand-action mt-8 mb-4 text-3xl font-bold'>
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className='text-brand-action mt-8 mb-5 text-[2.1rem] leading-none font-bold md:text-[2.55rem]'>
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className='text-brand-action mt-8 mb-4 text-[1.65rem] leading-tight font-bold md:text-[2rem]'>
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className='text-brand-action mt-7 mb-3 text-[1.2rem] leading-snug font-semibold md:text-[1.35rem]'>
        {children}
      </h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className='border-brand-action/50 text-brand-action/70 my-5 border-l-4 py-2 pl-4 text-[1.0625rem] leading-relaxed italic md:text-[1.125rem]'>
        {children}
      </blockquote>
    )
  },
  ...createPortableTextListComponents({
    listClassName:
      'text-[1.0625rem] leading-[1.8] text-brand-action/80 md:text-[1.125rem]'
  }),
  marks: {
    link: ({
      children,
      value
    }: {
      children?: ReactNode
      value?: { href: string }
    }) => (
      <a
        href={value?.href}
        target='_blank'
        rel='noopener noreferrer'
        className='text-brand-action hover:text-brand-action/80 underline transition-colors'
      >
        {children}
      </a>
    )
  }
}

export function EventDetail({ event, language }: EventDetailProps) {
  const hasDescription = hasPortableTextContent(event.description)
  const hasRecap = hasPortableTextContent(event.recap)
  const recapHeading =
    language === 'cs' ? 'Recap akce'
    : language === 'de' ? 'Rückblick auf die Veranstaltung'
    : 'Event recap'

  return (
    <div>
      <Link
        href={`/udalosti/${language}`}
        className='text-brand-action/70 hover:text-brand-action mb-2 inline-flex items-center transition-colors'
      >
        <ArrowLeft className='mr-2 h-4 w-4' />
        {language === 'cs' ?
          'Zpět na přehled událostí'
        : language === 'de' ?
          'Zurück zur Übersicht'
        : 'Back to events'}
      </Link>
      <Border>
        <div className='bg-brand-primary border-brand-action/20 border'>
          {/* Header Image */}
          {event.mainImage && (
            <div className='border-brand-action/10 relative aspect-video max-h-[50vh] w-full shrink-0 overflow-hidden border-b'>
              <Image
                src={urlFor(event.mainImage)}
                alt={event.title}
                fill
                sizes='100vw'
                className='object-cover'
              />
            </div>
          )}

          <div className='p-6 md:p-10'>
            <div className='border-brand-action/10 mb-8 border-b pb-8'>
              <h1 className='text-brand-action font-mohave mb-4 text-3xl font-bold uppercase md:text-5xl'>
                {event.title}
              </h1>
              <div className='text-brand-action/70 flex flex-wrap gap-x-8 gap-y-3 text-lg'>
                <div className='flex items-center gap-2'>
                  <CalendarIcon className='text-brand-action h-5 w-5' />
                  {formatEventDate(event.dateTime, language)}
                </div>
                <div className='flex items-center gap-2'>
                  <Clock className='text-brand-action h-5 w-5' />
                  {formatEventTime(event.dateTime, language)}
                  {event.endDateTime &&
                    ` - ${formatEventTime(event.endDateTime, language)}`}
                </div>
                {event.location && (
                  <div className='flex items-center gap-2'>
                    <MapPin className='text-brand-action h-5 w-5' />
                    {event.location}
                  </div>
                )}
              </div>
            </div>

            <div className='prose prose-invert prose-lg text-brand-action/80 max-w-none'>
              {hasDescription ?
                <PortableText
                  value={event.description!}
                  components={eventRichTextComponents}
                />
              : !hasRecap ?
                <p className='text-brand-action/60 italic'>
                  {language === 'cs' ?
                    'Bez popisu.'
                  : language === 'de' ?
                    'Keine Beschreibung.'
                  : 'No description.'}
                </p>
              : null}

              {hasRecap && (
                <div className={hasDescription ? 'mt-10' : undefined}>
                  <h2 className='text-brand-action font-mohave mb-5 text-2xl font-bold uppercase md:text-3xl'>
                    {recapHeading}
                  </h2>
                  <PortableText
                    value={event.recap!}
                    components={eventRichTextComponents}
                  />
                </div>
              )}
            </div>

            <EventRsvp
              eventId={event._id}
              language={language}
            />
          </div>
        </div>
      </Border>
    </div>
  )
}
