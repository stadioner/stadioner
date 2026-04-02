import { Suspense } from 'react'
import { Hero } from './_components/hero'
import { Places } from './_components/places'
import { Intro } from './_components/intro'
import { About } from './_components/about'
import { Products } from '@/components/products'
import { Metadata } from 'next'
import { PickupPointSection } from '@/components/pickup-point-section'
import {
  buildOrganizationSchema,
  buildWebSiteSchema,
  jsonLdToHtml
} from '@/lib/seo/schema'
import { buildPageMetadata } from '@/lib/seo/metadata'
import { sanityFetch } from '@/sanity/lib/fetch'
import { upcomingEventsQuery } from '@/sanity/lib/queries'
import { type Event } from '@/types/event'
import { type SupportedLanguage } from '@/types/blog'

export const metadata: Metadata = buildPageMetadata({
  title: 'Pivovar Kout na Šumavě',
  description:
    'Tradiční pivovar STADIONER v Koutě na Šumavě. Řemeslná piva, limonády a voda ze šumavských pramenů. Navštivte nás nebo najděte naše produkty v Plzeňském kraji.',
  canonicalPath: '/cs',
  keywords: [
    'pivovar',
    'pivo',
    'Kout na Šumavě',
    'STADIONER',
    'řemeslné pivo',
    'Šumava',
    'limonády',
    'voda',
    'Plzeňský kraj'
  ],
  twitterCard: 'summary_large_image',
  openGraphImages: [
    {
      url: '/hero/main.svg',
      width: 1200,
      height: 630,
      alt: 'STADIONER Pivovar'
    }
  ],
  twitterImages: ['/hero/main.svg']
})

export default async function HomePage() {
  const upcomingEventsPromise = Promise.all(
    (['cs', 'en', 'de'] as const).map(async (language) => {
      const events = await sanityFetch<Event[]>({
        query: upcomingEventsQuery,
        params: { language },
        tags: [`events:homepage:${language}`]
      })

      return [language, events[0] ?? null] as const
    })
  )
  const organizationSchema = buildOrganizationSchema()
  const websiteSchema = buildWebSiteSchema()

  return (
    <>
      <main className='overflow-hidden'>
        <Intro />
        <Hero
          upcomingEventsByLanguage={Object.fromEntries(
            await upcomingEventsPromise
          ) as Record<SupportedLanguage, Event | null>}
        />
        <About />
        <Suspense
          fallback={<div className='bg-brand-action py-8'>Loading...</div>}
        >
          <Products rippedPaper />
        </Suspense>
        <Places />
        <PickupPointSection />
      </main>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={jsonLdToHtml(organizationSchema)}
      />
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={jsonLdToHtml(websiteSchema)}
      />
    </>
  )
}
