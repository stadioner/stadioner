'use client'

import dynamic from 'next/dynamic'
import config from '../../../../sanity.config'

const NextStudio = dynamic(
  () => import('next-sanity/studio').then((mod) => mod.NextStudio),
  {
    ssr: false,
    loading: () => (
      <div className='flex min-h-[50vh] items-center justify-center text-sm text-white/70'>
        Loading Studio…
      </div>
    )
  }
)

export default function Studio() {
  return <NextStudio config={config} />
}
