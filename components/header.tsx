'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ShoppingBag, Menu, X, Search, User, Heart, ChevronDown } from 'lucide-react'
import { useCart } from '@/lib/cart-context'

const navLinks = [
  {
    name: 'Shop',
    href: '/shop',
    submenu: [
      { name: 'All Products', href: '/shop' },
      { name: 'New Arrivals', href: '/shop?sort=newest' },
      { name: 'Best Sellers', href: '/shop?sort=rating' },
      { name: 'Sale', href: '/shop?sale=true' },
    ]
  },
  {
    name: 'Women',
    href: '/shop?category=women',
    submenu: [
      { name: 'Sarees', href: '/shop?category=women&type=saree' },
      { name: 'Kurtis', href: '/shop?category=kurtis' },
      { name: 'Dresses', href: '/shop?category=women&type=dress' },
      { name: 'Nightwear', href: '/shop?category=nightwear' },
    ]
  },
  {
    name: 'Men',
    href: '/shop?category=men',
    submenu: [
      { name: 'Shirts', href: '/shop?category=men&type=shirt' },
      { name: 'Jackets', href: '/shop?category=men&type=jacket' },
      { name: 'Ethnic Wear', href: '/shop?category=men&type=ethnic' },
    ]
  },
  {
    name: 'Jewellery',
    href: '/shop?category=jewellery',
    submenu: [
      { name: 'Necklaces', href: '/shop?category=jewellery&type=necklace' },
      { name: 'Earrings', href: '/shop?category=jewellery&type=earrings' },
      { name: 'Bracelets', href: '/shop?category=jewellery&type=bracelet' },
    ]
  },
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null)
  const [searchOpen, setSearchOpen] = useState(false)
  const { itemCount } = useCart()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-primary text-primary-foreground py-2 overflow-hidden">
        <div className="flex whitespace-nowrap">
          <div className="marquee flex items-center gap-8">
            <span className="text-xs tracking-widest uppercase">✦ Free Shipping on Orders Over ₹2999</span>
            <span className="text-xs tracking-widest uppercase">✦ New Winter Collection 2026</span>
            <span className="text-xs tracking-widest uppercase">✦ Premium Quality Guaranteed</span>
            <span className="text-xs tracking-widest uppercase">✦ Easy Returns Within 30 Days</span>
            <span className="text-xs tracking-widest uppercase">✦ Free Shipping on Orders Over ₹2999</span>
            <span className="text-xs tracking-widest uppercase">✦ New Winter Collection 2026</span>
            <span className="text-xs tracking-widest uppercase">✦ Premium Quality Guaranteed</span>
            <span className="text-xs tracking-widest uppercase">✦ Easy Returns Within 30 Days</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={`sticky top-0 z-50 transition-all duration-500 ${isScrolled
            ? 'bg-background/95 backdrop-blur-lg shadow-premium border-b border-border/50'
            : 'bg-background border-b border-transparent'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 -ml-2 hover:bg-secondary rounded-lg transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            {/* Logo */}
            <Link href="/" className="flex items-center group">
              <span className="font-serif text-2xl md:text-3xl font-medium tracking-tight text-foreground group-hover:text-accent transition-colors">
                CILORY
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <div
                  key={link.name}
                  className="relative"
                  onMouseEnter={() => setActiveSubmenu(link.name)}
                  onMouseLeave={() => setActiveSubmenu(null)}
                >
                  <Link
                    href={link.href}
                    className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors link-underline"
                  >
                    {link.name}
                    {link.submenu && <ChevronDown size={14} className={`transition-transform ${activeSubmenu === link.name ? 'rotate-180' : ''}`} />}
                  </Link>

                  {/* Dropdown Menu */}
                  {link.submenu && activeSubmenu === link.name && (
                    <div className="absolute top-full left-0 pt-2 w-48 scale-in">
                      <div className="bg-card rounded-xl shadow-premium-lg border border-border/50 overflow-hidden">
                        {link.submenu.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className="block px-4 py-3 text-sm text-foreground/80 hover:text-foreground hover:bg-secondary/50 transition-colors"
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Right Icons */}
            <div className="flex items-center gap-1">
              {/* Search */}
              <button
                className="p-2.5 hover:bg-secondary rounded-full transition-colors"
                onClick={() => setSearchOpen(true)}
                aria-label="Search"
              >
                <Search size={20} className="text-foreground/80" />
              </button>

              {/* Wishlist */}
              <Link
                href="/wishlist"
                className="hidden sm:flex p-2.5 hover:bg-secondary rounded-full transition-colors"
                aria-label="Wishlist"
              >
                <Heart size={20} className="text-foreground/80" />
              </Link>

              {/* Account */}
              <Link
                href="/account"
                className="p-2.5 hover:bg-secondary rounded-full transition-colors"
                aria-label="Account"
              >
                <User size={20} className="text-foreground/80" />
              </Link>

              {/* Cart */}
              <Link
                href="/cart"
                className="p-2.5 hover:bg-secondary rounded-full transition-colors relative group"
                aria-label="Cart"
              >
                <ShoppingBag size={20} className="text-foreground/80 group-hover:text-foreground transition-colors" />
                {itemCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-accent text-accent-foreground text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-md transform transition-transform group-hover:scale-110">
                    {itemCount > 9 ? '9+' : itemCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-foreground/20 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          {/* Menu Panel */}
          <nav className="absolute top-[calc(2.5rem+4rem)] left-0 right-0 bg-background border-b border-border shadow-premium-lg max-h-[70vh] overflow-y-auto fade-in-up">
            <div className="p-4 space-y-1">
              {navLinks.map((link) => (
                <div key={link.name} className="border-b border-border/50 last:border-0">
                  <Link
                    href={link.href}
                    className="flex items-center justify-between py-4 text-lg font-medium text-foreground hover:text-accent transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                  {link.submenu && (
                    <div className="pb-3 pl-4 space-y-2">
                      {link.submenu.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="block py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </nav>
        </div>
      )}

      {/* Search Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20">
          <div
            className="absolute inset-0 bg-foreground/40 backdrop-blur-md"
            onClick={() => setSearchOpen(false)}
          />
          <div className="relative w-full max-w-2xl mx-4 scale-in">
            <div className="bg-card rounded-2xl shadow-premium-lg border border-border/50 overflow-hidden">
              <div className="flex items-center gap-4 p-4">
                <Search size={24} className="text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search for products, categories, brands..."
                  className="flex-1 text-lg bg-transparent border-0 outline-none placeholder:text-muted-foreground"
                  autoFocus
                />
                <button
                  onClick={() => setSearchOpen(false)}
                  className="p-2 hover:bg-secondary rounded-full transition-colors"
                >
                  <X size={20} className="text-muted-foreground" />
                </button>
              </div>
              <div className="border-t border-border/50 p-4">
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">Popular Searches</p>
                <div className="flex flex-wrap gap-2">
                  {['Winter Coats', 'Designer Sarees', 'Gold Necklace', 'Silk Nightwear'].map((term) => (
                    <button
                      key={term}
                      className="px-4 py-2 text-sm text-foreground/80 bg-secondary hover:bg-secondary/80 rounded-full transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
