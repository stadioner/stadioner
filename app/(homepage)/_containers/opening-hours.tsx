'use client'

import { Container } from '@/components/container'
import { RippedPaperSVG } from '@/components/ripped-paper-svg'
import { useLanguage } from '@/store/use-language'

const translations = {
  cs: {
    title: 'Otevírací doba výdejního místa',
    mon_wed: 'Pondělí – Středa',
    thu_fri: 'Čtvrtek – Pátek',
    sat: 'Sobota',
    sun: 'Neděle',
    closed: 'ZAVŘENO',
    thu_fri_time: '9:00 – 11:30 | 12:30 – 17:00',
    sat_time: '9:00 – 12:00',
    image_alt: 'Výdejní místo pivovaru Stadioner v zimě',
    address_title: 'Adresa',
    address_line1: 'Kout na Šumavě 2',
    address_line2: '345 02 Kout na Šumavě',
  },
  en: {
    title: 'Pickup Point Opening Hours',
    mon_wed: 'Monday – Wednesday',
    thu_fri: 'Thursday – Friday',
    sat: 'Saturday',
    sun: 'Sunday',
    closed: 'CLOSED',
    thu_fri_time: '9:00 – 11:30 | 12:30 – 17:00',
    sat_time: '9:00 – 12:00',
    image_alt: 'Stadioner brewery pickup point in winter',
    address_title: 'Address',
    address_line1: 'Kout na Šumavě 2',
    address_line2: '345 02 Kout na Šumavě',
  },
  de: {
    title: 'Öffnungszeiten der Abholstelle',
    mon_wed: 'Montag – Mittwoch',
    thu_fri: 'Donnerstag – Freitag',
    sat: 'Samstag',
    sun: 'Sonntag',
    closed: 'GESCHLOSSEN',
    thu_fri_time: '9:00 – 11:30 | 12:30 – 17:00',
    sat_time: '9:00 – 12:00',
    image_alt: 'Abholstelle der Brauerei Stadioner im Winter',
    address_title: 'Adresse',
    address_line1: 'Kout na Šumavě 2',
    address_line2: '345 02 Kout na Šumavě',
  },
}

export const OpeningHours = () => {
  const language = useLanguage(state => state.language)
  const t =
    translations[language as keyof typeof translations] || translations.cs

  return (
    <section className='bg-brand-action py-16 text-brand-primary relative'>
      <div
        className='absolute -top-4 left-0 w-full z-10'
        style={{ lineHeight: 0 }}
      >
        <RippedPaperSVG flip />
      </div>
      <Container>
        <div className='grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center'>
          {/* Text Content */}
          <div className='flex flex-col space-y-8'>
            <h2 className='text-3xl font-bold md:text-4xl lg:text-5xl'>
              {t.title}
            </h2>

            <div className='w-full space-y-4 text-lg md:text-xl'>
              {/* Mon - Wed */}
              <div className='border-brand-primary/20 flex items-center justify-between border-b pb-2'>
                <span>{t.mon_wed}</span>
                <span className='text-red-400 font-bold'>{t.closed}</span>
              </div>

              {/* Thu - Fri */}
              <div className='border-brand-primary/20 flex items-center justify-between border-b pb-2'>
                <span>{t.thu_fri}</span>
                <span className='font-bold'>{t.thu_fri_time}</span>
              </div>

              {/* Sat */}
              <div className='border-brand-primary/20 flex items-center justify-between border-b pb-2'>
                <span>{t.sat}</span>
                <span className='font-bold'>{t.sat_time}</span>
              </div>

              {/* Sun */}
              <div className='flex items-center justify-between pb-2'>
                <span>{t.sun}</span>
                <span className='text-red-400 font-bold'>{t.closed}</span>
              </div>
            </div>

            {/* Address Section */}
            <div className='border-brand-primary/20 pt-8 border-t'>
              <h3 className='mb-2 text-2xl font-bold'>{t.address_title}</h3>
              <address className='not-italic text-lg md:text-xl'>
                <p>{t.address_line1}</p>
                <p>{t.address_line2}</p>
              </address>
            </div>
          </div>

          {/* Image */}
          <img
            src='/vydejni-misto-zima.webp'
            alt={t.image_alt}
            className='w-full'
          />
        </div>
      </Container>
    </section>
  )
}
