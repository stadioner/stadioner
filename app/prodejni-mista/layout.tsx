import { PropsWithChildren } from 'react'
import { LegacySalesLocationsHashRedirect } from '@/app/prodejni-mista/_components/legacy-hash-redirect'

export default function ProdejniMistaLayout({ children }: PropsWithChildren) {
  return (
    <>
      <LegacySalesLocationsHashRedirect />
      {children}
    </>
  )
}
