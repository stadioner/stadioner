import { Container } from '@/components/container'

export const Hero = () => {
  return (
    <section className='bg-brand-primary'>
      <Container className='pt-96 pb-10 text-brand-action flex justify-center'>
        <div className='inline-flex flex-col items-center w-max'></div>
      </Container>
      <img src='/hero/main.webp' alt='hero' />
    </section>
  )
}
