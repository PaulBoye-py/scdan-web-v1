import { Download, ExternalLink } from "lucide-react"
import type { Metadata } from "next"
import PageHeader, { EmptyState } from "@/components/page-header"
import { getResources } from "@/lib/sanity-queries"
import { pageMetadata } from "@/lib/seo"
import { formatDate, titleCase } from "@/lib/utils"

export const revalidate = 300

export const metadata: Metadata = pageMetadata({
  title: "Resources",
  description:
    "Clinical guidelines, research papers, policy documents and educational materials on special care dentistry for dental professionals and caregivers.",
  path: "/resources",
})

const categoryLabels: Record<string, string> = {
  guideline: "Clinical guideline",
  research: "Research paper",
  publication: "Publication",
  educational: "Educational material",
  policy: "Policy document",
}

function fileMeta(ext?: string, size?: number) {
  const parts = []
  if (ext) parts.push(ext.toUpperCase())
  if (size) parts.push(size > 1_000_000 ? `${(size / 1_000_000).toFixed(1)} MB` : `${Math.max(1, Math.round(size / 1000))} KB`)
  return parts.join(", ")
}

export default async function ResourcesPage() {
  const resources = await getResources()

  return (
    <>
      <PageHeader
        eyebrow="Resources"
        title="Guidelines and educational materials"
        lede="Reference material for dental professionals, students and caregivers supporting people with special healthcare needs."
        crumbs={[{ name: "Resources", path: "/resources" }]}
      />
      <section className="py-12 md:py-16">
        <div className="container-site">
          {resources.length === 0 ? (
            <EmptyState title="No resources yet">Guidelines and educational materials will be listed here as they are added.</EmptyState>
          ) : (
            <ul className="border-t border-line">
              {resources.map((r: any) => {
                const href = r.fileUrl ? `${r.fileUrl}?dl=` : r.externalLink
                return (
                  <li key={r._id} className="grid gap-3 border-b border-line py-7 md:grid-cols-[12rem_1fr_auto] md:items-start md:gap-8">
                    <div className="text-sm text-muted">
                      <p className="font-semibold text-brand">{categoryLabels[r.category] || titleCase(r.category) || "Resource"}</p>
                      {r.publishedAt && <time dateTime={r.publishedAt}>{formatDate(r.publishedAt)}</time>}
                    </div>
                    <div className="min-w-0">
                      <h2 className="text-xl leading-snug text-ink">{r.title}</h2>
                      {r.description && <p className="mt-2 text-muted">{r.description}</p>}
                      {r.author?.name && <p className="mt-2 text-sm text-muted">{r.author.name.trim()}</p>}
                    </div>
                    {href && (
                      <a
                        href={href}
                        {...(!r.fileUrl && { target: "_blank", rel: "noopener noreferrer" })}
                        className="inline-flex items-center gap-2 whitespace-nowrap font-semibold text-brand hover:underline"
                      >
                        {r.fileUrl ? <Download className="size-4" /> : <ExternalLink className="size-4" />}
                        {r.fileUrl ? "Download" : "Open"}
                        {r.fileUrl && fileMeta(r.fileExt, r.fileSize) && (
                          <span className="font-normal text-muted">({fileMeta(r.fileExt, r.fileSize)})</span>
                        )}
                        <span className="sr-only">: {r.title}</span>
                      </a>
                    )}
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </section>
    </>
  )
}
