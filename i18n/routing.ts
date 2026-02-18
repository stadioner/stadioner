import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['cs', 'en', 'de'],
  defaultLocale: 'cs',
  localePrefix: 'always',
})

export type AppLocale = (typeof routing.locales)[number]
