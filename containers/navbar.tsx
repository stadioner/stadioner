'use client'

import { Container } from '@/components/container'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const NavLink = ({ href, label }: { href: string; label: string }) => {
  return (
    <li className='text-brand-action text-xl'>
      <Link href={href}>{label}</Link>
    </li>
  )
}

export const Navbar = () => {
  const pathname = usePathname()
  const [logoAtNormalScale, setLogoAtNormalScale] = useState(false)

  // Framer Motion scroll-based scaling
  const { scrollY } = useScroll()
  // Scale from 7 (top) to 1 (scrolled 120px or more)
  const scale = useTransform(scrollY, [0, 120], [6, 1])

  // Track when logo is at normal scale
  useEffect(() => {
    if (pathname === '/') {
      const unsubscribe = scale.on('change', v => {
        setLogoAtNormalScale(Number(v) <= 1.01) // allow for float rounding
      })
      return () => unsubscribe()
    } else {
      setLogoAtNormalScale(true)
    }
  }, [pathname, scale])

  return (
    <header
      className={cn(
        'bg-brand-primary/50 backdrop-blur fixed left-0 right-0 z-[1001] py-4',
        logoAtNormalScale && 'border-b border-b-brand-action/20'
      )}
    >
      <Container className='flex items-center justify-between'>
        {/* Left nav */}
        <nav className='flex-1'>
          <ul className='flex gap-8 justify-start'>
            <NavLink href='/produkty' label='Produkty' />
          </ul>
        </nav>
        {/* Center logo */}
        <div className='flex justify-center items-center'>
          <Link href='/'>
            <motion.img
              src='/logo.svg'
              alt='Stadioner logo'
              style={
                pathname === '/'
                  ? { scale, originY: 0, originX: 0.5 }
                  : { scale: 1, originY: 0, originX: 0.5 }
              }
              className='size-12'
            />
          </Link>
        </div>
        {/* Right nav */}
        <nav className='flex-1'>
          <ul className='flex gap-8 justify-end'>
            <NavLink href='/blog' label='Blog' />
            <NavLink href='/o-nas' label='O Nás' />
            <NavLink href='/kontakt' label='Kontakt' />
          </ul>
        </nav>
      </Container>
    </header>
  )
}
