import { Suspense } from 'react'
import { Hero } from './_components/hero'
import { Places } from './_components/places'
import { Intro } from './_components/intro'
import { About } from './_components/about'
import { Products } from '@/components/products'
import { Metadata } from 'next'
import { OpeningHours } from './_components/opening-hours'
import {
  buildOrganizationSchema,
  buildWebSiteSchema,
  jsonLdToHtml,
} from '@/lib/seo/schema'
import { buildPageMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'Pivovar Kout na Šumavě',
  description:
    'Tradiční pivovar Stadioner v Koutě na Šumavě. Řemeslná piva, limonády a voda ze šumavských pramenů. Navštivte nás nebo najděte naše produkty v Plzeňském kraji.',
  canonicalPath: '/cs',
  keywords: [
    'pivovar',
    'pivo',
    'Kout na Šumavě',
    'Stadioner',
    'řemeslné pivo',
    'Šumava',
    'limonády',
    'voda',
    'Plzeňský kraj',
  ],
  twitterCard: 'summary_large_image',
  openGraphImages: [
    {
      url: '/hero/main.svg',
      width: 1200,
      height: 630,
      alt: 'Stadioner Pivovar',
    },
  ],
  twitterImages: ['/hero/main.svg'],
})

export default function HomePage() {
  const organizationSchema = buildOrganizationSchema()
  const websiteSchema = buildWebSiteSchema()

  return (
    <>
      <main className='overflow-hidden'>
        <Intro />

        <Hero />
        <About />
        <Suspense
          fallback={<div className='bg-brand-action py-8'>Loading...</div>}
        >
          <Products rippedPaper />
        </Suspense>
        <Places />
        <OpeningHours />
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
