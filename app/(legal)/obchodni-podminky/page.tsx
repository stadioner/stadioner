import { Container } from '@/components/container'
import Link from 'next/link'

export default function TermsPage() {
  return (
    <main className='bg-brand-primary pt-32 md:pt-40 pb-20'>
      <Container className='max-w-4xl'>
        <div className='prose prose-lg max-w-none'>
          <h1 className='text-4xl md:text-5xl font-bold text-brand-action mb-4'>
            Obchodní podmínky
          </h1>
          <p className='text-gray-600 mb-8'>
            Poslední aktualizace: 1. října 2025
          </p>

          <div className='space-y-8'>
            <section>
              <h2 className='text-2xl font-bold text-brand-action mb-4'>
                I. Základní ustanovení
              </h2>
              <p className='text-gray-700 leading-relaxed'>
                Tyto všeobecné obchodní podmínky (dále jen „obchodní podmínky“)
                jsou vydány dle § 1751 a násl. zákona č. 89/2012 Sb., občanský
                zákoník (dále jen „občanský zákoník“).
              </p>
              <div className='mt-4 space-y-2'>
                <p className='text-gray-700'>
                  <strong>Prodávající:</strong>
                </p>
                <p className='text-gray-700'>
                  STADIONER PIVOVAR KOUT NA ŠUMAVĚ s.r.o.
                </p>
                <p className='text-gray-700'>
                  Sídlo: Kout na Šumavě 2, 345 02 Kout na Šumavě
                </p>
                <p className='text-gray-700'>IČO: 22478566</p>
                <p className='text-gray-700'>DIČ: CZ22478566</p>
                <p className='text-gray-700'>
                  Spisová značka: C 46196/KSPL Krajský soud v Plzni Datová
                  schránka: ff59ze2
                </p>
                <div className='mt-2'>
                  <p className='text-gray-700'>
                    <strong>Kontaktní údaje:</strong>
                  </p>
                  <p className='text-gray-700'>
                    Doručovací adresa: Kout na Šumavě 2, 345 02 Kout na Šumavě
                  </p>
                  <p className='text-gray-700'>
                    E‑mail:{' '}
                    <Link href='mailto:eshop@stadioner.cz'>
                      eshop@stadioner.cz
                    </Link>
                    .cz
                  </p>
                  <p className='text-gray-700'>Telefon: +420 721 980 257]</p>
                  <p className='text-gray-700'>
                    Web:
                    <Link href='https://stadioner.cz'> stadioner.cz</Link>
                  </p>
                </div>
              </div>
              <p className='text-gray-700 leading-relaxed mt-4'>
                Tyto obchodní podmínky upravují vzájemná práva a povinnosti
                prodávajícího a kupujícího při nákupu zboží prostřednictvím
                internetového obchodu na adrese
                <Link href='https://stadioner.cz'> stadioner.cz</Link>.
                Ustanovení obchodních podmínek jsou nedílnou součástí kupní
                smlouvy. Odchylná ujednání v kupní smlouvě mají přednost před
                těmito podmínkami.
              </p>
              <p className='text-gray-700 leading-relaxed'>
                Tyto obchodní podmínky a kupní smlouva se uzavírají v českém
                jazyce. Prodej alkoholických nápojů osobám mladším 18 let je
                zakázán.
              </p>
            </section>

            <section>
              <h2 className='text-2xl font-bold text-brand-action mb-4'>
                II. Informace o zboží a cenách
              </h2>
              <p className='text-gray-700 mb-4'>
                Informace o zboží, včetně cen a hlavních vlastností, jsou
                uvedeny u jednotlivého zboží. Ceny jsou uváděny včetně DPH a
                všech souvisejících poplatků. Nezahrnují náklady na dopravu,
                pokud není uvedeno jinak.
              </p>
              <ul className='list-disc list-inside space-y-2 text-gray-700'>
                <li>
                  Prezentace zboží má informativní charakter, nejde o návrh na
                  uzavření smlouvy.
                </li>
                <li>
                  Informace o nákladech na balení a dodání jsou uvedeny v
                  e‑shopu.
                </li>
                <li>Případné slevy nelze kombinovat, nedohodne‑li se jinak.</li>
              </ul>
            </section>

            <section>
              <h2 className='text-2xl font-bold text-brand-action mb-4'>
                III. Objednávka a uzavření kupní smlouvy
              </h2>
              <p className='text-gray-700 mb-4'>
                Náklady na prostředky komunikace na dálku hradí kupující sám.
                Objednávku lze provést z účtu nebo bez registrace vyplněním
                formuláře.
              </p>
              <ul className='list-disc list-inside space-y-2 text-gray-700'>
                <li>Objednávku odešlete kliknutím na „Odeslat objednávku“.</li>
                <li>Po obdržení objednávky zašleme potvrzení na váš e‑mail.</li>
                <li>
                  Smlouva je uzavřena až potvrzením objednávky prodávajícím.
                </li>
                <li>
                  Chybná cena v e‑shopu nezakládá povinnost dodat za chybnou
                  cenu.
                </li>
                <li>Alkohol neprodáváme osobám mladším 18 let.</li>
              </ul>
            </section>

            <section>
              <h2 className='text-2xl font-bold text-brand-action mb-4'>
                IV. Platební podmínky a dodání zboží
              </h2>
              <ul className='list-disc list-inside space-y-2 text-gray-700'>
                <li>
                  Platba převodem, kartou přes platební bránu, nebo dobírkou.
                </li>
                <li>
                  Závazek uhradit cenu je splněn připsáním částky na účet
                  prodávajícího.
                </li>
                <li>
                  Dodací lhůta obvykle [2–5 pracovních dní], není‑li uvedeno
                  jinak.
                </li>
                <li>
                  Kupující je povinen zboží převzít a zkontrolovat neporušenost
                  obalu.
                </li>
              </ul>
            </section>

            <section>
              <h2 className='text-2xl font-bold text-brand-action mb-4'>
                V. Odstoupení od smlouvy (spotřebitel)
              </h2>
              <p className='text-gray-700 mb-2'>
                Máte právo odstoupit bez udání důvodu do 14 dní od převzetí.
              </p>
              <ul className='list-disc list-inside space-y-2 text-gray-700 mb-4'>
                <li>Vrácení do 14 dní; náklady na vrácení nese kupující.</li>
                <li>
                  Peněžní prostředky vrátíme do 14 dní stejným způsobem, pokud
                  se nedohodneme jinak.
                </li>
                <li>
                  Zboží vracejte nepoškozené, neopotřebené a ideálně v původním
                  obalu.
                </li>
              </ul>
              <p className='text-gray-700'>
                Výjimky dle § 1837 občanského zákoníku (např. rychle se kazící
                zboží, zboží vyňaté z obalu z hygienických důvodů, alkoholické
                nápoje s cenou závislou na finančním trhu atd.).
              </p>
            </section>

            <section>
              <h2 className='text-2xl font-bold text-brand-action mb-4'>
                VI. Práva z vadného plnění
              </h2>
              <ul className='list-disc list-inside space-y-2 text-gray-700'>
                <li>
                  Práva lze uplatnit do 24 měsíců od převzetí (není‑li uvedeno
                  jinak).
                </li>
                <li>
                  Možnosti: výměna, oprava, sleva, odstoupení při podstatné
                  vadě.
                </li>
                <li>
                  Reklamace: e‑mail{' '}
                  <Link href='mailto:eshop@stadioner.cz'>
                    eshop@stadioner.cz
                  </Link>
                  ; vyřízení bezodkladně, nejpozději do 30 dní.
                </li>
              </ul>
            </section>

            <section>
              <h2 className='text-2xl font-bold text-brand-action mb-4'>
                VII. Doručování
              </h2>
              <p className='text-gray-700'>
                Korespondence probíhá elektronicky na adresy uvedené v
                objednávce nebo zákaznickém účtu kupujícího, případně na e‑mail
                prodávajícího{' '}
                <Link href='mailto:eshop@stadioner.cz'>eshop@stadioner.cz</Link>
                .
              </p>
            </section>

            <section>
              <h2 className='text-2xl font-bold text-brand-action mb-4'>
                VIII. Osobní údaje
              </h2>
              <p className='text-gray-700'>
                Osobní údaje jsou zpracovávány v souladu s
                <Link href='/cs/gdpr'> GDPR </Link>a zákonem č. 110/2019 Sb.
                Podrobnosti viz „Ochrana osobních údajů“ na webu.
              </p>
            </section>

            <section>
              <h2 className='text-2xl font-bold text-brand-action mb-4'>
                IX. Mimosoudní řešení sporů
              </h2>
              <ul className='list-disc list-inside space-y-2 text-gray-700'>
                <li>
                  ČOI: Štěpánská 567/15, 120 00 Praha 2,{' '}
                  <Link href='https://adr.coi.cz/cs'>
                    https://adr.coi.cz/cs
                  </Link>
                </li>
                <li>
                  Online řešení sporů:{' '}
                  <Link href='http://ec.europa.eu/consumers/odr'>
                    http://ec.europa.eu/consumers/odr
                  </Link>
                </li>
                <li>
                  Evropské spotřebitelské centrum:{' '}
                  <Link href='http://www.evropskyspotrebitel.cz'>
                    http://www.evropskyspotrebitel.cz
                  </Link>
                </li>
              </ul>
            </section>

            <section>
              <h2 className='text-2xl font-bold text-brand-action mb-4'>
                X. Závěrečná ustanovení
              </h2>
              <ul className='list-disc list-inside space-y-2 text-gray-700 mb-2'>
                <li>Vztah se řídí právem České republiky.</li>
                <li>
                  Prodávající není vázán žádnými kodexy chování dle § 1826 odst.
                  1 písm. e) OZ.
                </li>
                <li>
                  Obsah webu je chráněn autorským právem; kopírování bez
                  souhlasu je zakázáno.
                </li>
                <li>
                  Prodávající neodpovídá za zásahy třetích osob či užití webu v
                  rozporu s určením.
                </li>
                <li>
                  Kupující přebírá nebezpečí změny okolností dle § 1765 odst. 2
                  OZ.
                </li>
                <li>
                  Kupní smlouva a VOP jsou archivovány elektronicky a nejsou
                  veřejně přístupné.
                </li>
                <li>
                  Prodávající může VOP měnit; práva a povinnosti vzniklá dříve
                  nejsou dotčena.
                </li>
              </ul>
              <p className='text-gray-700 font-semibold'>
                Tyto obchodní podmínky nabývají účinnosti dnem 1. 10. 2025.
              </p>
            </section>

            <section>
              <h2 className='text-2xl font-bold text-brand-action mb-4'>
                Příloha: Vzorový formulář pro odstoupení od smlouvy
              </h2>
              <p className='text-gray-700 mb-2'>
                Vyplňte a odešlete na e‑mail{' '}
                <Link href='mailto:eshop@stadioner.cz'>eshop@stadioner.cz</Link>{' '}
                nebo na doručovací adresu prodávajícího.
              </p>
              <ul className='list-disc list-inside space-y-2 text-gray-700'>
                <li>
                  Oznamuji, že tímto odstupuji od smlouvy o nákupu tohoto zboží:
                  [popis zboží].
                </li>
                <li>Datum objednání zboží: [datum]</li>
                <li>Číslo objednávky: [číslo]</li>
                <li>Číslo prodejního dokladu: [číslo]</li>
                <li>Jméno a příjmení: [jméno]</li>
                <li>Adresa: [adresa]</li>
                <li>E‑mail: [e‑mail]</li>
                <li>Telefon: [telefon]</li>
                <li>Žádám vrácení kupní ceny na účet číslo: [číslo účtu].</li>
                <li>V [místo], dne [datum], podpis kupujícího‑spotřebitele.</li>
              </ul>
            </section>
          </div>
        </div>
      </Container>
    </main>
  )
}
