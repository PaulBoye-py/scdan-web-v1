import { ArrowRight } from "lucide-react"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { EventCard, NewsCard } from "@/components/cards"
import NewsletterForm from "@/components/newsletter-form"
import SpectrumMark from "@/components/spectrum-mark"
import { EmptyState, SectionHeading } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { imageAlt, urlFor } from "@/lib/sanity"
import { getOfficers, getRecentNews, getUpcomingEvents } from "@/lib/sanity-queries"
import { pageMetadata } from "@/lib/seo"
import { site } from "@/lib/site"
import { formatDate, shortName, titleCase } from "@/lib/utils"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  ...pageMetadata({
    title: `${site.shortName} | ${site.name}`,
    description: site.description,
    path: "/",
  }),
  title: { absolute: `${site.name} (${site.shortName})` },
}

const pillars = [
  {
    title: "Professional education",
    body: "Continuing education and training programmes that help dental professionals care for patients with special healthcare needs.",
    href: "/events",
    link: "See upcoming training",
  },
  {
    title: "Community outreach",
    body: "Community programmes and oral health education that bring dental care and awareness to underserved people with special needs.",
    href: "/gallery",
    link: "See our outreach",
  },
  {
    title: "Research and advocacy",
    body: "Research on special healthcare needs, and alliances with governmental and non-governmental bodies to advocate for holistic care.",
    href: "/publications",
    link: "Read our publications",
  },
]

export default async function HomePage() {
  const [news, events, officers] = await Promise.all([getRecentNews(4), getUpcomingEvents(3), getOfficers(4)])

  const lead = news.find((n: any) => n.featured) ?? news[0]
  const others = news.filter((n: any) => n !== lead).slice(0, 3)

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-line bg-paper">
        <div className="container-site grid items-center gap-12 py-14 md:py-20 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          <div>
            <p className="eyebrow flex items-center gap-2.5 text-brand">
              <SpectrumMark />
              {site.name}
            </p>
            <h1 className="mt-4 text-[2.5rem] leading-[1.08] text-ink sm:text-5xl lg:text-[3.5rem]">
              Equitable oral healthcare for people with special healthcare needs
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted md:text-xl">
              We train dental professionals, run community outreach and advocate for better policy, so that people with physical,
              sensory, intellectual and medical impairments in Nigeria get the dental care they deserve.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <a href={site.membershipFormUrl} target="_blank" rel="noopener noreferrer">
                  Become a member
                </a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/about">
                  About SCDAN <ArrowRight />
                </Link>
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
              <Image
                src="/scdan-hero.webp"
                alt="A dentist examining a smiling young patient who uses a wheelchair"
                fill
                priority
                sizes="(min-width: 1024px) 560px, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Figures */}
      <section aria-label="SCDAN in numbers" className="border-b border-line bg-mist">
        <dl className="container-site grid grid-cols-2 divide-line py-10 md:grid-cols-4 md:divide-x">
          {site.stats.map((stat) => (
            <div key={stat.label} className="flex flex-col px-2 py-3 md:px-8 md:first:pl-0">
              <dt className="text-[0.9375rem] text-muted">{stat.label}</dt>
              <dd className="order-first font-serif text-4xl font-semibold text-ink tabular-nums">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* What we do */}
      <section className="py-20 md:py-24">
        <div className="container-site">
          <SectionHeading
            eyebrow="What we do"
            title="Making special care part of everyday dental practice"
            lede="Special care dentistry serves people whose disability, medical condition or circumstances make routine dental care hard to access."
          />
          <div className="grid gap-px overflow-hidden rounded-lg border border-line bg-line md:grid-cols-3">
            {pillars.map((p) => (
              <div key={p.title} className="flex flex-col gap-4 bg-paper p-8">
                <h3 className="text-2xl text-ink">{p.title}</h3>
                <p className="flex-1 text-muted">{p.body}</p>
                <Link href={p.href} className="inline-flex items-center gap-2 font-semibold text-brand hover:underline">
                  {p.link} <ArrowRight className="size-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* News */}
      <section className="border-t border-line py-20 md:py-24">
        <div className="container-site">
          <SectionHeading
            eyebrow="News and articles"
            title="Latest from SCDAN"
            action={
              <Button asChild variant="outline">
                <Link href="/news">All news <ArrowRight /></Link>
              </Button>
            }
          />
          {!lead ? (
            <EmptyState title="No articles yet">New articles from our members will appear here.</EmptyState>
          ) : (
            <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
              <article className="group relative flex flex-col gap-5">
                <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-mist">
                  <Image
                    src={lead.featuredImage ? urlFor(lead.featuredImage).width(1200).height(750).fit("crop").auto("format").url() : "/scdan-news.webp"}
                    alt={lead.featuredImage ? imageAlt(lead.featuredImage, lead.title) : ""}
                    fill
                    sizes="(min-width: 1024px) 680px, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </div>
                <p className="text-sm text-muted">
                  {lead.category && <span className="font-semibold text-brand">{titleCase(lead.category)} · </span>}
                  <time dateTime={lead.publishedAt}>{formatDate(lead.publishedAt)}</time>
                  {lead.author?.name && <> · {lead.author.name.trim()}</>}
                </p>
                <h3 className="text-3xl leading-tight text-ink">
                  <Link href={`/news/${lead.slug?.current}`} className="after:absolute after:inset-0 group-hover:text-brand">
                    {lead.title}
                  </Link>
                </h3>
                {lead.excerpt && <p className="text-lg text-muted">{lead.excerpt}</p>}
              </article>
              {others.length > 0 && (
                <div className="flex flex-col gap-10 lg:border-l lg:border-line lg:pl-12">
                  {others.map((article: any) => (
                    <NewsCard key={article._id} article={article} sizes="(min-width: 1024px) 400px, 100vw" />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Events */}
      <section className="border-t border-line bg-mist py-20 md:py-24">
        <div className="container-site">
          <SectionHeading
            eyebrow="Events"
            title="Conferences, courses and outreach"
            action={
              <Button asChild variant="outline">
                <Link href="/events">All events <ArrowRight /></Link>
              </Button>
            }
          />
          {events.length === 0 ? (
            <div className="grid items-center gap-8 rounded-lg border border-line bg-paper p-8 md:grid-cols-[1.2fr_1fr] md:p-10">
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
              {events.map((event: any) => (
                <EventCard key={event._id} event={event} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Leadership */}
      {officers.length > 0 && (
        <section className="border-t border-line py-20 md:py-24">
          <div className="container-site">
            <SectionHeading
              eyebrow="Leadership"
              title="Led by specialists in special care dentistry"
              action={
                <Button asChild variant="outline">
                  <Link href="/about#leadership">Meet the team <ArrowRight /></Link>
                </Button>
              }
            />
            <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {officers.map((person: any) => (
                <li key={person._id} className="group flex items-center gap-4">
                  <div className="relative size-20 shrink-0 overflow-hidden rounded-full bg-mist">
                    {person.image && (
                      <Image
                        src={urlFor(person.image).width(200).height(200).fit("crop").auto("format").url()}
                        alt=""
                        fill
                        sizes="80px"
                        className="object-cover grayscale transition-[filter] duration-500 group-hover:grayscale-0"
                      />
                    )}
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-brand/45 via-brand/20 to-sky/10 opacity-0 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-100"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="eyebrow text-brand">{person.position}</p>
                    <p className="mt-1 font-serif text-lg font-semibold leading-snug text-ink">{shortName(person.name)}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Call to action */}
      <section className="bg-ink text-white">
        <div className="container-site grid gap-10 py-20 md:grid-cols-2 md:items-end">
          <div>
            <p className="eyebrow flex items-center gap-2.5 text-sky">
              <SpectrumMark />
              Get involved
            </p>
            <h2 className="mt-3 text-4xl leading-tight md:text-5xl">Join the clinicians changing access to dental care</h2>
          </div>
          <div className="flex flex-col gap-6 md:items-start">
            <p className="text-lg text-white/75">
              SCDAN brings together oral healthcare professionals, experts and caregivers committed to special care dentistry.
              Supporters can help fund treatment and outreach.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" variant="light">
                <a href={site.membershipFormUrl} target="_blank" rel="noopener noreferrer">Become a member</a>
              </Button>
              <Button asChild size="lg" variant="outlineLight">
                <Link href="/donate">Support our work</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
