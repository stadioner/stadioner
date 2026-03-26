'use client'

import { Border } from '@/components/border'
import { Container } from '@/components/container'
import { useLanguage } from '@/store/use-language'
import Image from 'next/image'
import { b2bContent, getB2BLanguage } from './content'

export const B2BTypes = () => {
  const { language } = useLanguage()
  const copy = b2bContent[getB2BLanguage(language)]

  return (
    <section className='bg-brand-secondary py-20'>
      <Container>
        <div className='max-w-3xl'>
          <h2 className='text-brand-action text-3xl font-bold md:text-4xl lg:text-5xl'>
            {copy.types.title}
          </h2>
          <p className='text-brand-action/90 mt-4 text-lg'>
            {copy.types.description}
          </p>
        </div>

        <div className='mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
          {copy.types.cards.map((card) => (
            <Border key={card.id}>
              <article className='group relative h-[320px] overflow-hidden md:h-[360px]'>
                <Image
                  src='/b2b/restaruace.webp'
                  alt={card.title}
                  fill
                  sizes='(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw'
                  className='absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-105'
                />
                <div className='bg-brand-action/45 absolute inset-0' />
                <div className='from-brand-action/90 via-brand-action/40 to-brand-action/15 absolute inset-0 bg-gradient-to-t' />

                <Image
                  src={card.icon}
                  alt={card.title}
                  width={44}
                  height={44}
                  className='bg-brand-primary border-brand-action/40 absolute top-2 right-2 z-20 size-11 rounded-full border p-1'
                />

                <div className='relative z-10 flex h-full flex-col justify-end p-5 md:p-6'>
                  <div className='max-w-[34ch]'>
                    <h3 className='text-brand-primary text-2xl font-bold'>
                      {card.title}
                    </h3>
                    <p className='text-brand-primary/90 mt-2 text-sm leading-relaxed'>
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
