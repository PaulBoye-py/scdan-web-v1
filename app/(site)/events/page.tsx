import type { Metadata } from "next"
import { EventCard } from "@/components/cards"
import NewsletterForm from "@/components/newsletter-form"
import PageHeader, { EmptyState, SectionHeading } from "@/components/page-header"
import { getPastEvents, getUpcomingEvents } from "@/lib/sanity-queries"
import { pageMetadata } from "@/lib/seo"

export const dynamic = "force-dynamic"

export const metadata: Metadata = pageMetadata({
  title: "Events",
  description:
    "Conferences, continuing education courses, workshops and community outreach programmes in special care dentistry, run by SCDAN across Nigeria.",
  path: "/events",
})

export default async function EventsPage() {
  const [upcoming, past] = await Promise.all([getUpcomingEvents(), getPastEvents()])

  return (
    <>
      <PageHeader
        eyebrow="Events"
        title="Conferences, courses and outreach"
        lede="Professional development for clinicians and community programmes that bring dental care to people with special healthcare needs."
        crumbs={[{ name: "Events", path: "/events" }]}
      />

      <section className="py-16 md:py-20" aria-labelledby="upcoming">
        <div className="container-site">
          <SectionHeading id="upcoming" title="Upcoming events" />
          {upcoming.length === 0 ? (
            <div className="grid items-center gap-8 rounded-lg border border-line bg-mist p-8 md:grid-cols-[1.2fr_1fr] md:p-10">
              <div>
                <p className="font-serif text-2xl font-semibold text-ink">No events are scheduled right now</p>
                <p className="mt-3 text-muted">
                  Subscribe and we&apos;ll email you when registration opens for our next conference, course or outreach programme.
                </p>
              </div>
              <NewsletterForm />
            </div>
          ) : (
            <div className="grid gap-5 lg:grid-cols-2">
              {upcoming.map((event: any) => (
                <EventCard key={event._id} event={event} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="border-t border-line bg-mist py-16 md:py-20" aria-labelledby="past">
        <div className="container-site">
          <SectionHeading id="past" title="Past events" />
          {past.length === 0 ? (
            <EmptyState title="No past events listed yet">Events will be listed here after they take place.</EmptyState>
          ) : (
            <div className="grid gap-5 lg:grid-cols-2">
              {past.map((event: any) => (
                <EventCard key={event._id} event={event} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
