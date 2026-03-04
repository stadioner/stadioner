'use client'

import { useEffect, useState } from 'react'
import { type SupportedLanguage } from '@/types/blog'

interface EventRsvpProps {
  eventId: string
  language: SupportedLanguage
}

type RsvpResponse = {
  participating: boolean
}

const eventRsvpCopy: Record<
  SupportedLanguage,
  {
    title: string
    checkboxLabel: string
    loading: string
    helper: string
    saved: string
    updateError: string
    loadError: string
  }
> = {
  cs: {
    title: 'Předběžná účast',
    checkboxLabel: 'Zúčastním se akce',
    loading: 'Načítám stav účasti...',
    helper: 'Zaškrtněte, pokud plánujete přijít.',
    saved: 'Vaše účast je zaznamenána.',
    updateError: 'Účast se nepodařilo uložit. Zkuste to prosím znovu.',
    loadError: 'Nepodařilo se načíst účastníky.',
  },
  en: {
    title: 'Estimated attendance',
    checkboxLabel: 'I will attend this event',
    loading: 'Loading attendance...',
    helper: 'Check this box if you plan to come.',
    saved: 'Your attendance has been recorded.',
    updateError: 'Could not save attendance. Please try again.',
    loadError: 'Could not load attendance.',
  },
  de: {
    title: 'Geschätzte Teilnahme',
    checkboxLabel: 'Ich nehme an der Veranstaltung teil',
    loading: 'Teilnahme wird geladen...',
    helper: 'Bitte markieren, wenn Sie teilnehmen möchten.',
    saved: 'Ihre Teilnahme wurde gespeichert.',
    updateError:
      'Die Teilnahme konnte nicht gespeichert werden. Bitte erneut versuchen.',
    loadError: 'Teilnehmer konnten nicht geladen werden.',
  },
}

const isRsvpResponse = (value: unknown): value is RsvpResponse => {
  if (typeof value !== 'object' || value === null) {
    return false
  }

  const response = value as Partial<RsvpResponse>
  return typeof response.participating === 'boolean'
}

export function EventRsvp({ eventId, language }: EventRsvpProps) {
  const t = eventRsvpCopy[language]
  const [participating, setParticipating] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isUpdating, setIsUpdating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()

    const loadRsvp = async () => {
      try {
        setIsLoading(true)
        setError(null)

        const response = await fetch(`/api/events/${eventId}/rsvp`, {
          method: 'GET',
          cache: 'no-store',
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error('Failed to load RSVP')
        }

        const payload = (await response.json()) as unknown
        if (!isRsvpResponse(payload)) {
          throw new Error('Invalid RSVP response')
        }

        setParticipating(payload.participating)
      } catch (loadError) {
        if (loadError instanceof Error && loadError.name === 'AbortError') {
          return
        }

        setError(t.loadError)
      } finally {
        setIsLoading(false)
      }
    }

    void loadRsvp()

    return () => controller.abort()
  }, [eventId, t.loadError])

  const handleToggle = async (nextParticipating: boolean) => {
    const previousValue = participating
    setParticipating(nextParticipating)
    setIsUpdating(true)
    setError(null)

    try {
      const response = await fetch(`/api/events/${eventId}/rsvp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ participating: nextParticipating }),
      })

      if (!response.ok) {
        throw new Error('Failed to update RSVP')
      }

      const payload = (await response.json()) as unknown
      if (!isRsvpResponse(payload)) {
        throw new Error('Invalid RSVP response')
      }

      setParticipating(payload.participating)
    } catch {
      setParticipating(previousValue)
      setError(t.updateError)
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <section className='mt-8 border border-brand-action/20 bg-brand-action/5 p-4 md:p-5'>
      <h2 className='text-lg font-bold text-brand-action uppercase font-mohave tracking-wide'>
        {t.title}
      </h2>

      <div className='mt-3'>
        <label className='inline-flex items-center gap-3 text-brand-action/90'>
          <input
            type='checkbox'
            className='h-5 w-5 accent-brand-action cursor-pointer disabled:cursor-not-allowed'
            checked={participating}
            disabled={isLoading || isUpdating}
            onChange={event => {
              void handleToggle(event.target.checked)
            }}
          />
          <span className='text-base'>{t.checkboxLabel}</span>
        </label>
      </div>

      <p className='mt-3 text-sm text-brand-action/70'>
        {isLoading ? t.loading : participating ? t.saved : t.helper}
      </p>

      {error && <p className='mt-2 text-sm text-red-700'>{error}</p>}
    </section>
  )
}
