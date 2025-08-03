'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { useLanguage } from '@/store/use-language'
import { AnimatePresence } from 'framer-motion'
import { NavItem } from './nav-item'
import { Border } from '@/components/border'
import { LanguageSelector } from '@/components/language-selector'

export const Navbar = () => {
  const { language } = useLanguage()

  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <>
      <nav
        className={cn(
          'fixed left-0 right-0 top-7 z-[1001] mx-auto grid items-center px-14 transition'
        )}
      >
        <Border background>
          <div
            className={cn(
              'flex justify-between items-center h-full w-full px-4 bg-brand-secondary shadow-sm backdrop-blur-lg dark:bg-zinc-800/40 py-2'
            )}
          >
            <div>
              <ul className='flex items-center gap-6'>
                <NavItem label='Produkty' href='/produkty' />
                <NavItem label='Prodejní Místa' href='/prodejni-mista' />
              </ul>
            </div>

            <div className='absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2'>
              <Border rounded background>
                <Link
                  href='/'
                  className='transition duration-300 justify-self-center bg-brand-secondary rounded-full'
                >
                  <img src='/logo.svg' alt='logo' className='size-18 p-1' />
                </Link>
              </Border>
            </div>

            <div className='flex items-center'>
              <ul className='flex items-center gap-6'>
                <NavItem label='Blog' href='/blog' />
                <NavItem label='Historie' href='/historie' />
                <NavItem label='Kontakt' href='/kontakt' />
                <LanguageSelector />
              </ul>
            </div>
          </div>
        </Border>
      </nav>
      <AnimatePresence>
        {/* {isOpen && <MobileNavbar setIsOpen={setIsOpen} />} */}
      </AnimatePresence>
    </>
  )
}
