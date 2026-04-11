import { useMemo } from 'react'

/** Stable [0, 1) from index — same on server and client (no Math.random). */
function hash01(n: number): number {
  let s = Math.imul(n + 1, 0x9e37_79b1) >>> 0
  s ^= s >>> 16
  s = Math.imul(s, 0x85eb_ca6b) >>> 0
  s ^= s >>> 13
  s = Math.imul(s, 0xc2b2_ae35) >>> 0
  s ^= s >>> 16
  return (s >>> 0) / 4294967296
}

const VIEW_WIDTH = 1440
const HEIGHT = 20
const POINTS = 340

export const RippedPaperSVG = ({ flip = false }: { flip?: boolean }) => {
  const minY = 10
  const maxY = 20

  const path = useMemo(() => {
    let d = `M0,${(minY + maxY) / 2}`
    for (let i = 1; i <= POINTS; i++) {
      const x = Math.round((i * VIEW_WIDTH) / POINTS)
      const y = Math.round(hash01(i) * (maxY - minY) + minY)
      d += ` L${x},${y}`
    }
    d += ` L${VIEW_WIDTH},0 L0,0 Z`
    return d
  }, [minY, maxY])

  return (
    <svg
      viewBox={`0 0 ${VIEW_WIDTH} ${HEIGHT}`}
      width='100%'
      height={HEIGHT}
      preserveAspectRatio='none'
      style={{
        display: 'block',
        transform: flip ? 'scaleY(-1)' : undefined,
        border: 'none',
        outline: 'none',
        lineHeight: 0
      }}
    >
      <path
        d={path}
        fill='var(--color-brand-action)'
        stroke='none'
        strokeWidth='0'
      />
    </svg>
  )
}
