import { renderOgImage } from "@/lib/og"

export const alt = "Conferences, courses and community outreach | SCDAN"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function Image() {
  return renderOgImage({
    eyebrow: "Events",
    title: "Conferences, courses and community outreach",
  })
}
