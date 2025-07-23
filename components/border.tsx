import { ReactNode } from 'react'

export const Border = ({ children }: { children: ReactNode }) => {
  return (
    <div className='border-6 border-brand-action p-1'>
      <div className='border-2 border-brand-action'>{children}</div>
    </div>
  )
}
