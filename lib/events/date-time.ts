import { type SupportedLanguage } from '@/types/blog'

const EVENT_TIME_ZONE = 'Europe/Prague'

const languageLocaleMap: Record<SupportedLanguage, string> = {
  cs: 'cs-CZ',
  en: 'en-GB',
  de: 'de-DE'
}

const formatInEventTimeZone = (
  isoDateTime: string,
  language: SupportedLanguage,
  options: Intl.DateTimeFormatOptions
): string => {
  const date = new Date(isoDateTime)

  if (Number.isNaN(date.getTime())) {
    return ''
  }

  return new Intl.DateTimeFormat(languageLocaleMap[language], {
    timeZone: EVENT_TIME_ZONE,
    ...options
  }).format(date)
}

const getDateKeyInEventTimeZone = (date: Date): string | null => {
  if (Number.isNaN(date.getTime())) {
    return null
  }

  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: EVENT_TIME_ZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).formatToParts(date)

  const year = parts.find((part) => part.type === 'year')?.value
  const month = parts.find((part) => part.type === 'month')?.value
  const day = parts.find((part) => part.type === 'day')?.value

  if (!year || !month || !day) {
    return null
  }

  return `${year}-${month}-${day}`
}

export const isEventPast = (
  event: { dateTime?: string; endDateTime?: string },
  referenceDate: Date = new Date()
): boolean => {
  const eventEndDateTime = event.endDateTime ?? event.dateTime

  if (!eventEndDateTime) {
    return false
  }

  const eventEndDateKey = getDateKeyInEventTimeZone(new Date(eventEndDateTime))
  const referenceDateKey = getDateKeyInEventTimeZone(referenceDate)

  if (!eventEndDateKey || !referenceDateKey) {
    return false
  }

  return eventEndDateKey < referenceDateKey
}

export const formatEventDate = (
  isoDateTime: string,
  language: SupportedLanguage
): string =>
  formatInEventTimeZone(isoDateTime, language, {
    dateStyle: 'long'
  })

export const formatEventTime = (
  isoDateTime: string,
  language: SupportedLanguage
): string =>
  formatInEventTimeZone(isoDateTime, language, {
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23'
  })

export const formatEventDay = (
  isoDateTime: string,
  language: SupportedLanguage
): string =>
  formatInEventTimeZone(isoDateTime, language, {
    day: 'numeric'
  })

export const formatEventMonthShort = (
  isoDateTime: string,
  language: SupportedLanguage
): string =>
  formatInEventTimeZone(isoDateTime, language, {
    month: 'short'
  })

export const formatEventYear = (
  isoDateTime: string,
  language: SupportedLanguage
): string =>
  formatInEventTimeZone(isoDateTime, language, {
    year: 'numeric'
  })
