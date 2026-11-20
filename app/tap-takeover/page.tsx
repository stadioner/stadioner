import { RippedPaperSVG } from '@/components/ripped-paper-svg'
import { TakeoverCalculatorProvider } from './_components/calculator-context'
import { TakeoverContactFaq } from './_components/contact-faq'
import { TakeoverErrorBoundary } from './_components/error-boundary'
import { TakeoverHero } from './_components/hero'
import { TakeoverOverview } from './_components/overview'
import { TakeoverProfitCalculator } from './_components/profit-calculator'

export default function TapTakeoverPage() {
  return (
    <main className='bg-brand-primary'>
      <TakeoverHero />
      <TakeoverOverview />
      <div
        className='bg-brand-secondary'
        style={{ lineHeight: 0 }}
      >
        <RippedPaperSVG flip />
      </div>
      <TakeoverCalculatorProvider>
        <TakeoverErrorBoundary>
          <TakeoverProfitCalculator />
        </TakeoverErrorBoundary>
        <div
          className='bg-brand-secondary'
          style={{ lineHeight: 0 }}
        >
          <RippedPaperSVG />
        </div>
        <TakeoverContactFaq />
      </TakeoverCalculatorProvider>
    </main>
  )
}
