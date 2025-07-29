import { Container } from '@/components/container'
import Link from 'next/link'

export const About = () => {
  return (
    <section className='bg-brand-secondary pb-24'>
      <Container>
        <div className='flex gap-32'>
          <div>
            <p className='text-lg'>od roku 1736</p>
            <h2 className='text-6xl font-bold text-brand-action text-nowrap'>
              Pivovar, kde ožívá <br /> šlechtický odkaz, <br /> řemeslo a chuť.
            </h2>
          </div>
          <div className='flex flex-col justify-between gap-4'>
            <p className='pt-6'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Aspernatur nihil totam repellat, repudiandae provident obcaecati
              ipsam minima aliquam reprehenderit, esse eos corporis accusantium
              sint saepe odio assumenda praesentium nostrum molestiae facere
              porro odit et. Lorem ipsum dolor sit amet consectetur adipisicing
              elit.
            </p>
            <Link
              href='/o-nas'
              className='bg-brand-action rounded-md p-4 text-brand-primary text-2xl w-full font-semibold text-center'
            >
              Kompletní historie
            </Link>
          </div>
        </div>
      </Container>
    </section>
  )
}
