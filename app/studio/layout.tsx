import type { Metadata } from "next"

export { viewport } from "next-sanity/studio"

export const metadata: Metadata = {
  title: "Content Studio",
  robots: { index: false, follow: false },
  referrer: "same-origin",
}

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return children
}
