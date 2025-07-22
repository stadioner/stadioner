import { Container } from '@/components/container'

export const Hero = () => {
  return (
    <section className='bg-brand-primary'>
      <Container className='pt-72 pb-32'>
        <h1 className='text-brand-secondary text-5xl text-center font-caladea'>
          Místo, kde ožívá šlechtický odkaz, řemeslo a chuť.
        </h1>
        <p className='text-right pr-5 text-xl'>Od roku 1736</p>
      </Container>
      <img src='/hero/1.webp' alt='hero' />
    </section>
  )
}
