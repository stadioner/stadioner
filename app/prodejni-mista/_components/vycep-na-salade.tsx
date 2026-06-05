import { SalandaSection } from '@/app/prodejni-mista/_components/salanda-section'
import { sanityFetch } from '@/sanity/lib/fetch'
import { activeSalandaWeeklyProgramQuery } from '@/sanity/lib/queries'
import type { SanitySalandaWeeklyProgram } from '@/types/salanda-program'

export const VycepNaSaladeSection = async () => {
  const program = await sanityFetch<SanitySalandaWeeklyProgram | null>({
    query: activeSalandaWeeklyProgramQuery,
    tags: ['salanda:program']
  })

  return <SalandaSection program={program} />
}
