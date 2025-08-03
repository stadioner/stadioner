import { Products } from '@/containers/products'

export default function ProduktyPage() {
  return (
    <main className='bg-brand-action pt-44 pb-32'>
      <div className='grid place-content-center'>
        <Products hScreen />
      </div>
    </main>
  )
}
