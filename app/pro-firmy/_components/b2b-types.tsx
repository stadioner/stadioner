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
              <article className='relative h-[320px] md:h-[360px] overflow-hidden'>
                <img
                  src='/b2b/restaruace.webp'
                  alt={card.title}
                  className='absolute inset-0 size-full object-cover'
                />
                <div className='absolute inset-0 bg-brand-action/74' />

                <div className='relative z-10 h-full p-5 md:p-6 flex flex-col justify-between'>
                  <div className='flex items-start justify-between gap-3'>
                    <div>
                      <h3 className='text-2xl font-bold text-brand-primary'>
                        {card.title}
                      </h3>
                      <p className='mt-2 text-brand-primary/90 text-sm'>
                        {card.description}
                      </p>
                    </div>
                    <img
                      src={card.icon}
                      alt={card.title}
                      className='size-11 rounded-full bg-brand-primary p-1 border border-brand-action/40'
                    />
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
