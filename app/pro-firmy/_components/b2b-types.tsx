'use client'

import { Border } from '@/components/border'
import { Container } from '@/components/container'
import { useLanguage } from '@/store/use-language'
import { b2bContent, getB2BLanguage } from './content'

export const B2BTypes = () => {
  const { language } = useLanguage()
  const copy = b2bContent[getB2BLanguage(language)]

  return (
    <section className='bg-brand-secondary py-20'>
      <Container>
        <div className='max-w-3xl'>
          <h2 className='text-brand-action text-3xl md:text-4xl lg:text-5xl font-bold'>
            {copy.types.title}
          </h2>
          <p className='mt-4 text-brand-action/90 text-lg'>
            {copy.types.description}
          </p>
        </div>

        <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
          {copy.types.cards.map(card => (
            <Border key={card.id}>
              <article className='group relative h-[320px] md:h-[360px] overflow-hidden'>
                <img
                  src='/b2b/restaruace.webp'
                  alt={card.title}
                  className='absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-105'
                />
                <div className='absolute inset-0 bg-brand-action/45' />
                <div className='absolute inset-0 bg-gradient-to-t from-brand-action/90 via-brand-action/40 to-brand-action/15' />

                <img
                  src={card.icon}
                  alt={card.title}
                  className='absolute right-2 top-2 z-20 size-11 rounded-full bg-brand-primary p-1 border border-brand-action/40'
                />

                <div className='relative z-10 h-full p-5 md:p-6 flex flex-col justify-end'>
                  <div className='max-w-[34ch]'>
                    <h3 className='text-2xl font-bold text-brand-primary'>
                      {card.title}
                    </h3>
                    <p className='mt-2 text-brand-primary/90 text-sm leading-relaxed'>
                      {card.description}
                    </p>
                  </div>
                </div>
              </article>
            </Border>
          ))}
        </div>
      </Container>
    </section>
  )
}
