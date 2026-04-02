# Unified Events Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Introduce one multilingual event document in Sanity, migrate current event data into it non-destructively, and switch frontend event reading to the unified model without breaking existing content.

**Architecture:** Add a new unified event schema alongside the current localized `event` schema, migrate existing records with a copy-only script, then move frontend queries to dual-read and finally primary-read from the new model. Keep rollback possible by preserving old source documents and reporting conflicts instead of silently flattening them.

**Tech Stack:** Next.js App Router, TypeScript, Sanity Studio 4, GROQ, next-sanity, Bun

---

## Chunk 1: Unified Event Schema

### Task 1: Add reusable multilingual field objects for events

**Files:**
- Create: `sanity/schemaTypes/objects/localizedString.ts`
- Create: `sanity/schemaTypes/objects/localizedSlug.ts`
- Create: `sanity/schemaTypes/objects/localizedBlockContent.ts`
- Modify: `sanity/schemaTypes/index.ts`

- [ ] **Step 1: Create `localizedString` schema object**

Add fields:
- `cs: string`
- `en: string`
- `de: string`

- [ ] **Step 2: Create `localizedSlug` schema object**

Add fields:
- `cs: slug`
- `en: slug`
- `de: slug`

Use per-language titles so editors understand which slug belongs to which language.

- [ ] **Step 3: Create `localizedBlockContent` schema object**

Add fields:
- `cs: blockContent`
- `en: blockContent`
- `de: blockContent`

- [ ] **Step 4: Register new object schemas**

Modify `sanity/schemaTypes/index.ts` so all three object schemas are available to the new unified event type.

- [ ] **Step 5: Verify schema compiles**

Run: `bun run build`
Expected: schema types compile without missing-type errors.

### Task 2: Add unified event document schema

**Files:**
- Create: `sanity/schemaTypes/unifiedEventType.ts`
- Modify: `sanity/schemaTypes/index.ts`
- Modify: `sanity/structure.ts`

- [ ] **Step 1: Create new unified document type**

Add a new document type, recommended name: `unifiedEvent`.

Fields:
- shared:
  - `dateTime`
  - `endDateTime`
  - `location`
  - `isComingSoon`
  - `mainImage`
  - `rsvpCount`
  - `rsvpVoterHashes`
- localized:
  - `title: localizedString`
  - `slug: localizedSlug`
  - `description: localizedBlockContent`
  - `recap: localizedBlockContent`
- migration/audit:
  - `legacyTranslationKey`
  - `legacySourceEventIds`

- [ ] **Step 2: Add preview logic**

Preview should show:
- preferred visible title order: `title.cs`, then `title.en`, then `title.de`
- date summary
- indicator of which languages are filled

- [ ] **Step 3: Register the new type**

Modify `sanity/schemaTypes/index.ts` to include `unifiedEventType`.

- [ ] **Step 4: Add Studio navigation entry**

Modify `sanity/structure.ts`:
- add a top-level `Unified Events` list
- keep existing `Events` list for old records during migration

- [ ] **Step 5: Verify Studio still boots**

Run: `bun run build`
Expected: app build succeeds and Studio route still compiles.

## Chunk 2: Migration Tooling

### Task 3: Build a dry-run migration script

**Files:**
- Create: `scripts/migrate-events-to-unified.ts`
- Create: `scripts/lib/unified-event-migration.ts`

- [ ] **Step 1: Read current localized event documents**

Fetch current `event` docs with:
- `_id`
- `translationKey`
- `language`
- shared fields
- localized fields

- [ ] **Step 2: Group by `translationKey`**

Rules:
- primary grouping key is `translationKey`
- if missing, place event in a single-item fallback group and report it

- [ ] **Step 3: Transform each group to unified event payload**

Mapping:
- `title.<lang>` from localized source title
- `slug.<lang>` from localized source slug
- `description.<lang>` from localized source description
- `recap.<lang>` from localized source recap
- shared fields from `cs`, otherwise first available language

- [ ] **Step 4: Detect conflicts**

Compare shared fields across grouped variants:
- `dateTime`
- `endDateTime`
- `location`
- `isComingSoon`
- `mainImage`
- `rsvpCount`
- `rsvpVoterHashes`

Write a human-readable report to stdout with:
- `translationKey`
- source IDs
- per-language conflicting values
- chosen value

- [ ] **Step 5: Support dry-run mode**

Script flags:
- `--dry-run`
- `--write`

In `--dry-run`:
- print summary counts
- do not write to Sanity

- [ ] **Step 6: Verify dry-run locally**

Run: `bun run scripts/migrate-events-to-unified.ts --dry-run`
Expected:
- summary of grouped events
- conflict report if any
- zero writes performed

### Task 4: Add write mode for non-destructive copy migration

**Files:**
- Modify: `scripts/migrate-events-to-unified.ts`
- Modify: `scripts/lib/unified-event-migration.ts`

- [ ] **Step 1: Create deterministic target IDs**

Suggested ID pattern:
- `unifiedEvent.<translationKey>`
- fallback for missing key: generated stable surrogate reported in output

- [ ] **Step 2: Write unified documents without mutating old `event` docs**

For each group:
- create or replace unified document
- populate audit fields:
  - `legacyTranslationKey`
  - `legacySourceEventIds`

- [ ] **Step 3: Preserve RSVP data**

Copy:
- `rsvpCount`
- `rsvpVoterHashes`

Use canonical shared-field resolution rules from dry-run.

- [ ] **Step 4: Print migration summary**

Output:
- groups processed
- unified docs written
- groups with conflicts
- groups missing translations

- [ ] **Step 5: Verify write mode on a safe dataset**

Run: `bun run scripts/migrate-events-to-unified.ts --write`
Expected:
- unified docs created
- old localized docs unchanged

## Chunk 3: Frontend Dual-Read Support

### Task 5: Add unified event TypeScript model and mapper

**Files:**
- Create: `types/unified-event.ts`
- Create: `lib/events/unified-event-mapper.ts`
- Modify: `types/event.ts`

- [ ] **Step 1: Add unified event type**

Define shape for:
- shared fields
- localized nested branches
- legacy audit fields

- [ ] **Step 2: Add mapper from unified event to current UI `Event` shape**

Function inputs:
- unified event document
- requested language

Function output:
- current consumer-compatible `Event`

Include:
- localized branch selection
- fallback to `null` when required localized fields are missing

- [ ] **Step 3: Keep current `Event` type stable where possible**

Avoid broad UI churn by preserving current event consumer shape for listing/detail components.

- [ ] **Step 4: Verify typecheck**

Run: `bun run build`
Expected: no TS errors in mapper or event consumers.

### Task 6: Add GROQ queries for unified events

**Files:**
- Modify: `sanity/lib/queries.ts`
- Create: `lib/events/unified-event-query-helpers.ts`

- [ ] **Step 1: Add unified listing query**

Query should fetch:
- shared fields
- all localized branches needed for mapping or only targeted branch if cleaner

- [ ] **Step 2: Add unified detail query by localized slug**

Query should find records where one of:
- `slug.cs.current == $slug`
- `slug.en.current == $slug`
- `slug.de.current == $slug`

Prefer a helper to project requested language cleanly.

- [ ] **Step 3: Add unified sitemap query**

Fetch:
- shared fields
- localized slugs
- localized recaps
- `_updatedAt`

- [ ] **Step 4: Keep old queries during transition**

Do not delete old event queries yet.

- [ ] **Step 5: Verify queries compile**

Run: `bun run build`
Expected: query imports and usages resolve cleanly.

### Task 7: Switch event listing/detail to dual-read

**Files:**
- Modify: `app/udalosti/[lang]/page.tsx`
- Modify: `app/udalosti/[lang]/[slug]/page.tsx`
- Modify: `app/sitemap.ts`
- Modify: `lib/seo/alternates.ts` if needed
- Modify: `lib/events/visibility.ts` if needed

- [ ] **Step 1: Add unified-event-first read for listings**

Flow:
- fetch unified events
- map to current UI `Event`
- if no unified docs exist yet, optionally fallback to old localized query

- [ ] **Step 2: Add unified-event-first read for detail**

Flow:
- fetch unified event by localized slug
- map to current `Event`
- preserve recap gating logic
- fallback to old model only if unified record not found during transition

- [ ] **Step 3: Replace alternate URL derivation**

Alternates should be generated from localized slug branches on one unified event, not from `translationKey` sibling lookup.

- [ ] **Step 4: Update sitemap generation**

Emit one URL per localized slug branch that:
- exists
- is visible by current recap rule

- [ ] **Step 5: Verify behavior**

Manual checks:
- `/cs/udalosti`
- `/en/udalosti`
- `/de/udalosti`
- event detail in each language
- past event with recap only in one language

## Chunk 4: RSVP Transition

### Task 8: Update RSVP route to operate on unified events

**Files:**
- Modify: `app/api/events/[eventId]/rsvp/route.ts`
- Modify: `app/udalosti/[lang]/_components/event-detail.tsx`

- [ ] **Step 1: Change RSVP route lookup to unified event IDs**

Primary behavior:
- read and write `unifiedEvent` documents directly

- [ ] **Step 2: Preserve transition compatibility**

If frontend still reaches an old localized event ID during rollout:
- resolve to old event
- locate matching unified event through `translationKey` or audit fields
- prefer writing RSVP state to unified doc once it exists

- [ ] **Step 3: Keep past-event lock**

Preserve server-side `isEventPast` guard before RSVP mutation.

- [ ] **Step 4: Pass the correct unified event ID from detail page**

Ensure rendered detail page gives `EventRsvp` the unified document ID after mapping.

- [ ] **Step 5: Verify RSVP**

Manual checks:
- upcoming event can be checked
- past event cannot be changed
- attendance persists correctly across languages of the same unified event

## Chunk 5: Studio Adoption and Cleanup

### Task 9: Improve unified event authoring UX

**Files:**
- Modify: `sanity/schemaTypes/unifiedEventType.ts`
- Modify: `sanity/structure.ts`

- [ ] **Step 1: Group localized fields**

Use fieldsets or groups:
- Shared
- Czech
- English
- German

- [ ] **Step 2: Add field descriptions**

Make editor intent explicit for:
- localized titles/slugs
- localized description/recap
- shared RSVP fields as read-only

- [ ] **Step 3: Demote old event type in Studio navigation**

Keep it accessible for review, but clearly label it as legacy.

- [ ] **Step 4: Verify Studio usability manually**

Open Studio and confirm one unified event can be edited without switching documents.

### Task 10: Final transition gate

**Files:**
- Modify: `docs/superpowers/specs/2026-04-02-events-unified-editor-design.md` if rollout notes change
- Optionally create: `docs/superpowers/reports/2026-04-02-events-migration-report.md`

- [ ] **Step 1: Run migration dry-run**

Run: `bun run scripts/migrate-events-to-unified.ts --dry-run`

- [ ] **Step 2: Review conflicts manually**

Do not continue until shared-field conflicts are understood.

- [ ] **Step 3: Run write migration**

Run: `bun run scripts/migrate-events-to-unified.ts --write`

- [ ] **Step 4: Validate production build**

Run: `bun run lint`
Run: `bun run build`
Expected: both pass

- [ ] **Step 5: Validate content end-to-end**

Check:
- list pages
- detail pages
- recap visibility
- sitemap
- alternates
- RSVP
- Studio authoring

- [ ] **Step 6: Leave legacy data intact**

Do not delete old `event` documents in this phase.
