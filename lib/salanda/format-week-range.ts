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

export const formatSalandaWeekRange = (
  weekStart: string,
  weekEnd: string,
  language: SupportedLanguage
): string => {
  const start = parseDateOnly(weekStart)
  const end = parseDateOnly(weekEnd)
  const locale = localeByLanguage[language]

  if (!start || !end) {
    return ''
  }

  const sameMonth = start.getMonth() === end.getMonth()
  const sameYear = start.getFullYear() === end.getFullYear()

  const startFormatter = new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: sameMonth ? undefined : 'long',
    year: sameYear ? undefined : 'numeric'
  })
  const endFormatter = new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })

  return `${startFormatter.format(start)} – ${endFormatter.format(end)}`
}
