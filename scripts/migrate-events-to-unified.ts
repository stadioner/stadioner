import { groq } from 'next-sanity'
import {
  buildUnifiedMigrationRecords,
  createMigrationClients,
  getUnifiedEventUnsetPaths,
  type LegacyEventDocument
} from './lib/unified-event-migration'

export {}

const legacyEventsQuery = groq`
  *[_type == "event"] | order(dateTime asc) {
    _id,
    _type,
    language,
    translationKey,
    title,
    slug,
    dateTime,
    endDateTime,
    location,
    isComingSoon,
    rsvpCount,
    rsvpVoterHashes,
    mainImage,
    description,
    recap
  }
`

const args = new Set(process.argv.slice(2))
const isDryRun = args.has('--dry-run') || !args.has('--write')
const isWrite = args.has('--write')

const printRecordSummary = (
  records: ReturnType<typeof buildUnifiedMigrationRecords>
) => {
  const conflictCount = records.filter((record) => record.conflicts.length > 0)
  const missingLanguageCount = records.filter(
    (record) => record.missingLanguages.length > 0
  )

  console.log(`Legacy event groups: ${records.length}`)
  console.log(`Groups with conflicts: ${conflictCount.length}`)
  console.log(`Groups missing languages: ${missingLanguageCount.length}`)

  for (const record of records) {
    if (record.conflicts.length === 0 && record.missingLanguages.length === 0) {
      continue
    }

    console.log(`\n- ${record.translationKey} -> ${record.targetId}`)
    console.log(`  Source IDs: ${record.sourceEventIds.join(', ')}`)

    if (record.missingLanguages.length > 0) {
      console.log(`  Missing languages: ${record.missingLanguages.join(', ')}`)
    }

    for (const conflict of record.conflicts) {
      console.log(`  Conflict: ${conflict.field}`)
      for (const [language, value] of Object.entries(
        conflict.valuesByLanguage
      )) {
        console.log(`    ${language}: ${value}`)
      }
      console.log(
        `    Chosen: ${conflict.chosenLanguage} -> ${conflict.chosenValue}`
      )
    }
  }
}

const run = async () => {
  const { readClient, writeClient } = createMigrationClients()

  const legacyEvents =
    await readClient.fetch<LegacyEventDocument[]>(legacyEventsQuery)
  const records = buildUnifiedMigrationRecords(legacyEvents)

  printRecordSummary(records)

  if (isDryRun) {
    console.log('\nDry run completed. No documents were written.')
    return
  }

  if (!isWrite) {
    throw new Error('Either --dry-run or --write must be provided.')
  }

  if (!writeClient) {
    throw new Error('Missing SANITY_API_WRITE_TOKEN for write mode.')
  }

  for (const record of records) {
    await writeClient.createOrReplace(record.unifiedEvent)

    const unsetPaths = getUnifiedEventUnsetPaths(record.unifiedEvent)

    if (unsetPaths.length > 0) {
      await writeClient
        .patch(record.unifiedEvent._id)
        .unset(unsetPaths)
        .commit()
    }
  }

  console.log(`\nWrote ${records.length} unified event documents.`)
}

run().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error))
  process.exit(1)
})
