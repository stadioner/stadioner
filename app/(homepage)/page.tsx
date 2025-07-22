import { Hero } from './_containers/hero'
import { Products } from './_containers/products'
import { Timeline } from './_containers/timeline'
import { Places } from './_containers/places'

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Products />
      <Places />
      <Timeline />
    </main>
  )
}
