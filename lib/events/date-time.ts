import { type SupportedLanguage } from '@/types/blog'

const EVENT_TIME_ZONE = 'Europe/Prague'

const languageLocaleMap: Record<SupportedLanguage, string> = {
  cs: 'cs-CZ',
  en: 'en-GB',
  de: 'de-DE',
}

const formatInEventTimeZone = (
  isoDateTime: string,
  language: SupportedLanguage,
  options: Intl.DateTimeFormatOptions,
): string => {
  const date = new Date(isoDateTime)

  if (Number.isNaN(date.getTime())) {
    return ''
  }

  return new Intl.DateTimeFormat(languageLocaleMap[language], {
    timeZone: EVENT_TIME_ZONE,
    ...options,
  }).format(date)
}

export const formatEventDate = (
  isoDateTime: string,
  language: SupportedLanguage,
): string =>
  formatInEventTimeZone(isoDateTime, language, {
    dateStyle: 'long',
  })

export const formatEventTime = (
  isoDateTime: string,
  language: SupportedLanguage,
): string =>
  formatInEventTimeZone(isoDateTime, language, {
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  })

export const formatEventDay = (
  isoDateTime: string,
  language: SupportedLanguage,
): string =>
  formatInEventTimeZone(isoDateTime, language, {
    day: 'numeric',
  })

export const formatEventMonthShort = (
  isoDateTime: string,
  language: SupportedLanguage,
): string =>
  formatInEventTimeZone(isoDateTime, language, {
    month: 'short',
  })

export const formatEventYear = (
  isoDateTime: string,
  language: SupportedLanguage,
): string =>
  formatInEventTimeZone(isoDateTime, language, {
    year: 'numeric',
  })
