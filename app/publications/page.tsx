export const dynamic = 'force-dynamic'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Download, ExternalLink, Calendar, User } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { getPublications, getFeaturedPublications } from "@/lib/sanity-queries"
import { urlFor } from "@/lib/sanity"

const categoryLabels: Record<string, string> = {
  research: 'Research Paper',
  guidelines: 'Clinical Guidelines',
  article: 'Article',
  case_study: 'Case Study',
  editorial: 'Editorial',
  policy: 'Policy Brief',
}

export default async function PublicationsPage() {
  const [publications, featuredList] = await Promise.all([
    getPublications(),
    getFeaturedPublications(),
  ])

  const featured = featuredList[0] ?? publications[0] ?? null
  const rest = publications.filter((p: any) => p._id !== featured?._id)

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section className="py-20 bg-gradient-to-r from-primary to-primary/80 text-white">
        <div className="container mx-auto max-w-6xl px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Publications & Articles</h1>
          <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
            Explore our collection of research papers, clinical guidelines, and articles on special care dentistry
          </p>
        </div>
      </section>

      {publications.length === 0 ? (
        <section className="py-32">
          <p className="text-slate-500 text-center text-lg">No publications available yet.</p>
        </section>
      ) : (
        <>
          {/* Featured */}
          {featured && (
            <section className="py-20 bg-slate-50 border-b border-slate-200">
              <div className="container mx-auto max-w-6xl px-4">
                <h2 className="text-3xl font-bold text-slate-900 mb-8">Featured Publication</h2>
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
                  <div className="grid lg:grid-cols-2 gap-0">
                    <div className="relative h-64 lg:h-full min-h-[280px]">
                      <Image
                        src={featured.image ? urlFor(featured.image).width(700).height(500).fit('crop').url() : '/scdan-news.webp'}
                        alt={featured.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-8 lg:p-12 flex flex-col justify-center space-y-4">
                      {featured.category && (
                        <Badge className="w-fit bg-primary text-white">{categoryLabels[featured.category] ?? featured.category}</Badge>
                      )}
                      <h3 className="text-3xl font-bold text-slate-900">{featured.title}</h3>
                      {featured.description && <p className="text-slate-600">{featured.description}</p>}
                      <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                        {featured.author && (
                          <span className="flex items-center gap-1.5"><User className="w-4 h-4" />{featured.author.name}</span>
                        )}
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-4 h-4" />
                          {new Date(featured.publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </span>
                      </div>
                      <div className="flex gap-3 flex-wrap">
                        <Link href={`/publications/${featured.slug.current}`}>
                          <Button className="bg-primary hover:bg-primary/90">Read Full Article</Button>
                        </Link>
                        {featured.fileUrl && (
                          <a href={featured.fileUrl} download target="_blank" rel="noopener noreferrer">
                            <Button variant="outline" className="border-primary text-primary">
                              <Download className="w-4 h-4 mr-2" /> Download PDF
                            </Button>
                          </a>
                        )}
                        {featured.externalUrl && (
                          <a href={featured.externalUrl} target="_blank" rel="noopener noreferrer">
                            <Button variant="outline" className="border-primary text-primary">
                              <ExternalLink className="w-4 h-4 mr-2" /> View Online
                            </Button>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* All publications */}
          {rest.length > 0 && (
            <section className="py-20 bg-white">
              <div className="container mx-auto max-w-6xl px-4">
                <h2 className="text-4xl font-bold text-slate-900 mb-3">All Publications</h2>
                <p className="text-lg text-slate-600 mb-10">Browse our complete collection of research and articles</p>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {rest.map((pub: any) => (
                    <Link key={pub._id} href={`/publications/${pub.slug.current}`}>
                      <Card className="hover:shadow-lg transition-all h-full cursor-pointer border-slate-200 overflow-hidden">
                        <div className="relative h-48">
                          <Image
                            src={pub.image ? urlFor(pub.image).width(400).height(250).fit('crop').url() : '/scdan-news.webp'}
                            alt={pub.title}
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between mb-3">
                            {pub.category && (
                              <Badge variant="secondary" className="text-xs">{categoryLabels[pub.category] ?? pub.category}</Badge>
                            )}
                            {pub.fileUrl && <Download className="w-4 h-4 text-primary" />}
                          </div>
                          <h3 className="font-bold text-lg text-slate-900 mb-2 line-clamp-2">{pub.title}</h3>
                          {pub.description && <p className="text-sm text-slate-600 mb-4 line-clamp-2">{pub.description}</p>}
                          <div className="flex items-center justify-between text-xs text-slate-400">
                            <span>{new Date(pub.publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                            {pub.author && <span>{pub.author.name}</span>}
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          )}
        </>
      )}

      <Footer />
    </div>
  )
}
