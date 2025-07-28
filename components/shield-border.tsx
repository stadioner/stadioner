export const ShieldBorder = ({
  className = 'w-full h-1',
}: {
  className?: string
}) => {
  return (
    <svg
      width='100%'
      height='4'
      viewBox='0 0 100 4'
      preserveAspectRatio='none'
      className={className}
    >
      <path
        d='M0,0 L2,0 L8,0 L15,0 L25,0 L35,0 L45,0 L55,0 L65,0 L75,0 L85,0 L92,0 L98,0 L100,0 L100,4 L98,4 L92,4 L85,4 L75,4 L65,4 L55,4 L45,4 L35,4 L25,4 L15,4 L8,4 L2,4 L0,4 Z'
        fill='rgba(34, 197, 94, 0.2)'
      />
    </svg>
  )
}
