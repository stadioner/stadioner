'use client'

import { useLanguage } from '@/store/use-language'
import { Border } from './border'

export const MapLegend = () => {
  const { language } = useLanguage()

  return (
    <div className='absolute top-5 right-5 z-[1000]'>
      <Border backgroundLight>
        <div className=' px-2 py-1'>
          <p className='flex items-center'>
            <img src='/map/pivovar.svg' className='size-8' />
            {language === 'cs' && 'Pivovar Stadioner'}
            {language === 'en' && 'Stadioner Brewery'}
            {language === 'de' && 'Brauerei Stadioner'}
          </p>
          <p className='flex items-center'>
            <img src='/map/pivoteka.svg' className='size-8' />

            {language === 'cs' && 'Pivnice'}
            {language === 'en' && 'Beer bar'}
            {language === 'de' && 'Bierstube'}
          </p>
          <p className='flex items-center'>
            <img src='/map/restaurace.svg' className='size-8' />

            {language === 'cs' && 'Restaurace'}
            {language === 'en' && 'Restaurant'}
            {language === 'de' && 'Restaurant'}
          </p>
        </div>
      </Border>
    </div>
  )
}
