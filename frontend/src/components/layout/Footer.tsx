import Link from 'next/link'
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-primary-900 text-white">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Premium Brand</h3>
            <p className="text-primary-300 mb-4">
              Discover timeless elegance and modern style with our premium collection of clothing for men and women.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-primary-400 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-primary-400 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-primary-400 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/products" className="text-primary-300 hover:text-white transition-colors">
                  Shop All
                </Link>
              </li>
              <li>
                <Link href="/categories/men" className="text-primary-300 hover:text-white transition-colors">
                  Men's Collection
                </Link>
              </li>
              <li>
                <Link href="/categories/women" className="text-primary-300 hover:text-white transition-colors">
                  Women's Collection
                </Link>
              </li>
              <li>
                <Link href="/categories/accessories" className="text-primary-300 hover:text-white transition-colors">
                  Accessories
                </Link>
              </li>
              <li>
                <Link href="/sale" className="text-primary-300 hover:text-white transition-colors">
                  Sale
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/contact" className="text-primary-300 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-primary-300 hover:text-white transition-colors">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link href="/size-guide" className="text-primary-300 hover:text-white transition-colors">
                  Size Guide
                </Link>
              </li>
              <li>
                <Link href="/care" className="text-primary-300 hover:text-white transition-colors">
                  Product Care
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-primary-300 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Get in Touch</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-primary-400" />
                <span className="text-primary-300">support@premiumbrand.com</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-primary-400" />
                <span className="text-primary-300">+91 98765 43210</span>
              </div>
              <div className="flex items-start">
                <MapPin className="h-4 w-4 mr-2 text-primary-400 mt-1" />
                <span className="text-primary-300">
                  123 Fashion Street<br />
                  Mumbai, Maharashtra 400001<br />
                  India
                </span>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="mt-6">
              <h4 className="text-sm font-semibold mb-2">We Accept</h4>
              <div className="flex space-x-2">
                <div className="bg-white text-primary-900 px-2 py-1 rounded text-xs font-medium">
                  VISA
                </div>
                <div className="bg-white text-primary-900 px-2 py-1 rounded text-xs font-medium">
                  MASTERCARD
                </div>
                <div className="bg-white text-primary-900 px-2 py-1 rounded text-xs font-medium">
                  RAZORPAY
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-800">
        <div className="container py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-primary-400 text-sm mb-4 md:mb-0">
              © 2024 Premium Brand. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy" className="text-primary-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-primary-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/refund" className="text-primary-400 hover:text-white transition-colors">
                Refund Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
