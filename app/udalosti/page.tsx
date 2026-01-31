'use client'

import { Container } from '@/components/container'
import { CalendarView } from '@/components/events/calendar-view'

export default function UdalostiPage() {
  return (
    <main className='bg-brand-primary pt-36 pb-20'>
      <Container>
        <CalendarView />
      </Container>
    </main>
  )
}
