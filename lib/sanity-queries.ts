import { client } from './sanity'

const isConfigured = () => {
  return process.env.NEXT_PUBLIC_SANITY_PROJECT_ID &&
         process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== 'dev-placeholder' &&
         process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== 'YOUR_PROJECT_ID'
}

// News Queries
export async function getRecentNews(limit: number = 3) {
  return client.fetch(`
    *[_type == "news"] | order(publishedAt desc) [0...${limit}] {
      _id,
      title,
      slug,
      excerpt,
      publishedAt,
      category,
      featuredImage,
      featured,
    }
  `)
}

export async function getFeaturedNews() {
  return client.fetch(`
    *[_type == "news" && featured == true] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      publishedAt,
      category,
      featuredImage,
    }
  `)
}

export async function getAllNews(limit?: number) {
  const query = limit
    ? `*[_type == "news"] | order(publishedAt desc) [0...${limit}]`
    : `*[_type == "news"] | order(publishedAt desc)`

  return client.fetch(`
    ${query} {
      _id,
      title,
      slug,
      excerpt,
      publishedAt,
      category,
      featuredImage,
      featured,
    }
  `)
}

export async function getNewsBySlug(slug: string) {
  return client.fetch(`
    *[_type == "news" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      excerpt,
      content,
      publishedAt,
      category,
      featuredImage,
      author->{
        _id,
        name,
        position,
        image,
      },
      tags,
    }
  `, { slug })
}

export async function getNewsByCategory(category: string) {
  return client.fetch(`
    *[_type == "news" && category == $category] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      publishedAt,
      category,
      featuredImage,
    }
  `, { category })
}

// Event Queries
export async function getUpcomingEvents(limit?: number) {
  const query = limit
    ? `*[_type == "event" && startDate > now()] | order(startDate asc) [0...${limit}]`
    : `*[_type == "event" && startDate > now()] | order(startDate asc)`

  return client.fetch(`
    ${query} {
      _id,
      title,
      slug,
      description,
      startDate,
      endDate,
      time,
      location,
      eventType,
      price,
      image,
      featured,
      registrationLink,
    }
  `)
}

export async function getPastEvents(limit: number = 10) {
  return client.fetch(`
    *[_type == "event" && startDate < now()] | order(startDate desc) [0...${limit}] {
      _id,
      title,
      slug,
      description,
      startDate,
      endDate,
      time,
      location,
      eventType,
      image,
      registrationLink,
    }
  `)
}

export async function getEventBySlug(slug: string) {
  return client.fetch(`
    *[_type == "event" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      description,
      startDate,
      endDate,
      time,
      location,
      eventType,
      capacity,
      registeredCount,
      price,
      image,
      featured,
      registrationLink,
    }
  `, { slug })
}

// Team Member Queries
export async function getAllTeamMembersSorted() {
  return client.fetch(`
    *[_type == "teamMember"] | order(defined(position) desc, order asc, name asc) {
      _id,
      name,
      position,
      role,
      image,
      specialty,
      bio,
    }
  `)
}

export async function getTeamMembers(role?: string, limit?: number) {
  let query = '*[_type == "teamMember"'

  if (role) {
    query += ` && role == "${role}"`
  }

  query += '] | order(order asc, name asc)'

  if (limit) {
    query += ` [0...${limit}]`
  }

  return client.fetch(`
    ${query} {
      _id,
      name,
      position,
      role,
      bio,
      image,
      specialty,
      email,
      phone,
      order,
    }
  `)
}

export async function getTeamMemberByName(name: string) {
  return client.fetch(`
    *[_type == "teamMember" && name == $name][0] {
      _id,
      name,
      position,
      role,
      bio,
      image,
      specialty,
      email,
      phone,
      socialLinks,
    }
  `, { name })
}

// Gallery Queries
export async function getGalleries(limit?: number) {
  const query = limit
    ? `*[_type == "gallery"] | order(date desc) [0...${limit}]`
    : `*[_type == "gallery"] | order(date desc)`

  return client.fetch(`
    ${query} {
      _id,
      title,
      slug,
      description,
      date,
      featured,
      "imageCount": count(images),
      "coverImage": images[0].image,
    }
  `)
}

export async function getGalleryBySlug(slug: string) {
  return client.fetch(`
    *[_type == "gallery" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      description,
      date,
      images,
      eventReference->{
        title,
        slug,
      },
    }
  `, { slug })
}

// Resource Queries
export async function getResources(category?: string) {
  let query = '*[_type == "resource"'

  if (category) {
    query += ` && category == "${category}"`
  }

  query += '] | order(publishedAt desc)'

  return client.fetch(`
    ${query} {
      _id,
      title,
      slug,
      description,
      category,
      publishedAt,
      externalLink,
      "fileUrl": file.asset->url,
      author->{
        name,
      },
      downloadCount,
    }
  `)
}

export async function getResourceBySlug(slug: string) {
  return client.fetch(`
    *[_type == "resource" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      description,
      category,
      file,
      externalLink,
      publishedAt,
      author->{
        name,
        position,
      },
      downloadCount,
    }
  `, { slug })
}

// Partner Queries
export async function getPartners(featured?: boolean) {
  let query = '*[_type == "partner"'

  if (featured) {
    query += ' && featured == true'
  }

  query += '] | order(order asc, name asc)'

  return client.fetch(`
    ${query} {
      _id,
      name,
      slug,
      logo,
      description,
      website,
      partnerType,
      featured,
      order,
    }
  `)
}

// Testimonial Queries
export async function getTestimonials(featured?: boolean) {
  let query = '*[_type == "testimonial" && approved == true'

  if (featured) {
    query += ' && featured == true'
  }

  query += '] | order(date desc)'

  return client.fetch(`
    ${query} {
      _id,
      patientName,
      content,
      date,
      image,
      featured,
    }
  `)
}

// Publication Queries
export async function getPublications(limit?: number) {
  const query = limit
    ? `*[_type == "publication"] | order(publishedAt desc) [0...${limit}]`
    : `*[_type == "publication"] | order(publishedAt desc)`

  return client.fetch(`
    ${query} {
      _id,
      title,
      slug,
      description,
      publishedAt,
      category,
      image,
      "fileUrl": file.asset->url,
      externalUrl,
      featured,
      author->{
        name,
        image,
      },
      keywords,
    }
  `)
}

export async function getFeaturedPublications() {
  return client.fetch(`
    *[_type == "publication" && featured == true] | order(publishedAt desc) {
      _id,
      title,
      slug,
      description,
      publishedAt,
      category,
      image,
      "fileUrl": file.asset->url,
      externalUrl,
      author->{
        name,
        image,
      },
    }
  `)
}

export async function getPublicationBySlug(slug: string) {
  return client.fetch(`
    *[_type == "publication" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      description,
      content,
      publishedAt,
      category,
      image,
      file,
      externalUrl,
      featured,
      author->{
        name,
        image,
      },
      keywords,
    }
  `, { slug })
}

export async function getPublicationsByCategory(category: string) {
  return client.fetch(`
    *[_type == "publication" && category == $category] | order(publishedAt desc) {
      _id,
      title,
      slug,
      description,
      publishedAt,
      category,
      image,
      author->{
        name,
      },
    }
  `, { category })
}
