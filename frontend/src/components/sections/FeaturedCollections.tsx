'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const collections = [
  {
    id: 'men',
    name: 'Men Collection',
    description: 'Sophisticated styles for the modern gentleman',
    image: 'https://images.unsplash.com/photo-1520975916090-3105956dac38?w=600&h=800&fit=crop&auto=format&q=80',
    slug: 'men'
  },
  {
    id: 'women',
    name: 'Women Collection',
    description: 'Elegant designs for the contemporary woman',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&h=800&fit=crop',
    slug: 'women'
  },
  {
    id: 'accessories',
    name: 'Accessories',
    description: 'Complete your look with our premium accessories',
    image: 'https://images.unsplash.com/photo-1524863479829-916d8e77f114?w=600&h=800&fit=crop',
    slug: 'accessories'
  }
]

export default function FeaturedCollections() {
  return (
    <section className="py-20 bg-primary-50">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary-900 mb-4">
            Shop by Collection
          </h2>
          <p className="text-xl text-primary-600 max-w-2xl mx-auto">
            Explore our carefully curated collections designed to elevate your style
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {collections.map((collection, index) => (
            <div 
              key={collection.id} 
              className="group relative overflow-hidden rounded-lg shadow-lg hover-lift animate-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image */}
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={collection.image}
                  alt={collection.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-0 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-2xl font-bold mb-2">{collection.name}</h3>
                <p className="text-primary-100 mb-4">{collection.description}</p>
                
                <Link 
                  href={`/products?category=${collection.slug}`}
                  className="inline-flex items-center text-white hover:text-accent-400 transition-colors"
                >
                  Shop Collection
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link 
            href="/products"
            className="btn-secondary inline-flex items-center hover-lift"
          >
            View All Products
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
