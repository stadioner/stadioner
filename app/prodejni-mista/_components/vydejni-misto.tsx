"use client";

import { Container } from "@/components/container";
import { RippedPaperSVG } from "@/components/ripped-paper-svg";
import { useLanguage } from "@/store/use-language";
import { cn } from "@/lib/utils";

export const VydejniMisto = () => {
  const { language } = useLanguage();
  const currentDay = new Date().getDay();

  const t = {
    monday:
      language === "cs" ? "Pondělí" : language === "en" ? "Monday" : "Montag",
    tueThu:
      language === "cs"
        ? "Útery - Čtvrtek"
        : language === "en"
          ? "Tuesday - Thursday "
          : "Dienstag – Donnerstag",
    friday:
      language === "cs" ? "Pátek" : language === "en" ? "Friday" : "Freitag",
    saturday:
      language === "cs" ? "Sobota" : language === "en" ? "Saturday" : "Samstag",
    sunday:
      language === "cs" ? "Neděle" : language === "en" ? "Sunday" : "Sonntag",
    closed:
      language === "cs"
        ? "ZAVŘENO"
        : language === "en"
          ? "CLOSED"
          : "GESCHLOSSEN",
  };

  const openingHours = [
    {
      key: "mon",
      label: t.monday,
      value: t.closed,
      closed: true,
      isToday: currentDay === 1,
    },
    {
      key: "tue-thu",
      label: t.tueThu,
      value: "14:00 – 17:00",
      closed: false,
      isToday: currentDay >= 2 && currentDay <= 4,
    },
    {
      key: "fri",
      label: t.friday,
      value: "9:00 – 17:00",
      closed: false,
      isToday: currentDay === 5,
    },
    {
      key: "sat",
      label: t.saturday,
      value: "9:00 - 12:00",
      closed: false,
      isToday: currentDay === 6,
    },
    {
      key: "sun",
      label: t.sunday,
      value: t.closed,
      closed: true,
      isToday: currentDay === 0,
    },
  ];

  return (
    <section className="bg-brand-primary">
      <RippedPaperSVG flip />
      <div className="bg-brand-action py-12">
        <Container className="grid md:grid-cols-2 gap-10">
          <div className="flex flex-col justify-between">
            <div>
              <div>
                <h2 className="text-brand-primary text-3xl md:text-4xl lg:text-6xl font-bold flex-nowrap text-nowrap">
                  {language === "cs" && "Výdejní Místo"}
                  {language === "en" && "Distribution Point"}
                  {language === "de" && "Verkaufsstelle"}
                </h2>
                <p className="text-zinc-100 mt-1">
                  Kout na Šumavě 2, 345 02 Kout na Šumavě
                </p>
              </div>
              <img
                src="/vydejni-misto.webp"
                alt="Výdejní místo STADIONER (Kout na Šumavě)"
                className="md:hidden py-4"
              />
              <div className="text-zinc-100 md:mt-6 space-y-4">
                <p>
                  {language === "cs" && (
                    <>
                      Hlavní výdejní místo pivovaru STADIONER se nachází přímo v
                      areálu pivovaru v Koutě na Šumavě. Zde si můžete zakoupit
                      všechny naše produkty přímo od výrobce, včetně čerstvých
                      piv, limonád a vod ze šumavských pramenů. Nabízíme také
                      možnost vrácení prázdných lahví. Možnost zakoupit lahvové
                      i sudové pivo.
                    </>
                  )}
                  {language === "en" && (
                    <>
                      The main distribution point of STADIONER brewery is
                      located directly in the brewery premises in Kout na
                      Šumavě. Here you can purchase all our products directly
                      from the manufacturer, including fresh beers, lemonades,
                      and waters from Šumava springs. We also offer bottle
                      returns. You can purchase both bottled and draft beer.
                    </>
                  )}
                  {language === "de" && (
                    <>
                      Die Hauptverkaufsstelle der STADIONER Brauerei befindet
                      sich direkt auf dem Brauereigelände in Kout na Šumavě.
                      Hier können Sie alle unsere Produkte direkt vom Hersteller
                      kaufen, einschließlich frischer Biere, Limonaden und
                      Wasser aus den Böhmerwaldquellen. Wir bieten auch
                      Flaschenrückgabe an. Sie können sowohl Flaschen- als auch
                      Fassbier kaufen.
                    </>
                  )}
                </p>

                <div className="mt-3 text-sm text-zinc-200">
                  {language === "cs" && (
                    <p>
                      Zálohy: lahev 5 Kč, bedna 100 Kč, sud (30L, 50L) 1500 Kč,
                      sud (10L, 20.5L) 2000 Kč
                    </p>
                  )}
                  {language === "en" && (
                    <p>
                      Deposits: bottle 5 CZK, crate 100 CZK, keg (30L, 50L) 1500
                      CZK, keg (10L, 20.5L) 2000 CZK
                    </p>
                  )}
                  {language === "de" && (
                    <p>
                      Pfand: Flasche 5 CZK, Kiste 100 CZK, Fass (30L, 50L) 1500
                      CZK, Fass (10L, 20.5L) 2000 CZK
                    </p>
                  )}
                </div>

                <div className="text-sm text-zinc-200">
                  {language === "cs" && (
                    <p>Platba možná na místě v hotovosti i kartou.</p>
                  )}
                  {language === "en" && (
                    <p>Payment possible on site by cash or card.</p>
                  )}
                  {language === "de" && (
                    <p>Zahlung vor Ort in bar oder mit Karte möglich.</p>
                  )}
                </div>

                {/* --- OTEVÍRACÍ DOBA --- */}
                <div className="border-t border-zinc-600 pt-4">
                  <h4 className="font-semibold text-brand-primary mb-2 text-xl">
                    {language === "cs" && "Otevírací doba"}
                    {language === "en" && "Opening hours"}
                    {language === "de" && "Öffnungszeiten"}
                  </h4>

                  <div className="text-sm space-y-1.5">
                    {openingHours.map((row) => (
                      <div
                        key={row.key}
                        className={cn(
                          "flex items-center justify-between px-3 py-2 transition-colors",
                          row.isToday && "bg-brand-primary text-brand-action",
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <span className={cn(row.isToday && "font-bold")}>
                            {row.label}
                          </span>
                        </div>
                        <span
                          className={cn(
                            "font-medium",
                            row.closed && !row.isToday && "text-red-400",
                            row.isToday && "font-bold",
                          )}
                        >
                          {row.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <img
            src="/vydejni-misto-zima.webp"
            alt="Výdejní místo STADIONER (Kout na Šumavě)"
            className="hidden md:block"
          />
        </Container>
      </div>
      <RippedPaperSVG />
    </section>
  );
};
