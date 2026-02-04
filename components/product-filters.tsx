'use client'

import { useState } from 'react'
import { Slider } from '@/components/ui/slider'
import { ChevronDown, X, SlidersHorizontal } from 'lucide-react'

type ProductFiltersProps = {
  selectedCategory?: string
  onCategoryChange: (category: string | undefined) => void
  priceRange: [number, number]
  onPriceChange: (range: [number, number]) => void
  sortBy: 'newest' | 'price-low' | 'price-high' | 'rating'
  onSortChange: (sort: 'newest' | 'price-low' | 'price-high' | 'rating') => void
}

const categories = [
  { id: 'winter-wear', name: 'Winter Collection', count: 48 },
  { id: 'designer-clothes', name: 'Designer Wear', count: 86 },
  { id: 'jewellery', name: 'Fine Jewellery', count: 124 },
  { id: 'nightwear', name: 'Nightwear', count: 36 },
  { id: 'kurtis', name: 'Kurtis', count: 52 },
  { id: 'men', name: 'Men\'s Collection', count: 41 },
  { id: 'women', name: 'Women\'s Collection', count: 98 },
]

const sortOptions = [
  { id: 'newest', name: 'Newest First' },
  { id: 'price-low', name: 'Price: Low to High' },
  { id: 'price-high', name: 'Price: High to Low' },
  { id: 'rating', name: 'Top Rated' },
]

export default function ProductFilters({
  selectedCategory,
  onCategoryChange,
  priceRange,
  onPriceChange,
  sortBy,
  onSortChange,
}: ProductFiltersProps) {
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    price: true,
    sort: false,
  })

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }))
  }

  const clearFilters = () => {
    onCategoryChange(undefined)
    onPriceChange([0, 10000])
    onSortChange('newest')
  }

  const hasActiveFilters = selectedCategory || priceRange[0] > 0 || priceRange[1] < 10000 || sortBy !== 'newest'

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={18} className="text-muted-foreground" />
          <h3 className="font-medium text-foreground">Filters</h3>
        </div>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-xs font-medium text-accent hover:text-accent/80 transition-colors flex items-center gap-1"
          >
            <X size={14} />
            Clear all
          </button>
        )}
      </div>

      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {selectedCategory && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-secondary text-foreground rounded-full">
              {categories.find((c) => c.id === selectedCategory)?.name}
              <button onClick={() => onCategoryChange(undefined)} className="hover:text-accent">
                <X size={12} />
              </button>
            </span>
          )}
          {(priceRange[0] > 0 || priceRange[1] < 10000) && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-secondary text-foreground rounded-full">
              ₹{priceRange[0]} - ₹{priceRange[1]}
              <button onClick={() => onPriceChange([0, 10000])} className="hover:text-accent">
                <X size={12} />
              </button>
            </span>
          )}
        </div>
      )}

      <div className="h-px bg-border" />

      {/* Categories */}
      <div className="space-y-3">
        <button
          onClick={() => toggleSection('categories')}
          className="flex items-center justify-between w-full py-1"
        >
          <span className="font-medium text-foreground">Categories</span>
          <ChevronDown
            size={18}
            className={`text-muted-foreground transition-transform ${expandedSections.categories ? 'rotate-180' : ''}`}
          />
        </button>

        {expandedSections.categories && (
          <div className="space-y-1 pt-1">
            <button
              onClick={() => onCategoryChange(undefined)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-all ${!selectedCategory
                  ? 'bg-foreground text-background font-medium'
                  : 'text-foreground hover:bg-secondary'
                }`}
            >
              <span>All Products</span>
              <span className={`text-xs ${!selectedCategory ? 'text-background/70' : 'text-muted-foreground'}`}>
                {categories.reduce((sum, c) => sum + c.count, 0)}
              </span>
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => onCategoryChange(category.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-all ${selectedCategory === category.id
                    ? 'bg-foreground text-background font-medium'
                    : 'text-foreground hover:bg-secondary'
                  }`}
              >
                <span>{category.name}</span>
                <span className={`text-xs ${selectedCategory === category.id ? 'text-background/70' : 'text-muted-foreground'}`}>
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="h-px bg-border" />

      {/* Price Range */}
      <div className="space-y-4">
        <button
          onClick={() => toggleSection('price')}
          className="flex items-center justify-between w-full py-1"
        >
          <span className="font-medium text-foreground">Price Range</span>
          <ChevronDown
            size={18}
            className={`text-muted-foreground transition-transform ${expandedSections.price ? 'rotate-180' : ''}`}
          />
        </button>

        {expandedSections.price && (
          <div className="space-y-6 pt-2">
            <Slider
              value={priceRange}
              onValueChange={(value) => onPriceChange(value as [number, number])}
              max={10000}
              step={500}
              className="py-2"
            />
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <label className="text-xs text-muted-foreground mb-1 block">Min</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">₹</span>
                  <input
                    type="number"
                    value={priceRange[0]}
                    onChange={(e) => onPriceChange([Number(e.target.value), priceRange[1]])}
                    className="w-full pl-7 pr-3 py-2.5 bg-secondary border-0 rounded-lg text-sm text-foreground focus:ring-2 focus:ring-ring"
                  />
                </div>
              </div>
              <span className="text-muted-foreground mt-5">—</span>
              <div className="flex-1">
                <label className="text-xs text-muted-foreground mb-1 block">Max</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">₹</span>
                  <input
                    type="number"
                    value={priceRange[1]}
                    onChange={(e) => onPriceChange([priceRange[0], Number(e.target.value)])}
                    className="w-full pl-7 pr-3 py-2.5 bg-secondary border-0 rounded-lg text-sm text-foreground focus:ring-2 focus:ring-ring"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="h-px bg-border" />

      {/* Sort By */}
      <div className="space-y-3">
        <button
          onClick={() => toggleSection('sort')}
          className="flex items-center justify-between w-full py-1"
        >
          <span className="font-medium text-foreground">Sort By</span>
          <ChevronDown
            size={18}
            className={`text-muted-foreground transition-transform ${expandedSections.sort ? 'rotate-180' : ''}`}
          />
        </button>

        {expandedSections.sort && (
          <div className="space-y-1 pt-1">
            {sortOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => onSortChange(option.id as typeof sortBy)}
                className={`w-full flex items-center px-3 py-2.5 rounded-lg text-sm transition-all ${sortBy === option.id
                    ? 'bg-foreground text-background font-medium'
                    : 'text-foreground hover:bg-secondary'
                  }`}
              >
                <span>{option.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
