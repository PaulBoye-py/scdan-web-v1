export const site = {
  name: "Special Care Dentistry Association of Nigeria",
  shortName: "SCDAN",
  url: "https://scdan.org",
  description:
    "SCDAN advances oral healthcare for people with physical, sensory, intellectual and medical impairments in Nigeria through professional education, community outreach, research and advocacy.",
  locale: "en_NG",
  membershipFormUrl: "https://forms.gle/XGKQekvQTo1AwPZd7",
  email: "info@scdan.org",
  altEmail: "scdan.ng@gmail.com",
  phone: "+234 806 796 2409",
  phoneHref: "tel:+2348067962409",
  address: "Lagos University Teaching Hospital, Idi-Araba, Lagos, Nigeria",
  bank: {
    accountName: "Special Care Dentistry Association of Nigeria",
    accountNumber: "0167563373",
    bankName: "Union Bank of Nigeria",
  },
  stats: [
    { value: "15+", label: "Years of service" },
    { value: "10+", label: "Member clinicians" },
    { value: "500+", label: "Patients served" },
    { value: "10+", label: "Events each year" },
  ],
} as const

export const mainNav = [
  { name: "About", href: "/about" },
  { name: "News", href: "/news" },
  { name: "Events", href: "/events" },
  { name: "Publications", href: "/publications" },
  { name: "Resources", href: "/resources" },
  { name: "Gallery", href: "/gallery" },
] as const

export function absoluteUrl(path = "/") {
  return new URL(path, site.url).toString()
}
