'use client'

import { Container } from '@/components/container'
import { CalendarView } from '@/components/events/calendar-view'
import { useLanguage } from '@/store/use-language'

export default function AkcePage() {
  const { language } = useLanguage()

  const title = {
    cs: 'Kalendář akcí',
    en: 'Event Calendar',
    de: 'Veranstaltungskalender',
  }

  return (
    <main className='bg-brand-primary pt-36 pb-20'>
      <Container>
        <h1 className='text-4xl md:text-5xl font-black text-brand-action mb-10 text-center font-mohave uppercase tracking-wide'>
          {title[language as keyof typeof title] || title.cs}
        </h1>
        <CalendarView />
      </Container>
    </main>
  )
}
