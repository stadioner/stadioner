## Learned User Preferences

- Write site copy in Czech; on B2B (`/pro-firmy`) use formal Vy with a capital V (Vy, Vám).
- Prefer short, direct copy; drop extra marketing clauses, capacity counts, and promotional banners unless asked to keep them.
- Show images uncropped and complete; Sanity rich-text images should open fullscreen on click; prefer sharp corners over rounded for product and label photos; bottle photos keep a transparent background (real alpha, not a black matte).
- Reuse the custom double border (`components/border.tsx`): thicker outer stroke, thinner inner stroke, brand green `#3b492b`.
- Navbar dropdowns should open on hover with a gap-tolerant trigger; the parent nav label stays clickable and visually consistent with other items.
- When the navbar grows, keep the desktop-link breakpoint wide enough (currently `xl`) so items do not collapse early to the Menu icon.
- Clickable controls (nav Menu, gallery thumbs/buttons, etc.) should use `cursor-pointer`.
- Keep the product name and Složení button on the same baseline and readable on mobile (products UI and B2B configurator).
- Event recap labels stay a single word (cs Shrnutí, en Recap, de Rückblick).
- EmailJS notification emails (B2B and Šalanda) should match the branded B2B HTML table style (cream/green).

## Learned Workspace Facts

- Next.js 15 App Router site for Stadioner (React 19, Tailwind v4, next-intl cs/en/de); default language is Czech.
- Sanity CMS powers events, articles, Šalanda tap listing, weekly program, and event photo galleries; fetch through `sanity/lib/fetch.ts` so CMS edits appear without a full rebuild (same pattern as the events page).
- Sales locations nav label is „Naše provozovny a partneři“ (three pages under `/prodejni-mista`): partner network (`sit-partneru`), company store / Podniková prodejna (`podnikova-prodejna`, formerly Výdejní místo), and Výčep Šalanda (`vycep-na-salade`); the nav item is a hover dropdown to those three targets.
- B2B product configurator lives on `/pro-firmy` (beers and lemonades; bottles and kegs); the product icon row is a bounded horizontal scroller, not an infinite carousel.
- Multi-day events must show the full date range, not only the start date.
- Homepage “next event” is driven by event date logic, not a hardcoded featured event.
- Past events without a recap are faded and non-navigable; events with a recap stay clickable (`lib/events/visibility.ts`).
- Brand tokens: cream `#ede3c8`, action green `#3b492b`; shared `Border` is used across the UI.
- Products in `lib/products/data.ts` with `published: false` stay out of public listings, the B2B configurator, and footer product links until explicitly published; footer products come from the published catalog (`getProductMap`), not a hardcoded list.
- Photo gallery at `/fotogalerie`: Sanity `gallery` on `unifiedEvent`, filter by event, grid with lightbox prev/next; linked in navbar and footer.
- Public product UI shows a small availability disclaimer under the packaging selector (`AvailabilityNotice`, not on B2B): website availability may be outdated; verify via phone `+420 606 074 929` (`uiLabels.availabilityNotice`).
- Výčep Šalanda includes a table reservation form via EmailJS (same pattern as the B2B inquiry form); alternate contact phone `+420 721 980 257`.
