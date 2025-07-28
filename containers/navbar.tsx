'use client'

import { Container } from '@/components/container'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const NavLink = ({ href, label }: { href: string; label: string }) => {
  return (
    <li className='text-xl'>
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
  const scale = useTransform(scrollY, [0, 120], [3, 1])

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
        'fixed left-0 right-0 z-[1001] py-4 transition-colors duration-300',
        logoAtNormalScale
          ? 'bg-brand-primary/70 backdrop-blur-lg '
          : 'bg-transparent backdrop-blur-none n',
        logoAtNormalScale && 'border-b border-b-brand-action/20'
      )}
    >
      <Container
        className={cn(
          'flex items-center justify-between',
          logoAtNormalScale ? 'text-brand-action' : 'text-black'
        )}
      >
        <div className='flex justify-center items-center'>
          <Link href='/'>
            <motion.img
              src={logoAtNormalScale ? 'logo.svg' : 'logo.svg'}
              alt='Stadioner logo'
              style={
                pathname === '/'
                  ? { scale, originY: 0, originX: 0 }
                  : { scale: 1, originY: 0, originX: 0 }
              }
              className='size-12'
            />
          </Link>
        </div>
        <nav className='flex-1'>
          <ul
            className={cn(
              'flex gap-8 justify-end',
              logoAtNormalScale ? 'text-brand-action' : 'text-brand-action'
            )}
          >
            <NavLink href='/blog' label='Blog' />
            <NavLink href='/o-nas' label='O Nás' />
            <NavLink href='/kontakt' label='Kontakt' />
          </ul>
        </nav>
      </Container>
    </header>
  )
}
