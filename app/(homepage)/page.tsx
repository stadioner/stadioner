import { Hero } from './_containers/hero'
import { Products } from './_containers/products'
import { Timeline } from './_containers/timeline'
import { Places } from './_containers/places'
import { Intro } from './_containers/intro'

export default function HomePage() {
  return (
    <main>
      <Intro />

      <Hero />
      <Products />
      <Places />
      <Timeline />
    </main>
  )
}
