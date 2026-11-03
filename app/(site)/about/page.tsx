import type { Metadata } from "next"
import Image from "next/image"
import MemberCard from "@/components/member-card"
import PageHeader, { SectionHeading } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { urlFor } from "@/lib/sanity"
import { getAllTeamMembersSorted } from "@/lib/sanity-queries"
import { pageMetadata } from "@/lib/seo"
import { site } from "@/lib/site"
import { shortName } from "@/lib/utils"

export const revalidate = 300

export const metadata: Metadata = pageMetadata({
  title: "About us",
  description:
    "SCDAN is Nigeria's professional association for special care dentistry. Read our mission, vision and values, and meet our leadership and members.",
  path: "/about",
})

const mission = [
  "Integrate special care dentistry into standard dental practice, so people with special healthcare needs can get care in more places.",
  "Run oral health education programmes that raise awareness of special healthcare needs.",
  "Create a forum for communication between oral healthcare professionals, experts and caregivers.",
  "Encourage research on special healthcare needs.",
  "Build alliances with national and international governmental and non-governmental bodies to advocate for holistic healthcare.",
]

const values = [
  {
    title: "Inclusivity and equity",
    body: "Quality oral healthcare is a fundamental human right. We work for equal access regardless of physical, sensory or intellectual impairment.",
  },
  {
    title: "Compassion and dignity",
    body: "We treat patients with empathy, understanding and respect, and value their autonomy, dignity and confidentiality.",
  },
  {
    title: "Excellence and lifelong learning",
    body: "We hold the highest standards of clinical care, professional development and training in special care dentistry.",
  },
  {
    title: "Advocacy and empowerment",
    body: "We work to remove barriers of communication, cost and awareness, and advocate for policies that integrate oral health into healthcare.",
  },
  {
    title: "Holistic care",
    body: "We collaborate with allied health professionals and caregivers, recognising the effect of oral health on overall quality of life.",
  },
]

export default async function AboutPage() {
  const people = await getAllTeamMembersSorted()
  const toCard = (m: any) => ({
    ...m,
    displayName: shortName(m.name),
    imageUrl: m.image ? urlFor(m.image).width(540).height(675).fit("crop").auto("format").url() : undefined,
  })
  const officers = people.filter((m: any) => m.position).map(toCard)
  const members = people.filter((m: any) => !m.position).map(toCard)

  return (
    <>
      <PageHeader
        eyebrow="About SCDAN"
        title="Nigeria's professional association for special care dentistry"
        lede={`The ${site.name} works to improve oral health for people with special healthcare needs through professional excellence, advocacy and community empowerment.`}
        crumbs={[{ name: "About", path: "/about" }]}
      />

      {/* Vision and mission */}
      <section className="py-20 md:py-24">
        <div className="container-site grid gap-14 lg:grid-cols-[1fr_1.15fr]">
          <div>
            <p className="eyebrow text-brand">Our vision</p>
            <p className="mt-4 font-serif text-[1.75rem] leading-snug text-ink md:text-3xl">
              To improve the oral health and quality of life of people with physical, sensory, intellectual or medical impairments,
              and to advocate for equitable oral healthcare outcomes for people with special healthcare needs.
            </p>
            <div className="relative mt-10 aspect-[3/2] overflow-hidden rounded-lg">
              <Image
                src="/scdan-about.webp"
                alt="Dental professionals in white coats"
                fill
                sizes="(min-width: 1024px) 520px, 100vw"
                className="object-cover"
              />
            </div>
          </div>
          <div>
            <p className="eyebrow text-brand">Our mission</p>
            <h2 className="mt-3 text-3xl text-ink">What we set out to do</h2>
            <ol className="mt-8 divide-y divide-line border-y border-line">
              {mission.map((item, i) => (
                <li key={i} className="grid grid-cols-[2.5rem_1fr] gap-4 py-5">
                  <span className="font-serif text-xl font-semibold text-brand tabular-nums">{i + 1}</span>
                  <span className="text-lg text-ink/90">{item}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="border-t border-line bg-mist py-20 md:py-24">
        <div className="container-site">
          <SectionHeading eyebrow="Our values" title="The principles behind our work" />
          <dl className="grid gap-x-12 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
            {values.map((v) => (
              <div key={v.title} className="border-t-2 border-ink pt-5">
                <dt className="font-serif text-xl font-semibold text-ink">{v.title}</dt>
                <dd className="mt-2 text-muted">{v.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Leadership */}
      {officers.length > 0 && (
        <section className="border-t border-line py-20 md:py-24">
          <div className="container-site">
            <SectionHeading id="leadership" eyebrow="Leadership" title="Executive officers" />
            <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
              {officers.map((m: any) => (
                <MemberCard key={m._id} member={m} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Members */}
      {members.length > 0 && (
        <section className="border-t border-line py-20 md:py-24">
          <div className="container-site">
            <SectionHeading
              eyebrow="Members"
              title="Our members"
              lede="Dental professionals committed to special care dentistry across Nigeria."
            />
            <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
              {members.map((m: any) => (
                <MemberCard key={m._id} member={m} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Join */}
      <section className="bg-ink text-white">
        <div className="container-site flex flex-col gap-8 py-16 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl">Join SCDAN</h2>
            <p className="mt-3 text-lg text-white/75">
              Connect with colleagues, take part in training and outreach, and help shape special care dentistry in Nigeria.
            </p>
          </div>
          <Button asChild size="lg" variant="light">
            <a href={site.membershipFormUrl} target="_blank" rel="noopener noreferrer">Apply for membership</a>
          </Button>
        </div>
      </section>
    </>
  )
}
