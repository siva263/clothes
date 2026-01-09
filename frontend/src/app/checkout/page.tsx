'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { CreditCard, Truck, Shield, User, Mail, Phone, MapPin } from 'lucide-react'
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
      images: ['https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=100&h=100&fit=crop'],
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
      images: ['https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=100&h=100&fit=crop'],
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

export default function CheckoutPage() {
  const router = useRouter()
  const [cartItems] = useState<CartItem[]>(mockCartItems)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    fullName: '',
    address: {
      street: '',
      city: '',
      state: '',
      postalCode: '',
      country: 'India'
    },
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  })

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.')
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...(prev as any)[parent],
          [child]: value
        }
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate payment processing
    setTimeout(() => {
      setLoading(false)
      router.push('/order-success')
    }, 3000)
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold text-primary-900 mb-8">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-2 space-y-8">
          {/* Contact Information */}
          <div className="bg-white p-6 rounded-lg border border-primary-100">
            <h2 className="text-xl font-semibold text-primary-900 mb-6 flex items-center">
              <User className="h-5 w-5 mr-2" />
              Contact Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-primary-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-primary-200 rounded-md focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                  placeholder="John Doe"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-primary-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-primary-200 rounded-md focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                  placeholder="john@example.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-primary-700 mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-primary-200 rounded-md focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                  placeholder="+91 98765 43210"
                />
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="bg-white p-6 rounded-lg border border-primary-100">
            <h2 className="text-xl font-semibold text-primary-900 mb-6 flex items-center">
              <MapPin className="h-5 w-5 mr-2" />
              Shipping Address
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-primary-700 mb-2">
                  Street Address
                </label>
                <input
                  type="text"
                  name="address.street"
                  value={formData.address.street}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-primary-200 rounded-md focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                  placeholder="123 Fashion Street"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-primary-700 mb-2">
                  City
                </label>
                <input
                  type="text"
                  name="address.city"
                  value={formData.address.city}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-primary-200 rounded-md focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                  placeholder="Mumbai"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-primary-700 mb-2">
                  State
                </label>
                <input
                  type="text"
                  name="address.state"
                  value={formData.address.state}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-primary-200 rounded-md focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                  placeholder="Maharashtra"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-primary-700 mb-2">
                  Postal Code
                </label>
                <input
                  type="text"
                  name="address.postalCode"
                  value={formData.address.postalCode}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-primary-200 rounded-md focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                  placeholder="400001"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-primary-700 mb-2">
                  Country
                </label>
                <select
                  name="address.country"
                  value={formData.address.country}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-primary-200 rounded-md focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                >
                  <option value="India">India</option>
                </select>
              </div>
            </div>
          </div>

          {/* Payment Information */}
          <div className="bg-white p-6 rounded-lg border border-primary-100">
            <h2 className="text-xl font-semibold text-primary-900 mb-6 flex items-center">
              <CreditCard className="h-5 w-5 mr-2" />
              Payment Information
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-primary-700 mb-2">
                  Cardholder Name
                </label>
                <input
                  type="text"
                  name="cardName"
                  value={formData.cardName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-primary-200 rounded-md focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                  placeholder="John Doe"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-primary-700 mb-2">
                  Card Number
                </label>
                <input
                  type="text"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  required
                  maxLength={16}
                  className="w-full px-4 py-2 border border-primary-200 rounded-md focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                  placeholder="1234 5678 9012 3456"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-primary-700 mb-2">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                    required
                    placeholder="MM/YY"
                    className="w-full px-4 py-2 border border-primary-200 rounded-md focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-primary-700 mb-2">
                    CVV
                  </label>
                  <input
                    type="text"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleInputChange}
                    required
                    maxLength={3}
                    className="w-full px-4 py-2 border border-primary-200 rounded-md focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                    placeholder="123"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg border border-primary-100 sticky top-4">
            <h2 className="text-xl font-bold text-primary-900 mb-6">Order Summary</h2>
            
            {/* Order Items */}
            <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center space-x-3">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-12 h-12 rounded object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-primary-900 truncate">
                      {item.product.name}
                    </p>
                    <p className="text-xs text-primary-600">
                      {item.color} • Size {item.size} • Qty {item.quantity}
                    </p>
                  </div>
                  <div className="text-sm font-semibold text-primary-900">
                    ₹{(item.product.price * item.quantity).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>

            {/* Price Breakdown */}
            <div className="space-y-3 mb-6 border-t border-primary-200 pt-4">
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

            {/* Security Badge */}
            <div className="mb-6 text-center">
              <div className="text-xs text-primary-500 mb-2">
                Secure payment powered by
              </div>
              <div className="bg-primary-100 px-3 py-2 rounded-md inline-block">
                <span className="text-sm font-medium text-primary-700">Razorpay</span>
              </div>
            </div>

            {/* Place Order Button */}
            <form onSubmit={handleSubmit}>
              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary py-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Processing Payment...
                  </div>
                ) : (
                  `Place Order • ₹${total.toLocaleString()}`
                )}
              </button>
            </form>

            {/* Trust Indicators */}
            <div className="mt-6 space-y-2">
              <div className="flex items-center text-sm text-primary-600">
                <Shield className="h-4 w-4 mr-2 text-accent-600" />
                Secure Payment
              </div>
              <div className="flex items-center text-sm text-primary-600">
                <Truck className="h-4 w-4 mr-2 text-accent-600" />
                Fast Delivery
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
