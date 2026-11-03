import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { NewsCard } from "@/components/cards"
import PageHeader, { EmptyState } from "@/components/page-header"
import { imageAlt, urlFor } from "@/lib/sanity"
import { getAllNews } from "@/lib/sanity-queries"
import { pageMetadata } from "@/lib/seo"
import { formatDate, titleCase } from "@/lib/utils"

export const revalidate = 300

export const metadata: Metadata = pageMetadata({
  title: "News and articles",
  description:
    "News, announcements and articles on special care dentistry, oral health and disability from the Special Care Dentistry Association of Nigeria.",
  path: "/news",
})

export default async function NewsPage() {
  const articles = await getAllNews()
  const [lead, ...rest] = articles

  return (
    <>
      <PageHeader
        eyebrow="News"
        title="News and articles"
        lede="Updates from the association and articles by our members on oral health for people with special healthcare needs."
        crumbs={[{ name: "News", path: "/news" }]}
      />

      <section className="py-16 md:py-20">
        <div className="container-site">
          {!lead ? (
            <EmptyState title="No articles yet">New articles from our members will appear here.</EmptyState>
          ) : (
            <>
              <article className="group relative grid gap-8 border-b border-line pb-14 lg:grid-cols-[1.3fr_1fr] lg:items-center lg:gap-14">
                <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-mist">
                  <Image
                    src={lead.featuredImage ? urlFor(lead.featuredImage).width(1200).height(750).fit("crop").auto("format").url() : "/scdan-news.webp"}
                    alt={lead.featuredImage ? imageAlt(lead.featuredImage, lead.title) : ""}
                    fill
                    priority
                    sizes="(min-width: 1024px) 640px, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </div>
                <div className="flex flex-col gap-4">
                  <p className="text-sm text-muted">
                    {lead.category && <span className="font-semibold text-brand">{titleCase(lead.category)} · </span>}
                    <time dateTime={lead.publishedAt}>{formatDate(lead.publishedAt)}</time>
                  </p>
                  <h2 className="text-3xl leading-tight text-ink md:text-4xl">
                    <Link href={`/news/${lead.slug?.current}`} className="after:absolute after:inset-0 group-hover:text-brand">
                      {lead.title}
                    </Link>
                  </h2>
                  {lead.excerpt && <p className="text-lg text-muted">{lead.excerpt}</p>}
                  {lead.author?.name && <p className="text-[0.9375rem] font-semibold text-ink">By {lead.author.name.trim()}</p>}
                </div>
              </article>

              {rest.length > 0 && (
                <div className="grid gap-x-8 gap-y-14 pt-14 sm:grid-cols-2 lg:grid-cols-3">
                  {rest.map((article: any) => (
                    <NewsCard key={article._id} article={article} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  )
}
