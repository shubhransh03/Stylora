'use client'

import React from "react"
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { Mail, Check, Sparkles, Gift, Truck, Shield } from 'lucide-react'

const features = [
  {
    icon: Gift,
    title: 'Exclusive Offers',
    description: 'Early access to sales & new arrivals',
  },
  {
    icon: Truck,
    title: 'Free Delivery',
    description: 'On your first subscription order',
  },
  {
    icon: Shield,
    title: 'VIP Benefits',
    description: 'Members-only discounts & perks',
  },
]

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [focused, setFocused] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
      setTimeout(() => {
        setSubmitted(false)
        setEmail('')
      }, 4000)
    }
  }

  return (
    <section className="relative py-20 lg:py-28 overflow-hidden">
      {/* Background with Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-primary" />

      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />
        {/* Decorative Lines */}
        <div className="absolute top-20 left-10 w-20 h-px bg-gradient-to-r from-primary-foreground/20 to-transparent" />
        <div className="absolute bottom-20 right-10 w-32 h-px bg-gradient-to-l from-primary-foreground/20 to-transparent" />
        <div className="absolute top-40 right-20 w-px h-20 bg-gradient-to-b from-primary-foreground/20 to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-xs font-medium tracking-wider uppercase bg-primary-foreground/10 text-primary-foreground rounded-full border border-primary-foreground/20">
              <Sparkles size={14} />
              Join Our Community
            </div>

            {/* Headline */}
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-primary-foreground mb-6 leading-tight">
              Unlock Exclusive Access to <span className="text-gradient-gold">Premium Fashion</span>
            </h2>

            {/* Description */}
            <p className="text-primary-foreground/80 text-lg mb-8 max-w-xl mx-auto lg:mx-0">
              Subscribe to receive curated style tips, early access to new collections,
              and exclusive member discounts. Join 50,000+ fashion enthusiasts.
            </p>

            {/* Newsletter Form */}
            <form onSubmit={handleSubmit} className="max-w-md mx-auto lg:mx-0">
              <div
                className={`relative flex items-center p-1.5 bg-primary-foreground/10 backdrop-blur-sm rounded-full border transition-all duration-300 ${focused
                    ? 'border-primary-foreground/40 shadow-glow'
                    : 'border-primary-foreground/20'
                  }`}
              >
                <div className="pl-4">
                  <Mail size={20} className="text-primary-foreground/60" />
                </div>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  required
                  className="flex-1 px-4 py-3 bg-transparent text-primary-foreground placeholder:text-primary-foreground/50 border-0 outline-none text-sm"
                />
                <Button
                  type="submit"
                  disabled={submitted}
                  className={`px-6 py-3 text-sm font-medium rounded-full transition-all duration-300 ${submitted
                      ? 'bg-green-500 hover:bg-green-500'
                      : 'bg-primary-foreground text-primary hover:bg-primary-foreground/90'
                    }`}
                >
                  {submitted ? (
                    <span className="flex items-center gap-2">
                      <Check size={16} />
                      Subscribed!
                    </span>
                  ) : (
                    'Subscribe'
                  )}
                </Button>
              </div>

              {/* Privacy Note */}
              <p className="text-primary-foreground/50 text-xs mt-4 text-center lg:text-left">
                By subscribing, you agree to our Privacy Policy. Unsubscribe anytime.
              </p>
            </form>
          </div>

          {/* Right Content - Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-6">
            {features.map((feature, idx) => (
              <div
                key={feature.title}
                className={`flex items-start gap-4 p-6 bg-primary-foreground/5 backdrop-blur-sm rounded-2xl border border-primary-foreground/10 hover:bg-primary-foreground/10 transition-all duration-300 reveal stagger-${idx + 1}`}
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary-foreground/10 flex items-center justify-center">
                  <feature.icon size={22} className="text-gold" />
                </div>
                <div>
                  <h3 className="font-medium text-primary-foreground mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-primary-foreground/70">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 pt-10 border-t border-primary-foreground/10">
          <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-16">
            <div className="text-center">
              <p className="text-3xl font-serif font-medium text-primary-foreground mb-1">50K+</p>
              <p className="text-sm text-primary-foreground/60">Happy Subscribers</p>
            </div>
            <div className="hidden sm:block w-px h-12 bg-primary-foreground/20" />
            <div className="text-center">
              <p className="text-3xl font-serif font-medium text-primary-foreground mb-1">15%</p>
              <p className="text-sm text-primary-foreground/60">First Order Discount</p>
            </div>
            <div className="hidden sm:block w-px h-12 bg-primary-foreground/20" />
            <div className="text-center">
              <p className="text-3xl font-serif font-medium text-primary-foreground mb-1">Weekly</p>
              <p className="text-sm text-primary-foreground/60">Style Inspiration</p>
            </div>
            <div className="hidden sm:block w-px h-12 bg-primary-foreground/20" />
            <div className="text-center">
              <p className="text-3xl font-serif font-medium text-primary-foreground mb-1">VIP</p>
              <p className="text-sm text-primary-foreground/60">Member Access</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
