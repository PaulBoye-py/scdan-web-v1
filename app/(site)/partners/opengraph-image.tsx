import { renderOgImage } from "@/lib/og"

export const alt = "The organisations working with SCDAN | SCDAN"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function Image() {
  return renderOgImage({
    eyebrow: "Partners",
    title: "The organisations working with SCDAN",
  })
}
