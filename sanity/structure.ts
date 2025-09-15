import type { StructureResolver } from 'sanity/structure'
import { languages } from './lib/languages'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = S =>
  S.list()
    .title('Blog')
    .items([
      // Posts organized by language
      S.listItem()
        .title('Posts')
        .child(
          S.list()
            .title('Posts by Language')
            .items([
              ...languages.map(lang =>
                S.listItem()
                  .title(`${lang.flag} ${lang.title} Posts`)
                  .child(
                    S.documentList()
                      .title(`${lang.title} Posts`)
                      .filter(`_type == "post" && language == "${lang.id}"`)
                      .defaultOrdering([
                        { field: 'publishedAt', direction: 'desc' },
                      ])
                  )
              ),
              S.divider(),
              S.listItem().title('All Posts').child(S.documentTypeList('post')),
            ])
        ),

      // Categories organized by language
      S.listItem()
        .title('Categories')
        .child(
          S.list()
            .title('Categories by Language')
            .items([
              ...languages.map(lang =>
                S.listItem()
                  .title(`${lang.flag} ${lang.title} Categories`)
                  .child(
                    S.documentList()
                      .title(`${lang.title} Categories`)
                      .filter(`_type == "category" && language == "${lang.id}"`)
                  )
              ),
              S.divider(),
              S.listItem()
                .title('All Categories')
                .child(S.documentTypeList('category')),
            ])
        ),

      S.documentTypeListItem('author').title('Authors'),
      S.divider(),
      ...S.documentTypeListItems().filter(
        item =>
          item.getId() &&
          !['post', 'category', 'author'].includes(item.getId()!)
      ),
    ])
