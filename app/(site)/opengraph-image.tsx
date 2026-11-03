import { renderOgImage } from "@/lib/og"

export const alt = "Equitable oral healthcare for people with special healthcare needs | SCDAN"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function Image() {
  return renderOgImage({
    eyebrow: "Special care dentistry",
    title: "Equitable oral healthcare for people with special healthcare needs",
    meta: "Professional education · Community outreach · Research and advocacy",
  })
}
