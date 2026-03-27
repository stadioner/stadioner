'use client'

import { useLanguage } from '@/store/use-language'
import { ChevronDown, ChevronUp, ListTree } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
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

const legendToggleLabels = {
  cs: 'Legenda',
  en: 'Legend',
  de: 'Legende'
} as const

export const MapLegend = () => {
  const { language } = useLanguage()
  const activeLanguage =
    language === 'en' || language === 'de' ? language : 'cs'
  const [open, setOpen] = useState(false)
  const toggleLabel = legendToggleLabels[activeLanguage]

  return (
    <div className='absolute top-0 right-0 z-[1000]'>
      <Border backgroundLight>
        <div className='text-brand-action flex flex-col'>
          <button
            type='button'
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls='map-legend-items'
            id='map-legend-toggle'
            className='text-brand-action hover:bg-brand-action/5 focus-visible:ring-brand-action/40 flex w-full items-center gap-1.5 px-2 py-1.5 text-left text-xs font-medium tracking-tight transition-colors focus-visible:ring-2 focus-visible:outline-none'
          >
            <ListTree
              className='text-brand-action size-4 shrink-0'
              aria-hidden
            />
            <span className='min-w-0 flex-1'>{toggleLabel}</span>
            {open ?
              <ChevronUp
                className='text-brand-action size-4 shrink-0'
                aria-hidden
              />
            : <ChevronDown
                className='text-brand-action size-4 shrink-0'
                aria-hidden
              />
            }
          </button>
          {open ?
            <div
              id='map-legend-items'
              role='region'
              aria-labelledby='map-legend-toggle'
              className='border-brand-action/25 border-t px-2 pt-1 pb-1.5 text-xs'
            >
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
                      alt=''
                      width={28}
                      height={28}
                    />
                    <span>{label}</span>
                  </p>
                )
              })}
            </div>
          : null}
        </div>
      </Border>
    </div>
  )
}
