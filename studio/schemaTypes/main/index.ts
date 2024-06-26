import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'main',
  type: 'document',
  title: 'Main',
  fields: [
    defineField({
      name: 'title',
      title: 'Website Title',
      type: 'string',
      validation: r => r.required(),
    }),
    defineField({
      name: 'projects',
      title: 'Projects',
      type: 'array',
      of: [{type: 'reference', to: {type: 'project'}}],
    }),
  ],
})
