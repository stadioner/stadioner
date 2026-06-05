import type { SupportedLanguage } from '@/lib/i18n/site-languages'

const closeLabelByLanguage: Record<SupportedLanguage, string> = {
  cs: 'Zavřít',
  en: 'Close',
  de: 'Zurück'
}

export const getMobileMenuCloseLabel = (language: SupportedLanguage): string =>
  closeLabelByLanguage[language]
