'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { useLanguage } from '@/store/use-language'
import { AnimatePresence } from 'framer-motion'
import { NavItem } from '../../components/nav-item'
import { Border } from '@/components/border'
import { LanguageSelector } from '@/components/language-selector'
import { Menu } from './menu'
import { Container } from '@/components/container'

export const Navbar = () => {
  const { language } = useLanguage()

  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <>
      <nav
        className={cn(
          'fixed left-0 right-0 top-7 z-[1001] md:grid items-center transition hidden'
        )}
      >
        <Container className='w-full'>
          <Border background>
            <div
              className={cn(
                'flex justify-between items-center h-full w-full px-4 bg-brand-secondary shadow-sm py-2'
              )}
            >
              <div>
                <ul className='flex items-center gap-6'>
                  <NavItem
                    label={
                      language === 'cs'
                        ? 'Produkty'
                        : language === 'en'
                          ? 'Products'
                          : language === 'de'
                            ? 'Produkte'
                            : ''
                    }
                    href='/produkty'
                  />
                  <NavItem
                    label={
                      language === 'cs'
                        ? 'Prodejní Místa'
                        : language === 'en'
                          ? 'Sales Locations'
                          : language === 'de'
                            ? 'Verkaufsstellen'
                            : ''
                    }
                    href='/prodejni-mista'
                  />
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
                  <NavItem
                    label={
                      language === 'cs'
                        ? 'Články'
                        : language === 'en'
                          ? 'Articles'
                          : language === 'de'
                            ? 'Artikel'
                            : ''
                    }
                    href='/clanky'
                  />
                  <NavItem
                    label={
                      language === 'cs'
                        ? 'Historie'
                        : language === 'en'
                          ? 'History'
                          : language === 'de'
                            ? 'Geschichte'
                            : ''
                    }
                    href='/historie'
                  />
                  <NavItem
                    label={
                      language === 'cs'
                        ? 'Kontakt'
                        : language === 'en'
                          ? 'Contact'
                          : language === 'de'
                            ? 'Kontakt'
                            : ''
                    }
                    href='/kontakt'
                  />
                  <LanguageSelector />
                </ul>
              </div>
            </div>
          </Border>
        </Container>
      </nav>

      <nav
        className={cn(
          'fixed left-0 right-0 top-5 z-[1001] mx-auto grid items-center transition md:hidden'
        )}
      >
        <Container className='w-full'>
          <Border background>
            <div
              className={cn(
                'flex justify-between items-center h-full w-full px-4 bg-brand-secondary shadow-sm py-1'
              )}
            >
              <LanguageSelector />

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
                <button
                  onClick={() => setIsOpen(true)}
                  className='text-brand-action text-lg'
                >
                  Menu
                </button>
              </div>
            </div>
          </Border>
        </Container>
      </nav>

      <AnimatePresence>
        {isOpen && <Menu setIsOpen={setIsOpen} />}
      </AnimatePresence>
    </>
  )
}
