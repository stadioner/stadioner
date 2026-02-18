'use client'

import { useLanguage } from '@/store/use-language'
import { Border } from './border'

export const MapLegend = () => {
  const { language } = useLanguage()

  return (
    <div className='absolute top-0 right-0 z-[1000]'>
      <Border backgroundLight>
        <div className='px-2 py-1 text-xs'>
          <p className='flex items-center'>
            <img src='/map/pivovar.svg' className='size-7' alt='' />
            {language === 'cs' && 'Pivovar Stadioner'}
            {language === 'en' && 'Stadioner Brewery'}
            {language === 'de' && 'Brauerei Stadioner'}
          </p>
          <p className='flex items-center'>
            <img src='/map/hospoda.svg' className='size-7' alt='' />

            {language === 'cs' && 'Hospoda'}
            {language === 'en' && 'Pub'}
            {language === 'de' && 'Kneipe'}
          </p>
          <p className='flex items-center'>
            <img src='/map/pivoteka.svg' className='size-7' alt='' />

            {language === 'cs' && 'Pivnice'}
            {language === 'en' && 'Beer bar'}
            {language === 'de' && 'Bierstube'}
          </p>
          <p className='flex items-center'>
            <img src='/map/restaurace.svg' className='size-7' alt='' />

            {language === 'cs' && 'Restaurace'}
            {language === 'en' && 'Restaurant'}
            {language === 'de' && 'Restaurant'}
          </p>
          <p className='flex items-center'>
            <img src='/map/penzion.svg' className='size-7' alt='' />

            {language === 'cs' && 'Penzion'}
            {language === 'en' && 'Pension'}
            {language === 'de' && 'Pension'}
          </p>
        </div>
      </Border>
    </div>
  )
}
