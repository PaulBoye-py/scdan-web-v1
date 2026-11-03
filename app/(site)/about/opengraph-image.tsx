import { renderOgImage } from "@/lib/og"

export const alt = "Nigeria's professional association for special care dentistry | SCDAN"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function Image() {
  return renderOgImage({
    eyebrow: "About SCDAN",
    title: "Nigeria's professional association for special care dentistry",
    meta: "Mission, values, leadership and members",
  })
}
