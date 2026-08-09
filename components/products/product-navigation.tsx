'use client'

import { useRef, useEffect, useCallback, useState } from 'react'
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

const iconClassName =
  'size-10 rounded-full object-cover sm:size-12 md:size-14'

export const ProductNavigation = ({
  products,
  current,
  onPrev,
  onNext,
  onSelect
}: ProductNavigationProps) => {
  const viewportRef = useRef<HTMLDivElement>(null)
  const measureRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<Map<number, HTMLButtonElement>>(new Map())
  const isProgrammaticScroll = useRef(false)
  const scrollTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)
  const programmaticTimeout = useRef<ReturnType<typeof setTimeout> | null>(
    null
  )
  const prevCurrent = useRef(current)
  const currentRef = useRef(current)
  const onSelectRef = useRef(onSelect)

  const [overflows, setOverflows] = useState(false)
  const productsKey = products.map((product) => product.slug).join(',')

  currentRef.current = current
  onSelectRef.current = onSelect

  const clearProgrammaticScroll = useCallback(() => {
    if (programmaticTimeout.current) {
      clearTimeout(programmaticTimeout.current)
      programmaticTimeout.current = null
    }
    isProgrammaticScroll.current = false
  }, [])

  const markProgrammaticScroll = useCallback(
    (durationMs: number) => {
      isProgrammaticScroll.current = true
      if (programmaticTimeout.current) {
        clearTimeout(programmaticTimeout.current)
      }
      programmaticTimeout.current = setTimeout(() => {
        isProgrammaticScroll.current = false
        programmaticTimeout.current = null
      }, durationMs)
    },
    []
  )

  const scrollToIndex = useCallback(
    (index: number, smooth: boolean) => {
      const container = scrollRef.current
      const item = itemRefs.current.get(index)
      if (!container || !item) return

      const scrollLeft =
        item.offsetLeft - (container.clientWidth - item.offsetWidth) / 2

      markProgrammaticScroll(smooth ? 450 : 50)
      container.scrollTo({
        left: Math.max(0, scrollLeft),
        behavior: smooth ? 'smooth' : 'instant'
      })
    },
    [markProgrammaticScroll]
  )

  const handleScrollEnd = useCallback(() => {
    if (isProgrammaticScroll.current || !overflows) return
    if (itemRefs.current.size === 0) return

    const container = scrollRef.current
    if (!container) return

    const containerCenter = container.scrollLeft + container.clientWidth / 2
    let closestIdx = -1
    let closestDistance = Infinity

    itemRefs.current.forEach((element, idx) => {
      const itemCenter = element.offsetLeft + element.offsetWidth / 2
      const distance = Math.abs(itemCenter - containerCenter)
      if (distance < closestDistance) {
        closestDistance = distance
        closestIdx = idx
      }
    })

    if (closestIdx !== -1 && closestIdx !== currentRef.current) {
      onSelectRef.current(closestIdx)
    }
  }, [overflows])

  const handleScroll = () => {
    if (isProgrammaticScroll.current) return

    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current)
    }
    scrollTimeout.current = setTimeout(handleScrollEnd, 120)
  }

  useEffect(() => {
    const viewport = viewportRef.current
    const measure = measureRef.current
    if (!viewport || !measure) return

    const updateOverflow = () => {
      setOverflows(measure.scrollWidth > viewport.clientWidth + 1)
    }

    updateOverflow()
    const observer = new ResizeObserver(updateOverflow)
    observer.observe(viewport)
    observer.observe(measure)
    return () => observer.disconnect()
  }, [productsKey])

  useEffect(() => {
    itemRefs.current.clear()
    prevCurrent.current = -1
  }, [productsKey])

  useEffect(() => {
    if (!overflows) {
      markProgrammaticScroll(50)
      scrollRef.current?.scrollTo({ left: 0, behavior: 'instant' })
      prevCurrent.current = current
      return
    }

    const animate =
      prevCurrent.current !== -1 && prevCurrent.current !== current
    prevCurrent.current = current

    const frame = requestAnimationFrame(() => {
      scrollToIndex(current, animate)
    })

    return () => {
      cancelAnimationFrame(frame)
    }
  }, [current, overflows, productsKey, scrollToIndex, markProgrammaticScroll])

  useEffect(() => {
    return () => {
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current)
      }
      clearProgrammaticScroll()
    }
  }, [clearProgrammaticScroll])

  const handleItemSelect = (idx: number) => {
    markProgrammaticScroll(450)
    onSelect(idx)
  }

  return (
    <div className='mt-3 flex items-center gap-2 sm:mt-6 sm:gap-4'>
      <button
        onClick={onPrev}
        className='text-brand-primary hover:bg-brand-secondary/10 flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-full border border-zinc-500 transition disabled:opacity-50 sm:size-10'
        aria-label='Previous product'
      >
        &#8592;
      </button>

      <div ref={viewportRef} className='relative min-w-0 flex-1 overflow-x-hidden'>
        <div
          ref={measureRef}
          aria-hidden
          className='pointer-events-none invisible absolute top-2 flex gap-1 sm:gap-2'
        >
          {products.map((product) => (
            <div
              key={`measure-${product.slug}`}
              className='size-10 shrink-0 rounded-full sm:size-12 md:size-14'
            />
          ))}
        </div>

        <div
          ref={scrollRef}
          onScroll={overflows ? handleScroll : undefined}
          className={`flex items-center gap-1 py-2 scroll-smooth sm:gap-2 ${
            overflows ?
              'overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
            : 'justify-center'
          }`}
          style={
            overflows ?
              {
                scrollSnapType: 'x mandatory',
                WebkitOverflowScrolling: 'touch'
              }
            : undefined
          }
        >
          {overflows ?
            <div
              aria-hidden
              className='w-[calc(50%-1.25rem)] shrink-0 sm:w-[calc(50%-1.5rem)] md:w-[calc(50%-1.75rem)]'
            />
          : null}
          {products.map((product, idx) => {
            const isSelected = idx === current

            return (
              <motion.button
                key={product.slug}
                ref={(element) => {
                  if (element) {
                    itemRefs.current.set(idx, element)
                  } else {
                    itemRefs.current.delete(idx)
                  }
                }}
                onClick={() => handleItemSelect(idx)}
                className={`shrink-0 cursor-pointer rounded-full border-2 ${
                  isSelected ? 'border-brand-secondary' : 'border-transparent'
                } bg-zinc-800`}
                style={overflows ? { scrollSnapAlign: 'center' } : undefined}
                whileTap={{ scale: 0.95 }}
                animate={{ scale: isSelected ? 1.08 : 1 }}
                transition={{ type: 'spring', stiffness: 300 }}
                aria-label={`Select ${product.name}`}
                aria-current={isSelected ? 'true' : undefined}
              >
                <Image
                  src={product.icon}
                  alt={product.name}
                  width={56}
                  height={56}
                  className={iconClassName}
                  draggable={false}
                />
              </motion.button>
            )
          })}
          {overflows ?
            <div
              aria-hidden
              className='w-[calc(50%-1.25rem)] shrink-0 sm:w-[calc(50%-1.5rem)] md:w-[calc(50%-1.75rem)]'
            />
          : null}
        </div>
      </div>

      <button
        onClick={onNext}
        aria-label='Next product'
        className='text-brand-primary hover:bg-brand-secondary/10 flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-full border border-zinc-500 transition disabled:opacity-50 sm:size-10'
      >
        &#8594;
      </button>
    </div>
  )
}
