import { Container } from '@/components/container'

export const Hero = () => {
  return (
    <section className='bg-brand-primary'>
      <Container className='pt-[400px] pb-10 text-brand-action flex justify-center'>
        <div className='inline-flex flex-col items-center w-max'>
          <h1 className='text-5xl text-center font-bold uppercase w-max'>
            Místo, kde ožívá šlechtický odkaz, řemeslo a chuť.
          </h1>
          <p className='text-xl self-end w-max'>Od roku 1736</p>
        </div>
      </Container>
      <img src='/hero/1.webp' alt='hero' />
    </section>
  )
}
