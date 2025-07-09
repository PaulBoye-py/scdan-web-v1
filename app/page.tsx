import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Users, Calendar, BookOpen, ArrowRight, Stethoscope, Award, Globe } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function HomePage() {
  const recentNews = [
    {
      id: 1,
      title: "SCDAN Annual Conference 2024 - Advancing Special Care Dentistry",
      excerpt:
        "Join us for our biggest event of the year featuring international speakers and cutting-edge research presentations.",
      date: "2024-03-15",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 2,
      title: "New Guidelines for Special Needs Dental Care Released",
      excerpt:
        "SCDAN releases comprehensive guidelines to improve dental care accessibility for patients with special needs.",
      date: "2024-03-10",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 3,
      title: "Community Outreach Program Reaches 500 Patients",
      excerpt:
        "Our mobile dental unit has successfully provided care to over 500 special needs patients across Nigeria.",
      date: "2024-03-05",
      image: "/placeholder.svg?height=200&width=300",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 px-4 md:py-32">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-[#00BFFF]/10 text-[#00BFFF] hover:bg-[#00BFFF]/5">
                  Special Care Dentistry Association of Nigeria
                </Badge>
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                  Advancing Dental Care for <span className="text-[#00BFFF]">Special Needs</span> Patients
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  SCDAN is dedicated to improving oral health outcomes for individuals with special healthcare needs
                  through education, advocacy, and professional development.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-[#00BFFF] cursor-pointer hover:bg-[#00BFFF]/90 text-white">
                  <Heart className="mr-2 h-5 w-5" />
                  Join Our Mission
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-[#00BFFF] cursor-pointer text-[#00BFFF] hover:bg-[#00BFFF]/5 bg-transparent"
                >
                  <BookOpen className="mr-2 h-5 w-5" />
                    <Link href='/about'>
                      Learn More
                    </Link>
                </Button>
              </div>
              <div className="grid grid-cols-3 gap-8 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#00BFFF]">500+</div>
                  <div className="text-sm text-gray-600">Members</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#00BFFF]">15+</div>
                  <div className="text-sm text-gray-600">Years Serving</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#00BFFF]">10K+</div>
                  <div className="text-sm text-gray-600">Patients Helped</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="relative z-10">
                <Image
                  src="/hero.jpg"
                  alt="SCDAN Team"
                  width={500}
                  height={500}
                  className="rounded-2xl shadow-2xl"
                />
              </div>
              <div className="absolute -top-4 -right-4 w-full h-full bg-blue-200 rounded-2xl -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Overview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Impact Areas</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              SCDAN works across multiple domains to ensure comprehensive care for special needs patients
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-[#00BFFF]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Stethoscope className="h-8 w-8 text-[#00BFFF]" />
                </div>
                <CardTitle className="text-xl text-gray-900">Professional Education</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-600">
                  Providing continuing education and training programs for dental professionals to enhance their skills
                  in special care dentistry.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-xl text-gray-900">Community Outreach</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-600">
                  Organizing community programs and mobile dental services to reach underserved populations with special
                  healthcare needs.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-orange-600" />
                </div>
                <CardTitle className="text-xl text-gray-900">Research & Advocacy</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-600">
                  Conducting research and advocating for policies that improve access to quality dental care for special
                  needs patients.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Latest News & Updates</h2>
              <p className="text-xl text-gray-600">Stay informed about our latest activities and developments</p>
            </div>
            <Link href="/news">
              <Button variant="outline" className="border-[#00BFFF] text-[#00BFFF] hover:bg-[#00BFFF]/5 bg-transparent">
                View All News
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {recentNews.map((article) => (
              <Card key={article.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
                <div className="relative h-48">
                  <Image src={article.image || "/placeholder.svg"} alt={article.title} fill className="object-cover" />
                </div>
                <CardHeader>
                  <div className="text-sm text-[#00BFFF] mb-2">{article.date}</div>
                  <CardTitle className="text-lg line-clamp-2">{article.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="line-clamp-3">{article.excerpt}</CardDescription>
                  <Button variant="link" className="p-0 mt-4 text-[#00BFFF]">
                    Read More <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Donation Section */}
      <section className="py-20 bg-[#00BFFF] text-white">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold">Support Our Mission</h2>
              <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                Your donation helps us provide essential dental care to those who need it most. Every contribution makes
                a difference in someone's life.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="bg-blue-700 rounded-lg p-6">
                <div className="text-2xl font-bold mb-2">₦10,000</div>
                <div className="text-blue-200">Provides basic dental care for 2 patients</div>
              </div>
              <div className="bg-blue-700 rounded-lg p-6">
                <div className="text-2xl font-bold mb-2">₦25,000</div>
                <div className="text-blue-200">Sponsors a dental professional's training</div>
              </div>
              <div className="bg-blue-700 rounded-lg p-6">
                <div className="text-2xl font-bold mb-2">₦50,000</div>
                <div className="text-blue-200">Funds a community outreach program</div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/donate">
                <Button size="lg" className="bg-white text-[#00BFFF] hover:bg-gray-100">
                  <Heart className="mr-2 h-5 w-5" />
                  Donate Now
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-blue-700 bg-transparent">
                <Globe className="mr-2 h-5 w-5" />
                Become a Partner
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-20 bg-white">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Upcoming Events</h2>
              <p className="text-xl text-gray-600">Join us at our upcoming events and conferences</p>
            </div>
            <Link href="/events">
              <Button variant="outline" className="border-[#00BFFF] text-[#00BFFF] hover:bg-[#00BFFF]/5 bg-transparent">
                View All Events
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="bg-[#00BFFF]/10 p-3 rounded-lg">
                    <Calendar className="h-6 w-6 text-[#00BFFF]" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Annual Conference 2024</CardTitle>
                    <CardDescription>March 20-22, 2024 • Lagos, Nigeria</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Join dental professionals from across Nigeria for three days of learning, networking, and advancing
                  special care dentistry.
                </p>
                <Button className="bg-[#00BFFF] hover:bg-[#00BFFF]/90">Register Now</Button>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <Users className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Community Health Fair</CardTitle>
                    <CardDescription>April 15, 2024 • Abuja, Nigeria</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Free dental screenings and oral health education for families with special needs children in the Abuja
                  community.
                </p>
                <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50 bg-transparent">
                  Learn More
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
