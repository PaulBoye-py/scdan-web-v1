import { renderOgImage } from "@/lib/og"
import { getPublicationBySlug } from "@/lib/sanity-queries"
import { formatDate, publicationLabels, shortName, titleCase } from "@/lib/utils"

export const alt = "Publication from the Special Care Dentistry Association of Nigeria"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"
export const revalidate = 300

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const pub = await getPublicationBySlug(slug)
  if (!pub) return renderOgImage({ eyebrow: "Publications", title: "Research, clinical guidelines and articles" })

  return renderOgImage({
    eyebrow: publicationLabels[pub.category] || titleCase(pub.category) || "Publication",
    title: pub.title,
    meta: [pub.author?.name && shortName(pub.author.name), formatDate(pub.publishedAt)].filter(Boolean).join(" · "),
    image: pub.image,
    override: pub.seo?.image,
  })
}
