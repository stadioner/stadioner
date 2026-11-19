export type TakeoverLanguage = 'cs' | 'en' | 'de'

export interface TakeoverFaqItem {
  question: string
  answer: string
}

export interface TakeoverHighlightItem {
  id: string
  title: string
  description: string
}

export interface TakeoverFormCopy {
  title: string
  subtitle: string
  venueName: string
  contactName: string
  email: string
  phone: string
  message: string
  submit: string
  submitting: string
  success: string
  error: string
  gdprPrefix: string
  gdprLink: string
}

export interface TakeoverCalculatorCopy {
  title: string
  description: string
  guestsLabel: string
  entranceLabel: string
  beersTitle: string
  extrasTitle: string
  glassesExtra: string
  equipmentExtra: string
  tastingRevenue: string
  kegCost: string
  tastingProfit: string
  remainingRevenue: string
  total: string
  depositNote: string
  disclaimer: string
  perBeerRemaining: string
  emptySelection: string
  ctaToForm: string
}

export interface TakeoverSectionCopy {
  hero: {
    eyebrow: string
    title: string
    description: string
    imageAlt: string
    ctaPrimary: string
    ctaSecondary: string
  }
  overview: {
    title: string
    lead: string
    highlights: TakeoverHighlightItem[]
    deliverTitle: string
    deliverLead: string
    deliverItems: string[]
  }
  calculator: TakeoverCalculatorCopy
  contactFaq: {
    title: string
    description: string
    formTitle: string
    faqTitle: string
  }
  form: TakeoverFormCopy
  faq: TakeoverFaqItem[]
}

export const getTakeoverLanguage = (language: string): TakeoverLanguage =>
  language === 'en' || language === 'de' ? language : 'cs'

export const takeoverContent: Record<TakeoverLanguage, TakeoverSectionCopy> = {
  cs: {
    hero: {
      eyebrow: 'Tap Takeover Tour',
      title: 'Stadioner na čepu ve Vaší hospodě',
      description:
        'Speciální pivní večer u Vás: 5–6 piv na čepu, degustace, program a propagace. Vy zajistíte prostor a hosty. My dodáme pivo, program a zážitek.',
      imageAlt: 'Výčep a piva STADIONER',
      ctaPrimary: 'Nezávazná poptávka',
      ctaSecondary: 'Modelová kalkulačka'
    },
    overview: {
      title: 'Jak to vypadá',
      lead: 'Jeden večer u Vás. My přivezeme pivo, program i atmosféru.',
      highlights: [
        {
          id: 'evening',
          title: 'Speciální pivní večer',
          description: 'Hotový formát akce přímo ve Vaší hospodě.'
        },
        {
          id: 'taps',
          title: '5–6 piv na čepu',
          description: 'Ležáky i speciály rovnou z pivovaru.'
        },
        {
          id: 'tasting',
          title: 'Degustace s příběhy',
          description: 'Každé pivo dostane svůj příběh a sklenici.'
        },
        {
          id: 'program',
          title: 'Program pro hosty',
          description: 'Kvíz a atmosféra, která večer podrží.'
        }
      ],
      deliverTitle: 'Od nás dostanete',
      deliverLead: 'Technika, pivo i prezentace. Vy se věnujete hostům.',
      deliverItems: [
        'Piva za VO ceny',
        'Sklenice 0,3 l zdarma',
        'Výčepní zařízení zdarma',
        'Aleš Pech na místě',
        'Pivní kvíz',
        'Propagace + poukazy',
        'Catering na přání'
      ]
    },
    calculator: {
      title: 'Modelová cenová kalkulace',
      description:
        'Upravte počet hostů, vstupné a výběr piv. Čísla ukazují modelový zisk hospody podle letáku Tap Takeover.',
      guestsLabel: 'Počet hostů',
      entranceLabel: 'Vstupné / osoba',
      beersTitle: 'Nákup piva — sudy 20 l',
      extrasTitle: 'Zdarma k akci',
      glassesExtra: 'Zapůjčení sklenic 0,3 l',
      equipmentExtra: 'Zapůjčení výčepního zařízení',
      tastingRevenue: 'Tržba ze vstupného',
      kegCost: 'Nákup sudů',
      tastingProfit: 'Zisk z degustace',
      remainingRevenue: 'Tržba ze zbývajícího piva',
      total: 'Celkem (model)',
      depositNote: 'Vratná kauce 2 000 Kč / sud se do zisku nepočítá.',
      disclaimer:
        'Modelový výpočet při prodeji zbývajícího piva ze sudů. Ceny včetně DPH. Catering můžeme v případě zájmu zajistit.',
      perBeerRemaining: 'zbývá',
      emptySelection: 'Vyberte alespoň jedno pivo.',
      ctaToForm: 'Chci domluvit termín'
    },
    contactFaq: {
      title: 'Domluvíme Tap Takeover',
      description:
        'Napište nám hospodu, orientační termín a počet hostů. Ozveme se s konkrétním návrhem.',
      formTitle: 'Nezávazná poptávka',
      faqTitle: 'Časté dotazy'
    },
    form: {
      title: 'Nezávazná poptávka',
      subtitle: 'Ozveme se Vám co nejdříve.',
      venueName: 'Název hospody / provozu',
      contactName: 'Kontaktní osoba',
      email: 'E-mail',
      phone: 'Telefon',
      message: 'Zpráva (termín, poznámky)',
      submit: 'Odeslat poptávku',
      submitting: 'Odesílám…',
      success: 'Poptávka odeslána. Brzy se ozveme.',
      error: 'Odeslání se nepovedlo. Zkuste to prosím znovu.',
      gdprPrefix: 'Odesláním souhlasíte se zpracováním údajů dle',
      gdprLink: 'GDPR'
    },
    faq: [
      {
        question: 'Kolik piv má být na čepu?',
        answer:
          'Typicky 5–6 druhů. V kalkulačce si můžete výběr upravit a hned vidíte modelový dopad na zisk.'
      },
      {
        question: 'Je výčepní zařízení a sklenice opravdu zdarma?',
        answer:
          'Ano — sklenice 0,3 l zapůjčíme zdarma a výčepní zařízení můžeme zapůjčit také zdarma, pokud ho potřebujete.'
      },
      {
        question: 'Co znamená vratná kauce?',
        answer:
          'Za každý sud je kauce 2 000 Kč. Po vrácení sudů se vrací. Do modelového zisku se nepočítá.'
      },
      {
        question: 'Umíte zajistit catering?',
        answer:
          'Ano, catering můžeme v případě zájmu zajistit. Napište to do poptávky.'
      }
    ]
  },
  en: {
    hero: {
      eyebrow: 'Tap Takeover Tour',
      title: 'Stadioner on tap at Your pub',
      description:
        'A special beer night at Your venue: 5–6 beers on tap, tasting, programme and promotion. You provide the space and guests. We bring the beer, programme and experience.',
      imageAlt: 'STADIONER tap and beers',
      ctaPrimary: 'Request a date',
      ctaSecondary: 'Profit calculator'
    },
    overview: {
      title: 'How it works',
      lead: 'One night at Your venue. We bring the beer, programme and atmosphere.',
      highlights: [
        {
          id: 'evening',
          title: 'Special beer evening',
          description: 'A ready-made format at Your pub.'
        },
        {
          id: 'taps',
          title: '5–6 beers on tap',
          description: 'Lagers and specials straight from the brewery.'
        },
        {
          id: 'tasting',
          title: 'Tasting with stories',
          description: 'Each beer gets its story and a glass.'
        },
        {
          id: 'program',
          title: 'Guest programme',
          description: 'A quiz and atmosphere that carry the night.'
        }
      ],
      deliverTitle: 'What You get from us',
      deliverLead: 'Beer, kit and presentation. You focus on Your guests.',
      deliverItems: [
        'Beers at wholesale prices',
        'Free 0.3 l glasses',
        'Free dispensing kit',
        'Aleš Pech on site',
        'Beer quiz',
        'Promotion + vouchers',
        'Catering on request'
      ]
    },
    calculator: {
      title: 'Model price calculator',
      description:
        'Adjust guests, entrance fee and beer selection. Numbers follow the Tap Takeover flyer model for pub profit.',
      guestsLabel: 'Guests',
      entranceLabel: 'Entrance fee / person',
      beersTitle: 'Beer purchase — 20 L kegs',
      extrasTitle: 'Included free',
      glassesExtra: 'Loan of 0.3 l glasses',
      equipmentExtra: 'Loan of dispensing equipment',
      tastingRevenue: 'Entrance revenue',
      kegCost: 'Keg purchase',
      tastingProfit: 'Tasting profit',
      remainingRevenue: 'Revenue from remaining beer',
      total: 'Total (model)',
      depositNote: 'Refundable keg deposit CZK 2,000 / keg is not included in profit.',
      disclaimer:
        'Model calculation assuming remaining keg beer is sold. Prices include VAT. Catering available on request.',
      perBeerRemaining: 'left',
      emptySelection: 'Select at least one beer.',
      ctaToForm: 'Request a date'
    },
    contactFaq: {
      title: 'Book a Tap Takeover',
      description:
        'Tell us Your venue, a rough date and guest count. We will reply with a concrete proposal.',
      formTitle: 'Non-binding inquiry',
      faqTitle: 'FAQ'
    },
    form: {
      title: 'Non-binding inquiry',
      subtitle: 'We will get back to You soon.',
      venueName: 'Pub / venue name',
      contactName: 'Contact person',
      email: 'Email',
      phone: 'Phone',
      message: 'Message (date, notes)',
      submit: 'Send inquiry',
      submitting: 'Sending…',
      success: 'Inquiry sent. We will be in touch soon.',
      error: 'Sending failed. Please try again.',
      gdprPrefix: 'By submitting you agree to data processing under',
      gdprLink: 'GDPR'
    },
    faq: [
      {
        question: 'How many beers on tap?',
        answer:
          'Typically 5–6 styles. Adjust the selection in the calculator to see the model impact on profit.'
      },
      {
        question: 'Are glasses and equipment really free?',
        answer:
          'Yes — we loan 0.3 l glasses for free and can also loan dispensing equipment free of charge when needed.'
      },
      {
        question: 'What is the keg deposit?',
        answer:
          'Each keg has a CZK 2,000 refundable deposit. It is returned with the kegs and is not part of the model profit.'
      },
      {
        question: 'Can you arrange catering?',
        answer: 'Yes — mention it in the inquiry and we can arrange catering.'
      }
    ]
  },
  de: {
    hero: {
      eyebrow: 'Tap Takeover Tour',
      title: 'Stadioner vom Fass in Ihrer Kneipe',
      description:
        'Ein besonderer Bierabend bei Ihnen: 5–6 Biere vom Fass, Verkostung, Programm und Promotion. Sie stellen Raum und Gäste. Wir liefern Bier, Programm und Erlebnis.',
      imageAlt: 'STADIONER Ausschank und Biere',
      ctaPrimary: 'Unverbindliche Anfrage',
      ctaSecondary: 'Modellrechner'
    },
    overview: {
      title: 'So läuft es ab',
      lead: 'Ein Abend bei Ihnen. Wir bringen Bier, Programm und Atmosphäre.',
      highlights: [
        {
          id: 'evening',
          title: 'Besonderer Bierabend',
          description: 'Fertiges Format direkt in Ihrer Kneipe.'
        },
        {
          id: 'taps',
          title: '5–6 Biere vom Fass',
          description: 'Lager und Spezialitäten direkt aus der Brauerei.'
        },
        {
          id: 'tasting',
          title: 'Verkostung mit Geschichten',
          description: 'Jedes Bier bekommt seine Geschichte und ein Glas.'
        },
        {
          id: 'program',
          title: 'Programm für Gäste',
          description: 'Quiz und Atmosphäre, die den Abend tragen.'
        }
      ],
      deliverTitle: 'Das bekommen Sie von uns',
      deliverLead: 'Bier, Technik und Präsentation. Sie kümmern sich um die Gäste.',
      deliverItems: [
        'Biere zum Großhandelspreis',
        '0,3-l-Gläser kostenlos',
        'Zapfanlage kostenlos',
        'Aleš Pech vor Ort',
        'Bierquiz',
        'Promotion + Gutscheine',
        'Catering auf Wunsch'
      ]
    },
    calculator: {
      title: 'Modell-Preisrechner',
      description:
        'Passen Sie Gästezahl, Eintritt und Bierauswahl an. Die Zahlen folgen dem Tap-Takeover-Flyer-Modell für den Kneipengewinn.',
      guestsLabel: 'Gäste',
      entranceLabel: 'Eintritt / Person',
      beersTitle: 'Biereinkauf — 20-l-Fässer',
      extrasTitle: 'Kostenlos dabei',
      glassesExtra: 'Leihgabe 0,3-l-Gläser',
      equipmentExtra: 'Leihgabe Zapfanlage',
      tastingRevenue: 'Einnahmen aus Eintritt',
      kegCost: 'Fass-Einkauf',
      tastingProfit: 'Gewinn aus Verkostung',
      remainingRevenue: 'Umsatz aus Restbier',
      total: 'Gesamt (Modell)',
      depositNote:
        'Rückzahlbare Fasskaution 2 000 Kč / Fass zählt nicht zum Gewinn.',
      disclaimer:
        'Modellrechnung unter Annahme des Verkaufs des Restbiers. Preise inkl. MwSt. Catering auf Wunsch möglich.',
      perBeerRemaining: 'übrig',
      emptySelection: 'Wählen Sie mindestens ein Bier.',
      ctaToForm: 'Termin anfragen'
    },
    contactFaq: {
      title: 'Tap Takeover vereinbaren',
      description:
        'Schreiben Sie uns Kneipe, ungefähres Datum und Gästezahl. Wir melden uns mit einem konkreten Vorschlag.',
      formTitle: 'Unverbindliche Anfrage',
      faqTitle: 'FAQ'
    },
    form: {
      title: 'Unverbindliche Anfrage',
      subtitle: 'Wir melden uns bald bei Ihnen.',
      venueName: 'Name der Kneipe / des Betriebs',
      contactName: 'Kontaktperson',
      email: 'E-Mail',
      phone: 'Telefon',
      message: 'Nachricht (Termin, Notizen)',
      submit: 'Anfrage senden',
      submitting: 'Sende…',
      success: 'Anfrage gesendet. Wir melden uns bald.',
      error: 'Senden fehlgeschlagen. Bitte erneut versuchen.',
      gdprPrefix: 'Mit dem Absenden stimmen Sie der Datenverarbeitung gemäß',
      gdprLink: 'DSGVO'
    },
    faq: [
      {
        question: 'Wie viele Biere vom Fass?',
        answer:
          'Typischerweise 5–6 Sorten. Im Rechner können Sie die Auswahl anpassen und den Modelleffekt auf den Gewinn sehen.'
      },
      {
        question: 'Sind Gläser und Anlage wirklich kostenlos?',
        answer:
          'Ja — 0,3-l-Gläser leihen wir kostenlos, und die Zapfanlage können wir bei Bedarf ebenfalls kostenlos leihen.'
      },
      {
        question: 'Was bedeutet die Fasskaution?',
        answer:
          'Pro Fass gibt es 2 000 Kč Kaution. Nach Rückgabe der Fässer wird sie erstattet und zählt nicht zum Modellgewinn.'
      },
      {
        question: 'Können Sie Catering organisieren?',
        answer:
          'Ja — schreiben Sie es in die Anfrage, dann können wir Catering organisieren.'
      }
    ]
  }
}
