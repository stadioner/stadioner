import { Hero } from './_containers/hero'
import { Map } from './_containers/map'
import { Products } from './_containers/products'
import { Timeline } from './_containers/timeline'

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Products />
      <Map />
      <Timeline />
    </main>
  )
}
