import { renderOgImage } from "@/lib/og"
import { getEventBySlug } from "@/lib/sanity-queries"
import { formatDateRange, titleCase } from "@/lib/utils"

export const alt = "Event from the Special Care Dentistry Association of Nigeria"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"
export const revalidate = 300

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const event = await getEventBySlug(slug)
  if (!event) return renderOgImage({ eyebrow: "Events", title: "Conferences, courses and community outreach" })

  return renderOgImage({
    eyebrow: titleCase(event.eventType) || "Event",
    title: event.title,
    meta: [formatDateRange(event.startDate, event.endDate), event.location].filter(Boolean).join(" · "),
    image: event.image,
    override: event.seo?.image,
  })
}
