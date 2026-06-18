export const dynamic = 'force-dynamic'

import { Badge } from "@/components/ui/badge"
import Header from "@/components/header"
import Footer from "@/components/footer"
import EventsTabs from "@/components/events-tabs"
import { getUpcomingEvents, getPastEvents } from "@/lib/sanity-queries"
import { urlFor } from "@/lib/sanity"
import NewsletterForm from "@/components/newsletter-form"

function withImageUrl(event: any) {
  return {
    ...event,
    imageUrl: event.image ? urlFor(event.image).width(700).height(500).fit('crop').url() : null,
  }
}

export default async function EventsPage() {
  const [upcoming, past] = await Promise.all([
    getUpcomingEvents(),
    getPastEvents(),
  ])

  const upcomingWithImages = upcoming.map(withImageUrl)
  const pastWithImages = past.map(withImageUrl)

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary/80 text-white">
        <div className="container mx-auto max-w-6xl px-4 text-center space-y-6">
          <Badge className="bg-primary/90 text-white">Events & Programs</Badge>
          <h1 className="text-4xl md:text-6xl font-bold">SCDAN Events</h1>
          <p className="text-xl text-primary-foreground/80 max-w-3xl mx-auto">
            Join us at our conferences, workshops, and community outreach programs designed to advance special care dentistry in Nigeria
          </p>
        </div>
      </section>

      {/* Tabs */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto max-w-6xl px-4">
          <EventsTabs upcoming={upcomingWithImages} past={pastWithImages} />
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto max-w-4xl px-4 text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">Don't Miss Our Next Event</h2>
          <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
            Stay updated with our latest events and be the first to know about new opportunities for professional development
          </p>
          <NewsletterForm />
        </div>
      </section>

      <Footer />
    </div>
  )
}
