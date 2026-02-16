import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import type { Product } from '@/types/products'

interface ProductInfoProps {
  product: Product
  buyUrl: string
  labels: {
    composition: string
    compositionTitle: string
    depositNote: string
    buy: string
    preparing: string
  }
  isPreparing?: boolean
  hideBuyButton?: boolean
  noteText?: string
  cta?: {
    label: string
    href: string
    external?: boolean
  }
}

export const ProductInfo = ({
  product,
  buyUrl,
  labels,
  isPreparing = false,
  hideBuyButton = false,
  noteText,
  cta,
}: ProductInfoProps) => {
  // Use slug as key to only animate on product change, not packaging change
  const productKey = product.slug

  return (
    <div className='flex-1 flex flex-col justify-center'>
      <div className='mb-4 sm:mb-8'>
        <p className='uppercase tracking-widest text-xs text-zinc-300 mb-1 sm:mb-4'>
          {product.subtitle}
        </p>
        <div className='flex items-center justify-between mb-2 sm:mb-4'>
          <AnimatePresence mode='wait'>
            <motion.h2
              key={productKey}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className='text-2xl sm:text-3xl md:text-6xl font-bold text-brand-primary'
            >
              {product.name}
            </motion.h2>
          </AnimatePresence>
          {!hideBuyButton && (
            <div className='flex items-center gap-2'>
              <Dialog>
                <DialogTrigger className='border border-brand-primary text-brand-primary font-bold py-1 px-2 sm:px-3 mb-2 cursor-pointer hover:opacity-90 transition hover:bg-brand-primary hover:text-brand-action self-end text-xs sm:text-sm'>
                  {labels.composition}
                </DialogTrigger>
                <DialogContent className='bg-brand-primary h-[500px]'>
                  <DialogHeader>
                    <DialogTitle className='text-brand-action text-2xl'>
                      {labels.compositionTitle}
                    </DialogTitle>
                  </DialogHeader>
                  {product.ingredients && (
                    <img
                      src={product.ingredients}
                      alt='ingredients'
                      className='max-h-[400px]'
                    />
                  )}
                </DialogContent>
              </Dialog>
            </div>
          )}
        </div>
        <AnimatePresence mode='wait'>
          <motion.p
            key={productKey}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className='text-zinc-200 mb-4 sm:mb-8 max-w-lg hidden sm:block'
          >
            {product.description}
          </motion.p>
        </AnimatePresence>

        {hideBuyButton && (
          <div className='mt-2 sm:mt-3'>
            {cta && (
              <Button
                asChild
                variant='outline'
                className='bg-brand-primary text-brand-action border-brand-primary hover:bg-brand-primary/90'
              >
                <Link
                  href={cta.href}
                  target={cta.external ? '_blank' : undefined}
                  rel={cta.external ? 'noopener noreferrer' : undefined}
                >
                  {cta.label}
                </Link>
              </Button>
            )}
            {noteText && <p className='text-xs text-zinc-300 mt-2'>{noteText}</p>}
          </div>
        )}

        {!hideBuyButton && (
          <>
            <div className='flex justify-between border-t border-zinc-600 pt-3 sm:pt-6 mb-3 sm:mb-6'>
              {product.stats.map(stat => (
                <div
                  key={stat.label}
                  className='flex flex-col items-center min-w-[70px] sm:min-w-[90px]'
                >
                  <span className='text-xs text-zinc-400'>{stat.label}</span>
                  <span className='text-sm sm:text-lg font-bold text-brand-primary'>
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>
            <div className='grid place-self-end'>
              {isPreparing ? (
                <Button variant={'shop'} disabled>
                  {labels.preparing}
                </Button>
              ) : (
                <Button asChild variant={'shop'}>
                  <Link href={buyUrl} target='_blank' rel='noopener noreferrer'>
                    {labels.buy}
                  </Link>
                </Button>
              )}
              {!isPreparing && (
                <p className='text-xs text-zinc-400 mt-1'>{labels.depositNote}</p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
