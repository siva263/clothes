'use client'

import Link from 'next/link'
import { Star, Heart, ShoppingCart } from 'lucide-react'
import { Product } from '@/types'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <div className="group animate-in">
      <div className="card hover-lift">
        {/* Product Image */}
        <div className="relative aspect-[3/4] overflow-hidden">
          <Link href={`/products/${product.slug}`}>
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </Link>
          
          {/* Badge */}
          {discount > 0 && (
            <div className="absolute top-4 left-4 bg-accent-600 text-white px-2 py-1 rounded-md text-sm font-medium">
              {discount}% OFF
            </div>
          )}

          {/* Actions */}
          <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button className="p-2 bg-white rounded-full shadow-md hover:bg-primary-50 transition-colors">
              <Heart className="h-4 w-4 text-primary-600" />
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
}
