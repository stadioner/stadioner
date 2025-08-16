'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter, useSearchParams } from 'next/navigation'
import { Container } from '@/components/container'
import { RippedPaperSVG } from '@/components/ripped-paper-svg'
import { cn } from '@/lib/utils'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

// Typ produktu
interface Product {
  name: string
  subtitle: string
  category: string
  categoryLabel: string
  slug: string
  description: string
  stats: { label: string; value: string }[]
  image: string
  icon: string
}

// Rozdělené produkty podle kategorií
const beers: Product[] = [
  {
    name: 'Profesor dvanáctka',
    subtitle: 'Klasický nefiltrovaný ležák s plnou chutí',
    category: 'pivo',
    categoryLabel: 'Pivo',
    slug: 'profesor-dvanactka',
    description:
      'Pivo Profesor 12 je ideální volbou pro ty, kdo hledají poctivé, nekompromisní pivo bez zbytečných úprav. Je nefiltrované a nepasterizované, takže si zachovává přirozenou chuť a charakter skutečného českého ležáku. Perfektně se hodí ke grilovaným masům, sýrům i jen tak k posezení s přáteli.',
    stats: [
      { label: 'TYP', value: 'Ležák světlý' },
      { label: 'ABV', value: '5.1%' },
      { label: 'STUPEŇ', value: '12°' },
      { label: 'FILTRACE', value: 'Nefiltrované' },
    ],
    image: '/products/bottle.webp',
    icon: '/products/pivo/dvanactka/icon.svg',
  },
  {
    name: 'Koutská jedenáctka',
    subtitle: 'Lehký ležák s jemnou hořkostí',
    category: 'pivo',
    categoryLabel: 'Pivo',
    slug: 'koutska-jedenactka',
    description:
      'Tato jedenáctka vyniká svou pitelností, čistým profilem a jemně chmelovým aroma. Skvěle se hodí k české kuchyni, lehkým jídlům nebo jen tak k posezení s přáteli. Pokud hledáš poctivé řemeslné pivo s nižší stupňovitostí, Koutská 11 je sázka na jistotu.',
    stats: [
      { label: 'TYP PIVA', value: 'Ležák světlý' },
      { label: 'ABV', value: '4.2%' },
      { label: 'STUPEŇ', value: '11°' },
      { label: 'FILTRACE', value: 'Nefiltrované' },
    ],
    image: '/products/bottle.webp',
    icon: '/products/pivo/jedenactka/icon.svg',
  },
]

const limos: Product[] = [
  {
    name: 'Limonáda citrón',
    subtitle: 'Svěží citronová limonáda z pramenité vody',
    category: 'limo',
    categoryLabel: 'Limonáda',
    slug: 'limonada-citron',
    description:
      'Citronová limonáda Stadioner je svěží nealkoholický nápoj vyráběný z pramenité vody z šumavských lesů. Vyniká příjemně kyselou chutí citronu, která osvěží v každé situaci – ať už při práci, sportu nebo odpočinku. Díky pečlivě zvolenému složení bez zbytečných konzervantů je limonáda lehká, přírodní a vyvážená.',
    stats: [
      { label: 'OBJEM', value: '500 ml' },
      { label: 'CHUŤ', value: 'Citrón' },
      { label: 'SLOŽENÍ', value: 'Pramenitá voda' },
      { label: 'BALENÍ', value: 'Vratný obal' },
    ],
    image: '/products/bottle.webp',
    icon: '/products/limo/citron/icon.svg',
  },
  {
    name: 'Limonáda pomeranč',
    subtitle: 'Osvěžující pomerančová limonáda z pramenité vody',
    category: 'limo',
    categoryLabel: 'Limonáda',
    slug: 'limonada-pomeranc',
    description:
      'Pomerančová limonáda Stadioner je sladší nealkoholický nápoj s výraznou ovocnou chutí, vyráběný z pramenité vody z šumavských lesů. Díky jemnému sycení a přírodnímu aroma nabízí osvěžení, které potěší v horkých dnech i při odpočinku. Bez zbytečných konzervantů a umělých barviv.',
    stats: [
      { label: 'OBJEM', value: '500 ml' },
      { label: 'CHUŤ', value: 'Pomeranč' },
      { label: 'SLOŽENÍ', value: 'Pramenitá voda' },
      { label: 'BALENÍ', value: 'Vratný obal' },
    ],
    image: '/products/bottle.webp',
    icon: '/products/limo/pomeranc/icon.svg',
  },
  {
    name: 'Cola mix',
    subtitle: 'Klasická cola s jemným citronovým nádechem',
    category: 'limo',
    categoryLabel: 'Limonáda',
    slug: 'cola-mix',
    description:
      'Cola mix Stadioner spojuje tradiční colovou chuť s osvěžujícím citronovým nádechem. Vyrábí se z pramenité vody z šumavských lesů a je jemně sycená pro ideální pitelný zážitek. Perfektní volba pro milovníky coly, kteří chtějí něco neobvyklého, ale přitom známého.',
    stats: [
      { label: 'OBJEM', value: '500 ml' },
      { label: 'CHUŤ', value: 'Cola s citronem' },
      { label: 'SLOŽENÍ', value: 'Pramenitá voda' },
      { label: 'BALENÍ', value: 'Vratný obal' },
    ],
    image: '/products/bottle.webp',
    icon: '/products/limo/colamix/icon.svg',
  },
]

const waters: Product[] = [
  {
    name: 'Pramenitá voda (Sycená)',
    subtitle: 'Čistá voda z šumavských pramenů',
    category: 'voda',
    categoryLabel: 'Voda',
    slug: 'pramenita-voda-sycena',
    description:
      'Pramenitá voda Stadioner pochází z čistých šumavských pramenů. Je přirozeně čistá, bez přidaných látek a minerálů. Ideální pro každodenní pití, sportovní aktivity nebo jako základ pro přípravu nápojů. Balená ve vratných obalech pro šetrnost k životnímu prostředí.',
    stats: [
      { label: 'OBJEM', value: '500 ml' },
      { label: 'TYP', value: 'Pramenitá' },
      { label: 'SLOŽENÍ', value: 'Přírodní' },
      { label: 'BALENÍ', value: 'Vratný obal' },
    ],
    image: '/products/bottle.webp',
    icon: '/products/voda/sycena/icon.svg',
  },
  {
    name: 'Pramenitá voda (Nesycená)',
    subtitle: 'Čistá voda z šumavských pramenů',
    category: 'voda',
    categoryLabel: 'Voda',
    slug: 'pramenita-voda-nesycena',
    description:
      'Pramenitá voda Stadioner pochází z čistých šumavských pramenů. Je přirozeně čistá, bez přidaných látek a minerálů, a díky své jemné chuti je ideální pro každodenní pití. Vhodná k hydrataci během dne, sportu i k přípravě jídel či nápojů. Balená ve vratných obalech pro šetrnost k životnímu prostředí.',
    stats: [
      { label: 'OBJEM', value: '500 ml' },
      { label: 'TYP', value: 'Pramenitá' },
      { label: 'SLOŽENÍ', value: 'Přírodní' },
      { label: 'BALENÍ', value: 'Vratný obal' },
    ],
    image: '/products/bottle.webp',
    icon: '/products/voda/nesycena/icon.svg',
  },
]

// Mapování kategorií na pole produktů
const productMap: { [key: string]: Product[] } = {
  pivo: beers,
  limo: limos,
  voda: waters,
}

const categories = [
  { id: 'pivo', label: 'Piva' },
  { id: 'limo', label: 'Limonády' },
  { id: 'voda', label: 'Vody' },
]

export const Products = ({
  rippedPaper,
  hScreen,
}: {
  rippedPaper?: boolean
  hScreen?: boolean
}) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [selectedCategory, setSelectedCategory] = useState('pivo')
  const [current, setCurrent] = useState(0)
  const [open, setOpen] = useState(false)

  // Vždy aktuální pole produktů podle kategorie
  const filteredProducts = productMap[selectedCategory] || []

  // Handle URL changes on mount and when searchParams change
  useEffect(() => {
    const productSlug = searchParams.get('produkt')
    const categoryParam = searchParams.get('kategorie')
    if (categoryParam && productMap[categoryParam]) {
      setSelectedCategory(categoryParam)
    }
    let idx = 0
    if (productSlug) {
      const foundIdx = (
        productMap[categoryParam || selectedCategory] || []
      ).findIndex((p: Product) => p.slug === productSlug)
      if (foundIdx !== -1) {
        idx = foundIdx
      }
    }
    setCurrent(idx)
  }, [searchParams])

  // Reset current product when category changes
  useEffect(() => {
    setCurrent(0)
  }, [selectedCategory])

  const updateURL = (productIndex: number, category?: string) => {
    const targetCategory = category || selectedCategory
    const targetFilteredProducts = productMap[targetCategory] || []
    const safeIndex = Math.max(
      0,
      Math.min(productIndex, targetFilteredProducts.length - 1)
    )
    const product = targetFilteredProducts[safeIndex]
    if (!product) return
    const params = new URLSearchParams(searchParams.toString())
    params.set('produkt', product.slug)
    params.set('kategorie', targetCategory)
    router.push(`?${params.toString()}`, { scroll: false })
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    setCurrent(0)
    updateURL(0, category)
  }

  const handlePrev = () => {
    const newIndex = current === 0 ? filteredProducts.length - 1 : current - 1
    setCurrent(newIndex)
    updateURL(newIndex)
  }

  const handleNext = () => {
    const newIndex = current === filteredProducts.length - 1 ? 0 : current + 1
    setCurrent(newIndex)
    updateURL(newIndex)
  }

  const handleSelect = (idx: number) => {
    setCurrent(idx)
    updateURL(idx)
  }

  const product = filteredProducts[current] || filteredProducts[0]
  if (!product) {
    return null
  }

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
          {/* Category Selector */}
          <div className='flex justify-center mb-8'>
            <div className='flex bg-zinc-800/50 p-1 backdrop-blur-sm'>
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  className={cn(
                    'px-6 py-2 text-sm font-medium transition-all duration-200 cursor-pointer',
                    selectedCategory === category.id
                      ? 'bg-brand-primary text-brand-action shadow-lg'
                      : 'text-brand-primary hover:bg-zinc-700/50'
                  )}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          <div className='flex flex-col md:grid md:grid-cols-[1.2fr_1fr] gap-8 items-stretch mt-8'>
            <div className='flex-1 md:hidden flex items-center justify-center'>
              <AnimatePresence mode='wait'>
                <motion.img
                  key={product.image}
                  src={product.image}
                  alt={product.name}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.5 }}
                  className='max-h-[300px] drop-shadow-2xl animate-bottle'
                />
              </AnimatePresence>
            </div>
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
                  {product.stats.map(
                    (stat: { label: string; value: string }) => (
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
                    )
                  )}
                </div>
                <div className='flex justify-between'>
                  <div className='flex gap-4'>
                    <button
                      onClick={handlePrev}
                      className='size-10 rounded-full border border-zinc-500 flex items-center justify-center text-brand-primary hover:bg-brand-secondary/10 transition disabled:opacity-50 cursor-pointer'
                      aria-label='Previous product'
                    >
                      &#8592;
                    </button>
                    <button
                      onClick={handleNext}
                      aria-label='Next product'
                      className='size-10 rounded-full border border-zinc-500 flex items-center justify-center text-brand-primary hover:bg-brand-secondary/10 transition disabled:opacity-50 cursor-pointer'
                    >
                      &#8594;
                    </button>
                  </div>
                  <Dialog>
                    <DialogTrigger className='bg-brand-primary text-brand-action font-bold py-2 px-4 cursor-pointer hover:opacity-90 transition'>
                      Složení
                    </DialogTrigger>
                    <DialogContent className='bg-brand-primary'>
                      <DialogHeader>
                        <DialogTitle className='text-brand-action text-2xl'>
                          Složení a Alergeny
                        </DialogTitle>
                      </DialogHeader>

                      <div>
                        <p>1. fdk sjfsk fja</p>
                        <p>2. fdk sjfsk fja</p>
                        <p>3. fdk sjfsk fja</p>
                        <p>4. fdk sjfsk fja</p>
                        <p>5. fdk sjfsk fja</p>
                        <p>6. fdk sjfsk fja</p>
                        <p>7. fdk sjfsk fja</p>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
              {/* Bottle icon selector */}
              <div className='flex gap-2 mt-auto'>
                {filteredProducts.map((p: Product, idx: number) => (
                  <motion.button
                    key={p.name}
                    onClick={() => handleSelect(idx)}
                    className={`rounded-full border-2 cursor-pointer ${
                      current === idx
                        ? 'border-brand-secondary'
                        : 'border-transparent'
                    } bg-zinc-800`}
                    whileTap={{ scale: 0.9 }}
                    animate={{ scale: current === idx ? 1.1 : 1 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    aria-label={`Select ${p.name}`}
                  >
                    <img
                      src={p.icon}
                      alt={p.name}
                      className='size-12 md:size-14 object-cover rounded-full'
                    />
                  </motion.button>
                ))}
              </div>
            </div>
            {/* Right: Product Image */}
            <div className='flex-1 hidden md:flex items-center justify-center'>
              <AnimatePresence mode='wait'>
                <motion.img
                  key={product.image}
                  src={product.image}
                  alt={product.name}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.5 }}
                  className='max-h-[470px] drop-shadow-2xl animate-bottle'
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
