import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import PageHeader, { EmptyState } from "@/components/page-header"
import { urlFor } from "@/lib/sanity"
import { getGalleries } from "@/lib/sanity-queries"
import { pageMetadata } from "@/lib/seo"
import { formatDate } from "@/lib/utils"

export const revalidate = 300

export const metadata: Metadata = pageMetadata({
  title: "Gallery",
  description: "Photos from SCDAN conferences, training courses and community outreach programmes across Nigeria.",
  path: "/gallery",
})

export default async function GalleryPage() {
  const galleries = await getGalleries()

  return (
    <>
      <PageHeader
        eyebrow="Gallery"
        title="Photos from our events and outreach"
        crumbs={[{ name: "Gallery", path: "/gallery" }]}
      />
      <section className="py-16 md:py-20">
        <div className="container-site">
          {galleries.length === 0 ? (
            <EmptyState title="No albums yet">Photos from our events and outreach programmes will appear here.</EmptyState>
          ) : (
            <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {galleries.map((g: any) => (
                <article key={g._id} className="group relative flex flex-col gap-4">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-mist">
                    {g.coverImage && (
                      <Image
                        src={urlFor(g.coverImage).width(800).height(600).fit("crop").auto("format").url()}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    )}
                  </div>
                  <div>
                    <p className="text-sm text-muted">
                      {g.date && <time dateTime={g.date}>{formatDate(g.date)}</time>}
                      {g.date && " · "}
                      {g.imageCount ?? 0} photos
                    </p>
                    <h2 className="mt-1 text-xl leading-snug text-ink">
                      <Link href={`/gallery/${g.slug.current}`} className="after:absolute after:inset-0 group-hover:text-brand">
                        {g.title}
                      </Link>
                    </h2>
                    {g.description && <p className="mt-2 line-clamp-2 text-muted">{g.description}</p>}
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
