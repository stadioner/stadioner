import { B2BHero } from './_components/hero'
import { B2BTypes } from './_components/b2b-types'
import { B2BCoverageMap } from './_components/coverage-map'
import { B2BPackagingConfigurator } from './_components/packaging-configurator'
import { B2BCooperationFlow } from './_components/cooperation-flow'
import { B2BContactFaq } from './_components/contact-faq'
import { RippedPaperSVG } from '@/components/ripped-paper-svg'

export default function ProFirmyPage() {
  return (
    <main className='bg-brand-primary'>
      <B2BHero />
      <B2BTypes />
      <B2BCoverageMap />
      <RippedPaperSVG flip />
      <B2BPackagingConfigurator />
      <RippedPaperSVG />
      <B2BCooperationFlow />
      <B2BContactFaq />
    </main>
  )
}
