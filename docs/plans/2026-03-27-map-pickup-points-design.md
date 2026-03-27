# Map Pickup Points Design

## Context
Mapa v `components/map.tsx` zobrazuje distribuční a partnerská místa přes vlastní Leaflet markery. Nově je potřeba odlišit výdejní místa vizuálně i textově v popupu.

Aktuálně je prvním výdejním místem `Potraviny a hospoda u Nováků`, Mochtín 8.

## Goal
Rozšířit marker data tak, aby šlo jednotlivá místa označit jako výdejní a zobrazit je na mapě jinou barvou se štítkem `Výdejní místo` v popupu.

## Chosen Approach
Použít obecný příznak `variant` přímo v datech markeru:

- `variant?: 'default' | 'pickup'` na externím markeru
- ikona markeru bude dostávat styly podle varianty
- popup bude pro `pickup` zobrazovat štítek nad existujícím obsahem

## Trade-offs
- Plus: malá změna bez rozbití současného API, snadné rozšíření o další výdejní místa
- Plus: budoucí další varianty lze přidat bez změny datového modelu
- Mínus: cluster markery zatím varianty neodlišují, protože slouží jen jako přechodný agregovaný stav při oddálení mapy

## Scope
- Upravit jen `components/map.tsx`
- Označit `Potraviny a hospoda u Nováků` jako `pickup`
- Neměnit clustering, layout mapy ani externí spotřebitele komponenty
