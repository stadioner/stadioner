import { EventsPage } from './_components/events-page'
import { type SupportedLanguage } from '@/types/blog'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import {
  isSupportedLanguage,
  supportedLanguages
} from '@/lib/i18n/site-languages'
import { getEventsForLanguage } from '@/lib/events/get-events-for-language'
import { createLocalizedListingAlternates } from '@/lib/seo/alternates'
import { type LocalizedSeoLocale } from '@/lib/seo/site'
import { buildPageMetadata } from '@/lib/seo/metadata'

interface Props {
  params: Promise<{ lang: string }>
}

const languageNames = {
  cs: 'Události',
  en: 'Events',
  de: 'Veranstaltungen'
} as const

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params

  if (!isSupportedLanguage(lang)) {
    return {
      title: 'Events Not Found'
    }
  }

  const title = `${languageNames[lang as keyof typeof languageNames]}`
  const description =
    lang === 'cs' ? 'Nadcházející události a akce.'
    : lang === 'en' ? 'Upcoming events and actions.'
    : 'Kommende Veranstaltungen und Aktionen.'
  const alternates = createLocalizedListingAlternates(
    'udalosti',
    lang as LocalizedSeoLocale
  )

  return buildPageMetadata({
    title,
    description,
    canonicalPath: alternates.canonical,
    alternates,
    locale: lang as LocalizedSeoLocale,
    twitterCard: 'summary'
  })
}

export async function generateStaticParams() {
  return supportedLanguages.map((lang) => ({
    lang
  }))
}

// Enable ISR with 60 second revalidation
export const revalidate = 60

export default async function Page({ params }: Props) {
  const { lang } = await params

  if (!isSupportedLanguage(lang)) {
    notFound()
  }

  const events = await getEventsForLanguage(lang as SupportedLanguage)

  return (
    <>
      <h1 className='sr-only'>
        {languageNames[lang as keyof typeof languageNames]}
      </h1>
      <EventsPage
        events={events}
        language={lang as SupportedLanguage}
      />
    </>
  )
}
