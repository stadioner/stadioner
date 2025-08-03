import { Border } from '@/components/border'
import { Container } from '@/components/container'
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
  return (
    <section className='bg-brand-secondary pb-24'>
      <Container className='flex justify-between gap-10'>
        <div>
          <h2 className='text-[44px] font-bold text-brand-action text-nowrap'>
            Historie sahající až do roku 1736
          </h2>
          <p className='max-w-[80ch]'>
            V Koutě na Šumavě ožívá pivovar s hlubokými kořeny. Založil ho rod
            Stadionů, po kterém nese i jméno. Navazujeme na jejich odkaz: ctíme
            tradici, ale přinášíme novou energii a směr.
          </p>
          <div className='w-min whitespace-nowrap mt-6'>
            <Border>
              <button className='p-2'>Projít si celou historii</button>
            </Border>
          </div>
        </div>

        {/* Timeline */}
        <div className='relative mr-32 xl:mr-44'>
          {/* Timeline line */}
          <div className='relative flex flex-col h-full'>
            <div className='absolute left-1/2 top-0 bottom-0 w-0.5 bg-brand-action transform -translate-x-1/2' />

            {/* Timeline items */}
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
                      ? 'right-full mr-8'
                      : 'left-full ml-8'
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
      </Container>
    </section>
  )
}
