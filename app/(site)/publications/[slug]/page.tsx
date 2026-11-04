import { Download, ExternalLink } from "lucide-react"
import type { Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"
import { cache } from "react"
import { publicationLabels } from "@/components/cards"
import JsonLd from "@/components/json-ld"
import { Breadcrumbs } from "@/components/page-header"
import PortableTextRenderer from "@/components/portable-text-renderer"
import { Button } from "@/components/ui/button"
import { imageAlt, imageDimensions, urlFor } from "@/lib/sanity"
import { getPublicationBySlug } from "@/lib/sanity-queries"
import { pageMetadata } from "@/lib/seo"
import { absoluteUrl, site } from "@/lib/site"
import { formatDate, shortName, titleCase } from "@/lib/utils"

export const dynamic = "force-dynamic"

const getPublication = cache((slug: string) => getPublicationBySlug(slug))

export async function generateMetadata({ params }: PageProps<"/publications/[slug]">): Promise<Metadata> {
  const { slug } = await params
  const pub = await getPublication(slug)
  if (!pub) return {}
  return pageMetadata({
    title: pub.title,
    description: pub.description,
    path: `/publications/${slug}`,
    type: "article",
    publishedTime: pub.publishedAt,
    modifiedTime: pub._updatedAt,
    authors: pub.author?.name ? [pub.author.name.trim()] : undefined,
    tags: pub.keywords,
    seo: pub.seo,
  })
}

export default async function PublicationPage({ params }: PageProps<"/publications/[slug]">) {
  const { slug } = await params
  const pub = await getPublication(slug)
  if (!pub) notFound()

  const path = `/publications/${slug}`
  const label = publicationLabels[pub.category] || titleCase(pub.category) || "Publication"
  const dims = pub.image ? imageDimensions(pub.image) : null

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": pub.category === "research" || pub.category === "case_study" ? "ScholarlyArticle" : "Article",
    headline: pub.title,
    description: pub.seo?.description || pub.description,
    datePublished: pub.publishedAt,
    dateModified: pub._updatedAt,
    url: absoluteUrl(path),
    mainEntityOfPage: absoluteUrl(path),
    image: pub.image ? [urlFor(pub.image).width(1600).height(900).fit("crop").format("jpg").url()] : undefined,
    author: pub.author?.name ? { "@type": "Person", name: pub.author.name.trim() } : { "@id": `${site.url}/#organization` },
    publisher: { "@id": `${site.url}/#organization` },
    keywords: pub.keywords?.join(", ") || undefined,
    genre: label,
    inLanguage: "en-NG",
  }

  return (
    <>
      <article>
        <header className="border-b border-line bg-mist">
          <div className="container-site py-10 md:py-14">
            <Breadcrumbs items={[{ name: "Publications", path: "/publications" }, { name: pub.title, path }]} />
            <div className="mt-10 max-w-3xl">
              <p className="text-sm text-muted">
                <span className="font-semibold text-brand">{label}</span>
                {pub.publishedAt && <> · <time dateTime={pub.publishedAt}>{formatDate(pub.publishedAt)}</time></>}
              </p>
              <h1 className="mt-4 text-4xl leading-[1.1] text-ink md:text-5xl">{pub.title}</h1>
              {pub.description && <p className="mt-6 text-xl leading-relaxed text-muted">{pub.description}</p>}
              {pub.author?.name && <p className="mt-6 font-semibold text-ink">{shortName(pub.author.name)}</p>}
            </div>
          </div>
        </header>

        <div className="container-site grid gap-12 py-12 md:py-16 lg:grid-cols-[1fr_20rem]">
          <div className="min-w-0 max-w-[42rem]">
            {pub.image && dims && (
              <Image
                src={urlFor(pub.image).width(1400).fit("max").auto("format").url()}
                alt={imageAlt(pub.image, pub.title)}
                width={dims.width}
                height={dims.height}
                priority
                sizes="(min-width: 1024px) 672px, 100vw"
                className="mb-10 h-auto w-full rounded-lg"
              />
            )}
            {pub.content?.length ? (
              <PortableTextRenderer value={pub.content} />
            ) : (
              <p className="text-muted">The full text is available from the links on this page.</p>
            )}
          </div>

          <aside className="flex h-fit flex-col gap-6 lg:sticky lg:top-28">
            {(pub.fileUrl || pub.externalUrl) && (
              <div className="rounded-lg border border-line p-6">
                <h2 className="eyebrow text-muted">Access</h2>
                <div className="mt-4 flex flex-col gap-3">
                  {pub.fileUrl && (
                    <Button asChild size="lg">
                      <a href={`${pub.fileUrl}?dl=`}><Download /> Download PDF</a>
                    </Button>
                  )}
                  {pub.externalUrl && (
                    <Button asChild variant="outline" size="lg">
                      <a href={pub.externalUrl} target="_blank" rel="noopener noreferrer"><ExternalLink /> View online</a>
                    </Button>
                  )}
                </div>
              </div>
            )}
            {pub.keywords?.length > 0 && (
              <div className="rounded-lg border border-line p-6">
                <h2 className="eyebrow text-muted">Keywords</h2>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {pub.keywords.map((k: string) => (
                    <li key={k} className="rounded-full bg-mist px-3 py-1 text-sm font-semibold text-ink">{k}</li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </article>
      <JsonLd data={jsonLd} />
    </>
  )
}
