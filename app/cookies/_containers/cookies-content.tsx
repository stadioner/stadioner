'use client'

import { Container } from '@/components/container'
import { useLanguage } from '@/store/use-language'
import { useCookieConsent } from '@/store/use-cookie-consent'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

export const CookiesContent = () => {
  const { language } = useLanguage()
  const {
    cookiePreferences,
    setCookiePreferences,
    resetPreferences,
    hasConsented,
  } = useCookieConsent()
  const [showPreferences, setShowPreferences] = useState(false)
  const [tempPreferences, setTempPreferences] = useState(cookiePreferences)

  const handlePreferenceChange = (
    type: keyof typeof cookiePreferences,
    value: boolean
  ) => {
    if (type === 'essential') return // Essential cookies can't be disabled
    setTempPreferences(prev => ({ ...prev, [type]: value }))
  }

  const handleSavePreferences = () => {
    setCookiePreferences(tempPreferences)
    setShowPreferences(false)
  }

  const handleResetPreferences = () => {
    resetPreferences()
    setTempPreferences({
      essential: true,
      functional: false,
      analytics: false,
      marketing: false,
    })
  }

  const content = {
    cs: {
      title: 'Informace o cookies',
      lastUpdated: 'Poslední aktualizace: 17. ledna 2025',
      intro:
        'Tato stránka obsahuje informace o používání cookies na webových stránkách pivovaru Stadioner.',
      whatAreCookies: {
        title: 'Co jsou cookies?',
        content:
          'Cookies jsou malé textové soubory, které se ukládají do vašeho zařízení při návštěvě webových stránek. Tyto soubory pomáhají webovým stránkám zapamatovat si informace o vaší návštěvě, což může usnadnit další návštěvu a stránky učinit užitečnějšími.',
      },
      howWeUse: {
        title: 'Jak používáme cookies',
        content: 'Pivovar Stadioner používá cookies k následujícím účelům:',
        purposes: [
          'Zajištění základní funkčnosti webových stránek',
          'Zapamatování si vašich preferencí (například jazyka)',
          'Analýza návštěvnosti a zlepšování našich služeb',
          'Zobrazování relevantního obsahu a reklam',
        ],
      },
      typesOfCookies: {
        title: 'Typy cookies, které používáme',
        essential: {
          title: 'Nezbytné cookies',
          description:
            'Tyto cookies jsou nezbytné pro fungování webových stránek a nelze je vypnout. Obvykle se nastavují pouze v reakci na akce, které provedete a které se rovnají požadavku na služby, jako je nastavení vašich preferencí soukromí, přihlášení nebo vyplnění formulářů.',
        },
        functional: {
          title: 'Funkční cookies',
          description:
            'Tyto cookies umožňují webovým stránkám zapamatovat si volby, které děláte (například vaše uživatelské jméno, jazyk nebo region, ve kterém se nacházíte) a poskytovat vylepšené, osobnější funkce.',
        },
        analytics: {
          title: 'Analytické cookies',
          description:
            'Tyto cookies nám pomáhají pochopit, jak návštěvníci používají naše webové stránky, shromažďováním a hlášením informací anonymně. To nám pomáhá zlepšovat výkon našich stránek.',
        },
        marketing: {
          title: 'Marketingové cookies',
          description:
            'Tyto cookies se používají k sledování návštěvníků napříč webovými stránkami. Cílem je zobrazovat reklamy, které jsou relevantní a atraktivní pro jednotlivé uživatele.',
        },
      },
      thirdParty: {
        title: 'Cookies třetích stran',
        content:
          'Naše webové stránky mohou obsahovat cookies od třetích stran, jako jsou:',
        services: [
          'Google Analytics - pro analýzu návštěvnosti',
          'Sociální sítě (Facebook, Instagram, TikTok) - pro sdílení obsahu',
          'Google Maps - pro zobrazení mapy',
        ],
      },
      managingCookies: {
        title: 'Správa cookies',
        content:
          'Můžete kontrolovat a/nebo mazat cookies podle potřeby. Můžete vymazat všechny cookies, které jsou již na vašem počítači, a můžete nastavit většinu prohlížečů tak, aby zabránily jejich ukládání.',
        browserSettings: 'Nastavení cookies v prohlížečích:',
        browsers: [
          'Chrome: Nastavení > Soukromí a zabezpečení > Cookies a další data stránek',
          'Firefox: Možnosti > Soukromí a zabezpečení > Cookies a data stránek',
          'Safari: Předvolby > Soukromí > Cookies a data webových stránek',
          'Edge: Nastavení > Soukromí, vyhledávání a služby > Cookies a oprávnění stránek',
        ],
      },
      consent: {
        title: 'Souhlas s cookies',
        content:
          'Při první návštěvě našich webových stránek se zobrazí banner s informacemi o cookies. Pokračováním v prohlížení stránek nebo kliknutím na "Přijmout" vyjadřujete souhlas s používáním cookies podle této politiky.',
        withdraw:
          'Svůj souhlas můžete kdykoli odvolat změnou nastavení cookies ve vašem prohlížeči nebo kontaktováním naší společnosti.',
      },
      contact: {
        title: 'Kontakt',
        content:
          'Máte-li jakékoli dotazy týkající se naší politiky cookies, kontaktujte nás:',
        email: 'Email: info@stadioner.cz',
        phone: 'Telefon: +420 601 535 416',
      },
      changes: {
        title: 'Změny této politiky',
        content:
          'Tuto politiku cookies můžeme čas od času aktualizovat. Jakékoli změny zveřejníme na této stránce s aktualizovaným datem "Poslední aktualizace".',
      },
      preferences: {
        title: 'Správa preferencí cookies',
        description:
          'Můžete změnit své preference cookies kdykoli. Změny se projeví okamžitě.',
        manageButton: 'Spravovat preference',
        saveButton: 'Uložit změny',
        resetButton: 'Obnovit výchozí',
        currentSettings: 'Aktuální nastavení',
        essential: 'Nezbytné cookies',
        essentialDesc: 'Potřebné pro základní funkčnost webu',
        functional: 'Funkční cookies',
        functionalDesc: 'Umožňují zapamatovat si vaše preference',
        analytics: 'Analytické cookies',
        analyticsDesc: 'Pomáhají nám pochopit, jak používáte web',
        marketing: 'Marketingové cookies',
        marketingDesc: 'Používají se pro zobrazování relevantních reklam',
        enabled: 'Povoleno',
        disabled: 'Zakázáno',
      },
    },
    en: {
      title: 'Cookie Information',
      lastUpdated: 'Last updated: January 17, 2025',
      intro:
        'This page contains information about the use of cookies on the Stadioner brewery website.',
      whatAreCookies: {
        title: 'What are cookies?',
        content:
          'Cookies are small text files that are stored on your device when you visit websites. These files help websites remember information about your visit, which can make future visits easier and make the pages more useful.',
      },
      howWeUse: {
        title: 'How we use cookies',
        content: 'Stadioner Brewery uses cookies for the following purposes:',
        purposes: [
          'Ensuring basic website functionality',
          'Remembering your preferences (such as language)',
          'Analyzing traffic and improving our services',
          'Displaying relevant content and advertisements',
        ],
      },
      typesOfCookies: {
        title: 'Types of cookies we use',
        essential: {
          title: 'Essential cookies',
          description:
            'These cookies are necessary for the website to function and cannot be switched off. They are usually only set in response to actions made by you which amount to a request for services, such as setting your privacy preferences, logging in or filling in forms.',
        },
        functional: {
          title: 'Functional cookies',
          description:
            'These cookies enable the website to provide enhanced functionality and personalisation. They may be set by us or by third party providers whose services we have added to our pages.',
        },
        analytics: {
          title: 'Analytics cookies',
          description:
            'These cookies help us understand how visitors use our website by collecting and reporting information anonymously. This helps us improve the performance of our pages.',
        },
        marketing: {
          title: 'Marketing cookies',
          description:
            'These cookies are used to track visitors across websites. The intention is to display ads that are relevant and engaging for the individual user.',
        },
      },
      thirdParty: {
        title: 'Third-party cookies',
        content: 'Our website may contain cookies from third parties, such as:',
        services: [
          'Google Analytics - for traffic analysis',
          'Social networks (Facebook, Instagram, TikTok) - for content sharing',
          'Google Maps - for map display',
        ],
      },
      managingCookies: {
        title: 'Managing cookies',
        content:
          'You can control and/or delete cookies as you wish. You can delete all cookies that are already on your computer and you can set most browsers to prevent them from being placed.',
        browserSettings: 'Cookie settings in browsers:',
        browsers: [
          'Chrome: Settings > Privacy and security > Cookies and other site data',
          'Firefox: Options > Privacy and security > Cookies and site data',
          'Safari: Preferences > Privacy > Cookies and website data',
          'Edge: Settings > Privacy, search, and services > Cookies and site permissions',
        ],
      },
      consent: {
        title: 'Cookie consent',
        content:
          'When you first visit our website, a banner with cookie information will be displayed. By continuing to browse the site or clicking "Accept", you consent to the use of cookies according to this policy.',
        withdraw:
          'You can withdraw your consent at any time by changing your cookie settings in your browser or by contacting our company.',
      },
      contact: {
        title: 'Contact',
        content:
          'If you have any questions regarding our cookie policy, please contact us:',
        email: 'Email: info@stadioner.cz',
        phone: 'Phone: +420 601 535 416',
      },
      changes: {
        title: 'Changes to this policy',
        content:
          'We may update this cookie policy from time to time. Any changes will be published on this page with an updated "Last updated" date.',
      },
      preferences: {
        title: 'Cookie Preferences Management',
        description:
          'You can change your cookie preferences at any time. Changes will take effect immediately.',
        manageButton: 'Manage Preferences',
        saveButton: 'Save Changes',
        resetButton: 'Reset to Default',
        currentSettings: 'Current Settings',
        essential: 'Essential cookies',
        essentialDesc: 'Necessary for basic website functionality',
        functional: 'Functional cookies',
        functionalDesc: 'Allow us to remember your preferences',
        analytics: 'Analytics cookies',
        analyticsDesc: 'Help us understand how you use the website',
        marketing: 'Marketing cookies',
        marketingDesc: 'Used to display relevant advertisements',
        enabled: 'Enabled',
        disabled: 'Disabled',
      },
    },
    de: {
      title: 'Cookie-Informationen',
      lastUpdated: 'Letzte Aktualisierung: 17. Januar 2025',
      intro:
        'Diese Seite enthält Informationen über die Verwendung von Cookies auf der Website der Stadioner Brauerei.',
      whatAreCookies: {
        title: 'Was sind Cookies?',
        content:
          'Cookies sind kleine Textdateien, die auf Ihrem Gerät gespeichert werden, wenn Sie Websites besuchen. Diese Dateien helfen Websites, sich Informationen über Ihren Besuch zu merken, was zukünftige Besuche erleichtern und die Seiten nützlicher machen kann.',
      },
      howWeUse: {
        title: 'Wie wir Cookies verwenden',
        content:
          'Die Stadioner Brauerei verwendet Cookies für folgende Zwecke:',
        purposes: [
          'Gewährleistung der grundlegenden Website-Funktionalität',
          'Speicherung Ihrer Präferenzen (wie Sprache)',
          'Analyse des Datenverkehrs und Verbesserung unserer Dienstleistungen',
          'Anzeige relevanter Inhalte und Werbung',
        ],
      },
      typesOfCookies: {
        title: 'Arten von Cookies, die wir verwenden',
        essential: {
          title: 'Notwendige Cookies',
          description:
            'Diese Cookies sind für das Funktionieren der Website notwendig und können nicht ausgeschaltet werden. Sie werden normalerweise nur als Reaktion auf Aktionen gesetzt, die Sie durchführen und die einer Anfrage nach Dienstleistungen entsprechen, wie z.B. das Festlegen Ihrer Datenschutzeinstellungen, das Anmelden oder das Ausfüllen von Formularen.',
        },
        functional: {
          title: 'Funktionale Cookies',
          description:
            'Diese Cookies ermöglichen es der Website, erweiterte Funktionalität und Personalisierung zu bieten. Sie können von uns oder von Drittanbietern gesetzt werden, deren Dienstleistungen wir zu unseren Seiten hinzugefügt haben.',
        },
        analytics: {
          title: 'Analytische Cookies',
          description:
            'Diese Cookies helfen uns zu verstehen, wie Besucher unsere Website nutzen, indem sie Informationen anonym sammeln und melden. Dies hilft uns, die Leistung unserer Seiten zu verbessern.',
        },
        marketing: {
          title: 'Marketing-Cookies',
          description:
            'Diese Cookies werden verwendet, um Besucher über Websites hinweg zu verfolgen. Das Ziel ist es, Anzeigen anzuzeigen, die für den einzelnen Benutzer relevant und ansprechend sind.',
        },
      },
      thirdParty: {
        title: 'Cookies von Drittanbietern',
        content:
          'Unsere Website kann Cookies von Drittanbietern enthalten, wie z.B.:',
        services: [
          'Google Analytics - für Verkehrsanalyse',
          'Soziale Netzwerke (Facebook, Instagram, TikTok) - für Content-Sharing',
          'Google Maps - für Kartendarstellung',
        ],
      },
      managingCookies: {
        title: 'Cookies verwalten',
        content:
          'Sie können Cookies nach Belieben kontrollieren und/oder löschen. Sie können alle Cookies löschen, die bereits auf Ihrem Computer sind, und Sie können die meisten Browser so einstellen, dass sie verhindern, dass sie platziert werden.',
        browserSettings: 'Cookie-Einstellungen in Browsern:',
        browsers: [
          'Chrome: Einstellungen > Datenschutz und Sicherheit > Cookies und andere Websitedaten',
          'Firefox: Optionen > Datenschutz und Sicherheit > Cookies und Websitedaten',
          'Safari: Einstellungen > Datenschutz > Cookies und Websitedaten',
          'Edge: Einstellungen > Datenschutz, Suche und Dienste > Cookies und Websiteberechtigungen',
        ],
      },
      consent: {
        title: 'Cookie-Einverständnis',
        content:
          'Beim ersten Besuch unserer Website wird ein Banner mit Cookie-Informationen angezeigt. Durch das weitere Durchsuchen der Website oder das Klicken auf "Akzeptieren" stimmen Sie der Verwendung von Cookies gemäß dieser Richtlinie zu.',
        withdraw:
          'Sie können Ihre Zustimmung jederzeit widerrufen, indem Sie Ihre Cookie-Einstellungen in Ihrem Browser ändern oder unser Unternehmen kontaktieren.',
      },
      contact: {
        title: 'Kontakt',
        content:
          'Wenn Sie Fragen zu unserer Cookie-Richtlinie haben, kontaktieren Sie uns bitte:',
        email: 'E-Mail: info@stadioner.cz',
        phone: 'Telefon: +420 601 535 416',
      },
      changes: {
        title: 'Änderungen an dieser Richtlinie',
        content:
          'Wir können diese Cookie-Richtlinie von Zeit zu Zeit aktualisieren. Alle Änderungen werden auf dieser Seite mit einem aktualisierten "Letzte Aktualisierung"-Datum veröffentlicht.',
      },
      preferences: {
        title: 'Cookie-Einstellungen verwalten',
        description:
          'Sie können Ihre Cookie-Einstellungen jederzeit ändern. Änderungen werden sofort wirksam.',
        manageButton: 'Einstellungen verwalten',
        saveButton: 'Änderungen speichern',
        resetButton: 'Auf Standard zurücksetzen',
        currentSettings: 'Aktuelle Einstellungen',
        essential: 'Notwendige Cookies',
        essentialDesc: 'Notwendig für die grundlegende Website-Funktionalität',
        functional: 'Funktionale Cookies',
        functionalDesc: 'Ermöglichen es uns, Ihre Präferenzen zu speichern',
        analytics: 'Analytische Cookies',
        analyticsDesc: 'Helfen uns zu verstehen, wie Sie die Website nutzen',
        marketing: 'Marketing-Cookies',
        marketingDesc: 'Werden verwendet, um relevante Anzeigen anzuzeigen',
        enabled: 'Aktiviert',
        disabled: 'Deaktiviert',
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

            <section>
              <h2 className='text-2xl font-bold text-brand-action mb-4'>
                {t.whatAreCookies.title}
              </h2>
              <p className='text-gray-700 leading-relaxed'>
                {t.whatAreCookies.content}
              </p>
            </section>

            <section>
              <h2 className='text-2xl font-bold text-brand-action mb-4'>
                {t.howWeUse.title}
              </h2>
              <p className='text-gray-700 mb-4'>{t.howWeUse.content}</p>
              <ul className='list-disc list-inside space-y-2 text-gray-700'>
                {t.howWeUse.purposes.map((purpose, index) => (
                  <li key={index}>{purpose}</li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className='text-2xl font-bold text-brand-action mb-4'>
                {t.typesOfCookies.title}
              </h2>
              <div className='space-y-6'>
                <div>
                  <h3 className='text-xl font-semibold text-brand-action mb-2'>
                    {t.typesOfCookies.essential.title}
                  </h3>
                  <p className='text-gray-700 leading-relaxed'>
                    {t.typesOfCookies.essential.description}
                  </p>
                </div>
                <div>
                  <h3 className='text-xl font-semibold text-brand-action mb-2'>
                    {t.typesOfCookies.functional.title}
                  </h3>
                  <p className='text-gray-700 leading-relaxed'>
                    {t.typesOfCookies.functional.description}
                  </p>
                </div>
                <div>
                  <h3 className='text-xl font-semibold text-brand-action mb-2'>
                    {t.typesOfCookies.analytics.title}
                  </h3>
                  <p className='text-gray-700 leading-relaxed'>
                    {t.typesOfCookies.analytics.description}
                  </p>
                </div>
                <div>
                  <h3 className='text-xl font-semibold text-brand-action mb-2'>
                    {t.typesOfCookies.marketing.title}
                  </h3>
                  <p className='text-gray-700 leading-relaxed'>
                    {t.typesOfCookies.marketing.description}
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className='text-2xl font-bold text-brand-action mb-4'>
                {t.thirdParty.title}
              </h2>
              <p className='text-gray-700 mb-4'>{t.thirdParty.content}</p>
              <ul className='list-disc list-inside space-y-2 text-gray-700'>
                {t.thirdParty.services.map((service, index) => (
                  <li key={index}>{service}</li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className='text-2xl font-bold text-brand-action mb-4'>
                {t.managingCookies.title}
              </h2>
              <p className='text-gray-700 mb-4'>{t.managingCookies.content}</p>
              <p className='text-gray-700 font-semibold mb-2'>
                {t.managingCookies.browserSettings}
              </p>
              <ul className='list-disc list-inside space-y-2 text-gray-700'>
                {t.managingCookies.browsers.map((browser, index) => (
                  <li key={index}>{browser}</li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className='text-2xl font-bold text-brand-action mb-4'>
                {t.consent.title}
              </h2>
              <p className='text-gray-700 mb-4'>{t.consent.content}</p>
              <p className='text-gray-700'>{t.consent.withdraw}</p>
            </section>

            <section>
              <h2 className='text-2xl font-bold text-brand-action mb-4'>
                {t.contact.title}
              </h2>
              <p className='text-gray-700 mb-2'>{t.contact.content}</p>
              <p className='text-gray-700'>{t.contact.email}</p>
              <p className='text-gray-700'>{t.contact.phone}</p>
            </section>

            <section>
              <h2 className='text-2xl font-bold text-brand-action mb-4'>
                {t.changes.title}
              </h2>
              <p className='text-gray-700'>{t.changes.content}</p>
            </section>

            {/* Cookie Preferences Management */}
            {hasConsented && (
              <section className='pt-8 border-t border-gray-300'>
                <h2 className='text-2xl font-bold text-brand-action mb-4'>
                  {t.preferences.title}
                </h2>
                <p className='text-gray-700 mb-6'>
                  {t.preferences.description}
                </p>

                {/* Current Settings Display */}
                <div className='bg-brand-secondary p-4 mb-6'>
                  <h3 className='font-semibold text-brand-action mb-3'>
                    {t.preferences.currentSettings}
                  </h3>
                  <div className='grid gap-2 text-sm'>
                    <div className='flex justify-between'>
                      <span>{t.preferences.essential}</span>
                      <span
                        className={
                          cookiePreferences.essential
                            ? 'text-green-600'
                            : 'text-red-600'
                        }
                      >
                        {cookiePreferences.essential
                          ? `✓ ${t.preferences.enabled}`
                          : `✗ ${t.preferences.disabled}`}
                      </span>
                    </div>
                    <div className='flex justify-between'>
                      <span>{t.preferences.functional}</span>
                      <span
                        className={
                          cookiePreferences.functional
                            ? 'text-green-600'
                            : 'text-red-600'
                        }
                      >
                        {cookiePreferences.functional
                          ? `✓ ${t.preferences.enabled}`
                          : `✗ ${t.preferences.disabled}`}
                      </span>
                    </div>
                    <div className='flex justify-between'>
                      <span>{t.preferences.analytics}</span>
                      <span
                        className={
                          cookiePreferences.analytics
                            ? 'text-green-600'
                            : 'text-red-600'
                        }
                      >
                        {cookiePreferences.analytics
                          ? `✓ ${t.preferences.enabled}`
                          : `✗ ${t.preferences.disabled}`}
                      </span>
                    </div>
                    <div className='flex justify-between'>
                      <span>{t.preferences.marketing}</span>
                      <span
                        className={
                          cookiePreferences.marketing
                            ? 'text-green-600'
                            : 'text-red-600'
                        }
                      >
                        {cookiePreferences.marketing
                          ? `✓ ${t.preferences.enabled}`
                          : `✗ ${t.preferences.disabled}`}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Manage Preferences Button */}
                <div className='flex gap-4 mb-6'>
                  <Button
                    onClick={() => setShowPreferences(!showPreferences)}
                    variant='outline'
                    className='bg-brand-action hover:bg-brand-action-dark text-brand-primary hover:text-brand-primary'
                  >
                    {t.preferences.manageButton}
                  </Button>
                  <Button
                    onClick={handleResetPreferences}
                    variant='outline'
                    className='bg-brand-action hover:bg-brand-action-dark text-brand-primary hover:text-brand-primary'
                  >
                    {t.preferences.resetButton}
                  </Button>
                </div>

                {/* Preferences Editor */}
                {showPreferences && (
                  <div className='bg-brand-secondary p-6'>
                    <h3 className='text-lg font-semibold text-brand-action mb-4'>
                      {t.preferences.manageButton}
                    </h3>

                    <div className='space-y-6'>
                      {/* Essential Cookies */}
                      <div className='flex items-center justify-between'>
                        <div className='flex-1'>
                          <h4 className='font-medium text-brand-action'>
                            {t.preferences.essential}
                          </h4>
                          <p className='text-sm text-gray-600'>
                            {t.preferences.essentialDesc}
                          </p>
                        </div>
                        <Switch
                          checked={tempPreferences.essential}
                          disabled={true}
                          className='opacity-50'
                        />
                      </div>

                      {/* Functional Cookies */}
                      <div className='flex items-center justify-between'>
                        <div className='flex-1'>
                          <h4 className='font-medium text-brand-action'>
                            {t.preferences.functional}
                          </h4>
                          <p className='text-sm text-gray-600'>
                            {t.preferences.functionalDesc}
                          </p>
                        </div>
                        <Switch
                          checked={tempPreferences.functional}
                          onCheckedChange={checked =>
                            handlePreferenceChange('functional', checked)
                          }
                        />
                      </div>

                      {/* Analytics Cookies */}
                      <div className='flex items-center justify-between'>
                        <div className='flex-1'>
                          <h4 className='font-medium text-brand-action'>
                            {t.preferences.analytics}
                          </h4>
                          <p className='text-sm text-gray-600'>
                            {t.preferences.analyticsDesc}
                          </p>
                        </div>
                        <Switch
                          checked={tempPreferences.analytics}
                          onCheckedChange={checked =>
                            handlePreferenceChange('analytics', checked)
                          }
                        />
                      </div>

                      {/* Marketing Cookies */}
                      <div className='flex items-center justify-between'>
                        <div className='flex-1'>
                          <h4 className='font-medium text-brand-action'>
                            {t.preferences.marketing}
                          </h4>
                          <p className='text-sm text-gray-600'>
                            {t.preferences.marketingDesc}
                          </p>
                        </div>
                        <Switch
                          checked={tempPreferences.marketing}
                          onCheckedChange={checked =>
                            handlePreferenceChange('marketing', checked)
                          }
                        />
                      </div>
                    </div>

                    {/* Save Button */}
                    <div className='flex justify-end pt-4 border-t border-brand-action mt-6'>
                      <Button onClick={handleSavePreferences} variant='green'>
                        {t.preferences.saveButton}
                      </Button>
                    </div>
                  </div>
                )}
              </section>
            )}
          </div>
        </div>
      </Container>
    </main>
  )
}
