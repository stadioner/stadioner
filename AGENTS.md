## Learned User Preferences

- Write site copy in Czech; on B2B (`/pro-firmy`) use formal Vy with a capital V (Vy, Vám).
- Prefer short, direct copy; drop extra marketing clauses, capacity counts, promotional banners, and filler benefit sections unless asked to keep them.
- Show images uncropped and complete; Sanity rich-text images should open fullscreen on click; prefer sharp corners over rounded for product and label photos; bottle photos keep a transparent background (real alpha, not a black matte).
- Reuse the custom double border (`components/border.tsx`): thicker outer stroke, thinner inner stroke, brand green `#3b492b`.
- Navbar dropdowns should open on hover with a gap-tolerant trigger; the parent nav label stays clickable and visually consistent with other items.
- When the navbar grows, keep the desktop-link breakpoint wide enough (currently `xl`) so items do not collapse early to the Menu icon; clickable controls should use `cursor-pointer`.
- Keep the product name and Složení button on the same baseline and readable on mobile (products UI and B2B configurator).
- Event recap labels stay a single word (cs Shrnutí, en Recap, de Rückblick).
- When an event time is unknown, omit it from public display rather than inventing or showing a placeholder.
- EmailJS notification emails (B2B and Šalanda) should match the branded B2B HTML table style (cream/green).
- Special/holiday opening-hour notices on Podniková prodejna must sit inside the opening-hours panel (readable contrast), not outside on the cream background.
- When Šalanda opening hours change, keep table-reservation arrival time slots in sync with those hours.

## Learned Workspace Facts

- Next.js 15 App Router site for Stadioner (React 19, Tailwind v4, next-intl cs/en/de); default language is Czech.
- Sanity CMS powers events, articles, Šalanda tap listing, weekly program, and event photo galleries; fetch through `sanity/lib/fetch.ts` so CMS edits appear without a full rebuild (same pattern as the events page).
- Sales locations nav label is „Naše provozovny a partneři“ (three pages under `/prodejni-mista`): partner network (`sit-partneru`), company store / Podniková prodejna (`podnikova-prodejna`, formerly Výdejní místo), and Výčep Šalanda (`vycep-na-salade`); the nav item is a hover dropdown to those three targets.
- B2B product configurator lives on `/pro-firmy` (beers and lemonades; bottles and kegs); the product icon row is a bounded horizontal scroller, not an infinite carousel; a Koupit control deep-links to `https://eshop.stadioner.cz` product URLs from `lib/products/data.ts`, falling back to the eshop homepage when a product is missing.
- Multi-day events must show the full date range (not only the start date); homepage “next event” is driven by event date logic; past events without a recap are faded and non-navigable while events with a recap stay clickable (`lib/events/visibility.ts`).
- Brand tokens: cream `#ede3c8`, action green `#3b492b`; shared `Border` is used across the UI; new UI (buttons, panels) should match existing brand patterns from other site sections.
- Products in `lib/products/data.ts` with `published: false` stay out of public listings, the B2B configurator, and footer product links until explicitly published; footer products come from the published catalog (`getProductMap`), not a hardcoded list.
- Photo gallery at `/fotogalerie`: Sanity `gallery` on `unifiedEvent` (Studio supports bulk multi-photo upload), filter by event, grid with lightbox prev/next; linked in navbar and footer.
- Public product UI shows a small availability disclaimer under the packaging selector (`AvailabilityNotice`, not on B2B): website availability may be outdated; verify via phone `+420 606 074 929` (`uiLabels.availabilityNotice`).
- Výčep Šalanda includes a table reservation form via EmailJS (same pattern as the B2B inquiry form); alternate contact phone `+420 721 980 257`.
- Tap Takeover page at `/tap-takeover` (B2B-card visual language): interactive pricing calculator plus inquiry form; linked in navbar and footer.
