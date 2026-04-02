import { groq } from 'next-sanity'
import type { LegacyCategoryDocument } from './lib/unified-category-migration'
import {
  buildUnifiedPostMigrationRecords,
  createMigrationClients,
  getUnifiedPostUnsetPaths,
  type LegacyPostDocument
} from './lib/unified-post-migration'

export {}

const legacyPostsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    _type,
    language,
    translationKey,
    title,
    slug,
    mainImage,
    publishedAt,
    featured,
    categories,
    body
  }
`

const legacyCategoriesQuery = groq`
  *[_type == "category"] | order(language asc, title asc) {
    _id,
    _type,
    language,
    title,
    slug
  }
`

const args = new Set(process.argv.slice(2))
const isDryRun = args.has('--dry-run') || !args.has('--write')
const isWrite = args.has('--write')

const printRecordSummary = (
  records: ReturnType<typeof buildUnifiedPostMigrationRecords>
) => {
  const conflictCount = records.filter((record) => record.conflicts.length > 0)
  const missingLanguageCount = records.filter(
    (record) => record.missingLanguages.length > 0
  )
  const unmappedCategoryCount = records.filter(
    (record) => record.unmappedCategoryIds.length > 0
  )

  console.log(`Legacy post groups: ${records.length}`)
  console.log(`Groups with conflicts: ${conflictCount.length}`)
  console.log(`Groups missing languages: ${missingLanguageCount.length}`)
  console.log(
    `Groups with unmapped category references: ${unmappedCategoryCount.length}`
  )

  for (const record of records) {
    if (
      record.conflicts.length === 0 &&
      record.missingLanguages.length === 0 &&
      record.unmappedCategoryIds.length === 0
    ) {
      continue
    }

    console.log(`\n- ${record.translationKey} -> ${record.targetId}`)
    console.log(`  Source IDs: ${record.sourcePostIds.join(', ')}`)

    if (record.missingLanguages.length > 0) {
      console.log(`  Missing languages: ${record.missingLanguages.join(', ')}`)
    }

    if (record.unmappedCategoryIds.length > 0) {
      console.log(
        `  Unmapped category IDs: ${record.unmappedCategoryIds.join(', ')}`
      )
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

  const [legacyPosts, legacyCategories] = await Promise.all([
    readClient.fetch<LegacyPostDocument[]>(legacyPostsQuery),
    readClient.fetch<LegacyCategoryDocument[]>(legacyCategoriesQuery)
  ])

  const records = buildUnifiedPostMigrationRecords(
    legacyPosts,
    legacyCategories
  )

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
    await writeClient.createOrReplace(record.unifiedPost)

    const unsetPaths = getUnifiedPostUnsetPaths(record.unifiedPost)

    if (unsetPaths.length > 0) {
      await writeClient.patch(record.unifiedPost._id).unset(unsetPaths).commit()
    }
  }

  console.log(`\nWrote ${records.length} unified post documents.`)
}

run().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error))
  process.exit(1)
})
