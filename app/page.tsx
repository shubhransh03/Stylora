'use client'

import Header from '@/components/header'
import Hero from '@/components/hero'
import Categories from '@/components/categories'
import FeaturedProducts from '@/components/featured-products'
import Newsletter from '@/components/newsletter'
import Footer from '@/components/footer'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Hero />
        <Categories />
        <FeaturedProducts />
        <Newsletter />
      </main>
      <Footer />
    </div>
  )
}
