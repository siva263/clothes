'use client'

import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    name: 'Priya Sharma',
    location: 'Mumbai, India',
    rating: 5,
    comment: 'Absolutely love the quality and fit of their clothes! The attention to detail is remarkable. Will definitely be ordering again.',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: 2,
    name: 'Rahul Verma',
    location: 'Delhi, India',
    rating: 4,
    comment: 'Great collection of formal wear. The navy blazer I purchased exceeded my expectations. Perfect for business meetings.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: 3,
    name: 'Anjali Patel',
    location: 'Bangalore, India',
    rating: 5,
    comment: 'The summer dress collection is amazing! Beautiful designs and comfortable fabric. Received so many compliments.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face'
  }
]

export default function Testimonials() {
  return (
    <section className="py-20 bg-primary-50">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-xl text-primary-600 max-w-2xl mx-auto">
            Real reviews from real customers who love our premium clothing
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={testimonial.id}
              className="bg-white p-6 rounded-lg shadow-sm border border-primary-100 animate-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Quote Icon */}
              <div className="mb-4">
                <Quote className="h-8 w-8 text-accent-600" />
              </div>

              {/* Rating */}
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < testimonial.rating
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-primary-300'
                    }`}
                  />
                ))}
              </div>

              {/* Comment */}
              <p className="text-primary-700 mb-6 italic">
                "{testimonial.comment}"
              </p>

              {/* Customer Info */}
              <div className="flex items-center">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-3"
                />
                <div>
                  <div className="font-semibold text-primary-900">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-primary-600">
                    {testimonial.location}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="mt-16 text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-accent-600 mb-2">50K+</div>
              <div className="text-primary-600">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent-600 mb-2">4.8</div>
              <div className="text-primary-600">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent-600 mb-2">500+</div>
              <div className="text-primary-600">Products</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent-600 mb-2">100%</div>
              <div className="text-primary-600">Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
