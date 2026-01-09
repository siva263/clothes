'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Star, Heart, ShoppingCart, Minus, Plus, Truck, Shield, RefreshCw } from 'lucide-react'
import { Product } from '@/types'

// Mock product data - will be replaced with API call
const mockProduct: Product = {
  id: '1',
  name: 'Classic White Shirt',
  price: 2999,
  originalPrice: 3999,
  images: [
    'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&h=1000&fit=crop',
    'https://images.unsplash.com/photo-1607345367224-72ea602ba378?w=800&h=1000&fit=crop',
    'https://images.unsplash.com/photo-1608198093002-ad809a13a6f8?w=800&h=1000&fit=crop'
  ],
  category: 'Men',
  slug: 'classic-white-shirt',
  description: 'A timeless classic perfect for any occasion. This premium white shirt is crafted from the finest cotton blend, offering exceptional comfort and durability. The perfect addition to your wardrobe.',
  sizes: ['S', 'M', 'L', 'XL'],
  colors: ['White', 'Blue', 'Black'],
  stock: 50,
  rating: 4.5,
  reviews: 128,
  featured: true,
  createdAt: new Date(),
  updatedAt: new Date()
}

const relatedProducts: Product[] = [
  {
    id: '2',
    name: 'Navy Blue Blazer',
    price: 4999,
    originalPrice: 6999,
    images: ['https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop'],
    category: 'Men',
    slug: 'navy-blue-blazer',
    description: 'Professional blazer for business meetings',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Navy', 'Black', 'Grey'],
    stock: 25,
    rating: 4.7,
    reviews: 156,
    featured: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '3',
    name: 'Casual Denim Jeans',
    price: 2499,
    originalPrice: 2999,
    images: ['https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=500&fit=crop'],
    category: 'Men',
    slug: 'casual-denim-jeans',
    description: 'Comfortable denim jeans for everyday wear',
    sizes: ['28', '30', '32', '34', '36'],
    colors: ['Blue', 'Black', 'Grey'],
    stock: 75,
    rating: 4.4,
    reviews: 167,
    featured: false,
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

export default function ProductDetailPage() {
  const params = useParams()
  const [product] = useState<Product>(mockProduct)
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedColor, setSelectedColor] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)

  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert('Please select size and color')
      return
    }
    
    // Add to cart logic here
    console.log('Added to cart:', {
      productId: product.id,
      quantity,
      size: selectedSize,
      color: selectedColor
    })
  }

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted)
  }

  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1)
    }
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  return (
    <div className="container py-8">
      {/* Breadcrumb */}
      <nav className="mb-8 text-sm">
        <ol className="flex items-center space-x-2">
          <li><Link href="/" className="text-primary-600 hover:text-accent-600">Home</Link></li>
          <li className="text-primary-400">/</li>
          <li><Link href="/products" className="text-primary-600 hover:text-accent-600">Products</Link></li>
          <li className="text-primary-400">/</li>
          <li className="text-primary-900 font-medium">{product.name}</li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Product Images */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="aspect-[3/4] overflow-hidden rounded-lg">
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Thumbnail Images */}
          <div className="flex space-x-2">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 transition-colors ${
                  selectedImage === index
                    ? 'border-accent-600'
                    : 'border-primary-200 hover:border-accent-300'
                }`}
              >
                <img
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-primary-900 mb-2">{product.name}</h1>
            <div className="flex items-center space-x-4">
              {/* Rating */}
              <div className="flex items-center">
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
                <span className="ml-2 text-sm text-primary-600">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              {/* Category */}
              <span className="text-sm text-primary-600 bg-primary-100 px-2 py-1 rounded">
                {product.category}
              </span>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center space-x-3">
            <span className="text-3xl font-bold text-primary-900">
              ₹{product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <>
                <span className="text-xl text-primary-500 line-through">
                  ₹{product.originalPrice.toLocaleString()}
                </span>
                <span className="bg-accent-600 text-white px-2 py-1 rounded-md text-sm font-medium">
                  {discount}% OFF
                </span>
              </>
            )}
          </div>

          {/* Description */}
          <p className="text-primary-700 leading-relaxed">{product.description}</p>

          {/* Color Selection */}
          <div>
            <h3 className="font-medium text-primary-900 mb-3">Color</h3>
            <div className="flex space-x-2">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-4 py-2 rounded-md border transition-colors ${
                    selectedColor === color
                      ? 'bg-accent-600 text-white border-accent-600'
                      : 'bg-white text-primary-700 border-primary-200 hover:border-accent-300'
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div>
            <h3 className="font-medium text-primary-900 mb-3">Size</h3>
            <div className="flex space-x-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-12 h-12 rounded-md border transition-colors ${
                    selectedSize === size
                      ? 'bg-accent-600 text-white border-accent-600'
                      : 'bg-white text-primary-700 border-primary-200 hover:border-accent-300'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity and Actions */}
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <span className="font-medium text-primary-900">Quantity:</span>
              <div className="flex items-center border border-primary-200 rounded-md">
                <button
                  onClick={decrementQuantity}
                  className="p-2 text-primary-600 hover:bg-primary-50 transition-colors"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="px-4 py-2 min-w-[3rem] text-center">{quantity}</span>
                <button
                  onClick={incrementQuantity}
                  className="p-2 text-primary-600 hover:bg-primary-50 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <span className="text-sm text-primary-600">
                {product.stock} in stock
              </span>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 btn-primary py-3 flex items-center justify-center"
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
              </button>
              
              <button
                onClick={toggleWishlist}
                className="p-3 border border-primary-200 rounded-md hover:bg-primary-50 transition-colors"
              >
                <Heart 
                  className={`h-5 w-5 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-primary-600'}`}
                />
              </button>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-3 pt-6 border-t border-primary-200">
            <div className="flex items-center space-x-3">
              <Truck className="h-5 w-5 text-accent-600" />
              <span className="text-primary-700">Free shipping on orders over ₹5000</span>
            </div>
            <div className="flex items-center space-x-3">
              <Shield className="h-5 w-5 text-accent-600" />
              <span className="text-primary-700">Secure payment with Razorpay</span>
            </div>
            <div className="flex items-center space-x-3">
              <RefreshCw className="h-5 w-5 text-accent-600" />
              <span className="text-primary-700">30-day return policy</span>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div>
        <h2 className="text-2xl font-bold text-primary-900 mb-8">You might also like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedProducts.map((relatedProduct) => (
            <div key={relatedProduct.id} className="group animate-in">
              <div className="card hover-lift">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Link href={`/products/${relatedProduct.slug}`}>
                    <img
                      src={relatedProduct.images[0]}
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </Link>
                  
                  {relatedProduct.originalPrice && (
                    <div className="absolute top-4 left-4 bg-accent-600 text-white px-2 py-1 rounded-md text-sm font-medium">
                      {Math.round(((relatedProduct.originalPrice - relatedProduct.price) / relatedProduct.originalPrice) * 100)}% OFF
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-primary-900 mb-2 group-hover:text-accent-600 transition-colors">
                    <Link href={`/products/${relatedProduct.slug}`}>
                      {relatedProduct.name}
                    </Link>
                  </h3>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-primary-900">
                      ₹{relatedProduct.price.toLocaleString()}
                    </span>
                    {relatedProduct.originalPrice && (
                      <span className="text-sm text-primary-500 line-through">
                        ₹{relatedProduct.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
