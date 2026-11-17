import { Metadata } from 'next'
import { PropsWithChildren } from 'react'
import { buildPageMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'Tap Takeover',
  description:
    'Stadioner na čepu ve Vaší hospodě. Tap Takeover Tour — speciální pivní večer s degustací, programem a modelovou kalkulací zisku.',
  canonicalPath: '/cs/tap-takeover',
  keywords: [
    'Tap Takeover',
    'Stadioner na čepu',
    'pivní akce',
    'degustace',
    'hospoda',
    'pivovar STADIONER',
    'Kout na Šumavě',
    'výčep'
  ]
})

export default function TapTakeoverLayout({ children }: PropsWithChildren) {
  return children
}
