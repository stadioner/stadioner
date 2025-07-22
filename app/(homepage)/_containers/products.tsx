import { Container } from '@/components/container'

export const Products = () => {
  return (
    <section className='bg-brand-secondary pb-20'>
      <Container>
        <h3 className='text-4xl font-caladea mb-2 text-brand-action'>
          Vybrané Produkty
        </h3>

        <div className='grid grid-cols-3 gap-6'>
          <div className='border-6 border-brand-action p-1'>
            <div className='border-2 border-brand-action'>
              <img src='/products/citron.webp' alt='Limonáda citron' />
            </div>
          </div>
          <div className='border-6 border-brand-action p-1'>
            <div className='border-2 border-brand-action'>
              <img src='/products/cola.webp' alt='Limonáda cola mix' />
            </div>
          </div>
          <div className='border-6 border-brand-action p-1'>
            <div className='border-2 border-brand-action'>
              <img src='/products/voda.webp' alt='Pramenitá voda' />
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
