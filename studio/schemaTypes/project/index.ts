import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'project',
  type: 'document',
  title: 'Project',
  fields: [
    defineField({
      name: 'title',
      title: 'Project Title',
      type: 'string',
      validation: r => r.required(),
    }),
    defineField({
      name: 'image',
      title: 'Project Image',
      type: 'image',
      validation: r => r.required(),
    }),
    defineField({
      name: 'date',
      title: 'Project Date',
      type: 'date',
      options: {
        dateFormat: 'MMM YYYY',
      },
      validation: r => r.required(),
    }),
    defineField({
      name: 'client',
      title: 'Project Client',
      type: 'object',
      fields: [
        defineField({
          name: 'clientTitle',
          title: 'Client Title',
          type: 'string',
          validation: r => r.required(),
        }),
        defineField({
          name: 'clientLink',
          title: 'Client Link',
          type: 'url',
          validation: r =>
            r.required().uri({
              scheme: ['http', 'https', 'mailto', 'tel'],
            }),
        }),
      ],
    }),
  ],
})
