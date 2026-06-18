export const dynamic = 'force-dynamic'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Images } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { getGalleries } from "@/lib/sanity-queries"
import { urlFor } from "@/lib/sanity"

export default async function GalleryPage() {
  const galleries = await getGalleries()

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section className="py-20 bg-gradient-to-r from-primary to-primary/80 text-white">
        <div className="container mx-auto max-w-6xl px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Photo Gallery</h1>
          <p className="text-xl text-primary-foreground/80 max-w-3xl mx-auto">
            Explore our collection of photos from events, outreach programs, and professional development activities
          </p>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="container mx-auto max-w-6xl px-4">
          {galleries.length === 0 ? (
            <p className="text-slate-500 text-center py-16">No galleries available yet.</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {galleries.map((gallery: any) => (
                <Link key={gallery._id} href={`/gallery/${gallery.slug.current}`}>
                  <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer overflow-hidden h-full">
                    <div className="relative h-52 overflow-hidden bg-slate-200">
                      {gallery.coverImage ? (
                        <Image
                          src={urlFor(gallery.coverImage).width(600).height(400).fit('crop').url()}
                          alt={gallery.title}
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Images className="w-12 h-12 text-slate-400" />
                        </div>
                      )}
                    </div>
                    <CardHeader>
                      <CardTitle className="text-lg line-clamp-2">{gallery.title}</CardTitle>
                      {gallery.description && (
                        <CardDescription className="line-clamp-2">{gallery.description}</CardDescription>
                      )}
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center text-sm text-slate-500">
                        <span>{gallery.imageCount ?? 0} photos</span>
                        <ArrowRight className="h-4 w-4 text-primary" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
