import { renderOgImage } from "@/lib/og"

export const alt = "News and articles on special care dentistry | SCDAN"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function Image() {
  return renderOgImage({
    eyebrow: "News",
    title: "News and articles on special care dentistry",
  })
}
