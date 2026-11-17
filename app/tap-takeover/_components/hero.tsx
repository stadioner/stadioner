'use client'

import { Border } from '@/components/border'
import { Container } from '@/components/container'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/store/use-language'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { getTakeoverLanguage, takeoverContent } from './content'

export const TakeoverHero = () => {
  const { language } = useLanguage()
  const copy = takeoverContent[getTakeoverLanguage(language)]

  return (
    <section
      id='takeover-hero'
      className='bg-brand-primary scroll-mt-16 pt-36 pb-20 md:pt-44 md:pb-28 lg:pb-24'
    >
      <Container>
        <Border background>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className='bg-brand-secondary relative overflow-hidden p-6 md:p-9 lg:p-10'
          >
            <div className='relative z-10 grid items-start gap-7 lg:grid-cols-2 lg:items-stretch lg:gap-10'>
              <div>
                <p className='border-brand-action/35 bg-brand-primary/65 text-brand-action/80 inline-flex border px-3 py-1 text-sm font-semibold tracking-[0.18em] uppercase'>
                  {copy.hero.eyebrow}
                </p>
                <h1 className='text-brand-action mt-4 text-4xl leading-[1.05] font-bold md:text-4xl lg:text-5xl xl:text-6xl'>
                  {copy.hero.title}
                </h1>
                <p className='text-brand-action/90 mt-5 max-w-[60ch] text-lg leading-relaxed md:text-xl'>
                  {copy.hero.description}
                </p>

                <div className='mt-8 flex flex-wrap gap-3'>
                  <Button
                    asChild
                    size='lg'
                    variant='green'
                  >
                    <a href='#takeover-contact'>{copy.hero.ctaPrimary}</a>
                  </Button>
                  <Button
                    asChild
                    variant='outline'
                    size='lg'
                    className='border-brand-action text-brand-action hover:bg-brand-action hover:text-brand-primary bg-transparent'
                  >
                    <a href='#takeover-calculator'>{copy.hero.ctaSecondary}</a>
                  </Button>
                </div>
              </div>

              <motion.div className='h-full w-full lg:flex lg:min-h-full lg:flex-col'>
                <Border
                  backgroundLight
                  className='h-full lg:flex lg:flex-1 lg:flex-col'
                >
                  <motion.div className='relative aspect-[16/10] h-full w-full overflow-hidden sm:aspect-[5/3] lg:aspect-auto lg:min-h-[28rem] lg:flex-1 xl:min-h-[32rem]'>
                    <Image
                      src='/b2b/type-hospoda.png'
                      alt={copy.hero.imageAlt}
                      fill
                      priority
                      sizes='(min-width: 1024px) 50vw, 100vw'
                      className='object-cover'
                    />
                  </motion.div>
                </Border>
              </motion.div>
            </div>
          </motion.div>
        </Border>
      </Container>
    </section>
  )
}
