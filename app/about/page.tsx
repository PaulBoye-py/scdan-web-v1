import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Target, Eye, Heart, Award, Globe } from "lucide-react"
import Image from "next/image"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function AboutPage() {
  const leadership = [
    {
      name: "Prof. Folakemi Oredugba",
      position: "President",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Leading special care dentistry advocate with 20+ years of experience in pediatric and special needs dental care.",
    },
    {
      name: "Dr. Ronke Oluwo",
      position: "Vice President",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Specialist in geriatric dentistry and accessibility in dental care with extensive research background.",
    },
    {
      name: "Dr. Ronke Oluwo",
      position: "Secretary General",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Expert in dental public health and community outreach programs for underserved populations.",
    },
    {
      name: "Dr. Dipo Ayedun",
      position: "Publicity Secretary",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Financial management expert with background in healthcare administration and special needs care.",
    },
  ]

  const members = [
    {
      name: "Dr. Emeka Nwankwo",
      specialty: "Pediatric Special Care",
      location: "Lagos",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      name: "Dr. Kemi Oladele",
      specialty: "Geriatric Dentistry",
      location: "Abuja",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      name: "Dr. Ibrahim Suleiman",
      specialty: "Disability Dental Care",
      location: "Kano",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      name: "Dr. Grace Okafor",
      specialty: "Behavioral Management",
      location: "Port Harcourt",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      name: "Dr. Yusuf Abdullahi",
      specialty: "Sedation Dentistry",
      location: "Kaduna",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      name: "Dr. Folake Adebisi",
      specialty: "Oral Medicine",
      location: "Ibadan",
      image: "/placeholder.svg?height=200&width=200",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary/80 text-white">
        <div className="container mx-auto max-w-6xl px-4 text-center">
          <div className="space-y-6">
            <Badge className="bg-primary text-white">About SCDAN</Badge>
            <h1 className="text-4xl md:text-6xl font-bold">Dedicated to Excellence in Special Care Dentistry</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              For over 15 years, SCDAN has been at the forefront of advancing dental care for individuals with special
              healthcare needs across Nigeria.
            </p>
          </div>
        </div>
      </section>

      {/* Mission and Vision */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <Card className="border-0 shadow-lg">
              <CardHeader className="text-center pb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-2xl text-gray-900">Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-600 text-lg leading-relaxed">
                  To advance the oral health of individuals with special healthcare needs through professional
                  education, advocacy, research, and the promotion of evidence-based clinical practices that ensure
                  equitable access to quality dental care.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg">
              <CardHeader className="text-center pb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Eye className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-2xl text-gray-900">Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-600 text-lg leading-relaxed">
                  To be the leading professional organization in Nigeria that champions inclusive, compassionate, and
                  comprehensive dental care for all individuals with special healthcare needs, creating a society where
                  oral health disparities are eliminated.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-white">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These values guide everything we do and shape our approach to special care dentistry
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                <Heart className="h-10 w-10 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Compassion</h3>
              <p className="text-gray-600">
                We approach every patient with empathy, understanding, and genuine care for their unique needs and
                circumstances.
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <Award className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Excellence</h3>
              <p className="text-gray-600">
                We strive for the highest standards in clinical care, education, and professional development.
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <Globe className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Inclusivity</h3>
              <p className="text-gray-600">
                We believe that quality dental care should be accessible to all, regardless of ability, background, or
                circumstances.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Leadership Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Meet the dedicated professionals leading SCDAN's mission to advance special care dentistry
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {leadership.map((leader, index) => (
              <Card key={index} className="border-0 shadow-lg text-center">
                <CardHeader className="pb-4">
                  <div className="relative w-32 h-32 mx-auto mb-4">
                    <Image
                      src={leader.image || "/placeholder.svg"}
                      alt={leader.name}
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                  <CardTitle className="text-lg">{leader.name}</CardTitle>
                  <CardDescription className="text-primary font-medium">{leader.position}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">{leader.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Members Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Members</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              SCDAN brings together dental professionals from across Nigeria who are passionate about special care
              dentistry
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {members.map((member, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardHeader className="text-center pb-4">
                  <div className="relative w-24 h-24 mx-auto mb-4">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                  <CardTitle className="text-lg">{member.name}</CardTitle>
                  <CardDescription className="text-primary">{member.specialty}</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <Badge variant="outline" className="text-gray-600">
                    {member.location}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              <Users className="mr-2 h-5 w-5" />
              View All Members
            </Button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <div className="space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold">Join Our Community</h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Become part of Nigeria's leading organization for special care dentistry professionals
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
                Become a Member
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-primary/90 bg-transparent"
              >
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
