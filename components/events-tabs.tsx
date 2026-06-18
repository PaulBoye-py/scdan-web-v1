'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Users, Clock, ArrowRight, ExternalLink } from "lucide-react"
import Image from "next/image"

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

function EventTypeLabel({ type }: { type?: string }) {
  if (!type) return null
  const label = type.charAt(0).toUpperCase() + type.slice(1)
  return <Badge className="bg-primary/10 text-primary">{label}</Badge>
}

export default function EventsTabs({ upcoming, past }: { upcoming: any[]; past: any[] }) {
  return (
    <Tabs defaultValue="upcoming" className="w-full">
      <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-12">
        <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
        <TabsTrigger value="past">Past Events</TabsTrigger>
      </TabsList>

      {/* Upcoming */}
      <TabsContent value="upcoming" className="space-y-12">
        {upcoming.length === 0 ? (
          <p className="text-slate-500 text-center py-16">No upcoming events at this time.</p>
        ) : (
          <>
            {/* Featured */}
            {(() => {
              const featured = upcoming.find((e) => e.featured) ?? upcoming[0]
              const rest = upcoming.filter((e) => e !== featured)
              return (
                <>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-6">Featured Event</h2>
                    <Card className="border-0 shadow-xl overflow-hidden">
                      <div className="grid lg:grid-cols-2 gap-0">
                        <div className="relative h-64 lg:h-full min-h-[280px]">
                          <Image
                            src={featured.imageUrl ?? '/scdan-hero.webp'}
                            alt={featured.title}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute top-4 left-4">
                            <Badge className="bg-primary text-white">Featured</Badge>
                          </div>
                        </div>
                        <div className="p-8 lg:p-12 space-y-6">
                          <div className="space-y-2">
                            <EventTypeLabel type={featured.eventType} />
                            <h3 className="text-2xl lg:text-3xl font-bold text-slate-900">{featured.title}</h3>
                            {featured.description && (
                              <p className="text-slate-600 text-lg">{featured.description}</p>
                            )}
                          </div>
                          <div className="space-y-3 text-slate-600">
                            <div className="flex items-center gap-3">
                              <Calendar className="h-5 w-5 text-primary flex-shrink-0" />
                              <span>
                                {formatDate(featured.startDate)}
                                {featured.endDate && ` – ${formatDate(featured.endDate)}`}
                              </span>
                            </div>
                            {featured.time && (
                              <div className="flex items-center gap-3">
                                <Clock className="h-5 w-5 text-primary flex-shrink-0" />
                                <span>{featured.time}</span>
                              </div>
                            )}
                            <div className="flex items-center gap-3">
                              <MapPin className="h-5 w-5 text-primary flex-shrink-0" />
                              <span>{featured.location}</span>
                            </div>
                            {featured.capacity && (
                              <div className="flex items-center gap-3">
                                <Users className="h-5 w-5 text-primary flex-shrink-0" />
                                <span>
                                  {featured.registeredCount ? `${featured.registeredCount}/` : ''}{featured.capacity} capacity
                                </span>
                              </div>
                            )}
                          </div>
                          <div className="flex items-center gap-4">
                            {featured.price && (
                              <span className="text-2xl font-bold text-primary">{featured.price}</span>
                            )}
                            {featured.registrationLink ? (
                              <a href={featured.registrationLink} target="_blank" rel="noopener noreferrer">
                                <Button className="bg-primary hover:bg-primary/90">
                                  Register Now <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                              </a>
                            ) : (
                              <Button className="bg-primary hover:bg-primary/90">
                                View Details <ArrowRight className="ml-2 h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>

                  {rest.length > 0 && (
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900 mb-6">Other Upcoming Events</h2>
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {rest.map((event) => (
                          <Card key={event._id} className="border-0 shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
                            <div className="relative h-48">
                              <Image
                                src={event.imageUrl ?? '/scdan-hero.webp'}
                                alt={event.title}
                                fill
                                className="object-cover"
                              />
                              {event.eventType && (
                                <div className="absolute top-4 left-4">
                                  <Badge className="bg-white text-slate-900">{event.eventType}</Badge>
                                </div>
                              )}
                            </div>
                            <CardHeader className="pb-2">
                              <CardTitle className="text-lg line-clamp-2">{event.title}</CardTitle>
                              {event.description && (
                                <CardDescription className="line-clamp-2">{event.description}</CardDescription>
                              )}
                            </CardHeader>
                            <CardContent className="space-y-4">
                              <div className="space-y-2 text-sm text-slate-600">
                                <div className="flex items-center gap-2">
                                  <Calendar className="h-4 w-4 text-primary" />
                                  <span>{formatDate(event.startDate)}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <MapPin className="h-4 w-4 text-primary" />
                                  <span className="line-clamp-1">{event.location}</span>
                                </div>
                              </div>
                              <div className="flex items-center justify-between">
                                {event.price && <span className="text-lg font-bold text-primary">{event.price}</span>}
                                {event.registrationLink ? (
                                  <a href={event.registrationLink} target="_blank" rel="noopener noreferrer">
                                    <Button size="sm" className="bg-primary hover:bg-primary/90">Register</Button>
                                  </a>
                                ) : (
                                  <Button size="sm" variant="outline">View Details</Button>
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )
            })()}
          </>
        )}
      </TabsContent>

      {/* Past */}
      <TabsContent value="past" className="space-y-8">
        {past.length === 0 ? (
          <p className="text-slate-500 text-center py-16">No past events recorded yet.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {past.map((event) => (
              <Card key={event._id} className="border-0 shadow-lg overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src={event.imageUrl ?? '/scdan-hero.webp'}
                    alt={event.title}
                    fill
                    className="object-cover grayscale"
                  />
                  {event.eventType && (
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-slate-800 text-white">{event.eventType}</Badge>
                    </div>
                  )}
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg line-clamp-2">{event.title}</CardTitle>
                  {event.description && (
                    <CardDescription className="line-clamp-2">{event.description}</CardDescription>
                  )}
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2 text-sm text-slate-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span>{formatDate(event.startDate)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span className="line-clamp-1">{event.location}</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full bg-transparent">
                    <ExternalLink className="mr-2 h-4 w-4" /> View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </TabsContent>
    </Tabs>
  )
}
