'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Heart, Share2, Truck, CheckCircle, RotateCcw } from 'lucide-react'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { getProductById } from '@/lib/products'
import { useCart } from '@/lib/cart-context'
import { Button } from '@/components/ui/button'

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = getProductById(params.id)
  const { addToCart } = useCart()
  
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState<string | undefined>(product?.sizes?.[0])
  const [selectedColor, setSelectedColor] = useState<string | undefined>(product?.colors?.[0]?.name)
  const [quantity, setQuantity] = useState(1)
  const [isFavorite, setIsFavorite] = useState(false)
  const [activeTab, setActiveTab] = useState<'description' | 'reviews'>('description')

  if (!product) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 max-w-7xl mx-auto px-4 py-8">
          <p className="text-lg text-muted-foreground">Product not found</p>
          <Link href="/shop" className="text-primary hover:underline mt-4 inline-block">
            Back to Shop
          </Link>
        </main>
        <Footer />
      </div>
    )
  }

  const images = product.images || [product.image]
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize, selectedColor)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-8 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary">
              Home
            </Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-primary">
              Shop
            </Link>
            <span>/</span>
            <span className="text-foreground font-semibold">{product.name}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Product Images */}
            <div>
              <div className="relative bg-secondary rounded-lg overflow-hidden mb-4 aspect-square">
                <img src={images[selectedImage] || "/placeholder.svg"} alt={product.name} className="w-full h-full object-cover" />
                {discount > 0 && (
                  <div className="absolute top-4 right-4 bg-accent text-accent-foreground px-4 py-2 rounded-full font-bold">
                    -{discount}%
                  </div>
                )}
              </div>

              {/* Image Thumbnails */}
              {images.length > 1 && (
                <div className="flex gap-4">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition ${
                        selectedImage === idx ? 'border-primary' : 'border-border'
                      }`}
                    >
                      <img src={img || "/placeholder.svg"} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Details */}
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-sm text-muted-foreground capitalize mb-2">{product.category}</p>
                  <h1 className="text-3xl font-bold text-foreground mb-2">{product.name}</h1>
                </div>
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className="p-3 hover:bg-secondary rounded-lg transition"
                >
                  <Heart
                    size={24}
                    className={isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}
                  />
                </button>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-lg ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">({product.reviews} reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-6 pb-6 border-b border-border">
                <span className="text-4xl font-bold text-foreground">₹{product.price}</span>
                {product.originalPrice && (
                  <span className="text-xl text-muted-foreground line-through">₹{product.originalPrice}</span>
                )}
              </div>

              {/* Stock Status */}
              <div className="flex items-center gap-2 mb-6 text-sm">
                <CheckCircle size={18} className="text-green-600" />
                <span className="text-foreground font-semibold">In Stock</span>
              </div>

              {/* Colors */}
              {product.colors && product.colors.length > 0 && (
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-foreground mb-3">Color</label>
                  <div className="flex gap-3 flex-wrap">
                    {product.colors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color.name)}
                        className={`w-10 h-10 rounded-full border-2 transition ${
                          selectedColor === color.name ? 'border-primary ring-2 ring-primary ring-offset-2' : 'border-border'
                        }`}
                        style={{ backgroundColor: color.code }}
                        title={color.name}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Sizes */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-foreground mb-3">Size</label>
                  <div className="flex gap-3 flex-wrap">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-5 py-2 border-2 rounded-lg font-semibold transition ${
                          selectedSize === size
                            ? 'border-primary bg-primary text-primary-foreground'
                            : 'border-border text-foreground hover:border-primary'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-foreground mb-3">Quantity</label>
                <div className="flex items-center gap-4 w-fit border border-border rounded-lg p-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1 hover:bg-secondary rounded transition"
                  >
                    −
                  </button>
                  <span className="w-8 text-center font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1 hover:bg-secondary rounded transition"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to Cart */}
              <Button
                onClick={handleAddToCart}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-lg py-3 mb-4"
              >
                Add to Cart
              </Button>

              {/* Buy Now */}
              <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold text-lg py-3 mb-8">
                Buy Now
              </Button>

              {/* Benefits */}
              <div className="space-y-4 pt-6 border-t border-border">
                <div className="flex items-start gap-4">
                  <Truck size={24} className="text-primary shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-foreground">Free Delivery</p>
                    <p className="text-sm text-muted-foreground">On orders above ₹500</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <RotateCcw size={24} className="text-primary shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-foreground">Easy Returns</p>
                    <p className="text-sm text-muted-foreground">30-day return policy</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-16">
            <div className="border-b border-border flex gap-8">
              {(['description', 'reviews'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 font-semibold capitalize transition ${
                    activeTab === tab
                      ? 'text-primary border-b-2 border-primary -mb-1'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {activeTab === 'description' && (
              <div className="py-8">
                <h3 className="text-lg font-bold text-foreground mb-4">Product Description</h3>
                <p className="text-foreground leading-relaxed">{product.description}</p>
                <div className="mt-6 p-4 bg-secondary rounded-lg">
                  <h4 className="font-semibold text-foreground mb-2">Key Features</h4>
                  <ul className="space-y-2 text-sm text-foreground">
                    <li>• Premium quality materials</li>
                    <li>• Comfortable fit and design</li>
                    <li>• Available in multiple sizes and colors</li>
                    <li>• Perfect for any occasion</li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="py-8">
                <h3 className="text-lg font-bold text-foreground mb-4">Customer Reviews</h3>
                <div className="space-y-4">
                  {[
                    { name: 'Sarah M.', rating: 5, text: 'Excellent quality and great design!' },
                    { name: 'John D.', rating: 4, text: 'Good product, fast delivery.' },
                    { name: 'Emma L.', rating: 5, text: 'Exactly as described. Highly recommended!' },
                  ].map((review, idx) => (
                    <div key={idx} className="border border-border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-semibold text-foreground">{review.name}</p>
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <span
                              key={i}
                              className={`text-sm ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-foreground">{review.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
