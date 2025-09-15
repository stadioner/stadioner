import { Products } from '@/containers/products'
import { Suspense } from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Naše produkty - Piva, limonády a voda',
  description:
    'Objevte naše řemeslné piva, osvěžující limonády a čistou vodu ze šumavských pramenů. Kvalita a tradice v každém doušku.',
  keywords: [
    'produkty',
    'pivo',
    'limonády',
    'voda',
    'Stadioner',
    'řemeslné pivo',
    'Šumava',
  ],
  openGraph: {
    title: 'Naše produkty - Piva, limonády a voda',
    description:
      'Objevte naše řemeslné piva, osvěžující limonády a čistou vodu ze šumavských pramenů.',
    type: 'website',
  },
}

export default function ProduktyPage() {
  return (
    <main className='bg-brand-action pt-24 md:pt-32 pb-16'>
      <Suspense
        fallback={<div className='bg-brand-action py-8'>Loading...</div>}
      >
        <Products hScreen />
      </Suspense>
    </main>
  )
}
