'use client'

import Image from 'next/image'
import { Border } from '@/components/border'
import { Container } from '@/components/container'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/store/use-language'
import {
  MAX_ENTRANCE_FEE_CZK,
  MAX_GUESTS,
  MIN_ENTRANCE_FEE_CZK,
  MIN_GUESTS,
  TAKEOVER_BEERS,
  formatCzk
} from '@/lib/takeover/pricing'
import { useTakeoverCalculator } from './calculator-context'
import { getTakeoverLanguage, takeoverContent } from './content'

const localeMap = {
  cs: 'cs-CZ',
  en: 'en-GB',
  de: 'de-DE'
} as const

export const TakeoverProfitCalculator = () => {
  const { language } = useLanguage()
  const lang = getTakeoverLanguage(language)
  const copy = takeoverContent[lang].calculator
  const numberLocale = localeMap[lang]
  const {
    guests,
    entranceFeeCzk,
    selectedBeerIds,
    glassesExtra,
    equipmentExtra,
    setGuests,
    setEntranceFeeCzk,
    toggleBeer,
    setGlassesExtra,
    setEquipmentExtra,
    result
  } = useTakeoverCalculator()

  return (
    <section
      id='takeover-calculator'
      className='bg-brand-action scroll-mt-16 py-10 md:py-12'
    >
      <Container>
        <div className='max-w-3xl'>
          <h2 className='text-brand-primary text-3xl font-bold md:text-4xl lg:text-5xl'>
            {copy.title}
          </h2>
          <p className='text-brand-primary/90 mt-3 text-base md:text-lg'>
            {copy.description}
          </p>
        </div>

        <div className='mt-6 grid grid-cols-1 items-start gap-5 xl:grid-cols-[1.2fr_0.8fr]'>
          <Border backgroundLight>
            <div className='bg-brand-primary space-y-5 p-5 md:p-6'>
              <div className='space-y-4'>
                <label className='block'>
                  <div className='text-brand-action mb-1.5 flex items-center justify-between gap-3 text-sm font-semibold'>
                    <span>{copy.guestsLabel}</span>
                    <span>{guests}</span>
                  </div>
                  <input
                    type='range'
                    min={MIN_GUESTS}
                    max={MAX_GUESTS}
                    step={1}
                    value={guests}
                    onChange={(event) => setGuests(Number(event.target.value))}
                    className='accent-brand-action w-full cursor-pointer'
                  />
                </label>

                <label className='block'>
                  <div className='text-brand-action mb-1.5 flex items-center justify-between gap-3 text-sm font-semibold'>
                    <span>{copy.entranceLabel}</span>
                    <span>{formatCzk(entranceFeeCzk, numberLocale)}</span>
                  </div>
                  <input
                    type='range'
                    min={MIN_ENTRANCE_FEE_CZK}
                    max={MAX_ENTRANCE_FEE_CZK}
                    step={10}
                    value={entranceFeeCzk}
                    onChange={(event) =>
                      setEntranceFeeCzk(Number(event.target.value))
                    }
                    className='accent-brand-action w-full cursor-pointer'
                  />
                </label>
              </div>

              <div>
                <h3 className='text-brand-action mb-3 text-xl font-bold'>
                  {copy.beersTitle}
                </h3>
                <div className='grid grid-cols-1 gap-2.5 sm:grid-cols-2'>
                  {TAKEOVER_BEERS.map((beer) => {
                    const selected = selectedBeerIds.includes(beer.id)
                    const breakdown = result.perBeer.find(
                      (row) => row.beer.id === beer.id
                    )

                    return (
                      <button
                        key={beer.id}
                        type='button'
                        onClick={() => toggleBeer(beer.id)}
                        aria-pressed={selected}
                        className={`border-brand-action/40 flex cursor-pointer items-start gap-2.5 border p-2.5 text-left transition ${
                          selected ?
                            'bg-brand-secondary'
                          : 'bg-brand-primary/70 opacity-70'
                        }`}
                      >
                        <Image
                          src={beer.icon}
                          alt=''
                          width={36}
                          height={36}
                          className='size-9 shrink-0 object-contain'
                        />
                        <span className='min-w-0 flex-1'>
                          <span className='text-brand-action block text-sm font-bold leading-tight'>
                            {beer.name}
                          </span>
                          <span className='text-brand-action/80 mt-0.5 block text-xs'>
                            {formatCzk(beer.kegPriceCzk, numberLocale)} · 0,3 l{' '}
                            {formatCzk(beer.pour03Czk, numberLocale)}
                          </span>
                          {breakdown ?
                            <span className='text-brand-action/70 mt-0.5 block text-[11px] leading-tight'>
                              {copy.perBeerRemaining}{' '}
                              {breakdown.remainingGlasses} × 0,3 l ·{' '}
                              {formatCzk(
                                breakdown.remainingRevenueCzk,
                                numberLocale
                              )}
                            </span>
                          : null}
                        </span>
                      </button>
                    )
                  })}
                </div>
                {selectedBeerIds.length === 0 ?
                  <p className='text-brand-action mt-2 text-sm font-medium'>
                    {copy.emptySelection}
                  </p>
                : null}
              </div>

              <div>
                <h3 className='text-brand-action mb-2 text-lg font-bold'>
                  {copy.extrasTitle}
                </h3>
                <div className='space-y-1.5'>
                  <label className='text-brand-action flex cursor-pointer items-center gap-2.5 text-sm'>
                    <input
                      type='checkbox'
                      checked={glassesExtra}
                      onChange={(event) => setGlassesExtra(event.target.checked)}
                      className='accent-brand-action size-4 cursor-pointer'
                    />
                    {copy.glassesExtra}
                  </label>
                  <label className='text-brand-action flex cursor-pointer items-center gap-2.5 text-sm'>
                    <input
                      type='checkbox'
                      checked={equipmentExtra}
                      onChange={(event) =>
                        setEquipmentExtra(event.target.checked)
                      }
                      className='accent-brand-action size-4 cursor-pointer'
                    />
                    {copy.equipmentExtra}
                  </label>
                </div>
              </div>
            </div>
          </Border>

          <Border backgroundLight>
            <div className='bg-brand-primary sticky top-28 space-y-3 p-5 md:p-6'>
              <SummaryRow
                label={copy.tastingRevenue}
                value={formatCzk(result.tastingRevenueCzk, numberLocale)}
              />
              <SummaryRow
                label={copy.kegCost}
                value={`− ${formatCzk(result.kegCostCzk, numberLocale)}`}
              />
              <SummaryRow
                label={copy.tastingProfit}
                value={formatCzk(result.tastingProfitCzk, numberLocale)}
              />
              <SummaryRow
                label={copy.remainingRevenue}
                value={formatCzk(result.remainingRevenueCzk, numberLocale)}
              />

              <div className='border-brand-action/30 border-t pt-3'>
                <p className='text-brand-action/80 text-sm font-semibold tracking-wide uppercase'>
                  {copy.total}
                </p>
                <p className='text-brand-action mt-1 text-3xl font-bold md:text-4xl'>
                  {formatCzk(result.totalCzk, numberLocale)}
                </p>
              </div>

              <p className='text-brand-action/75 text-xs leading-relaxed'>
                {copy.depositNote} ({formatCzk(result.depositCzk, numberLocale)})
              </p>
              <p className='text-brand-action/75 text-xs leading-relaxed'>
                {copy.disclaimer}
              </p>

              <Button
                asChild
                variant='shop'
                size='lg'
                className='w-full'
              >
                <a href='#takeover-form'>{copy.ctaToForm}</a>
              </Button>
            </div>
          </Border>
        </div>
      </Container>
    </section>
  )
}

const SummaryRow = ({ label, value }: { label: string; value: string }) => (
  <div className='text-brand-action flex items-baseline justify-between gap-4'>
    <span className='text-sm'>{label}</span>
    <span className='text-right text-sm font-bold md:text-base'>{value}</span>
  </div>
)
