import { Users } from 'lucide-react'
import { type EventTeamInfo } from '@/lib/events/team-info'
import { type SupportedLanguage } from '@/types/blog'

interface EventTeamInfoSectionProps {
  info: EventTeamInfo
  language: SupportedLanguage
}

const capacityLabel: Record<SupportedLanguage, string> = {
  cs: 'Přihlášené týmy',
  en: 'Registered teams',
  de: 'Angemeldete Teams'
}

const teamBadgeLabel: Record<SupportedLanguage, string> = {
  cs: 'Tým',
  en: 'Team',
  de: 'Team'
}

export function EventTeamInfoSection({
  info,
  language
}: EventTeamInfoSectionProps) {
  const spotsLeft = Math.max(info.teamCapacity - info.registeredTeams, 0)

  return (
    <aside
      className='border-brand-action bg-brand-shop/10 mb-8 border-2 p-5 md:p-6'
      aria-labelledby='event-team-info-heading'
    >
      <div className='flex items-start gap-3'>
        <div className='bg-brand-action text-brand-primary mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center'>
          <Users
            className='h-5 w-5'
            aria-hidden='true'
          />
        </div>
        <div>
          <p className='text-brand-shop text-xs font-bold tracking-[0.2em] uppercase'>
            {teamBadgeLabel[language]}
          </p>
          <h2
            id='event-team-info-heading'
            className='text-brand-action font-mohave text-2xl font-bold tracking-wide uppercase md:text-3xl'
          >
            {info.title}
          </h2>
        </div>
      </div>

      <div className='mt-4 flex flex-wrap items-end gap-4'>
        <div className='bg-brand-action text-brand-primary min-w-[8.5rem] px-4 py-3'>
          <p className='text-brand-primary/80 text-xs font-semibold tracking-wide uppercase'>
            {capacityLabel[language]}
          </p>
          <p className='font-mohave mt-1 text-3xl leading-none font-bold'>
            {info.registeredTeams}
            <span className='text-brand-primary/70 text-xl font-semibold'>
              {' '}
              / {info.teamCapacity}
            </span>
          </p>
        </div>
        {spotsLeft > 0 && (
          <p className='text-brand-action text-sm font-medium'>
            {language === 'cs' ?
              `Zbývá ${spotsLeft} volných míst`
            : language === 'de' ?
              `Noch ${spotsLeft} Plätze frei`
            : `${spotsLeft} spots still available`}
          </p>
        )}
      </div>

      <div className='mt-5 space-y-3'>
        {info.paragraphs.map((paragraph) => (
          <p
            key={paragraph}
            className='text-brand-action text-[1.0625rem] leading-[1.75] md:text-[1.125rem]'
          >
            {paragraph}
          </p>
        ))}
      </div>
    </aside>
  )
}
