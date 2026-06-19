'use client'

import { useMemo } from 'react'
import { Mail, Phone } from 'lucide-react'
import Link from 'next/link'
import { Border } from '@/components/border'
import { Container } from '@/components/container'
import {
  getSalandaSectionContent,
  salandaDayToRowKey
} from '@/lib/i18n/salanda-section'
import {
  isSupportedLanguage,
  type SupportedLanguage
} from '@/lib/i18n/site-languages'
import { salesLocationsSectionIds } from '@/lib/i18n/sales-locations-nav'
import { mapSalandaWeeklyProgram } from '@/lib/salanda/program-mapper'
import { cn } from '@/lib/utils'
import { useLanguage } from '@/store/use-language'
import type { SanitySalandaWeeklyProgram } from '@/types/salanda-program'

export const SalandaSection = ({
  program
}: {
  program: SanitySalandaWeeklyProgram | null
}) => {
  const language = useLanguage((state) => state.language)
  const currentLanguage: SupportedLanguage = isSupportedLanguage(language) ?
      language
    : 'cs'
  const content = getSalandaSectionContent(currentLanguage)
  const currentDayKey = salandaDayToRowKey[new Date().getDay()]

  const weeklyProgram = useMemo(
    () => mapSalandaWeeklyProgram(program, currentLanguage),
    [program, currentLanguage]
  )

  return (
    <section
      id={salesLocationsSectionIds.taproom}
      className='bg-brand-primary scroll-mt-36 py-12'
      aria-label={content.sectionTitle}
    >
      <Container>
        <div className='max-w-[100ch]'>
          <h2 className='text-brand-action text-3xl font-bold md:text-4xl lg:text-6xl'>
            {content.sectionTitle}
          </h2>
          <p className='text-brand-action/90 mt-1'>{content.address}</p>
          <div className='text-brand-action mt-4 space-y-3'>
            {content.introParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>

        <div className='mt-8 grid gap-6 lg:grid-cols-2 lg:items-start'>
          <Border backgroundLight>
            <div className='bg-brand-action p-5 md:p-6'>
              <h3 className='text-brand-primary text-2xl font-bold md:text-3xl'>
                {content.openingHoursTitle}
              </h3>

              <div className='mt-4 space-y-1'>
                {content.openingHours.map((row) => {
                  const isToday = row.key === currentDayKey

                  return (
                    <div
                      key={row.key}
                      className={cn(
                        'flex items-center justify-between px-3 py-2 text-zinc-100 transition-colors',
                        isToday && 'bg-brand-primary text-brand-action'
                      )}
                    >
                      <span className={cn(isToday && 'font-bold')}>
                        {row.label}
                      </span>
                      <span
                        className={cn(
                          'font-medium',
                          row.value === content.closedLabel &&
                            !isToday &&
                            'text-red-400',
                          isToday && 'font-bold'
                        )}
                      >
                        {row.value}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          </Border>

          <Border backgroundLight>
            <div className='bg-brand-action p-5 md:p-6'>
              <h3 className='text-brand-primary text-2xl font-bold md:text-3xl'>
                {content.programTitle}
              </h3>

              <div className='bg-brand-primary text-brand-action mt-4 border border-zinc-600/40 p-4'>
                <p className='font-bold'>{content.programContactTitle}</p>
                <p className='mt-2 text-sm leading-relaxed text-zinc-700'>
                  {content.programContactDescription}
                </p>
                <div className='mt-3 flex flex-col items-end gap-2 sm:flex-row sm:flex-wrap sm:justify-end sm:gap-x-5'>
                  <Link
                    href='mailto:info@stadioner.cz'
                    className='hover:text-brand-action/70 inline-flex items-center gap-2 text-sm font-semibold transition-colors'
                  >
                    <Mail className='size-4 shrink-0' aria-hidden />
                    info@stadioner.cz
                  </Link>
                  <Link
                    href='tel:+420721980257'
                    className='hover:text-brand-action/70 inline-flex items-center gap-2 text-sm font-semibold transition-colors'
                  >
                    <Phone className='size-4 shrink-0' aria-hidden />
                    +420 721 980 257
                  </Link>
                </div>
              </div>

              <div className='bg-brand-primary text-brand-action mt-4 border border-zinc-600/40 p-4'>
                <p className='font-bold'>{content.celebrationsTitle}</p>
                <p className='mt-2 text-sm leading-relaxed text-zinc-700'>
                  {content.celebrationsDescription}
                </p>
                <p className='mt-2 text-sm leading-relaxed text-zinc-700'>
                  {content.celebrationsContactHint}
                </p>
                <div className='mt-3 flex flex-col items-end gap-2 sm:flex-row sm:flex-wrap sm:justify-end sm:gap-x-5'>
                  <Link
                    href='mailto:info@stadioner.cz'
                    className='hover:text-brand-action/70 inline-flex items-center gap-2 text-sm font-semibold transition-colors'
                  >
                    <Mail className='size-4 shrink-0' aria-hidden />
                    info@stadioner.cz
                  </Link>
                  <Link
                    href='tel:+420721980257'
                    className='hover:text-brand-action/70 inline-flex items-center gap-2 text-sm font-semibold transition-colors'
                  >
                    <Phone className='size-4 shrink-0' aria-hidden />
                    +420 721 980 257
                  </Link>
                </div>
              </div>

              {weeklyProgram ?
                <ul className='mt-4 space-y-4'>
                  {weeklyProgram.entries.map((entry, index) => (
                    <li
                      key={`${entry.date}-${entry.title}-${index}`}
                      className='border-t border-zinc-600 pt-4 text-zinc-100 first:border-t-0 first:pt-0'
                    >
                      <div className='flex flex-wrap items-baseline gap-x-3 gap-y-1'>
                        {entry.dateLabel ?
                          <span className='text-brand-primary font-semibold whitespace-nowrap'>
                            {entry.dateLabel}
                          </span>
                        : null}
                        {entry.time ?
                          <span className='text-brand-primary font-semibold whitespace-nowrap'>
                            {entry.time}
                          </span>
                        : null}
                      </div>
                      <p className='mt-1 font-medium'>{entry.title}</p>
                      {entry.description ?
                        <p className='mt-1 text-sm text-zinc-200'>
                          {entry.description}
                        </p>
                      : null}
                    </li>
                  ))}
                </ul>
              : <p className='mt-4 text-zinc-200'>{content.programEmpty}</p>}
            </div>
          </Border>
        </div>
      </Container>
    </section>
  )
}
