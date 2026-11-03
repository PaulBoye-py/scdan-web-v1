import Image from "next/image"
import Link from "next/link"
import NewsletterForm from "@/components/newsletter-form"
import SpectrumMark from "@/components/spectrum-mark"
import { site } from "@/lib/site"

const columns = [
  {
    title: "The association",
    links: [
      { name: "About SCDAN", href: "/about" },
      { name: "Leadership", href: "/about#leadership" },
      { name: "Partners", href: "/partners" },
      { name: "News", href: "/news" },
    ],
  },
  {
    title: "For clinicians",
    links: [
      { name: "Events", href: "/events" },
      { name: "Publications", href: "/publications" },
      { name: "Resources", href: "/resources" },
      { name: "Gallery", href: "/gallery" },
    ],
  },
  {
    title: "Get involved",
    links: [
      { name: "Become a member", href: site.membershipFormUrl, external: true },
      { name: "Donate", href: "/donate" },
      { name: "Partner with us", href: "/partners#partner-with-us" },
    ],
  },
]

export default function SiteFooter() {
  return (
    <footer className="bg-ink text-white">
      <div className="container-site grid gap-12 py-16 lg:grid-cols-[1.3fr_2fr]">
        <div className="max-w-sm space-y-5">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/scdan-logo.jpg" alt="" width={48} height={48} className="size-12 rounded-full" />
            <span className="font-serif text-xl font-semibold">{site.shortName}</span>
          </Link>
          <p className="text-[0.9375rem] leading-relaxed text-white/70">{site.description}</p>
          <address className="space-y-1 text-[0.9375rem] not-italic text-white/70">
            <p>{site.address}</p>
            <p>
              <a href={`mailto:${site.email}`} className="hover:text-white">{site.email}</a>
              {" · "}
              <a href={`mailto:${site.altEmail}`} className="hover:text-white">{site.altEmail}</a>
            </p>
            <p>
              <a href={site.phoneHref} className="hover:text-white">{site.phone}</a>
            </p>
          </address>
        </div>

        <div className="grid gap-10 sm:grid-cols-3">
          {columns.map((col) => (
            <div key={col.title}>
              <h2 className="eyebrow mb-4 text-white/50">{col.title}</h2>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.name}>
                    {"external" in link ? (
                      <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-[0.9375rem] text-white/80 hover:text-white">
                        {link.name}
                      </a>
                    ) : (
                      <Link href={link.href} className="text-[0.9375rem] text-white/80 hover:text-white">
                        {link.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="grid gap-6 border-t border-white/10 pt-10 sm:col-span-3 md:grid-cols-[1fr_1.4fr] md:items-start">
            <div>
              <h2 className="eyebrow mb-3 text-white/50">Newsletter</h2>
              <p className="text-[0.9375rem] text-white/70">News, events and new guidance from SCDAN, a few times a year.</p>
            </div>
            <NewsletterForm tone="dark" />
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-site flex flex-col gap-3 py-6 text-sm text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {site.name}</p>
          <SpectrumMark variant="bars" />
        </div>
      </div>
    </footer>
  )
}
