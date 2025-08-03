import { Container } from '@/components/container'

export const Hero = () => {
  return (
    <section className='relative h-[86vh] w-full'>
      <img
        src='/hero/main.webp'
        alt='hero'
        className='absolute bottom-0 left-0 z-10 w-full'
      />
      <div className='bg-brand-primary absolute left-0 bottom-0 w-full h-full'>
        <Container className='mt-44 text-brand-action'>
          <h1 className='text-[140px] font-bold uppercase'>Stadioner</h1>
          <h3 className='text-4xl font-semibold -mt-10'>
            Pivovar, kde ožívá šlechtický odkaz, řemeslo a chuť.
          </h3>
          <p className='text-2xl'>est. 1736</p>
        </Container>
      </div>
    </section>
  )
}
