'use client'

import { Border } from '@/components/border'
import { Container } from '@/components/container'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/store/use-language'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { b2bContent, getB2BLanguage } from './content'

export const B2BHero = () => {
  const { language } = useLanguage()
  const copy = b2bContent[getB2BLanguage(language)]
  const bottles = [
    '/products/pivo/12/bottle.webp',
    '/products/pivo/15/bottle.webp',
    '/products/pivo/11/bottle.webp',
    '/products/limo/citron/bottle.webp',
  ]
  const [currentBottle, setCurrentBottle] = useState(0)

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCurrentBottle(prev => (prev + 1) % bottles.length)
    }, 3000)

    return () => {
      window.clearInterval(interval)
    }
  }, [bottles.length])

  return (
    <section className='bg-brand-primary pt-36 pb-20 md:pt-44 md:pb-24'>
      <Container>
        <div className='grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-stretch'>
          <Border background className='h-full'>
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className='h-full bg-brand-secondary p-6 md:p-9 lg:p-10'
            >
              <p className='text-sm uppercase tracking-[0.18em] text-brand-action/70 font-semibold'>
                {copy.hero.eyebrow}
              </p>
              <h1 className='mt-3 text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] text-brand-action'>
                {copy.hero.title}
              </h1>
              <p className='mt-5 text-lg md:text-xl text-brand-action/90 max-w-[60ch]'>
                {copy.hero.description}
              </p>

              <div className='mt-8 flex flex-wrap gap-3'>
                <Button asChild size='lg' variant='green'>
                  <a href='#b2b-contact'>{copy.hero.ctaPrimary}</a>
                </Button>
                <Button
                  asChild
                  variant='outline'
                  size='lg'
                  className='bg-transparent border-brand-action text-brand-action hover:bg-brand-action hover:text-brand-primary'
                >
                  <a href='#b2b-coverage'>{copy.hero.ctaSecondary}</a>
                </Button>
              </div>
            </motion.div>
          </Border>

          <Border backgroundLight className='h-full'>
            <motion.div
              initial={{ opacity: 0, x: 22 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.08 }}
              className='relative h-full overflow-hidden bg-brand-primary p-6 md:p-8'
            >
              <div className='absolute -right-12 -bottom-10 size-48 rounded-full bg-brand-secondary/50' />
              <div className='absolute -left-10 -top-14 size-36 rounded-full bg-brand-secondary/45' />

              <blockquote className='relative z-10 text-lg md:text-xl lg:text-2xl leading-tight text-brand-action font-semibold'>
                &ldquo;{copy.hero.philosophy}&rdquo;
              </blockquote>

              <AnimatePresence mode='wait'>
                <motion.img
                  key={bottles[currentBottle]}
                  src={bottles[currentBottle]}
                  alt='Stadioner bottle'
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.98 }}
                  transition={{ duration: 0.45 }}
                  className='relative z-20 mt-8 ml-auto max-h-[220px] md:max-h-[260px] drop-shadow-2xl'
                />
              </AnimatePresence>
            </motion.div>
          </Border>
        </div>
      </Container>
    </section>
  )
}
