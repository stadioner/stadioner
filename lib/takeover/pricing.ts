export interface TakeoverBeer {
  id: string
  name: string
  kegPriceCzk: number
  pour03Czk: number
  icon: string
}

/** Model from Tap Takeover flyer — 20 L kegs, wholesale + recommended 0.3 L retail. */
export const TAKEOVER_BEERS: readonly TakeoverBeer[] = [
  {
    id: 'pozarnik',
    name: 'Požárník 10°',
    kegPriceCzk: 980,
    pour03Czk: 29,
    icon: '/products/pivo/pozarnik/icon.svg'
  },
  {
    id: 'profesor',
    name: 'Profesor 12°',
    kegPriceCzk: 1040,
    pour03Czk: 35,
    icon: '/products/pivo/profesor/icon.svg'
  },
  {
    id: 'maorihead',
    name: 'Maorihead IPL 13°',
    kegPriceCzk: 1560,
    pour03Czk: 38,
    icon: '/products/pivo/maorihead/icon.webp'
  },
  {
    id: 'inuithead',
    name: 'Inuithead NEIPA 15°',
    kegPriceCzk: 1720,
    pour03Czk: 39,
    icon: '/products/pivo/inuithead/icon.webp'
  },
  {
    id: 'safar',
    name: 'Šafář 15°',
    kegPriceCzk: 1160,
    pour03Czk: 38,
    icon: '/products/pivo/safar/icon.svg'
  },
  {
    id: 'bednar',
    name: 'Bednář černé 15°',
    kegPriceCzk: 1320,
    pour03Czk: 33,
    icon: '/products/pivo/bednar/icon.webp'
  }
] as const

export const DEFAULT_SELECTED_BEER_IDS = TAKEOVER_BEERS.map((beer) => beer.id)

export const KEG_LITERS = 20
export const POUR_LITERS = 0.3
export const DEPOSIT_PER_KEG_CZK = 2000
export const DEFAULT_GUESTS = 30
export const DEFAULT_ENTRANCE_FEE_CZK = 300
export const MIN_GUESTS = 10
export const MAX_GUESTS = 120
export const MIN_ENTRANCE_FEE_CZK = 100
export const MAX_ENTRANCE_FEE_CZK = 600

/** At 30 guests the flyer assumes half a keg remains → 10 L tasting / 30 guests. */
export const TASTING_LITERS_PER_GUEST_PER_BEER = 10 / DEFAULT_GUESTS

export interface TakeoverBeerBreakdown {
  beer: TakeoverBeer
  consumedLiters: number
  remainingLiters: number
  remainingGlasses: number
  remainingRevenueCzk: number
}

export interface TakeoverProfitResult {
  selectedBeers: TakeoverBeer[]
  kegCostCzk: number
  tastingRevenueCzk: number
  tastingProfitCzk: number
  remainingRevenueCzk: number
  totalCzk: number
  depositCzk: number
  perBeer: TakeoverBeerBreakdown[]
}

export interface TakeoverCalculatorInput {
  guests: number
  entranceFeeCzk: number
  selectedBeerIds: readonly string[]
}

export function calculateTakeoverProfit(
  input: TakeoverCalculatorInput
): TakeoverProfitResult {
  const selectedBeers = TAKEOVER_BEERS.filter((beer) =>
    input.selectedBeerIds.includes(beer.id)
  )

  const kegCostCzk = selectedBeers.reduce(
    (sum, beer) => sum + beer.kegPriceCzk,
    0
  )
  const tastingRevenueCzk = input.guests * input.entranceFeeCzk
  const tastingProfitCzk = tastingRevenueCzk - kegCostCzk

  const perBeer: TakeoverBeerBreakdown[] = selectedBeers.map((beer) => {
    const consumedLiters = Math.min(
      KEG_LITERS,
      input.guests * TASTING_LITERS_PER_GUEST_PER_BEER
    )
    const remainingLiters = Math.max(0, KEG_LITERS - consumedLiters)
    const remainingGlasses = Math.floor(remainingLiters / POUR_LITERS)
    const remainingRevenueCzk = remainingGlasses * beer.pour03Czk

    return {
      beer,
      consumedLiters,
      remainingLiters,
      remainingGlasses,
      remainingRevenueCzk
    }
  })

  const remainingRevenueCzk = perBeer.reduce(
    (sum, row) => sum + row.remainingRevenueCzk,
    0
  )

  return {
    selectedBeers,
    kegCostCzk,
    tastingRevenueCzk,
    tastingProfitCzk,
    remainingRevenueCzk,
    totalCzk: tastingProfitCzk + remainingRevenueCzk,
    depositCzk: selectedBeers.length * DEPOSIT_PER_KEG_CZK,
    perBeer
  }
}

export function formatCzk(value: number, locale: string = 'cs-CZ'): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'CZK',
    maximumFractionDigits: 0
  }).format(value)
}

export function buildCalculatorSnapshot(
  input: TakeoverCalculatorInput,
  result: TakeoverProfitResult,
  locale: string = 'cs-CZ'
): string {
  const beerLines = result.perBeer
    .map(
      (row) =>
        `- ${row.beer.name}: sud ${formatCzk(row.beer.kegPriceCzk, locale)}, zbývá ${row.remainingGlasses}×0,3 l ≈ ${formatCzk(row.remainingRevenueCzk, locale)}`
    )
    .join('\n')

  return [
    '--- Snapshot kalkulačky Tap Takeover ---',
    `Hosté: ${input.guests}`,
    `Vstupné: ${formatCzk(input.entranceFeeCzk, locale)} / osoba`,
    `Vybraná piva (${result.selectedBeers.length}):`,
    beerLines || '- (žádné)',
    `Nákup sudů: ${formatCzk(result.kegCostCzk, locale)}`,
    `Tržba ze vstupného: ${formatCzk(result.tastingRevenueCzk, locale)}`,
    `Zisk z degustace: ${formatCzk(result.tastingProfitCzk, locale)}`,
    `Tržba ze zbývajícího piva: ${formatCzk(result.remainingRevenueCzk, locale)}`,
    `Modelový zisk CELKEM: ${formatCzk(result.totalCzk, locale)}`,
    `Vratná kauce sudů: ${formatCzk(result.depositCzk, locale)}`
  ].join('\n')
}
