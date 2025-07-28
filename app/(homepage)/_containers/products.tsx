'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Container } from '@/components/container'

const products = [
  {
    name: 'SHINER ¡ÓRALE! LIMÓN',
    subtitle: 'CERVEZA WITH LIME',
    description:
      '“Órale!” can mean many different things, but for Texans, it’s what comes to mind when your favorite Mexican-style cerveza adds a bit of all-natural limón for an extra kick of lime flavor.',
    stats: [
      { label: 'FIRST BREWED', value: '2024' },
      { label: 'ABV', value: '4.5%' },
      { label: 'BITTERNESS', value: '9 IBU' },
    ],
    image: '/products/citron.webp',
    caps: '/products/citron.webp',
  },
  {
    name: 'SHINER COLA MIX',
    subtitle: 'CERVEZA WITH COLA',
    description:
      'A refreshing blend of classic cola and beer, perfect for summer days and BBQs.',
    stats: [
      { label: 'FIRST BREWED', value: '2023' },
      { label: 'ABV', value: '4.2%' },
      { label: 'BITTERNESS', value: '12 IBU' },
    ],
    image: '/products/cola.webp',
    caps: '/products/cola.webp',
  },
  {
    name: 'SHINER VODA',
    subtitle: 'NATURAL SPRING WATER',
    description:
      'Pure spring water for a crisp, clean taste. Perfect for any occasion.',
    stats: [
      { label: 'FIRST BREWED', value: '2022' },
      { label: 'ABV', value: '0%' },
      { label: 'BITTERNESS', value: '0 IBU' },
    ],
    image: '/products/voda.webp',
    caps: '/products/voda.webp',
  },
]

export const Products = () => {
  const [current, setCurrent] = useState(0)

  const handlePrev = () =>
    setCurrent(prev => (prev === 0 ? products.length - 1 : prev - 1))
  const handleNext = () =>
    setCurrent(prev => (prev === products.length - 1 ? 0 : prev + 1))
  const handleSelect = (idx: number) => setCurrent(idx)

  const product = products[current]

  return (
    <section className='bg-brand-action py-20'>
      <Container>
        <div className='flex flex-col md:flex-row gap-8 items-stretch mt-8'>
          {/* Left: Info & Navigation */}
          <div className='flex-1 flex flex-col justify-center'>
            <div className='mb-8'>
              <p className='uppercase tracking-widest text-xs text-zinc-300 mb-2'>
                {product.subtitle}
              </p>
              <AnimatePresence mode='wait'>
                <motion.h2
                  key={product.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className='text-3xl md:text-5xl font-bold text-zinc-100 mb-4'
                >
                  {product.name}
                </motion.h2>
              </AnimatePresence>
              <AnimatePresence mode='wait'>
                <motion.p
                  key={product.description}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className='text-zinc-200 mb-8 max-w-lg'
                >
                  {product.description}
                </motion.p>
              </AnimatePresence>
              <div className='flex gap-8 border-t border-zinc-600 pt-6 mb-6'>
                {product.stats.map(stat => (
                  <div
                    key={stat.label}
                    className='flex flex-col items-center min-w-[90px]'
                  >
                    <span className='text-xs text-zinc-400'>{stat.label}</span>
                    <span className='text-lg font-bold text-zinc-100'>
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>
              <div className='flex gap-4'>
                <button
                  onClick={handlePrev}
                  className='w-10 h-10 rounded-full border border-zinc-500 flex items-center justify-center text-zinc-300 hover:bg-zinc-700 transition disabled:opacity-50'
                  aria-label='Previous product'
                >
                  &#8592;
                </button>
                <button
                  onClick={handleNext}
                  className='w-10 h-10 rounded-full border border-zinc-500 flex items-center justify-center text-zinc-300 hover:bg-zinc-700 transition disabled:opacity-50'
                  aria-label='Next product'
                >
                  &#8594;
                </button>
                <button className='ml-6 px-6 py-2 rounded-full bg-brand-action text-white font-bold hover:bg-brand-action/80 transition'>
                  FIND
                </button>
                <button className='ml-2 px-6 py-2 rounded-full border border-zinc-500 text-zinc-200 font-bold hover:bg-zinc-700 transition'>
                  DETAILS
                </button>
              </div>
            </div>
            {/* Bottle caps selector */}
            <div className='flex gap-2 mt-auto'>
              {products.map((p, idx) => (
                <motion.button
                  key={p.name}
                  onClick={() => handleSelect(idx)}
                  className={`rounded-full border-4 ${
                    current === idx
                      ? 'border-brand-action'
                      : 'border-transparent'
                  } p-1 bg-zinc-800`}
                  whileTap={{ scale: 0.9 }}
                  animate={{ scale: current === idx ? 1.1 : 1 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  aria-label={`Select ${p.name}`}
                >
                  <img
                    src={p.caps}
                    alt={p.name}
                    className='w-10 h-10 object-contain'
                  />
                </motion.button>
              ))}
            </div>
          </div>
          {/* Right: Product Image */}
          <div className='flex-1 flex items-center justify-center'>
            <AnimatePresence mode='wait'>
              <motion.img
                key={product.image}
                src={product.image}
                alt={product.name}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.5 }}
                className='max-h-[400px] w-auto drop-shadow-2xl'
              />
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </section>
  )
}
