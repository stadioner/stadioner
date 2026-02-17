'use client'

import { Border } from '@/components/border'
import { Container } from '@/components/container'
import { MapLegend } from '@/components/map-legend'
import { useLanguage } from '@/store/use-language'
import dynamic from 'next/dynamic'
import { b2bContent, getB2BLanguage } from './content'

const Map = dynamic(
  () => import('@/components/map').then(mod => ({ default: mod.Map })),
  { ssr: false },
)

export const B2BCoverageMap = () => {
  const { language } = useLanguage()
  const copy = b2bContent[getB2BLanguage(language)]

  return (
    <section id='b2b-coverage' className='bg-brand-primary py-20 scroll-mt-16'>
      <Container>
        <div className='max-w-4xl'>
          <h2 className='text-brand-action text-3xl md:text-4xl lg:text-5xl font-bold'>
            {copy.coverage.title}
          </h2>
          <p className='mt-4 text-brand-action/90 text-lg'>
            {copy.coverage.description}
          </p>
        </div>

        <div className='relative mt-8'>
          <Border>
            <Map />
          </Border>
          <MapLegend />
        </div>
      </Container>
    </section>
  )
}
