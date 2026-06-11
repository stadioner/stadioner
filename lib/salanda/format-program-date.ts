import type { SupportedLanguage } from '@/lib/i18n/site-languages'

const localeByLanguage: Record<SupportedLanguage, string> = {
  cs: 'cs-CZ',
  en: 'en-GB',
  de: 'de-DE'
}

const parseDateOnly = (value: string): Date | null => {
  const [year, month, day] = value.split('-').map(Number)
  if (!year || !month || !day) {
    return null
  }

  return new Date(year, month - 1, day)
}

export const formatSalandaProgramDate = (
  date: string,
  language: SupportedLanguage
): string => {
  const parsed = parseDateOnly(date)
  if (!parsed) {
    return ''
  }

  return new Intl.DateTimeFormat(localeByLanguage[language], {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  }).format(parsed)
}
