'use client'

import Link from 'next/link'
import { Facebook, Twitter, Instagram, Youtube, MapPin, Phone, Mail, CreditCard, Shield, Truck } from 'lucide-react'

const footerLinks = {
  shop: [
    { name: 'All Products', href: '/shop' },
    { name: 'New Arrivals', href: '/shop?sort=newest' },
    { name: 'Best Sellers', href: '/shop?sort=rating' },
    { name: 'Winter Collection', href: '/shop?category=winter-wear' },
    { name: 'Designer Wear', href: '/shop?category=designer-clothes' },
    { name: 'Jewellery', href: '/shop?category=jewellery' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Our Story', href: '/story' },
    { name: 'Careers', href: '/careers' },
    { name: 'Press', href: '/press' },
    { name: 'Blog', href: '/blog' },
  ],
  support: [
    { name: 'Contact Us', href: '/contact' },
    { name: 'FAQs', href: '/faq' },
    { name: 'Shipping Info', href: '/shipping' },
    { name: 'Returns & Exchanges', href: '/returns' },
    { name: 'Size Guide', href: '/size-guide' },
    { name: 'Track Order', href: '/track-order' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
    { name: 'Accessibility', href: '/accessibility' },
  ],
}

const socialLinks = [
  { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
  { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: Youtube, href: 'https://youtube.com', label: 'Youtube' },
]

const paymentMethods = [
  { name: 'Visa', icon: '💳' },
  { name: 'Mastercard', icon: '💳' },
  { name: 'PayPal', icon: '💳' },
  { name: 'UPI', icon: '📱' },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-primary text-primary-foreground overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />
      </div>

      {/* Trust Badges */}
      <div className="relative border-b border-primary-foreground/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="flex items-center justify-center sm:justify-start gap-4">
              <div className="w-12 h-12 rounded-full bg-primary-foreground/10 flex items-center justify-center">
                <Truck size={22} className="text-gold" />
              </div>
              <div>
                <p className="font-medium text-primary-foreground">Free Shipping</p>
                <p className="text-sm text-primary-foreground/60">On orders over ₹2999</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary-foreground/10 flex items-center justify-center">
                <Shield size={22} className="text-gold" />
              </div>
              <div>
                <p className="font-medium text-primary-foreground">Secure Payments</p>
                <p className="text-sm text-primary-foreground/60">100% protected</p>
              </div>
            </div>
            <div className="flex items-center justify-center sm:justify-end gap-4">
              <div className="w-12 h-12 rounded-full bg-primary-foreground/10 flex items-center justify-center">
                <CreditCard size={22} className="text-gold" />
              </div>
              <div>
                <p className="font-medium text-primary-foreground">Easy Returns</p>
                <p className="text-sm text-primary-foreground/60">30-day return policy</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <Link href="/" className="inline-block">
              <span className="font-serif text-3xl font-medium text-primary-foreground">
                CILORY
              </span>
            </Link>
            <p className="mt-4 text-primary-foreground/70 max-w-xs leading-relaxed">
              Your destination for premium fashion. Curated collections
              for the modern woman who appreciates elegance and quality.
            </p>

            {/* Social Links */}
            <div className="flex gap-3 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors group"
                  aria-label={social.label}
                >
                  <social.icon size={18} className="text-primary-foreground/80 group-hover:text-primary-foreground transition-colors" />
                </a>
              ))}
            </div>

            {/* Contact Info */}
            <div className="mt-8 space-y-3">
              <a href="mailto:hello@cilory.com" className="flex items-center gap-3 text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                <Mail size={16} />
                hello@cilory.com
              </a>
              <a href="tel:+911234567890" className="flex items-center gap-3 text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                <Phone size={16} />
                +91 1234 567 890
              </a>
              <p className="flex items-start gap-3 text-sm text-primary-foreground/70">
                <MapPin size={16} className="flex-shrink-0 mt-0.5" />
                Mumbai, Maharashtra, India
              </p>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="font-medium text-primary-foreground mb-4">Shop</h4>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-medium text-primary-foreground mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="font-medium text-primary-foreground mb-4">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-medium text-primary-foreground mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative border-t border-primary-foreground/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-primary-foreground/60">
              © {currentYear} Cilory. All rights reserved.
            </p>

            {/* Payment Methods */}
            <div className="flex items-center gap-4">
              <span className="text-xs text-primary-foreground/50 uppercase tracking-wider">
                We Accept
              </span>
              <div className="flex gap-2">
                <div className="h-8 px-3 bg-primary-foreground/10 rounded flex items-center justify-center">
                  <span className="text-xs font-medium text-primary-foreground/80">Visa</span>
                </div>
                <div className="h-8 px-3 bg-primary-foreground/10 rounded flex items-center justify-center">
                  <span className="text-xs font-medium text-primary-foreground/80">MC</span>
                </div>
                <div className="h-8 px-3 bg-primary-foreground/10 rounded flex items-center justify-center">
                  <span className="text-xs font-medium text-primary-foreground/80">PayPal</span>
                </div>
                <div className="h-8 px-3 bg-primary-foreground/10 rounded flex items-center justify-center">
                  <span className="text-xs font-medium text-primary-foreground/80">UPI</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
