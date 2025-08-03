import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

export const Border = ({
  children,
  rounded,
  background,
}: {
  children: ReactNode
  rounded?: boolean
  background?: boolean
}) => {
  return (
    <div
      className={cn(
        'border-[4.5px] border-brand-action p-1',
        rounded && 'rounded-full',
        background && 'bg-brand-secondary'
      )}
    >
      <div
        className={cn(
          'border-2 border-brand-action',
          rounded && 'rounded-full',
          background && 'bg-brand-secondary'
        )}
      >
        {children}
      </div>
    </div>
  )
}
