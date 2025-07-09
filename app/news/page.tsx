import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Calendar, Search, ArrowRight, User } from "lucide-react"
import Image from "next/image"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function NewsPage() {
  const featuredArticle = {
    id: 1,
    title: "SCDAN Launches Groundbreaking Mobile Dental Unit Program",
    excerpt:
      "New initiative brings specialized dental care directly to underserved communities across Nigeria, focusing on patients with special healthcare needs.",
    content:
      "The Special Care Dentistry Association of Nigeria (SCDAN) has officially launched its innovative Mobile Dental Unit Program, a groundbreaking initiative designed to bring specialized dental care directly to underserved communities across the country...",
    date: "2024-03-15",
    author: "Dr. Adebayo Ogundimu",
    category: "Program Launch",
    image: "/placeholder.svg?height=400&width=600",
    featured: true,
  }

  const newsArticles = [
    {
      id: 2,
      title: "New Guidelines for Special Needs Dental Care Released",
      excerpt:
        "SCDAN releases comprehensive guidelines to improve dental care accessibility for patients with special needs.",
      date: "2024-03-10",
      author: "Dr. Funmi Adeyemi",
      category: "Guidelines",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 3,
      title: "Annual Conference 2024: Record Breaking Attendance",
      excerpt: "Over 500 dental professionals gathered in Lagos for SCDAN's most successful conference to date.",
      date: "2024-03-08",
      author: "SCDAN Communications",
      category: "Events",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 4,
      title: "Research Grant Awarded for Autism Dental Care Study",
      excerpt:
        "SCDAN receives significant funding to conduct groundbreaking research on dental care approaches for children with autism.",
      date: "2024-03-05",
      author: "Dr. Chukwuma Okeke",
      category: "Research",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 5,
      title: "Partnership with Ministry of Health Announced",
      excerpt: "New collaboration aims to integrate special care dentistry into national healthcare policies.",
      date: "2024-03-01",
      author: "Dr. Aisha Mohammed",
      category: "Partnership",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 6,
      title: "Training Program for Rural Dentists Launched",
      excerpt:
        "Comprehensive training initiative to equip rural dental practitioners with special care dentistry skills.",
      date: "2024-02-28",
      author: "Dr. Emeka Nwankwo",
      category: "Education",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 7,
      title: "Community Outreach Reaches 1000 Patients Milestone",
      excerpt:
        "SCDAN's community outreach programs have successfully provided care to over 1000 special needs patients.",
      date: "2024-02-25",
      author: "Dr. Grace Okafor",
      category: "Outreach",
      image: "/placeholder.svg?height=200&width=300",
    },
  ]

  const categories = [
    "All",
    "Program Launch",
    "Guidelines",
    "Events",
    "Research",
    "Partnership",
    "Education",
    "Outreach",
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary/80 text-white">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center space-y-6">
            <Badge className="bg-primary/90 text-white">News & Updates</Badge>
            <h1 className="text-4xl md:text-6xl font-bold">Latest News from SCDAN</h1>
            <p className="text-xl text-primary-foreground/80 max-w-3xl mx-auto">
              Stay informed about our latest developments, research findings, and community impact in special care
              dentistry
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input type="text" placeholder="Search news articles..." className="pl-10" />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={category === "All" ? "default" : "outline"}
                  size="sm"
                  className={category === "All" ? "bg-primary hover:bg-primary/90" : ""}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      <section className="py-16 bg-white">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Featured Story</h2>
            <div className="w-20 h-1 bg-primary"></div>
          </div>
          <Card className="border-0 shadow-xl overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="relative h-64 lg:h-full">
                <Image
                  src={featuredArticle.image || "/placeholder.svg"}
                  alt={featuredArticle.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-8 lg:p-12">
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <Badge className="bg-primary/10 text-primary">{featuredArticle.category}</Badge>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {featuredArticle.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {featuredArticle.author}
                    </div>
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">
                    {featuredArticle.title}
                  </h3>
                  <p className="text-gray-600 text-lg leading-relaxed">{featuredArticle.excerpt}</p>
                  <Button className="bg-primary hover:bg-primary/90">
                    Read Full Article
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Recent News</h2>
            <div className="w-20 h-1 bg-primary"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsArticles.map((article) => (
              <Card key={article.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
                <div className="relative h-48">
                  <Image src={article.image || "/placeholder.svg"} alt={article.title} fill className="object-cover" />
                </div>
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <Badge variant="outline" className="text-xs">
                      {article.category}
                    </Badge>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {article.date}
                    </div>
                  </div>
                  <CardTitle className="text-lg line-clamp-2 leading-tight">{article.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="line-clamp-3 mb-4">{article.excerpt}</CardDescription>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">By {article.author}</div>
                    <Button variant="link" className="p-0 text-primary">
                      Read More <ArrowRight className="ml-1 h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button
              size="lg"
              variant="outline"
              className="border-primary text-primary hover:bg-primary/5 bg-transparent"
            >
              Load More Articles
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">Stay Updated</h2>
            <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
              Subscribe to our newsletter to receive the latest news and updates from SCDAN directly in your inbox
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-white text-gray-900 placeholder-gray-500"
              />
              <Button className="bg-primary/90 hover:bg-primary text-white">Subscribe</Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
