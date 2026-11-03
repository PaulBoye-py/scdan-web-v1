import { ArrowRight } from "lucide-react"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import CopyButton from "@/components/copy-button"
import PageHeader, { SectionHeading } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { pageMetadata } from "@/lib/seo"
import { site } from "@/lib/site"
import { cn } from "@/lib/utils"

export const metadata: Metadata = pageMetadata({
  title: "Donate",
  description:
    "Support dental care for people with special healthcare needs in Nigeria. Donate to SCDAN by bank transfer to Union Bank of Nigeria.",
  path: "/donate",
})

const impact = [
  { value: "500+", label: "Patients treated" },
  { value: "₦500K+", label: "Donated so far" },
  { value: "10+", label: "Member clinicians" },
  { value: "15+", label: "Years of service" },
]

const tiers = [
  { name: "Supporter", amount: "₦20,000", impact: "Provides dental supplies for one patient." },
  { name: "Advocate", amount: "₦60,000", impact: "Treats three patients with special needs." },
  { name: "Champion", amount: "₦100,000", impact: "Sponsors professional training for clinicians." },
  { name: "Guardian", amount: "Custom", impact: "Funds a complete outreach programme. Contact us to agree an amount." },
]

const allocation = [
  { share: 60, title: "Patient care", body: "Dental treatment and care for patients with special needs." },
  { share: 25, title: "Research and training", body: "Research funding and professional development for dental practitioners." },
  { share: 15, title: "Community programmes", body: "Outreach and public oral health campaigns." },
]

export default function DonatePage() {
  return (
    <>
      <PageHeader
        eyebrow="Donate"
        title="Help fund dental care for people with special healthcare needs"
        lede="Your gift pays for treatment, supplies, training and outreach for patients who are too often left without dental care."
        crumbs={[{ name: "Donate", path: "/donate" }]}
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild size="lg">
            <a href="#bank-transfer">Donate by bank transfer</a>
          </Button>
        </div>
      </PageHeader>

      {/* Impact figures */}
      <section aria-label="Our impact" className="border-b border-line">
        <dl className="container-site grid grid-cols-2 py-10 md:grid-cols-4 md:divide-x md:divide-line">
          {impact.map((s) => (
            <div key={s.label} className="flex flex-col px-2 py-3 md:px-8 md:first:pl-0">
              <dt className="text-[0.9375rem] text-muted">{s.label}</dt>
              <dd className="order-first font-serif text-4xl font-semibold text-ink tabular-nums">{s.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Tiers */}
      <section className="py-20 md:py-24">
        <div className="container-site">
          <SectionHeading eyebrow="Giving levels" title="What your gift does" />
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {tiers.map((tier, i) => {
              const featured = i === 2
              const custom = tier.amount === "Custom"
              return (
                <li
                  key={tier.name}
                  className={cn(
                    "flex flex-col rounded-lg border p-7",
                    featured ? "border-ink bg-ink text-white" : "border-line bg-paper",
                  )}
                >
                  <p className={cn("eyebrow", featured ? "text-sky" : "text-brand")}>{tier.name}</p>
                  <p className="mt-3 font-serif text-4xl font-semibold tabular-nums">{tier.amount}</p>
                  <p className={cn("mt-3 flex-1", featured ? "text-white/75" : "text-muted")}>{tier.impact}</p>
                  <Button asChild className="mt-6" variant={featured ? "light" : custom ? "outline" : "default"}>
                    {custom ? (
                      <a href={`mailto:${site.email}?subject=Outreach%20programme%20donation`}>Contact us</a>
                    ) : (
                      <a href="#bank-transfer">Give {tier.amount}</a>
                    )}
                  </Button>
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      {/* Bank transfer */}
      <section id="bank-transfer" className="border-t border-line bg-mist py-20 md:py-24">
        <div className="container-site grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-start">
          <div>
            <p className="eyebrow text-brand">Bank transfer</p>
            <h2 className="mt-2 text-3xl text-ink md:text-4xl">Give directly to our account</h2>
            <p className="mt-4 text-lg text-muted">
              Transfer any amount to the account below. Please use your name as the transfer reference so we can thank you and
              keep accurate records.
            </p>
            <p className="mt-4 text-lg text-muted">
              To give regularly, set up a standing order with your bank using the same details. For corporate giving, email{" "}
              <a href={`mailto:${site.email}`} className="font-semibold text-brand hover:underline">{site.email}</a>.
            </p>
          </div>

          <div className="rounded-lg border border-line bg-paper p-7 md:p-9">
            <Image src="/union-bank-logo.png" alt="Union Bank of Nigeria" width={1040} height={460} className="h-14 w-auto rounded-md" />
            <dl className="mt-8 divide-y divide-line">
              <div className="py-4">
                <dt className="eyebrow text-muted">Account name</dt>
                <dd className="mt-1 text-lg font-semibold text-ink">{site.bank.accountName}</dd>
              </div>
              <div className="flex flex-wrap items-end justify-between gap-4 py-4">
                <div>
                  <dt className="eyebrow text-muted">Account number</dt>
                  <dd className="mt-1 font-serif text-4xl font-semibold tracking-wide text-ink tabular-nums select-all">
                    {site.bank.accountNumber}
                  </dd>
                </div>
                <CopyButton value={site.bank.accountNumber} label="number" />
              </div>
              <div className="py-4">
                <dt className="eyebrow text-muted">Bank</dt>
                <dd className="mt-1 text-lg font-semibold text-ink">{site.bank.bankName}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* Allocation */}
      <section className="border-t border-line py-20 md:py-24">
        <div className="container-site">
          <SectionHeading eyebrow="Where your money goes" title="How donations are used" />
          <div className="flex h-3 overflow-hidden rounded-full" aria-hidden="true">
            <div className="bg-ink" style={{ width: "60%" }} />
            <div className="bg-brand" style={{ width: "25%" }} />
            <div className="bg-sky" style={{ width: "15%" }} />
          </div>
          <dl className="mt-10 grid gap-10 md:grid-cols-3">
            {allocation.map((a, i) => (
              <div key={a.title} className="flex flex-col">
                <dt className="flex items-center gap-3 text-xl font-semibold text-ink">
                  <span className={cn("size-3 rounded-full", ["bg-ink", "bg-brand", "bg-sky"][i])} aria-hidden="true" />
                  {a.title}
                </dt>
                <dd className="order-first font-serif text-5xl font-semibold text-ink tabular-nums">{a.share}%</dd>
                <dd className="mt-2 text-muted">{a.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="bg-ink text-white">
        <div className="container-site flex flex-col gap-8 py-16 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl">Are you a dental professional?</h2>
            <p className="mt-3 text-lg text-white/75">You can also give your time and skills by joining SCDAN as a member.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg" variant="light">
              <a href={site.membershipFormUrl} target="_blank" rel="noopener noreferrer">Become a member</a>
            </Button>
            <Button asChild size="lg" variant="outlineLight">
              <Link href="/partners#partner-with-us">Partner with us <ArrowRight /></Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
