import type { Metadata } from "next"
import Link from "next/link"
import SiteFooter from "@/components/site-footer"
import SiteHeader from "@/components/site-header"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
}

// Rendered outside the (site) layout, so it brings its own header and footer.
export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="bg-mist">
        <div className="container-site py-24 md:py-32">
          <p className="eyebrow text-brand">Error 404</p>
          <h1 className="mt-3 max-w-2xl text-4xl text-ink md:text-5xl">We couldn&apos;t find that page</h1>
          <p className="mt-5 max-w-xl text-lg text-muted">
            The link may be out of date, or the page may have moved. Try one of these instead.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button asChild size="lg"><Link href="/">Go to the homepage</Link></Button>
            <Button asChild size="lg" variant="outline"><Link href="/news">Read the latest news</Link></Button>
            <Button asChild size="lg" variant="outline"><Link href="/events">See events</Link></Button>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
