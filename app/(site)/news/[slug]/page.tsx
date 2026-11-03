import type { Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"
import { cache } from "react"
import { NewsCard } from "@/components/cards"
import JsonLd from "@/components/json-ld"
import { Breadcrumbs } from "@/components/page-header"
import PortableTextRenderer from "@/components/portable-text-renderer"
import { imageAlt, imageDimensions, urlFor } from "@/lib/sanity"
import { getNewsBySlug, getSlugs } from "@/lib/sanity-queries"
import { pageMetadata } from "@/lib/seo"
import { absoluteUrl, site } from "@/lib/site"
import { formatDate, shortName, titleCase } from "@/lib/utils"

export const revalidate = 300

const getArticle = cache((slug: string) => getNewsBySlug(slug))

export async function generateStaticParams() {
  return (await getSlugs("news")).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps<"/news/[slug]">): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticle(slug)
  if (!article) return {}
  return pageMetadata({
    title: article.title,
    description: article.excerpt,
    path: `/news/${slug}`,
    type: "article",
    publishedTime: article.publishedAt,
    modifiedTime: article._updatedAt,
    authors: article.author?.name ? [article.author.name.trim()] : undefined,
    tags: article.tags,
    seo: article.seo,
  })
}

export default async function NewsArticlePage({ params }: PageProps<"/news/[slug]">) {
  const { slug } = await params
  const article = await getArticle(slug)
  if (!article) notFound()

  const path = `/news/${slug}`
  const author = article.author
  const image = article.featuredImage
  const dims = image ? imageDimensions(image) : null

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.seo?.description || article.excerpt,
    datePublished: article.publishedAt,
    dateModified: article._updatedAt,
    mainEntityOfPage: absoluteUrl(path),
    url: absoluteUrl(path),
    image: image ? [urlFor(image).width(1600).height(900).fit("crop").format("jpg").url()] : undefined,
    author: author?.name ? { "@type": "Person", name: author.name.trim(), jobTitle: author.position || undefined } : { "@id": `${site.url}/#organization` },
    publisher: { "@id": `${site.url}/#organization` },
    articleSection: titleCase(article.category) || undefined,
    keywords: article.tags?.join(", ") || undefined,
    inLanguage: "en-NG",
  }

  return (
    <>
      <article>
        <header className="border-b border-line bg-mist">
          <div className="container-site py-10 md:py-14">
            <Breadcrumbs items={[{ name: "News", path: "/news" }, { name: article.title, path }]} />
            <div className="mx-auto mt-10 max-w-3xl">
              <p className="text-sm text-muted">
                {article.category && <span className="font-semibold text-brand">{titleCase(article.category)} · </span>}
                <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
              </p>
              <h1 className="mt-4 text-4xl leading-[1.1] text-ink md:text-5xl">{article.title}</h1>
              {article.excerpt && <p className="mt-6 text-xl leading-relaxed text-muted">{article.excerpt}</p>}
              {author?.name && (
                <div className="mt-8 flex items-center gap-3">
                  {author.image && (
                    <Image
                      src={urlFor(author.image).width(96).height(96).fit("crop").auto("format").url()}
                      alt=""
                      width={48}
                      height={48}
                      className="size-12 rounded-full object-cover"
                    />
                  )}
                  <div className="leading-tight">
                    <p className="font-semibold text-ink">{shortName(author.name)}</p>
                    {author.position && <p className="text-sm text-muted">{author.position}</p>}
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        <div className="container-site py-12 md:py-16">
          {image && dims && (
            <figure className={dims.height > dims.width ? "mx-auto mb-12 max-w-xl" : "mx-auto mb-12 max-w-4xl"}>
              <Image
                src={urlFor(image).width(1600).fit("max").auto("format").url()}
                alt={imageAlt(image, article.title)}
                width={dims.width}
                height={dims.height}
                priority
                sizes={dims.height > dims.width ? "(min-width: 640px) 576px, 100vw" : "(min-width: 1024px) 896px, 100vw"}
                className="h-auto w-full rounded-lg"
              />
            </figure>
          )}

          <div className="mx-auto max-w-[42rem]">
            {article.content?.length ? (
              <PortableTextRenderer value={article.content} />
            ) : (
              <p className="text-muted">This article has no body text yet.</p>
            )}

            {article.tags?.length > 0 && (
              <ul className="mt-12 flex flex-wrap gap-2 border-t border-line pt-8" aria-label="Topics">
                {article.tags.map((tag: string) => (
                  <li key={tag} className="rounded-full bg-mist px-3 py-1 text-sm font-semibold text-ink">{tag}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </article>

      {article.related?.length > 0 && (
        <section className="border-t border-line bg-mist py-16 md:py-20" aria-labelledby="more-news">
          <div className="container-site">
            <h2 id="more-news" className="mb-10 text-3xl text-ink">More from SCDAN</h2>
            <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {article.related.map((item: any) => (
                <NewsCard key={item._id} article={item} />
              ))}
            </div>
          </div>
        </section>
      )}

      <JsonLd data={jsonLd} />
    </>
  )
}
