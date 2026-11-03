import { renderOgImage } from "@/lib/og"
import { getNewsBySlug } from "@/lib/sanity-queries"
import { formatDate, shortName, titleCase } from "@/lib/utils"

export const alt = "Article from the Special Care Dentistry Association of Nigeria"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"
export const revalidate = 300

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = await getNewsBySlug(slug)
  if (!article) return renderOgImage({ eyebrow: "News", title: "News and articles on special care dentistry" })

  return renderOgImage({
    eyebrow: ["News", titleCase(article.category)].filter(Boolean).join(" · "),
    title: article.title,
    meta: [formatDate(article.publishedAt), article.author?.name && shortName(article.author.name)].filter(Boolean).join(" · "),
    image: article.featuredImage,
    override: article.seo?.image,
  })
}
