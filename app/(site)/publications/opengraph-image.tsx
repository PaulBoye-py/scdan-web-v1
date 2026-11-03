import { renderOgImage } from "@/lib/og"

export const alt = "Research, clinical guidelines and articles | SCDAN"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function Image() {
  return renderOgImage({
    eyebrow: "Publications",
    title: "Research, clinical guidelines and articles",
  })
}
