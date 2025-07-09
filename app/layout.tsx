import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SCDAN - Special Care Dentistry Association of Nigeria",
  description:
    "Advancing dental care for individuals with special healthcare needs through education, advocacy, and professional development.",
  keywords: "special care dentistry, Nigeria, dental care, special needs, healthcare, SCDAN",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
