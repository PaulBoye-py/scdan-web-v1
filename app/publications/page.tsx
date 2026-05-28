import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Download, ExternalLink, Calendar, User, Search } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { getPublications, getFeaturedPublications } from "@/lib/sanity-queries"
import { urlFor } from "@/lib/sanity"

export const revalidate = 60
export const dynamic = 'force-dynamic'

export default async function PublicationsPage() {
  let publications = []
  let featured = []

  try {
    publications = await getPublications()
    featured = await getFeaturedPublications()
  } catch (error) {
    console.log('Sanity not configured yet, using empty data')
  }

  const placeholderPublications = [
    {
      _id: '1',
      title: 'Guidelines for Dental Care of Patients with Intellectual Disabilities',
      slug: { current: 'guidelines-intellectual-disabilities' },
      description: 'Comprehensive clinical guidelines for providing dental care to patients with intellectual disabilities',
      publishedAt: new Date().toISOString(),
      category: 'guidelines',
      image: { asset: { url: '/scdan-news.webp' } },
      featured: true,
      author: { name: 'Prof. Folakemi Oredugba' },
      keywords: ['intellectual disability', 'dentistry', 'clinical guidelines'],
    },
  ]

  const displayPublications = publications.length > 0 ? publications : placeholderPublications
  const displayFeatured = featured.length > 0 ? featured : placeholderPublications

  const categories = ['research', 'guidelines', 'article', 'case_study', 'editorial', 'policy']

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary/80 text-white">
        <div className="container mx-auto max-w-6xl px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Publications & Articles</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Explore our collection of research papers, clinical guidelines, and articles on special care dentistry
          </p>
        </div>
      </section>

      {/* Featured Publication */}
      {displayFeatured.length > 0 && (
        <section className="py-20 bg-slate-50 border-b border-slate-200">
          <div className="container mx-auto max-w-6xl px-4">
            <h2 className="text-3xl font-bold text-slate-900 mb-12">Featured Publication</h2>
            {displayFeatured[0] && (
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
                <div className="grid lg:grid-cols-2 gap-8">
                  <div className="relative h-64 md:h-full">
                    <Image
                      src={displayFeatured[0].image?.asset?.url || '/scdan-news.webp'}
                      alt={displayFeatured[0].title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-8 flex flex-col justify-center">
                    <Badge className="w-fit mb-4 bg-primary">{displayFeatured[0].category}</Badge>
                    <h3 className="text-3xl font-bold text-slate-900 mb-4">{displayFeatured[0].title}</h3>
                    <p className="text-slate-600 mb-6">{displayFeatured[0].description}</p>
                    <div className="flex flex-wrap gap-4 mb-6 text-sm text-slate-600">
                      {displayFeatured[0].author && (
                        <span className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          {displayFeatured[0].author.name}
                        </span>
                      )}
                      <span className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {new Date(displayFeatured[0].publishedAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex gap-4">
                      <Link href={`/publications/${displayFeatured[0].slug.current}`}>
                        <Button className="bg-primary hover:bg-primary/90">
                          Read Full Article
                        </Button>
                      </Link>
                      {displayFeatured[0].file?.asset?.url && (
                        <a href={displayFeatured[0].file.asset.url} download>
                          <Button variant="outline" className="border-primary text-primary">
                            <Download className="w-4 h-4 mr-2" />
                            Download PDF
                          </Button>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* All Publications Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-3">All Publications</h2>
            <p className="text-lg text-slate-600">Browse our complete collection of research and articles</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayPublications.map((pub: any) => (
              <Link key={pub._id} href={`/publications/${pub.slug.current}`}>
                <Card className="hover:shadow-lg transition-all h-full cursor-pointer border-slate-200">
                  <div className="relative h-48 overflow-hidden rounded-t-lg">
                    <Image
                      src={pub.image?.asset?.url || '/scdan-news.webp'}
                      alt={pub.title}
                      fill
                      className="object-cover hover:scale-105 transition"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <Badge variant="secondary" className="text-xs">{pub.category}</Badge>
                      {pub.file?.asset?.url && (
                        <Download className="w-4 h-4 text-primary" />
                      )}
                    </div>
                    <h3 className="font-bold text-lg text-slate-900 mb-2 line-clamp-2">{pub.title}</h3>
                    <p className="text-sm text-slate-600 mb-4 line-clamp-2">{pub.description}</p>
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span>{new Date(pub.publishedAt).toLocaleDateString()}</span>
                      {pub.author && <span>{pub.author.name}</span>}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Browse by Category</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Card key={category} className="hover:shadow-lg transition border-slate-200 cursor-pointer">
                <CardContent className="p-8 text-center">
                  <h3 className="text-xl font-bold text-slate-900 mb-2 capitalize">
                    {category.replace('_', ' ')}
                  </h3>
                  <p className="text-sm text-slate-600 mb-4">
                    {displayPublications.filter((p: any) => p.category === category).length} publications
                  </p>
                  <Button variant="outline" className="border-primary text-primary">
                    Explore
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
