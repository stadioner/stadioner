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
import type { PackagingKey, Product } from '@/types/products'
import { formatPriceCzk } from '@/lib/products/utils'

function resolvePriceLine(
  product: Product,
  packaging: PackagingKey
): string | null {
  if (packaging === 'bottle' && product.bottlePriceCzk != null) {
    return `${formatPriceCzk(product.bottlePriceCzk)} Kč`
  }
  if (packaging === 'crate' && product.cratePriceCzk != null) {
    return `${formatPriceCzk(product.cratePriceCzk)} Kč`
  }
  if (packaging === 'barrel20' || packaging === 'barrel30' || packaging === 'barrel50') {
    const amount = product.kegPricesCzk?.[packaging]
    if (amount != null) {
      return `${formatPriceCzk(amount)} Kč`
    }
  }
  return null
}

interface ProductInfoProps {
  product: Product
  selectedPackaging: PackagingKey
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
  selectedPackaging,
  buyUrl,
  labels,
  isPreparing = false,
  hideBuyButton = false,
  noteText,
  cta
}: ProductInfoProps) => {
  // Use slug as key to only animate on product change, not packaging change
  const productKey = product.slug
  const priceLine = resolvePriceLine(product, selectedPackaging)

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
              className='text-brand-primary m-0 text-2xl leading-none font-bold sm:text-3xl md:text-6xl'
            >
              {product.name}
              {!hideBuyButton && product.ingredients ?
                <Dialog>
                  <DialogTrigger className='border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-brand-action ml-[0.32em] inline-block cursor-pointer appearance-none border align-baseline px-2 pt-1 pb-0 text-[0.22em] leading-none font-bold transition hover:opacity-90'>
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

        {/*{hideBuyButton && (
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
        )}*/}
      </div>
    </div>
  )
}
