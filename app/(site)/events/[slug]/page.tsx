import { ArrowRight, CalendarDays, Clock, MapPin, Ticket, Users } from "lucide-react"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { cache } from "react"
import { DateBlock } from "@/components/cards"
import JsonLd from "@/components/json-ld"
import { Breadcrumbs } from "@/components/page-header"
import PortableTextRenderer from "@/components/portable-text-renderer"
import { Button } from "@/components/ui/button"
import { imageAlt, imageDimensions, urlFor } from "@/lib/sanity"
import { getEventBySlug } from "@/lib/sanity-queries"
import { pageMetadata } from "@/lib/seo"
import { absoluteUrl, site } from "@/lib/site"
import { formatDateRange, titleCase } from "@/lib/utils"

export const dynamic = "force-dynamic"

const getEvent = cache((slug: string) => getEventBySlug(slug))

export async function generateMetadata({ params }: PageProps<"/events/[slug]">): Promise<Metadata> {
  const { slug } = await params
  const event = await getEvent(slug)
  if (!event) return {}
  const when = formatDateRange(event.startDate, event.endDate)
  return pageMetadata({
    title: event.title,
    description: event.summary || `${titleCase(event.eventType) || "Event"} on ${when}${event.location ? ` at ${event.location}` : ""}.`,
    path: `/events/${slug}`,
    seo: event.seo,
  })
}

export default async function EventPage({ params }: PageProps<"/events/[slug]">) {
  const { slug } = await params
  const event = await getEvent(slug)
  if (!event) notFound()

  const path = `/events/${slug}`
  const isPast = new Date(event.endDate ?? event.startDate) < new Date()
  const dims = event.image ? imageDimensions(event.image) : null

  const details = [
    { icon: CalendarDays, label: "Date", value: formatDateRange(event.startDate, event.endDate) },
    event.time && { icon: Clock, label: "Time", value: event.time },
    event.location && { icon: MapPin, label: "Venue", value: event.location },
    event.price && { icon: Ticket, label: "Fee", value: event.price },
    event.capacity && { icon: Users, label: "Places", value: String(event.capacity) },
  ].filter(Boolean) as { icon: typeof CalendarDays; label: string; value: string }[]

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    description: event.summary || undefined,
    startDate: event.startDate,
    endDate: event.endDate || undefined,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: event.location ? { "@type": "Place", name: event.location, address: event.location } : undefined,
    image: event.image ? [urlFor(event.image).width(1600).height(900).fit("crop").format("jpg").url()] : undefined,
    organizer: { "@type": "Organization", name: site.name, url: site.url },
    url: absoluteUrl(path),
    ...(event.registrationLink && {
      offers: { "@type": "Offer", url: event.registrationLink, availability: "https://schema.org/InStock" },
    }),
  }

  return (
    <>
      <article>
        <header className="border-b border-line bg-mist">
          <div className="container-site py-10 md:py-14">
            <Breadcrumbs items={[{ name: "Events", path: "/events" }, { name: event.title, path }]} />
            <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-start">
              <DateBlock date={event.startDate} />
              <div className="max-w-3xl">
                <p className="eyebrow text-brand">
                  {titleCase(event.eventType) || "Event"}
                  {isPast && <span className="text-muted"> · Past event</span>}
                </p>
                <h1 className="mt-3 text-4xl leading-[1.1] text-ink md:text-5xl">{event.title}</h1>
                {event.summary && <p className="mt-5 line-clamp-3 text-xl leading-relaxed text-muted">{event.summary}</p>}
              </div>
            </div>
          </div>
        </header>

        <div className="container-site grid gap-12 py-12 md:py-16 lg:grid-cols-[1fr_22rem]">
          <div className="min-w-0">
            {event.image && dims && (
              <Image
                src={urlFor(event.image).width(1600).fit("max").auto("format").url()}
                alt={imageAlt(event.image, event.title)}
                width={dims.width}
                height={dims.height}
                priority
                sizes="(min-width: 1024px) 760px, 100vw"
                className="mb-10 h-auto w-full rounded-lg"
              />
            )}
            <div className="max-w-[42rem]">
              {event.description?.length ? (
                <PortableTextRenderer value={event.description} />
              ) : (
                <p className="text-muted">Full details for this event will be published soon.</p>
              )}
            </div>
          </div>

          <aside className="h-fit rounded-lg border border-line p-6 lg:sticky lg:top-28">
            <h2 className="eyebrow text-muted">Event details</h2>
            <dl className="mt-5 flex flex-col gap-4">
              {details.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex gap-3">
                  <Icon className="mt-0.5 size-5 shrink-0 text-brand" aria-hidden="true" />
                  <div>
                    <dt className="text-sm text-muted">{label}</dt>
                    <dd className="font-semibold text-ink">{value}</dd>
                  </div>
                </div>
              ))}
            </dl>
            {!isPast && event.registrationLink && (
              <Button asChild size="lg" className="mt-6 w-full">
                <a href={event.registrationLink} target="_blank" rel="noopener noreferrer">
                  Register <ArrowRight />
                </a>
              </Button>
            )}
            {event.gallery?.slug?.current && (
              <Button asChild variant="outline" className="mt-3 w-full">
                <Link href={`/gallery/${event.gallery.slug.current}`}>View photos</Link>
              </Button>
            )}
          </aside>
        </div>
      </article>
      <JsonLd data={jsonLd} />
    </>
  )
}
