'use client'

import { NavItem } from '@/components/layout/navbar/nav-item'
import { useLanguage } from '@/store/use-language'
import { motion } from 'framer-motion'

interface MenuProps {
  setIsOpen: (state: boolean) => void
}

export const Menu = ({ setIsOpen }: MenuProps) => {
  const { language } = useLanguage()
  const localizedRootPath = `/${language}`

  return (
    <motion.div
      initial={{ scaleY: 0 }}
      animate={{
        scaleY: 1,
        transition: {
          duration: 0.5,
          ease: [0.12, 0, 0.39, 0]
        }
      }}
      exit={{
        scaleY: 0,
        transition: {
          duration: 0.5,
          ease: [0.22, 1, 0.36, 1]
        }
      }}
      className='bg-brand-action fixed top-0 left-0 z-[1002] grid h-screen w-screen origin-top justify-between'
    >
      <button
        onClick={() => setIsOpen(false)}
        className='text-brand-primary absolute top-11 right-11 cursor-pointer'
      >
        {language === 'cs' && 'Zavřít'}
        {language === 'en' && 'Close'}
        {language === 'de' && 'Zurück'}
      </button>

      <ul className='absolute top-60 left-1/2 z-[1003] flex -translate-x-1/2 flex-col items-center gap-6 text-center text-white'>
        <NavItem
          phone
          setIsOpen={setIsOpen}
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
          phone
          setIsOpen={setIsOpen}
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
          phone
          setIsOpen={setIsOpen}
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
        <NavItem
          phone
          setIsOpen={setIsOpen}
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
          phone
          setIsOpen={setIsOpen}
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
          phone
          setIsOpen={setIsOpen}
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
          phone
          setIsOpen={setIsOpen}
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
      </ul>
    </motion.div>
  )
}
