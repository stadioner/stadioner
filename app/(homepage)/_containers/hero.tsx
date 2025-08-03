import { Container } from '@/components/container'

export const Hero = () => {
  return (
    <section className='relative h-[88vh] w-full'>
      <img
        src='/hero/main.webp'
        alt='hero'
        className='absolute bottom-0 left-0 z-10 w-full'
      />
      <div className='bg-brand-primary absolute left-0 bottom-0 w-full h-full'>
        <Container className='mt-56 text-brand-action'>
          <h1 className='text-8xl font-bold uppercase'>Stadioner</h1>
          <h3 className='text-3xl font-semibold'>
            Pivovar, kde ožívá šlechtický odkaz, řemeslo a chut'.
          </h3>
          <p className='text-xl'>est. 1736</p>
        </Container>
      </div>
    </section>
  )
}
