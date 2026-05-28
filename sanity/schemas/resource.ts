import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'resource',
  title: 'Resources & Publications',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Clinical Guideline', value: 'guideline' },
          { title: 'Research Paper', value: 'research' },
          { title: 'Publication', value: 'publication' },
          { title: 'Educational Material', value: 'educational' },
          { title: 'Policy Document', value: 'policy' },
        ],
      },
    }),
    defineField({
      name: 'file',
      title: 'Download File',
      type: 'file',
      fields: [
        {
          name: 'description',
          title: 'File Description',
          type: 'string',
        },
      ],
    }),
    defineField({
      name: 'externalLink',
      title: 'External Link',
      type: 'url',
      description: 'Alternative external link if no file upload',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'teamMember' }],
    }),
    defineField({
      name: 'downloadCount',
      title: 'Download Count',
      type: 'number',
      description: 'Automatically tracks downloads',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
    },
  },
})
