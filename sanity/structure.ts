import { CalendarIcon, DocumentTextIcon, TagIcon } from '@sanity/icons'
import type { StructureResolver } from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Blog')
    .items([
      S.listItem()
        .title('Posts')
        .icon(DocumentTextIcon)
        .child(
          S.documentTypeList('unifiedPost').defaultOrdering([
            { field: 'publishedAt', direction: 'desc' }
          ])
        ),

      S.listItem()
        .title('Categories')
        .icon(TagIcon)
        .child(
          S.documentTypeList('unifiedCategory').defaultOrdering([
            { field: '_updatedAt', direction: 'desc' }
          ])
        ),

      S.listItem()
        .title('Events')
        .icon(CalendarIcon)
        .child(
          S.documentTypeList('unifiedEvent').defaultOrdering([
            { field: 'dateTime', direction: 'asc' }
          ])
        ),

      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) =>
          item.getId() &&
          ![
            'post',
            'category',
            'event',
            'unifiedEvent',
            'unifiedPost',
            'unifiedCategory'
          ].includes(item.getId()!)
      )
    ])
