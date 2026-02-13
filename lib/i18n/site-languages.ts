export const supportedLanguages = ['cs', 'en', 'de'] as const

export type SupportedLanguage = (typeof supportedLanguages)[number]

export const isSupportedLanguage = (
  language: string,
): language is SupportedLanguage => {
  return supportedLanguages.includes(language as SupportedLanguage)
}

