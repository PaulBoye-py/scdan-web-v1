import { renderOgImage } from "@/lib/og"
import { getGalleryBySlug } from "@/lib/sanity-queries"
import { formatDate } from "@/lib/utils"

export const alt = "Photo album from the Special Care Dentistry Association of Nigeria"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"
export const revalidate = 300

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const gallery = await getGalleryBySlug(slug)
  if (!gallery) return renderOgImage({ eyebrow: "Gallery", title: "Photos from our events and outreach" })

  return renderOgImage({
    eyebrow: "Gallery",
    title: gallery.title,
    meta: [formatDate(gallery.date), `${gallery.images?.length ?? 0} photos`].filter(Boolean).join(" · "),
    image: gallery.coverImage,
    override: gallery.seo?.image,
  })
}
