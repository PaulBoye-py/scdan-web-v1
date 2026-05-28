import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, ExternalLink } from "lucide-react"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { getResources } from "@/lib/sanity-queries"

export const revalidate = 60
export const dynamic = 'force-dynamic'

export default async function ResourcesPage() {
  let resources = []
  try {
    resources = await getResources()
  } catch (error) {
    console.log('Sanity not configured yet')
  }

  const placeholderResources = [
    {
      _id: '1',
      title: 'Clinical Guidelines for Special Needs Dentistry',
      slug: { current: 'clinical-guidelines' },
      description: 'Comprehensive guidelines for managing dental care for patients with special healthcare needs',
      category: 'guideline',
      publishedAt: new Date().toISOString(),
      author: null,
      downloadCount: 245,
    },
    {
      _id: '2',
      title: 'Research: Behavioral Management Techniques',
      slug: { current: 'behavioral-research' },
      description: 'Latest research findings on effective behavioral management strategies in special care dentistry',
      category: 'research',
      publishedAt: new Date().toISOString(),
      author: null,
      downloadCount: 189,
    },
    {
      _id: '3',
      title: 'Inclusive Dental Practice Manual',
      slug: { current: 'inclusive-manual' },
      description: 'A practical guide for creating inclusive and accessible dental practices',
      category: 'educational',
      publishedAt: new Date().toISOString(),
      author: null,
      downloadCount: 312,
    },
  ]

  const displayResources = resources.length > 0 ? resources : placeholderResources

  const categories = ['guideline', 'research', 'publication', 'educational', 'policy']
  const categoryLabels: Record<string, string> = {
    guideline: 'Clinical Guideline',
    research: 'Research Paper',
    publication: 'Publication',
    educational: 'Educational Material',
    policy: 'Policy Document',
  }

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      guideline: 'bg-blue-100 text-blue-800',
      research: 'bg-purple-100 text-purple-800',
      publication: 'bg-green-100 text-green-800',
      educational: 'bg-yellow-100 text-yellow-800',
      policy: 'bg-red-100 text-red-800',
    }
    return colors[category] || 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary/80 text-white">
        <div className="container mx-auto max-w-6xl px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Resources & Publications</h1>
          <p className="text-xl text-primary-100 max-w-3xl mx-auto">
            Access clinical guidelines, research papers, and educational materials for special care dentistry professionals
          </p>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid gap-6">
            {displayResources.map((resource: any) => (
              <Card key={resource._id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={getCategoryColor(resource.category)}>
                          {categoryLabels[resource.category] || resource.category}
                        </Badge>
                      </div>
                      <CardTitle className="text-xl text-gray-900">{resource.title}</CardTitle>
                      <CardDescription className="mt-2">{resource.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      {resource.author && (
                        <span>By: {resource.author.name}</span>
                      )}
                      <span>{resource.downloadCount} downloads</span>
                      {resource.publishedAt && (
                        <span>{new Date(resource.publishedAt).toLocaleDateString()}</span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      {resource.file?.asset?.url ? (
                        <a href={resource.file.asset.url} download>
                          <Button className="bg-primary hover:bg-primary/90">
                            <Download className="mr-2 h-4 w-4" />
                            Download
                          </Button>
                        </a>
                      ) : resource.externalLink ? (
                        <a href={resource.externalLink} target="_blank" rel="noopener noreferrer">
                          <Button className="bg-primary hover:bg-primary/90">
                            <ExternalLink className="mr-2 h-4 w-4" />
                            View Resource
                          </Button>
                        </a>
                      ) : null}
                    </div>
                  </div>
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
