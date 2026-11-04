import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { cache } from "react"
import JsonLd from "@/components/json-ld"
import { Breadcrumbs } from "@/components/page-header"
import { imageDimensions, urlFor } from "@/lib/sanity"
import { getGalleryBySlug } from "@/lib/sanity-queries"
import { pageMetadata } from "@/lib/seo"
import { absoluteUrl } from "@/lib/site"
import { formatDate } from "@/lib/utils"

export const dynamic = "force-dynamic"

const getGallery = cache((slug: string) => getGalleryBySlug(slug))

export async function generateMetadata({ params }: PageProps<"/gallery/[slug]">): Promise<Metadata> {
  const { slug } = await params
  const gallery = await getGallery(slug)
  if (!gallery) return {}
  return pageMetadata({
    title: `${gallery.title}: photos`,
    description: gallery.description || `${gallery.images?.length ?? 0} photos from ${gallery.title}.`,
    path: `/gallery/${slug}`,
    seo: gallery.seo,
  })
}

export default async function GalleryDetailPage({ params }: PageProps<"/gallery/[slug]">) {
  const { slug } = await params
  const gallery = await getGallery(slug)
  if (!gallery) notFound()

  const path = `/gallery/${slug}`
  const images: any[] = (gallery.images ?? []).filter((item: any) => item?.image?.asset)

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: gallery.title,
    description: gallery.description || undefined,
    url: absoluteUrl(path),
    datePublished: gallery.date || undefined,
    image: images.slice(0, 20).map((item) => ({
      "@type": "ImageObject",
      contentUrl: urlFor(item.image).width(1600).auto("format").url(),
      caption: item.caption || undefined,
    })),
  }

  return (
    <>
      <section className="border-b border-line bg-mist">
        <div className="container-site py-10 md:py-14">
          <Breadcrumbs items={[{ name: "Gallery", path: "/gallery" }, { name: gallery.title, path }]} />
          <div className="mt-10 max-w-3xl">
            <p className="text-sm text-muted">
              {gallery.date && <time dateTime={gallery.date}>{formatDate(gallery.date)} · </time>}
              {images.length} photos
            </p>
            <h1 className="mt-3 text-4xl leading-[1.1] text-ink md:text-5xl">{gallery.title}</h1>
            {gallery.description && <p className="mt-5 text-xl leading-relaxed text-muted">{gallery.description}</p>}
            {gallery.eventReference?.slug?.current && (
              <p className="mt-5">
                <Link href={`/events/${gallery.eventReference.slug.current}`} className="font-semibold text-brand hover:underline">
                  About the event: {gallery.eventReference.title}
                </Link>
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container-site columns-1 gap-6 sm:columns-2 lg:columns-3">
          {images.map((item, i) => {
            const { width, height } = imageDimensions(item.image)
            return (
              <figure key={item._key ?? i} className="mb-6 break-inside-avoid">
                <a href={urlFor(item.image).width(2400).fit("max").auto("format").url()} target="_blank" rel="noopener noreferrer">
                  <Image
                    src={urlFor(item.image).width(900).fit("max").auto("format").url()}
                    alt={item.image.alt || item.caption || `${gallery.title}, photo ${i + 1}`}
                    width={width}
                    height={height}
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="h-auto w-full rounded-md"
                  />
                </a>
                {item.caption && <figcaption className="mt-2 text-sm text-muted">{item.caption}</figcaption>}
              </figure>
            )
          })}
        </div>
      </section>
      <JsonLd data={jsonLd} />
    </>
  )
}
