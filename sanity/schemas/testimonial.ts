import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'testimonial',
  title: 'Testimonials',
  type: 'document',
  fields: [
    defineField({
      name: 'patientName',
      title: 'Patient/Client Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Testimonial Content',
      type: 'text',
      validation: (rule) => rule.required().min(50),
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'datetime',
    }),
    defineField({
      name: 'image',
      title: 'Photo (Optional)',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        },
      ],
    }),
    defineField({
      name: 'featured',
      title: 'Featured Testimonial',
      type: 'boolean',
      description: 'Display on homepage',
    }),
    defineField({
      name: 'approved',
      title: 'Approved for Display',
      type: 'boolean',
      description: 'Only approved testimonials will display publicly',
    }),
  ],
  preview: {
    select: {
      title: 'patientName',
      subtitle: 'content',
    },
    prepare(selection) {
      return {
        title: selection.title,
        subtitle: (selection.subtitle || '').substring(0, 100) + '...',
      }
    },
  },
})
