import { useMemo } from 'react'

export const RippedPaperSVG = ({ flip = false }: { flip?: boolean }) => {
  const width = 1440
  const height = 20
  const points = 340
  const minY = 14
  const maxY = 19

  const path = useMemo(() => {
    let d = `M0,${(minY + maxY) / 2}`
    for (let i = 1; i <= points; i++) {
      const x = Math.round((i * width) / points)
      const y = Math.round(Math.random() * (maxY - minY) + minY)
      d += ` L${x},${y}`
    }
    d += ` L${width},0 L0,0 Z`
    return d
  }, [])

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width='100%'
      height={height}
      preserveAspectRatio='none'
      style={{ display: 'block', transform: flip ? 'scaleY(-1)' : undefined }}
    >
      <path d={path} fill='#3a492a' />
    </svg>
  )
}
