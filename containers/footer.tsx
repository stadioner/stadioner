'use client'

import { Container } from '@/components/container'
import { useLanguage } from '@/store/use-language'
import { ExternalLinkIcon, FacebookIcon, InstagramIcon } from 'lucide-react'
import Link from 'next/link'

export const Footer = () => {
  const { language } = useLanguage()

  return (
    <footer className='bg-brand-secondary pt-20 pb-10'>
      <Container>
        <div className='grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-20 md:gap-10'>
          <div className='grid text-xl'>
            <h4 className='text-3xl font-bold text-brand-action'>
              {language === 'cs' && 'Odkazy'}
              {language === 'en' && 'Links'}
              {language === 'de' && 'Links'}
            </h4>
            <Link href='/'>
              {language === 'cs' && 'Domů'}
              {language === 'en' && 'Home'}
              {language === 'de' && 'Startseite'}
            </Link>
            <Link href='/produkty'>
              {language === 'cs' && 'Produkty'}
              {language === 'en' && 'Products'}
              {language === 'de' && 'Produkte'}
            </Link>
            <Link href='/prodejni-mista'>
              {language === 'cs' && 'Prodejní Místa'}
              {language === 'en' && 'Sales Locations'}
              {language === 'de' && 'Verkaufsstellen'}
            </Link>
            <Link href='/blog'>Blog</Link>
            <Link href='/historie'>
              {language === 'cs' && 'Historie'}
              {language === 'en' && 'History'}
              {language === 'de' && 'Geschichte'}
            </Link>
            <Link href='/kontakt'>
              {language === 'cs' && 'Kontakt'}
              {language === 'en' && 'Contact'}
              {language === 'de' && 'Kontakt'}
            </Link>
          </div>
          <div className='flex flex-col justify-self-center text-xl'>
            <h4 className='text-3xl font-bold text-brand-action'>
              {language === 'cs' && 'Produkty'}
              {language === 'en' && 'Products'}
              {language === 'de' && 'Produkte'}
            </h4>
            <Link href='/produkty?produkt=profesor-dvanactka&kategorie=pivo'>
              Profesor Dvanáctka
            </Link>
            {/* <Link href='/produkty?produkt=koutska-jedenactka&kategorie=pivo'>
              Koutská Jedenáctka
            </Link> */}
            <Link href='/produkty?produkt=limonada-pomeranc&kategorie=limo'>
              Limonáda Pomeranč
            </Link>
            <Link href='/produkty?produkt=limonada-citron&kategorie=limo'>
              Limonáda Citrón
            </Link>
            <Link href='/produkty?produkt=cola-mix&kategorie=limo'>
              Cola Mix
            </Link>
            <Link href='/produkty/?produkt=pramenita-voda-sycena&kategorie=voda'>
              Pramenitá Voda (Sycená)
            </Link>
            <Link href='/produkty/?produkt=pramenita-voda-nesycena&kategorie=voda'>
              Pramenitá Voda (Nesycená)
            </Link>
          </div>
          <div className='grid justify-between md:justify-self-end gap-4 text-xl'>
            <div>
              <h4 className='text-3xl font-bold text-brand-action'>
                {language === 'cs' && 'Adresa'}
                {language === 'en' && 'Address'}
                {language === 'de' && 'Adresse'}
              </h4>
              <p>Kout na Šumavě 2</p>
              <p>34502 Kout na Šumavě</p>
              <Link
                href='https://maps.app.goo.gl/XQF36VsckwAMPkmRA'
                target='_blank'
                className='text-zinc-700 inline-flex items-center gap-1 mt-2'
              >
                <ExternalLinkIcon size={15} />

                {language === 'cs' && 'Trasa'}
                {language === 'en' && 'Route'}
                {language === 'de' && 'Strecke'}
              </Link>
            </div>

            <div className='flex gap-4 w-min h-min'>
              <Link href='instagram.com' target='_blank'>
                <InstagramIcon size={25} className='stroke-brand-action' />
              </Link>
              <Link href='facebook.com' target='_blank'>
                <FacebookIcon size={25} className='stroke-brand-action' />
              </Link>
            </div>
          </div>
        </div>

        <p className='pt-14 text-xs text-center'>
          &copy; {new Date().getFullYear()} Stadioner
        </p>
      </Container>
    </footer>
  )
}
