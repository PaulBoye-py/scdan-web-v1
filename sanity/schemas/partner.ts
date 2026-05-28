import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'partner',
  title: 'Partners & Sponsors',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Organization Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          validation: (rule) => rule.required(),
        },
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'website',
      title: 'Website URL',
      type: 'url',
    }),
    defineField({
      name: 'partnerType',
      title: 'Partner Type',
      type: 'string',
      options: {
        list: [
          { title: 'Sponsor', value: 'sponsor' },
          { title: 'Partner', value: 'partner' },
          { title: 'Affiliate', value: 'affiliate' },
        ],
      },
    }),
    defineField({
      name: 'featured',
      title: 'Featured Partner',
      type: 'boolean',
      description: 'Display prominently on partners page',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'logo',
      partnerType: 'partnerType',
    },
    prepare(selection) {
      return {
        title: selection.title,
        subtitle: selection.partnerType,
        media: selection.media,
      }
    },
  },
})
