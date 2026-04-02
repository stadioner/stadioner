# Shared Pickup Point Section Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Sjednotit blok výdejního místa na homepage a na stránce Prodejní místa do jednoho sdíleného komponentu a doplnit informaci o novém výčepu.

**Architecture:** Vznikne jeden klientský komponent v `components/`, který bude obsahovat společné překlady, otevírací dobu, adresu, bohatý textový obsah i layout. Homepage i stránka `prodejni-mista` budou importovat stejný komponent přímo, aby se další změny dělaly jen na jednom místě.

**Tech Stack:** Next.js App Router, React 19, TypeScript, Zustand, Tailwind CSS, `next/image`

---

## Chunk 1: Shared component extraction

### Task 1: Vytvořit sdílený komponent výdejního místa

**Files:**
- Create: `components/pickup-point-section.tsx`
- Reference: `app/prodejni-mista/_components/vydejni-misto.tsx`
- Reference: `app/(homepage)/_components/opening-hours.tsx`

- [ ] Přesunout bohatší variantu layoutu a obsahu do nového sdíleného komponentu.
- [ ] Sloučit překlady, otevírací dobu, adresu a image alt texty do jednoho typed objektu bez `any`.
- [ ] Přidat informaci o výčepu od 3. 4. 2026 se sdělením, že běží ve stejné otevírací době a aktuální nabídka bude na sociálních sítích.

### Task 2: Přepojit obě stránky na jeden zdroj

**Files:**
- Modify: `app/(homepage)/page.tsx`
- Modify: `app/prodejni-mista/page.tsx`
- Delete: `app/(homepage)/_components/opening-hours.tsx`
- Delete: `app/prodejni-mista/_components/vydejni-misto.tsx`

- [ ] Nahradit page-specific importy přímým importem sdíleného komponentu.
- [ ] Odstranit staré duplicitní implementace, aby v repu zůstal jediný zdroj markupu a textů.

## Chunk 2: Verification

### Task 3: Ověřit, že refaktor neporušil build-time integraci

**Files:**
- Verify: `components/pickup-point-section.tsx`
- Verify: `app/(homepage)/page.tsx`
- Verify: `app/prodejni-mista/page.tsx`

- [ ] Spustit cílenou kontrolu přes `bun run lint` nebo `bun run build` podle dostupnosti projektu.
- [ ] Zkontrolovat diff a potvrdit, že homepage i Prodejní místa renderují stejný komponent.
