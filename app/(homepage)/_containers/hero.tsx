'use client'

import { Container } from '@/components/container'
import { useLanguage } from '@/store/use-language'

export const Hero = () => {
  const { language } = useLanguage()

  return (
    <section className='relative h-[70vh] sm:h-[86vh] w-full'>
      <img
        src='/hero/main.svg'
        alt='hero'
        className='absolute bottom-0 left-0 z-10 w-full scale-200 sm:scale-150 md:scale-100 object-bottom'
      />
      <div className='bg-brand-primary absolute left-0 bottom-0 w-full h-full'>
        <Container className='mt-32 md:mt-44 text-brand-action'>
          <h1 className='text-[23vw] md:text-[140px] font-bold uppercase'>
            Stadioner
          </h1>
          <h3 className='text-2xl md:text-4xl font-semibold -mt-6 md:-mt-10'>
            {language === 'cs' &&
              'Pivovar, kde ožívá šlechtický odkaz, řemeslo a chuť.'}
            {language === 'en' &&
              'A brewery where aristocratic heritage, craftsmanship, and taste come to life.'}
            {language === 'de' &&
              'Eine Brauerei, in der das Erbe der Adelsfamilie, das Handwerk und der Geschmack wieder zum Leben erweckt werden.'}
          </h3>
          <p className='text-lg md:text-2xl'>est. 1736</p>
        </Container>
      </div>
    </section>
  )
}
