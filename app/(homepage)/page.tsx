import { Suspense } from 'react'
import { Hero } from './_containers/hero'
import { Places } from './_containers/places'
import { Intro } from './_containers/intro'
import { About } from './_containers/about'
import { Products } from '@/containers/products'

export default function HomePage() {
  return (
    <main>
      <Intro />

      <Hero />
      <About />
      <Suspense
        fallback={<div className='bg-brand-action py-8'>Loading...</div>}
      >
        <Products rippedPaper />
      </Suspense>
      <Places />
    </main>
  )
}
