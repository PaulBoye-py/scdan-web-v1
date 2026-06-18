import { Button } from "@/components/ui/button"
import { Download, Calendar, User, ArrowLeft, ExternalLink } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import PortableText from "@/components/portable-text"
import { getPublicationBySlug } from "@/lib/sanity-queries"
import { urlFor } from "@/lib/sanity"

export const revalidate = 60
export const dynamic = 'force-dynamic'

export default async function PublicationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  let publication = null

  try {
    publication = await getPublicationBySlug(slug)
  } catch (error) {
    console.log('Error fetching publication')
  }

  if (!publication) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="py-20 text-center">
          <h1 className="text-3xl font-bold text-slate-900">Publication not found</h1>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-br from-primary/10 to-transparent border-b border-slate-200">
        <div className="container mx-auto max-w-4xl px-4">
          <Link href="/publications">
            <Button variant="ghost" className="mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Publications
            </Button>
          </Link>
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-semibold capitalize">
                {publication.category}
              </span>
              <span className="text-sm text-slate-600">
                {new Date(publication.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
              {publication.title}
            </h1>
            <p className="text-xl text-slate-600">
              {publication.description}
            </p>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      {publication.image && (
        <section className="relative h-96 md:h-[500px] overflow-hidden">
          <Image
            src={publication.image.asset?.url || '/scdan-news.webp'}
            alt={publication.title}
            fill
            className="object-cover"
          />
        </section>
      )}

      {/* Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="grid lg:grid-cols-4 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-3">
              {publication.content && (
                <div className="prose prose-lg max-w-none mb-12">
                  <PortableText value={publication.content} />
                </div>
              )}

              {/* Keywords */}
              {publication.keywords && publication.keywords.length > 0 && (
                <div className="mt-12 pt-12 border-t border-slate-200">
                  <h3 className="text-lg font-bold text-slate-900 mb-4">Keywords</h3>
                  <div className="flex flex-wrap gap-2">
                    {publication.keywords.map((keyword: string, i: number) => (
                      <span key={i} className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm">
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Author Info */}
              {publication.author && (
                <div className="bg-slate-50 rounded-2xl p-6 mb-6">
                  <h3 className="text-sm font-bold text-slate-900 mb-4 uppercase">Author</h3>
                  {publication.author.image && (
                    <div className="mb-4">
                      <Image
                        src={publication.author.image.asset?.url || '/scdan-logo.jpg'}
                        alt={publication.author.name}
                        width={100}
                        height={100}
                        className="rounded-full mx-auto"
                      />
                    </div>
                  )}
                  <p className="font-semibold text-slate-900 text-center">{publication.author.name}</p>
                </div>
              )}

              {/* Download & Links */}
              <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 mb-6">
                <h3 className="text-sm font-bold text-slate-900 mb-4 uppercase">Access</h3>
                {publication.file?.asset?.url && (
                  <a href={publication.file.asset.url} download className="block mb-3">
                    <Button className="w-full bg-primary hover:bg-primary/90">
                      <Download className="w-4 h-4 mr-2" />
                      Download PDF
                    </Button>
                  </a>
                )}
                {publication.externalUrl && (
                  <a href={publication.externalUrl} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="w-full border-primary text-primary">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      External Link
                    </Button>
                  </a>
                )}
              </div>

              {/* Metadata */}
              <div className="bg-slate-50 rounded-2xl p-6">
                <h3 className="text-sm font-bold text-slate-900 mb-4 uppercase">Details</h3>
                <div className="space-y-4 text-sm">
                  <div>
                    <p className="text-slate-600 mb-1">Category</p>
                    <p className="font-semibold text-slate-900 capitalize">{publication.category}</p>
                  </div>
                  <div>
                    <p className="text-slate-600 mb-1 flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Published
                    </p>
                    <p className="font-semibold text-slate-900">
                      {new Date(publication.publishedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
