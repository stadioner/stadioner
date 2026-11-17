'use client'

import { Border } from '@/components/border'
import { Container } from '@/components/container'
import { useLanguage } from '@/store/use-language'
import { getTakeoverLanguage, takeoverContent } from './content'

export const TakeoverOverview = () => {
  const { language } = useLanguage()
  const copy = takeoverContent[getTakeoverLanguage(language)]

  return (
    <section
      id='takeover-overview'
      className='bg-brand-secondary py-16 md:py-20'
    >
      <Container>
        <div className='max-w-2xl'>
          <h2 className='text-brand-action text-3xl font-bold md:text-4xl lg:text-5xl'>
            {copy.overview.title}
          </h2>
          <p className='text-brand-action/90 mt-3 text-lg md:text-xl'>
            {copy.overview.lead}
          </p>
        </div>

        <ol className='border-brand-action/30 mt-12 grid grid-cols-1 gap-8 border-y py-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6'>
          {copy.overview.highlights.map((item, index) => (
            <li
              key={item.id}
              className='flex flex-col gap-3'
            >
              <span className='text-brand-action/35 text-5xl font-bold tracking-tight md:text-6xl'>
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className='text-brand-action max-w-[11ch] text-2xl leading-tight font-bold md:text-3xl'>
                {item.title}
              </h3>
            </li>
          ))}
        </ol>

        <div className='mt-16'>
          <h3 className='text-brand-action text-2xl font-bold md:text-3xl'>
            {copy.overview.deliverTitle}
          </h3>

          <Border
            background
            className='mt-6'
          >
            <ul className='bg-brand-action grid gap-x-10 gap-y-4 p-6 sm:grid-cols-2 md:p-8'>
              {copy.overview.deliverItems.map((item) => (
                <li
                  key={item}
                  className='text-brand-primary flex items-baseline gap-3 text-base md:text-lg'
                >
                  <span
                    className='bg-brand-primary mt-2 size-1.5 shrink-0'
                    aria-hidden
                  />
                  {item}
                </li>
              ))}
            </ul>
          </Border>
        </div>
      </Container>
    </section>
  )
}
