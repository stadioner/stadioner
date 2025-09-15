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
        <div className='space-y-8'>
          {/* Contact Information */}
          <div>
            <h2 className='text-2xl font-bold text-brand-action mb-4'>
              {language === 'cs' && 'Kontakt'}
              {language === 'en' && 'Contact'}
              {language === 'de' && 'Kontakt'}
            </h2>
            <div className='space-y-3'>
              <Link
                href='mailto:info@stadioner.cz'
                className='flex items-center gap-3 hover:text-brand-action transition-colors text-lg'
              >
                <Mail size={20} />
                info@stadioner.cz
              </Link>
            </div>
          </div>

          {/* Management & Team */}
          <div>
            <h2 className='text-2xl font-bold text-brand-action mb-4'>
              {language === 'cs' && 'Vedení a tým'}
              {language === 'en' && 'Management & Team'}
              {language === 'de' && 'Führung & Team'}
            </h2>
            <div className='space-y-6'>
              {/* Aleš Pech */}
              <div>
                <h3 className='text-lg font-semibold text-brand-action mb-2'>
                  {language === 'cs' && 'Majitel'}
                  {language === 'en' && 'Owner'}
                  {language === 'de' && 'Eigentümer'}
                </h3>
                <div className='space-y-2'>
                  <p className='font-bold'>Aleš Pech</p>
                  <Link
                    href='tel:+420601535416'
                    className='flex items-center gap-3 hover:text-brand-action transition-colors text-lg'
                  >
                    <Phone size={20} />
                    +420 601 535 416
                  </Link>
                </div>
              </div>

              {/* Tereza Plicová */}
              <div>
                <h3 className='text-lg font-semibold text-brand-action mb-2'>
                  {language === 'cs' && 'Obchodní oddělení'}
                  {language === 'en' && 'Sales Department'}
                  {language === 'de' && 'Verkaufsabteilung'}
                </h3>
                <div className='space-y-2'>
                  <p className='font-bold'>Tereza Plicová</p>
                  <Link
                    href='tel:+420721980257'
                    className='flex items-center gap-3 hover:text-brand-action transition-colors text-lg'
                  >
                    <Phone size={20} />
                    +420 721 980 257
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Legal Information */}
          <div className='pt-8 border-t border-gray-300'>
            <h2 className='text-2xl font-bold text-brand-action mb-4'>
              {language === 'cs' && 'Právní informace'}
              {language === 'en' && 'Legal Information'}
              {language === 'de' && 'Rechtliche Informationen'}
            </h2>
            <div className='space-y-2 text-sm'>
              <p className='font-bold text-lg'>
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
              <p className='text-sm'>
                {language === 'cs' && 'Datum vzniku funkce: 17. leden 2025'}
                {language === 'en' && 'Date of appointment: 17 January 2025'}
                {language === 'de' && 'Datum der Ernennung: 17. Januar 2025'}
              </p>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h2 className='text-2xl font-bold text-brand-action mb-4'>
              {language === 'cs' && 'Sociální sítě'}
              {language === 'en' && 'Social Media'}
              {language === 'de' && 'Soziale Medien'}
            </h2>
            <div className='flex gap-4'>
              <Link
                href='https://www.facebook.com/stadioner.cz'
                target='_blank'
                rel='noopener noreferrer'
                className='p-3 rounded-full bg-brand-action text-brand-primary hover:scale-[102%] transition'
                aria-label={
                  language === 'cs'
                    ? 'Facebook'
                    : language === 'en'
                      ? 'Facebook'
                      : 'Facebook'
                }
              >
                <Facebook size={24} />
              </Link>
              <Link
                href='https://www.instagram.com/stadioner.cz/'
                target='_blank'
                rel='noopener noreferrer'
                className='p-3 rounded-full bg-brand-action text-brand-primary hover:scale-[102%] transition'
                aria-label={
                  language === 'cs'
                    ? 'Instagram'
                    : language === 'en'
                      ? 'Instagram'
                      : 'Instagram'
                }
              >
                <Instagram size={24} />
              </Link>
              <Link
                href='https://www.tiktok.com/@stadioner.cz'
                target='_blank'
                rel='noopener noreferrer'
                className='p-3 rounded-full bg-brand-action text-brand-primary hover:scale-[102%] transition'
                aria-label={
                  language === 'cs'
                    ? 'TikTok'
                    : language === 'en'
                      ? 'TikTok'
                      : 'TikTok'
                }
              >
                <svg
                  width={24}
                  height={24}
                  viewBox='0 0 24 24'
                  fill='currentColor'
                >
                  <path d='M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z' />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        <div>
          <Border>
            <iframe
              src='https://www.google.com/maps/embed/v1/place?q=pivovar+kout+na+sumave&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8'
              className='w-full h-[500px]'
            />
          </Border>
        </div>
      </Container>
    </main>
  )
}
