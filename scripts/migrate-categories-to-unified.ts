import { groq } from 'next-sanity'
import {
  buildUnifiedCategoryMigrationRecords,
  createMigrationClients,
  getUnifiedCategoryUnsetPaths,
  type LegacyCategoryDocument,
  type LegacyPostCategoryUsageDocument
} from './lib/unified-category-migration'

export {}

const legacyCategoriesQuery = groq`
  *[_type == "category"] | order(language asc, title asc) {
    _id,
    _type,
    language,
    title,
    slug
  }
`

const legacyPostsQuery = groq`
  *[_type == "post"]{
    _id,
    translationKey,
    categories
  }
`

const args = new Set(process.argv.slice(2))
const isDryRun = args.has('--dry-run') || !args.has('--write')
const isWrite = args.has('--write')

const printRecordSummary = (
  records: ReturnType<typeof buildUnifiedCategoryMigrationRecords>
) => {
  const missingLanguageCount = records.filter(
    (record) => record.missingLanguages.length > 0
  )
  const duplicateLanguageCount = records.filter(
    (record) => record.duplicateLanguages.length > 0
  )

  console.log(`Legacy category groups: ${records.length}`)
  console.log(`Groups with missing languages: ${missingLanguageCount.length}`)
  console.log(
    `Groups with duplicate language collisions: ${duplicateLanguageCount.length}`
  )

  for (const record of records) {
    if (
      record.missingLanguages.length === 0 &&
      record.duplicateLanguages.length === 0
    ) {
      continue
    }

    console.log(`\n- ${record.groupingKey} -> ${record.targetId}`)
    console.log(`  Source IDs: ${record.sourceCategoryIds.join(', ')}`)

    if (record.translationKeys.length > 0) {
      console.log(`  Used by posts: ${record.translationKeys.join(', ')}`)
    }

    if (record.missingLanguages.length > 0) {
      console.log(`  Missing languages: ${record.missingLanguages.join(', ')}`)
    }

    if (record.duplicateLanguages.length > 0) {
      console.log(
        `  Duplicate languages: ${record.duplicateLanguages.join(', ')}`
      )
    }
  }
}

const run = async () => {
  const { readClient, writeClient } = createMigrationClients()

  const [legacyCategories, legacyPosts] = await Promise.all([
    readClient.fetch<LegacyCategoryDocument[]>(legacyCategoriesQuery),
    readClient.fetch<LegacyPostCategoryUsageDocument[]>(legacyPostsQuery)
  ])

  const records = buildUnifiedCategoryMigrationRecords(
    legacyCategories,
    legacyPosts
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
    await writeClient.createOrReplace(record.unifiedCategory)

    const unsetPaths = getUnifiedCategoryUnsetPaths(record.unifiedCategory)

    if (unsetPaths.length > 0) {
      await writeClient
        .patch(record.unifiedCategory._id)
        .unset(unsetPaths)
        .commit()
    }
  }

  console.log(`\nWrote ${records.length} unified category documents.`)
}

run().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error))
  process.exit(1)
})
