import { renderOgImage } from "@/lib/og"

export const alt = "Clinical guidelines and educational materials | SCDAN"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function Image() {
  return renderOgImage({
    eyebrow: "Resources",
    title: "Clinical guidelines and educational materials",
  })
}
