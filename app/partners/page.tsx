import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { getPartners } from "@/lib/sanity-queries"
import { urlFor } from "@/lib/sanity"

export const revalidate = 60
export const dynamic = 'force-dynamic'

export default async function PartnersPage() {
  let partners = []
  try {
    partners = await getPartners()
  } catch (error) {
    console.log('Sanity not configured yet')
  }

  const placeholderPartners = [
    {
      _id: '1',
      name: 'Ministry of Health Nigeria',
      slug: { current: 'ministry-of-health' },
      logo: '/placeholder.svg?height=100&width=200',
      description: 'Supporting policy development and public health initiatives',
      website: '#',
      partnerType: 'partner',
      featured: true,
      order: 1,
    },
    {
      _id: '2',
      name: 'Dental Association of Nigeria',
      slug: { current: 'dan' },
      logo: '/placeholder.svg?height=100&width=200',
      description: 'Collaborative professional organization for dentists',
      website: '#',
      partnerType: 'partner',
      featured: true,
      order: 2,
    },
    {
      _id: '3',
      name: 'Global Oral Health Foundation',
      slug: { current: 'gohf' },
      logo: '/placeholder.svg?height=100&width=200',
      description: 'International partner supporting special care dentistry research',
      website: '#',
      partnerType: 'partner',
      featured: true,
      order: 3,
    },
  ]

  const displayPartners = partners.length > 0 ? partners : placeholderPartners

  const featuredPartners = displayPartners.filter((p: any) => p.featured)
  const otherPartners = displayPartners.filter((p: any) => !p.featured)

  const getPartnerBadgeColor = (type: string) => {
    const colors: Record<string, string> = {
      sponsor: 'bg-gold-100 text-gold-800',
      partner: 'bg-blue-100 text-blue-800',
      affiliate: 'bg-green-100 text-green-800',
    }
    return colors[type] || 'bg-gray-100 text-gray-800'
  }

  const getPartnerTypeLabel = (type: string) => {
    return type.charAt(0).toUpperCase() + type.slice(1)
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary/80 text-white">
        <div className="container mx-auto max-w-6xl px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Our Partners & Sponsors</h1>
          <p className="text-xl text-primary-100 max-w-3xl mx-auto">
            We collaborate with leading organizations and institutions to advance special care dentistry
          </p>
        </div>
      </section>

      {/* Featured Partners */}
      {featuredPartners.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto max-w-6xl px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Featured Partners</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {featuredPartners.map((partner: any) => (
                <Card key={partner._id} className="border-0 shadow-lg hover:shadow-xl transition-shadow text-center">
                  <CardHeader className="pb-4">
                    <div className="relative h-20 mb-4 flex items-center justify-center">
                      <Image
                        src={typeof partner.logo === 'string' ? partner.logo : urlFor(partner.logo).url()}
                        alt={partner.name}
                        width={150}
                        height={80}
                        className="object-contain"
                      />
                    </div>
                    <CardTitle className="text-lg">{partner.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="mb-4">{partner.description}</CardDescription>
                    <Badge className={getPartnerBadgeColor(partner.partnerType)}>
                      {getPartnerTypeLabel(partner.partnerType)}
                    </Badge>
                    {partner.website && partner.website !== '#' && (
                      <div className="mt-4">
                        <a href={partner.website} target="_blank" rel="noopener noreferrer">
                          <Button variant="outline" className="border-primary text-primary hover:bg-primary/5">
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Visit Website
                          </Button>
                        </a>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Partners */}
      <section className={`py-20 ${featuredPartners.length > 0 ? 'bg-white' : 'bg-gray-50'}`}>
        <div className="container mx-auto max-w-6xl px-4">
          {featuredPartners.length > 0 && (
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">All Partners & Sponsors</h2>
          )}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayPartners.map((partner: any) => (
              <Card key={partner._id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="pb-4">
                  <div className="relative h-16 mb-4 flex items-center justify-center">
                    <Image
                      src={typeof partner.logo === 'string' ? partner.logo : urlFor(partner.logo).url()}
                      alt={partner.name}
                      width={120}
                      height={60}
                      className="object-contain"
                    />
                  </div>
                  <CardTitle className="text-lg text-center">{partner.name}</CardTitle>
                  <div className="flex justify-center gap-2 mt-2">
                    <Badge className={getPartnerBadgeColor(partner.partnerType)}>
                      {getPartnerTypeLabel(partner.partnerType)}
                    </Badge>
                  </div>
                </CardHeader>
                {partner.description && (
                  <CardContent>
                    <p className="text-sm text-gray-600 text-center">{partner.description}</p>
                    {partner.website && partner.website !== '#' && (
                      <div className="mt-4 flex justify-center">
                        <a href={partner.website} target="_blank" rel="noopener noreferrer">
                          <Button size="sm" variant="outline" className="border-primary text-primary hover:bg-primary/5">
                            <ExternalLink className="h-3 w-3" />
                          </Button>
                        </a>
                      </div>
                    )}
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Interested in Partnership?</h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            We welcome partnerships with organizations committed to advancing special care dentistry and improving oral
            health outcomes for special needs populations.
          </p>
          <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
            Contact Us for Partnership Opportunities
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  )
}
