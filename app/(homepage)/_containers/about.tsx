import { Border } from '@/components/border'
import { Container } from '@/components/container'
import Link from 'next/link'

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
        <div>timeline</div>
      </Container>
    </section>
  )
}
