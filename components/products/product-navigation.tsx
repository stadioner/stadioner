import { motion } from 'framer-motion'
import Image from 'next/image'
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
  onSelect
}: ProductNavigationProps) => {
  return (
    <div className='mt-3 flex items-center justify-center gap-2 sm:mt-6 sm:gap-4'>
      <button
        onClick={onPrev}
        className='text-brand-primary hover:bg-brand-secondary/10 flex size-8 cursor-pointer items-center justify-center rounded-full border border-zinc-500 transition disabled:opacity-50 sm:size-10'
        aria-label='Previous product'
      >
        &#8592;
      </button>

      <div className='flex gap-1 sm:gap-2'>
        {products.map((p, idx) => (
          <motion.button
            key={p.name}
            onClick={() => onSelect(idx)}
            className={`cursor-pointer rounded-full border-2 ${
              current === idx ? 'border-brand-secondary' : 'border-transparent'
            } bg-zinc-800`}
            whileTap={{ scale: 0.9 }}
            animate={{ scale: current === idx ? 1.1 : 1 }}
            transition={{ type: 'spring', stiffness: 300 }}
            aria-label={`Select ${p.name}`}
          >
            <Image
              src={p.icon}
              alt={p.name}
              width={56}
              height={56}
              className='size-10 rounded-full object-cover sm:size-12 md:size-14'
            />
          </motion.button>
        ))}
      </div>

      <button
        onClick={onNext}
        aria-label='Next product'
        className='text-brand-primary hover:bg-brand-secondary/10 flex size-8 cursor-pointer items-center justify-center rounded-full border border-zinc-500 transition disabled:opacity-50 sm:size-10'
      >
        &#8594;
      </button>
    </div>
  )
}
