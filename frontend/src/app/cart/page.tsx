'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react'
import { CartItem } from '@/types'

// Mock cart data - will be replaced with API calls
const mockCartItems: CartItem[] = [
  {
    id: '1',
    productId: '1',
    product: {
      id: '1',
      name: 'Classic White Shirt',
      price: 2999,
      originalPrice: 3999,
      images: ['https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=200&h=250&fit=crop'],
      category: 'Men',
      slug: 'classic-white-shirt',
      description: 'A timeless classic perfect for any occasion',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['White', 'Blue', 'Black'],
      stock: 50,
      rating: 4.5,
      reviews: 128,
      featured: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    quantity: 2,
    size: 'M',
    color: 'White'
  },
  {
    id: '2',
    productId: '2',
    product: {
      id: '2',
      name: 'Floral Summer Dress',
      price: 3499,
      originalPrice: 4999,
      images: ['https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=200&h=250&fit=crop'],
      category: 'Women',
      slug: 'floral-summer-dress',
      description: 'Elegant floral dress for summer occasions',
      sizes: ['XS', 'S', 'M', 'L'],
      colors: ['Floral', 'Pink', 'Yellow'],
      stock: 30,
      rating: 4.8,
      reviews: 89,
      featured: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    quantity: 1,
    size: 'S',
    color: 'Floral'
  }
]

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>(mockCartItems)

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return
    
    setCartItems(items =>
      items.map(item =>
        item.id === itemId
          ? { ...item, quantity: newQuantity }
          : item
      )
    )
  }

  const removeItem = (itemId: string) => {
    setCartItems(items => items.filter(item => item.id !== itemId))
  }

  const clearCart = () => {
    setCartItems([])
  }

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0)
  }

  const calculateTotal = () => {
    const subtotal = calculateSubtotal()
    const shipping = subtotal > 5000 ? 0 : 100
    return subtotal + shipping
  }

  const subtotal = calculateSubtotal()
  const shipping = subtotal > 5000 ? 0 : 100
  const total = calculateTotal()

  if (cartItems.length === 0) {
    return (
      <div className="container py-16">
        <div className="text-center max-w-md mx-auto">
          <div className="bg-primary-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="h-12 w-12 text-primary-400" />
          </div>
          
          <h1 className="text-2xl font-bold text-primary-900 mb-4">
            Your cart is empty
          </h1>
          
          <p className="text-primary-600 mb-8">
            Looks like you haven\'t added any items to your cart yet.
          </p>
          
          <Link href="/products" className="btn-primary inline-flex items-center">
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold text-primary-900 mb-8">Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="bg-white p-6 rounded-lg border border-primary-100">
              <div className="flex gap-4">
                {/* Product Image */}
                <div className="flex-shrink-0 w-24 h-24 rounded-md overflow-hidden">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Product Details */}
                <div className="flex-1 space-y-2">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-semibold text-primary-900">
                        <Link 
                          href={`/products/${item.product.slug}`}
                          className="hover:text-accent-600 transition-colors"
                        >
                          {item.product.name}
                        </Link>
                      </h3>
                      <p className="text-sm text-primary-600">
                        {item.color} • Size {item.size}
                      </p>
                    </div>
                    
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-primary-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="flex justify-between items-end">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 text-primary-600 hover:bg-primary-50 rounded transition-colors"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      
                      <span className="w-12 text-center font-medium">
                        {item.quantity}
                      </span>
                      
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 text-primary-600 hover:bg-primary-50 rounded transition-colors"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="text-right">
                      <div className="font-semibold text-primary-900">
                        ₹{(item.product.price * item.quantity).toLocaleString()}
                      </div>
                      {item.product.originalPrice && (
                        <div className="text-sm text-primary-500 line-through">
                          ₹{(item.product.originalPrice * item.quantity).toLocaleString()}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Cart Actions */}
          <div className="flex justify-between items-center mt-6">
            <Link 
              href="/products" 
              className="btn-secondary inline-flex items-center"
            >
              Continue Shopping
            </Link>
            
            <button
              onClick={clearCart}
              className="text-accent-600 hover:text-accent-700 font-medium"
            >
              Clear Cart
            </button>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg border border-primary-100 sticky top-4">
            <h2 className="text-xl font-bold text-primary-900 mb-6">Order Summary</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-primary-700">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between text-primary-700">
                <span>Shipping</span>
                <span>
                  {shipping === 0 ? 'FREE' : `₹${shipping}`}
                </span>
              </div>
              
              {subtotal > 5000 && (
                <div className="text-sm text-accent-600">
                  You've qualified for free shipping!
                </div>
              )}
              
              <div className="border-t border-primary-200 pt-3">
                <div className="flex justify-between text-lg font-bold text-primary-900">
                  <span>Total</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Link 
                href="/checkout" 
                className="btn-primary w-full py-3 text-center"
              >
                Proceed to Checkout
              </Link>
              
              <Link 
                href="/products" 
                className="btn-secondary w-full py-3 text-center"
              >
                Continue Shopping
              </Link>
            </div>

            {/* Security Badge */}
            <div className="mt-6 text-center">
              <div className="text-xs text-primary-500 mb-2">
                Secure checkout powered by
              </div>
              <div className="bg-primary-100 px-3 py-2 rounded-md inline-block">
                <span className="text-sm font-medium text-primary-700">Razorpay</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
