# Event RSVP Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Přidat checkbox účasti na detail akce a robustní počítání účastníků přes Sanity bez externí DB.

**Architecture:** Klientská komponenta načítá stav účasti a počet přes API route. Server route používá cookie token (bez loginu), hashuje jej a ukládá/updatuje RSVP dokument v Sanity pod deterministickým ID. Počet se získává agregací `count(...)` nad `eventRsvp` dokumenty.

**Tech Stack:** Next.js App Router, TypeScript, Sanity Content Lake, GROQ, React client components.

---

### Task 1: Přidat datový model pro RSVP

**Files:**
- Create: `sanity/schemaTypes/eventRsvp.ts`
- Modify: `sanity/schemaTypes/index.ts`

**Step 1: Vytvořit schema `eventRsvp`**
- Pole: `eventKey`, `event` (reference na `event`), `visitorHash`, `participating`, `createdAt`, `updatedAt`

**Step 2: Zaregistrovat schema v indexu**
- Přidat `eventRsvpType` do `schema.types`

**Step 3: Ověření**
Run: `bun run build`
Expected: build projde bez schema chyb

### Task 2: Přidat serverový write klient pro Sanity

**Files:**
- Create: `sanity/lib/write-client.ts`

**Step 1: Vytvořit klienta s tokenem**
- `hasSanityWriteToken` boolean
- `writeClient` s `useCdn: false`, token z `SANITY_API_WRITE_TOKEN`

**Step 2: Ověřit typy**
Run: `bun run build`
Expected: TypeScript bez chyb

### Task 3: Implementovat RSVP API route

**Files:**
- Create: `app/api/events/[eventId]/rsvp/route.ts`

**Step 1: Přidat GET handler**
- Najít event dle `eventId`, spočítat `eventKey`
- Vrátit počet účastníků a stav účasti podle cookie tokenu

**Step 2: Přidat POST handler**
- Validace `participating: boolean`
- Vytvořit cookie token pokud chybí
- Upsert RSVP dokument přes `writeClient`
- Vrátit nový počet a stav

**Step 3: Ošetřit chybové stavy**
- 404 event neexistuje
- 400 neplatný payload
- 503 chybějící write token

### Task 4: Přidat checkbox UI na detail akce

**Files:**
- Create: `app/udalosti/[lang]/_components/event-rsvp.tsx`
- Modify: `app/udalosti/[lang]/_components/event-detail.tsx`

**Step 1: Klientská komponenta**
- Načíst GET endpoint při mountu
- Zobrazit checkbox a počet

**Step 2: Přepínání účasti**
- Při změně checkboxu volat POST endpoint
- Aktualizovat count + participating z response

**Step 3: Lokalizace textu**
- CS/EN/DE texty inline dle jazyka stránky

### Task 5: Validace

**Files:**
- Modify: `.env` (lokálně, mimo repo) s `SANITY_API_WRITE_TOKEN`

**Step 1: Spustit build**
Run: `bun run build`
Expected: PASS

**Step 2: Ruční test**
- Otevřít detail akce
- Zaškrtnout checkbox
- Ověřit nárůst count
- Reload: stav zůstává

