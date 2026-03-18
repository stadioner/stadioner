"use client";

import { Container } from "@/components/container";
import { RippedPaperSVG } from "@/components/ripped-paper-svg";
import { useLanguage } from "@/store/use-language";
import { cn } from "@/lib/utils";

const translations = {
  cs: {
    title: "Otevírací doba výdejního místa",
    mon: "Pondělí",
    tue_thu: "Úterý – Čtvrtek",
    fri: "Pátek",
    sat: "Sobota",
    sun: "Neděle",
    closed: "ZAVŘENO",
    tue_thu_time: "14:00 – 17:00",
    fri_time: "9:00 – 17:00",
    sat_time: "9:00 – 12:00",
    image_alt: "Výdejní místo pivovaru STADIONER v zimě",
    address_title: "Adresa",
    address_line1: "Kout na Šumavě 2",
    address_line2: "345 02 Kout na Šumavě",
  },
  en: {
    title: "Pickup Point Opening Hours",
    mon: "Monday",
    tue_thu: "Tuesday - Thursday",
    fri: "Friday",
    sat: "Saturday",
    sun: "Sunday",
    closed: "CLOSED",
    tue_thu_time: "14:00 – 17:00",
    fri_time: "9:00 – 17:00",
    sat_time: "9:00 – 12:00",
    image_alt: "STADIONER brewery pickup point in winter",
    address_title: "Address",
    address_line1: "Kout na Šumavě 2",
    address_line2: "345 02 Kout na Šumavě",
  },
  de: {
    title: "Öffnungszeiten der Abholstelle",
    mon: "Montag",
    tue_thu: "Dienstag – Donnerstag",
    fri: "Freitag",
    sat: "Samstag",
    sun: "Sonntag",
    closed: "GESCHLOSSEN",
    tue_thu_time: "14:00 – 17:00",
    fri_time: "9:00 – 17:00",
    sat_time: "9:00 – 12:00",
    image_alt: "Abholstelle der Brauerei STADIONER im Winter",
    address_title: "Adresse",
    address_line1: "Kout na Šumavě 2",
    address_line2: "345 02 Kout na Šumavě",
  },
};

export const OpeningHours = () => {
  const language = useLanguage((state) => state.language);
  const t =
    translations[language as keyof typeof translations] || translations.cs;
  const currentDay = new Date().getDay();

  const rows = [
    {
      key: "mon",
      label: t.mon,
      value: t.closed,
      closed: true,
      isToday: currentDay === 1,
    },
    {
      key: "tue_thu",
      label: t.tue_thu,
      value: t.tue_thu_time,
      closed: false,
      isToday: currentDay >= 2 && currentDay <= 4,
    },
    {
      key: "fri",
      label: t.fri,
      value: t.fri_time,
      closed: false,
      isToday: currentDay === 5,
    },
    {
      key: "sat",
      label: t.sat,
      value: t.sat_time,
      closed: false,
      isToday: currentDay === 6,
    },
    {
      key: "sun",
      label: t.sun,
      value: t.closed,
      closed: true,
      isToday: currentDay === 0,
    },
  ];

  return (
    <section className="bg-brand-action py-16 text-brand-primary relative">
      <div
        className="absolute -top-4 left-0 w-full z-10"
        style={{ lineHeight: 0 }}
      >
        <RippedPaperSVG flip />
      </div>
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          {/* Text Content */}
          <div className="flex flex-col space-y-8">
            <h2 className="text-3xl font-bold md:text-4xl lg:text-5xl">
              {t.title}
            </h2>

            <div className="w-full text-lg md:text-xl divide-solid divide-brand-primary/80">
              {rows.map((row) => (
                <div
                  key={row.key}
                  className={cn(
                    "flex items-center justify-between px-3 py-3 my-3 transition-colors",
                    row.isToday &&
                      "bg-brand-primary text-brand-action border-brand-primary",
                  )}
                >
                  <div className="flex justify-center items-center gap-3">
                    <span className={cn(row.isToday && "font-bold")}>
                      {row.label}
                    </span>
                  </div>
                  <span
                    className={cn(
                      "font-bold",
                      row.closed && !row.isToday && "text-red-400",
                    )}
                  >
                    {row.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Address Section */}
            <div className="pt-8">
              <h3 className="mb-1 text-2xl font-bold">{t.address_title}</h3>
              <address className="not-italic text-lg md:text-xl">
                <p>{t.address_line1}</p>
                <p>{t.address_line2}</p>
              </address>
            </div>
          </div>

          {/* Image */}
          <img
            src="/vydejni-misto-zima.webp"
            alt={t.image_alt}
            className="w-full"
          />
        </div>
      </Container>
    </section>
  );
};
