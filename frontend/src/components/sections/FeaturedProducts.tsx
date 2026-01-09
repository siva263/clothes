'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Star, Heart, ShoppingCart } from 'lucide-react'

type Product = {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string | string[]
  category: string
  rating: number
  reviews: number
  slug: string
}

const featuredProducts: Product[] = [
  {
    id: '1',
    name: 'Classic White Shirt',
    price: 2999,
    originalPrice: 3999,
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=500&fit=crop',
    category: 'Men',
    rating: 4.5,
    reviews: 128,
    slug: 'classic-white-shirt'
  },
  {
    id: '2',
    name: 'Floral Summer Dress',
    price: 3499,
    originalPrice: 4999,
    image: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=400&h=500&fit=crop',
    category: 'Women',
    rating: 4.8,
    reviews: 89,
    slug: 'floral-summer-dress'
  },
  {
    id: '3',
    name: 'Navy Blue Blazer',
    price: 4999,
    originalPrice: 6999,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop',
    category: 'Men',
    rating: 4.7,
    reviews: 156,
    slug: 'navy-blue-blazer'
  },
  {
    id: '4',
    name: 'Leather Belt',
    price: 1499,
    originalPrice: 1999,
    image: 'https://images.unsplash.com/photo-1705493655920-20c572928501?w=400&h=5fit=crop',
    category: 'Accessories',
    rating: 4.6,
    reviews: 203,
    slug: 'leather-belt'
  }
]

export default function FeaturedProducts() {
  const [wishlist, setWishlist] = useState<string[]>([])

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    )
  }

  return (
    <section className="py-20 bg-white">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary-900 mb-4">
            Featured Products
          </h2>
          <p className="text-xl text-primary-600 max-w-2xl mx-auto">
            Discover our handpicked selection of premium pieces
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product, index) => {
            const imageSrc = Array.isArray(product.image)
              ? (product.image.length > 0 ? product.image[0] : '/sections/photos.jpg')
              : product.image

            return (
              <div 
                key={product.id} 
                className="group animate-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="card hover-lift">
                  {/* Product Image */}
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <img
                      src={imageSrc}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    {/* Badge */}
                    {product.originalPrice && (
                      <div className="absolute top-4 left-4 bg-accent-600 text-white px-2 py-1 rounded-md text-sm font-medium">
                        {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                      </div>
                    )}

                    {/* Actions */}
                    <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button
                        onClick={() => toggleWishlist(product.id)}
                        className="p-2 bg-white rounded-full shadow-md hover:bg-primary-50 transition-colors"
                      >
                        <Heart 
                          className={`h-4 w-4 ${wishlist.includes(product.id) ? 'fill-red-500 text-red-500' : 'text-primary-600'}`}
                        />
                      </button>
                    </div>

                    {/* Quick Add */}
                    <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button className="w-full btn-primary text-sm py-2">
                        <ShoppingCart className="h-4 w-4 mr-2 inline" />
                        Quick Add
                      </button>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-4">
                    <div className="text-sm text-primary-600 mb-1">{product.category}</div>
                    <h3 className="font-semibold text-primary-900 mb-2 group-hover:text-accent-600 transition-colors">
                      <Link href={`/products/${product.slug}`}>
                        {product.name}
                      </Link>
                    </h3>
                    
                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(product.rating)
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-primary-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-primary-600">
                        {product.rating} ({product.reviews})
                      </span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-primary-900">
                        ₹{product.price.toLocaleString()}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-primary-500 line-through">
                          ₹{product.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link 
            href="/products"
            className="btn-primary inline-flex items-center hover-lift"
          >
            Shop All Products
          </Link>
        </div>
      </div>
    </section>
  )
}
