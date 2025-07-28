import { Hero } from './_containers/hero'
import { Products } from './_containers/products'
import { Places } from './_containers/places'
import { Intro } from './_containers/intro'
import { About } from './_containers/about'

export default function HomePage() {
  return (
    <main>
      <Intro />

      <Hero />
      <About />
      <Products />
      <Places />
    </main>
  )
}
