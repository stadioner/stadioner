# Unified Posts Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Introduce unified multilingual post and category documents in Sanity, migrate current content into them non-destructively, and switch blog reading to the unified model without losing data.

**Architecture:** Add `unifiedCategory` and `unifiedPost` beside the current localized `category` and `post` types, migrate old records with copy-only scripts, and move frontend blog queries to unified-first dual-read. Keep rollback possible by preserving old source documents and reporting conflicts instead of silently flattening them.

**Tech Stack:** Next.js App Router, TypeScript, Sanity Studio 4, GROQ, next-sanity, Bun

---

## Chunk 1: Schema And Types

### Task 1: Add unified category and post schemas

**Files:**
- Create: `sanity/schemaTypes/unifiedCategoryType.ts`
- Create: `sanity/schemaTypes/unifiedPostType.ts`
- Create: `sanity/schemaTypes/objects/postSeo.ts`
- Create: `sanity/schemaTypes/objects/localizedPostSeo.ts`
- Modify: `sanity/schemaTypes/index.ts`
- Modify: `sanity/structure.ts`

- [ ] Add reusable SEO object types for localized post SEO branches.
- [ ] Add `unifiedCategory` with localized `title` and `slug`.
- [ ] Add `unifiedPost` with shared media/publish/category fields and localized title/slug/body/seo.
- [ ] Register the new schema types and add Studio lists for unified posts and categories.
- [ ] Keep legacy `post` and `category` types hidden from the main Studio flow.

### Task 2: Add TypeScript models and mappers

**Files:**
- Create: `types/unified-post.ts`
- Create: `types/unified-category.ts`
- Create: `lib/blog/unified-post-mapper.ts`
- Modify: `types/blog.ts`

- [ ] Add types for unified posts and categories.
- [ ] Add mappers from unified models to current UI-compatible blog post/category shapes.
- [ ] Keep existing rendering types stable where possible to minimize UI churn.

## Chunk 2: Migration Tooling

### Task 3: Add unified category migration

**Files:**
- Create: `scripts/lib/unified-category-migration.ts`
- Create: `scripts/migrate-categories-to-unified.ts`

- [ ] Read all legacy `category` documents.
- [ ] Group categories deterministically across languages.
- [ ] Build dry-run reporting for missing languages and grouping conflicts.
- [ ] Add `--write` mode to create unified category documents without mutating legacy docs.

### Task 4: Add unified post migration

**Files:**
- Create: `scripts/lib/unified-post-migration.ts`
- Create: `scripts/migrate-posts-to-unified.ts`

- [ ] Read all legacy `post` documents.
- [ ] Group posts by `translationKey`.
- [ ] Map localized fields to unified branches.
- [ ] Resolve legacy category references to unified category references.
- [ ] Build dry-run reporting for missing languages, shared-field conflicts, and category mapping issues.
- [ ] Add `--write` mode to create unified post documents without mutating legacy docs.

## Chunk 3: Queries And Frontend

### Task 5: Add unified blog queries

**Files:**
- Modify: `sanity/lib/queries.ts`

- [ ] Add unified category listing query.
- [ ] Add unified post listing/detail/path/sitemap/recent queries.
- [ ] Keep legacy blog queries during the transition.

### Task 6: Switch blog listing/detail to dual-read

**Files:**
- Modify: `app/clanky/[lang]/page.tsx`
- Modify: `app/clanky/[lang]/[slug]/page.tsx`
- Modify: `app/clanky/_components/posts.tsx`
- Modify: `app/clanky/_components/post.tsx`
- Modify: `app/clanky/_components/sidebar.tsx`
- Modify: `app/sitemap.ts`

- [ ] Read unified posts and categories first, fallback to legacy if unified data is absent.
- [ ] Build alternates from localized slugs on one unified post.
- [ ] Use localized category titles in filters, cards, detail, and sidebar.
- [ ] Update sitemap to emit unified article URLs.

## Chunk 4: Verification

### Task 7: Validate code and migration tooling

**Files:**
- Modify: `sanity/components/localized-slug-input.tsx` if needed for blog wording

- [ ] Make slug generation copy generic enough for posts/categories.
- [ ] Run `bun run lint`.
- [ ] Run `bun run build`.
- [ ] Run `bun run scripts/migrate-categories-to-unified.ts --dry-run`.
- [ ] Run `bun run scripts/migrate-posts-to-unified.ts --dry-run`.
- [ ] Review dry-run output for missing languages and category mapping issues.
