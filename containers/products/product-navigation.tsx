import { motion } from 'framer-motion'
import type { Product } from '@/types/products'

interface ProductNavigationProps {
  products: Product[]
  current: number
  onPrev: () => void
  onNext: () => void
  onSelect: (idx: number) => void
}

export const ProductNavigation = ({
  products,
  current,
  onPrev,
  onNext,
  onSelect,
}: ProductNavigationProps) => {
  return (
    <div className='flex items-center justify-center gap-2 sm:gap-4 mt-3 sm:mt-6'>
      <button
        onClick={onPrev}
        className='size-8 sm:size-10 rounded-full border border-zinc-500 flex items-center justify-center text-brand-primary hover:bg-brand-secondary/10 transition disabled:opacity-50 cursor-pointer'
        aria-label='Previous product'
      >
        &#8592;
      </button>

      <div className='flex gap-1 sm:gap-2'>
        {products.map((p, idx) => (
          <motion.button
            key={p.name}
            onClick={() => onSelect(idx)}
            className={`rounded-full border-2 cursor-pointer ${
              current === idx ? 'border-brand-secondary' : 'border-transparent'
            } bg-zinc-800`}
            whileTap={{ scale: 0.9 }}
            animate={{ scale: current === idx ? 1.1 : 1 }}
            transition={{ type: 'spring', stiffness: 300 }}
            aria-label={`Select ${p.name}`}
          >
            <img
              src={p.icon}
              alt={p.name}
              className='size-10 sm:size-12 md:size-14 object-cover rounded-full'
            />
          </motion.button>
        ))}
      </div>

      <button
        onClick={onNext}
        aria-label='Next product'
        className='size-8 sm:size-10 rounded-full border border-zinc-500 flex items-center justify-center text-brand-primary hover:bg-brand-secondary/10 transition disabled:opacity-50 cursor-pointer'
      >
        &#8594;
      </button>
    </div>
  )
}
