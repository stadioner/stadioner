'use client'

import { Border } from '@/components/border'
import { Container } from '@/components/container'
import { useLanguage } from '@/store/use-language'

export default function KontaktPage() {
  const { language } = useLanguage()

  return (
    <main className='bg-brand-primary pt-32 pb-20'>
      <Container className='grid grid-cols-2 gap-10'>
        <div>
          <div>
            <p className='font-bold text-xl'>Pivovar Stadioner</p>
            <p>Kout na Šumavě 2</p>
            <p>34502 Kout na Šumavě</p>
            <p>IČO: 22478566</p>
          </div>
          <div className='mt-14'>
            <p className=''>Jednatel</p>
            <p className='font-bold'>Aleš Pech</p>
            <p>
              <a href='tel:'>+420 111 222 333</a>
            </p>
            <p>
              <a href='mailto:'>info@stadioner.cz</a>
            </p>
          </div>
        </div>
        <Border>
          <iframe
            src='https://www.google.com/maps/embed/v1/place?q=pivovar+kout+na+sumave&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8'
            className='w-full h-[500px]'
          />
        </Border>
      </Container>
    </main>
  )
}
