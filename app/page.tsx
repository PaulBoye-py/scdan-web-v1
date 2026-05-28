import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Users, Target, Zap, Heart, Calendar, Newspaper, ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function HomePage() {
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
                  Explore Our Services
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" className="border-slate-600 text-white hover:bg-slate-700">
                  Contact Us
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-700">
                <div>
                  <div className="text-3xl font-bold text-primary">500+</div>
                  <p className="text-sm text-slate-400">Active Members</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">10K+</div>
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

          {/* Featured News Card */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl overflow-hidden mb-8 shadow-xl">
            <div className="grid lg:grid-cols-2 gap-8 p-8 md:p-12">
              <div className="flex flex-col justify-center text-white">
                <div className="inline-flex w-fit gap-2 mb-4">
                  <span className="px-3 py-1 bg-primary/20 border border-primary/50 rounded-full text-sm font-semibold text-primary">Featured</span>
                </div>
                <h3 className="text-3xl font-bold mb-4">SCDAN Annual Conference 2024</h3>
                <p className="text-slate-300 mb-6 text-lg">Join us for our biggest event of the year featuring international speakers and cutting-edge research presentations in special care dentistry.</p>
                <div className="flex gap-4">
                  <Button className="bg-primary hover:bg-primary/90 text-white">Learn More</Button>
                </div>
              </div>
              <div className="relative rounded-xl overflow-hidden h-64 md:h-auto">
                <Image
                  src="/scdan-news.webp"
                  alt="Conference"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* News Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "New Guidelines Released", date: "Mar 10", icon: Newspaper },
              { title: "Outreach Program Expands", date: "Mar 5", icon: Users },
              { title: "Research Findings Published", date: "Feb 28", icon: Zap },
            ].map((item, i) => (
              <Card key={i} className="group hover:shadow-lg transition-all cursor-pointer border-slate-200">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-slate-500 mb-2">{item.date}</p>
                      <h4 className="font-bold text-slate-900 group-hover:text-primary transition">{item.title}</h4>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
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

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: "Annual Conference 2024", date: "March 20-22", location: "Lagos", attendees: "500+" },
              { title: "Community Health Fair", date: "April 15", location: "Abuja", attendees: "1000+" },
            ].map((event, i) => (
              <div key={i} className="bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-all border border-slate-200">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{event.title}</h3>
                    <div className="flex flex-wrap gap-4 text-sm text-slate-600">
                      <span className="flex items-center gap-1">📅 {event.date}</span>
                      <span className="flex items-center gap-1">📍 {event.location}</span>
                      <span className="flex items-center gap-1">👥 {event.attendees}</span>
                    </div>
                  </div>
                </div>
                <Button className="w-full mt-4">
                  Register Now
                </Button>
              </div>
            ))}
          </div>
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
            <Button size="lg" className="bg-white text-primary hover:bg-slate-100 font-semibold">
              Become a Member
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 font-semibold">
              <Link href="/donate">Support Our Work</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "500+", label: "Members" },
              { number: "10K+", label: "Patients Served" },
              { number: "50+", label: "Events Annually" },
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
