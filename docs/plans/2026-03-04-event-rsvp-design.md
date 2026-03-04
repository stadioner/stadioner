# Event RSVP Design

## Context
Projekt používá Next.js + Sanity CMS. Události jsou dokumenty typu `event` a jsou lokalizované (`language`) s vazbou přes `translationKey`.

Požadavek: na detailu akce přidat checkbox „Zúčastním se akce“, aby šel zobrazit orientační počet zájemců. Bez loginu, s omezením jeden hlas na člověka (resp. na zařízení/prohlížeč pomocí cookie).

## Goal
Umožnit návštěvníkovi označit účast na akci a zobrazovat aktuální počet účastníků pro danou akci.

## Chosen Approach
Varianta 2: cookie + samostatné RSVP dokumenty v Sanity.

### Data model
- Nový Sanity typ `eventRsvp`
- Jedinečný záznam na kombinaci `eventKey + visitorHash`
- `eventKey` = `event.translationKey` (fallback na `_id`), aby hlas platil napříč jazykovými variantami stejné akce
- `visitorHash` = SHA-256 hash cookie tokenu
- `participating` = boolean

### API
- `GET /api/events/[eventId]/rsvp`
  - vrací `{ count, participating }`
  - `count` = počet `eventRsvp` s `participating == true`
  - `participating` podle existujícího cookie tokenu
- `POST /api/events/[eventId]/rsvp`
  - body: `{ participating: boolean }`
  - upsert záznamu podle deterministického `_id`
  - vrací `{ count, participating }`

### Client UI
- Na detailu akce přidat checkbox „Zúčastním se akce“
- Po načtení zobrazit aktuální počet
- Po přepnutí checkboxu zavolat POST a aktualizovat číslo

## Trade-offs
- Plus: bez externí databáze, jednoduché nasazení, dobrá konzistence pro orientační metriky
- Mínus: při smazání cookies nebo změně zařízení může stejný člověk hlasovat znovu

## Security and privacy
- Ukládá se pouze hash tokenu, ne přímo identita uživatele
- Použije se `httpOnly` cookie

## Operational requirements
- Nutný serverový write token pro Sanity (`SANITY_API_WRITE_TOKEN`) s oprávněním zápisu do datasetu

