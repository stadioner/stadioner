'use client'

import { Container } from '@/components/container'
import { useLanguage } from '@/store/use-language'

export default function GdprPage() {
  const { language } = useLanguage()

  const content = {
    cs: {
      title: 'Ochrana osobních údajů',
      lastUpdated: 'Poslední aktualizace: 25. května 2018',
      intro:
        'Tyto podmínky ochrany osobních údajů se vztahují na zpracování osobních údajů v rámci provozování pivovaru Stadioner.',
      basicProvisions: {
        title: 'I. Základní ustanovení',
        controller: {
          title: 'Správce osobních údajů',
          content:
            'Správcem osobních údajů podle čl. 4 bod 7 nařízení Evropského parlamentu a Rady (EU) 2016/679 o ochraně fyzických osob v souvislosti se zpracováním osobních údajů a o volném pohybu těchto údajů (dále jen: „GDPR") je STADIONER PIVOVAR KOUT NA ŠUMAVĚ s.r.o. IČO 22478566 se sídlem Kout na Šumavě 2, 345 02 Kout na Šumavě (dále jen: „správce").',
        },
        contact: {
          title: 'Kontaktní údaje správce',
          address:
            'STADIONER PIVOVAR KOUT NA ŠUMAVĚ s.r.o. Kout na Šumavě 2, 345 02 Kout na Šumavě',
          email: 'Email: info@stadioner.cz',
          phone: 'Telefon: +420 601 535 416',
        },
        personalData: {
          title: 'Definice osobních údajů',
          content:
            'Osobními údaji se rozumí veškeré informace o identifikované nebo identifikovatelné fyzické osobě; identifikovatelnou fyzickou osobou je fyzická osoba, kterou lze přímo či nepřímo identifikovat, zejména odkazem na určitý identifikátor, například jméno, identifikační číslo, lokační údaje, síťový identifikátor nebo na jeden či více zvláštních prvků fyzické, fyziologické, genetické, psychické, ekonomické, kulturní nebo společenské identity této fyzické osoby.',
        },
        dpo: {
          title: 'Pověřenec pro ochranu osobních údajů',
          content: 'Správce nejmenoval pověřence pro ochranu osobních údajů.',
        },
      },
      sources: {
        title: 'II. Zdroje a kategorie zpracovávaných osobních údajů',
        sources: [
          'Správce zpracovává osobní údaje, které jste mu poskytl/a nebo osobní údaje, které správce získal na základě plnění Vaší objednávky.',
          'Správce zpracovává Vaše identifikační a kontaktní údaje a údaje nezbytné pro plnění smlouvy.',
        ],
      },
      legalBasis: {
        title: 'III. Zákonný důvod a účel zpracování osobních údajů',
        legalBasis: {
          title: 'Zákonné důvody zpracování',
          reasons: [
            'plnění smlouvy mezi Vámi a správcem podle čl. 6 odst. 1 písm. b) GDPR',
            'oprávněný zájem správce na poskytování přímého marketingu (zejména pro zasílání obchodních sdělení a newsletterů) podle čl. 6 odst. 1 písm. f) GDPR',
            'Váš souhlas se zpracováním pro účely poskytování přímého marketingu (zejména pro zasílání obchodních sdělení a newsletterů) podle čl. 6 odst. 1 písm. a) GDPR ve spojení s § 7 odst. 2 zákona č. 480/2004 Sb., o některých službách informační společnosti v případě, že nedošlo k objednávce zboží nebo služby',
          ],
        },
        purposes: {
          title: 'Účely zpracování',
          reasons: [
            'vyřízení Vaší objednávky a výkon práv a povinností vyplývajících ze smluvního vztahu mezi Vámi a správcem; při objednávce jsou vyžadovány osobní údaje, které jsou nutné pro úspěšné vyřízení objednávky (jméno a adresa, kontakt), poskytnutí osobních údajů je nutným požadavkem pro uzavření a plnění smlouvy, bez poskytnutí osobních údajů není možné smlouvu uzavřít či jí ze strany správce plnit',
            'zasílání obchodních sdělení a činění dalších marketingových aktivit',
          ],
        },
        automatedDecision: {
          title: 'Automatické rozhodování',
          content:
            'Ze strany správce dochází k automatickému individuálnímu rozhodování ve smyslu čl. 22 GDPR. S takovým zpracováním jste poskytl/a svůj výslovný souhlas.',
        },
      },
      retention: {
        title: 'IV. Doba uchovávání údajů',
        periods: [
          'po dobu nezbytnou k výkonu práv a povinností vyplývajících ze smluvního vztahu mezi Vámi a správcem a uplatňování nároků z těchto smluvních vztahů (po dobu 15 let od ukončení smluvního vztahu)',
          'po dobu, než je odvolán souhlas se zpracováním osobních údajů pro účely marketingu, nejdéle 30 let, jsou-li osobní údaje zpracovávány na základě souhlasu',
        ],
        deletion:
          'Po uplynutí doby uchovávání osobních údajů správce osobní údaje vymaže.',
      },
      recipients: {
        title: 'V. Příjemci osobních údajů (subdodavatelé správce)',
        recipients: [
          'osoby podílející se na dodání zboží / služeb / realizaci plateb na základě smlouvy',
          'osoby podílející se na zajištění provozu služeb',
          'osoby zajišťující marketingové služby',
        ],
        thirdCountry:
          'Správce má v úmyslu předat osobní údaje do třetí země (do země mimo EU) nebo mezinárodní organizaci. Příjemci osobních údajů ve třetích zemích jsou poskytovatelé mailingových služeb / cloudových služeb.',
      },
      rights: {
        title: 'VI. Vaše práva',
        rights: [
          'právo na přístup ke svým osobním údajům dle čl. 15 GDPR',
          'právo opravu osobních údajů dle čl. 16 GDPR, popřípadě omezení zpracování dle čl. 18 GDPR',
          'právo na výmaz osobních údajů dle čl. 17 GDPR',
          'právo vznést námitku proti zpracování dle čl. 21 GDPR',
          'právo na přenositelnost údajů dle čl. 20 GDPR',
          'právo odvolat souhlas se zpracováním písemně nebo elektronicky na adresu nebo email správce uvedený v čl. III těchto podmínek',
        ],
        complaint:
          'Dále máte právo podat stížnost u Úřadu pro ochranu osobních údajů v případě, že se domníváte, že bylo porušeno Vaší právo na ochranu osobních údajů.',
      },
      security: {
        title: 'VII. Podmínky zabezpečení osobních údajů',
        measures: [
          'Správce prohlašuje, že přijal veškerá vhodná technická a organizační opatření k zabezpečení osobních údajů.',
          'Správce přijal technická opatření k zabezpečení datových úložišť a úložišť osobních údajů v listinné podobě.',
          'Správce prohlašuje, že k osobním údajům mají přístup pouze jím pověřené osoby.',
        ],
      },
      final: {
        title: 'VIII. Závěrečná ustanovení',
        provisions: [
          'Odesláním objednávky z internetového objednávkového formuláře potvrzujete, že jste seznámen/a s podmínkami ochrany osobních údajů a že je v celém rozsahu přijímáte.',
          'S těmito podmínkami souhlasíte zaškrtnutím souhlasu prostřednictvím internetového formuláře. Zaškrtnutím souhlasu potvrzujete, že jste seznámen/a s podmínkami ochrany osobních údajů a že je v celém rozsahu přijímáte.',
          'Správce je oprávněn tyto podmínky změnit. Novou verzi podmínek ochrany osobních údajů zveřejní na svých internetových stránkách, případně Vám zašle novou verzi těchto podmínek na e-mailovou adresu, kterou jste správci poskytl/a.',
        ],
        effectiveDate: 'Tyto podmínky nabývají účinnosti dnem 25.5.2018.',
      },
    },
    en: {
      title: 'Personal Data Protection',
      lastUpdated: 'Last updated: September 21, 2025',
      intro:
        'These personal data protection conditions apply to the processing of personal data in the operation of Stadioner brewery.',
      basicProvisions: {
        title: 'I. Basic Provisions',
        controller: {
          title: 'Personal Data Controller',
          content:
            'The controller of personal data pursuant to Article 4(7) of Regulation (EU) 2016/679 of the European Parliament and of the Council on the protection of natural persons with regard to the processing of personal data and on the free movement of such data (hereinafter "GDPR") is SSTADIONER PIVOVAR KOUT NA ŠUMAVĚ s.r.o. ID No. 22478566 with registered office at Kout na Šumavě 2, 345 02 Kout na Šumavě (hereinafter "controller").',
        },
        contact: {
          title: 'Controller Contact Details',
          address:
            'STADIONER PIVOVAR KOUT NA ŠUMAVĚ s.r.o., Kout na Šumavě 2, 345 02 Kout na Šumavě',
          email: 'Email: info@stadioner.cz',
          phone: 'Phone: +420 601 535 416',
        },
        personalData: {
          title: 'Personal Data Definition',
          content:
            'Personal data means any information relating to an identified or identifiable natural person; an identifiable natural person is one who can be identified, directly or indirectly, in particular by reference to an identifier such as a name, an identification number, location data, an online identifier or to one or more factors specific to the physical, physiological, genetic, mental, economic, cultural or social identity of that natural person.',
        },
        dpo: {
          title: 'Data Protection Officer',
          content:
            'The controller has not appointed a data protection officer.',
        },
      },
      sources: {
        title: 'II. Sources and Categories of Processed Personal Data',
        sources: [
          'The controller processes personal data that you have provided to him or personal data that the controller has obtained on the basis of fulfilling your order.',
          'The controller processes your identification and contact data and data necessary for the performance of the contract.',
        ],
      },
      legalBasis: {
        title: 'III. Legal Basis and Purpose of Personal Data Processing',
        legalBasis: {
          title: 'Legal Basis for Processing',
          reasons: [
            'performance of a contract between you and the controller pursuant to Article 6(1)(b) GDPR',
            'legitimate interest of the controller in providing direct marketing (especially for sending business communications and newsletters) pursuant to Article 6(1)(f) GDPR',
            'your consent to processing for the purposes of providing direct marketing (especially for sending business communications and newsletters) pursuant to Article 6(1)(a) GDPR in conjunction with Section 7(2) of Act No. 480/2004 Coll., on certain information society services in case no order for goods or services has been placed',
          ],
        },
        purposes: {
          title: 'Purposes of Processing',
          reasons: [
            'processing your order and exercising rights and obligations arising from the contractual relationship between you and the controller; when placing an order, personal data are required which are necessary for successful processing of the order (name and address, contact), providing personal data is a necessary requirement for concluding and performing the contract, without providing personal data it is not possible to conclude the contract or perform it by the controller',
            'sending business communications and carrying out other marketing activities',
          ],
        },
        automatedDecision: {
          title: 'Automated Decision Making',
          content:
            'The controller carries out automated individual decision-making within the meaning of Article 22 GDPR. You have given your explicit consent to such processing.',
        },
      },
      retention: {
        title: 'IV. Data Retention Periods',
        periods: [
          'for the period necessary to exercise rights and obligations arising from the contractual relationship between you and the controller and to assert claims from these contractual relationships (for 15 years from the termination of the contractual relationship)',
          'until consent to processing for marketing purposes is withdrawn, at most 30 years, if personal data are processed on the basis of consent',
        ],
        deletion:
          'After the expiry of the personal data retention period, the controller will delete the personal data.',
      },
      recipients: {
        title: "V. Personal Data Recipients (Controller's Subcontractors)",
        recipients: [
          'persons involved in the delivery of goods/services/realization of payments based on the contract',
          'persons involved in ensuring the operation of services',
          'persons providing marketing services',
        ],
        thirdCountry:
          'The controller intends to transfer personal data to a third country (outside the EU) or international organization. Recipients of personal data in third countries are providers of mailing services/cloud services.',
      },
      rights: {
        title: 'VI. Your Rights',
        rights: [
          'right of access to your personal data pursuant to Article 15 GDPR',
          'right to rectification of personal data pursuant to Article 16 GDPR, or restriction of processing pursuant to Article 18 GDPR',
          'right to erasure of personal data pursuant to Article 17 GDPR',
          'right to object to processing pursuant to Article 21 GDPR',
          'right to data portability pursuant to Article 20 GDPR',
          'right to withdraw consent to processing in writing or electronically to the address or email of the controller specified in Article III of these conditions',
        ],
        complaint:
          'You also have the right to lodge a complaint with the Data Protection Authority if you believe that your right to personal data protection has been violated.',
      },
      security: {
        title: 'VII. Personal Data Security Conditions',
        measures: [
          'The controller declares that it has adopted all appropriate technical and organizational measures to secure personal data.',
          'The controller has adopted technical measures to secure data storage and storage of personal data in paper form.',
          'The controller declares that only persons authorized by it have access to personal data.',
        ],
      },
      final: {
        title: 'VIII. Final Provisions',
        provisions: [
          'By sending an order from the internet order form, you confirm that you are familiar with the personal data protection conditions and that you accept them in full.',
          'You agree to these conditions by checking the consent through the internet form. By checking the consent, you confirm that you are familiar with the personal data protection conditions and that you accept them in full.',
          'The controller is entitled to change these conditions. The new version of the personal data protection conditions will be published on its website, or will send you a new version of these conditions to the email address you provided to the controller.',
        ],
        effectiveDate: 'These conditions take effect on May 25, 2018.',
      },
    },
    de: {
      title: 'Datenschutz',
      lastUpdated: 'Letzte Aktualisierung: 21. September 2025',
      intro:
        'Diese Datenschutzbestimmungen gelten für die Verarbeitung personenbezogener Daten im Rahmen des Betriebs der Stadioner Brauerei.',
      basicProvisions: {
        title: 'I. Grundbestimmungen',
        controller: {
          title: 'Verantwortlicher für personenbezogene Daten',
          content:
            'Der Verantwortliche für personenbezogene Daten gemäß Artikel 4 Absatz 7 der Verordnung (EU) 2016/679 des Europäischen Parlaments und des Rates zum Schutz natürlicher Personen bei der Verarbeitung personenbezogener Daten und zum freien Datenverkehr (im Folgenden "DSGVO") ist STADIONER PIVOVAR KOUT NA ŠUMAVĚ s.r.o. ID-Nr. 22478566 mit Sitz in Kout na Šumavě 2, 345 02 Kout na Šumavě (im Folgenden "Verantwortlicher").',
        },
        contact: {
          title: 'Kontaktdaten des Verantwortlichen',
          address:
            'STADIONER PIVOVAR KOUT NA ŠUMAVĚ s.r.o., Kout na Šumavě 2, 345 02 Kout na Šumavě',
          email: 'E-Mail: info@stadioner.cz',
          phone: 'Telefon: +420 601 535 416',
        },
        personalData: {
          title: 'Definition personenbezogener Daten',
          content:
            'Personenbezogene Daten sind alle Informationen, die sich auf eine identifizierte oder identifizierbare natürliche Person beziehen; als identifizierbare natürliche Person wird eine Person angesehen, die direkt oder indirekt identifiziert werden kann, insbesondere durch Zuordnung zu einer Kennung wie einem Namen, zu einer Kennnummer, zu Standortdaten, zu einer Online-Kennung oder zu einem oder mehreren besonderen Merkmalen, die Ausdruck der physischen, physiologischen, genetischen, psychischen, wirtschaftlichen, kulturellen oder sozialen Identität dieser natürlichen Person sind.',
        },
        dpo: {
          title: 'Datenschutzbeauftragter',
          content:
            'Der Verantwortliche hat keinen Datenschutzbeauftragten bestellt.',
        },
      },
      sources: {
        title:
          'II. Quellen und Kategorien verarbeiteter personenbezogener Daten',
        sources: [
          'Der Verantwortliche verarbeitet personenbezogene Daten, die Sie ihm zur Verfügung gestellt haben, oder personenbezogene Daten, die der Verantwortliche auf der Grundlage der Erfüllung Ihrer Bestellung erhalten hat.',
          'Der Verantwortliche verarbeitet Ihre Identifikations- und Kontaktdaten sowie Daten, die für die Vertragserfüllung erforderlich sind.',
        ],
      },
      legalBasis: {
        title:
          'III. Rechtsgrundlage und Zweck der Verarbeitung personenbezogener Daten',
        legalBasis: {
          title: 'Rechtsgrundlagen für die Verarbeitung',
          reasons: [
            'Erfüllung eines Vertrags zwischen Ihnen und dem Verantwortlichen gemäß Artikel 6 Absatz 1 Buchstabe b DSGVO',
            'berechtigtes Interesse des Verantwortlichen an der Bereitstellung von Direktmarketing (insbesondere für den Versand von Geschäftskommunikation und Newslettern) gemäß Artikel 6 Absatz 1 Buchstabe f DSGVO',
            'Ihre Einwilligung zur Verarbeitung für die Zwecke der Bereitstellung von Direktmarketing (insbesondere für den Versand von Geschäftskommunikation und Newslettern) gemäß Artikel 6 Absatz 1 Buchstabe a DSGVO in Verbindung mit § 7 Absatz 2 des Gesetzes Nr. 480/2004 Slg. über bestimmte Dienste der Informationsgesellschaft, falls keine Bestellung von Waren oder Dienstleistungen aufgegeben wurde',
          ],
        },
        purposes: {
          title: 'Verarbeitungszwecke',
          reasons: [
            'Bearbeitung Ihrer Bestellung und Ausübung von Rechten und Pflichten aus dem Vertragsverhältnis zwischen Ihnen und dem Verantwortlichen; bei der Bestellung sind personenbezogene Daten erforderlich, die für die erfolgreiche Bearbeitung der Bestellung notwendig sind (Name und Adresse, Kontakt), die Bereitstellung personenbezogener Daten ist eine notwendige Voraussetzung für den Abschluss und die Erfüllung des Vertrags, ohne die Bereitstellung personenbezogener Daten ist es nicht möglich, den Vertrag abzuschließen oder ihn seitens des Verantwortlichen zu erfüllen',
            'Versand von Geschäftskommunikation und Durchführung anderer Marketingaktivitäten',
          ],
        },
        automatedDecision: {
          title: 'Automatisierte Entscheidungsfindung',
          content:
            'Der Verantwortliche führt automatisierte Einzelentscheidungen im Sinne von Artikel 22 DSGVO durch. Sie haben Ihre ausdrückliche Einwilligung zu einer solchen Verarbeitung erteilt.',
        },
      },
      retention: {
        title: 'IV. Aufbewahrungsfristen für Daten',
        periods: [
          'für den Zeitraum, der zur Ausübung von Rechten und Pflichten aus dem Vertragsverhältnis zwischen Ihnen und dem Verantwortlichen und zur Geltendmachung von Ansprüchen aus diesen Vertragsverhältnissen erforderlich ist (für 15 Jahre ab Beendigung des Vertragsverhältnisses)',
          'bis die Einwilligung zur Verarbeitung für Marketingzwecke widerrufen wird, höchstens 30 Jahre, wenn personenbezogene Daten auf der Grundlage einer Einwilligung verarbeitet werden',
        ],
        deletion:
          'Nach Ablauf der Aufbewahrungsfrist für personenbezogene Daten wird der Verantwortliche die personenbezogenen Daten löschen.',
      },
      recipients: {
        title:
          'V. Empfänger personenbezogener Daten (Subunternehmer des Verantwortlichen)',
        recipients: [
          'Personen, die an der Lieferung von Waren/Dienstleistungen/Realisierung von Zahlungen auf der Grundlage des Vertrags beteiligt sind',
          'Personen, die an der Sicherstellung des Betriebs der Dienstleistungen beteiligt sind',
          'Personen, die Marketingdienstleistungen erbringen',
        ],
        thirdCountry:
          'Der Verantwortliche beabsichtigt, personenbezogene Daten in ein Drittland (außerhalb der EU) oder eine internationale Organisation zu übermitteln. Empfänger personenbezogener Daten in Drittländern sind Anbieter von Mailing-/Cloud-Dienstleistungen.',
      },
      rights: {
        title: 'VI. Ihre Rechte',
        rights: [
          'Recht auf Zugang zu Ihren personenbezogenen Daten gemäß Artikel 15 DSGVO',
          'Recht auf Berichtigung personenbezogener Daten gemäß Artikel 16 DSGVO oder Einschränkung der Verarbeitung gemäß Artikel 18 DSGVO',
          'Recht auf Löschung personenbezogener Daten gemäß Artikel 17 DSGVO',
          'Recht auf Widerspruch gegen die Verarbeitung gemäß Artikel 21 DSGVO',
          'Recht auf Datenübertragbarkeit gemäß Artikel 20 DSGVO',
          'Recht auf Widerruf der Einwilligung zur Verarbeitung schriftlich oder elektronisch an die in Artikel III dieser Bedingungen angegebene Adresse oder E-Mail des Verantwortlichen',
        ],
        complaint:
          'Sie haben auch das Recht, eine Beschwerde bei der Datenschutzbehörde einzureichen, wenn Sie der Ansicht sind, dass Ihr Recht auf Schutz personenbezogener Daten verletzt wurde.',
      },
      security: {
        title: 'VII. Bedingungen für die Sicherheit personenbezogener Daten',
        measures: [
          'Der Verantwortliche erklärt, dass er alle geeigneten technischen und organisatorischen Maßnahmen zur Sicherung personenbezogener Daten getroffen hat.',
          'Der Verantwortliche hat technische Maßnahmen zur Sicherung von Datenspeichern und Speichern personenbezogener Daten in Papierform getroffen.',
          'Der Verantwortliche erklärt, dass nur von ihm autorisierte Personen Zugang zu personenbezogenen Daten haben.',
        ],
      },
      final: {
        title: 'VIII. Schlussbestimmungen',
        provisions: [
          'Durch das Senden einer Bestellung über das Internet-Bestellformular bestätigen Sie, dass Sie mit den Datenschutzbestimmungen vertraut sind und diese vollständig akzeptieren.',
          'Sie stimmen diesen Bedingungen durch Ankreuzen der Einwilligung über das Internet-Formular zu. Durch das Ankreuzen der Einwilligung bestätigen Sie, dass Sie mit den Datenschutzbestimmungen vertraut sind und diese vollständig akzeptieren.',
          'Der Verantwortliche ist berechtigt, diese Bedingungen zu ändern. Die neue Version der Datenschutzbestimmungen wird auf seiner Website veröffentlicht oder sendet Ihnen eine neue Version dieser Bedingungen an die E-Mail-Adresse, die Sie dem Verantwortlichen mitgeteilt haben.',
        ],
        effectiveDate: 'Diese Bedingungen treten am 25. Mai 2018 in Kraft.',
      },
    },
  }

  const t = content[language as keyof typeof content] || content.cs

  return (
    <main className='bg-brand-primary pt-32 md:pt-40 pb-20'>
      <Container className='max-w-4xl'>
        <div className='prose prose-lg max-w-none'>
          <h1 className='text-4xl md:text-5xl font-bold text-brand-action mb-4'>
            {t.title}
          </h1>
          <p className='text-gray-600 mb-8'>{t.lastUpdated}</p>

          <div className='space-y-8'>
            <section>
              <p className='text-lg text-gray-700 leading-relaxed'>{t.intro}</p>
            </section>

            {/* Basic Provisions */}
            <section>
              <h2 className='text-2xl font-bold text-brand-action mb-4'>
                {t.basicProvisions.title}
              </h2>

              <div className='space-y-6'>
                <div>
                  <h3 className='text-xl font-semibold text-brand-action mb-2'>
                    {t.basicProvisions.controller.title}
                  </h3>
                  <p className='text-gray-700 leading-relaxed'>
                    {t.basicProvisions.controller.content}
                  </p>
                </div>

                <div>
                  <h3 className='text-xl font-semibold text-brand-action mb-2'>
                    {t.basicProvisions.contact.title}
                  </h3>
                  <div className='text-gray-700 space-y-1'>
                    <p>
                      <strong>Adresa:</strong>{' '}
                      {t.basicProvisions.contact.address}
                    </p>
                    <p>{t.basicProvisions.contact.email}</p>
                    <p>{t.basicProvisions.contact.phone}</p>
                  </div>
                </div>

                <div>
                  <h3 className='text-xl font-semibold text-brand-action mb-2'>
                    {t.basicProvisions.personalData.title}
                  </h3>
                  <p className='text-gray-700 leading-relaxed'>
                    {t.basicProvisions.personalData.content}
                  </p>
                </div>

                <div>
                  <h3 className='text-xl font-semibold text-brand-action mb-2'>
                    {t.basicProvisions.dpo.title}
                  </h3>
                  <p className='text-gray-700 leading-relaxed'>
                    {t.basicProvisions.dpo.content}
                  </p>
                </div>
              </div>
            </section>

            {/* Sources */}
            <section>
              <h2 className='text-2xl font-bold text-brand-action mb-4'>
                {t.sources.title}
              </h2>
              <ul className='list-disc list-inside space-y-2 text-gray-700'>
                {t.sources.sources.map((source, index) => (
                  <li key={index}>{source}</li>
                ))}
              </ul>
            </section>

            {/* Legal Basis */}
            <section>
              <h2 className='text-2xl font-bold text-brand-action mb-4'>
                {t.legalBasis.title}
              </h2>

              <div className='space-y-6'>
                <div>
                  <h3 className='text-xl font-semibold text-brand-action mb-2'>
                    {t.legalBasis.legalBasis.title}
                  </h3>
                  <ul className='list-disc list-inside space-y-2 text-gray-700'>
                    {t.legalBasis.legalBasis.reasons.map((reason, index) => (
                      <li key={index}>{reason}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className='text-xl font-semibold text-brand-action mb-2'>
                    {t.legalBasis.purposes.title}
                  </h3>
                  <ul className='list-disc list-inside space-y-2 text-gray-700'>
                    {t.legalBasis.purposes.reasons.map((reason, index) => (
                      <li key={index}>{reason}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className='text-xl font-semibold text-brand-action mb-2'>
                    {t.legalBasis.automatedDecision.title}
                  </h3>
                  <p className='text-gray-700 leading-relaxed'>
                    {t.legalBasis.automatedDecision.content}
                  </p>
                </div>
              </div>
            </section>

            {/* Retention */}
            <section>
              <h2 className='text-2xl font-bold text-brand-action mb-4'>
                {t.retention.title}
              </h2>
              <ul className='list-disc list-inside space-y-2 text-gray-700 mb-4'>
                {t.retention.periods.map((period, index) => (
                  <li key={index}>{period}</li>
                ))}
              </ul>
              <p className='text-gray-700'>{t.retention.deletion}</p>
            </section>

            {/* Recipients */}
            <section>
              <h2 className='text-2xl font-bold text-brand-action mb-4'>
                {t.recipients.title}
              </h2>
              <ul className='list-disc list-inside space-y-2 text-gray-700 mb-4'>
                {t.recipients.recipients.map((recipient, index) => (
                  <li key={index}>{recipient}</li>
                ))}
              </ul>
              <p className='text-gray-700'>{t.recipients.thirdCountry}</p>
            </section>

            {/* Rights */}
            <section>
              <h2 className='text-2xl font-bold text-brand-action mb-4'>
                {t.rights.title}
              </h2>
              <ul className='list-disc list-inside space-y-2 text-gray-700 mb-4'>
                {t.rights.rights.map((right, index) => (
                  <li key={index}>{right}</li>
                ))}
              </ul>
              <p className='text-gray-700'>{t.rights.complaint}</p>
            </section>

            {/* Security */}
            <section>
              <h2 className='text-2xl font-bold text-brand-action mb-4'>
                {t.security.title}
              </h2>
              <ul className='list-disc list-inside space-y-2 text-gray-700'>
                {t.security.measures.map((measure, index) => (
                  <li key={index}>{measure}</li>
                ))}
              </ul>
            </section>

            {/* Final Provisions */}
            <section>
              <h2 className='text-2xl font-bold text-brand-action mb-4'>
                {t.final.title}
              </h2>
              <ul className='list-disc list-inside space-y-2 text-gray-700 mb-4'>
                {t.final.provisions.map((provision, index) => (
                  <li key={index}>{provision}</li>
                ))}
              </ul>
              <p className='text-gray-700 font-semibold'>
                {t.final.effectiveDate}
              </p>
            </section>
          </div>
        </div>
      </Container>
    </main>
  )
}
