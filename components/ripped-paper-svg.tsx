import { useMemo } from 'react'

export const RippedPaperSVG = ({ flip = false }: { flip?: boolean }) => {
  const width =
    typeof window !== 'undefined' && window.innerWidth < 768 ? 375 : 1440
  const height = 20
  const points =
    typeof window !== 'undefined' && window.innerWidth < 768 ? 120 : 340
  const minY = 10
  const maxY = 20

  const path = useMemo(() => {
    let d = `M0,${(minY + maxY) / 2}`
    for (let i = 1; i <= points; i++) {
      const x = Math.round((i * width) / points)
      const y = Math.round(Math.random() * (maxY - minY) + minY)
      d += ` L${x},${y}`
    }
    d += ` L${width},0 L0,0 Z`
    return d
  }, [width, height, points, minY, maxY])

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width='100%'
      height={height}
      preserveAspectRatio='none'
      style={{
        display: 'block',
        transform: flip ? 'scaleY(-1)' : undefined,
        border: 'none',
        outline: 'none',
        lineHeight: 0,
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
