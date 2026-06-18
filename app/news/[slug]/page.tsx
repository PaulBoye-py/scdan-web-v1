export const dynamic = 'force-dynamic'

import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Calendar, ArrowLeft, User } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { getNewsBySlug } from "@/lib/sanity-queries"
import { urlFor } from "@/lib/sanity"
import PortableTextRenderer from "@/components/portable-text-renderer"

export default async function NewsArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = await getNewsBySlug(slug)

  if (!article) notFound()

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <article className="py-16">
        <div className="container mx-auto max-w-3xl px-4">
          {/* Back */}
          <Link href="/news" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-primary mb-8 transition">
            <ArrowLeft className="h-4 w-4" /> Back to News
          </Link>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            {article.category && <Badge className="bg-primary/10 text-primary">{article.category}</Badge>}
            {article.publishedAt && (
              <span className="flex items-center gap-1.5 text-sm text-slate-500">
                <Calendar className="h-4 w-4" />
                {new Date(article.publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
              </span>
            )}
            {article.author && (
              <span className="flex items-center gap-2 text-sm text-slate-500">
                {article.author.image ? (
                  <Image
                    src={urlFor(article.author.image).width(32).height(32).fit('crop').url()}
                    alt={article.author.name}
                    width={32}
                    height={32}
                    className="rounded-full object-cover"
                  />
                ) : (
                  <User className="h-4 w-4" />
                )}
                {article.author.name}
                {article.author.position && (
                  <span className="text-primary font-medium">· {article.author.position}</span>
                )}
              </span>
            )}
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-6">{article.title}</h1>

          {article.excerpt && (
            <p className="text-xl text-slate-600 leading-relaxed mb-8 border-l-4 border-primary pl-4">{article.excerpt}</p>
          )}

          {/* Featured image */}
          {article.featuredImage && (
            <div className="relative w-full h-80 md:h-[460px] rounded-2xl overflow-hidden mb-12">
              <Image
                src={urlFor(article.featuredImage).width(900).height(500).fit('crop').url()}
                alt={article.title}
                fill
                className="object-cover"
              />
            </div>
          )}

          {/* Body */}
          {article.content && article.content.length > 0 ? (
            <PortableTextRenderer value={article.content} />
          ) : (
            <p className="text-slate-400 italic">No content available for this article.</p>
          )}
        </div>
      </article>

      <Footer />
    </div>
  )
}
