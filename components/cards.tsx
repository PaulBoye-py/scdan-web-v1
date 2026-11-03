import { ArrowUpRight, CalendarDays, MapPin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { imageAlt, urlFor } from "@/lib/sanity"
import { formatDate, formatDateRange, publicationLabels, titleCase } from "@/lib/utils"

export { publicationLabels }

function CardImage({ image, alt, sizes }: { image?: any; alt: string; sizes: string }) {
  return (
    <div className="relative aspect-[3/2] overflow-hidden rounded-md bg-mist">
      <Image
        src={image ? urlFor(image).width(900).height(600).fit("crop").auto("format").url() : "/scdan-news.webp"}
        alt={image ? imageAlt(image, alt) : ""}
        fill
        sizes={sizes}
        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
      />
    </div>
  )
}

export function NewsCard({ article, sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" }: { article: any; sizes?: string }) {
  return (
    <article className="group relative flex flex-col gap-4">
      <CardImage image={article.featuredImage} alt={article.title} sizes={sizes} />
      <div className="flex flex-col gap-2">
        <p className="text-sm text-muted">
          {article.category && <span className="font-semibold text-brand">{titleCase(article.category)}</span>}
          {article.category && article.publishedAt && <span aria-hidden="true"> · </span>}
          {article.publishedAt && <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>}
        </p>
        <h3 className="text-xl leading-snug text-ink">
          <Link href={`/news/${article.slug?.current}`} className="after:absolute after:inset-0 group-hover:text-brand">
            {article.title}
          </Link>
        </h3>
        {article.excerpt && <p className="line-clamp-3 text-muted">{article.excerpt}</p>}
      </div>
    </article>
  )
}

export function EventCard({ event }: { event: any }) {
  return (
    <article className="group relative grid gap-5 rounded-lg border border-line bg-paper p-6 transition-colors hover:border-brand/40 sm:grid-cols-[5.5rem_1fr]">
      <DateBlock date={event.startDate} />
      <div className="flex min-w-0 flex-col gap-2">
        {event.eventType && <p className="eyebrow text-brand">{titleCase(event.eventType)}</p>}
        <h3 className="text-xl leading-snug text-ink">
          <Link href={`/events/${event.slug?.current}`} className="after:absolute after:inset-0 group-hover:text-brand">
            {event.title}
          </Link>
        </h3>
        <ul className="flex flex-col gap-1 text-[0.9375rem] text-muted">
          <li className="flex items-center gap-2">
            <CalendarDays className="size-4 shrink-0 text-brand" aria-hidden="true" />
            {formatDateRange(event.startDate, event.endDate)}
            {event.time && ` · ${event.time}`}
          </li>
          {event.location && (
            <li className="flex items-center gap-2">
              <MapPin className="size-4 shrink-0 text-brand" aria-hidden="true" />
              <span className="line-clamp-1">{event.location}</span>
            </li>
          )}
        </ul>
        {event.summary && <p className="line-clamp-2 text-muted">{event.summary}</p>}
      </div>
    </article>
  )
}

export function DateBlock({ date }: { date: string }) {
  const d = new Date(date)
  const opts = { timeZone: "Africa/Lagos" } as const
  return (
    <time
      dateTime={date}
      className="flex h-fit w-[5.5rem] flex-col items-center rounded-md border border-line bg-mist py-3 text-center"
    >
      <span className="eyebrow text-brand">{d.toLocaleDateString("en-GB", { ...opts, month: "short" })}</span>
      <span className="font-serif text-3xl font-semibold leading-none text-ink">{d.toLocaleDateString("en-GB", { ...opts, day: "numeric" })}</span>
      <span className="mt-1 text-xs text-muted">{d.toLocaleDateString("en-GB", { ...opts, year: "numeric" })}</span>
    </time>
  )
}

export function PublicationRow({ publication }: { publication: any }) {
  return (
    <article className="group relative grid gap-2 border-b border-line py-7 md:grid-cols-[12rem_1fr_auto] md:gap-8">
      <div className="text-sm text-muted">
        <p className="font-semibold text-brand">{publicationLabels[publication.category] || titleCase(publication.category) || "Publication"}</p>
        {publication.publishedAt && <time dateTime={publication.publishedAt}>{formatDate(publication.publishedAt)}</time>}
      </div>
      <div className="min-w-0">
        <h3 className="text-xl leading-snug text-ink">
          <Link href={`/publications/${publication.slug?.current}`} className="after:absolute after:inset-0 group-hover:text-brand">
            {publication.title}
          </Link>
        </h3>
        {publication.author?.name && <p className="mt-1 text-[0.9375rem] text-muted">{publication.author.name}</p>}
        {publication.description && <p className="mt-2 line-clamp-2 text-muted">{publication.description}</p>}
      </div>
      <ArrowUpRight className="hidden size-5 text-muted transition-colors group-hover:text-brand md:block" aria-hidden="true" />
    </article>
  )
}
