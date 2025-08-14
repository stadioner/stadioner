'use client'

import { Border } from '@/components/border'
import { Container } from '@/components/container'
import { buttonVariants } from '@/components/ui/button'
import { useLanguage } from '@/store/use-language'
import Link from 'next/link'

const timelineData = [
  {
    year: '1736',
    title: 'Založení pivovaru',
    description: 'Rod Stadionů zakládá pivovar v Koutě na Šumavě',
    position: 'left',
  },
  {
    year: '1823',
    title: 'Rozšíření výroby',
    description: 'Pivovar se rozšiřuje a modernizuje',
    position: 'right',
  },
  {
    year: '1898',
    title: 'Průmyslová revoluce',
    description: 'Zavedení moderních technologií výroby',
    position: 'left',
  },
  {
    year: '1921',
    title: 'První republika',
    description: 'Pivovar prosperuje v novém Československu',
    position: 'right',
  },
  {
    year: '1944',
    title: 'Těžké časy',
    description: 'Pivovar přežívá válečné období',
    position: 'left',
  },
]

export const About = () => {
  const { language } = useLanguage()

  return (
    <section className='bg-brand-secondary pb-24'>
      <Container className='flex flex-col lg:flex-row gap-10'>
        <div className='flex-1'>
          <h2 className='text-3xl sm:text-5xl font-bold text-brand-action'>
            {language === 'cs' && 'Historie sahající až do roku 1736'}
            {language === 'en' && 'History dating back to 1736'}
            {language === 'de' && 'Geschichte bis ins Jahr 1736'}
          </h2>
          <p className='max-w-[80ch] mt-4'>
            {language === 'cs' &&
              'V Koutě na Šumavě ožívá pivovar s hlubokými kořeny. Založil ho rod Stadionů, po kterém nese i jméno. Navazujeme na jejich odkaz: ctíme tradici, ale přinášíme novou energii a směr.'}
            {language === 'en' &&
              'In Kout na Šumavě, a brewery with deep roots is coming back to life. It was founded by the Stadion family, after whom it is named. We are continuing their legacy: we honor tradition, but we bring new energy and direction.'}
            {language === 'de' &&
              'In Kout na Šumavě erwacht eine Brauerei mit tiefen Wurzeln zu neuem Leben. Sie wurde von der Familie Stadion gegründet, nach der sie auch benannt ist. Wir knüpfen an ihr Vermächtnis an: Wir ehren die Tradition, bringen aber neue Energie und eine neue Ausrichtung mit.'}
          </p>
          <div className='w-min hidden lg:block mt-10'>
            <Border>
              <Link
                href='/historie'
                className={buttonVariants({
                  variant: 'ghost',
                  size: 'lg',
                  className:
                    'hover:bg-transparent text-brand-action text-lg font-semibold',
                })}
              >
                {language === 'cs' && 'Projít si celou historii'}
                {language === 'en' && 'Go through the entire history'}
                {language === 'de' && 'Die gesamte Geschichte durchgehen'}
              </Link>
            </Border>
          </div>
        </div>

        <div className='flex flex-col lg:flex-row items-center gap-6 lg:gap-10 md:mr-20 xl:mr-40'>
          <div className='h-[250px] w-[50px]'>
            {/* Timeline line */}
            <div className='relative flex flex-col h-full'>
              <div className='absolute left-1/2 top-0 bottom-0 w-0.5 bg-brand-action transform -translate-x-1/2' />

              {timelineData.map(item => (
                <div
                  key={item.year}
                  className='relative flex-1 flex items-center'
                >
                  {/* Timeline dot */}
                  <div className='absolute left-1/2 w-3 h-3 bg-brand-action rounded-full transform -translate-x-1/2 z-10' />

                  {/* Connecting lines */}
                  <div className='absolute left-1/2 top-1/2 w-0.5 h-0.5 bg-brand-action transform -translate-x-1/2 -translate-y-1/2'>
                    {/* Left line */}
                    <div
                      className={`absolute top-1/2 -translate-y-1/2 w-6 h-0.5 bg-brand-action ${
                        item.position === 'left' ? 'right-full' : 'opacity-0'
                      }`}
                    />
                    {/* Right line */}
                    <div
                      className={`absolute top-1/2 -translate-y-1/2 w-6 h-0.5 bg-brand-action ${
                        item.position === 'right' ? 'left-full' : 'opacity-0'
                      }`}
                    />
                  </div>

                  {/* Content */}
                  <div
                    className={`absolute top-1/2 -translate-y-1/2 w-min whitespace-nowrap ${
                      item.position === 'left'
                        ? 'right-full mr-4'
                        : 'left-full ml-4'
                    } w-32`}
                  >
                    <div className='text-sm text-brand-action'>
                      <b>{item.year}</b> - {item.title}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className='mt-6 lg:hidden text-center'>
          <Border>
            <Link
              href='/historie'
              className={buttonVariants({
                variant: 'ghost',
                size: 'lg',
                className:
                  'hover:bg-transparent text-brand-action text-lg font-semibold',
              })}
            >
              {language === 'cs' && 'Projít si celou historii'}
              {language === 'en' && 'Go through the entire history'}
              {language === 'de' && 'Die gesamte Geschichte durchgehen'}
            </Link>
          </Border>
        </div>
      </Container>
    </section>
  )
}
