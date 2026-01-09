'use client'

import { useState } from 'react'
import { ArrowRight, Play } from 'lucide-react'
import Link from 'next/link'

export default function HeroSection() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-gradient-to-br from-primary-900 to-primary-700 opacity-90" />
        <img 
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&h=1080&fit=crop"
          alt="Hero background"
          className="w-full h-full object-cover opacity-30"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-in">
          <span className="block">Timeless Style</span>
          <span className="block text-accent-400">Modern Elegance</span>
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 text-primary-100 max-w-2xl mx-auto animate-in" style={{ animationDelay: '0.2s' }}>
          Discover our premium collection of clothing designed for the modern individual who values quality, comfort, and sustainable fashion.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in" style={{ animationDelay: '0.4s' }}>
          <Link href="/products" className="btn-primary inline-flex items-center justify-center hover-lift">
            Shop Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
          
          <button 
            onClick={() => setIsVideoPlaying(true)}
            className="btn-secondary inline-flex items-center justify-center hover-lift"
          >
            <Play className="mr-2 h-5 w-5" />
            Watch Collection
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 mt-16 animate-in" style={{ animationDelay: '0.6s' }}>
          <div>
            <div className="text-3xl font-bold text-accent-400">500+</div>
            <div className="text-primary-200">Premium Products</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-accent-400">50k+</div>
            <div className="text-primary-200">Happy Customers</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-accent-400">100%</div>
            <div className="text-primary-200">Sustainable</div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {isVideoPlaying && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
          <div className="relative w-full max-w-4xl mx-4">
            <button 
              onClick={() => setIsVideoPlaying(false)}
              className="absolute -top-12 right-0 text-white hover:text-accent-400 transition-colors"
            >
              Close
            </button>
            <div className="aspect-video bg-primary-800 rounded-lg flex items-center justify-center">
              <p className="text-primary-300">Video placeholder - Add your brand video here</p>
            </div>
          </div>
        </div>
      )}

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  )
}
