import { renderOgImage } from "@/lib/og"

export const alt = "Help fund dental care for people with special healthcare needs | SCDAN"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function Image() {
  return renderOgImage({
    eyebrow: "Donate",
    title: "Help fund dental care for people with special healthcare needs",
    meta: "Bank transfer to Union Bank of Nigeria",
  })
}
