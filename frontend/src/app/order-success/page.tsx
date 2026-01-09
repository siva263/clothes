'use client'

import Link from 'next/link'
import { CheckCircle, Package, Truck, ArrowRight } from 'lucide-react'

export default function OrderSuccessPage() {
  // Mock order data - in real app this would come from the order completion
  const orderNumber = `ORD-${Date.now().toString().slice(-6)}`
  const estimatedDelivery = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString()

  return (
    <div className="container py-16">
      <div className="max-w-2xl mx-auto text-center">
        {/* Success Icon */}
        <div className="mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
        </div>

        {/* Success Message */}
        <h1 className="text-3xl font-bold text-primary-900 mb-4">
          Order Placed Successfully!
        </h1>
        
        <p className="text-lg text-primary-600 mb-8">
          Thank you for your purchase. Your order has been received and is being processed.
        </p>

        {/* Order Details Card */}
        <div className="bg-white p-8 rounded-lg border border-primary-100 mb-8">
          <div className="text-left space-y-6">
            <div>
              <h3 className="font-semibold text-primary-900 mb-2">Order Number</h3>
              <p className="text-xl font-mono text-primary-700">{orderNumber}</p>
            </div>

            <div>
              <h3 className="font-semibold text-primary-900 mb-2">Estimated Delivery</h3>
              <p className="text-primary-700">{estimatedDelivery}</p>
            </div>

            <div>
              <h3 className="font-semibold text-primary-900 mb-2">Order Status</h3>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
                <span className="text-primary-700">Processing</span>
              </div>
            </div>

            {/* Order Timeline */}
            <div className="border-t border-primary-200 pt-6">
              <h3 className="font-semibold text-primary-900 mb-4">Order Timeline</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-primary-900">Order Confirmed</p>
                    <p className="text-sm text-primary-600">Your order has been received</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                    <Package className="h-4 w-4 text-yellow-600" />
                  </div>
                  <div>
                    <p className="font-medium text-primary-900">Processing</p>
                    <p className="text-sm text-primary-600">Your order is being prepared</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                    <Truck className="h-4 w-4 text-primary-600" />
                  </div>
                  <div>
                    <p className="font-medium text-primary-900">Shipped</p>
                    <p className="text-sm text-primary-600">Your order is on its way</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Link 
            href="/products" 
            className="btn-primary inline-flex items-center px-8 py-3"
          >
            Continue Shopping
            <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
          
          <div className="text-center">
            <Link 
              href="/profile" 
              className="text-accent-600 hover:text-accent-700 font-medium"
            >
              View Order Details
            </Link>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-12 p-6 bg-primary-50 rounded-lg">
          <h3 className="font-semibold text-primary-900 mb-3">What's Next?</h3>
          <div className="text-left space-y-2 text-sm text-primary-700">
            <p>• You'll receive an email confirmation with your order details</p>
            <p>• We'll notify you when your order ships</p>
            <p>• You can track your order status in your profile</p>
            <p>• Expected delivery within 5-7 business days</p>
          </div>
        </div>
      </div>
    </div>
  )
}
