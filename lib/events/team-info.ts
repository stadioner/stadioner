import { type SupportedLanguage } from '@/types/blog'

export interface EventTeamInfo {
  title: string
  paragraphs: string[]
  registeredTeams: number
  teamCapacity: number
}

const goulashBattleSlugs = new Set([
  'souboj-gulasu',
  'goulash-battle',
  'gulasch-schlacht'
])

const goulashBattleTeamInfo: Record<SupportedLanguage, EventTeamInfo> = {
  cs: {
    title: 'Info pro týmy',
    paragraphs: [
      '29. 5. u nás v pivovaru proběhne první setkání týmů, kde si upřesníme veškeré důležité informace k akci Souboj gulášů a předáme startovací čísla.',
      'Aktuálně je přihlášeno 15 týmů, kapacita je 30, takže stále je prostor pro další přihlášení. Zajistíme vám maso a základní suroviny.',
      'Čím více týmů se zapojí, tím lépe – výtěžek z prodeje gulášů bude věnován na dobročinné účely.',
      'Setkání je otevřené i pro veřejnost.'
    ],
    registeredTeams: 15,
    teamCapacity: 30
  },
  en: {
    title: 'Info for teams',
    paragraphs: [
      'On 29 May we will hold the first team meeting at our brewery, where we will go over all important details for the Goulash Battle event and hand out starting numbers.',
      '15 teams are registered so far, capacity is 30, so there is still room for more sign-ups. We will provide meat and basic ingredients.',
      'The more teams take part, the better – proceeds from goulash sales will go to charity.',
      'The meeting is also open to the public.'
    ],
    registeredTeams: 15,
    teamCapacity: 30
  },
  de: {
    title: 'Info für Teams',
    paragraphs: [
      'Am 29. 5. findet in unserer Brauerei das erste Teamtreffen statt. Dort klären wir alle wichtigen Informationen zur Aktion „Gulasch-Schlacht“ und geben Startnummern aus.',
      'Derzeit sind 15 Teams angemeldet, die Kapazität beträgt 30 – es ist also noch Platz für weitere Anmeldungen. Wir stellen Fleisch und Grundzutaten bereit.',
      'Je mehr Teams mitmachen, desto besser – der Erlös aus dem Verkauf der Gulaschgerichte geht an wohltätige Zwecke.',
      'Das Treffen ist auch für die Öffentlichkeit zugänglich.'
    ],
    registeredTeams: 15,
    teamCapacity: 30
  }
}

const normalizeEventSlug = (slug: string): string =>
  slug.trim().toLowerCase()

export const getEventTeamInfo = (
  slug: string,
  language: SupportedLanguage
): EventTeamInfo | null => {
  const normalizedSlug = normalizeEventSlug(slug)

  if (
    !goulashBattleSlugs.has(normalizedSlug) &&
    !normalizedSlug.includes('gulas')
  ) {
    return null
  }

  return goulashBattleTeamInfo[language]
}
