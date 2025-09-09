'use client'

import { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Border } from '@/components/border'
import { useLanguage } from '@/store/use-language'

interface TimelineSlide {
  id: number
  year: string
  description: {
    cs: string
    en: string
    de: string
  }
  image: string
}

const timelineData: TimelineSlide[] = [
  {
    id: 1,
    year: '1736',
    description: {
      cs: 'Pivovar Kout na Šumavě vznikl v roce 1736 pod správou rodu Stadionů.',
      en: 'The Kout na Šumavě brewery was founded in 1736 under the management of the Stadion family.',
      de: 'Die Brauerei Kout na Šumavě wurde 1736 unter der Verwaltung der Familie Stadion gegründet.',
    },
    image: '/history/1.webp',
  },

  {
    id: 2,
    year: '1838',
    description: {
      cs: 'Dne 2. července došlo v areálu pivovaru k ničivému požáru, který ho zcela zničil, včetně bytu sládka a sýpky. Tímto incidentem končí jedna etapa jeho existence.',
      en: "On July 2nd, a devastating fire occurred in the brewery premises, completely destroying it, including the brewer's apartment and granary. This incident marked the end of one stage of its existence.",
      de: 'Am 2. Juli kam es zu einem verheerenden Brand im Brauereigelände, der es vollständig zerstörte, einschließlich der Wohnung des Braumeisters und des Getreidespeichers. Dieser Vorfall markierte das Ende einer Etappe seiner Existenz.',
    },
    image: '/history/2.webp',
  },
  {
    id: 3,
    year: '1849 - 1870',
    description: {
      cs: 'Po požáru se hrabě Karel Bedřich Stadion-Thannhausen rozhodl postavit nový, modernější pivovar s větší kapacitou. V tomto období, konkrétně v roce 1870, byly pod kostelem vybudovány unikátní pivovarské sklepy.',
      en: 'After the fire, Count Karel Bedřich Stadion-Thannhausen decided to build a new, more modern brewery with greater capacity. During this period, specifically in 1870, unique brewery cellars were built under the church.',
      de: 'Nach dem Brand entschied sich Graf Karel Bedřich Stadion-Thannhausen, eine neue, modernere Brauerei mit größerer Kapazität zu bauen. In dieser Zeit, konkret 1870, wurden unter der Kirche einzigartige Brauereikeller errichtet.',
    },
    image: '/history/3.webp',
  },
  {
    id: 4,
    year: '1933',
    description: {
      cs: 'Sladovna, nejstarší dochovaná část pivovaru, byla naposledy upravena a zvýšena o patro. Jednalo se o poslední velkou stavební úpravu na pivovaru před jeho pozdějším uzavřením a následným úpadkem.',
      en: 'The malt house, the oldest preserved part of the brewery, was last modified and raised by one floor. This was the last major construction modification to the brewery before its later closure and subsequent decline.',
      de: 'Die Mälzerei, der älteste erhaltene Teil der Brauerei, wurde zuletzt umgebaut und um ein Stockwerk erhöht. Dies war die letzte große bauliche Änderung an der Brauerei vor ihrer späteren Schließung und dem anschließenden Verfall.',
    },
    image: '/history/1.webp',
  },
  {
    id: 5,
    year: '1949 - 1966',
    description: {
      cs: 'V důsledku únorových událostí byl pivovar znárodněn a začleněn do národního podniku. Poslední várka piva byla uvařena v roce 1966, poté se provoz změnil na výrobnu sodovek a stáčírnu.',
      en: 'As a result of the February events, the brewery was nationalized and incorporated into a state enterprise. The last batch of beer was brewed in 1966, after which the operation changed to soda production and bottling.',
      de: 'Infolge der Februareignisse wurde die Brauerei verstaatlicht und in ein Staatsunternehmen eingegliedert. Die letzte Biercharge wurde 1966 gebraut, danach änderte sich der Betrieb zur Sodaproduktion und Abfüllung.',
    },
    image: '/history/1.webp',
  },
  {
    id: 6,
    year: '1971 - 1993',
    description: {
      cs: 'Po definitivním uzavření v roce 1971 začal areál chátrat. Symbolickým koncem původního pivovaru se stal rok 1993, kdy byly původní měděné kádě z varny vymontovány a prodány do sběru.',
      en: 'After the final closure in 1971, the premises began to deteriorate. The symbolic end of the original brewery came in 1993, when the original copper kettles from the brewhouse were dismantled and sold for scrap.',
      de: 'Nach der endgültigen Schließung 1971 begann das Gelände zu verfallen. Das symbolische Ende der ursprünglichen Brauerei kam 1993, als die ursprünglichen Kupferkessel aus dem Sudhaus demontiert und als Schrott verkauft wurden.',
    },
    image: '/history/1.webp',
  },
  {
    id: 7,
    year: '2002 - 2005',
    description: {
      cs: 'V roce 2002 zakoupil chátrající areál Jan Skala. Společně s bývalým sládkem Bohuslavem Hlavsou začal pracovat na obnovení pivovarnické tradice a renovaci celého komplexu.',
      en: 'In 2002, Jan Skala purchased the dilapidated premises. Together with former brewer Bohuslav Hlavsa, he began working on restoring the brewing tradition and renovating the entire complex.',
      de: '2002 kaufte Jan Skala das verfallene Gelände. Zusammen mit dem ehemaligen Braumeister Bohuslav Hlavsa begann er, an der Wiederherstellung der Brautradition und der Renovierung des gesamten Komplexes zu arbeiten.',
    },
    image: '/history/1.webp',
  },
  {
    id: 8,
    year: '2006',
    description: {
      cs: 'Dne 27. března byla uvařena první várka piva, čímž byl pivovar v Koutě na Šumavě oficiálně znovu otevřen. Značka se tak navrátila na mapu regionálního pivovarnictví.',
      en: 'On March 27th, the first batch of beer was brewed, officially reopening the brewery in Kout na Šumavě. The brand thus returned to the map of regional brewing.',
      de: 'Am 27. März wurde die erste Biercharge gebraut, wodurch die Brauerei in Kout na Šumavě offiziell wiedereröffnet wurde. Die Marke kehrte damit auf die Karte des regionalen Brauwesens zurück.',
    },
    image: '/history/1.webp',
  },
  {
    id: 9,
    year: '2010',
    description: {
      cs: 'Koutské pivo slavilo velký úspěch, když získalo první místo v prestižní soutěži "Dvanáctka roku 2010". Tento úspěch potvrdil kvalitu piva a jeho rostoucí popularitu.',
      en: 'Kout beer celebrated great success when it won first place in the prestigious "Beer of the Year 2010" competition. This success confirmed the quality of the beer and its growing popularity.',
      de: 'Kout-Bier feierte großen Erfolg, als es den ersten Platz im prestigeträchtigen Wettbewerb "Bier des Jahres 2010" gewann. Dieser Erfolg bestätigte die Qualität des Bieres und seine wachsende Popularität.',
    },
    image: '/history/1.webp',
  },
]

export const Timeline = () => {
  const { language } = useLanguage()
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
                    {
                      timelineData[currentSlide].description[
                        language as keyof (typeof timelineData)[0]['description']
                      ]
                    }
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
          <span>
            {language === 'cs' && 'Otočte kolečkem myši'}
            {language === 'en' && 'Scroll with mouse wheel'}
            {language === 'de' && 'Mit Mausrad scrollen'}
          </span>
        </div>
      </motion.div>
    </section>
  )
}
