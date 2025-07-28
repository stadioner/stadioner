import { Container } from '@/components/container'

export const About = () => {
  return (
    <main className='bg-brand-secondary pt-12 pb-20'>
      <Container>
        <div className='flex justify-between'>
          <div>
            <p className='text-lg'>od roku 1736</p>
            <h3 className='text-6xl font-bold text-brand-action'>
              Pivovar, kde ožívá <br /> šlechtický odkaz, <br /> řemeslo a chuť.
            </h3>
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
    </main>
  )
}
