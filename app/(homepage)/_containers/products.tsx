import { Border } from '@/components/border'
import { Container } from '@/components/container'

export const Products = () => {
  return (
    <section className='bg-brand-secondary pb-20'>
      <Container>
        <h3 className='text-4xl font-caladea mb-2 text-brand-action'>
          Vybrané Produkty
        </h3>

        <div className='grid grid-cols-3 gap-6'>
          <Border>
            <img src='/products/citron.webp' alt='Limonáda citron' />
          </Border>
          <Border>
            <img src='/products/cola.webp' alt='Limonáda cola mix' />
          </Border>
          <Border>
            <img src='/products/voda.webp' alt='Pramenitá voda' />
          </Border>
        </div>
      </Container>
    </section>
  )
}
