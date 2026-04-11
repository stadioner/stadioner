import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
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
  cta
}: ProductInfoProps) => {
  // Use slug as key to only animate on product change, not packaging change
  const productKey = product.slug

  return (
    <div className='flex flex-1 flex-col justify-center'>
      <div className='mb-4 sm:mb-8'>
        <p className='mb-1 text-xs tracking-widest text-zinc-300 uppercase sm:mb-4'>
          {product.subtitle}
        </p>
        <div className='mb-2 flex items-center justify-between sm:mb-4'>
          <AnimatePresence mode='wait'>
            <motion.h2
              key={productKey}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className='text-brand-primary text-2xl font-bold sm:text-3xl md:text-6xl'
            >
              {product.name}
            </motion.h2>
          </AnimatePresence>
          {!hideBuyButton && product.ingredients ?
            <div className='flex items-center gap-2'>
              <Dialog>
                <DialogTrigger className='border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-brand-action mb-2 cursor-pointer self-end border px-2 py-1 text-xs font-bold transition hover:opacity-90 sm:px-3 sm:text-sm'>
                  {labels.composition}
                </DialogTrigger>
                <DialogContent className='bg-brand-primary h-[500px]'>
                  <DialogHeader>
                    <DialogTitle className='text-brand-action text-2xl'>
                      {labels.compositionTitle}
                    </DialogTitle>
                  </DialogHeader>
                  <Image
                    src={product.ingredients}
                    alt='ingredients'
                    width={1200}
                    height={1600}
                    className='h-auto max-h-[400px] w-auto'
                  />
                </DialogContent>
              </Dialog>
            </div>
          : null}
        </div>
        <AnimatePresence mode='wait'>
          <motion.p
            key={productKey}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className='mb-4 hidden max-w-lg text-zinc-200 sm:mb-8 sm:block'
          >
            {product.description}
          </motion.p>
        </AnimatePresence>

        {hideBuyButton && (
          <div className='mt-2 sm:mt-3'>
            {cta && (
              <Button
                asChild
                variant='shop'
                className='min-w-[190px]'
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
            {noteText && (
              <p className='mt-2 text-xs text-zinc-300'>{noteText}</p>
            )}
          </div>
        )}

        {!hideBuyButton && (
          <>
            <div className='mb-3 flex justify-between border-t border-zinc-600 pt-3 sm:mb-6 sm:pt-6'>
              {product.stats.map((stat) => (
                <div
                  key={stat.label}
                  className='flex min-w-[70px] flex-col items-center sm:min-w-[90px]'
                >
                  <span className='text-xs text-zinc-400'>{stat.label}</span>
                  <span className='text-brand-primary text-sm font-bold sm:text-lg'>
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>
            <div className='inline-flex flex-col items-start'>
              {isPreparing ?
                <Button
                  variant={'shop'}
                  className='w-fit'
                  disabled
                >
                  {labels.preparing}
                </Button>
              : <Button
                  asChild
                  variant={'shop'}
                  className='w-fit'
                >
                  <Link
                    href={buyUrl}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    {labels.buy}
                  </Link>
                </Button>
              }
              {!isPreparing && (
                <p className='mt-1 text-xs text-zinc-400'>
                  {labels.depositNote}
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
