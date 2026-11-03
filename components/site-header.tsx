"use client"

import { Menu, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { mainNav, site } from "@/lib/site"
import { cn } from "@/lib/utils"

export default function SiteHeader() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => setOpen(false), [pathname])

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`)

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/95 backdrop-blur supports-[backdrop-filter]:bg-paper/85">
      <div className="container-site flex h-[4.5rem] items-center justify-between gap-6">
        <Link href="/" className="flex min-w-0 items-center gap-3" aria-label={`${site.shortName} home`}>
          <Image src="/scdan-logo.jpg" alt="" width={44} height={44} className="size-11 shrink-0 rounded-full" priority />
          <span className="min-w-0 leading-tight">
            <span className="block font-serif text-lg font-semibold text-ink">{site.shortName}</span>
            <span className="hidden text-[0.8125rem] text-muted sm:block">{site.name}</span>
          </span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={cn(
                "rounded-md px-3 py-2 text-[0.9375rem] font-semibold transition-colors",
                isActive(item.href) ? "text-brand" : "text-ink hover:text-brand",
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Button asChild variant="ghost">
            <Link href="/donate">Donate</Link>
          </Button>
          <Button asChild>
            <a href={site.membershipFormUrl} target="_blank" rel="noopener noreferrer">
              Become a member
            </a>
          </Button>
        </div>

        <button
          type="button"
          className="-mr-2 rounded-md p-2 text-ink lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Main" className="border-t border-line bg-paper lg:hidden">
          <div className="container-site flex flex-col py-3">
            {[...mainNav, { name: "Donate", href: "/donate" }].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={cn(
                  "border-b border-line/70 py-3 text-base font-semibold last:border-0",
                  isActive(item.href) ? "text-brand" : "text-ink",
                )}
              >
                {item.name}
              </Link>
            ))}
            <Button asChild size="lg" className="mt-3">
              <a href={site.membershipFormUrl} target="_blank" rel="noopener noreferrer">
                Become a member
              </a>
            </Button>
          </div>
        </nav>
      )}
    </header>
  )
}
