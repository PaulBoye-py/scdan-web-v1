import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'event',
  title: 'Events',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Event Title',
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
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H1', value: 'h1' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
          ],
        },
        {
          type: 'image',
          options: { hotspot: true },
        },
      ],
    }),
    defineField({
      name: 'startDate',
      title: 'Start Date & Time',
      type: 'datetime',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'endDate',
      title: 'End Date & Time',
      type: 'datetime',
    }),
    defineField({
      name: 'time',
      title: 'Time (Display)',
      type: 'string',
      description: 'E.g., "2:00 PM - 4:00 PM"',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'eventType',
      title: 'Event Type',
      type: 'string',
      options: {
        list: [
          { title: 'Conference', value: 'conference' },
          { title: 'Workshop', value: 'workshop' },
          { title: 'Outreach', value: 'outreach' },
          { title: 'Training', value: 'training' },
          { title: 'Seminar', value: 'seminar' },
        ],
      },
    }),
    defineField({
      name: 'capacity',
      title: 'Event Capacity',
      type: 'number',
      description: 'Maximum number of attendees',
    }),
    defineField({
      name: 'registeredCount',
      title: 'Registered Count',
      type: 'number',
      description: 'Current number of registrations',
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'string',
      description: 'E.g., "₦5,000" or "Free"',
    }),
    defineField({
      name: 'image',
      title: 'Event Image',
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
      title: 'Featured Event',
      type: 'boolean',
      description: 'Show this event prominently on the homepage',
    }),
    defineField({
      name: 'registrationLink',
      title: 'Registration Link',
      type: 'url',
      description: 'External link for event registration',
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
      startDate: 'startDate',
      media: 'image',
    },
    prepare(selection) {
      const { title, startDate } = selection
      return {
        title,
        subtitle: startDate ? new Date(startDate).toLocaleDateString() : '',
        media: selection.media,
      }
    },
  },
})
