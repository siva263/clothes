import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Premium Clothing Brand - Luxury Fashion for Men & Women',
  description: 'Discover our premium collection of clothing for men and women. Quality fabrics, timeless designs, and sustainable fashion.',
  keywords: 'clothing, fashion, premium, luxury, men, women, accessories',
  authors: [{ name: 'Premium Clothing Brand' }],
  openGraph: {
    title: 'Premium Clothing Brand',
    description: 'Discover our premium collection of clothing for men and women',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
