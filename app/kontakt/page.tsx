'use client'

import { Border } from '@/components/border'
import { Container } from '@/components/container'
import { useLanguage } from '@/store/use-language'
import { Facebook, Instagram, Youtube, Mail, Phone } from 'lucide-react'
import Link from 'next/link'

export default function KontaktPage() {
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
              {language === 'cs' && 'Datum vzniku funkce'}
              {language === 'en' && 'Date of appointment'}
              {language === 'de' && 'Datum der Ernennung'}: 17. leden 2025
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
                href='https://facebook.com/stadioner'
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
                href='https://instagram.com/stadioner'
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
                href='https://youtube.com/@stadioner'
                target='_blank'
                rel='noopener noreferrer'
                className='p-2 rounded-full bg-brand-action text-brand-primary hover:scale-[102%] transition'
                aria-label={
                  language === 'cs'
                    ? 'YouTube'
                    : language === 'en'
                      ? 'YouTube'
                      : 'YouTube'
                }
              >
                <Youtube size={20} />
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
