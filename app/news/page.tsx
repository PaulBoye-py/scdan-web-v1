export const dynamic = 'force-dynamic'

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { getAllNews } from "@/lib/sanity-queries"
import { urlFor } from "@/lib/sanity"

export default async function NewsPage() {
  const articles = await getAllNews()
  const featured = articles.find((a: any) => a.featured) ?? articles[0] ?? null
  const rest = articles.filter((a: any) => a !== featured)

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary/80 text-white">
        <div className="container mx-auto max-w-6xl px-4 text-center space-y-4">
          <Badge className="bg-primary/90 text-white">News & Updates</Badge>
          <h1 className="text-4xl md:text-6xl font-bold">Latest News from SCDAN</h1>
          <p className="text-xl text-primary-foreground/80 max-w-3xl mx-auto">
            Stay informed about our latest developments, research findings, and community impact in special care dentistry
          </p>
        </div>
      </section>

      {articles.length === 0 ? (
        <section className="py-32">
          <p className="text-center text-slate-500 text-lg">No news articles published yet.</p>
        </section>
      ) : (
        <>
          {/* Featured */}
          {featured && (
            <section className="py-16 bg-white">
              <div className="container mx-auto max-w-6xl px-4">
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Featured Story</h2>
                <div className="w-20 h-1 bg-primary mb-8" />
                <Link href={`/news/${featured.slug?.current}`}>
                  <Card className="border-0 shadow-xl overflow-hidden hover:shadow-2xl transition-shadow">
                    <div className="grid lg:grid-cols-2 gap-0">
                      <div className="relative h-64 lg:h-full min-h-[280px]">
                        <Image
                          src={featured.featuredImage ? urlFor(featured.featuredImage).width(700).height(500).fit('crop').url() : '/scdan-news.webp'}
                          alt={featured.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-8 lg:p-12 flex flex-col justify-center space-y-4">
                        <div className="flex items-center gap-4 text-sm text-slate-600">
                          {featured.category && <Badge className="bg-primary/10 text-primary">{featured.category}</Badge>}
                          {featured.publishedAt && (
                            <span className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {new Date(featured.publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                            </span>
                          )}
                        </div>
                        <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 leading-tight">{featured.title}</h3>
                        {featured.excerpt && <p className="text-slate-600 text-lg leading-relaxed">{featured.excerpt}</p>}
                        <span className="inline-flex items-center gap-2 text-primary font-semibold">
                          Read Full Article <ArrowRight className="h-4 w-4" />
                        </span>
                      </div>
                    </div>
                  </Card>
                </Link>
              </div>
            </section>
          )}

          {/* Rest */}
          {rest.length > 0 && (
            <section className="py-16 bg-slate-50">
              <div className="container mx-auto max-w-6xl px-4">
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Recent News</h2>
                <div className="w-20 h-1 bg-primary mb-8" />
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {rest.map((article: any) => (
                    <Link key={article._id} href={`/news/${article.slug?.current}`}>
                      <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow overflow-hidden h-full">
                        <div className="relative h-48">
                          <Image
                            src={article.featuredImage ? urlFor(article.featuredImage).width(400).height(250).fit('crop').url() : '/scdan-news.webp'}
                            alt={article.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <CardHeader className="pb-2">
                          <div className="flex items-center gap-2 text-sm text-slate-500 mb-1">
                            {article.category && <Badge variant="outline" className="text-xs">{article.category}</Badge>}
                            {article.publishedAt && (
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {new Date(article.publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                              </span>
                            )}
                          </div>
                          <CardTitle className="text-lg line-clamp-2 leading-tight">{article.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <CardDescription className="line-clamp-3 mb-4">{article.excerpt}</CardDescription>
                          <span className="inline-flex items-center gap-1 text-sm text-primary font-semibold">
                            Read More <ArrowRight className="h-3 w-3" />
                          </span>
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
