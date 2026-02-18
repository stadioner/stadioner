'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { useLanguage } from '@/store/use-language'
import { AnimatePresence } from 'framer-motion'
import { NavItem } from '@/components/layout/navbar/nav-item'
import { Border } from '@/components/border'
import { LanguageSelector } from '@/components/layout/navbar/language-selector'
import { Menu } from './menu'
import { Container } from '@/components/container'

export const Navbar = () => {
  const { language } = useLanguage()
  const localizedRootPath = `/${language}`

  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <>
      <nav
        className={cn(
          'fixed left-0 right-0 top-7 z-[1001] md:grid items-center transition hidden',
        )}
      >
        <Container className='w-full'>
          <Border background>
            <div
              className={cn(
                'flex justify-between items-center h-full w-full px-4 bg-brand-secondary shadow-sm py-2',
              )}
            >
              <div>
                <ul className='flex items-center gap-6'>
                  <NavItem
                    label={
                      language === 'cs'
                        ? 'Produkty / E-shop'
                        : language === 'en'
                          ? 'Products / E-shop'
                          : language === 'de'
                            ? 'Produkte / E-shop'
                            : ''
                    }
                    href={`${localizedRootPath}/produkty`}
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
                    href={`${localizedRootPath}/prodejni-mista`}
                  />
                  <NavItem
                    label={
                      language === 'cs'
                        ? 'Pro Firmy'
                        : language === 'en'
                          ? 'For Companies'
                          : language === 'de'
                            ? 'Für Unternehmen'
                            : ''
                    }
                    href={`${localizedRootPath}/pro-firmy`}
                  />
                </ul>
              </div>

              <div className='absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2'>
                <Border rounded background>
                  <Link
                    href={localizedRootPath}
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
                        ? 'Události'
                        : language === 'en'
                          ? 'Events'
                          : language === 'de'
                            ? 'Veranstaltungen'
                            : ''
                    }
                    href={`${localizedRootPath}/udalosti`}
                  />
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
                    href={`${localizedRootPath}/clanky`}
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
                    href={`${localizedRootPath}/historie`}
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
                    href={`${localizedRootPath}/kontakt`}
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
          'fixed left-0 right-0 top-5 z-[1001] mx-auto grid items-center transition md:hidden',
        )}
      >
        <Container className='w-full'>
          <Border background>
            <div
              className={cn(
                'flex justify-between items-center h-full w-full px-4 bg-brand-secondary shadow-sm py-1',
              )}
            >
              <LanguageSelector />

              <div className='absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2'>
                <Border rounded background>
                  <Link
                    href={localizedRootPath}
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
