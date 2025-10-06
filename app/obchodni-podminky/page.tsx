import { Container } from '@/components/container'

export default function TermsPage() {
  return (
    <main className='bg-brand-primary pt-32 md:pt-40 pb-20'>
      <Container className='max-w-4xl'>
        <div className='prose prose-lg max-w-none'>
          <h1 className='text-4xl md:text-5xl font-bold text-brand-action mb-4'>
            Obchodní podmínky
          </h1>
          <p className='text-gray-600 mb-8'>
            Poslední aktualizace: 1. listopadu 2025
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
                <p className='text-gray-700'>Stadioner s.r.o.</p>
                <p className='text-gray-700'>
                  Sídlo: [Vyplňte adresu sídla společnosti]
                </p>
                <p className='text-gray-700'>IČO: [Vyplňte IČO]</p>
                <p className='text-gray-700'>DIČ: [Vyplňte DIČ]</p>
                <p className='text-gray-700'>
                  Zapsána v obchodním rejstříku vedeném u [Vyplňte příslušný
                  soud], oddíl [Vyplňte], vložka [Vyplňte]
                </p>
                <div className='mt-2'>
                  <p className='text-gray-700'>
                    <strong>Kontaktní údaje:</strong>
                  </p>
                  <p className='text-gray-700'>
                    Doručovací adresa: [Vyplňte doručovací adresu]
                  </p>
                  <p className='text-gray-700'>E‑mail: eshop@stadioner.cz</p>
                  <p className='text-gray-700'>
                    Telefon: [Vyplňte telefonní číslo]
                  </p>
                  <p className='text-gray-700'>Web: https://stadioner.cz</p>
                </div>
              </div>
              <p className='text-gray-700 leading-relaxed mt-4'>
                Tyto obchodní podmínky upravují vzájemná práva a povinnosti
                prodávajícího a kupujícího při nákupu zboží prostřednictvím
                internetového obchodu na adrese https://stadioner.cz. Ustanovení
                obchodních podmínek jsou nedílnou součástí kupní smlouvy.
                Odchylná ujednání v kupní smlouvě mají přednost před těmito
                podmínkami.
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
                IV. Zákaznický účet
              </h2>
              <ul className='list-disc list-inside space-y-2 text-gray-700'>
                <li>
                  Registrací získáte přístup k zákaznickému účtu pro rychlejší
                  nákupy.
                </li>
                <li>Udržujte své údaje aktuální a pravdivé.</li>
                <li>
                  Přístup chraňte – prodávající neodpovídá za zneužití třetími
                  osobami.
                </li>
                <li>
                  Účet může být zrušen při nečinnosti nebo porušení povinností.
                </li>
              </ul>
            </section>

            <section>
              <h2 className='text-2xl font-bold text-brand-action mb-4'>
                V. Platební podmínky a dodání zboží
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
                VI. Odstoupení od smlouvy (spotřebitel)
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
                VII. Práva z vadného plnění
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
                  Reklamace: e‑mail eshop@stadioner.cz; vyřízení bezodkladně,
                  nejpozději do 30 dní.
                </li>
              </ul>
            </section>

            <section>
              <h2 className='text-2xl font-bold text-brand-action mb-4'>
                VIII. Zvláštní ustanovení pro dárkové poukazy
              </h2>
              <ul className='list-disc list-inside space-y-2 text-gray-700'>
                <li>
                  Poukaz lze uplatnit pouze v e‑shopu https://stadioner.cz (mimo
                  dárkové poukazy).
                </li>
                <li>
                  Poukaz je zasílán elektronicky (PDF) do 24 hodin od připsání
                  platby, případně poštou.
                </li>
                <li>
                  Spotřebitel může odstoupit do 14 dní, nebyl‑li poukaz
                  uplatněn.
                </li>
                <li>
                  Platnost poukazu je 12 měsíců od zaslání; minimální hodnota
                  nákupu musí odpovídat hodnotě poukazu.
                </li>
              </ul>
            </section>

            <section>
              <h2 className='text-2xl font-bold text-brand-action mb-4'>
                IX. Doručování
              </h2>
              <p className='text-gray-700'>
                Korespondence probíhá elektronicky na adresy uvedené v
                objednávce nebo zákaznickém účtu kupujícího, případně na e‑mail
                prodávajícího eshop@stadioner.cz.
              </p>
            </section>

            <section>
              <h2 className='text-2xl font-bold text-brand-action mb-4'>
                X. Osobní údaje
              </h2>
              <p className='text-gray-700'>
                Osobní údaje jsou zpracovávány v souladu s GDPR a zákonem č.
                110/2019 Sb. Podrobnosti viz „Ochrana osobních údajů“ na webu.
              </p>
            </section>

            <section>
              <h2 className='text-2xl font-bold text-brand-action mb-4'>
                XI. Mimosoudní řešení sporů
              </h2>
              <ul className='list-disc list-inside space-y-2 text-gray-700'>
                <li>
                  ČOI: Štěpánská 567/15, 120 00 Praha 2, https://adr.coi.cz/cs
                </li>
                <li>Online řešení sporů: http://ec.europa.eu/consumers/odr</li>
                <li>
                  Evropské spotřebitelské centrum:
                  http://www.evropskyspotrebitel.cz
                </li>
              </ul>
            </section>

            <section>
              <h2 className='text-2xl font-bold text-brand-action mb-4'>
                XII. Závěrečná ustanovení
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
                Tyto obchodní podmínky nabývají účinnosti dnem [1. 11. 2025].
              </p>
            </section>

            <section>
              <h2 className='text-2xl font-bold text-brand-action mb-4'>
                Příloha: Vzorový formulář pro odstoupení od smlouvy
              </h2>
              <p className='text-gray-700 mb-2'>
                Vyplňte a odešlete na e‑mail eshop@stadioner.cz nebo na
                doručovací adresu prodávajícího.
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
