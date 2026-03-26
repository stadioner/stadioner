'use client'

import { useLanguage } from '@/store/use-language'
import Image from 'next/image'
import { Border } from './border'

export const MapLegend = () => {
  const { language } = useLanguage()

  return (
    <div className='absolute top-0 right-0 z-[1000]'>
      <Border backgroundLight>
        <div className='px-2 py-1 text-xs'>
          <p className='flex items-center'>
            <Image
              src='/map/pivovar.svg'
              className='size-7'
              alt=''
              width={28}
              height={28}
            />
            {language === 'cs' && 'Pivovar STADIONER'}
            {language === 'en' && 'STADIONER Brewery'}
            {language === 'de' && 'Brauerei STADIONER'}
          </p>
          <p className='flex items-center'>
            <Image
              src='/map/hospoda.svg'
              className='size-7'
              alt=''
              width={28}
              height={28}
            />

            {language === 'cs' && 'Hospoda'}
            {language === 'en' && 'Pub'}
            {language === 'de' && 'Kneipe'}
          </p>
          <p className='flex items-center'>
            <Image
              src='/map/pivoteka.svg'
              className='size-7'
              alt=''
              width={28}
              height={28}
            />

            {language === 'cs' && 'Pivnice'}
            {language === 'en' && 'Beer bar'}
            {language === 'de' && 'Bierstube'}
          </p>
          <p className='flex items-center'>
            <Image
              src='/map/restaurace.svg'
              className='size-7'
              alt=''
              width={28}
              height={28}
            />

            {language === 'cs' && 'Restaurace'}
            {language === 'en' && 'Restaurant'}
            {language === 'de' && 'Restaurant'}
          </p>
          <p className='flex items-center'>
            <Image
              src='/map/penzion.svg'
              className='size-7'
              alt=''
              width={28}
              height={28}
            />

            {language === 'cs' && 'Penzion'}
            {language === 'en' && 'Pension'}
            {language === 'de' && 'Pension'}
          </p>
        </div>
      </Border>
    </div>
  )
}
