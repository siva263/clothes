'use client'

import { useState } from 'react'
import Link from 'next/link'
import { User, Package, MapPin, CreditCard, LogOut, Edit, Eye } from 'lucide-react'
import { Order } from '@/types'

// Mock order data - will be replaced with API calls
const mockOrders: Order[] = [
  {
    id: '1',
    orderNumber: 'ORD-123456',
    userId: '1',
    totalAmount: 9497,
    status: 'delivered',
    shippingAddress: {
      street: '123 Fashion Street',
      city: 'Mumbai',
      state: 'Maharashtra',
      postalCode: '400001',
      country: 'India'
    },
    paymentId: 'pay_123456',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-05')
  },
  {
    id: '2',
    orderNumber: 'ORD-789012',
    userId: '1',
    totalAmount: 3499,
    status: 'shipped',
    shippingAddress: {
      street: '456 Style Avenue',
      city: 'Delhi',
      state: 'Delhi',
      postalCode: '110001',
      country: 'India'
    },
    paymentId: 'pay_789012',
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-12')
  }
]

export default function ProfilePage() {
  const [orders] = useState<Order[]>(mockOrders)
  const [activeTab, setActiveTab] = useState('orders')

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800'
      case 'shipped':
        return 'bg-blue-100 text-blue-800'
      case 'processing':
        return 'bg-yellow-100 text-yellow-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'Delivered'
      case 'shipped':
        return 'Shipped'
      case 'processing':
        return 'Processing'
      case 'cancelled':
        return 'Cancelled'
      default:
        return status
    }
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold text-primary-900 mb-8">My Profile</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg border border-primary-100">
            {/* User Info */}
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="h-10 w-10 text-primary-600" />
              </div>
              <h2 className="text-lg font-semibold text-primary-900">John Doe</h2>
              <p className="text-sm text-primary-600">john@example.com</p>
            </div>

            {/* Navigation */}
            <nav className="space-y-2">
              <button
                onClick={() => setActiveTab('orders')}
                className={`w-full flex items-center px-4 py-2 rounded-md transition-colors ${
                  activeTab === 'orders'
                    ? 'bg-accent-600 text-white'
                    : 'text-primary-700 hover:bg-primary-50'
                }`}
              >
                <Package className="h-4 w-4 mr-2" />
                Orders
              </button>
              
              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full flex items-center px-4 py-2 rounded-md transition-colors ${
                  activeTab === 'profile'
                    ? 'bg-accent-600 text-white'
                    : 'text-primary-700 hover:bg-primary-50'
                }`}
              >
                <User className="h-4 w-4 mr-2" />
                Profile Info
              </button>
              
              <button
                onClick={() => setActiveTab('addresses')}
                className={`w-full flex items-center px-4 py-2 rounded-md transition-colors ${
                  activeTab === 'addresses'
                    ? 'bg-accent-600 text-white'
                    : 'text-primary-700 hover:bg-primary-50'
                }`}
              >
                <MapPin className="h-4 w-4 mr-2" />
                Addresses
              </button>
              
              <button
                onClick={() => setActiveTab('payment')}
                className={`w-full flex items-center px-4 py-2 rounded-md transition-colors ${
                  activeTab === 'payment'
                    ? 'bg-accent-600 text-white'
                    : 'text-primary-700 hover:bg-primary-50'
                }`}
              >
                <CreditCard className="h-4 w-4 mr-2" />
                Payment Methods
              </button>
            </nav>

            {/* Logout */}
            <div className="mt-6 pt-6 border-t border-primary-200">
              <button className="w-full flex items-center px-4 py-2 text-red-600 hover:bg-red-50 rounded-md transition-colors">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <div className="bg-white p-6 rounded-lg border border-primary-100">
              <h2 className="text-xl font-semibold text-primary-900 mb-6">Order History</h2>
              
              {orders.length === 0 ? (
                <div className="text-center py-12">
                  <Package className="h-12 w-12 text-primary-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-primary-900 mb-2">No orders yet</h3>
                  <p className="text-primary-600 mb-4">Start shopping to see your orders here</p>
                  <Link href="/products" className="btn-primary">
                        Browse Products
                      </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="border border-primary-200 rounded-lg p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-semibold text-primary-900">
                            {order.orderNumber}
                          </h3>
                          <p className="text-sm text-primary-600">
                            Placed on {order.createdAt.toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                            {getStatusText(order.status)}
                          </span>
                          <p className="text-lg font-bold text-primary-900 mt-1">
                            ₹{order.totalAmount.toLocaleString()}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="text-sm text-primary-600">
                          <p>Shipped to: {order.shippingAddress.city}, {order.shippingAddress.state}</p>
                        </div>
                        <Link 
                          href={`/orders/${order.id}`}
                          className="text-accent-600 hover:text-accent-700 font-medium text-sm flex items-center"
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View Details
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Profile Info Tab */}
          {activeTab === 'profile' && (
            <div className="bg-white p-6 rounded-lg border border-primary-100">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-primary-900">Profile Information</h2>
                <button className="text-accent-600 hover:text-accent-700 font-medium text-sm flex items-center">
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-primary-700 mb-1">Full Name</label>
                  <p className="text-primary-900">John Doe</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-primary-700 mb-1">Email</label>
                  <p className="text-primary-900">john@example.com</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-primary-700 mb-1">Phone</label>
                  <p className="text-primary-900">+91 98765 43210</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-primary-700 mb-1">Member Since</label>
                  <p className="text-primary-900">January 1, 2024</p>
                </div>
              </div>
            </div>
          )}

          {/* Addresses Tab */}
          {activeTab === 'addresses' && (
            <div className="bg-white p-6 rounded-lg border border-primary-100">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-primary-900">Shipping Addresses</h2>
                <button className="btn-primary text-sm">
                  Add Address
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-primary-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-primary-900">Home</h3>
                    <span className="text-xs bg-accent-100 text-accent-800 px-2 py-1 rounded">Default</span>
                  </div>
                  <p className="text-sm text-primary-700">
                    John Doe<br />
                    123 Fashion Street<br />
                    Mumbai, Maharashtra 400001<br />
                    India<br />
                    +91 98765 43210
                  </p>
                  <div className="mt-4 flex space-x-2">
                    <button className="text-accent-600 hover:text-accent-700 text-sm">Edit</button>
                    <button className="text-red-600 hover:text-red-700 text-sm">Delete</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Payment Methods Tab */}
          {activeTab === 'payment' && (
            <div className="bg-white p-6 rounded-lg border border-primary-100">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-primary-900">Payment Methods</h2>
                <button className="btn-primary text-sm">
                  Add Payment Method
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="border border-primary-200 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-8 bg-blue-600 rounded flex items-center justify-center">
                        <span className="text-white text-xs font-bold">VISA</span>
                      </div>
                      <div>
                        <p className="font-medium text-primary-900">•••• 4242</p>
                        <p className="text-sm text-primary-600">Expires 12/25</p>
                      </div>
                    </div>
                    <span className="text-xs bg-accent-100 text-accent-800 px-2 py-1 rounded">Default</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
