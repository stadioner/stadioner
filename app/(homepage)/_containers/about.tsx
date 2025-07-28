import { Container } from '@/components/container'

export const About = () => {
  return (
    <section className='bg-brand-secondary pt-12 pb-32'>
      <Container>
        <div className='flex gap-32'>
          <div>
            <p className='text-lg'>od roku 1736</p>
            <h2 className='text-6xl font-bold text-brand-action text-nowrap'>
              Pivovar, kde ožívá <br /> šlechtický odkaz, <br /> řemeslo a chuť.
            </h2>
          </div>
          <div>
            <p className='max-w-[60ch] pt-6'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Aspernatur nihil totam repellat, repudiandae provident obcaecati
              ipsam minima aliquam reprehenderit, esse eos corporis accusantium
              sint saepe odio assumenda praesentium nostrum molestiae facere
              porro odit et.
            </p>
            <button className='bg-brand-action rounded-md p-4 text-brand-primary text-2xl mt-4 w-full font-semibold'>
              Kompletní historie
            </button>
          </div>
        </div>
      </Container>
    </section>
  )
}
