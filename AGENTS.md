## Learned User Preferences

- Write site copy in Czech; on B2B (`/pro-firmy`) use formal Vy with a capital V (Vy, Vám).
- Prefer short, direct copy; drop extra marketing clauses, capacity counts, and promotional banners unless asked to keep them.
- Show images uncropped and complete; Sanity rich-text images should open fullscreen on click; prefer sharp corners over rounded for product and label photos.
- Reuse the custom double border (`components/border.tsx`): thicker outer stroke, thinner inner stroke, brand green `#3b492b`.
- Navbar dropdowns should open on hover with a gap-tolerant trigger; the parent nav label stays clickable and visually consistent with other items.
- On the B2B product configurator, keep the product name and Složení button aligned on the same bottom axis.

## Learned Workspace Facts

- Next.js 15 App Router site for Stadioner (React 19, Tailwind v4, next-intl cs/en/de); default language is Czech.
- Sanity CMS powers events, articles, Šalanda tap listing, and weekly program; fetch through `sanity/lib/fetch.ts` so CMS edits appear without a full rebuild (same pattern as the events page).
- Sales locations are three separate pages under `/prodejni-mista`: partner network (`sit-partneru`), company store / Podniková prodejna (`podnikova-prodejna`, formerly Výdejní místo), and Šalanda taproom (`vycep-na-salade`); the nav item is a hover dropdown to those three targets.
- B2B product configurator lives on `/pro-firmy` (beers and lemonades; bottles and kegs); the product icon row is a bounded horizontal scroller, not an infinite carousel.
- Multi-day events must show the full date range, not only the start date.
- Homepage “next event” is driven by event date logic, not a hardcoded featured event.
- Past events without a recap are faded and non-navigable; events with a recap stay clickable (`lib/events/visibility.ts`).
- Brand tokens: cream `#ede3c8`, action green `#3b492b`; shared `Border` is used across the UI.
