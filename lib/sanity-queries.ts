import { client } from './sanity'

const seo = `seo{ title, description, noIndex, image }`
const author = `author->{ _id, name, position, image }`

// News
const newsCard = `_id, title, slug, excerpt, publishedAt, category, featuredImage, featured, ${author}`

export async function getRecentNews(limit: number = 3) {
  return client.fetch(`*[_type == "news"] | order(publishedAt desc) [0...$limit] { ${newsCard} }`, { limit })
}

export async function getAllNews() {
  return client.fetch(`*[_type == "news"] | order(publishedAt desc) { ${newsCard} }`)
}

export async function getNewsBySlug(slug: string) {
  return client.fetch(
    `*[_type == "news" && slug.current == $slug][0] {
      ${newsCard}, _updatedAt, content, tags, ${seo},
      "related": *[_type == "news" && slug.current != $slug] | order(publishedAt desc) [0...3] { ${newsCard} }
    }`,
    { slug },
  )
}

// Events
const eventCard = `_id, title, slug, startDate, endDate, time, location, eventType, price, image, featured, registrationLink,
  "summary": pt::text(description)`

export async function getUpcomingEvents(limit: number = 50) {
  return client.fetch(
    `*[_type == "event" && coalesce(endDate, startDate) >= now()] | order(startDate asc) [0...$limit] { ${eventCard} }`,
    { limit },
  )
}

export async function getPastEvents(limit: number = 24) {
  return client.fetch(
    `*[_type == "event" && coalesce(endDate, startDate) < now()] | order(startDate desc) [0...$limit] { ${eventCard} }`,
    { limit },
  )
}

export async function getEventBySlug(slug: string) {
  return client.fetch(
    `*[_type == "event" && slug.current == $slug][0] {
      ${eventCard}, _updatedAt, description, capacity, ${seo},
      "gallery": *[_type == "gallery" && eventReference._ref == ^._id][0]{ title, slug }
    }`,
    { slug },
  )
}

// Team
export async function getAllTeamMembersSorted() {
  return client.fetch(`
    *[_type == "teamMember"] | order(defined(position) desc, order asc, name asc) {
      _id, name, position, role, image, specialty, bio,
    }
  `)
}

export async function getOfficers(limit: number = 4) {
  return client.fetch(
    `*[_type == "teamMember" && defined(position)] | order(order asc, name asc) [0...$limit] { _id, name, position, image }`,
    { limit },
  )
}

// Gallery
export async function getGalleries() {
  return client.fetch(`
    *[_type == "gallery"] | order(date desc) {
      _id, title, slug, description, date, featured,
      "imageCount": count(images),
      "coverImage": images[0].image,
    }
  `)
}

export async function getGalleryBySlug(slug: string) {
  return client.fetch(
    `*[_type == "gallery" && slug.current == $slug][0] {
      _id, _updatedAt, title, slug, description, date, images, ${seo},
      "coverImage": images[0].image,
      eventReference->{ title, slug },
    }`,
    { slug },
  )
}

// Resources
export async function getResources() {
  return client.fetch(`
    *[_type == "resource"] | order(publishedAt desc) {
      _id, title, slug, description, category, publishedAt, externalLink,
      "fileUrl": file.asset->url,
      "fileExt": file.asset->extension,
      "fileSize": file.asset->size,
      author->{ name },
    }
  `)
}

// Partners
export async function getPartners() {
  return client.fetch(`
    *[_type == "partner"] | order(featured desc, order asc, name asc) {
      _id, name, slug, logo, description, website, partnerType, featured, order,
    }
  `)
}

// Publications
const publicationCard = `_id, title, slug, description, publishedAt, category, image, featured, externalUrl,
  "fileUrl": file.asset->url, author->{ name, image }`

export async function getPublications() {
  return client.fetch(`*[_type == "publication"] | order(featured desc, publishedAt desc) { ${publicationCard} }`)
}

export async function getPublicationBySlug(slug: string) {
  return client.fetch(
    `*[_type == "publication" && slug.current == $slug][0] {
      ${publicationCard}, _updatedAt, content, keywords, ${seo},
      author->{ name, position, image },
    }`,
    { slug },
  )
}

// Slugs and update times for sitemap.xml and generateStaticParams
export async function getSitemapEntries(): Promise<
  { _type: string; slug: string; _updatedAt: string; noIndex?: boolean }[]
> {
  return client.fetch(`
    *[_type in ["news", "event", "publication", "gallery"] && defined(slug.current)] {
      _type, "slug": slug.current, _updatedAt, "noIndex": seo.noIndex
    }
  `)
}

export async function getSlugs(type: 'news' | 'event' | 'publication' | 'gallery'): Promise<string[]> {
  return client.fetch(`*[_type == $type && defined(slug.current)].slug.current`, { type })
}
