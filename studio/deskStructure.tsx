import {type StructureBuilder} from 'sanity/structure'

export const deskStructure = (S: StructureBuilder) =>
  S.list()
    .title('Wild')
    .items([
      S.listItem()
        .title('Main')
        .child(
          S.document().title('Main').schemaType('main').documentId('main'),
        ),
      ...S.documentTypeListItems().filter(
        listItem => !['main', 'project'].includes(listItem.getId() as string),
      ),
    ])
