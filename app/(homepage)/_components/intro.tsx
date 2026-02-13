'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export const Intro = () => {
  const [reveal, setReveal] = useState(false)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    const revealTimer = setTimeout(() => setReveal(true), 400)
    const fadeTimer = setTimeout(() => setFadeOut(true), 1800) // 800ms + 1.2s reveal
    return () => {
      clearTimeout(revealTimer)
      clearTimeout(fadeTimer)
    }
  }, [])

  return (
    <motion.div
      className='fixed top-0 left-0 h-screen w-screen bg-brand-secondary z-[1002] grid place-content-center'
      initial={{ opacity: 1 }}
      animate={{ opacity: fadeOut ? 0 : 1 }}
      transition={{ opacity: { duration: 0.3, ease: 'easeInOut' } }}
      style={{ pointerEvents: fadeOut ? 'none' : 'auto' }}
    >
      <div className='relative w-64 h-64 flex items-center justify-center'>
        {/* Bottom: Cream logo */}
        <img
          src='/logo-cream.svg'
          alt='Logo cream'
          className='absolute inset-0 w-full h-full object-contain'
        />
        {/* Top: Green logo, animates in from bottom to top */}
        <motion.img
          src='/logo.svg'
          alt='Logo green'
          className='absolute inset-0 w-full h-full object-contain'
          initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
          animate={{
            clipPath: reveal ? 'inset(0% 0% 0% 0%)' : 'inset(100% 0% 0% 0%)',
          }}
          transition={{ clipPath: { duration: 1.2, ease: 'easeInOut' } }}
        />
      </div>
    </motion.div>
  )
}
