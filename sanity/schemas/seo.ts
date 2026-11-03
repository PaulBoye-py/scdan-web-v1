import { defineField, defineType } from 'sanity'

// Optional on every document. Empty fields fall back to the title, excerpt and featured image,
// so existing content does not need to be edited.
export default defineType({
  name: 'seo',
  title: 'SEO & sharing',
  type: 'object',
  options: { collapsible: true, collapsed: true },
  fields: [
    defineField({
      name: 'title',
      title: 'Search title',
      type: 'string',
      description: 'Shown in Google results and link previews. Leave empty to use the main title.',
      validation: (rule) => rule.max(70).warning('Google usually cuts titles off after about 60 characters.'),
    }),
    defineField({
      name: 'description',
      title: 'Search description',
      type: 'text',
      rows: 3,
      description: 'One or two sentences for Google results and link previews. Leave empty to use the excerpt or description.',
      validation: (rule) => rule.max(170).warning('Google usually cuts descriptions off after about 155 characters.'),
    }),
    defineField({
      name: 'image',
      title: 'Social sharing image',
      type: 'image',
      description:
        'Replaces the automatically generated preview image on WhatsApp, LinkedIn, X and Facebook. Use 1200 × 630. Leave empty to use the generated one.',
      options: { hotspot: true },
    }),
    defineField({
      name: 'noIndex',
      title: 'Hide from search engines',
      type: 'boolean',
      description: 'The page stays live but Google is asked not to list it.',
      initialValue: false,
    }),
  ],
})
