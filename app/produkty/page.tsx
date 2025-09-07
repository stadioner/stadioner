import { Products } from '@/containers/products'
import { Suspense } from 'react'

export default function ProduktyPage() {
  return (
    <main className='bg-brand-action pt-24 md:pt-32 pb-16'>
      <Suspense
        fallback={<div className='bg-brand-action py-8'>Loading...</div>}
      >
        <Products hScreen />
      </Suspense>
    </main>
  )
}
