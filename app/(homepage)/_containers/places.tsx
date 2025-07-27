'use client'

import { Border } from '@/components/border'
import { Container } from '@/components/container'
import dynamic from 'next/dynamic'
const Map = dynamic(
  () => import('@/components/map').then(mod => ({ default: mod.Map })),
  { ssr: false }
)

export const Places = () => {
  return (
    <section className='bg-brand-secondary'>
      <Container>
        <Border>
          <Map />
        </Border>
      </Container>
    </section>
  )
}
