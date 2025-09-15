'use client'

import { Container } from '@/components/container'

export const BlogLoadingSpinner = () => {
  return (
    <main className='bg-brand-primary pt-32 md:pt-40 pb-28'>
      <Container>
        <div className='flex flex-col items-center justify-center py-20'>
          <div className='w-12 h-12 border-4 border-brand-action border-t-transparent rounded-full animate-spin mb-4'></div>
          <p className='text-brand-action text-lg'>Loading content...</p>
        </div>
      </Container>
    </main>
  )
}
