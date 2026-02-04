'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Heart, ShoppingBag, Eye, Star } from 'lucide-react'
import { Product } from '@/lib/products'
import { useCart } from '@/lib/cart-context'
import { Button } from '@/components/ui/button'

type ProductGridProps = {
  products: Product[]
}

const productImages = {
  'winter-wear': '/images/product-winter-coat.png',
  'designer-clothes': '/images/product-designer-saree.png',
  'jewellery': '/images/product-gold-necklace.png',
  'nightwear': '/images/product-silk-nightwear.png',
  'default': '/images/product-winter-coat.png',
}

export default function ProductGrid({ products }: ProductGridProps) {
  const { addToCart } = useCart()
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const [selectedSizeByProduct, setSelectedSizeByProduct] = useState<Record<string, string>>({})
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null)

  const toggleFavorite = (e: React.MouseEvent, id: string) => {
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

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.preventDefault()
    e.stopPropagation()
    const size = selectedSizeByProduct[product.id] || product.sizes?.[0]
    const color = product.colors?.[0]?.name
    addToCart(product, 1, size, color)
  }

  const getProductImage = (product: Product) => {
    if (product.image && !product.image.includes('placeholder')) {
      return product.image
    }
    const category = product.category?.toLowerCase().replace(/\s+/g, '-')
    return productImages[category as keyof typeof productImages] || productImages.default
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4">
        <div className="w-24 h-24 rounded-full bg-secondary flex items-center justify-center mb-6">
          <ShoppingBag size={40} className="text-muted-foreground" />
        </div>
        <h3 className="font-serif text-xl font-medium text-foreground mb-2">No products found</h3>
        <p className="text-muted-foreground text-center max-w-sm">
          Try adjusting your filters or search to find what you're looking for.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
      {products.map((product, idx) => {
        const discount = product.originalPrice
          ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
          : 0
        const isHovered = hoveredProduct === product.id

        return (
          <Link
            key={product.id}
            href={`/product/${product.id}`}
            className={`group reveal stagger-${(idx % 3) + 1}`}
            onMouseEnter={() => setHoveredProduct(product.id)}
            onMouseLeave={() => setHoveredProduct(null)}
          >
            {/* Product Card */}
            <div className="bg-card rounded-2xl overflow-hidden border border-border/50 hover:border-accent/30 transition-all duration-300 hover:shadow-premium-lg hover-lift">
              {/* Image Container */}
              <div className="relative aspect-[3/4] overflow-hidden bg-secondary">
                <img
                  src={getProductImage(product)}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                  {discount > 0 && (
                    <span className="px-3 py-1 text-[10px] font-semibold tracking-wider uppercase bg-accent text-accent-foreground rounded-full shadow-sm">
                      -{discount}%
                    </span>
                  )}
                </div>

                {/* Quick Actions */}
                <div className={`absolute top-3 right-3 flex flex-col gap-2 transition-all duration-300 ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'}`}>
                  <button
                    onClick={(e) => toggleFavorite(e, product.id)}
                    className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm ${favorites.has(product.id)
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
                    className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm text-foreground hover:bg-white flex items-center justify-center transition-all duration-300 shadow-sm"
                  >
                    <Eye size={16} />
                  </button>
                </div>

                {/* Add to Cart Button */}
                <div className={`absolute bottom-3 left-3 right-3 transition-all duration-300 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                  <button
                    onClick={(e) => handleAddToCart(e, product)}
                    className="w-full py-3 bg-foreground text-background text-sm font-medium rounded-xl flex items-center justify-center gap-2 hover:bg-foreground/90 transition-colors shadow-lg"
                  >
                    <ShoppingBag size={16} />
                    Add to Bag
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4 lg:p-5">
                {/* Category */}
                <p className="text-[11px] font-medium tracking-wider uppercase text-accent mb-2">
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
                      <Star
                        key={star}
                        size={14}
                        className={star <= Math.floor(product.rating)
                          ? 'fill-gold text-gold'
                          : 'fill-border text-border'
                        }
                      />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    ({product.reviews})
                  </span>
                </div>

                {/* Sizes */}
                {product.sizes && product.sizes.length > 0 && (
                  <div className="mb-3">
                    <div className="flex gap-1.5 flex-wrap">
                      {product.sizes.slice(0, 5).map((size) => (
                        <button
                          key={size}
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            setSelectedSizeByProduct((prev) => ({ ...prev, [product.id]: size }))
                          }}
                          className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all ${selectedSizeByProduct[product.id] === size
                              ? 'bg-foreground text-background'
                              : 'bg-secondary text-foreground hover:bg-secondary/80'
                            }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

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
                  {product.colors && product.colors.length > 0 && (
                    <div className="flex gap-1">
                      {product.colors.slice(0, 3).map((color, i) => (
                        <div
                          key={i}
                          className="w-4 h-4 rounded-full border border-border/50 shadow-sm"
                          style={{ backgroundColor: color.hex || color.name }}
                          title={color.name}
                        />
                      ))}
                      {product.colors.length > 3 && (
                        <span className="text-xs text-muted-foreground ml-1">+{product.colors.length - 3}</span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
