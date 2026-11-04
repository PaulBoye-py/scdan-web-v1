import { ExternalLink } from "lucide-react"
import type { Metadata } from "next"
import Image from "next/image"
import PageHeader, { EmptyState } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { imageAlt, urlFor } from "@/lib/sanity"
import { getPartners } from "@/lib/sanity-queries"
import { pageMetadata } from "@/lib/seo"
import { site } from "@/lib/site"
import { titleCase } from "@/lib/utils"

export const dynamic = "force-dynamic"

export const metadata: Metadata = pageMetadata({
  title: "Partners",
  description:
    "The organisations that work with the Special Care Dentistry Association of Nigeria, and how your organisation can partner with us.",
  path: "/partners",
})

export default async function PartnersPage() {
  const partners = await getPartners()

  return (
    <>
      <PageHeader
        eyebrow="Partners"
        title="Working together for accessible dental care"
        lede="We collaborate with institutions, professional bodies and sponsors to advance special care dentistry in Nigeria."
        crumbs={[{ name: "Partners", path: "/partners" }]}
      />

      <section className="py-16 md:py-20">
        <div className="container-site">
          {partners.length === 0 ? (
            <EmptyState title="Partner listings are coming soon">Organisations working with SCDAN will be listed here.</EmptyState>
          ) : (
            <ul className="grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
              {partners.map((p: any) => (
                <li key={p._id} className="flex flex-col gap-4 bg-paper p-7">
                  <div className="relative h-16">
                    {p.logo?.asset && (
                      <Image
                        src={urlFor(p.logo).height(128).fit("max").auto("format").url()}
                        alt={imageAlt(p.logo, `${p.name} logo`)}
                        fill
                        sizes="240px"
                        className="object-contain object-left"
                      />
                    )}
                  </div>
                  <div className="flex-1">
                    {p.partnerType && <p className="eyebrow text-brand">{titleCase(p.partnerType)}</p>}
                    <h2 className="mt-1 text-xl text-ink">{p.name}</h2>
                    {p.description && <p className="mt-2 text-muted">{p.description}</p>}
                  </div>
                  {p.website && (
                    <a href={p.website} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-semibold text-brand hover:underline">
                      Visit website <ExternalLink className="size-4" />
                    </a>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <section id="partner-with-us" className="bg-ink text-white">
        <div className="container-site flex flex-col gap-8 py-16 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl">Partner with SCDAN</h2>
            <p className="mt-3 text-lg text-white/75">
              We welcome partnerships with organisations committed to improving oral health for people with special healthcare
              needs, from research and training to sponsorship of outreach.
            </p>
          </div>
          <Button asChild size="lg" variant="light">
            <a href={`mailto:${site.email}?subject=Partnership%20enquiry`}>Email {site.email}</a>
          </Button>
        </div>
      </section>
    </>
  )
}
