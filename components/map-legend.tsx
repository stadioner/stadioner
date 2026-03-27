'use client'

import { useLanguage } from '@/store/use-language'
import Image from 'next/image'
import { Border } from './border'

const legendItems = [
  {
    src: '/map/pivovar.svg',
    labels: {
      cs: 'Pivovar STADIONER',
      en: 'STADIONER Brewery',
      de: 'Brauerei STADIONER'
    }
  },
  {
    src: '/map/hospoda.svg',
    labels: {
      cs: 'Hospoda',
      en: 'Pub',
      de: 'Kneipe'
    }
  },
  {
    src: '/map/pivoteka.svg',
    labels: {
      cs: 'Pivnice',
      en: 'Beer bar',
      de: 'Bierstube'
    }
  },
  {
    src: '/map/limo.svg',
    labels: {
      cs: 'Obchod',
      en: 'Shop',
      de: 'Geschäft'
    }
  },
  {
    src: '/map/restaurace.svg',
    labels: {
      cs: 'Restaurace',
      en: 'Restaurant',
      de: 'Restaurant'
    }
  },
  {
    src: '/map/penzion.svg',
    labels: {
      cs: 'Penzion',
      en: 'Pension',
      de: 'Pension'
    }
  }
] as const

export const MapLegend = () => {
  const { language } = useLanguage()
  const activeLanguage =
    language === 'en' || language === 'de' ? language : 'cs'

  return (
    <div className='absolute top-0 right-0 z-[1000]'>
      <Border backgroundLight>
        <div className='px-2 py-1 text-xs'>
          {legendItems.map((item) => {
            const label = item.labels[activeLanguage]

            return (
              <p
                key={item.src}
                className='flex items-center'
              >
                <Image
                  src={item.src}
                  className='size-7'
                  alt={label}
                  width={28}
                  height={28}
                />
                {label}
              </p>
            )
          })}
        </div>
      </Border>
    </div>
  )
}
