'use client'

import { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Border } from '@/components/border'

interface TimelineSlide {
  id: number
  year: string
  description: string
  image: string
}

const timelineData: TimelineSlide[] = [
  {
    id: 1,
    year: '1736',
    description:
      'Pivovar Kout na Šumavě pak vznikl v roce 1736 pod správou rodu Stadionů, jejichž erb dodnes zdobí logo.',
    image: '/history/1.webp',
  },

  {
    id: 2,
    year: '1838',
    description:
      'Dne 2. července došlo v areálu pivovaru k ničivému požáru, který ho zcela zničil, včetně bytu sládka a sýpky. Tímto incidentem končí jedna etapa jeho existence.',

    image: '/history/2.webp',
  },
  {
    id: 3,
    year: '1849 - 1870',
    description:
      'Po požáru se hrabě Karel Bedřich Stadion-Thannhausen rozhodl postavit nový, modernější pivovar s větší kapacitou. V tomto období, konkrétně v roce 1870, byly pod kostelem vybudovány unikátní pivovarské sklepy.',
    image: '/history/3.webp',
  },
  {
    id: 4,
    year: '1933',
    description:
      'Sladovna, nejstarší dochovaná část pivovaru, byla naposledy upravena a zvýšena o patro. Jednalo se o poslední velkou stavební úpravu na pivovaru před jeho pozdějším uzavřením a následným úpadkem.',
    image: '/history/1.webp',
  },
  {
    id: 5,
    year: '1949 - 1966',
    description:
      'V důsledku únorových událostí byl pivovar znárodněn a začleněn do národního podniku. Poslední várka piva byla uvařena v roce 1966, poté se provoz změnil na výrobnu sodovek a stáčírnu.',
    image: '/history/1.webp',
  },
  {
    id: 6,
    year: '1971 - 1993',
    description:
      'Po definitivním uzavření v roce 1971 začal areál chátrat. Symbolickým koncem původního pivovaru se stal rok 1993, kdy byly původní měděné kádě z varny vymontovány a prodány do sběru.',
    image: '/history/1.webp',
  },
  {
    id: 7,
    year: '2002 - 2005',
    description:
      'V roce 2002 zakoupil chátrající areál Jan Skala. Společně s bývalým sládkem Bohuslavem Hlavsou začal pracovat na obnovení pivovarnické tradice a renovaci celého komplexu.',
    image: '/history/1.webp',
  },
  {
    id: 8,
    year: '2006',
    description:
      'Dne 27. března byla uvařena první várka piva, čímž byl pivovar v Koutě na Šumavě oficiálně znovu otevřen. Značka se tak navrátila na mapu regionálního pivovarnictví.',
    image: '/history/1.webp',
  },
  {
    id: 9,
    year: '2010',
    description:
      'Koutské pivo slavilo velký úspěch, když získalo první místo v prestižní soutěži "Dvanáctka roku 2010". Tento úspěch potvrdil kvalitu piva a jeho rostoucí popularitu.',
    image: '/history/1.webp',
  },
]

export const Timeline = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down')

  const nextSlide = useCallback(() => {
    if (!isScrolling) {
      setIsScrolling(true)
      setScrollDirection('down')
      setCurrentSlide(prev => Math.min(prev + 1, timelineData.length - 1))
      setTimeout(() => setIsScrolling(false), 1000)
    }
  }, [isScrolling, currentSlide])

  const prevSlide = useCallback(() => {
    if (!isScrolling) {
      setIsScrolling(true)
      setScrollDirection('up')
      setCurrentSlide(prev => Math.max(prev - 1, 0))
      setTimeout(() => setIsScrolling(false), 1000)
    }
  }, [isScrolling, currentSlide])

  const goToSlide = (index: number) => {
    if (!isScrolling) {
      setIsScrolling(true)
      setScrollDirection(index > currentSlide ? 'down' : 'up')
      setCurrentSlide(index)
      setTimeout(() => setIsScrolling(false), 1000)
    }
  }

  // Handle mouse wheel scroll
  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout | null = null
    let lastScrollTime = 0

    const handleWheel = (e: Event) => {
      e.preventDefault()
      const wheelEvent = e as WheelEvent
      const now = Date.now()

      // Prevent rapid scrolling - minimum 500ms between scrolls
      if (now - lastScrollTime < 500) {
        return
      }

      if (!isScrolling) {
        lastScrollTime = now

        // Clear any existing timeout
        if (scrollTimeout) {
          clearTimeout(scrollTimeout)
        }

        // Debounce the scroll action
        scrollTimeout = setTimeout(() => {
          if (wheelEvent.deltaY > 0) {
            // Scrolling down - next slide
            nextSlide()
          } else {
            // Scrolling up - previous slide
            prevSlide()
          }
        }, 100)
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isScrolling) {
        if (e.key === 'ArrowDown' || e.key === ' ') {
          e.preventDefault()
          nextSlide()
        } else if (e.key === 'ArrowUp') {
          e.preventDefault()
          prevSlide()
        }
      }
    }

    const element = document.querySelector('.timeline-container')
    if (element) {
      element.addEventListener('wheel', handleWheel, { passive: false })
      document.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      if (element) {
        element.removeEventListener('wheel', handleWheel)
      }
      document.removeEventListener('keydown', handleKeyDown)
      if (scrollTimeout) {
        clearTimeout(scrollTimeout)
      }
    }
  }, [nextSlide, prevSlide, isScrolling])

  return (
    <section className='relative h-screen overflow-hidden timeline-container bg-brand-action'>
      {/* Background Image */}
      <AnimatePresence mode='wait'>
        <motion.div
          key={currentSlide}
          className='absolute inset-0 bg-cover bg-center bg-no-repeat'
          style={{
            backgroundImage: `url(${timelineData[currentSlide].image})`,
          }}
          initial={{
            opacity: 0.1,
            scale: 0.9,
            filter: 'blur(5px)',
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
            filter: 'blur(0px)',
          }}
          exit={{
            opacity: 0.8,
            y: scrollDirection === 'down' ? '-100%' : '100%',
            scale: 1.05,
            filter: 'blur(5px)',
          }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          <div className='absolute inset-0 bg-black/40' />
        </motion.div>
      </AnimatePresence>

      {/* Timeline Navigation */}
      <div className='absolute left-4 md:left-18 top-1/2 -translate-y-1/2 z-20'>
        <div className='relative flex flex-col h-[500px]'>
          <div className='absolute left-1/2 top-0 bottom-0 w-0.5 bg-brand-primary/30 transform -translate-x-1/2' />

          {/* Timeline items */}
          {timelineData.map((slide, index) => (
            <div key={slide.id} className='relative flex-1 flex items-center'>
              {/* Timeline dot */}
              <button
                onClick={() => goToSlide(index)}
                className={`absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 transition-all duration-300 z-10 ${
                  index === currentSlide
                    ? 'bg-brand-primary border-brand-primary scale-125'
                    : 'bg-transparent border-brand-primary/50 hover:border-brand-primary'
                }`}
              >
                {index === currentSlide && (
                  <motion.div
                    className='absolute inset-1 bg-brand-primary rounded-full'
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </button>

              {/* Year label */}
              <div className='absolute left-5 top-1/2 -translate-y-1/2 text-brand-primary whitespace-nowrap text-sm'>
                {slide.year}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className='relative z-10 h-full flex items-center'>
        <div className='container mx-auto pl-32 pr-2'>
          <AnimatePresence mode='wait'>
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
              className='max-w-2xl'
            >
              <Border>
                <div className='bg-brand-action-dark/70 backdrop-blur-sm p-8'>
                  <motion.h2
                    className='text-4xl font-bold text-brand-primary mb-4'
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    {timelineData[currentSlide].year}
                  </motion.h2>
                  <motion.p
                    className='text-white/90 text-lg leading-relaxed'
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                  >
                    {timelineData[currentSlide].description}
                  </motion.p>
                </div>
              </Border>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Arrows */}
      <div className='absolute bottom-8 right-8 z-10 flex gap-4'>
        <motion.button
          onClick={prevSlide}
          className='w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50'
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          disabled={currentSlide === 0}
        >
          <svg
            className='w-6 h-6 text-white'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M5 15l7-7 7 7'
            />
          </svg>
        </motion.button>
        <motion.button
          onClick={nextSlide}
          className='w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50'
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          disabled={currentSlide === timelineData.length - 1}
        >
          <svg
            className='w-6 h-6 text-white'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M19 9l-7 7-7-7'
            />
          </svg>
        </motion.button>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className='absolute bottom-4 left-1/2 -translate-x-1/2 z-10'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <div className='flex flex-col items-center text-white/60 text-sm'>
          <motion.div
            className='w-0.5 h-8 bg-white/30 mb-2'
            animate={{ height: [32, 16, 32] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
          <span>Otočte kolečkem myši</span>
        </div>
      </motion.div>
    </section>
  )
}
