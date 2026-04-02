'use client'

import { useEffect, useState } from 'react'
import { type SupportedLanguage } from '@/types/blog'

interface EventRsvpProps {
  eventId: string
  language: SupportedLanguage
  isPastEvent: boolean
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
    pastEventHelper: string
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
    pastEventHelper: 'Účast už nelze měnit, akce proběhla.',
    saved: 'Vaše účast je zaznamenána.',
    updateError: 'Účast se nepodařilo uložit. Zkuste to prosím znovu.',
    loadError: 'Nepodařilo se načíst účastníky.'
  },
  en: {
    title: 'Estimated attendance',
    checkboxLabel: 'I will attend this event',
    loading: 'Loading attendance...',
    helper: 'Check this box if you plan to come.',
    pastEventHelper:
      'Attendance can no longer be changed, the event has already taken place.',
    saved: 'Your attendance has been recorded.',
    updateError: 'Could not save attendance. Please try again.',
    loadError: 'Could not load attendance.'
  },
  de: {
    title: 'Geschätzte Teilnahme',
    checkboxLabel: 'Ich nehme an der Veranstaltung teil',
    loading: 'Teilnahme wird geladen...',
    helper: 'Bitte markieren, wenn Sie teilnehmen möchten.',
    pastEventHelper:
      'Die Teilnahme kann nicht mehr geändert werden, die Veranstaltung hat bereits stattgefunden.',
    saved: 'Ihre Teilnahme wurde gespeichert.',
    updateError:
      'Die Teilnahme konnte nicht gespeichert werden. Bitte erneut versuchen.',
    loadError: 'Teilnehmer konnten nicht geladen werden.'
  }
}

const isRsvpResponse = (value: unknown): value is RsvpResponse => {
  if (typeof value !== 'object' || value === null) {
    return false
  }

  const response = value as Partial<RsvpResponse>
  return typeof response.participating === 'boolean'
}

export function EventRsvp({ eventId, language, isPastEvent }: EventRsvpProps) {
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
          signal: controller.signal
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
    if (isPastEvent) {
      return
    }

    const previousValue = participating
    setParticipating(nextParticipating)
    setIsUpdating(true)
    setError(null)

    try {
      const response = await fetch(`/api/events/${eventId}/rsvp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ participating: nextParticipating })
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
    <section className='border-brand-action/20 bg-brand-action/5 mt-8 border p-4 md:p-5'>
      <h2 className='text-brand-action font-mohave text-lg font-bold tracking-wide uppercase'>
        {t.title}
      </h2>

      <div className='mt-3'>
        <label className='text-brand-action/90 inline-flex items-center gap-3'>
          <input
            type='checkbox'
            className='accent-brand-action h-5 w-5 cursor-pointer disabled:cursor-not-allowed'
            checked={participating}
            disabled={isLoading || isUpdating || isPastEvent}
            onChange={(event) => {
              void handleToggle(event.target.checked)
            }}
          />
          <span className='text-base'>{t.checkboxLabel}</span>
        </label>
      </div>

      <p className='text-brand-action/70 mt-3 text-sm'>
        {isLoading ?
          t.loading
        : isPastEvent ?
          t.pastEventHelper
        : participating ?
          t.saved
        : t.helper}
      </p>

      {error && <p className='mt-2 text-sm text-red-700'>{error}</p>}
    </section>
  )
}
