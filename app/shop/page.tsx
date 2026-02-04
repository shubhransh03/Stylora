'use client'

import { useState, useMemo } from 'react'
import Header from '@/components/header'
import Footer from '@/components/footer'
import ProductGrid from '@/components/product-grid'
import ProductFilters from '@/components/product-filters'
import { getProducts } from '@/lib/products'
import { Search, SlidersHorizontal, X, Grid3X3, LayoutList } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined)
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000])
  const [sortBy, setSortBy] = useState<'newest' | 'price-low' | 'price-high' | 'rating'>('newest')
  const [searchQuery, setSearchQuery] = useState('')
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const filteredProducts = useMemo(() => {
    const products = getProducts({
      category: selectedCategory as any,
      priceRange,
      sortBy,
    })

    if (searchQuery) {
      return products.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    return products
  }, [selectedCategory, priceRange, sortBy, searchQuery])

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero Banner */}
        <section className="relative bg-gradient-to-br from-secondary via-background to-secondary/50 py-16 lg:py-24 overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-gold/5 rounded-full blur-3xl" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <span className="inline-block text-xs font-medium tracking-[0.2em] uppercase text-accent mb-4">
                Explore Our Collections
              </span>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium text-foreground mb-6">
                Discover Premium Fashion
              </h1>
              <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                Browse through our curated selection of luxury fashion, designed for those who appreciate elegance and quality.
              </p>
            </div>
          </div>
        </section>

        {/* Shop Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Search & Controls Bar */}
          <div className="flex flex-col lg:flex-row gap-4 mb-8">
            {/* Search */}
            <div className="relative flex-1 max-w-xl">
              <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-secondary border-0 rounded-xl text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-ring focus:outline-none transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X size={18} />
                </button>
              )}
            </div>

            {/* Controls */}
            <div className="flex items-center gap-3">
              {/* Mobile Filters Toggle */}
              <Button
                variant="outline"
                onClick={() => setShowMobileFilters(true)}
                className="lg:hidden flex items-center gap-2 rounded-xl border-border"
              >
                <SlidersHorizontal size={18} />
                Filters
              </Button>

              {/* View Mode Toggle */}
              <div className="hidden sm:flex items-center gap-1 p-1 bg-secondary rounded-lg">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-background shadow-sm' : 'hover:bg-background/50'
                    }`}
                >
                  <Grid3X3 size={18} className={viewMode === 'grid' ? 'text-foreground' : 'text-muted-foreground'} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-colors ${viewMode === 'list' ? 'bg-background shadow-sm' : 'hover:bg-background/50'
                    }`}
                >
                  <LayoutList size={18} className={viewMode === 'list' ? 'text-foreground' : 'text-muted-foreground'} />
                </button>
              </div>

              {/* Sort Dropdown (Desktop) */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="hidden lg:block px-4 py-3 bg-secondary border-0 rounded-xl text-sm text-foreground cursor-pointer focus:ring-2 focus:ring-ring focus:outline-none"
              >
                <option value="newest">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar (Desktop) */}
            <div className="hidden lg:block lg:col-span-1">
              <div className="sticky top-32 bg-card rounded-2xl border border-border/50 p-6 shadow-premium">
                <ProductFilters
                  selectedCategory={selectedCategory}
                  onCategoryChange={setSelectedCategory}
                  priceRange={priceRange}
                  onPriceChange={setPriceRange}
                  sortBy={sortBy}
                  onSortChange={setSortBy}
                />
              </div>
            </div>

            {/* Products Grid */}
            <div className="lg:col-span-3">
              {/* Results Count */}
              <div className="flex items-center justify-between mb-6">
                <p className="text-muted-foreground">
                  Showing <span className="font-medium text-foreground">{filteredProducts.length}</span> {filteredProducts.length === 1 ? 'product' : 'products'}
                </p>
              </div>

              <ProductGrid products={filteredProducts} />
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Filters Modal */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
            onClick={() => setShowMobileFilters(false)}
          />
          <div className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-card shadow-premium-lg overflow-y-auto fade-in-up">
            <div className="sticky top-0 bg-card border-b border-border z-10 p-4 flex items-center justify-between">
              <h2 className="font-medium text-foreground">Filters</h2>
              <button
                onClick={() => setShowMobileFilters(false)}
                className="p-2 hover:bg-secondary rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6">
              <ProductFilters
                selectedCategory={selectedCategory}
                onCategoryChange={(cat) => {
                  setSelectedCategory(cat)
                }}
                priceRange={priceRange}
                onPriceChange={setPriceRange}
                sortBy={sortBy}
                onSortChange={setSortBy}
              />
            </div>
            <div className="sticky bottom-0 bg-card border-t border-border p-4">
              <Button
                onClick={() => setShowMobileFilters(false)}
                className="w-full bg-foreground text-background hover:bg-foreground/90 rounded-xl py-3"
              >
                Show {filteredProducts.length} Products
              </Button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
