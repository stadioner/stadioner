import type { NewsletterLanguage } from '@/lib/newsletter/copy'

export const oktoberfestNewsletterCopy: Record<
  NewsletterLanguage,
  {
    heading: string
    description: string
    dismiss: string
    closeLabel: string
  }
> = {
  cs: {
    heading: 'Chcete být průběžně informováni o akci?',
    description:
      'Přihlaste se k novinkám a dáme vám vědět, co se na Koutském Oktoberfestu chystá.',
    dismiss: 'Teď ne',
    closeLabel: 'Zavřít'
  },
  en: {
    heading: 'Want updates about the event?',
    description:
      'Subscribe to the newsletter and we will keep you posted about Oktoberfest in Kout.',
    dismiss: 'Not now',
    closeLabel: 'Close'
  },
  de: {
    heading: 'Möchten Sie laufend über die Veranstaltung informiert werden?',
    description:
      'Abonnieren Sie den Newsletter und wir halten Sie zum Oktoberfest in Kout auf dem Laufenden.',
    dismiss: 'Jetzt nicht',
    closeLabel: 'Schließen'
  }
}
