import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, MapPin, Users, Clock, ArrowRight, ExternalLink } from "lucide-react"
import Image from "next/image"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function EventsPage() {
  const upcomingEvents = [
    {
      id: 1,
      title: "SCDAN Annual Conference 2024",
      description:
        "Join us for our biggest event of the year featuring international speakers, workshops, and networking opportunities.",
      date: "2024-03-20",
      endDate: "2024-03-22",
      time: "9:00 AM - 5:00 PM",
      location: "Eko Hotel & Suites, Lagos",
      type: "Conference",
      capacity: 500,
      registered: 387,
      price: "₦25,000",
      image: "/placeholder.svg?height=300&width=400",
      featured: true,
    },
    {
      id: 2,
      title: "Community Health Fair - Abuja",
      description: "Free dental screenings and oral health education for families with special needs children.",
      date: "2024-04-15",
      time: "10:00 AM - 4:00 PM",
      location: "National Stadium, Abuja",
      type: "Outreach",
      capacity: 200,
      registered: 89,
      price: "Free",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      id: 3,
      title: "Special Care Dentistry Workshop",
      description: "Hands-on workshop focusing on behavioral management techniques for special needs patients.",
      date: "2024-05-10",
      time: "9:00 AM - 3:00 PM",
      location: "University of Ibadan, Ibadan",
      type: "Workshop",
      capacity: 50,
      registered: 32,
      price: "₦15,000",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      id: 4,
      title: "Pediatric Special Care Seminar",
      description: "Advanced techniques in pediatric special care dentistry and sedation management.",
      date: "2024-06-05",
      time: "2:00 PM - 6:00 PM",
      location: "Sheraton Hotel, Abuja",
      type: "Seminar",
      capacity: 100,
      registered: 67,
      price: "₦12,000",
      image: "/placeholder.svg?height=300&width=400",
    },
  ]

  const pastEvents = [
    {
      id: 5,
      title: "SCDAN Annual Conference 2023",
      description: "Successful conference with over 400 attendees focusing on innovation in special care dentistry.",
      date: "2023-03-15",
      endDate: "2023-03-17",
      location: "Transcorp Hilton, Abuja",
      type: "Conference",
      attendees: 423,
      image: "/placeholder.svg?height=300&width=400",
      highlights: ["15 international speakers", "30 research presentations", "5 hands-on workshops"],
    },
    {
      id: 6,
      title: "Mobile Dental Unit Launch",
      description: "Official launch of SCDAN's mobile dental unit program with community demonstration.",
      date: "2023-11-20",
      location: "Lagos State Secretariat",
      type: "Launch Event",
      attendees: 150,
      image: "/placeholder.svg?height=300&width=400",
      highlights: ["Government officials present", "Media coverage", "Community demonstrations"],
    },
    {
      id: 7,
      title: "Research Symposium 2023",
      description: "Annual research symposium showcasing latest findings in special care dentistry.",
      date: "2023-09-12",
      location: "University of Lagos",
      type: "Symposium",
      attendees: 200,
      image: "/placeholder.svg?height=300&width=400",
      highlights: ["20 research papers", "Poster presentations", "Young researcher awards"],
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary/80 text-white">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center space-y-6">
            <Badge className="bg-primary/90 text-white">Events & Programs</Badge>
            <h1 className="text-4xl md:text-6xl font-bold">SCDAN Events</h1>
            <p className="text-xl text-primary-foreground/80 max-w-3xl mx-auto">
              Join us at our conferences, workshops, and community outreach programs designed to advance special care
              dentistry in Nigeria
            </p>
          </div>
        </div>
      </section>

      {/* Events Tabs */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto max-w-6xl px-4">
          <Tabs defaultValue="upcoming" className="w-full">
            <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-12">
              <TabsTrigger value="upcoming" className="text-lg">
                Upcoming Events
              </TabsTrigger>
              <TabsTrigger value="past" className="text-lg">
                Past Events
              </TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming" className="space-y-8">
              {/* Featured Event */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Event</h2>
                <Card className="border-0 shadow-xl overflow-hidden">
                  <div className="grid lg:grid-cols-2 gap-0">
                    <div className="relative h-64 lg:h-full">
                      <Image
                        src={upcomingEvents[0].image || "/placeholder.svg"}
                        alt={upcomingEvents[0].title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-red-600 text-white">Featured</Badge>
                      </div>
                    </div>
                    <div className="p-8 lg:p-12">
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <Badge className="bg-primary/10 text-primary">{upcomingEvents[0].type}</Badge>
                          <h3 className="text-2xl lg:text-3xl font-bold text-gray-900">{upcomingEvents[0].title}</h3>
                          <p className="text-gray-600 text-lg">{upcomingEvents[0].description}</p>
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-center gap-3 text-gray-600">
                            <Calendar className="h-5 w-5 text-primary" />
                            <span>
                              {upcomingEvents[0].date} - {upcomingEvents[0].endDate}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 text-gray-600">
                            <Clock className="h-5 w-5 text-primary" />
                            <span>{upcomingEvents[0].time}</span>
                          </div>
                          <div className="flex items-center gap-3 text-gray-600">
                            <MapPin className="h-5 w-5 text-primary" />
                            <span>{upcomingEvents[0].location}</span>
                          </div>
                          <div className="flex items-center gap-3 text-gray-600">
                            <Users className="h-5 w-5 text-primary" />
                            <span>
                              {upcomingEvents[0].registered}/{upcomingEvents[0].capacity} registered
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-2xl font-bold text-primary">{upcomingEvents[0].price}</div>
                          <Button className="bg-primary hover:bg-primary/90">
                            Register Now
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Other Upcoming Events */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Other Upcoming Events</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {upcomingEvents.slice(1).map((event) => (
                    <Card
                      key={event.id}
                      className="border-0 shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
                    >
                      <div className="relative h-48">
                        <Image
                          src={event.image || "/placeholder.svg"}
                          alt={event.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-white text-gray-900">{event.type}</Badge>
                        </div>
                      </div>
                      <CardHeader className="pb-4">
                        <CardTitle className="text-lg line-clamp-2">{event.title}</CardTitle>
                        <CardDescription className="line-clamp-2">{event.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>{event.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            <span className="line-clamp-1">{event.location}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            <span>
                              {event.registered}/{event.capacity}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-lg font-bold text-primary">{event.price}</div>
                          <Button size="sm" className="bg-primary hover:bg-primary/90">
                            Register
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="past" className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Past Events</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {pastEvents.map((event) => (
                    <Card key={event.id} className="border-0 shadow-lg overflow-hidden">
                      <div className="relative h-48">
                        <Image
                          src={event.image || "/placeholder.svg"}
                          alt={event.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-gray-800 text-white">{event.type}</Badge>
                        </div>
                      </div>
                      <CardHeader className="pb-4">
                        <CardTitle className="text-lg line-clamp-2">{event.title}</CardTitle>
                        <CardDescription className="line-clamp-2">{event.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>{event.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            <span className="line-clamp-1">{event.location}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            <span>{event.attendees} attendees</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="text-sm font-medium text-gray-900">Highlights:</div>
                          <ul className="text-sm text-gray-600 space-y-1">
                            {event.highlights.map((highlight, index) => (
                              <li key={index} className="flex items-center gap-2">
                                <div className="w-1 h-1 bg-primary rounded-full"></div>
                                {highlight}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <Button variant="outline" size="sm" className="w-full bg-transparent">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          View Details
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">Don't Miss Our Next Event</h2>
            <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
              Stay updated with our latest events and be the first to know about new opportunities for professional
              development
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
                <Calendar className="mr-2 h-5 w-5" />
                Subscribe to Events
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-primary/90 bg-transparent"
              >
                Contact Event Team
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
