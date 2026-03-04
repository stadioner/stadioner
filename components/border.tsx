import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

export const Border = ({
  children,
  rounded,
  background,
  backgroundLight,
  className,
  reverse,
  shop,
}: {
  children: ReactNode
  rounded?: boolean
  background?: boolean
  backgroundLight?: boolean
  className?: string
  reverse?: boolean
  shop?: boolean
}) => {
  return (
    <div
      className={cn(
        'border-[3.5px] border-brand-action p-1',
        rounded && 'rounded-full',
        background && 'bg-brand-secondary',
        backgroundLight && 'bg-brand-primary',
        reverse && 'border-brand-secondary',
        shop && 'border-brand-shop',
        className,
      )}
    >
      <div
        className={cn(
          'border-[1.5px] border-brand-action h-full',
          rounded && 'rounded-full',
          background && 'bg-brand-secondary',
          backgroundLight && 'bg-brand-primary',
          reverse && 'border-brand-secondary',
          shop && 'border-brand-shop',
        )}
      >
        {children}
      </div>
    </div>
  )
}
