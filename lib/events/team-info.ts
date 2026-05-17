import { type SupportedLanguage } from '@/types/blog'

export interface EventTeamMeetingInfo {
  heading: string
  date: string
  location: string
  purpose: string
  attendance: string
  bringLabel: string
  bringItem: string
}

export interface EventTeamInfo {
  title: string
  paragraphs: string[]
  meeting: EventTeamMeetingInfo
  charityPurpose: string
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
      '29. 5. od 16:00 u nás v pivovaru (Kout na Šumavě 2) proběhne první setkání týmů k akci Souboj gulášů. Upřesníme důležité informace a předáme startovací čísla.',
      'Setkání je otevřené i pro veřejnost.'
    ],
    meeting: {
      heading: 'Společné setkání týmů',
      date: '29. 5. od 16:00',
      location: 'U sudu na prodejně.',
      purpose: 'Ať společně vymyslíme, co nám chybí.',
      attendance: 'Nutná účast alespoň jednoho člena týmu.',
      bringLabel: 'Co si vzít s sebou?',
      bringItem: '1 kotlík s topeništěm'
    },
    charityPurpose:
      'Charitativní akce – výtěžek z prodeje gulášů půjde na koupi vozíku pro Tomáška a na Diakonii Merklín.',
    registeredTeams: 15,
    teamCapacity: 30
  },
  en: {
    title: 'Info for teams',
    paragraphs: [
      'On 29 May from 4:00 p.m. at our brewery (Kout na Šumavě 2) we will hold the first team meeting for the Goulash Battle. We will go over important details and hand out starting numbers.',
      'The meeting is also open to the public.'
    ],
    meeting: {
      heading: 'Joint team meeting',
      date: '29 May, 4:00 p.m.',
      location: 'At the barrel in the shop.',
      purpose: 'Let’s figure out together what we still need.',
      attendance: 'At least one team member must attend.',
      bringLabel: 'What to bring?',
      bringItem: '1 cauldron with a firebox'
    },
    charityPurpose:
      'Charity event – proceeds from goulash sales will go towards a wheelchair for Tomášek and Diakonie Merklín.',
    registeredTeams: 15,
    teamCapacity: 30
  },
  de: {
    title: 'Info für Teams',
    paragraphs: [
      'Am 29. 5. ab 16:00 Uhr in unserer Brauerei (Kout na Šumavě 2) findet das erste Teamtreffen zur Aktion „Gulasch-Schlacht“ statt. Wir klären wichtige Informationen und geben Startnummern aus.',
      'Das Treffen ist auch für die Öffentlichkeit zugänglich.'
    ],
    meeting: {
      heading: 'Gemeinsames Teamtreffen',
      date: '29. 5., 16:00 Uhr',
      location: 'Am Fass im Verkauf.',
      purpose: 'Gemeinsam klären wir, was uns noch fehlt.',
      attendance: 'Mindestens ein Teammitglied muss teilnehmen.',
      bringLabel: 'Was mitbringen?',
      bringItem: '1 Kessel mit Feuerstelle'
    },
    charityPurpose:
      'Wohltätigkeitsaktion – der Erlös aus dem Verkauf der Gulaschgerichte geht für einen Rollstuhl für Tomášek und an die Diakonie Merklín.',
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
