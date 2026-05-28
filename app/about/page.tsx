import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Users, Target, Eye, Heart, Award, Globe, ArrowRight, ChevronRight, Zap } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="pt-20 pb-12 bg-gradient-to-br from-primary/10 to-transparent">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
              About <span className="text-primary">SCDAN</span>
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed">
              Special Care Dentistry Association of Nigeria is dedicated to advancing oral health for individuals with special healthcare needs through professional excellence, advocacy, and community empowerment.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision - Side by Side */}
      <section className="py-20 bg-white">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Mission */}
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-10 border border-primary/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">Our Mission</h2>
              </div>
              <div className="text-lg text-slate-700 leading-relaxed space-y-3">
                <p>• To provide the opportunity for integration of special care dentistry in standard dental practices for better access of people with special health care needs</p>
                <p>• To conduct oral health education programs for the promotion of oral health awareness on special health care needs</p>
                <p>• To create a forum of communication among oral healthcare professionals, experts and caregivers</p>
                <p>• To encourage research on special health care needs</p>
                <p>• To establish alliances with national and international governmental and non-governmental bodies in order to advocate for holistic healthcare</p>
              </div>
            </div>

            {/* Vision */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                  <Eye className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold">Our Vision</h2>
              </div>
              <p className="text-lg text-slate-200 leading-relaxed">
                To improve the oral health and quality of life for individuals with physical, sensory, intellectual or medical impairments and advocate for equitable oral healthcare outcomes for people with special health care needs
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values - Professional Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="text-4xl font-bold text-slate-900 text-center mb-16">Core Values</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              {
                icon: Users,
                title: "Inclusivity and Equity",
                desc: "Quality oral healthcare is a fundamental human right. We ensure equal access regardless of physical, sensory or intellectual impairments."
              },
              {
                icon: Heart,
                title: "Compassion and Dignity",
                desc: "We treat patients with empathy, understanding and respect; giving value to autonomy, dignity and confidentiality."
              },
              {
                icon: Award,
                title: "Excellence and Lifelong Learning",
                desc: "We maintain the highest standards of clinical care, professional development and training in special care dentistry."
              },
              {
                icon: Target,
                title: "Advocacy and Empowerment",
                desc: "We dismantle access barriers in communication, finance and awareness; advocating for policies that integrate oral health."
              },
              {
                icon: Globe,
                title: "Holistic Care",
                desc: "We collaborate among dentists, allied health professionals and caregivers; recognizing oral health's impact on overall quality of life."
              },
            ].map((value, i) => (
              <div key={i} className="group">
                <div className="bg-white border border-slate-200 rounded-2xl p-6 h-full transition-all hover:shadow-md hover:border-primary/30">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/15 transition">
                    <value.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-3">{value.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{value.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-20 bg-white">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-3">Leadership Team</h2>
            <p className="text-lg text-slate-600">Meet the dedicated professionals leading SCDAN</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Prof. Folakemi Oredugba", position: "President", image: "/scdan-about.webp" },
              { name: "Dr. Ronke Oluwo", position: "Vice President", image: "/scdan-about.webp" },
              { name: "Dr. Tunde Akinyele", position: "Secretary General", image: "/scdan-about.webp" },
              { name: "Dr. Dipo Ayedun", position: "Treasurer", image: "/scdan-about.webp" },
            ].map((leader, i) => (
              <div key={i} className="text-center group">
                <div className="relative mb-6 overflow-hidden rounded-2xl">
                  <Image
                    src={leader.image}
                    alt={leader.name}
                    width={250}
                    height={250}
                    className="w-full aspect-square object-cover group-hover:scale-105 transition duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition"></div>
                </div>
                <h3 className="font-bold text-lg text-slate-900 mb-1">{leader.name}</h3>
                <p className="text-primary font-semibold">{leader.position}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Members Directory */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-bold text-slate-900 mb-3">Our Members</h2>
              <p className="text-lg text-slate-600">Dental professionals committed to special care dentistry</p>
            </div>
            <span className="text-3xl font-bold text-primary">500+</span>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Dr. Emeka Nwankwo", specialty: "Pediatric Special Care", location: "Lagos" },
              { name: "Dr. Kemi Oladele", specialty: "Geriatric Dentistry", location: "Abuja" },
              { name: "Dr. Ibrahim Suleiman", specialty: "Disability Dental Care", location: "Kano" },
              { name: "Dr. Grace Okafor", specialty: "Behavioral Management", location: "Port Harcourt" },
              { name: "Dr. Yusuf Abdullahi", specialty: "Sedation Dentistry", location: "Kaduna" },
              { name: "Dr. Folake Adebisi", specialty: "Oral Medicine", location: "Ibadan" },
            ].map((member, i) => (
              <Card key={i} className="hover:shadow-lg transition-all border-slate-200">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <Image
                      src="/scdan-logo.jpg"
                      alt={member.name}
                      width={60}
                      height={60}
                      className="rounded-full"
                    />
                    <div className="flex-1">
                      <h4 className="font-bold text-slate-900">{member.name}</h4>
                      <p className="text-sm text-primary font-semibold">{member.specialty}</p>
                      <p className="text-xs text-slate-500 mt-1">{member.location}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-20 bg-white">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="text-4xl font-bold text-slate-900 text-center mb-16">What We Do</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Professional Education",
                desc: "Providing continuing education and training programs for dental professionals to enhance their skills in special care dentistry.",
                icon: "🎓"
              },
              {
                title: "Community Outreach",
                desc: "Organizing community programs and mobile dental services to reach underserved populations with special needs.",
                icon: "🤝"
              },
              {
                title: "Research & Advocacy",
                desc: "Conducting research and advocating for policies that improve access to quality dental care for special needs patients.",
                icon: "📊"
              },
            ].map((item, i) => (
              <div key={i} className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-8 border border-slate-200">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-700 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join CTA */}
      <section className="py-24 bg-gradient-to-r from-primary to-primary/80 text-white">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-5xl font-bold mb-6">Join Our Community</h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Become part of Nigeria's leading organization dedicated to transforming dental care for special needs populations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-primary hover:bg-slate-100 font-semibold">
              Become a Member
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              Learn More
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
