# Unified Post And Category Editor Design

**Date:** 2026-04-02

**Goal:** Replace the current per-language blog post and category document model with unified documents containing all three language variants, without damaging existing data and with an explicit migration path.

## Current State

Today each article language variant is stored as a separate `post` document in Sanity.

Current characteristics:
- each post document has a `language` field (`cs`, `en`, `de`)
- related variants are linked through `translationKey`
- category documents are also language-specific and are referenced directly from posts
- frontend queries resolve blog detail by `slug + language`
- SEO alternates are derived by looking up sibling post documents through `translationKey`
- article listing filters and article cards use localized category documents directly

This is operationally correct but hard to edit because one article requires switching between multiple post documents and separately maintaining language-specific categories.

## Target State

Posts and categories will use unified documents containing shared fields plus localized content branches.

Proposed model:

- `unifiedCategory`
  - localized fields:
    - `title.cs|en|de`
    - `slug.cs|en|de`

- `unifiedPost`
  - shared fields:
    - `mainImage`
    - `publishedAt`
    - `featured`
    - `categories[]` referencing `unifiedCategory`
  - localized fields:
    - `title.cs|en|de`
    - `slug.cs|en|de`
    - `body.cs|en|de`
    - `seo.cs|en|de`

Result:
- one editor per article
- one editor per category
- all language variants visible in one place
- one shared category assignment per article
- localized slug and content remain independent

## Non-Goals

This change does not yet apply to:
- events
- legal pages
- static marketing pages
- other localized frontend sections outside blog posts and blog categories

This migration targets only blog posts and blog categories.

## Migration Strategy

Migration must be non-destructive and happen in two layers.

Phase 1:
- introduce new schema types for unified categories and unified posts
- keep the current `category` and `post` types unchanged
- add a migration script for legacy categories
- do not delete or mutate old source category documents during the first migration

Phase 2:
- add a migration script for legacy posts
- map legacy post category references to unified category references
- do not delete or mutate old source post documents during the first migration

Phase 3:
- update frontend blog queries to support the new unified types
- keep fallback compatibility for old data while validating migrated content
- verify article lists, detail pages, category filters, related posts, recent posts, sitemap entries, alternates, and language switching

Phase 4:
- switch Studio navigation to the new unified post and unified category types
- stop authoring new content in the old `post` and `category` types
- archive or retire old documents only after validation and explicit manual approval

## Data Mapping

### Category Migration

Legacy category documents must be grouped into one unified category record per logical category.

Grouping strategy:
- prefer an explicit translation grouping if present in the data set
- if no explicit grouping field exists, use a deterministic migration grouping strategy based on title/slug analysis and dry-run review
- never silently merge ambiguous category groups

For each category group:
- `title.<lang>` from legacy `title`
- `slug.<lang>` from legacy `slug`

The migration output must also preserve enough metadata for validation reporting during the migration run.

### Post Migration

Migration groups current post documents by `translationKey`.

For each post group:
- localized branch assignment:
  - `title.<lang>` from `title`
  - `slug.<lang>` from `slug`
  - `body.<lang>` from `body`
  - `seo.<lang>` from `seo`
- shared field assignment:
  - prefer `cs` as canonical source when present
  - otherwise use the first available language variant
  - source fields:
    - `mainImage`
    - `publishedAt`
    - `featured`

Category assignment:
- migrate post categories to one shared `categories[]` list of references to `unifiedCategory`
- derive this list by mapping every legacy referenced category to its corresponding unified category
- deduplicate the resulting reference list

## Category Reference Mapping Rules

Category reference mapping is the highest-risk part of this migration.

Rules:
- never silently drop a legacy category reference
- never silently map one legacy category to multiple unified categories
- if a referenced legacy category cannot be mapped to exactly one unified category, emit a warning in the migration report
- if a post has conflicting category assignments across languages, take the union of all successfully mapped categories and include the discrepancy in the conflict report

Expected migration report contents for category mapping:
- source post IDs
- source category IDs
- target unified category IDs
- unmapped category IDs
- conflicting per-language category sets

## Conflict Handling

Some existing sibling post documents may disagree on supposedly shared fields.

Examples:
- different `publishedAt` values across languages
- different `featured` values
- different `mainImage`
- different category assignments
- missing localized variant
- ambiguous category grouping

Migration rules:
- never silently discard conflicting values
- choose a deterministic winner for migrated shared post fields:
  - `cs` first
  - otherwise first available variant
- choose the shared category assignment as the union of successfully mapped categories
- emit a conflict report for manual review
- include enough identifiers in the report to locate the affected content quickly

Expected report contents:
- `translationKey`
- source document IDs
- conflicting field names
- values seen per language
- chosen canonical value
- category mapping issues

## Frontend Architecture

Frontend blog pages will move from per-document localization to localized branches inside one document.

### Blog Listing

Listing query behavior:
- fetch unified post documents
- fetch unified category documents
- for requested `lang`, project only the localized branch for that language
- ignore posts where the requested branch is missing required display data such as `slug` or `title`
- ignore categories where the requested branch is missing required display data such as `title`

Projected listing shape should remain close to the current `Post` and `Category` consumer shapes to limit UI churn.

### Blog Detail

Detail lookup behavior:
- find the unified post document whose `slug.<lang>.current` matches the requested slug
- project shared fields plus the requested localized branch
- resolve category labels and slugs from the requested language branch of referenced unified categories

### Sidebar, Related, And Recent Posts

All supporting blog queries must move to unified posts:
- recent posts in the sidebar
- related posts based on shared unified category references
- featured posts if used elsewhere in the codebase

All of these should return the current language branch only.

### SEO Alternates

Alternates no longer need `translationKey` lookup.

They will be derived directly from available localized slug branches on the same unified post document:
- `cs` path from `slug.cs`
- `en` path from `slug.en`
- `de` path from `slug.de`

Only languages with a valid slug should be emitted.

### Sitemap

Sitemap generation will iterate unified post documents and emit one URL per available localized slug branch.

## Studio Architecture

Studio should expose one editor surface per post and one editor surface per category once the new model is adopted.

Recommended authoring layout:
- shared post section first
- localized sections grouped by language
  - `CS`
  - `EN`
  - `DE`

For categories:
- localized sections grouped by language
  - `CS`
  - `EN`
  - `DE`

Recommended editing UX:
- field groups with language flags
- localized slug generator buttons tied to the matching localized title field
- single unified post list instead of language-separated post lists
- single unified category list instead of language-separated category lists

Legacy post and category types should remain hidden or clearly marked as archive-only after validation.

## Safety Constraints

The migration must satisfy all of the following:
- no deletion of existing post documents during initial rollout
- no deletion of existing category documents during initial rollout
- no in-place mutation of existing localized post documents
- no in-place mutation of existing localized category documents
- deterministic migration output
- explicit reporting of data conflicts
- rollback remains possible because old source documents still exist

## Testing And Validation

Validation checklist:
- migrated unified category count matches grouped source category count
- migrated unified post count matches grouped source post count
- each localized category branch contains the expected migrated `title` and `slug`
- each localized post branch contains the expected migrated content
- category filters render correct localized labels for `cs`, `en`, `de`
- list pages render correct language branches for posts and categories
- detail pages resolve by localized slug
- sidebar recent posts render correct localized titles and category labels
- alternates point to sibling localized slugs on the same unified post
- sitemap emits valid localized article URLs
- shared category assignment works correctly across all languages

Manual review cases:
- complete 3-language post with multiple categories
- 2-language post
- 1-language post
- post whose languages have different category assignments
- category group with missing languages
- conflicting shared post fields across source documents

## Rollout Plan

Recommended rollout order:
1. Add unified category schema.
2. Add unified post schema.
3. Build category migration script with dry-run reporting.
4. Run category dry-run and inspect conflicts.
5. Run non-destructive unified category migration.
6. Build post migration script with dry-run reporting.
7. Run post dry-run and inspect conflicts, especially category mapping.
8. Run non-destructive unified post migration.
9. Add dual-read frontend support for posts and categories.
10. Validate production-like behavior.
11. Switch Studio authoring to unified posts and unified categories.
12. Retire old post and category authoring only after explicit approval.

## Open Decisions Already Resolved

The following decisions were agreed:
- scope includes both blog posts and blog categories
- preferred direction is a true unified document model, not a Studio-only wrapper
- migration must not damage or erase existing data
- existing localized content should be automatically assigned to the correct language branch
- category references in posts should become one shared unified category reference list

## Next Step

Write an implementation plan covering:
- new unified category schema
- new unified post schema
- category migration script and reporting
- post migration script and category mapping
- dual-read frontend support
- final query and Studio switch-over
