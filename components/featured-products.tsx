'use client'

import { Button } from '@/components/ui/button'
import { Heart, ShoppingBag, ArrowRight, Eye } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'

const products = [
  {
    id: 1,
    name: 'Cashmere Belted Coat',
    category: 'Winter Wear',
    price: 4999,
    originalPrice: 6999,
    image: '/images/product-winter-coat.png',
    rating: 4.8,
    reviews: 124,
    isNew: true,
    colors: ['#8B7355', '#2F4F4F', '#1C1C1C'],
  },
  {
    id: 2,
    name: 'Emerald Silk Saree',
    category: 'Designer Clothes',
    price: 3499,
    originalPrice: 4999,
    image: '/images/product-designer-saree.png',
    rating: 4.9,
    reviews: 89,
    isNew: false,
    colors: ['#046307', '#8B0000', '#000080'],
  },
  {
    id: 3,
    name: 'Gold Filigree Necklace',
    category: 'Fine Jewellery',
    price: 1299,
    originalPrice: 1899,
    image: '/images/product-gold-necklace.png',
    rating: 4.7,
    reviews: 156,
    isNew: true,
    colors: ['#D4AF37', '#C0C0C0'],
  },
  {
    id: 4,
    name: 'Champagne Silk Set',
    category: 'Nightwear',
    price: 2199,
    originalPrice: 3199,
    image: '/images/product-silk-nightwear.png',
    rating: 4.6,
    reviews: 67,
    isNew: false,
    colors: ['#F5E6D3', '#FFB6C1', '#E6E6FA'],
  },
  {
    id: 5,
    name: 'Wool Trench Coat',
    category: 'Winter Wear',
    price: 5599,
    originalPrice: 7999,
    image: '/images/product-winter-coat.png',
    rating: 4.8,
    reviews: 143,
    isNew: false,
    colors: ['#36454F', '#8B4513', '#1C1C1C'],
  },
  {
    id: 6,
    name: 'Royal Banarasi Silk',
    category: 'Designer Clothes',
    price: 5999,
    originalPrice: 8499,
    image: '/images/product-designer-saree.png',
    rating: 4.9,
    reviews: 201,
    isNew: true,
    colors: ['#800020', '#046307', '#4B0082'],
  },
  {
    id: 7,
    name: 'Temple Choker Set',
    category: 'Fine Jewellery',
    price: 2899,
    originalPrice: 3999,
    image: '/images/product-gold-necklace.png',
    rating: 4.7,
    reviews: 98,
    isNew: false,
    colors: ['#D4AF37', '#B76E79'],
  },
  {
    id: 8,
    name: 'Lace Trim Robe',
    category: 'Nightwear',
    price: 1899,
    originalPrice: 2699,
    image: '/images/product-silk-nightwear.png',
    rating: 4.5,
    reviews: 52,
    isNew: true,
    colors: ['#FFFFFF', '#1C1C1C', '#D4AF37'],
  },
]

export default function FeaturedProducts() {
  const [favorites, setFavorites] = useState<Set<number>>(new Set())
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null)

  const toggleFavorite = (e: React.MouseEvent, id: number) => {
    e.preventDefault()
    e.stopPropagation()
    const newFavorites = new Set(favorites)
    if (newFavorites.has(id)) {
      newFavorites.delete(id)
    } else {
      newFavorites.add(id)
    }
    setFavorites(newFavorites)
  }

  const discountPercent = (original: number, current: number) => {
    return Math.round(((original - current) / original) * 100)
  }

  return (
    <section className="relative py-20 lg:py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/30 to-background" />

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12 lg:mb-16">
          <div>
            <span className="inline-block text-xs font-medium tracking-[0.2em] uppercase text-accent mb-4">
              Handpicked for You
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-foreground">
              Featured Collections
            </h2>
          </div>
          <Link href="/shop">
            <Button
              variant="outline"
              className="group rounded-full border-foreground/20 hover:border-foreground/40 hover:bg-secondary/50"
            >
              View All
              <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {products.map((product, idx) => {
            const discount = discountPercent(product.originalPrice, product.price)
            const isHovered = hoveredProduct === product.id

            return (
              <Link
                key={product.id}
                href={`/product/${product.id}`}
                className={`group relative reveal stagger-${(idx % 4) + 1}`}
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                {/* Product Card */}
                <div className="bg-card rounded-2xl overflow-hidden border border-border/50 hover:border-accent/30 transition-all duration-300 hover:shadow-premium-lg hover-lift">
                  {/* Image Container */}
                  <div className="relative aspect-[3/4] overflow-hidden bg-secondary">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                      {product.isNew && (
                        <span className="px-3 py-1 text-[10px] font-semibold tracking-wider uppercase bg-foreground text-background rounded-full">
                          New
                        </span>
                      )}
                      {discount > 0 && (
                        <span className="px-3 py-1 text-[10px] font-semibold tracking-wider uppercase bg-accent text-accent-foreground rounded-full">
                          -{discount}%
                        </span>
                      )}
                    </div>

                    {/* Quick Actions */}
                    <div className={`absolute top-3 right-3 flex flex-col gap-2 transition-all duration-300 ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'}`}>
                      <button
                        onClick={(e) => toggleFavorite(e, product.id)}
                        className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${favorites.has(product.id)
                            ? 'bg-accent text-white'
                            : 'bg-white/90 backdrop-blur-sm text-foreground hover:bg-white'
                          }`}
                      >
                        <Heart
                          size={16}
                          className={favorites.has(product.id) ? 'fill-current' : ''}
                        />
                      </button>
                      <button
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                        className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm text-foreground hover:bg-white flex items-center justify-center transition-all duration-300"
                      >
                        <Eye size={16} />
                      </button>
                    </div>

                    {/* Add to Cart Button */}
                    <div className={`absolute bottom-3 left-3 right-3 transition-all duration-300 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                      <button
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                        className="w-full py-3 bg-foreground text-background text-sm font-medium rounded-xl flex items-center justify-center gap-2 hover:bg-foreground/90 transition-colors"
                      >
                        <ShoppingBag size={16} />
                        Add to Bag
                      </button>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-4 lg:p-5">
                    {/* Category */}
                    <p className="text-[11px] font-medium tracking-wider uppercase text-muted-foreground mb-2">
                      {product.category}
                    </p>

                    {/* Name */}
                    <h3 className="font-medium text-foreground mb-2 line-clamp-1 group-hover:text-accent transition-colors">
                      {product.name}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span
                            key={star}
                            className={`text-sm ${star <= Math.floor(product.rating) ? 'text-gold' : 'text-border'}`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground">
                        ({product.reviews})
                      </span>
                    </div>

                    {/* Price & Colors */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-baseline gap-2">
                        <span className="text-lg font-semibold text-foreground">
                          ₹{product.price.toLocaleString()}
                        </span>
                        {product.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            ₹{product.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>

                      {/* Color Swatches */}
                      <div className="flex gap-1">
                        {product.colors.slice(0, 3).map((color, i) => (
                          <div
                            key={i}
                            className="w-4 h-4 rounded-full border border-border/50"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                        {product.colors.length > 3 && (
                          <span className="text-xs text-muted-foreground">+{product.colors.length - 3}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-6">
            Discover over <strong className="text-foreground">500+ premium products</strong> in our collection
          </p>
          <Link href="/shop">
            <Button
              size="lg"
              className="btn-shine bg-primary hover:bg-primary/90 text-primary-foreground px-10 py-6 text-base font-medium rounded-full shadow-premium"
            >
              Explore All Products
              <ArrowRight size={18} className="ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
