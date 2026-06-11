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
  const isScrolling = useRef(false)
  const scrollTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)
  const prevCurrent = useRef(current)

  const [overflows, setOverflows] = useState(false)
  const productsKey = products.map((product) => product.slug).join(',')

  const scrollToIndex = useCallback((index: number, smooth: boolean) => {
    const container = scrollRef.current
    const item = itemRefs.current.get(index)
    if (!container || !item) return

    const scrollLeft =
      item.offsetLeft - (container.clientWidth - item.offsetWidth) / 2

    isScrolling.current = true
    container.scrollTo({
      left: scrollLeft,
      behavior: smooth ? 'smooth' : 'instant'
    })
  }, [])

  const handleScrollEnd = useCallback(() => {
    if (isScrolling.current || !overflows) return

    const container = scrollRef.current
    if (!container) return

    const containerCenter = container.scrollLeft + container.clientWidth / 2
    let closestIdx = 0
    let closestDistance = Infinity

    itemRefs.current.forEach((element, idx) => {
      const itemCenter = element.offsetLeft + element.offsetWidth / 2
      const distance = Math.abs(itemCenter - containerCenter)
      if (distance < closestDistance) {
        closestDistance = distance
        closestIdx = idx
      }
    })

    if (closestIdx !== current) {
      onSelect(closestIdx)
    }
  }, [current, onSelect, overflows])

  const handleScroll = () => {
    if (isScrolling.current) {
      isScrolling.current = false
      return
    }

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
      scrollRef.current?.scrollTo({ left: 0, behavior: 'instant' })
      prevCurrent.current = current
      return
    }

    const animate =
      prevCurrent.current !== -1 && prevCurrent.current !== current
    prevCurrent.current = current

    let timeout: ReturnType<typeof setTimeout> | undefined
    const frame = requestAnimationFrame(() => {
      scrollToIndex(current, animate)
      timeout = setTimeout(() => {
        isScrolling.current = false
      }, animate ? 350 : 0)
    })

    return () => {
      cancelAnimationFrame(frame)
      if (timeout) clearTimeout(timeout)
    }
  }, [current, overflows, productsKey, scrollToIndex])

  useEffect(() => {
    return () => {
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current)
      }
    }
  }, [])

  return (
    <div className='mt-3 flex items-center gap-2 sm:mt-6 sm:gap-4'>
      <button
        onClick={onPrev}
        className='text-brand-primary hover:bg-brand-secondary/10 flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-full border border-zinc-500 transition disabled:opacity-50 sm:size-10'
        aria-label='Previous product'
      >
        &#8592;
      </button>

      <div ref={viewportRef} className='relative min-w-0 flex-1 overflow-hidden'>
        <div
          ref={measureRef}
          aria-hidden
          className='pointer-events-none invisible absolute flex gap-1 sm:gap-2'
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
          className={`flex gap-1 scroll-smooth sm:gap-2 ${
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
                onClick={() => onSelect(idx)}
                className={`shrink-0 cursor-pointer rounded-full border-2 ${
                  isSelected ? 'border-brand-secondary' : 'border-transparent'
                } bg-zinc-800`}
                style={overflows ? { scrollSnapAlign: 'center' } : undefined}
                whileTap={{ scale: 0.9 }}
                animate={{ scale: isSelected ? 1.1 : 1 }}
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
