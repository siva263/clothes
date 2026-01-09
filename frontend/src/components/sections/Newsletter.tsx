'use client'

import { useState } from 'react'
import { Mail, Send } from 'lucide-react'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email) return

    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsSubscribed(true)
      setIsLoading(false)
      setEmail('')
      
      // Reset success message after 3 seconds
      setTimeout(() => setIsSubscribed(false), 3000)
    }, 1000)
  }

  return (
    <section className="py-20 bg-primary-900 text-white">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">
            Stay in Style
          </h2>
          <p className="text-xl text-primary-200 mb-8">
            Subscribe to our newsletter for exclusive offers, new arrivals, and style tips
          </p>

          {!isSubscribed ? (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <div className="flex-1 relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-primary-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-4 py-3 bg-primary-800 border border-primary-700 rounded-md text-white placeholder-primary-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="btn-accent px-6 py-3 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center"
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <>
                    Subscribe
                    <Send className="ml-2 h-4 w-4" />
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="bg-accent-600 text-white px-6 py-4 rounded-md inline-block animate-in">
              <div className="flex items-center">
                <Send className="h-5 w-5 mr-2" />
                Successfully subscribed! Check your email for confirmation.
              </div>
            </div>
          )}

          <div className="mt-6 text-sm text-primary-300">
            By subscribing, you agree to our Privacy Policy and Terms of Service.
            <br />
            Unsubscribe at any time.
          </div>

          {/* Social Links */}
          <div className="mt-8 flex justify-center space-x-6">
            <a 
              href="#" 
              className="text-primary-300 hover:text-white transition-colors"
              aria-label="Facebook"
            >
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12 5.373 12 12 12zm-6.508-4.747c.0-.445-.016-.896-.048-1.34-.688.156-1.428.156-2.128 0-3.016-1.565-3.016-3.584 0-1.398.862-2.589 2.08-3.114.203-.099.417-.156.643-.156.965 0 .667.338 1.257.852 1.601-1.565.095-3.083.095-4.647 0-.085.006-.168.018-.252.018-.626 0-1.197.237-1.632.617-.435.38-.689.887-.689 1.532 0 .921.558 1.713 1.354 1.893-.135.033-.273.05-.413.05-.198 0-.385-.074-.756-.208-1.102.733-.233 1.399-.731 1.399-1.632 0-1.218-.889-2.235-2.054-2.43.2-.11.43-.115.637-.115.966 0 2.52 2.03 4.563 4.563 4.563 2.563 0 4.563-2.043 4.563-4.563 0-.413-.054-.813-.156-1.193 1.632-.626 2.743-2.155 2.743-3.935 0-2.488-2.018-4.504-4.504-4.504zm-4.504 4.504c0 1.657 1.347 3.004 3.004 3.004s3.004-1.347 3.004-3.004-1.347-3.004-3.004-3.004-3.004 1.347-3.004 3.004z"/>
              </svg>
            </a>
            <a 
              href="#" 
              className="text-primary-300 hover:text-white transition-colors"
              aria-label="Instagram"
            >
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 1.857.125.148.225.268.298.395.1.13.197.248.353.415.1.165.205.374.376.654.629.28.228.495.466.857.745 1.215.245.401.54.876.653 1.379.098.332.198.653.298.979.098.326.198.653.298.979 0 .074-.004.148-.01.222-.015 1.265.828 2.815 1.639 4.485 1.639 3.204 0 3.584-.012 4.85-.07 3.252-.148 4.771-1.691 4.919-1.857.147-.125.268-.247.398-.398.1-.13.197-.248.353-.415.1-.165.205-.374.376-.654.629-.28.228-.495-.466-.857-.745-1.215-.245-.401-.54-.876-.653-1.379-.098-.332-.198-.653-.298-.979-.098-.326-.198-.653-.298-.979 0-.074.004-.148.01-.222.015-1.265-.828-2.815-1.639-4.485-1.639-3.204 0-3.584.012-4.85.07-3.252.148-4.771 1.691-4.919 1.857-.147.125-.268.247-.398.398-.1.13-.197.248-.353.415-.1.165-.205.374-.376.654-.629.28-.228.495-.466.857-.745 1.215-.245.401-.54.876-.653 1.379-.098.332-.198.653-.298.979-.098.326-.198.653-.298.979zm4.648 3.094c0-1.657-1.347-3.004-3.004-3.004s-3.004 1.347-3.004 3.004 1.347 3.004 3.004 3.004 3.004-1.347 3.004-3.004z"/>
              </svg>
            </a>
            <a 
              href="#" 
              className="text-primary-300 hover:text-white transition-colors"
              aria-label="Twitter"
            >
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-4.594 6.803A13.978 13.978 0 011.671 5.908a4.9 4.9 0 001.525 6.574c-.166-.4-.237-.876-.236-1.366 0-1.453.735-2.724 1.85-3.472a4.9 4.9 0 012.16-3.472c-.426.015-.848.06-1.26.15a4.9 4.9 0 014.084 2.812 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 4.227 13.978 13.978 0 008.504-2.92 9.867 9.867 0 004.02-8.136 4.9 4.9 0 00-1.567-3.472z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
