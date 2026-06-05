import {
  isSupportedLanguage,
  supportedLanguages,
  type SupportedLanguage
} from '@/lib/i18n/site-languages'

export type LocalizedStringRecord = Partial<Record<SupportedLanguage, string>>

const localizedLanguageOrder = (
  preferred: SupportedLanguage
): SupportedLanguage[] => [
  preferred,
  ...supportedLanguages.filter((language) => language !== preferred)
]

export const pickLocalizedString = (
  value: LocalizedStringRecord | string | undefined | null,
  preferred: SupportedLanguage
): string | undefined => {
  if (typeof value === 'string' && value.trim().length > 0) {
    return value.trim()
  }

  if (!value || typeof value !== 'object') {
    return undefined
  }

  for (const language of localizedLanguageOrder(preferred)) {
    const candidate = value[language]
    if (typeof candidate === 'string' && candidate.trim().length > 0) {
      return candidate.trim()
    }
  }

  return undefined
}

export const pickLocalizedStringOrFallback = (
  value: LocalizedStringRecord | string | undefined | null,
  preferred: string,
  fallback: string
): string => {
  const language = isSupportedLanguage(preferred) ? preferred : 'cs'
  return pickLocalizedString(value, language) ?? fallback
}
