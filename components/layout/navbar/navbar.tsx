'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import Image from 'next/image'
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
          'fixed top-7 right-0 left-0 z-[1001] hidden items-center transition md:grid'
        )}
      >
        <Container className='w-full'>
          <Border background>
            <div
              className={cn(
                'bg-brand-secondary flex h-full w-full items-center justify-between px-4 py-2 shadow-sm'
              )}
            >
              <div>
                <ul className='flex items-center gap-6'>
                  <NavItem
                    label={
                      language === 'cs' ? 'Produkty / E-shop'
                      : language === 'en' ?
                        'Products / E-shop'
                      : language === 'de' ?
                        'Produkte / E-shop'
                      : ''
                    }
                    href={`${localizedRootPath}/produkty`}
                  />
                  <NavItem
                    label={
                      language === 'cs' ? 'Prodejní Místa'
                      : language === 'en' ?
                        'Sales Locations'
                      : language === 'de' ?
                        'Verkaufsstellen'
                      : ''
                    }
                    href={`${localizedRootPath}/prodejni-mista`}
                  />
                  <NavItem
                    label={
                      language === 'cs' ? 'Pro Firmy'
                      : language === 'en' ?
                        'For Companies'
                      : language === 'de' ?
                        'Für Unternehmen'
                      : ''
                    }
                    href={`${localizedRootPath}/pro-firmy`}
                  />
                </ul>
              </div>

              <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                <Border
                  rounded
                  background
                >
                  <Link
                    href={localizedRootPath}
                    className='bg-brand-secondary justify-self-center rounded-full transition duration-300'
                  >
                    <Image
                      src='/logo.svg'
                      alt='logo'
                      width={72}
                      height={72}
                      className='size-18 p-1'
                    />
                  </Link>
                </Border>
              </div>

              <div className='flex items-center'>
                <ul className='flex items-center gap-6'>
                  <NavItem
                    label={
                      language === 'cs' ? 'Události'
                      : language === 'en' ?
                        'Events'
                      : language === 'de' ?
                        'Veranstaltungen'
                      : ''
                    }
                    href={`${localizedRootPath}/udalosti`}
                  />
                  <NavItem
                    label={
                      language === 'cs' ? 'Články'
                      : language === 'en' ?
                        'Articles'
                      : language === 'de' ?
                        'Artikel'
                      : ''
                    }
                    href={`${localizedRootPath}/clanky`}
                  />
                  <NavItem
                    label={
                      language === 'cs' ? 'Historie'
                      : language === 'en' ?
                        'History'
                      : language === 'de' ?
                        'Geschichte'
                      : ''
                    }
                    href={`${localizedRootPath}/historie`}
                  />
                  <NavItem
                    label={
                      language === 'cs' ? 'Kontakt'
                      : language === 'en' ?
                        'Contact'
                      : language === 'de' ?
                        'Kontakt'
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
          'fixed top-5 right-0 left-0 z-[1001] mx-auto grid items-center transition md:hidden'
        )}
      >
        <Container className='w-full'>
          <Border background>
            <div
              className={cn(
                'bg-brand-secondary flex h-full w-full items-center justify-between px-4 py-1 shadow-sm'
              )}
            >
              <LanguageSelector />

              <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                <Border
                  rounded
                  background
                >
                  <Link
                    href={localizedRootPath}
                    className='bg-brand-secondary justify-self-center rounded-full transition duration-300'
                  >
                    <Image
                      src='/logo.svg'
                      alt='logo'
                      width={72}
                      height={72}
                      className='size-18 p-1'
                    />
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
