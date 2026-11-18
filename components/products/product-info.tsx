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
  }
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
  hideBuyButton = false,
  noteText,
  cta
}: ProductInfoProps) => {
  // Use slug as key to only animate on product change, not packaging change
  const productKey = product.slug

  return (
    <div className='flex flex-1 flex-col justify-center'>
      <div className='mb-4 sm:mb-8'>
        {product.subtitle ?
          <p className='mb-1 text-xs tracking-widest text-zinc-300 uppercase sm:mb-4'>
            {product.subtitle}
          </p>
        : null}
        <div className='mb-2 sm:mb-4'>
          <AnimatePresence mode='wait'>
            <motion.h2
              key={productKey}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className='text-brand-primary m-0 flex flex-wrap items-end gap-x-2.5 text-2xl leading-none font-bold sm:gap-x-3 sm:text-3xl md:text-6xl'
            >
              <span>{product.name}</span>
              {product.ingredients ?
                <Dialog>
                  <DialogTrigger className='border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-brand-action inline-flex shrink-0 cursor-pointer items-center border px-2.5 py-1 text-sm leading-none font-bold transition hover:opacity-90 sm:px-3 sm:py-1.5 sm:text-base md:px-3.5 md:py-2 md:text-lg'>
                    {labels.composition}
                  </DialogTrigger>
                  <DialogContent className='bg-brand-primary w-fit max-w-[calc(100vw-2rem)] gap-3 rounded-none p-4 sm:max-w-none'>
                    <DialogHeader>
                      <DialogTitle className='text-brand-action text-2xl'>
                        {labels.compositionTitle}
                      </DialogTitle>
                    </DialogHeader>
                    <Image
                      src={product.ingredients}
                      alt='ingredients'
                      width={1443}
                      height={2048}
                      className='h-auto max-h-[min(75vh,42rem)] w-auto max-w-[calc(100vw-3rem)]'
                    />
                  </DialogContent>
                </Dialog>
              : null}
            </motion.h2>
          </AnimatePresence>
        </div>
        <AnimatePresence mode='wait'>
          {product.description ?
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
          : null}
        </AnimatePresence>

        {hideBuyButton ?
          <div className='mt-2 sm:mt-3'>
            {cta ?
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
            : null}
            {noteText ?
              <p className='mt-2 text-xs text-zinc-300'>{noteText}</p>
            : null}
          </div>
        : <div className='inline-flex flex-col items-start'>
            <Button
              asChild
              variant='shop'
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
            <p className='mt-1 text-xs text-zinc-400'>{labels.depositNote}</p>
          </div>
        }
      </div>
    </div>
  )
}
