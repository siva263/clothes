export interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  images: string[]
  category: string
  slug: string
  description: string
  sizes: string[]
  colors: string[]
  stock: number
  rating: number
  reviews: number
  featured: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Category {
  id: string
  name: string
  slug: string
  description: string
}

export interface User {
  id: string
  email: string
  fullName: string
  isAdmin?: boolean
  createdAt: Date
}

export interface CartItem {
  id: string
  productId: string
  product: Product
  quantity: number
  size: string
  color: string
}

export interface Order {
  id: string
  orderNumber: string
  userId: string
  totalAmount: number
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  shippingAddress: {
    street: string
    city: string
    state: string
    postalCode: string
    country: string
  }
  paymentId?: string
  createdAt: Date
  updatedAt: Date
}

export interface OrderItem {
  id: string
  orderId: string
  productId: string
  quantity: number
  unitPrice: number
  size: string
  color: string
}

export interface FilterState {
  category: string
  priceRange: { min: number; max: number }
  sizes: string[]
  colors: string[]
  sortBy: string
}
