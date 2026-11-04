import type { Metadata } from "next"
import { PublicationRow } from "@/components/cards"
import PageHeader, { EmptyState } from "@/components/page-header"
import { getPublications } from "@/lib/sanity-queries"
import { pageMetadata } from "@/lib/seo"

export const dynamic = "force-dynamic"

export const metadata: Metadata = pageMetadata({
  title: "Publications",
  description:
    "Research papers, clinical guidelines, case studies and policy briefs on special care dentistry from SCDAN and its members.",
  path: "/publications",
})

export default async function PublicationsPage() {
  const publications = await getPublications()

  return (
    <>
      <PageHeader
        eyebrow="Publications"
        title="Research, guidelines and articles"
        lede="Work by SCDAN and its members on oral health for people with special healthcare needs."
        crumbs={[{ name: "Publications", path: "/publications" }]}
      />
      <section className="py-12 md:py-16">
        <div className="container-site">
          {publications.length === 0 ? (
            <EmptyState title="No publications yet">
              Research papers, clinical guidelines and policy briefs will be listed here as they are published.
            </EmptyState>
          ) : (
            <div className="border-t border-line">
              {publications.map((p: any) => (
                <PublicationRow key={p._id} publication={p} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
