import Link from "next/link"
import JsonLd from "@/components/json-ld"
import SpectrumMark from "@/components/spectrum-mark"
import { breadcrumbJsonLd } from "@/lib/seo"

export interface Crumb {
  name: string
  path: string
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <>
      <nav aria-label="Breadcrumb" className="text-sm text-muted">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <li>
            <Link href="/" className="hover:text-brand">Home</Link>
          </li>
          {items.map((item, i) => (
            <li key={item.path} className="flex min-w-0 items-center gap-2">
              <span aria-hidden="true" className="text-muted/50">/</span>
              {i === items.length - 1 ? (
                <span aria-current="page" className="line-clamp-1 text-ink">{item.name}</span>
              ) : (
                <Link href={item.path} className="hover:text-brand">{item.name}</Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <JsonLd data={breadcrumbJsonLd(items)} />
    </>
  )
}

export default function PageHeader({
  eyebrow,
  title,
  lede,
  crumbs,
  children,
}: {
  eyebrow?: string
  title: string
  lede?: string
  crumbs: Crumb[]
  children?: React.ReactNode
}) {
  return (
    <section className="border-b border-line bg-mist">
      <div className="container-site py-12 md:py-16">
        <Breadcrumbs items={crumbs} />
        <div className="mt-8 max-w-3xl">
          {eyebrow && (
            <p className="eyebrow flex items-center gap-2.5 text-brand">
              <SpectrumMark />
              {eyebrow}
            </p>
          )}
          <h1 className="mt-3 text-4xl leading-[1.1] text-ink md:text-5xl">{title}</h1>
          {lede && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">{lede}</p>}
          {children}
        </div>
      </div>
    </section>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  lede,
  action,
  id,
}: {
  eyebrow?: string
  title: string
  lede?: string
  action?: React.ReactNode
  id?: string
}) {
  return (
    <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        {eyebrow && (
          <p className="eyebrow flex items-center gap-2.5 text-brand">
            <SpectrumMark />
            {eyebrow}
          </p>
        )}
        <h2 id={id} className="mt-2 text-3xl leading-tight text-ink md:text-4xl">{title}</h2>
        {lede && <p className="mt-3 text-lg text-muted">{lede}</p>}
      </div>
      {action}
    </div>
  )
}

export function EmptyState({ title, children }: { title: string; children?: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-dashed border-line bg-paper px-6 py-14 text-center">
      <p className="font-serif text-xl font-semibold text-ink">{title}</p>
      {children && <div className="mx-auto mt-3 max-w-md text-muted">{children}</div>}
    </div>
  )
}
