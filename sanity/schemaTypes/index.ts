import { type SchemaTypeDefinition } from 'sanity'

import { blockContentType } from './blockContentType'
import { categoryType } from './categoryType'
import { postType } from './postType'
import { eventType } from './event'
import { localizedBlockContentType } from './objects/localizedBlockContent'
import { localizedSlugType } from './objects/localizedSlug'
import { localizedStringType } from './objects/localizedString'
import { unifiedCategoryType } from './unifiedCategoryType'
import { unifiedEventType } from './unifiedEventType'
import { unifiedPostType } from './unifiedPostType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContentType,
    localizedStringType,
    localizedSlugType,
    localizedBlockContentType,
    categoryType,
    postType,
    eventType,
    unifiedEventType,
    unifiedCategoryType,
    unifiedPostType
  ]
}
