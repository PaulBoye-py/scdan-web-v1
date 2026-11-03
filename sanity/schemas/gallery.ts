import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'gallery',
  title: 'Photo Galleries',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Gallery Title',
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
    }),
    defineField({
      name: 'date',
      title: 'Gallery Date',
      type: 'datetime',
    }),
    defineField({
      name: 'eventReference',
      title: 'Related Event',
      type: 'reference',
      to: [{ type: 'event' }],
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'image',
              title: 'Image',
              type: 'image',
              options: { hotspot: true },
            },
            {
              name: 'caption',
              title: 'Caption',
              type: 'string',
            },
          ],
        },
      ],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'featured',
      title: 'Featured Gallery',
      type: 'boolean',
    }),
    defineField({
      name: 'seo',
      title: 'SEO & sharing',
      type: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'images.0.image',
    },
  },
})
