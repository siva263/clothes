'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import ProductCard from '@/components/ui/ProductCard'
import FilterSidebar from '@/components/ui/FilterSidebar'
import SortDropdown from '@/components/ui/SortDropdown'
import { Product, Category } from '@/types'

// Mock data - will be replaced with API calls
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Classic White Shirt',
    price: 2999,
    originalPrice: 3999,
    images: ['https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=500&fit=crop'],
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
  {
    id: '2',
    name: 'Floral Summer Dress',
    price: 3499,
    originalPrice: 4999,
    images: ['https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=400&h=500&fit=crop'],
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
  {
    id: '3',
    name: 'Navy Blue Blazer',
    price: 4999,
    originalPrice: 6999,
    images: ['https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?00&w=400&h=5fit=crop'],
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
    id: '4',
    name: 'Leather Belt',
    price: 1499,
    originalPrice: 1999,
    images: ['https://images.unsplash.com/photo-1705493655920-20c572928501?w=400&h=5fit=crop'],
    category: 'Accessories',
    slug: 'leather-belt',
    description: 'Premium leather belt with classic buckle',
    sizes: ['S', 'M', 'L'],
    colors: ['Brown', 'Black'],
    stock: 100,
    rating: 4.6,
    reviews: 203,
    featured: false,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '5',
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
  },
  {
    id: '6',
    name: 'Silk Scarf',
    price: 1999,
    originalPrice: 2499,
    images: ['https://images.unsplash.com/photo-1524863479829-916d8e77f114?w=400&h=500&fit=crop'],
    category: 'Accessories',
    slug: 'silk-scarf',
    description: 'Luxurious silk scarf with elegant patterns',
    sizes: ['One Size'],
    colors: ['Red', 'Blue', 'Green', 'Black'],
    stock: 40,
    rating: 4.9,
    reviews: 78,
    featured: false,
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

const mockCategories: Category[] = [
  { id: '1', name: 'Men', slug: 'men', description: 'Men\'s clothing collection' },
  { id: '2', name: 'Women', slug: 'women', description: 'Women\'s clothing collection' },
  { id: '3', name: 'Accessories', slug: 'accessories', description: 'Fashion accessories' }
]

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const [products, setProducts] = useState<Product[]>(mockProducts)
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(mockProducts)
  const [categories] = useState<Category[]>(mockCategories)
  const [loading, setLoading] = useState(false)
  const [sortBy, setSortBy] = useState('featured')
  const [selectedCategory, setSelectedCategory] = useState(searchParams?.get('category') || '')
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 })
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])
  const [selectedColors, setSelectedColors] = useState<string[]>([])

  // Filter products based on selected criteria
  useEffect(() => {
    let filtered = [...products]

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(product => 
        product.category.toLowerCase() === selectedCategory.toLowerCase()
      )
    }

    // Filter by price range
    filtered = filtered.filter(product => 
      product.price >= priceRange.min && product.price <= priceRange.max
    )

    // Filter by sizes
    if (selectedSizes.length > 0) {
      filtered = filtered.filter(product =>
        product.sizes.some(size => selectedSizes.includes(size))
      )
    }

    // Filter by colors
    if (selectedColors.length > 0) {
      filtered = filtered.filter(product =>
        product.colors.some(color => selectedColors.includes(color))
      )
    }

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case 'newest':
        filtered.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
        break
      case 'featured':
      default:
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
        break
    }

    setFilteredProducts(filtered)
  }, [products, selectedCategory, priceRange, selectedSizes, selectedColors, sortBy])

  const clearFilters = () => {
    setSelectedCategory('')
    setPriceRange({ min: 0, max: 10000 })
    setSelectedSizes([])
    setSelectedColors([])
    setSortBy('featured')
  }

  return (
    <div className="container py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary-900 mb-2">Products</h1>
        <p className="text-primary-600">
          Discover our collection of premium clothing and accessories
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <aside className="lg:w-64 flex-shrink-0">
          <FilterSidebar
            categories={categories}
            selectedCategory={selectedCategory}
            priceRange={priceRange}
            selectedSizes={selectedSizes}
            selectedColors={selectedColors}
            onCategoryChange={setSelectedCategory}
            onPriceRangeChange={setPriceRange}
            onSizesChange={setSelectedSizes}
            onColorsChange={setSelectedColors}
            onClearFilters={clearFilters}
          />
        </aside>

        {/* Products Grid */}
        <main className="flex-1">
          {/* Sort and Results Count */}
          <div className="flex justify-between items-center mb-6">
            <p className="text-primary-600">
              Showing {filteredProducts.length} of {products.length} products
            </p>
            <SortDropdown
              value={sortBy}
              onChange={setSortBy}
            />
          </div>

          {/* Products Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-primary-200 aspect-[3/4] rounded-lg mb-4"></div>
                  <div className="h-4 bg-primary-200 rounded mb-2"></div>
                  <div className="h-4 bg-primary-200 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-primary-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-primary-900 mb-2">
                No products found
              </h3>
              <p className="text-primary-600 mb-4">
                Try adjusting your filters or browse all products
              </p>
              <button
                onClick={clearFilters}
                className="btn-primary"
              >
                Clear Filters
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
