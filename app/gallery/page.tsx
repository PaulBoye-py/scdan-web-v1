import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { getGalleries } from "@/lib/sanity-queries"
import { urlFor } from "@/lib/sanity"

export const revalidate = 60
export const dynamic = 'force-dynamic'

export default async function GalleryPage() {
  let galleries = []
  try {
    galleries = await getGalleries()
  } catch (error) {
    console.log('Sanity not configured yet, using placeholder data')
  }

  const placeholderGalleries = [
    {
      _id: '1',
      title: 'Annual Conference 2024 - Lagos',
      slug: { current: 'conference-2024' },
      description: 'Highlights from our annual conference featuring international speakers and networking',
      date: new Date().toISOString(),
      images: [{ image: '/scdan-about.webp', caption: 'Conference photo 1' }],
      featured: true,
    },
    {
      _id: '2',
      title: 'Community Outreach Program',
      slug: { current: 'outreach-program' },
      description: 'Mobile dental clinic serving special needs patients in underserved communities',
      date: new Date().toISOString(),
      images: [{ image: '/placeholder.svg?height=300&width=400', caption: 'Outreach photo' }],
      featured: true,
    },
    {
      _id: '3',
      title: 'Professional Training Workshop',
      slug: { current: 'training-workshop' },
      description: 'Intensive hands-on training for dental professionals in special care techniques',
      date: new Date().toISOString(),
      images: [{ image: '/placeholder.svg?height=300&width=400', caption: 'Workshop photo' }],
      featured: false,
    },
  ]

  const displayGalleries = galleries.length > 0 ? galleries : placeholderGalleries

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary/80 text-white">
        <div className="container mx-auto max-w-6xl px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Photo Gallery</h1>
          <p className="text-xl text-primary-100 max-w-3xl mx-auto">
            Explore our collection of photos from events, outreach programs, and professional development activities
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayGalleries.map((gallery: any) => (
              <Link key={gallery._id} href={`/gallery/${gallery.slug.current}`}>
                <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer overflow-hidden h-full">
                  <div className="relative h-48 overflow-hidden bg-gray-200">
                    <Image
                      src={gallery.images?.[0]?.image ?
                        (typeof gallery.images[0].image === 'string' && gallery.images[0].image.startsWith('/')
                          ? gallery.images[0].image
                          : urlFor(gallery.images[0].image).url())
                        : '/scdan-about.webp'}
                      alt={gallery.title}
                      fill
                      className="object-cover hover:scale-105 transition-transform"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg line-clamp-2">{gallery.title}</CardTitle>
                    <CardDescription className="line-clamp-2">{gallery.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">
                        {gallery.images?.length || 0} photos
                      </span>
                      <ArrowRight className="h-4 w-4 text-primary" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
