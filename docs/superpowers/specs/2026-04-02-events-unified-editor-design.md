# Unified Event Editor Design

**Date:** 2026-04-02

**Goal:** Replace the current per-language event document model with one event document containing all three language variants, without damaging existing data and with an explicit migration path.

## Current State

Today each event language variant is stored as a separate `event` document in Sanity.

Current characteristics:
- each document has a `language` field (`cs`, `en`, `de`)
- related variants are linked through `translationKey`
- frontend queries resolve event detail by `slug + language`
- SEO alternates are derived by looking up sibling documents through `translationKey`
- RSVP is currently shared across variants through `translationKey`
- recap availability for past events is evaluated per localized document

This is operationally correct but hard to edit because one event requires switching between multiple documents.

## Target State

Events will use one unified document containing shared event data plus localized content branches.

Proposed model:
- shared fields:
  - `dateTime`
  - `endDateTime`
  - `location`
  - `isComingSoon`
  - `mainImage`
  - `rsvpCount`
  - `rsvpVoterHashes`
- localized fields:
  - `title.cs|en|de`
  - `slug.cs|en|de`
  - `description.cs|en|de`
  - `recap.cs|en|de`

Result:
- one editor per event
- all language variants visible in one place
- language-specific slug and content remain independent
- RSVP becomes naturally shared at the document level

## Non-Goals

This change does not yet apply to:
- blog posts
- categories
- legal pages
- other localized frontend sections outside events

This first migration targets only events.

## Migration Strategy

Migration must be non-destructive.

Phase 1:
- introduce a new schema type for unified events, for example `eventV2` or `localizedEvent`
- keep the current `event` type unchanged
- add a migration script that reads current `event` documents and creates new unified documents
- do not delete or mutate old source documents during the first migration

Phase 2:
- update frontend event queries to support the new unified type
- keep fallback compatibility for old data while validating migrated content
- verify event lists, detail pages, sitemap entries, recap access rules, alternates, and RSVP behavior

Phase 3:
- switch Studio navigation to the new unified event type
- stop authoring new content in the old `event` type
- archive or retire old event documents only after validation and explicit manual approval

## Data Mapping

Migration groups current event documents by `translationKey`.

For each group:
- localized branch assignment:
  - `title.<lang>` from `title`
  - `slug.<lang>` from `slug`
  - `description.<lang>` from `description`
  - `recap.<lang>` from `recap`
- shared field assignment:
  - prefer `cs` as canonical source when present
  - otherwise use the first available language variant
  - source fields:
    - `dateTime`
    - `endDateTime`
    - `location`
    - `isComingSoon`
    - `mainImage`
    - `rsvpCount`
    - `rsvpVoterHashes`

The migration script must also store source references for auditability, for example:
- original source document IDs
- source `translationKey`

## Conflict Handling

Some existing sibling documents may disagree on supposedly shared fields.

Examples:
- different `dateTime` values across languages
- different `location`
- different `mainImage`
- missing localized variant

Migration rules:
- never silently discard conflicting values
- choose a deterministic winner for the migrated shared field:
  - `cs` first
  - otherwise first available variant
- emit a conflict report for manual review
- include enough identifiers in the report to locate the affected content quickly

Expected report contents:
- `translationKey`
- source document IDs
- conflicting field names
- values seen per language
- chosen canonical value

## Frontend Architecture

Frontend event pages will move from per-document localization to localized branches inside one document.

### Event Listing

Listing query behavior:
- fetch unified event documents
- for requested `lang`, project only the localized branch for that language
- ignore documents where the requested branch is missing required display data such as `slug` or `title`

Projected listing shape should remain close to the current `Event` consumer shape to limit UI churn.

### Event Detail

Detail lookup behavior:
- find the unified event document whose `slug.<lang>.current` matches the requested slug
- project shared fields plus the requested localized branch
- preserve current recap gating:
  - future/current event detail is visible
  - past event detail is visible only if the localized `recap.<lang>` has content

### SEO Alternates

Alternates no longer need `translationKey` lookup.

They will be derived directly from available localized slug branches on the same document:
- `cs` path from `slug.cs`
- `en` path from `slug.en`
- `de` path from `slug.de`

Only languages with a valid slug should be emitted.

### Sitemap

Sitemap generation will iterate unified event documents and emit one URL per available localized slug branch that is allowed by current visibility rules.

### RSVP

RSVP becomes document-level:
- one shared RSVP state per event
- no need to synchronize across sibling documents through `translationKey`
- existing RSVP data must be copied into the unified event during migration

## Studio Architecture

Studio should expose only one editor surface per event once the new model is adopted.

Recommended authoring layout:
- shared event section first
- localized sections grouped by language
  - `CS`
  - `EN`
  - `DE`

This can be implemented with field groups, fieldsets, or custom ordering. A custom input component is not required unless default grouping proves too cramped.

Structure updates:
- replace the current language-separated event navigation with a single unified event list
- keep the old event type accessible only for migration review until retirement

## Safety Constraints

The migration must satisfy all of the following:
- no deletion of existing event documents during initial rollout
- no in-place mutation of existing localized event documents
- deterministic migration output
- explicit reporting of data conflicts
- rollback remains possible because old source documents still exist

## Testing and Validation

Validation checklist:
- migrated unified event count matches grouped source event count
- each localized branch contains the expected migrated content
- list pages render correct language branch for `cs`, `en`, `de`
- detail pages resolve by localized slug
- alternates point to sibling localized slugs on the same document
- sitemap emits only valid localized event URLs
- RSVP still loads and updates correctly on unified events
- past-event recap gating still works per language branch

Manual review cases:
- complete 3-language event
- 2-language event
- 1-language event
- past event with recap in one language only
- conflicting shared fields across source documents

## Rollout Plan

Recommended rollout order:
1. Add unified event schema.
2. Build migration script with dry-run reporting.
3. Run dry-run and inspect conflicts.
4. Run non-destructive copy migration.
5. Add dual-read frontend support.
6. Validate production-like behavior.
7. Switch Studio authoring to unified events.
8. Retire old event authoring only after explicit approval.

## Open Decisions Already Resolved

The following decisions were agreed:
- scope is events only
- preferred direction is a true unified event document, not a Studio-only wrapper
- migration must not damage or erase existing data
- existing localized content should be automatically assigned to the correct language branch

## Next Step

Write an implementation plan covering:
- new unified event schema
- migration script and reporting
- dual-read frontend support
- final query and Studio switch-over
