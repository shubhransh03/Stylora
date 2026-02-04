'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-secondary via-background to-secondary/30">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] rounded-full bg-gradient-to-br from-accent/10 to-transparent blur-3xl" />
        <div className="absolute -bottom-1/2 -left-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-gold/10 to-transparent blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-[calc(100vh-12rem)] py-12 lg:py-20">
          {/* Left Content */}
          <div className="flex flex-col gap-6 lg:gap-8 order-2 lg:order-1 text-center lg:text-left">
            {/* Badge */}
            <div className="reveal stagger-1 flex justify-center lg:justify-start">
              <span className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium tracking-wider uppercase bg-accent/10 text-accent rounded-full border border-accent/20">
                <Sparkles size={14} />
                New Winter Collection 2026
              </span>
            </div>

            {/* Headline */}
            <h1 className="reveal stagger-2 font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-medium text-foreground leading-[1.1] tracking-tight">
              Elegance <span className="text-gradient-gold">Redefined</span> for the Modern Woman
            </h1>

            {/* Description */}
            <p className="reveal stagger-3 text-lg lg:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Discover our curated collection of premium winter wear, designer clothes,
              and exquisite fashion jewellery. Crafted for those who appreciate the finest.
            </p>

            {/* CTA Buttons */}
            <div className="reveal stagger-4 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/shop">
                <Button
                  size="lg"
                  className="btn-shine bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-base font-medium rounded-full shadow-premium hover-lift group"
                >
                  Explore Collection
                  <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/shop?new=true">
                <Button
                  size="lg"
                  variant="outline"
                  className="px-8 py-6 text-base font-medium rounded-full border-2 border-foreground/20 hover:border-foreground/40 hover:bg-secondary/50 transition-all"
                >
                  New Arrivals
                </Button>
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="reveal stagger-5 flex flex-col sm:flex-row items-center gap-6 pt-4 justify-center lg:justify-start">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-gradient-to-br from-accent/30 to-gold/30 border-2 border-background flex items-center justify-center text-xs font-medium"
                    >
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  <strong className="text-foreground">50k+</strong> Happy Customers
                </span>
              </div>
              <div className="hidden sm:block w-px h-6 bg-border" />
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <span key={i} className="text-gold text-lg">★</span>
                ))}
                <span className="ml-1 text-sm text-muted-foreground">
                  <strong className="text-foreground">4.9</strong> Rating
                </span>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative order-1 lg:order-2 reveal stagger-3">
            <div className="relative aspect-[4/5] max-w-lg mx-auto lg:max-w-none">
              {/* Main Image */}
              <div className="relative h-full rounded-3xl overflow-hidden shadow-premium-lg">
                <img
                  src="/images/hero-banner.png"
                  alt="Premium Fashion Collection"
                  className="w-full h-full object-cover object-top"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 via-transparent to-transparent" />
              </div>

              {/* Floating Card 1 */}
              <div className="absolute -left-4 sm:-left-8 top-1/4 bg-card/95 backdrop-blur-lg rounded-2xl shadow-premium p-4 border border-border/50 hover-lift hidden sm:block">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/20 to-gold/20 flex items-center justify-center">
                    <span className="text-2xl">✨</span>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Premium Quality</p>
                    <p className="font-medium text-foreground">Handcrafted Designs</p>
                  </div>
                </div>
              </div>

              {/* Floating Card 2 */}
              <div className="absolute -right-4 sm:-right-8 bottom-1/4 bg-card/95 backdrop-blur-lg rounded-2xl shadow-premium p-4 border border-border/50 hover-lift hidden sm:block">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold/20 to-accent/20 flex items-center justify-center">
                    <span className="text-2xl">🚚</span>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Free Shipping</p>
                    <p className="font-medium text-foreground">Orders over ₹2999</p>
                  </div>
                </div>
              </div>

              {/* Decorative Ring */}
              <div className="absolute -z-10 inset-4 rounded-3xl border-2 border-dashed border-accent/20" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave Divider */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  )
}
