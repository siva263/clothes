'use client'

import { useState } from 'react'
import { X, ChevronDown, ChevronUp } from 'lucide-react'
import { Category } from '@/types'

interface FilterSidebarProps {
  categories: Category[]
  selectedCategory: string
  priceRange: { min: number; max: number }
  selectedSizes: string[]
  selectedColors: string[]
  onCategoryChange: (category: string) => void
  onPriceRangeChange: (range: { min: number; max: number }) => void
  onSizesChange: (sizes: string[]) => void
  onColorsChange: (colors: string[]) => void
  onClearFilters: () => void
}

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '28', '30', '32', '34', '36']
const colors = ['Black', 'White', 'Blue', 'Red', 'Green', 'Yellow', 'Pink', 'Grey', 'Brown', 'Navy', 'Floral']

export default function FilterSidebar({
  categories,
  selectedCategory,
  priceRange,
  selectedSizes,
  selectedColors,
  onCategoryChange,
  onPriceRangeChange,
  onSizesChange,
  onColorsChange,
  onClearFilters
}: FilterSidebarProps) {
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    price: true,
    sizes: true,
    colors: true
  })

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const handleSizeToggle = (size: string) => {
    if (selectedSizes.includes(size)) {
      onSizesChange(selectedSizes.filter(s => s !== size))
    } else {
      onSizesChange([...selectedSizes, size])
    }
  }

  const handleColorToggle = (color: string) => {
    if (selectedColors.includes(color)) {
      onColorsChange(selectedColors.filter(c => c !== color))
    } else {
      onColorsChange([...selectedColors, color])
    }
  }

  const hasActiveFilters = selectedCategory || 
    (priceRange.min > 0 || priceRange.max < 10000) || 
    selectedSizes.length > 0 || 
    selectedColors.length > 0

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-primary-100">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-primary-900">Filters</h3>
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="text-accent-600 hover:text-accent-700 text-sm font-medium"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Categories */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('categories')}
          className="flex justify-between items-center w-full text-left font-medium text-primary-900 mb-3"
        >
          Categories
          {expandedSections.categories ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </button>
        
        {expandedSections.categories && (
          <div className="space-y-2">
            {categories.map((category) => (
              <label key={category.id} className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="category"
                  value={category.slug}
                  checked={selectedCategory === category.slug}
                  onChange={(e) => onCategoryChange(e.target.value)}
                  className="mr-2 text-accent-600 focus:ring-accent-500"
                />
                <span className="text-primary-700">{category.name}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('price')}
          className="flex justify-between items-center w-full text-left font-medium text-primary-900 mb-3"
        >
          Price Range
          {expandedSections.price ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </button>
        
        {expandedSections.price && (
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-primary-600">₹</span>
              <input
                type="number"
                min="0"
                max="10000"
                value={priceRange.min}
                onChange={(e) => onPriceRangeChange({ ...priceRange, min: parseInt(e.target.value) || 0 })}
                className="flex-1 px-3 py-2 border border-primary-200 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-500"
                placeholder="Min"
              />
              <span className="text-primary-400">-</span>
              <input
                type="number"
                min="0"
                max="10000"
                value={priceRange.max}
                onChange={(e) => onPriceRangeChange({ ...priceRange, max: parseInt(e.target.value) || 10000 })}
                className="flex-1 px-3 py-2 border border-primary-200 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-500"
                placeholder="Max"
              />
            </div>
            
            {/* Price Range Slider */}
            <div className="space-y-2">
              <input
                type="range"
                min="0"
                max="10000"
                value={priceRange.min}
                onChange={(e) => onPriceRangeChange({ ...priceRange, min: parseInt(e.target.value) })}
                className="w-full"
              />
              <input
                type="range"
                min="0"
                max="10000"
                value={priceRange.max}
                onChange={(e) => onPriceRangeChange({ ...priceRange, max: parseInt(e.target.value) })}
                className="w-full"
              />
            </div>
          </div>
        )}
      </div>

      {/* Sizes */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('sizes')}
          className="flex justify-between items-center w-full text-left font-medium text-primary-900 mb-3"
        >
          Sizes
          {expandedSections.sizes ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </button>
        
        {expandedSections.sizes && (
          <div className="grid grid-cols-3 gap-2">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => handleSizeToggle(size)}
                className={`px-3 py-2 text-sm border rounded-md transition-colors ${
                  selectedSizes.includes(size)
                    ? 'bg-accent-600 text-white border-accent-600'
                    : 'bg-white text-primary-700 border-primary-200 hover:border-accent-300'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Colors */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('colors')}
          className="flex justify-between items-center w-full text-left font-medium text-primary-900 mb-3"
        >
          Colors
          {expandedSections.colors ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </button>
        
        {expandedSections.colors && (
          <div className="grid grid-cols-2 gap-2">
            {colors.map((color) => (
              <label key={color} className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedColors.includes(color)}
                  onChange={() => handleColorToggle(color)}
                  className="mr-2 text-accent-600 focus:ring-accent-500"
                />
                <span className="text-primary-700 text-sm">{color}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
