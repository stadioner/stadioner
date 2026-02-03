import { cachedClient } from '@/sanity/lib/client'
import { eventsByLanguageQuery } from '@/sanity/lib/queries'
import { EventsPage } from './_containers/events-page'
import { SupportedLanguage } from '@/types/blog'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'

interface Props {
  params: Promise<{ lang: string }>
}

const supportedLanguages: SupportedLanguage[] = ['cs', 'en', 'de']

const languageNames = {
  cs: 'Události',
  en: 'Events',
  de: 'Veranstaltungen',
} as const

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params

  if (!supportedLanguages.includes(lang as SupportedLanguage)) {
    return {
      title: 'Events Not Found',
    }
  }

  const title = `${languageNames[lang as keyof typeof languageNames]}`
  const description =
    lang === 'cs'
      ? 'Nadcházející události a akce.'
      : lang === 'en'
        ? 'Upcoming events and actions.'
        : 'Kommende Veranstaltungen und Aktionen.'

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
  }
}

export async function generateStaticParams() {
  return supportedLanguages.map(lang => ({
    lang,
  }))
}

// Enable ISR with 60 second revalidation
export const revalidate = 60

export default async function Page({ params }: Props) {
  const { lang } = await params

  if (!supportedLanguages.includes(lang as SupportedLanguage)) {
    notFound()
  }

  const events = await cachedClient(eventsByLanguageQuery, { language: lang })

  return <EventsPage events={events} language={lang as SupportedLanguage} />
}
