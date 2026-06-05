'use client'

import { useMemo } from 'react'
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
import { formatSalandaWeekRange } from '@/lib/salanda/format-week-range'
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

  const weekRangeLabel =
    weeklyProgram ?
      formatSalandaWeekRange(
        weeklyProgram.weekStart,
        weeklyProgram.weekEnd,
        currentLanguage
      )
    : ''

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
          <p className='text-brand-action mt-4'>{content.intro}</p>
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

              {weeklyProgram ?
                <div className='mt-4 space-y-5'>
                  <div>
                    <p className='text-brand-primary text-lg font-bold'>
                      {weeklyProgram.title}
                    </p>
                    {weekRangeLabel ?
                      <p className='mt-1 text-sm text-zinc-200'>
                        {weekRangeLabel}
                      </p>
                    : null}
                  </div>

                  <div className='space-y-4'>
                    {weeklyProgram.dayGroups.map((dayGroup) => (
                      <div
                        key={dayGroup.day}
                        className='border-t border-zinc-600 pt-4 first:border-t-0 first:pt-0'
                      >
                        <p className='text-brand-primary mb-2 font-bold'>
                          {dayGroup.label}
                        </p>

                        <ul className='space-y-3'>
                          {dayGroup.entries.map((entry, index) => (
                            <li
                              key={`${dayGroup.day}-${entry.title}-${index}`}
                              className='text-zinc-100'
                            >
                              <div className='flex flex-wrap items-baseline gap-x-3 gap-y-1'>
                                {entry.time ?
                                  <span className='text-brand-primary font-semibold whitespace-nowrap'>
                                    {entry.time}
                                  </span>
                                : null}
                                <span className='font-medium'>
                                  {entry.title}
                                </span>
                              </div>
                              {entry.description ?
                                <p className='mt-1 text-sm text-zinc-200'>
                                  {entry.description}
                                </p>
                              : null}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              : <p className='mt-4 text-zinc-200'>{content.programEmpty}</p>}
            </div>
          </Border>
        </div>
      </Container>
    </section>
  )
}
