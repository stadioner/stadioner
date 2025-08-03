'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Container } from '@/components/container'
import { RippedPaperSVG } from '@/components/ripped-paper-svg'
import { cn } from '@/lib/utils'

const products = [
  {
    name: 'Profesor dvanáctka',
    subtitle: 'Klasický nefiltrovaný ležák s plnou chutí',
    description:
      'Pivo Profesor 12 je ideální volbou pro ty, kdo hledají poctivé, nekompromisní pivo bez zbytečných úprav. Je nefiltrované a nepasterizované, takže si zachovává přirozenou chuť a charakter skutečného českého ležáku. Perfektně se hodí ke grilovaným masům, sýrům i jen tak k posezení s přáteli.',
    stats: [
      { label: 'TYP', value: 'Ležák světlý' },
      { label: 'ABV', value: '5.1%' },
      { label: 'STUPEŇ', value: '12°' },
      { label: 'FILTRACE', value: 'Nefiltrované' },
    ],
    image: '/products/cola/bottle.webp',
    caps: '/products/cola/cap.webp',
  },
  {
    name: 'Koutská jedenáctka',
    subtitle: 'Lehký ležák s jemnou hořkostí',
    description:
      'Tato jedenáctka vyniká svou pitelností, čistým profilem a jemně chmelovým aroma. Skvěle se hodí k české kuchyni, lehkým jídlům nebo jen tak k posezení s přáteli. Pokud hledáš poctivé řemeslné pivo s nižší stupňovitostí, Koutská 11 je sázka na jistotu.',
    stats: [
      { label: 'TYP PIVA', value: 'Ležák světlý' },
      { label: 'ABV', value: '4.2%' },
      { label: 'STUPEŇ', value: '11°' },
      { label: 'FILTRACE', value: 'Nefiltrované' },
    ],
    image: '/products/jedenactka.webp',
    caps: '/products/jedenactka.webp',
  },
  {
    name: 'Limonáda citrón',
    subtitle: 'Svěží citronová limonáda z pramenité vody',
    description:
      'Citronová limonáda Stadioner je svěží nealkoholický nápoj vyráběný z pramenité vody z šumavských lesů. Vyniká příjemně kyselou chutí citronu, která osvěží v každé situaci – ať už při práci, sportu nebo odpočinku. Díky pečlivě zvolenému složení bez zbytečných konzervantů je limonáda lehká, přírodní a vyvážená.',
    stats: [
      { label: 'OBJEM', value: '500 ml' },
      { label: 'CHUŤ', value: 'Citrón' },
      { label: 'SLOŽENÍ', value: 'Pramenitá voda' },
      { label: 'BALENÍ', value: 'Vratný obal' },
    ],
    image: '/products/citron.webp',
    caps: '/products/citron.webp',
  },
]

export const Products = ({
  rippedPaper,
  hScreen,
}: {
  rippedPaper?: boolean
  hScreen?: boolean
}) => {
  const [current, setCurrent] = useState(0)

  const handlePrev = () =>
    setCurrent(prev => (prev === 0 ? products.length - 1 : prev - 1))
  const handleNext = () =>
    setCurrent(prev => (prev === products.length - 1 ? 0 : prev + 1))
  const handleSelect = (idx: number) => setCurrent(idx)

  const product = products[current]

  return (
    <section className={cn('relative', !hScreen && 'bg-brand-secondary')}>
      <div className={cn('bg-brand-action py-8', hScreen && '')}>
        {rippedPaper && (
          <div
            className='absolute -top-5 left-0 w-full z-10'
            style={{ lineHeight: 0 }}
          >
            <RippedPaperSVG flip />
          </div>
        )}
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
                    className='text-3xl md:text-6xl font-bold text-brand-primary mb-4'
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
                <div className='flex justify-between border-t border-zinc-600 pt-6 mb-6'>
                  {product.stats.map(stat => (
                    <div
                      key={stat.label}
                      className='flex flex-col items-center min-w-[90px]'
                    >
                      <span className='text-xs text-zinc-400'>
                        {stat.label}
                      </span>
                      <span className='text-lg font-bold text-brand-primary'>
                        {stat.value}
                      </span>
                    </div>
                  ))}
                </div>
                <div className='flex gap-4'>
                  <button
                    onClick={handlePrev}
                    className='w-10 h-10 rounded-full border border-zinc-500 flex items-center justify-center text-brand-primary hover:bg-brand-secondary/10 transition disabled:opacity-50 cursor-pointer'
                    aria-label='Previous product'
                  >
                    &#8592;
                  </button>
                  <button
                    onClick={handleNext}
                    aria-label='Next product'
                    className='w-10 h-10 rounded-full border border-zinc-500 flex items-center justify-center text-brand-primary hover:bg-brand-secondary/10 transition disabled:opacity-50 cursor-pointer'
                  >
                    &#8594;
                  </button>
                </div>
              </div>
              {/* Bottle caps selector */}
              <div className='flex gap-2 mt-auto'>
                {products.map((p, idx) => (
                  <motion.button
                    key={p.name}
                    onClick={() => handleSelect(idx)}
                    className={`rounded-full border-4 cursor-pointer ${
                      current === idx
                        ? 'border-brand-action'
                        : 'border-transparent'
                    } bg-zinc-800`}
                    whileTap={{ scale: 0.9 }}
                    animate={{ scale: current === idx ? 1.1 : 1 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    aria-label={`Select ${p.name}`}
                  >
                    <img
                      src={p.caps}
                      alt={p.name}
                      className='w-14 h-14 object-cover'
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
        {rippedPaper && (
          <div
            className='absolute -bottom-5 left-0 w-full z-10'
            style={{ lineHeight: 0 }}
          >
            <RippedPaperSVG />
          </div>
        )}
      </div>
    </section>
  )
}
