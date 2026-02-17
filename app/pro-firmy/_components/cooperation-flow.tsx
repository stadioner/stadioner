'use client'

import { Border } from '@/components/border'
import { Container } from '@/components/container'
import { useLanguage } from '@/store/use-language'
import { useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { b2bContent, getB2BLanguage } from './content'

export const B2BCooperationFlow = () => {
  const { language } = useLanguage()
  const copy = b2bContent[getB2BLanguage(language)]
  const shouldReduceMotion = useReducedMotion()

  const [isDesktop, setIsDesktop] = useState(false)
  const [progress, setProgress] = useState(0)
  const sectionRef = useRef<HTMLElement | null>(null)
  const trackViewportRef = useRef<HTMLDivElement | null>(null)
  const [viewportWidth, setViewportWidth] = useState(0)

  const interactiveDesktop = isDesktop && !shouldReduceMotion
  const steps = copy.cooperation.steps
  const visibleCards = 2
  const maxShiftSlots = Math.max(steps.length - visibleCards, 0)
  const gapPx = 24
  const desktopBaseVh = 190
  const desktopPerShiftVh = 75
  const desktopMinVh = 250

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1024px)')
    const updateDesktop = () => setIsDesktop(mediaQuery.matches)
    updateDesktop()
    mediaQuery.addEventListener('change', updateDesktop)
    return () => mediaQuery.removeEventListener('change', updateDesktop)
  }, [])

  useEffect(() => {
    if (!interactiveDesktop) {
      setProgress(0)
      return
    }

    let frameId = 0

    const updateProgress = () => {
      frameId = 0
      const section = sectionRef.current
      if (!section) return

      const rect = section.getBoundingClientRect()
      const maxScrollable = section.offsetHeight - window.innerHeight
      if (maxScrollable <= 0) {
        setProgress(0)
        return
      }

      const scrolledInside = Math.min(Math.max(-rect.top, 0), maxScrollable)
      setProgress(scrolledInside / maxScrollable)
    }

    const scheduleUpdate = () => {
      if (frameId) return
      frameId = window.requestAnimationFrame(updateProgress)
    }

    scheduleUpdate()
    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate)

    return () => {
      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)
      if (frameId) {
        window.cancelAnimationFrame(frameId)
      }
    }
  }, [interactiveDesktop])

  useEffect(() => {
    const viewport = trackViewportRef.current
    if (!viewport || !interactiveDesktop) {
      setViewportWidth(0)
      return
    }

    const updateWidth = () => {
      setViewportWidth(viewport.clientWidth)
    }

    updateWidth()
    const observer = new ResizeObserver(updateWidth)
    observer.observe(viewport)

    return () => observer.disconnect()
  }, [interactiveDesktop])

  const cardWidth =
    viewportWidth > 0
      ? (viewportWidth - gapPx * (visibleCards - 1)) / visibleCards
      : 0
  const slotWidth = cardWidth > 0 ? cardWidth + gapPx : 0
  const translateX = slotWidth > 0 ? progress * maxShiftSlots * slotWidth : 0

  return (
    <section
      id='b2b-flow'
      ref={sectionRef}
      className='bg-brand-primary'
      style={{
        height: interactiveDesktop
          ? `${Math.max(desktopBaseVh + maxShiftSlots * desktopPerShiftVh, desktopMinVh)}vh`
          : undefined,
      }}
    >
      {interactiveDesktop ? (
        <div className='sticky top-0 h-screen flex items-center overflow-hidden py-16'>
          <Container className='w-full'>
            <div className='max-w-3xl'>
              <h2 className='text-brand-action text-3xl md:text-4xl lg:text-5xl font-bold'>
                {copy.cooperation.title}
              </h2>
              <p className='mt-4 text-brand-action/90 text-lg'>
                {copy.cooperation.description}
              </p>
            </div>

            <div className='relative mt-10'>
              <div ref={trackViewportRef} className='overflow-hidden'>
                <div
                  className='flex gap-6 will-change-transform'
                  style={{ transform: `translate3d(-${translateX}px, 0, 0)` }}
                >
                  {steps.map(step => (
                    <div
                      key={step.id}
                      className='shrink-0'
                      style={{
                        width:
                          cardWidth > 0
                            ? `${cardWidth}px`
                            : `calc((100% - ${gapPx}px) / 2)`,
                      }}
                    >
                      <Border background className='min-h-[40svh] h-full'>
                        <article className='h-full bg-brand-secondary px-8 py-10 lg:px-12 lg:py-14 flex flex-col justify-between'>
                          <p className='text-sm uppercase tracking-[0.14em] font-semibold text-brand-action/70'>
                            {step.badge}
                          </p>
                          <h3 className='mt-3 text-4xl lg:text-6xl font-bold text-brand-action leading-[0.95] max-w-3xl'>
                            {step.title}
                          </h3>
                          <p className='mt-4 text-lg lg:text-2xl text-brand-action/90 max-w-3xl'>
                            {step.description}
                          </p>
                        </article>
                      </Border>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </div>
      ) : (
        <Container className='py-20'>
          <div className='max-w-3xl'>
            <h2 className='text-brand-action text-3xl md:text-4xl lg:text-5xl font-bold'>
              {copy.cooperation.title}
            </h2>
            <p className='mt-4 text-brand-action/90 text-lg'>
              {copy.cooperation.description}
            </p>
          </div>

          <div className='mt-8 grid gap-4'>
            {steps.map(step => (
              <Border key={step.id} background>
                <article className='bg-brand-secondary p-6 md:p-8'>
                  <p className='text-sm uppercase tracking-[0.14em] font-semibold text-brand-action/70'>
                    {step.badge}
                  </p>
                  <h3 className='mt-2 text-2xl md:text-3xl font-bold text-brand-action'>
                    {step.title}
                  </h3>
                  <p className='mt-3 text-brand-action/90 text-lg'>
                    {step.description}
                  </p>
                </article>
              </Border>
            ))}
          </div>
        </Container>
      )}
    </section>
  )
}
