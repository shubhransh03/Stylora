'use client'

import Link from 'next/link'
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Sparkles, Truck, Shield, RotateCcw } from 'lucide-react'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { useCart } from '@/lib/cart-context'
import { Button } from '@/components/ui/button'

const productImages = {
  'winter-wear': '/images/product-winter-coat.png',
  'designer-clothes': '/images/product-designer-saree.png',
  'jewellery': '/images/product-gold-necklace.png',
  'nightwear': '/images/product-silk-nightwear.png',
  'default': '/images/product-winter-coat.png',
}

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, cartTotal } = useCart()

  const subtotal = cartTotal
  const shipping = subtotal > 2999 ? 0 : 199
  const tax = Math.round(subtotal * 0.05)
  const total = subtotal + shipping + tax

  const getProductImage = (item: typeof items[0]) => {
    if (item.image && !item.image.includes('placeholder')) {
      return item.image
    }
    const category = item.category?.toLowerCase().replace(/\s+/g, '-')
    return productImages[category as keyof typeof productImages] || productImages.default
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <Header />
        <main className="flex-1">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
            <div className="flex flex-col items-center justify-center text-center">
              <div className="w-24 h-24 rounded-full bg-secondary flex items-center justify-center mb-6">
                <ShoppingBag size={40} className="text-muted-foreground" />
              </div>
              <h1 className="font-serif text-3xl lg:text-4xl font-medium text-foreground mb-4">Your Cart is Empty</h1>
              <p className="text-muted-foreground mb-8 max-w-md">
                Looks like you haven't added anything to your cart yet. Start exploring our premium collections.
              </p>
              <Link href="/shop">
                <Button className="btn-shine bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 rounded-full text-base font-medium shadow-premium group">
                  Continue Shopping
                  <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-serif text-3xl lg:text-4xl font-medium text-foreground">Shopping Bag</h1>
              <p className="text-muted-foreground mt-1">{items.length} {items.length === 1 ? 'item' : 'items'}</p>
            </div>
            <Link href="/shop" className="hidden sm:flex items-center gap-2 text-foreground font-medium link-underline">
              Continue Shopping
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="bg-card border border-border/50 rounded-2xl p-4 sm:p-6 hover:shadow-premium transition-all">
                  <div className="flex gap-4 sm:gap-6">
                    {/* Product Image */}
                    <Link href={`/product/${item.id}`}>
                      <div className="w-24 h-24 sm:w-32 sm:h-32 bg-secondary rounded-xl overflow-hidden shrink-0 group">
                        <img
                          src={getProductImage(item)}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    </Link>

                    {/* Product Details */}
                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      <div>
                        <Link href={`/product/${item.id}`}>
                          <h3 className="font-medium text-foreground hover:text-accent transition-colors line-clamp-1">{item.name}</h3>
                        </Link>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1.5 text-sm text-muted-foreground">
                          {item.selectedColor && <span>Color: {item.selectedColor}</span>}
                          {item.selectedSize && <span>Size: {item.selectedSize}</span>}
                        </div>
                        <div className="flex items-baseline gap-2 mt-3">
                          <span className="text-lg font-semibold text-foreground">₹{item.price.toLocaleString()}</span>
                          {item.originalPrice && (
                            <span className="text-sm text-muted-foreground line-through">₹{item.originalPrice.toLocaleString()}</span>
                          )}
                        </div>
                      </div>

                      {/* Quantity and Remove */}
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-1 bg-secondary rounded-lg p-1">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-background rounded-md transition-colors"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="w-10 text-center font-medium text-foreground">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-background rounded-md transition-colors"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>

                    {/* Item Total (Desktop) */}
                    <div className="hidden sm:flex flex-col items-end justify-between">
                      <span className="text-lg font-semibold text-foreground">
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-32 space-y-6">
                <div className="bg-card border border-border/50 rounded-2xl p-6 shadow-premium">
                  <h2 className="font-serif text-xl font-medium text-foreground mb-6">Order Summary</h2>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-foreground">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-medium">₹{subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-foreground">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className={shipping === 0 ? 'text-success font-medium' : 'font-medium'}>
                        {shipping === 0 ? 'FREE' : `₹${shipping}`}
                      </span>
                    </div>
                    <div className="flex justify-between text-foreground">
                      <span className="text-muted-foreground">Tax (5%)</span>
                      <span className="font-medium">₹{tax.toLocaleString()}</span>
                    </div>
                    <div className="h-px bg-border my-4" />
                    <div className="flex justify-between text-lg font-semibold text-foreground">
                      <span>Total</span>
                      <span>₹{total.toLocaleString()}</span>
                    </div>
                  </div>

                  {subtotal < 2999 && (
                    <div className="bg-accent/10 border border-accent/20 rounded-xl p-4 mb-6">
                      <div className="flex items-center gap-3">
                        <Sparkles size={18} className="text-accent" />
                        <p className="text-sm text-foreground">
                          Add <strong>₹{(2999 - subtotal).toLocaleString()}</strong> more for free shipping!
                        </p>
                      </div>
                    </div>
                  )}

                  <Link href="/checkout">
                    <Button className="w-full btn-shine bg-foreground hover:bg-foreground/90 text-background py-6 rounded-xl text-base font-medium">
                      Proceed to Checkout
                    </Button>
                  </Link>

                  <Link href="/shop">
                    <Button variant="outline" className="w-full mt-3 border-border/50 hover:bg-secondary rounded-xl py-3">
                      Continue Shopping
                    </Button>
                  </Link>
                </div>

                {/* Trust Badges */}
                <div className="bg-card border border-border/50 rounded-2xl p-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                      <Truck size={18} className="text-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Free Shipping</p>
                      <p className="text-xs text-muted-foreground">On orders over ₹2999</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                      <RotateCcw size={18} className="text-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Easy Returns</p>
                      <p className="text-xs text-muted-foreground">30-day return policy</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                      <Shield size={18} className="text-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Secure Checkout</p>
                      <p className="text-xs text-muted-foreground">100% protected payments</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
