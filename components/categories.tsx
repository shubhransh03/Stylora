'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

const categories = [
  {
    id: 1,
    name: 'Winter Collection',
    description: 'Luxurious coats & knitwear',
    image: '/images/category-winter.png',
    href: '/shop?category=winter-wear',
    itemCount: 48,
    gradient: 'from-amber-900/90 to-amber-700/80',
  },
  {
    id: 2,
    name: 'Designer Wear',
    description: 'Exclusive ethnic ensembles',
    image: '/images/product-designer-saree.png',
    href: '/shop?category=designer-clothes',
    itemCount: 86,
    gradient: 'from-emerald-900/90 to-emerald-700/80',
  },
  {
    id: 3,
    name: 'Fine Jewellery',
    description: 'Statement pieces & accessories',
    image: '/images/product-gold-necklace.png',
    href: '/shop?category=jewellery',
    itemCount: 124,
    gradient: 'from-stone-900/90 to-stone-700/80',
  },
  {
    id: 4,
    name: 'Nightwear',
    description: 'Silk & satin luxuries',
    image: '/images/product-silk-nightwear.png',
    href: '/shop?category=nightwear',
    itemCount: 36,
    gradient: 'from-rose-900/90 to-rose-700/80',
  },
]

export default function Categories() {
  return (
    <section className="relative py-20 lg:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <span className="inline-block text-xs font-medium tracking-[0.2em] uppercase text-accent mb-4">
            Curated Collections
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-foreground mb-4">
            Shop by Category
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore our diverse range of carefully curated fashion offerings,
            each collection handpicked for the discerning woman.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, idx) => (
            <Link
              key={category.id}
              href={category.href}
              className={`group relative overflow-hidden rounded-2xl aspect-[3/4] hover-lift reveal stagger-${idx + 1}`}
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover img-zoom"
                />
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t ${category.gradient}`} />
              </div>

              {/* Content */}
              <div className="relative h-full flex flex-col justify-end p-6 text-white">
                {/* Item Count Badge */}
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                  <span className="text-xs font-medium">{category.itemCount} items</span>
                </div>

                {/* Category Info */}
                <div className="flex items-end justify-between">
                  <div>
                    <h3 className="font-serif text-xl lg:text-2xl font-medium mb-1">
                      {category.name}
                    </h3>
                    <p className="text-sm text-white/80">
                      {category.description}
                    </p>
                  </div>

                  {/* Arrow Icon */}
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-white group-hover:text-foreground transition-all duration-300 transform group-hover:rotate-45">
                    <ArrowUpRight size={18} />
                  </div>
                </div>
              </div>

              {/* Hover Border Effect */}
              <div className="absolute inset-0 rounded-2xl border-2 border-white/0 group-hover:border-white/30 transition-colors duration-300" />
            </Link>
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center mt-12">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-foreground font-medium link-underline group"
          >
            View All Categories
            <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  )
}
