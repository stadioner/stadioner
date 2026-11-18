/**
 * Temporary Advent 2026 openings at Šalanda.
 * Flip off / remove once the regular season resumes.
 */
export const SALANDA_ADVENT_RESERVATION_DATES = [
  '2026-12-06',
  '2026-12-13',
  '2026-12-20'
] as const

export type SalandaAdventReservationDate =
  (typeof SALANDA_ADVENT_RESERVATION_DATES)[number]

/** Reservations stay open through the last Advent date (local calendar day). */
export const isSalandaAdventReservationPeriod = (
  now: Date = new Date()
): boolean => {
  const last = SALANDA_ADVENT_RESERVATION_DATES.at(-1)
  if (!last) return false

  const [year, month, day] = last.split('-').map(Number)
  if (!year || !month || !day) return false

  const endOfLastDay = new Date(year, month - 1, day, 23, 59, 59, 999)
  return now.getTime() <= endOfLastDay.getTime()
}

export const isSalandaAdventReservationDate = (
  isoDate: string
): isoDate is SalandaAdventReservationDate =>
  (SALANDA_ADVENT_RESERVATION_DATES as readonly string[]).includes(isoDate)
