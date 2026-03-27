# Map Pickup Points Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Přidat do mapy podporu pro výdejní místa s odlišnou barvou markeru a štítkem v popupu.

**Architecture:** Marker data dostanou volitelnou variantu `default | pickup`. Leaflet ikona bude generovat styly podle varianty a popup obsah se při mapování markerů obalí o jednotný badge pro výdejní místa.

**Tech Stack:** Next.js, React, TypeScript, Leaflet, React Leaflet.

---

### Task 1: Rozšířit datový model markerů

**Files:**
- Modify: `components/map.tsx`

- [ ] Přidat typ `MarkerVariant`
- [ ] Rozšířit `ExternalMarker` o `variant?: MarkerVariant`
- [ ] Označit `Potraviny a hospoda u Nováků` jako `pickup`

### Task 2: Přidat vizuální odlišení markerů

**Files:**
- Modify: `components/map.tsx`

- [ ] Upravit `createImageIcon`, aby přijímala variantu
- [ ] Definovat odlišné barvy pro `default` a `pickup`
- [ ] Zachovat stejné rozměry a chování markeru

### Task 3: Přidat badge do popupu

**Files:**
- Modify: `components/map.tsx`

- [ ] Při skládání `resolvedMarkers` doplnit popup wrapper
- [ ] Pro `pickup` zobrazit štítek `Výdejní místo`
- [ ] Pro ostatní místa ponechat popup beze změny obsahu

### Task 4: Ověření

**Files:**
- Modify: `components/map.tsx`

- [ ] Spustit `bun run build` nebo typovou kontrolu projektu
- [ ] Ověřit, že TypeScript projde bez chyb
