import type { Metadata } from "next"
import { site, absoluteUrl } from "./site"

export interface SanitySeo {
  title?: string
  description?: string
  noIndex?: boolean
}

interface PageMetadataInput {
  title: string
  description?: string
  path: string
  type?: "website" | "article"
  publishedTime?: string
  modifiedTime?: string
  authors?: string[]
  tags?: string[]
  seo?: SanitySeo | null
}

// OG images come from the opengraph-image file next to each route, so they are not set here.
export function pageMetadata({
  title,
  description,
  path,
  type = "website",
  publishedTime,
  modifiedTime,
  authors,
  tags,
  seo,
}: PageMetadataInput): Metadata {
  const metaTitle = seo?.title || title
  const metaDescription = truncate(seo?.description || description || site.description, 160)

  return {
    title: metaTitle,
    description: metaDescription,
    alternates: { canonical: path },
    robots: seo?.noIndex ? { index: false, follow: true } : undefined,
    openGraph: {
      type,
      url: path,
      title: metaTitle,
      description: metaDescription,
      siteName: site.name,
      locale: site.locale,
      ...(type === "article" && { publishedTime, modifiedTime, authors, tags }),
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
    },
  }
}

export function truncate(text: string, max: number) {
  const clean = text.replace(/\s+/g, " ").trim()
  if (clean.length <= max) return clean
  return clean.slice(0, clean.lastIndexOf(" ", max - 1)).replace(/[,.;:]$/, "") + "…"
}

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "NGO",
  "@id": `${site.url}/#organization`,
  name: site.name,
  alternateName: site.shortName,
  url: site.url,
  logo: absoluteUrl("/scdan-logo.jpg"),
  description: site.description,
  email: site.email,
  telephone: site.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Lagos University Teaching Hospital, Idi-Araba",
    addressLocality: "Lagos",
    addressCountry: "NG",
  },
  areaServed: { "@type": "Country", name: "Nigeria" },
  knowsAbout: ["Special care dentistry", "Oral health", "Disability and oral health", "Dental public health"],
}

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${site.url}/#website`,
  url: site.url,
  name: site.name,
  alternateName: site.shortName,
  publisher: { "@id": `${site.url}/#organization` },
  inLanguage: "en-NG",
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...items].map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}
