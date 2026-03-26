'use client'

import { Border } from '@/components/border'
import { Container } from '@/components/container'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/store/use-language'
import { motion } from 'framer-motion'
import { B2BLanguage, b2bContent, getB2BLanguage } from './content'

export const B2BHero = () => {
  const { language } = useLanguage()
  const currentLanguage = getB2BLanguage(language)
  const copy = b2bContent[currentLanguage]

  const cooperationModelCopy: Record<
    B2BLanguage,
    { badge: string; title: string }
  > = {
    cs: {
      badge: 'Model spolupráce',
      title: 'Jednoduše: my dodáme, vy prodáváte, oba rosteme'
    },
    en: {
      badge: 'Cooperation model',
      title: 'Simple setup: we supply, you sell, both sides grow'
    },
    de: {
      badge: 'Kooperationsmodell',
      title: 'Einfach: wir liefern, Sie verkaufen, beide wachsen'
    }
  }

  const heroPanel = cooperationModelCopy[currentLanguage]

  return (
    <section className='bg-brand-primary pt-36 pb-20 md:pt-44 md:pb-24'>
      <Container>
        <Border background>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className='bg-brand-secondary relative overflow-hidden p-6 md:p-9 lg:p-10'
          >
            <div className='relative z-10 grid gap-7 lg:grid-cols-[1.2fr_0.8fr] lg:gap-8'>
              <div>
                <p className='border-brand-action/35 bg-brand-primary/65 text-brand-action/80 inline-flex border px-3 py-1 text-sm font-semibold tracking-[0.18em] uppercase'>
                  {copy.hero.eyebrow}
                </p>
                <h1 className='text-brand-action mt-4 text-4xl leading-[1.05] font-bold md:text-5xl lg:text-6xl'>
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
                    <a href='#b2b-contact'>{copy.hero.ctaPrimary}</a>
                  </Button>
                  <Button
                    asChild
                    variant='outline'
                    size='lg'
                    className='border-brand-action text-brand-action hover:bg-brand-action bg-transparent'
                  >
                    <a href='#b2b-coverage'>{copy.hero.ctaSecondary}</a>
                  </Button>
                </div>
              </div>

              <div>
                <Border
                  backgroundLight
                  className='h-full'
                >
                  <div className='bg-brand-primary h-full p-5 md:p-6 lg:p-7'>
                    <p className='text-brand-action/70 text-sm font-semibold tracking-[0.16em] uppercase'>
                      {heroPanel.badge}
                    </p>
                    <h2 className='text-brand-action mt-3 text-2xl leading-tight font-bold md:text-3xl'>
                      {heroPanel.title}
                    </h2>
                    <p className='text-brand-action/85 mt-5 text-base leading-relaxed md:text-lg'>
                      {copy.hero.philosophy}
                    </p>
                  </div>
                </Border>
              </div>
            </div>
          </motion.div>
        </Border>
      </Container>
    </section>
  )
}
