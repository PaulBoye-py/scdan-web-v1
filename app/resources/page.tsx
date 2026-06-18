export const dynamic = 'force-dynamic'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, ExternalLink, Calendar, User } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { getResources } from "@/lib/sanity-queries"

const categoryLabels: Record<string, string> = {
  guideline: 'Clinical Guideline',
  research: 'Research Paper',
  publication: 'Publication',
  educational: 'Educational Material',
  policy: 'Policy Document',
}

const categoryColors: Record<string, string> = {
  guideline: 'bg-blue-100 text-blue-800',
  research: 'bg-purple-100 text-purple-800',
  publication: 'bg-green-100 text-green-800',
  educational: 'bg-yellow-100 text-yellow-800',
  policy: 'bg-red-100 text-red-800',
}

export default async function ResourcesPage() {
  const resources = await getResources()

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section className="py-20 bg-gradient-to-r from-primary to-primary/80 text-white">
        <div className="container mx-auto max-w-6xl px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Resources</h1>
          <p className="text-xl text-primary-foreground/80 max-w-3xl mx-auto">
            Access clinical guidelines, research papers, and educational materials for special care dentistry professionals
          </p>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="container mx-auto max-w-6xl px-4">
          {resources.length === 0 ? (
            <p className="text-slate-500 text-center py-16">No resources available yet.</p>
          ) : (
            <div className="grid gap-6">
              {resources.map((resource: any) => (
                <Card key={resource._id} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="mb-2">
                          <Badge className={categoryColors[resource.category] ?? 'bg-slate-100 text-slate-700'}>
                            {categoryLabels[resource.category] ?? resource.category}
                          </Badge>
                        </div>
                        <CardTitle className="text-xl text-slate-900">{resource.title}</CardTitle>
                        <CardDescription className="mt-1.5">{resource.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
                        {resource.author && (
                          <span className="flex items-center gap-1.5"><User className="w-4 h-4" />{resource.author.name}</span>
                        )}
                        {resource.publishedAt && (
                          <span className="flex items-center gap-1.5">
                            <Calendar className="w-4 h-4" />
                            {new Date(resource.publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </span>
                        )}
                        {resource.downloadCount != null && (
                          <span>{resource.downloadCount} downloads</span>
                        )}
                      </div>
                      <div className="flex gap-2 flex-shrink-0">
                        {resource.fileUrl ? (
                          <a href={resource.fileUrl} download target="_blank" rel="noopener noreferrer">
                            <Button className="bg-primary hover:bg-primary/90">
                              <Download className="mr-2 h-4 w-4" /> Download
                            </Button>
                          </a>
                        ) : resource.externalLink ? (
                          <a href={resource.externalLink} target="_blank" rel="noopener noreferrer">
                            <Button className="bg-primary hover:bg-primary/90">
                              <ExternalLink className="mr-2 h-4 w-4" /> View Resource
                            </Button>
                          </a>
                        ) : null}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
