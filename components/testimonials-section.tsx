import { Card, CardContent } from '@/components/ui/card'
import { Star } from 'lucide-react'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity'
import { Testimonial } from '@/types/sanity'

interface TestimonialsSectionProps {
  testimonials: Testimonial[]
  layout?: 'grid' | 'carousel'
}

export default function TestimonialsSection({ testimonials, layout = 'grid' }: TestimonialsSectionProps) {
  if (!testimonials || testimonials.length === 0) {
    return null
  }

  const displayTestimonials = layout === 'carousel' ? testimonials.slice(0, 1) : testimonials.slice(0, 3)

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Patients Say</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real stories from the people we've helped through our special care dentistry services
          </p>
        </div>

        <div className={`${layout === 'grid' ? 'grid md:grid-cols-3 gap-8' : 'flex gap-8'}`}>
          {displayTestimonials.map((testimonial) => (
            <Card key={testimonial._id} className="border-0 shadow-lg">
              <CardContent className="pt-8">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <p className="text-gray-700 mb-6 italic">&quot;{testimonial.content}&quot;</p>

                <div className="flex items-center gap-4">
                  {testimonial.image && (
                    <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                      <Image
                        src={urlFor(testimonial.image).url()}
                        alt={testimonial.patientName}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.patientName}</p>
                    {testimonial.date && (
                      <p className="text-sm text-gray-600">{new Date(testimonial.date).toLocaleDateString()}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
