'use client'

import { Border } from '@/components/border'
import { Container } from '@/components/container'
import { useLanguage } from '@/store/use-language'
import { Facebook, Instagram, Mail, Phone } from 'lucide-react'
import Link from 'next/link'

export const Kontakt = () => {
  const { language } = useLanguage()

  return (
    <main className='bg-brand-primary pt-36 pb-20'>
      <Container className='grid md:grid-cols-2 gap-10'>
        <div>
          <div>
            <p className='font-bold text-xl'>
              STADIONER PIVOVAR KOUT NA ŠUMAVĚ s.r.o.
            </p>
            <p>Kout na Šumavě 2</p>
            <p>345 02 Kout na Šumavě</p>
            <p>IČO: 22478566</p>
            <p>
              {language === 'cs' && 'Datová schránka'}
              {language === 'en' && 'Data Box'}
              {language === 'de' && 'Datenschrank'}: ff59ze2
            </p>
          </div>

          <div className='mt-8'>
            <p className='font-semibold text-lg'>
              {language === 'cs' && 'Statutární orgán'}
              {language === 'en' && 'Statutory Body'}
              {language === 'de' && 'Geschäftsführer'}
            </p>
            <p className='font-bold'>Aleš Pech</p>
            <p>
              {language === 'cs' && 'Jednatel'}
              {language === 'en' && 'Managing Director'}
              {language === 'de' && 'Geschäftsführer'}
            </p>
            <p>
              {language === 'cs' && 'Datum vzniku funkce: 17. leden 2025'}
              {language === 'en' && 'Date of appointment: 17 January 2025'}
              {language === 'de' && 'Datum der Ernennung: 17. Januar 2025'}
            </p>
          </div>
          <div className='mt-8'>
            <p className='font-semibold text-lg'>
              {language === 'cs' && 'Kontakt'}
              {language === 'en' && 'Contact'}
              {language === 'de' && 'Kontakt'}
            </p>
            <div className='space-y-2'>
              <Link
                href='tel:+420111222333'
                className='flex items-center gap-2 hover:text-brand-action transition-colors'
              >
                <Phone size={18} />
                +420 111 222 333
              </Link>
              <Link
                href='mailto:info@stadioner.cz'
                className='flex items-center gap-2 hover:text-brand-action transition-colors'
              >
                <Mail size={18} />
                info@stadioner.cz
              </Link>
            </div>
          </div>

          <div className='mt-8'>
            <p className='font-semibold text-lg'>
              {language === 'cs' && 'Sociální sítě'}
              {language === 'en' && 'Social Media'}
              {language === 'de' && 'Soziale Medien'}
            </p>
            <div className='flex gap-4 mt-2'>
              <Link
                href='https://www.facebook.com/stadioner.cz'
                target='_blank'
                rel='noopener noreferrer'
                className='p-2 rounded-full bg-brand-action text-brand-primary hover:scale-[102%] transition'
                aria-label={
                  language === 'cs'
                    ? 'Facebook'
                    : language === 'en'
                      ? 'Facebook'
                      : 'Facebook'
                }
              >
                <Facebook size={20} />
              </Link>
              <Link
                href='https://www.instagram.com/stadioner.cz/'
                target='_blank'
                rel='noopener noreferrer'
                className='p-2 rounded-full bg-brand-action text-brand-primary hover:scale-[102%] transition'
                aria-label={
                  language === 'cs'
                    ? 'Instagram'
                    : language === 'en'
                      ? 'Instagram'
                      : 'Instagram'
                }
              >
                <Instagram size={20} />
              </Link>
              <Link
                href='https://www.tiktok.com/@stadioner.cz'
                target='_blank'
                rel='noopener noreferrer'
                className='p-2 rounded-full bg-brand-action text-brand-primary hover:scale-[102%] transition'
                aria-label={
                  language === 'cs'
                    ? 'TikTok'
                    : language === 'en'
                      ? 'TikTok'
                      : 'TikTok'
                }
              >
                <svg
                  width={20}
                  height={20}
                  viewBox='0 0 24 24'
                  fill='currentColor'
                  className='w-5 h-5'
                >
                  <path d='M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z' />
                </svg>
              </Link>
            </div>
          </div>
        </div>
        <Border>
          <iframe
            src='https://www.google.com/maps/embed/v1/place?q=pivovar+kout+na+sumave&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8'
            className='w-full h-[500px]'
          />
        </Border>
      </Container>
    </main>
  )
}
