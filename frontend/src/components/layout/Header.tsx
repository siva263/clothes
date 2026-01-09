'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, ShoppingCart, User, Search } from 'lucide-react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="text-2xl font-bold text-gradient">
              PREMIUM
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/products" 
              className="text-primary-700 hover:text-accent-600 transition-colors font-medium"
            >
              Shop
            </Link>
            <Link 
              href="/categories/men" 
              className="text-primary-700 hover:text-accent-600 transition-colors font-medium"
            >
              Men
            </Link>
            <Link 
              href="/categories/women" 
              className="text-primary-700 hover:text-accent-600 transition-colors font-medium"
            >
              Women
            </Link>
            <Link 
              href="/categories/accessories" 
              className="text-primary-700 hover:text-accent-600 transition-colors font-medium"
            >
              Accessories
            </Link>
            <Link 
              href="/about" 
              className="text-primary-700 hover:text-accent-600 transition-colors font-medium"
            >
              About
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="p-2 text-primary-600 hover:text-accent-600 transition-colors">
              <Search className="h-5 w-5" />
            </button>
            
            <Link href="/account" className="p-2 text-primary-600 hover:text-accent-600 transition-colors">
              <User className="h-5 w-5" />
            </Link>
            
            <Link href="/cart" className="p-2 text-primary-600 hover:text-accent-600 transition-colors relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-accent-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-primary-600 hover:text-accent-600 transition-colors"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white border-t border-primary-100 shadow-lg">
            <nav className="flex flex-col p-4 space-y-3">
              <Link 
                href="/products" 
                className="text-primary-700 hover:text-accent-600 transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Shop
              </Link>
              <Link 
                href="/categories/men" 
                className="text-primary-700 hover:text-accent-600 transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Men
              </Link>
              <Link 
                href="/categories/women" 
                className="text-primary-700 hover:text-accent-600 transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Women
              </Link>
              <Link 
                href="/categories/accessories" 
                className="text-primary-700 hover:text-accent-600 transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Accessories
              </Link>
              <Link 
                href="/about" 
                className="text-primary-700 hover:text-accent-600 transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              
              <div className="border-t border-primary-100 pt-3 mt-3 flex space-x-4">
                <button className="p-2 text-primary-600 hover:text-accent-600 transition-colors">
                  <Search className="h-5 w-5" />
                </button>
                
                <Link href="/account" className="p-2 text-primary-600 hover:text-accent-600 transition-colors">
                  <User className="h-5 w-5" />
                </Link>
                
                <Link href="/cart" className="p-2 text-primary-600 hover:text-accent-600 transition-colors relative">
                  <ShoppingCart className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 bg-accent-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    0
                  </span>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
