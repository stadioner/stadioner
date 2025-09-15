export const languages = [
  { id: 'cs', title: 'Čeština', flag: '🇨🇿' },
  { id: 'en', title: 'English', flag: '🇬🇧' },
  { id: 'de', title: 'Deutsch', flag: '🇩🇪' },
] as const

export type Language = (typeof languages)[number]['id']

export const defaultLanguage: Language = 'cs'

export const languageNames = {
  cs: 'Čeština',
  en: 'English',
  de: 'Deutsch',
} as const
