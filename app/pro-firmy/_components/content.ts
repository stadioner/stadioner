export type B2BLanguage = 'cs' | 'en' | 'de'

export interface B2BTypeCard {
  id: string
  title: string
  description: string
  icon: string
  productImage: string
  ambience: string
}

export interface B2BPackagingItem {
  id: string
  label: string
  details: string
  note?: string
  image: string
}

export interface B2BCooperationStep {
  id: string
  badge: string
  title: string
  description: string
}

export interface B2BFaqItem {
  question: string
  answer: string
}

export interface B2BFormCopy {
  title: string
  subtitle: string
  companyName: string
  contactName: string
  email: string
  phone: string
  address: string
  vatNumber: string
  message: string
  submit: string
  submitting: string
  success: string
  error: string
  gdprPrefix: string
  gdprLink: string
}

export interface B2BSectionCopy {
  hero: {
    eyebrow: string
    title: string
    philosophy: string
    description: string
    ctaPrimary: string
    ctaSecondary: string
  }
  types: {
    title: string
    description: string
    cards: B2BTypeCard[]
  }
  coverage: {
    title: string
    description: string
  }
  packaging: {
    title: string
    description: string
    priceListNote: string
    requestPriceList: string
    items: B2BPackagingItem[]
  }
  cooperation: {
    title: string
    description: string
    wheelHint: string
    mobileHint: string
    steps: B2BCooperationStep[]
  }
  contactFaq: {
    title: string
    description: string
    formTitle: string
    faqTitle: string
  }
  form: B2BFormCopy
  faq: B2BFaqItem[]
}

export const getB2BLanguage = (language: string): B2BLanguage =>
  language === 'en' || language === 'de' ? language : 'cs'

export const b2bContent: Record<B2BLanguage, B2BSectionCopy> = {
  cs: {
    hero: {
      eyebrow: 'B2B partnerství pro váš podnik',
      title: 'Stabilní dodávky, silná značka a vyšší obrat',
      philosophy:
        'Nechceme jít do řetězců. Chceme budovat síť vesnických obchodů, které mají vztah se zákazníky. My vám dodáme produkt a uděláme marketing. Vy na tom vyděláte na každé lahvi a ještě získáte objednávky z e-shopu.',
      description:
        'Vyplňte krátký formulář a pošleme vám nezávazný návrh spolupráce, závozu i podpory prodeje pro váš provoz.',
      ctaPrimary: 'Chci nezávaznou nabídku',
      ctaSecondary: 'Podívat se na působnost',
    },
    types: {
      title: 'Pro koho je spolupráce určená',
      description:
        'Ať provozujete hospodu, restauraci nebo obchod, nastavíme spolupráci podle vašeho provozu a obratu.',
      cards: [
        {
          id: 'pub',
          title: 'Hospoda',
          description:
            'Výčepní pivo i lahve pro stálé hosty, kteří se rádi vrací.',
          icon: '/map/hospoda.svg',
          productImage: '/products/pivo/barrel-50.webp',
          ambience: 'bg-gradient-to-br from-brand-secondary to-brand-primary',
        },
        {
          id: 'restaurant',
          title: 'Restaurace',
          description:
            'Párování piva k menu, stabilní dodávky a podpora prezentace.',
          icon: '/map/restaurace.svg',
          productImage: '/products/pivo/12/bottle.webp',
          ambience: 'bg-gradient-to-br from-brand-primary to-brand-secondary',
        },
        {
          id: 'retail',
          title: 'Maloobchod',
          description:
            'Lahve a bedny do regálu s jasným brandem a prodejní podporou.',
          icon: '/map/pivoteka.svg',
          productImage: '/products/pivo/crate.webp',
          ambience: 'bg-gradient-to-br from-brand-secondary to-brand-primary',
        },
        {
          id: 'hotel',
          title: 'Hotel / Penzion',
          description:
            'Kvalitní doplnění nabídky minibaru, lobby baru nebo restaurace.',
          icon: '/map/penzion.svg',
          productImage: '/products/limo/citron/bottle.webp',
          ambience: 'bg-gradient-to-br from-brand-primary to-brand-secondary',
        },
      ],
    },
    coverage: {
      title: 'Kde už dnes působíme',
      description:
        'Síť partnerů rozšiřujeme z Koutu na Šumavě do dalších měst. Přidejte se i vy a získejte lokální značku, která se prodává.',
    },
    packaging: {
      title: 'Balení pro každý typ provozu',
      description:
        'Porovnejte varianty balení a vyberte to, co nejlépe sedí vaší výtoči i skladovým možnostem.',
      priceListNote:
        'Přesný ceník a obchodní podmínky posíláme po vyplnění formuláře. Odezva obvykle do 24 hodin.',
      requestPriceList: 'Poslat ceník',
      items: [
        {
          id: 'bottle',
          label: 'Lahev',
          details: '0.5 l vratná lahev',
          image: '/products/pivo/12/bottle.webp',
        },
        {
          id: 'crate',
          label: 'Bedna',
          details: 'Přepravka vratných lahví',
          image: '/products/pivo/crate.webp',
        },
        {
          id: 'barrel30',
          label: 'Sud 30 l',
          details: 'Praktické řešení pro střední provoz',
          image: '/products/pivo/barrel-30.webp',
        },
        {
          id: 'barrel50',
          label: 'Sud 50 l',
          details: 'Efektivní varianta pro vyšší výtoč',
          image: '/products/pivo/barrel-50.webp',
        },
        {
          id: 'small-keg',
          label: 'Malý sud 10 l / 20.5 l',
          details: 'Na objednávku předem',
          note: 'Ideální na akce nebo menší odběr',
          image: '/products/pivo/barrel-30.webp',
        },
      ],
    },
    cooperation: {
      title: 'Průběh spolupráce',
      description:
        'Od prvního kontaktu k pravidelné dodávce v několika jasných krocích.',
      wheelHint: 'Na desktopu přepnete kroky kolečkem myši nebo trackpadem.',
      mobileHint: 'Na mobilu je průběh zobrazený ve vertikálním pořadí.',
      steps: [
        {
          id: 'contact',
          badge: '1. krok',
          title: 'Kontakt',
          description:
            'Vyplníte 2minutový formulář. Ozveme se vám s konkrétním návrhem dalšího postupu.',
        },
        {
          id: 'tasting',
          badge: '2. krok',
          title: 'Schůzka a degustace',
          description:
            'Projdeme váš provoz, doporučíme vhodné produkty a domluvíme podmínky.',
        },
        {
          id: 'pilot',
          badge: '3. krok',
          title: 'Pilotní dodávka',
          description:
            'Spustíme první dodávku a nastavíme optimální model závozu.',
        },
        {
          id: 'growth',
          badge: '4. krok',
          title: 'Pravidelný odběr + marketing',
          description:
            'Dlouhodobá spolupráce, podpora prodeje a rozvoj vašeho obratu.',
        },
      ],
    },
    contactFaq: {
      title: 'Vyplňte formulář a ozveme se vám',
      description:
        'Stačí pár základních údajů. Připravíme návrh spolupráce podle vašeho typu provozu.',
      formTitle: 'Nezávazná B2B poptávka',
      faqTitle: 'Nejčastější otázky před startem',
    },
    form: {
      title: 'Pro firmy',
      subtitle:
        'Vyplňte krátký formulář a do 24 hodin se vám ozveme s návrhem spolupráce.',
      companyName: 'Název firmy',
      contactName: 'Jméno kontaktní osoby',
      email: 'Email',
      phone: 'Telefon',
      address: 'Adresa společnosti',
      vatNumber: 'IČO (volitelné)',
      message: 'Vaše zpráva',
      submit: 'Získat nabídku',
      submitting: 'Odesílám...',
      success:
        'Děkujeme! Poptávku máme a brzy se vám ozveme s konkrétním návrhem spolupráce.',
      error: 'Omlouváme se, došlo k chybě. Zkuste to prosím znovu.',
      gdprPrefix: 'Odesláním souhlasíte s',
      gdprLink: 'ochranou osobních údajů',
    },
    faq: [
      {
        question: 'Jaký je minimální odběr?',
        answer:
          'Minimální odběr nastavujeme individuálně podle typu provozu a frekvence závozu. Cílem je, aby spolupráce dávala smysl ekonomicky vám i nám.',
      },
      {
        question: 'Jaká balení jsou pro B2B dostupná?',
        answer:
          'Standardně nabízíme lahve, bedny, sudy 30 l a 50 l. Malé sudy 10 l a 20.5 l řešíme na objednávku podle typu akce nebo provozu.',
      },
      {
        question: 'Kde získám ceník a obchodní podmínky?',
        answer:
          'Ceník i podmínky posíláme po vyplnění formuláře. Připravíme je podle vašeho provozu, lokality a očekávaného odběru.',
      },
      {
        question: 'Pomáháte partnerům i s marketingem?',
        answer:
          'Ano. Pomáháme s komunikací značky, doporučením prezentace na provozu a napojením na objednávky z e-shopu.',
      },
      {
        question: 'Jak řešíte dopravu a fakturaci?',
        answer:
          'Dopravu plánujeme podle lokality a objemu odběru. Fakturace probíhá standardně B2B podle předem domluvených podmínek.',
      },
    ],
  },
  en: {
    hero: {
      eyebrow: 'B2B cooperation',
      title: 'A partner for pubs, restaurants, and local businesses',
      philosophy:
        "We do not want to go into chains. We want to build a network of local businesses with real customer relationships. We deliver product and marketing. You earn on every bottle and gain additional orders from our e-shop.",
      description:
        'Stadioner builds cooperation on long-term partnerships, quality products, and practical sales support for your venue.',
      ctaPrimary: 'Start cooperation',
      ctaSecondary: 'Where we operate',
    },
    types: {
      title: 'Who this cooperation is for',
      description:
        'We supply different types of venues where local products and personal service matter.',
      cards: [
        {
          id: 'pub',
          title: 'Pub',
          description:
            'Draft beer and bottles for regular guests who come back.',
          icon: '/map/hospoda.svg',
          productImage: '/products/pivo/barrel-50.webp',
          ambience: 'bg-gradient-to-br from-brand-secondary to-brand-primary',
        },
        {
          id: 'restaurant',
          title: 'Restaurant',
          description:
            'Beer pairing with menu items, reliable supply, and strong presentation.',
          icon: '/map/restaurace.svg',
          productImage: '/products/pivo/12/bottle.webp',
          ambience: 'bg-gradient-to-br from-brand-primary to-brand-secondary',
        },
        {
          id: 'retail',
          title: 'Retail store',
          description:
            'Bottles and crates for shelf sales with clear brand visibility.',
          icon: '/map/pivoteka.svg',
          productImage: '/products/pivo/crate.webp',
          ambience: 'bg-gradient-to-br from-brand-secondary to-brand-primary',
        },
        {
          id: 'hotel',
          title: 'Hotel / Guesthouse',
          description:
            'A quality addition to minibar, lobby bar, or restaurant offer.',
          icon: '/map/penzion.svg',
          productImage: '/products/limo/citron/bottle.webp',
          ambience: 'bg-gradient-to-br from-brand-primary to-brand-secondary',
        },
      ],
    },
    coverage: {
      title: 'Where we already operate',
      description:
        'We are gradually expanding our partner network from Kout na Šumavě to more cities and venues.',
    },
    packaging: {
      title: 'B2B packaging overview',
      description:
        'Choose a format that fits your venue. We supply multiple packaging variants.',
      priceListNote:
        'We send the exact price list after the initial contact, based on your cooperation model and expected volume.',
      requestPriceList: 'Request price list',
      items: [
        {
          id: 'bottle',
          label: 'Bottle',
          details: '0.5 l returnable bottle',
          image: '/products/pivo/12/bottle.webp',
        },
        {
          id: 'crate',
          label: 'Crate',
          details: 'Returnable bottle crate',
          image: '/products/pivo/crate.webp',
        },
        {
          id: 'barrel30',
          label: 'Keg 30 l',
          details: 'Practical for medium-size venues',
          image: '/products/pivo/barrel-30.webp',
        },
        {
          id: 'barrel50',
          label: 'Keg 50 l',
          details: 'Efficient option for higher draft volume',
          image: '/products/pivo/barrel-50.webp',
        },
        {
          id: 'small-keg',
          label: 'Small keg 10 l / 20.5 l',
          details: 'Available on pre-order',
          note: 'Great for events or smaller demand',
          image: '/products/pivo/barrel-30.webp',
        },
      ],
    },
    cooperation: {
      title: 'Cooperation process',
      description: 'Clear steps and fast start.',
      wheelHint:
        'On desktop, switch steps using mouse wheel or trackpad scrolling.',
      mobileHint: 'On mobile, the process is shown as a vertical sequence.',
      steps: [
        {
          id: 'contact',
          badge: 'Step 1',
          title: 'Contact',
          description:
            'You fill out a short form and we get back to you with the next steps.',
        },
        {
          id: 'tasting',
          badge: 'Step 2',
          title: 'Meeting and tasting',
          description:
            'We review your venue, recommend products, and align business terms.',
        },
        {
          id: 'pilot',
          badge: 'Step 3',
          title: 'Pilot delivery',
          description:
            'We launch the first delivery and set up an optimal supply rhythm.',
        },
        {
          id: 'growth',
          badge: 'Step 4',
          title: 'Regular supply + marketing',
          description:
            'Long-term cooperation with sales support and growth focus.',
        },
      ],
    },
    contactFaq: {
      title: 'Let us start together',
      description:
        'Send us your basic details. Frequently asked questions are on the right.',
      formTitle: 'Inquiry form',
      faqTitle: 'Frequently asked questions',
    },
    form: {
      title: 'For Companies',
      subtitle: 'Interested in cooperation? Contact us!',
      companyName: 'Company name',
      contactName: 'Contact person name',
      email: 'Email',
      phone: 'Phone',
      address: 'Company address',
      vatNumber: 'VAT number (optional)',
      message: 'Your message',
      submit: 'Send inquiry',
      submitting: 'Sending...',
      success:
        'Thank you! Your inquiry has been sent successfully. We will contact you soon.',
      error: 'Sorry, an error occurred. Please try again.',
      gdprPrefix: 'By submitting you agree to our',
      gdprLink: 'personal data protection',
    },
    faq: [
      {
        question: 'What is the minimum order volume?',
        answer:
          'Minimum volume is set individually based on your venue type and delivery frequency. We define it during the first call.',
      },
      {
        question: 'Which packaging formats are available for B2B?',
        answer:
          'We typically supply bottles, crates, 30 l kegs, and 50 l kegs. Small 10 l and 20.5 l kegs are available via pre-order.',
      },
      {
        question: 'How do I get your price list and terms?',
        answer:
          'We share the full price list and terms after the first contact, tailored to your venue and expected demand.',
      },
      {
        question: 'Do you support partners with marketing?',
        answer:
          'Yes. We support partner visibility, in-venue presentation, and additional demand from our e-shop ecosystem.',
      },
      {
        question: 'How do delivery and invoicing work?',
        answer:
          'Delivery is planned by location and volume. Invoicing follows standard B2B process under agreed conditions.',
      },
    ],
  },
  de: {
    hero: {
      eyebrow: 'B2B-Zusammenarbeit',
      title: 'Partner für Kneipen, Restaurants und lokale Betriebe',
      philosophy:
        'Wir wollen nicht in Ketten gehen. Wir bauen ein Netzwerk lokaler Betriebe mit direktem Kundenbezug auf. Wir liefern Produkt und Marketing. Sie verdienen an jeder Flasche und gewinnen zusätzliche Bestellungen aus unserem E-Shop.',
      description:
        'Stadioner setzt auf langfristige Partnerschaften, Qualitätsprodukte und praxisnahe Verkaufsunterstützung.',
      ctaPrimary: 'Zusammenarbeit starten',
      ctaSecondary: 'Wo wir aktiv sind',
    },
    types: {
      title: 'Für wen die Zusammenarbeit passt',
      description:
        'Wir beliefern verschiedene Betriebstypen, in denen lokale Qualität zählt.',
      cards: [
        {
          id: 'pub',
          title: 'Kneipe',
          description:
            'Fassbier und Flaschen für Stammgäste, die gerne wiederkommen.',
          icon: '/map/hospoda.svg',
          productImage: '/products/pivo/barrel-50.webp',
          ambience: 'bg-gradient-to-br from-brand-secondary to-brand-primary',
        },
        {
          id: 'restaurant',
          title: 'Restaurant',
          description:
            'Bier passend zur Speisekarte, stabile Lieferungen und Präsentation.',
          icon: '/map/restaurace.svg',
          productImage: '/products/pivo/12/bottle.webp',
          ambience: 'bg-gradient-to-br from-brand-primary to-brand-secondary',
        },
        {
          id: 'retail',
          title: 'Einzelhandel',
          description:
            'Flaschen und Kisten mit starker Markenpräsenz im Regal.',
          icon: '/map/pivoteka.svg',
          productImage: '/products/pivo/crate.webp',
          ambience: 'bg-gradient-to-br from-brand-secondary to-brand-primary',
        },
        {
          id: 'hotel',
          title: 'Hotel / Pension',
          description:
            'Qualitative Ergänzung für Minibar, Lobbybar oder Restaurant.',
          icon: '/map/penzion.svg',
          productImage: '/products/limo/citron/bottle.webp',
          ambience: 'bg-gradient-to-br from-brand-primary to-brand-secondary',
        },
      ],
    },
    coverage: {
      title: 'Wo wir bereits aktiv sind',
      description:
        'Unser Partnernetz wächst schrittweise von Kout na Šumavě in weitere Städte.',
    },
    packaging: {
      title: 'B2B-Verpackungsübersicht',
      description:
        'Wählen Sie das Format, das zu Ihrem Betrieb passt. Wir liefern mehrere Verpackungsvarianten.',
      priceListNote:
        'Die genaue Preisliste senden wir nach dem Erstkontakt, abhängig von Modell und Abnahmemenge.',
      requestPriceList: 'Preisliste anfordern',
      items: [
        {
          id: 'bottle',
          label: 'Flasche',
          details: '0.5 l Mehrwegflasche',
          image: '/products/pivo/12/bottle.webp',
        },
        {
          id: 'crate',
          label: 'Kiste',
          details: 'Mehrwegkiste für Flaschen',
          image: '/products/pivo/crate.webp',
        },
        {
          id: 'barrel30',
          label: 'Fass 30 l',
          details: 'Praktisch für mittlere Betriebe',
          image: '/products/pivo/barrel-30.webp',
        },
        {
          id: 'barrel50',
          label: 'Fass 50 l',
          details: 'Effizient bei höherem Ausschank',
          image: '/products/pivo/barrel-50.webp',
        },
        {
          id: 'small-keg',
          label: 'Kleines Fass 10 l / 20.5 l',
          details: 'Auf Vorbestellung',
          note: 'Ideal für Events oder kleinere Mengen',
          image: '/products/pivo/barrel-30.webp',
        },
      ],
    },
    cooperation: {
      title: 'Ablauf der Zusammenarbeit',
      description: 'Klare Schritte und schneller Start.',
      wheelHint:
        'Am Desktop wechseln Sie die Schritte mit Mausrad oder Trackpad.',
      mobileHint:
        'Auf Mobilgeräten wird der Ablauf vertikal in Reihenfolge angezeigt.',
      steps: [
        {
          id: 'contact',
          badge: 'Schritt 1',
          title: 'Kontakt',
          description:
            'Sie senden ein kurzes Formular, wir melden uns mit dem weiteren Vorgehen.',
        },
        {
          id: 'tasting',
          badge: 'Schritt 2',
          title: 'Gespräch und Verkostung',
          description:
            'Wir besprechen Ihren Betrieb, empfehlen Produkte und definieren die Bedingungen.',
        },
        {
          id: 'pilot',
          badge: 'Schritt 3',
          title: 'Pilotlieferung',
          description:
            'Wir starten mit der ersten Lieferung und richten den optimalen Rhythmus ein.',
        },
        {
          id: 'growth',
          badge: 'Schritt 4',
          title: 'Regelmäßige Lieferung + Marketing',
          description:
            'Langfristige Partnerschaft mit Unterstützung für Ihren Absatz.',
        },
      ],
    },
    contactFaq: {
      title: 'Lassen Sie uns starten',
      description:
        'Senden Sie uns die wichtigsten Infos. Rechts finden Sie die häufigsten Fragen.',
      formTitle: 'Anfrageformular',
      faqTitle: 'Häufige Fragen',
    },
    form: {
      title: 'Für Unternehmen',
      subtitle: 'Interessiert an Zusammenarbeit? Kontaktieren Sie uns!',
      companyName: 'Firmenname',
      contactName: 'Name der Kontaktperson',
      email: 'E-Mail',
      phone: 'Telefon',
      address: 'Firmenadresse',
      vatNumber: 'Umsatzsteuer-ID (optional)',
      message: 'Ihre Nachricht',
      submit: 'Anfrage senden',
      submitting: 'Sende...',
      success:
        'Vielen Dank! Ihre Anfrage wurde erfolgreich gesendet. Wir werden Sie bald kontaktieren.',
      error: 'Entschuldigung, ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.',
      gdprPrefix: 'Mit der Übermittlung stimmen Sie unserem',
      gdprLink: 'Datenschutz',
    },
    faq: [
      {
        question: 'Wie hoch ist die Mindestabnahme?',
        answer:
          'Die Mindestabnahme legen wir individuell nach Betriebstyp und Lieferfrequenz fest. Das klären wir im Erstgespräch.',
      },
      {
        question: 'Welche Verpackungen sind für B2B verfügbar?',
        answer:
          'Standardmäßig bieten wir Flaschen, Kisten, 30-l- und 50-l-Fässer. Kleine 10-l- und 20.5-l-Fässer sind auf Vorbestellung möglich.',
      },
      {
        question: 'Wie erhalte ich Preisliste und Konditionen?',
        answer:
          'Preisliste und Konditionen senden wir nach dem Erstkontakt, abgestimmt auf Ihren Betrieb und die erwartete Menge.',
      },
      {
        question: 'Unterstützen Sie Partner auch im Marketing?',
        answer:
          'Ja. Wir unterstützen Sichtbarkeit, Produktpräsentation im Betrieb und zusätzliche Nachfrage aus dem E-Shop.',
      },
      {
        question: 'Wie funktionieren Lieferung und Abrechnung?',
        answer:
          'Lieferungen planen wir nach Standort und Volumen. Die Abrechnung läuft im üblichen B2B-Prozess nach Vereinbarung.',
      },
    ],
  },
}
