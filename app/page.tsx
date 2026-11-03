export const dynamic = 'force-dynamic'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Users, Target, Heart, Newspaper, ChevronRight, MapPin, CalendarDays } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { getRecentNews, getUpcomingEvents } from "@/lib/sanity-queries"
import { urlFor } from "@/lib/sanity"

export default async function HomePage() {
  const [news, events] = await Promise.all([
    getRecentNews(4),
    getUpcomingEvents(2),
  ])

  const featuredNews = news.find((n: any) => n.featured) ?? news[0] ?? null
  const sideNews = news.filter((n: any) => n !== featuredNews).slice(0, 3)

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section - Bold and Modern */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-32 pb-24">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
        </div>

        <div className="relative container mx-auto max-w-6xl px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                <span className="text-sm font-semibold text-primary">15+ Years of Excellence</span>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
                Transforming <span className="text-primary">Dental Care</span> for Every Patient
              </h1>

              <p className="text-xl text-slate-300 max-w-xl leading-relaxed">
                SCDAN leads Nigeria in specialized dental care for patients with unique healthcare needs through innovation, education, and compassionate service.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-semibold">
                 <a href="/about" className="flex items-center">
                  <div>Learn More</div>
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-700">
                <div>
                  <div className="text-3xl font-bold text-primary">10+</div>
                  <p className="text-sm text-slate-400">Active Members</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">500+</div>
                  <p className="text-sm text-slate-400">Patients Served</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">15+</div>
                  <p className="text-sm text-slate-400">Years Active</p>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/scdan-hero.webp"
                  alt="SCDAN Team"
                  width={500}
                  height={500}
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-primary/20 rounded-2xl -z-10 blur-xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values - 3 Column */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Our Core Values</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Guiding principles that drive everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Heart, title: "Compassionate Care", desc: "Every patient deserves dignity and empathy in their dental journey" },
              { icon: Target, title: "Excellence", desc: "We maintain the highest standards in clinical practice and education" },
              { icon: Users, title: "Community", desc: "Building inclusive spaces where everyone can access quality care" },
            ].map((value, i) => (
              <div key={i} className="group">
                <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-all duration-300">
                  <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary/20 transition">
                    <value.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{value.title}</h3>
                  <p className="text-slate-600">{value.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest News - Featured Article Style */}
      <section className="py-20 bg-white">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-bold text-slate-900 mb-3">Latest Updates</h2>
              <p className="text-lg text-slate-600">Stay informed about SCDAN initiatives and developments</p>
            </div>
            <Link href="/news">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary/5">
                View All News
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          {news.length === 0 ? (
            <p className="text-slate-500 text-center py-12">No news articles available yet.</p>
          ) : (
            <>
              {/* Featured News Card */}
              {featuredNews && (
                <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl overflow-hidden mb-8 shadow-xl">
                  <div className="grid lg:grid-cols-2 gap-8 p-8 md:p-12">
                    <div className="flex flex-col justify-center text-white">
                      <div className="inline-flex w-fit gap-2 mb-4">
                        <span className="px-3 py-1 bg-primary/20 border border-primary/50 rounded-full text-sm font-semibold text-primary">
                          {featuredNews.category ?? 'Featured'}
                        </span>
                      </div>
                      <h3 className="text-3xl font-bold mb-4">{featuredNews.title}</h3>
                      {featuredNews.excerpt && (
                        <p className="text-slate-300 mb-6 text-lg">{featuredNews.excerpt}</p>
                      )}
                      <div className="flex gap-4">
                        <Link href={`/news/${featuredNews.slug?.current}`}>
                          <Button className="bg-primary hover:bg-primary/90 text-white">Learn More</Button>
                        </Link>
                      </div>
                    </div>
                    <div className="relative rounded-xl overflow-hidden h-64 md:h-auto">
                      <Image
                        src={featuredNews.featuredImage ? urlFor(featuredNews.featuredImage).width(600).height(400).fit('crop').url() : '/scdan-news.webp'}
                        alt={featuredNews.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* News Grid */}
              {sideNews.length > 0 && (
                <div className="grid md:grid-cols-3 gap-6">
                  {sideNews.map((item: any) => (
                    <Link key={item._id} href={`/news/${item.slug?.current}`}>
                      <Card className="group hover:shadow-lg transition-all cursor-pointer border-slate-200">
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                              <Newspaper className="w-6 h-6 text-primary" />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm text-slate-500 mb-2">
                                {item.publishedAt ? new Date(item.publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }) : ''}
                              </p>
                              <h4 className="font-bold text-slate-900 group-hover:text-primary transition line-clamp-2">{item.title}</h4>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Upcoming Events - Bold CTA Style */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-bold text-slate-900 mb-3">Upcoming Events</h2>
              <p className="text-lg text-slate-600">Connect with dental professionals and special care experts</p>
            </div>
            <Link href="/events">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary/5">
                View Calendar
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          {events.length === 0 ? (
            <p className="text-slate-500 text-center py-12">No upcoming events at this time.</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {events.map((event: any) => (
                <div key={event._id} className="bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-all border border-slate-200">
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{event.title}</h3>
                  <div className="flex flex-wrap gap-4 text-sm text-slate-600 mb-6">
                    <span className="flex items-center gap-1.5">
                      <CalendarDays className="w-4 h-4 text-primary" />
                      {new Date(event.startDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </span>
                    {event.location && (
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-primary" />
                        {event.location}
                      </span>
                    )}
                  </div>
                  {event.registrationLink ? (
                    <a href={event.registrationLink} target="_blank" rel="noopener noreferrer">
                      <Button className="w-full">Register Now</Button>
                    </a>
                  ) : (
                    <Link href={`/events/${event.slug?.current}`}>
                      <Button className="w-full" variant="outline">View Details</Button>
                    </Link>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section - Call to Action */}
      <section className="py-24 bg-gradient-to-r from-primary to-primary/80 text-white">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-5xl font-bold mb-6">Ready to Make a Difference?</h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Join SCDAN in our mission to transform dental care for special needs populations across Nigeria.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://forms.gle/Un9MsXCaccFyHAMW6" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-white text-primary hover:bg-slate-100 hover:scale-105 cursor-pointer font-semibold transition-all duration-200 w-full sm:w-auto">
                Become a Member
              </Button>
            </a>
            <Link href="/donate">
              <Button size="lg" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary hover:scale-105 cursor-pointer font-semibold transition-all duration-200 w-full sm:w-auto">
                Support Our Work
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "10+", label: "Members" },
              { number: "500+", label: "Patients Served" },
              { number: "10+", label: "Events Annually" },
              { number: "15+", label: "Years Strong" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">{stat.number}</div>
                <p className="text-slate-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
