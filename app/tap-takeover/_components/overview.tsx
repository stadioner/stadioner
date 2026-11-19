'use client'

import Image from 'next/image'
import { Border } from '@/components/border'
import { Container } from '@/components/container'
import { TAKEOVER_HIGHLIGHT_MEDIA } from '@/lib/takeover/highlights'
import { useLanguage } from '@/store/use-language'
import { getTakeoverLanguage, takeoverContent } from './content'

export const TakeoverOverview = () => {
  const { language } = useLanguage()
  const copy = takeoverContent[getTakeoverLanguage(language)]

  return (
    <section
      id='takeover-overview'
      className='bg-brand-secondary py-20'
    >
      <Container>
        <div className='max-w-3xl'>
          <h2 className='text-brand-action text-3xl font-bold md:text-4xl lg:text-5xl'>
            {copy.overview.title}
          </h2>
          <p className='text-brand-action/90 mt-4 text-lg'>
            {copy.overview.lead}
          </p>
        </div>

        <div className='mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
          {copy.overview.highlights.map((item) => {
            const media = TAKEOVER_HIGHLIGHT_MEDIA[item.id]

            return (
              <Border key={item.id}>
                <article className='group relative h-[280px] overflow-hidden md:h-[320px]'>
                  {media ?
                    <Image
                      src={media.coverImage}
                      alt={item.title}
                      fill
                      sizes='(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw'
                      className='absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-105'
                    />
                  : <div className='bg-brand-action absolute inset-0' />}
                  <div className='bg-brand-action/45 absolute inset-0' />
                  <div className='from-brand-action/90 via-brand-action/40 to-brand-action/15 absolute inset-0 bg-gradient-to-t' />

                  <div className='relative z-10 flex h-full flex-col justify-end p-5 md:p-6'>
                    <h3 className='text-brand-primary text-2xl font-bold'>
                      {item.title}
                    </h3>
                    <p className='text-brand-primary/90 mt-2 text-sm leading-relaxed'>
                      {item.description}
                    </p>
                  </div>
                </article>
              </Border>
            )
          })}
        </div>

        <div className='mt-16 grid grid-cols-1 items-start gap-7 xl:grid-cols-2'>
          <div className='max-w-xl'>
            <h3 className='text-brand-action text-3xl font-bold md:text-4xl'>
              {copy.overview.deliverTitle}
            </h3>
            <p className='text-brand-action/90 mt-3 text-lg'>
              {copy.overview.deliverLead}
            </p>
          </div>

          <Border background>
            <ul className='bg-brand-action grid gap-4 p-6 sm:grid-cols-2 md:gap-5 md:p-8'>
              {copy.overview.deliverItems.map((item) => (
                <li
                  key={item}
                  className='text-brand-primary flex items-start gap-3 text-base leading-snug md:text-lg'
                >
                  <span
                    className='bg-brand-primary mt-2 size-2 shrink-0'
                    aria-hidden
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Border>
        </div>
      </Container>
    </section>
  )
}
