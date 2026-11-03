import { renderOgImage } from "@/lib/og"

export const alt = "Photos from our events and outreach | SCDAN"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function Image() {
  return renderOgImage({
    eyebrow: "Gallery",
    title: "Photos from our events and outreach",
  })
}
