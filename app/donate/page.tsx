export const dynamic = 'force-dynamic'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Heart, Check, Users, Award, TrendingUp, ArrowRight } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Image from "next/image"

export default function DonatePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-16 bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
        </div>

        <div className="relative container mx-auto max-w-6xl px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Make a <span className="text-primary">Real Impact</span>
            </h1>
            <p className="text-xl text-slate-300 leading-relaxed">
              Every donation directly transforms the lives of special needs patients across Nigeria, providing access to quality dental care they deserve.
            </p>
          </div>
        </div>
      </section>

      {/* Impact Numbers */}
      <section className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-3 md:grid-cols-5 gap-6">
            {[
              { number: "500+", label: "Patients Treated" },
              { number: "10+", label: "Members" },
              { number: "₦500K+", label: "Donated" },
              { number: "15+", label: "Years Active" },
              { number: "100%", label: "Impact Focused" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-primary mb-1">{stat.number}</div>
                <p className="text-xs md:text-sm text-slate-600 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Donation Tiers */}
      {/* <section className="py-20 bg-white">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Choose Your Impact Level</h2>
            <p className="text-lg text-slate-600">Select how you'd like to make a difference</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                amount: "₦20,000",
                title: "Supporter",
                impact: "Provides dental supplies for 1 patient",
                features: ["Emergency dental care", "Supply kit", "Impact report"]
              },
              {
                amount: "₦60,000",
                title: "Advocate",
                impact: "Treats 3 special needs patients",
                features: ["Full dental treatment", "Follow-up care", "Monthly updates"]
              },
              {
                amount: "₦100,000",
                title: "Champion",
                impact: "Sponsors professional training",
                features: ["Practitioner training", "Certification program", "Quarterly report"]
              },
              {
                amount: "Custom",
                title: "Guardian",
                impact: "Fund a complete outreach program. Contact us to agree an amount.",
                features: ["Community program", "Team support", "Annual recognition"]
              },
            ].map((tier, i) => (
              <div key={i} className={`rounded-2xl overflow-hidden transition-all hover:shadow-xl ${
                i === 2 ? 'ring-2 ring-primary md:scale-105' : ''
              }`}>
                <div className={`p-8 ${i === 2 ? 'bg-gradient-to-br from-primary to-primary/80 text-white' : 'bg-slate-50'}`}>
                  {i === 2 && <div className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm font-semibold mb-4">Most Popular</div>}

                  <div className={`text-4xl font-bold mb-2 ${i === 2 ? 'text-white' : 'text-primary'}`}>
                    {tier.amount}
                  </div>
                  <h3 className={`text-2xl font-bold mb-2 ${i === 2 ? 'text-white' : 'text-slate-900'}`}>
                    {tier.title}
                  </h3>
                  <p className={`text-sm mb-6 ${i === 2 ? 'text-white/90' : 'text-slate-600'}`}>
                    {tier.impact}
                  </p>

                  <Button className={`w-full mb-6 font-semibold ${
                    i === 2
                      ? 'bg-white text-primary hover:bg-slate-100'
                      : 'bg-primary text-white hover:bg-primary/90'
                  }`}>
                    Donate Now
                    <Heart className="ml-2 h-4 w-4" />
                  </Button>

                  <div className="space-y-3">
                    {tier.features.map((feature, j) => (
                      <div key={j} className="flex items-center gap-3">
                        <Check className={`h-5 w-5 ${i === 2 ? 'text-white' : 'text-primary'}`} />
                        <span className={`text-sm ${i === 2 ? 'text-white/90' : 'text-slate-700'}`}>
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* How Donations Are Used */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="text-4xl font-bold text-slate-900 text-center mb-16">Where Your Money Goes</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Users,
                title: "Patient Care",
                percentage: "60%",
                description: "Direct dental treatment and care for special needs patients"
              },
              {
                icon: Award,
                title: "Research & Training",
                percentage: "25%",
                description: "Research funding and professional development for dental practitioners"
              },
              {
                icon: TrendingUp,
                title: "Community Programs",
                percentage: "15%",
                description: "Outreach initiatives and public health campaigns"
              },
            ].map((use, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <use.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-3xl font-bold text-primary">{use.percentage}</div>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{use.title}</h3>
                <p className="text-slate-600 leading-relaxed">{use.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story/Testimonial Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-slate-900 mb-6">Your Impact in Action</h2>
              <blockquote className="text-xl text-slate-700 leading-relaxed mb-8 border-l-4 border-primary pl-6 italic">
                "Thanks to SCDAN and our donors, I was finally able to receive dental care. For years I thought I'd never be able to smile again. Now my confidence is restored."
              </blockquote>
              <p className="font-semibold text-slate-900">- Chioma, 28</p>
              <p className="text-slate-600">Patient, Lagos</p>
            </div>
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-12">
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                    <Check className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">100% Transparent</h4>
                    <p className="text-slate-600">Full financial accountability and impact reporting</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                    <Check className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">Tax Deductible</h4>
                    <p className="text-slate-600">SCDAN is a registered NGO offering tax benefits</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                    <Check className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">Monthly Updates</h4>
                    <p className="text-slate-600">Receive impact reports showing how funds are used</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bank Account Details */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-primary to-primary/90 px-8 py-12 text-center">
                <h2 className="text-3xl font-bold text-white mb-2">Bank Transfer</h2>
                <p className="text-primary/90">Donate directly to our account</p>
              </div>

              {/* Content */}
              <div className="p-12">
                <div className="flex items-center justify-center mb-10">
                  <Image
                    src="/union-bank-logo.png"
                    alt="Union Bank of Nigeria"
                    width={120}
                    height={60}
                    className="h-14 w-auto"
                  />
                </div>

                <div className="space-y-8">
                  {/* Account Name */}
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Account Name</p>
                    <p className="text-xl font-bold text-slate-900">Special Care Dentistry Association of Nigeria</p>
                  </div>

                  <div className="border-t border-slate-200"></div>

                  {/* Account Number */}
                  <div className="text-center">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Account Number</p>
                    <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
                      <p className="text-3xl font-bold text-primary font-mono">0167563373</p>
                    </div>
                  </div>

                  <div className="border-t border-slate-200"></div>

                  {/* Bank */}
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Bank</p>
                    <p className="text-lg font-semibold text-slate-900">Union Bank of Nigeria</p>
                  </div>
                </div>

                {/* Footer Note */}
                <div className="mt-10 pt-8 border-t border-slate-200">
                  <p className="text-sm text-slate-600 text-center">
                    <span className="font-semibold text-slate-900">💡 Tip:</span> Use your name as the transaction reference for tracking purposes
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Donation Methods */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="text-4xl font-bold text-slate-900 text-center mb-16">Additional Ways to Support Us</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Direct Transfer",
                description: "Use the account details above for immediate bank transfers",
                method: "Instant",
              },
              {
                title: "Monthly Giving",
                description: "Set up automatic recurring donations via bank transfer",
                method: "Sustainable",
              },
              {
                title: "Corporate Partnership",
                description: "Partner with SCDAN for CSR initiatives and bulk donations",
                method: "Strategic",
              },
            ].map((method, i) => (
              <Card key={i} className="border-slate-200 hover:shadow-lg transition">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{method.title}</h3>
                  <p className="text-slate-600 mb-4">{method.description}</p>
                  <div className="inline-block px-3 py-1 bg-primary/10 rounded-full">
                    <span className="text-sm font-semibold text-primary">{method.method}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-gradient-to-r from-primary to-primary/80 text-white">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-5xl font-bold mb-6">Ready to Make a Difference?</h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Your donation today provides dental care to someone who needs it most. Join thousands of supporters transforming lives.
          </p>
          {/* <Button size="lg" className="bg-white text-primary hover:bg-slate-100 font-semibold">
            Donate Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button> */}
        </div>
      </section>

      <Footer />
    </div>
  )
}
