# Stadioner Design System

## Purpose and Scope
This document defines the current design system implemented in the Stadioner public web application and provides a consistency audit with standardization recommendations.

Scope includes:
- Public web UI in `app/` and `components/`
- Shared design primitives and Tailwind token usage
- Interaction, motion, and accessibility baseline of the web frontend

Scope excludes:
- Sanity Studio admin UX and editor authoring interface
- Backend/data model concerns unrelated to presentation

## Technology Stack and Styling Architecture
- Framework: Next.js 15 (`app` router), React 19
- Styling: Tailwind CSS v4 (`@import 'tailwindcss'` in `app/globals.css`)
- Animation: `framer-motion`, `tw-animate-css`
- UI primitive approach: shadcn-style wrappers around Radix (`components/ui/*`)
- Utility composition: `class-variance-authority` + `tailwind-merge` via `cn`
- Icons: `lucide-react`

Architecture model:
- Layer 1: Global tokens and base styles in `app/globals.css`
- Layer 2: Reusable primitives (`Button`, `Border`, `Container`, `Dialog`, `Popover`, `Switch`, etc.)
- Layer 3: Shared feature components in `components/**` and route-scoped components in `app/**/_components`
- Layer 4: Route-level composition in `app/**/page.tsx`

## Refactor Update (2026-02-13)
Completed in this refactor cycle:
- Removed legacy `containers/` layer and split composition into:
  - shared shell/components: `components/layout/*`, `components/products/*`
  - page-scoped composition: `app/**/_components/*`
- Centralized newsletter submission flow into shared modules:
  - `hooks/use-newsletter-form.ts`
  - `lib/newsletter/copy.ts`
  - `lib/newsletter/submit.ts`
- Standardized Sanity data access through `sanity/lib/fetch.ts` with route tags and revalidation options.
- Optimized content queries for listings/sitemap to avoid overfetching (`postsListByLanguageQuery`, `eventsListByLanguageQuery`, `postsForSitemapByLanguageQuery`).
- Converted non-interactive content renderers to server components where possible (`app/clanky/_components/post.tsx`, `app/udalosti/[lang]/_components/event-detail.tsx`).
- Replaced fragile nav active-state matching with exact/segment-based matching in `components/layout/navbar/nav-item.tsx`.

## Design Tokens

### Brand Tokens (Primary Source of Truth)
Defined in `app/globals.css` under `@theme inline`.

| Token | Value | Intent | Typical Usage |
|---|---|---|---|
| `--color-brand-primary` | `#ede3c8` | Light cream surface | Section backgrounds, cards, form fields |
| `--color-brand-secondary` | `#d7c7a3` | Warm secondary surface | Footer/nav surfaces, alternating sections |
| `--color-brand-action` | `#3b492b` | Primary brand action/ink | CTA backgrounds, key text, borders |
| `--color-brand-action-dark` | `#243113` | Dark action shade | Hover/contrast for shop CTA text |
| `--color-brand-shop` | `#de7518` | Commerce accent | E-shop CTA variant |

### System Tokens (shadcn/Tailwind CSS variable set)
Defined in `:root` in `app/globals.css`.

| Group | Tokens |
|---|---|
| Surfaces/Text | `--background`, `--foreground`, `--card`, `--card-foreground`, `--popover`, `--popover-foreground` |
| Semantic UI | `--primary`, `--primary-foreground`, `--secondary`, `--secondary-foreground`, `--accent`, `--accent-foreground`, `--muted`, `--muted-foreground`, `--destructive` |
| Structure | `--border`, `--input`, `--ring` |
| Data viz | `--chart-1` to `--chart-5` |
| Sidebar | `--sidebar*` token family |

### Radius Tokens
Defined in `app/globals.css`.

| Token | Value |
|---|---|
| `--radius` | `0.625rem` |
| `--radius-sm` | `calc(var(--radius) - 4px)` |
| `--radius-md` | `calc(var(--radius) - 2px)` |
| `--radius-lg` | `var(--radius)` |
| `--radius-xl` | `calc(var(--radius) + 4px)` |

### Typography Tokens
Declared as CSS variables and injected via Next font loader in `app/layout.tsx`.

| Token | Source | Usage |
|---|---|---|
| `--font-mohave` | `next/font/google` (`Mohave`) | Site default + display headings |
| `--font-caladea` | `next/font/google` (`Caladea`) | Available but minimally used explicitly |

## Typography System

### Current Baseline
- Global body stack uses `font-mohave` via `app/layout.tsx` body class.
- Headings are mostly bold, often uppercase on hero/events.
- Body sizes are mostly Tailwind defaults (`text-sm`, `text-lg`, etc.).

### Observed Patterns
- Display: `text-5xl` to custom viewport values (e.g., `text-[23vw]`) on hero.
- Section titles: `text-2xl` to `text-6xl`.
- Body copy: usually `text-base`/`text-lg`; legal pages rely heavily on gray utility text.
- Blog rich text uses `font-labil` and `font-stabil` in `app/clanky/_components/rich-text.tsx`, but these font utilities are not defined in global tokens.

### Typography Intent by Context
- Marketing/home sections: bold brand-forward typography, high contrast.
- Legal pages: utilitarian readability with neutral text grays.
- Events/blog content: mixed editorial style with `prose`/custom rich text mapping.

## Color System and Semantic Usage

### Core Palette Application
- `brand-primary`: light page canvases and card interiors.
- `brand-secondary`: secondary section surfaces and navigation framing.
- `brand-action`: high-emphasis text, primary CTA fills, borders.
- `brand-shop`: commerce-specific CTA accent.

### Semantic Role Mapping
- Primary call-to-action: `bg-brand-action text-brand-primary`
- Secondary action: often outline with `border-brand-action text-brand-action`
- Commerce action: `variant='shop'` in `Button`
- Critical/error visual states: often hardcoded (`text-red-600`, `bg-red-600`) instead of tokenized semantic alias.

### Neutral/Utility Color Mixing
The codebase mixes token-driven classes (`text-brand-action`) with utility grays (`text-gray-600`, `text-zinc-700`, `text-white/90`) in legal, content, and overlay-heavy screens.

## Spacing, Sizing, Radius, and Elevation

### Spacing
- Section spacing relies on Tailwind utilities (`pt-*`, `pb-*`, `py-*`) and is consistent at block level.
- Common vertical rhythm values: `pt-32/36/40`, `pb-16/20`, `py-8/16/20`.

### Sizing
- Container width standard: `lg:max-w-screen-lg xl:max-w-screen-xl` (`components/container.tsx`).
- Responsive patterns use common breakpoints (`sm`, `md`, `lg`, `xl`) with explicit pixel heights in hero/history.

### Radius
- Custom ornamental frames (`Border`) use optional full-round and thick dual borders.
- Many buttons force square corners (`rounded-none`), while dialogs/popovers remain rounded.

### Elevation and Shadows
- Soft elevation for nav and overlays via `shadow-sm`, `shadow-lg`.
- Product bottle imagery uses pronounced drop-shadow and animated shadow layers.

## Layout System (Container, Grid, Breakpoints, Sections)

### Container Primitive
`components/container.tsx`:
- Horizontal padding: `px-4`
- Max width: `lg:max-w-screen-lg`, `xl:max-w-screen-xl`
- Central alignment: `mx-auto`

### Section Composition Pattern
Typical route sections:
- Large top offset to account for fixed nav (`pt-24` to `pt-40`)
- Alternating surface colors between `brand-primary`, `brand-secondary`, `brand-action`
- `Container` wrapping + feature-specific grid/flex

### Breakpoint Strategy
- Mobile-first with progressive enhancement via `sm/md/lg/xl`.
- Distinct mobile/desktop nav implementations in `components/layout/navbar/navbar.tsx`.
- Products and timeline content reflow across breakpoints with dedicated mobile variants.

## Core Components (Primitives)

### `Button` (`components/ui/button.tsx`)
Variants:
- `default`, `destructive`, `outline`, `secondary`, `ghost`, `link`, `green`, `shop`

Sizes:
- `default`, `sm`, `lg`, `icon`

Design notes:
- Centralized states: disabled, focus-visible ring, aria-invalid styles.
- Brand-specific variants (`green`, `shop`) extend shadcn defaults.

### `Border` (`components/border.tsx`)
- Dual-line ornamental frame (outer + inner border)
- Options: `rounded`, `background`, `backgroundLight`, `reverse`
- Core visual motif for nav, cards, map, dialogs

### `Container` (`components/container.tsx`)
- Reusable max-width wrapper used across all major sections

### Modal/Overlay Primitives
- `Dialog` and `Popover` wrappers in `components/ui/*` with animated open/close and layered z-index.

### `Switch` (`components/ui/switch.tsx`)
- Styled for cookie preferences with token-backed checked state (`bg-brand-action`).

### `Command` (`components/ui/command.tsx`)
- Command palette primitive currently reused for language selector list behavior.

### `Separator` (`components/ui/separator.tsx`)
- Token-based line primitive (`bg-border`), horizontal/vertical.

### Custom Toast System (`components/custom-toast.tsx`)
- Context-driven stack with success/error/info variants
- Visual container follows `Border` + brand colors

## Navigation Patterns

### Desktop Navigation
- Fixed top bar with center logo medallion and link groups split left/right
- Uses `Border` framing and `brand-secondary` surface

### Mobile Navigation
- Compact fixed nav with Menu trigger
- Full-screen motion menu (`framer-motion`) with scaleY reveal
- Elevated z-index layering (`z-[1001]`, `z-[1002]`, `z-[1003]`)

### Active State
- `NavItem` uses exact/segment matching (`pathname === href` or `pathname.startsWith(\`${href}/\`)`) to prevent false positives.

### Language Switching
- Popover + command list
- Flag icon trigger
- Route adaptation logic for blog language paths

## Forms and Input Patterns

### Input Styling
Common input classes across footer/newsletter/company forms:
- Background: `bg-brand-primary`
- Text: `text-brand-action`
- Border: `border-brand-action`
- Focus: `focus:ring-2 focus:ring-brand-action/50`

### Primary Form Contexts
- Newsletter popup and page
- Footer newsletter form
- Company inquiry form
- Cookie preference controls

### CTA Patterns
- Submits generally use `Button variant='green'`
- Secondary actions use `outline`/plain link treatments

## Feedback and Status Patterns (Toast, states, focus, disabled)

### Toast Feedback
- Success/error/info icon badges in circular glyph containers
- Fixed stack at `bottom-right`
- Entry animation via `animate-in slide-in-from-right-2`

### State Patterns
- Disabled: generally `disabled:opacity-50`, `disabled:pointer-events-none`
- Hover: mostly color-shade transitions and subtle background changes
- Focus-visible: implemented strongly in primitives; less consistent in custom anchor/link controls

### Overlay and Gating Patterns
- Age gate modal-like overlay with dark backdrop
- Cookie consent fixed bottom bar with optional detailed preference panel

## Motion and Animation

### Global/Utility Motion
- `scroll-behavior: smooth` globally enabled
- Custom keyframes in `app/globals.css`: `bottle`, `bottle-shadow`

### Feature Motion
- Intro splash reveal (clip-path logo wipe + fade)
- Mobile menu open/close scale animation
- Event list entry and timeline transitions
- History timeline transitions with directional motion and blur

### Motion Intent
- Emphasis on handcrafted, lively brand feel for hero/products/history
- Utility animations for overlays and UI shell interactions

## Content Patterns (legal/blog/events/product pages)

### Legal Pages
- Light surfaces (`brand-primary`), brand heading color, long-form structured lists
- Heavily uses gray utility text for body readability

### Blog
- Custom portable text renderers with heading/list/blockquote/link styles
- Typography diverges from base system via `font-labil` and `font-stabil`

### Events
- Card/list and detail view built with `Border` + brand surfaces
- Rich text event descriptions include `prose` classes and custom blocks

### Products
- Category and packaging selectors
- Product image emphasis with animated bottle and shadow
- Strong dark-section treatment (`bg-brand-action`) with cream/green contrast

### History
- Fullscreen, highly visual timeline with background-image transitions and interactive dots/arrow keys/mouse wheel navigation

## Accessibility Baseline and Gaps

### Baseline Strengths
- Primitive components include `focus-visible` ring behavior.
- Dialog and Popover based on accessible Radix foundations.
- Buttons consistently use disabled state styles.

### Known Gaps
- Multiple raw `<img>` usages in content/hero/nav without optimized handling and occasionally generic alt text.
- Focus and keyboard affordances are less explicit on custom clickable blocks and some links.
- Color contrast should be audited in utility gray-on-brand combinations.
- Global `scroll-behavior: smooth` may conflict with reduced-motion preferences.

## Consistency Audit (Findings)

### Category: Token Drift

#### Finding 1
- Severity: Medium
- Affected files: `app/(legal)/cookies/page.tsx`, `app/(legal)/gdpr/page.tsx`, `app/(legal)/obchodni-podminky/page.tsx`, `app/kontakt/page.tsx`
- Current behavior: Extensive direct gray utility colors (`text-gray-*`, `border-gray-*`) mixed with brand tokens.
- Target standard: Map body/secondary text and divider colors to semantic token aliases (`muted-foreground`, `border`, optional brand-neutral extensions).
- Remediation: Introduce `text-content-muted` / `border-content-subtle` style aliases (or Tailwind token mapping) and replace repeated hardcoded grays.
- Migration priority: Next

#### Finding 2
- Severity: Medium
- Affected files: `components/custom-toast.tsx`, `components/cookie-consent.tsx`, `app/(homepage)/_components/opening-hours.tsx`
- Current behavior: Hardcoded status colors (`bg-red-600`, `bg-blue-600`, `text-red-400`) not mapped to semantic status tokens.
- Target standard: Central status palette (`success`, `error`, `info`, `warning`) tied to design tokens.
- Remediation: Add status token aliases in `app/globals.css` and replace hardcoded status classes.
- Migration priority: Next

### Category: Typography Drift

#### Finding 3
- Severity: High
- Affected files: `app/clanky/_components/rich-text.tsx`
- Current behavior: Uses `font-labil` and `font-stabil`, which are not defined in token system or root font imports.
- Target standard: Use only declared typography tokens (`font-mohave`, `font-caladea`) or formally register additional fonts as tokens.
- Remediation: Either (a) replace with existing tokens, or (b) add explicit font loading + token variables for these families and document their roles.
- Migration priority: Now

#### Finding 4
- Severity: Medium
- Affected files: `app/(homepage)/_components/hero.tsx`, `app/clanky/_components/post.tsx`, `app/udalosti/[lang]/_components/event-detail.tsx`
- Current behavior: Heading scales and casing conventions vary significantly by feature without a shared type ramp spec.
- Target standard: Define a canonical heading scale (Display/H1/H2/H3/H4) with responsive sizes and casing guidance.
- Remediation: Add a typography scale table and align major heading classes to predefined utilities.
- Migration priority: Next

### Category: Component Duplication

#### Finding 5
- Severity: Medium
- Affected files: `components/layout/footer.tsx`, `components/newsletter-popup.tsx`, `app/newsletter/page.tsx`, `app/pro-firmy/page.tsx`, `app/clanky/_components/newsletter-mini-form.tsx`
- Current behavior: Newsletter submit logic and copy duplication were reduced via shared modules, but field styling primitives are still inline in multiple forms.
- Target standard: Shared form field primitive(s) for input, textarea, field label, and helper text.
- Remediation: Finalize shared field components or utility variants and migrate remaining repeated form style strings.
- Migration priority: Next
- Status: Partially resolved in 2026-02-13 refactor (logic/copy centralized).

#### Finding 6
- Severity: Low
- Affected files: `components/layout/navbar/navbar.tsx`, `components/age-gate.tsx`, `components/custom-toast.tsx`, `app/udalosti/[lang]/_components/events-page.tsx`
- Current behavior: Similar card/frame treatments are implemented through repeated combinations around `Border` and custom inner wrappers.
- Target standard: Extract semantic surface wrappers (`FramedCard`, `FramedSection`, `FramedModalBody`).
- Remediation: Build small wrapper primitives around `Border` with consistent internal padding/surfaces.
- Migration priority: Later

### Category: State and Accessibility Gaps

#### Finding 7
- Severity: High
- Affected files: `app/globals.css`
- Current behavior: Global smooth scrolling is forced (`!important`) for all users.
- Target standard: Respect motion preferences and avoid forcing smooth behavior under reduced motion.
- Remediation: Move smooth scroll behavior behind `@media (prefers-reduced-motion: no-preference)` and remove `!important`.
- Migration priority: Now

#### Finding 8
- Severity: Medium
- Affected files: `components/layout/navbar/navbar.tsx`, `app/(homepage)/_components/hero.tsx`, `app/(homepage)/_components/opening-hours.tsx`
- Current behavior: Frequent raw `<img>` elements with varying quality of `alt` semantics and no optimization defaults.
- Target standard: Prefer `next/image` for non-decorative images; document decorative image rules and alt strategy.
- Remediation: Migrate key informative images to `next/image`; mark purely decorative imagery appropriately.
- Migration priority: Next

#### Finding 9
- Severity: Low
- Affected files: `components/layout/navbar/nav-item.tsx`, `components/layout/navbar/menu.tsx`
- Current behavior: Active navigation state now uses exact/segment matching.
- Target standard: Route-aware exact/segment matching utility for active states.
- Remediation: Keep shared nav matcher centralized if additional nav variants are added.
- Migration priority: Done
- Status: Resolved in 2026-02-13 refactor.

### Category: Hardcoded Values

#### Finding 10
- Severity: Medium
- Affected files: `components/layout/navbar/navbar.tsx`, `components/layout/navbar/menu.tsx`, `components/custom-toast.tsx`, `components/cookie-consent.tsx`, `components/age-gate.tsx`
- Current behavior: Hardcoded z-index tiers (`z-[1000]`+), which are not tokenized and can collide over time.
- Target standard: Define z-index scale tokens (`z-nav`, `z-overlay`, `z-modal`, `z-toast`, etc.) and map classes consistently.
- Remediation: Add layering scale in design governance and replace literal z-index values.
- Migration priority: Now

#### Finding 11
- Severity: Low
- Affected files: `components/ui/button.tsx`
- Current behavior: Base class includes both `rounded-md` and `rounded-none`; effective behavior is square but ambiguous by definition.
- Target standard: Single source of radius truth per button style.
- Remediation: Remove contradictory base radius class and drive radius explicitly via variant or dedicated size/style rules.
- Migration priority: Next

#### Finding 12
- Severity: Low
- Affected files: `components/ui/command.tsx`
- Current behavior: Contains atypical class selector fragment `**:data-[slot=command-input-wrapper]:h-12` in composed class string.
- Target standard: Validated utility composition without malformed selector artifacts.
- Remediation: Clean and verify command class composition; keep only valid Tailwind selectors.
- Migration priority: Next

## Standardization Recommendations

### 1. Formalize Token Layers
- Keep existing brand tokens as foundation.
- Add semantic tokens for text roles (`content-primary`, `content-muted`) and status colors.
- Add layering and motion policy tokens (z-index scale, motion durations/easings).

### 2. Define a Typography Contract
- Publish a named type ramp:
  - Display
  - H1
  - H2
  - H3
  - Body L/M/S
  - Caption
- Include casing policy (when uppercase is allowed) and line-height standards.
- Resolve undefined blog font utilities.

### 3. Productize Common Field and Surface Primitives
- Introduce shared `Input`, `Textarea`, `FieldLabel`, `FieldHint` styles.
- Introduce framed surface wrappers around `Border` for common card/dialog contexts.

### 4. Normalize Interaction and Accessibility Rules
- Respect reduced-motion preference globally.
- Standardize focus visible behavior for links and clickable non-button elements.
- Establish image usage policy (`next/image` default, alt text convention).

### 5. Set Migration Workflow
- Prioritize `Now` items first:
  - Typography token integrity
  - Reduced motion compliance
  - z-index scale
- Then execute `Next` items in component-level refactors.
- Keep `Later` items as cleanup once primitives are stable.

## Governance Rules for Future UI Changes
1. New UI must use existing design tokens before introducing new raw color utilities.
2. Any new color must be added as a token first, then consumed semantically.
3. Any repeated class pattern appearing in 3+ places must become a primitive or utility abstraction.
4. New forms must use shared field primitives and button variants.
5. Motion must support reduced-motion users.
6. Layering must use the agreed z-index scale, never ad-hoc numeric literals.
7. Typography changes must map to the documented type ramp.
8. Route-specific one-off styling should be documented if intentionally divergent.

## Appendix: Source Index

### Global and Config Sources
- `app/globals.css`
- `app/layout.tsx`
- `package.json`
- `components.json`

### Core Primitive Sources
- `components/container.tsx`
- `components/border.tsx`
- `components/custom-toast.tsx`
- `components/layout/navbar/nav-item.tsx`
- `components/layout/navbar/language-selector.tsx`
- `components/ui/button.tsx`
- `components/ui/dialog.tsx`
- `components/ui/popover.tsx`
- `components/ui/command.tsx`
- `components/ui/switch.tsx`
- `components/ui/separator.tsx`

### Shared Shell and Feature Components
- `components/layout/navbar/navbar.tsx`
- `components/layout/navbar/menu.tsx`
- `components/layout/footer.tsx`
- `components/products/index.tsx`
- `components/products/*`

### Feature Components
- `components/cookie-consent.tsx`
- `components/age-gate.tsx`
- `components/newsletter-popup.tsx`
- `components/map.tsx`
- `components/map-legend.tsx`
- `components/products/keg-news-dialog.tsx`

### Route and Content Screens (Public Web)
- `app/(homepage)/page.tsx`
- `app/(homepage)/_components/hero.tsx`
- `app/(homepage)/_components/intro.tsx`
- `app/(homepage)/_components/about.tsx`
- `app/(homepage)/_components/opening-hours.tsx`
- `app/(homepage)/_components/places.tsx`
- `app/produkty/page.tsx`
- `app/prodejni-mista/page.tsx`
- `app/pro-firmy/page.tsx`
- `app/newsletter/page.tsx`
- `app/kontakt/page.tsx`
- `app/udalosti/[lang]/_components/events-page.tsx`
- `app/udalosti/[lang]/_components/event-detail.tsx`
- `app/historie/page.tsx`
- `app/clanky/_components/post.tsx`
- `app/clanky/_components/posts.tsx`
- `app/clanky/_components/sidebar.tsx`
- `app/clanky/_components/rich-text.tsx`
- `app/clanky/_components/newsletter-mini-form.tsx`
- `app/(legal)/cookies/page.tsx`
- `app/(legal)/gdpr/page.tsx`
- `app/(legal)/obchodni-podminky/page.tsx`

### Coverage Checklist Mapping
- Homepage: covered
- Products: covered
- Events: covered
- Blog: covered
- Legal: covered
- Contact: covered
- Newsletter: covered
- Navigation/Footer: covered
