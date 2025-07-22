'use client'

import { Container } from '@/components/container'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const NavLink = ({ href, label }: { href: string; label: string }) => {
  return (
    <li className='text-brand-secondary text-lg'>
      <Link href={href}>{label}</Link>
    </li>
  )
}

export const Navbar = () => {
  const [isTopOfTheScreen, setIsTopOfTheScreen] = useState<boolean>(true)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setIsTopOfTheScreen(true)
      }
      if (window.scrollY !== 0) setIsTopOfTheScreen(false)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={cn(
        'bg-brand-primary/50 backdrop-blur fixed left-0 right-0 z-50 py-4',
        !isTopOfTheScreen && 'border-b border-b-brand-secondary/10'
      )}
    >
      <Container className='flex justify-between items-center'>
        <Link href='/'>
          <img
            src='/logo.svg'
            alt='Stadioner logo'
            className={cn(
              'transition duration-500 size-12 origin-top',
              isTopOfTheScreen ? 'scale-[320%]' : 'scale-[100%]'
            )}
          />
        </Link>

        <nav>
          <ul className='flex gap-4'>
            <NavLink href='/o-nas' label='O Nás' />
            <NavLink href='/kontakt' label='Kontakt' />
          </ul>
        </nav>
      </Container>
    </header>
  )
}
