'use client'

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode
} from 'react'
import {
  DEFAULT_ENTRANCE_FEE_CZK,
  DEFAULT_GUESTS,
  DEFAULT_SELECTED_BEER_IDS,
  buildCalculatorSnapshot,
  calculateTakeoverProfit,
  type TakeoverCalculatorInput,
  type TakeoverProfitResult
} from '@/lib/takeover/pricing'

interface TakeoverCalculatorContextValue {
  guests: number
  entranceFeeCzk: number
  selectedBeerIds: string[]
  glassesExtra: boolean
  equipmentExtra: boolean
  setGuests: (value: number) => void
  setEntranceFeeCzk: (value: number) => void
  toggleBeer: (beerId: string) => void
  setGlassesExtra: (value: boolean) => void
  setEquipmentExtra: (value: boolean) => void
  input: TakeoverCalculatorInput
  result: TakeoverProfitResult
  getSnapshot: (locale?: string) => string
}

const TakeoverCalculatorContext =
  createContext<TakeoverCalculatorContextValue | null>(null)

export const TakeoverCalculatorProvider = ({
  children
}: {
  children: ReactNode
}) => {
  const [guests, setGuests] = useState(DEFAULT_GUESTS)
  const [entranceFeeCzk, setEntranceFeeCzk] = useState(DEFAULT_ENTRANCE_FEE_CZK)
  const [selectedBeerIds, setSelectedBeerIds] = useState<string[]>([
    ...DEFAULT_SELECTED_BEER_IDS
  ])
  const [glassesExtra, setGlassesExtra] = useState(true)
  const [equipmentExtra, setEquipmentExtra] = useState(false)

  const toggleBeer = useCallback((beerId: string) => {
    setSelectedBeerIds((prev) => {
      if (prev.includes(beerId)) {
        return prev.filter((id) => id !== beerId)
      }
      return [...prev, beerId]
    })
  }, [])

  const input = useMemo<TakeoverCalculatorInput>(
    () => ({
      guests,
      entranceFeeCzk,
      selectedBeerIds
    }),
    [guests, entranceFeeCzk, selectedBeerIds]
  )

  const result = useMemo(() => calculateTakeoverProfit(input), [input])

  const getSnapshot = useCallback(
    (locale: string = 'cs-CZ') => buildCalculatorSnapshot(input, result, locale),
    [input, result]
  )

  const value = useMemo<TakeoverCalculatorContextValue>(
    () => ({
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
      input,
      result,
      getSnapshot
    }),
    [
      guests,
      entranceFeeCzk,
      selectedBeerIds,
      glassesExtra,
      equipmentExtra,
      toggleBeer,
      input,
      result,
      getSnapshot
    ]
  )

  return (
    <TakeoverCalculatorContext.Provider value={value}>
      {children}
    </TakeoverCalculatorContext.Provider>
  )
}

export const useTakeoverCalculator = (): TakeoverCalculatorContextValue => {
  const context = useContext(TakeoverCalculatorContext)
  if (!context) {
    throw new Error(
      'useTakeoverCalculator must be used within TakeoverCalculatorProvider'
    )
  }
  return context
}
