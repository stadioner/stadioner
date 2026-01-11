import { Suspense } from 'react'
import { Hero } from './_containers/hero'
import { Places } from './_containers/places'
import { Intro } from './_containers/intro'
import { About } from './_containers/about'
import { Products } from '@/containers/products'
import { Metadata } from 'next'
import { OpeningHours } from './_containers/opening-hours'

export const metadata: Metadata = {
  title: 'Pivovar Kout na Šumavě',
  description:
    'Tradiční pivovar Stadioner v Koutě na Šumavě. Řemeslná piva, limonády a voda ze šumavských pramenů. Navštivte nás nebo najděte naše produkty v Plzeňském kraji.',
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
  openGraph: {
    title: 'Pivovar Kout na Šumavě',
    description:
      'Tradiční pivovar Stadioner v Koutě na Šumavě. Řemeslná piva, limonády a voda ze šumavských pramenů.',
    type: 'website',
    images: [
      {
        url: '/hero/main.svg',
        width: 1200,
        height: 630,
        alt: 'Stadioner Pivovar',
      },
    ],
  },
}

export default function HomePage() {
  return (
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
  )
}
