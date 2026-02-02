'use client'

import { useState, useEffect } from 'react'
import { client } from '@/sanity/lib/client'
import { eventBySlugQuery } from '@/sanity/lib/queries'
import { useLanguage } from '@/store/use-language'
import { urlFor } from '@/sanity/lib/image'
import Image from 'next/image'
import { Container } from '@/components/container'
import { useParams } from 'next/navigation'
import { PortableText, type PortableTextComponents } from '@portabletext/react'
import { type SanityImageSource } from '@sanity/image-url/lib/types/types'
import { type PortableTextBlock } from 'sanity'
import {
  Calendar as CalendarIcon,
  MapPin,
  Clock,
  ArrowLeft,
} from 'lucide-react'
import { format, parseISO } from 'date-fns'
import { cs, enUS, de } from 'date-fns/locale'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Border } from '@/components/border'

interface Event {
  _id: string
  title: string
  slug: { current: string }
  dateTime: string
  endDateTime?: string
  location?: string
  mainImage?: SanityImageSource
  description?: PortableTextBlock[]
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
    normal: ({ children }) => (
      <p className='mb-4 text-brand-action/80 leading-relaxed'>{children}</p>
    ),
    h1: ({ children }) => (
      <h1 className='text-3xl font-bold text-brand-action mt-8 mb-4'>
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className='text-2xl font-bold text-brand-action mt-8 mb-4'>
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className='text-xl font-bold text-brand-action mt-6 mb-3'>
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className='border-l-4 border-brand-action/50 pl-4 py-2 my-4 italic text-brand-action/70'>
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className='list-disc list-inside space-y-2 mb-4 text-brand-action/80'>
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className='list-decimal list-inside space-y-2 mb-4 text-brand-action/80'>
        {children}
      </ol>
    ),
  },
  marks: {
    link: ({
      children,
      value,
    }: {
      children?: React.ReactNode
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

export default function EventPage() {
  const { language } = useLanguage()
  const params = useParams()
  const slug = params.slug as string
  const [event, setEvent] = useState<Event | null>(null)
  const [loading, setLoading] = useState(true)

  const locale = language === 'cs' ? cs : language === 'de' ? de : enUS

  useEffect(() => {
    const fetchEvent = async () => {
      setLoading(true)
      try {
        const data = await client.fetch(eventBySlugQuery, {
          slug,
          language,
        })
        if (!data) {
          // If not found in current language, maybe try others or just show not found
          // For now, let's just set null
        }
        setEvent(data)
      } catch (error) {
        console.error('Failed to fetch event', error)
      } finally {
        setLoading(false)
      }
    }
    if (slug) {
      fetchEvent()
    }
  }, [slug, language])

  if (loading) {
    return (
      <main className='bg-brand-primary pt-36 pb-20 min-h-screen'>
        <Container>
          <div className='text-center text-brand-action/50 py-20'>
            {language === 'cs'
              ? 'Načítám...'
              : language === 'de'
                ? 'Laden...'
                : 'Loading...'}
          </div>
        </Container>
      </main>
    )
  }

  if (!event) {
    return (
      <main className='bg-brand-primary pt-36 pb-20 min-h-screen'>
        <Container>
          <div className='text-center text-brand-action/50 py-20'>
            Event not found
          </div>
          <div className='text-center'>
            <Link href='/udalosti'>
              <Button variant='outline'>
                <ArrowLeft className='mr-2 h-4 w-4' />
                Zpět na kalendář
              </Button>
            </Link>
          </div>
        </Container>
      </main>
    )
  }

  return (
    <main className='bg-brand-primary pt-36 pb-20 min-h-screen'>
      <Container>
        <Link
          href='/udalosti'
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
                    {format(parseISO(event.dateTime), 'PPP', {
                      locale,
                    })}
                  </div>
                  <div className='flex items-center gap-2'>
                    <Clock className='w-5 h-5 text-brand-action' />
                    {format(parseISO(event.dateTime), 'HH:mm')}
                    {event.endDateTime &&
                      ` - ${format(parseISO(event.endDateTime), 'HH:mm')}`}
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
            </div>
          </div>
        </Border>
      </Container>
    </main>
  )
}
