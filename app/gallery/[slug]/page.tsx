import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { getGalleryBySlug, getGalleries } from "@/lib/sanity-queries"
import { urlFor } from "@/lib/sanity"
import { notFound } from "next/navigation"

export const revalidate = 60
export const dynamic = 'force-dynamic'

export async function generateStaticParams() {
  try {
    const galleries: any[] = await getGalleries()
    return galleries.map((gallery: any) => ({ slug: gallery.slug.current }))
  } catch (error) {
    console.log('Sanity not configured, skipping static generation')
    return []
  }
}

interface GalleryPageProps {
  params: Promise<{ slug: string }>
}

export default async function GalleryDetailPage({ params }: GalleryPageProps) {
  const { slug } = await params

  let gallery = null
  try {
    gallery = await getGalleryBySlug(slug)
  } catch (error) {
    console.log('Sanity not configured')
  }

  if (!gallery) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-r from-primary to-primary/80 text-white">
        <div className="container mx-auto max-w-6xl px-4">
          <Link href="/gallery">
            <Button variant="outline" className="border-white text-white hover:bg-white/10 bg-transparent mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Gallery
            </Button>
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{gallery.title}</h1>
          {gallery.description && (
            <p className="text-xl text-primary-100 max-w-3xl">{gallery.description}</p>
          )}
        </div>
      </section>

      {/* Gallery Images */}
      <section className="py-20">
        <div className="container mx-auto max-w-6xl px-4">
          {gallery.images && gallery.images.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-8">
              {gallery.images.map((item: any, index: number) => (
                <div key={index} className="space-y-4">
                  <div className="relative aspect-square overflow-hidden rounded-lg">
                    <Image
                      src={typeof item.image === 'string' && item.image.startsWith('/')
                        ? item.image
                        : urlFor(item.image).url()}
                      alt={item.caption || `Gallery image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  {item.caption && (
                    <p className="text-gray-700 text-center italic">{item.caption}</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">No images in this gallery yet.</p>
            </div>
          )}

          {gallery.eventReference && (
            <div className="mt-16 pt-16 border-t border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Related Event</h3>
              <Link href={`/events/${gallery.eventReference.slug.current}`}>
                <Button variant="outline" className="border-primary text-primary hover:bg-primary/5">
                  View Event Details
                  <ArrowLeft className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Navigation */}
      <section className="py-12 bg-gray-50 border-t border-gray-200">
        <div className="container mx-auto max-w-6xl px-4 flex justify-between items-center">
          <Link href="/gallery">
            <Button variant="outline">← Back to Gallery</Button>
          </Link>
          <p className="text-gray-600">{gallery.images?.length || 0} photos in this gallery</p>
        </div>
      </section>

      <Footer />
    </div>
  )
}
