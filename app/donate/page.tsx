import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Heart, Users, Stethoscope, Award, CreditCard, Shield } from "lucide-react"
import Image from "next/image"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function DonatePage() {
  const donationTiers = [
    {
      amount: "₦5,000",
      title: "Supporter",
      description: "Provides basic dental supplies for one patient",
      icon: Heart,
      color: "bg-primary/10 text-primary",
    },
    {
      amount: "₦15,000",
      title: "Advocate",
      description: "Funds dental care for three special needs patients",
      icon: Users,
      color: "bg-green-100 text-green-600",
    },
    {
      amount: "₦25,000",
      title: "Champion",
      description: "Sponsors a dental professional's training program",
      icon: Stethoscope,
      color: "bg-orange-100 text-orange-600",
    },
    {
      amount: "₦50,000",
      title: "Guardian",
      description: "Funds a complete community outreach program",
      icon: Award,
      color: "bg-purple-100 text-purple-600",
    },
  ]

  const impactStats = [
    {
      number: "2,500+",
      label: "Patients Treated",
      description: "Special needs patients who received care through donations",
    },
    {
      number: "150+",
      label: "Professionals Trained",
      description: "Dental professionals equipped with special care skills",
    },
    {
      number: "25",
      label: "Communities Reached",
      description: "Underserved communities with mobile dental services",
    },
    {
      number: "₦5M+",
      label: "Total Impact",
      description: "Value of care provided through donor support",
    },
  ]

  const testimonials = [
    {
      name: "Mrs. Adunni Okafor",
      role: "Parent",
      content:
        "Thanks to SCDAN's mobile unit, my autistic son received his first proper dental care. The team was so patient and understanding.",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      name: "Dr. Kemi Adebayo",
      role: "Rural Dentist",
      content:
        "The training I received through SCDAN's donor-funded program transformed how I care for special needs patients in my community.",
      image: "/placeholder.svg?height=80&width=80",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary/80 text-white">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge className="bg-primary/90 text-white">Make a Difference</Badge>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">Your Donation Changes Lives</h1>
              <p className="text-xl text-primary-foreground/80 leading-relaxed">
                Support SCDAN's mission to provide quality dental care to individuals with special healthcare needs
                across Nigeria. Every donation directly impacts a life.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
                  <Heart className="mr-2 h-5 w-5" />
                  Donate Now
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-primary/80 bg-transparent"
                >
                  Learn About Impact
                </Button>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/placeholder.svg?height=500&width=500"
                alt="Impact of donations"
                width={500}
                height={500}
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Impact Statistics */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Your Impact in Numbers</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how donations have transformed lives and communities across Nigeria
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {impactStats.map((stat, index) => (
              <Card key={index} className="border-0 shadow-lg text-center">
                <CardHeader className="pb-4">
                  <div className="text-4xl font-bold text-primary mb-2">{stat.number}</div>
                  <CardTitle className="text-lg text-gray-900">{stat.label}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">{stat.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Donation Tiers */}
      <section className="py-16 bg-white">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Choose Your Impact Level</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Every contribution makes a difference. Choose the level that works for you.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {donationTiers.map((tier, index) => (
              <Card
                key={index}
                className="border-2 border-gray-200 hover:border-primary hover:shadow-lg transition-all cursor-pointer"
              >
                <CardHeader className="text-center pb-4">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${tier.color}`}>
                    <tier.icon className="h-8 w-8" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{tier.amount}</div>
                  <CardTitle className="text-xl text-gray-900">{tier.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-gray-600 mb-6">{tier.description}</CardDescription>
                  <Button className="w-full bg-primary hover:bg-primary/90">Select Amount</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Donation Form */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Make Your Donation</h2>
            <p className="text-xl text-gray-600">Complete your donation securely and help us continue our mission</p>
          </div>
          <Card className="border-0 shadow-xl">
            <CardHeader className="bg-primary text-white text-center">
              <CardTitle className="text-2xl">Donation Form</CardTitle>
              <CardDescription className="text-primary-foreground/80">
                Your contribution is secure and tax-deductible
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <form className="space-y-6">
                {/* Donation Type */}
                <div className="space-y-3">
                  <Label className="text-lg font-medium">Donation Type</Label>
                  <RadioGroup defaultValue="one-time" className="flex gap-6">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="one-time" id="one-time" />
                      <Label htmlFor="one-time">One-time</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="monthly" id="monthly" />
                      <Label htmlFor="monthly">Monthly</Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Amount Selection */}
                <div className="space-y-3">
                  <Label className="text-lg font-medium">Donation Amount</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {["₦5,000", "₦15,000", "₦25,000", "₦50,000"].map((amount) => (
                      <Button
                        key={amount}
                        type="button"
                        variant="outline"
                        className="h-12 border-2 hover:border-primary hover:bg-primary/5 bg-transparent"
                      >
                        {amount}
                      </Button>
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg">₦</span>
                    <Input type="number" placeholder="Enter custom amount" className="flex-1" />
                  </div>
                </div>

                {/* Personal Information */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input id="firstName" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input id="lastName" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input id="email" type="email" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" />
                </div>

                {/* Dedication */}
                <div className="space-y-2">
                  <Label htmlFor="dedication">Dedication (Optional)</Label>
                  <Textarea id="dedication" placeholder="In honor of... or In memory of..." rows={3} />
                </div>

                {/* Payment Method */}
                <div className="space-y-3">
                  <Label className="text-lg font-medium">Payment Method</Label>
                  <div className="grid md:grid-cols-3 gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      className="h-16 border-2 hover:border-primary bg-transparent hover:bg-primary/5"
                    >
                      <CreditCard className="mr-2 h-5 w-5" />
                      Credit Card
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="h-16 border-2 hover:border-primary bg-transparent hover:bg-primary/5"
                    >
                      Bank Transfer
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="h-16 border-2 hover:border-primary bg-transparent hover:bg-primary/5"
                    >
                      Mobile Money
                    </Button>
                  </div>
                </div>

                {/* Terms and Newsletter */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="newsletter" />
                    <Label htmlFor="newsletter" className="text-sm">
                      Subscribe to our newsletter for updates on our impact
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" required />
                    <Label htmlFor="terms" className="text-sm">
                      I agree to the terms and conditions *
                    </Label>
                  </div>
                </div>

                {/* Security Notice */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-green-600" />
                    <div className="text-sm text-green-800">
                      <strong>Secure Donation:</strong> Your payment information is encrypted and secure. We never store
                      your payment details.
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90 text-lg py-6">
                  <Heart className="mr-2 h-5 w-5" />
                  Complete Donation
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Stories of Impact</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from those whose lives have been touched by your generosity
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <Image
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      width={60}
                      height={60}
                      className="rounded-full"
                    />
                    <div className="flex-1">
                      <p className="text-gray-600 italic mb-4">"{testimonial.content}"</p>
                      <div>
                        <div className="font-semibold text-gray-900">{testimonial.name}</div>
                        <div className="text-sm text-gray-500">{testimonial.role}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Other Ways to Help */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Other Ways to Support SCDAN</h2>
            <p className="text-xl text-primary-foreground/80 max-w-3xl mx-auto">
              There are many ways to contribute to our mission beyond monetary donations
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-primary/90 border-0 text-white">
              <CardHeader className="text-center">
                <Users className="h-12 w-12 mx-auto mb-4 text-primary-foreground/70" />
                <CardTitle className="text-xl">Volunteer</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-primary-foreground/80 mb-4">
                  Join our volunteer team and directly help with community outreach programs
                </CardDescription>
                <Button variant="outline" className="border-white text-white hover:bg-primary/80 bg-transparent">
                  Learn More
                </Button>
              </CardContent>
            </Card>
            <Card className="bg-primary/90 border-0 text-white">
              <CardHeader className="text-center">
                <Stethoscope className="h-12 w-12 mx-auto mb-4 text-primary-foreground/70" />
                <CardTitle className="text-xl">Professional Services</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-primary-foreground/80 mb-4">
                  Donate your professional dental services to our community programs
                </CardDescription>
                <Button variant="outline" className="border-white text-white hover:bg-primary/80 bg-transparent">
                  Get Involved
                </Button>
              </CardContent>
            </Card>
            <Card className="bg-primary/90 border-0 text-white">
              <CardHeader className="text-center">
                <Award className="h-12 w-12 mx-auto mb-4 text-primary-foreground/70" />
                <CardTitle className="text-xl">Corporate Partnership</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-primary-foreground/80 mb-4">
                  Partner with us as a corporate sponsor for events and programs
                </CardDescription>
                <Button variant="outline" className="border-white text-white hover:bg-primary/80 bg-transparent">
                  Partner With Us
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
