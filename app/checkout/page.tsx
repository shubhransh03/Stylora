'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ChevronLeft, Lock, Truck, AlertCircle, MapPin, CreditCard } from 'lucide-react'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { useCart } from '@/lib/cart-context'
import { useAuth } from '@/lib/auth-context'
import { Button } from '@/components/ui/button'

type CheckoutStep = 'address' | 'payment' | 'confirmation'

export default function CheckoutPage() {
  const router = useRouter()
  const { items, cartTotal, clearCart } = useCart()
  const { user, addAddress } = useAuth()
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('address')
  const [selectedAddress, setSelectedAddress] = useState<string>('')
  const [newAddress, setNewAddress] = useState({
    name: '',
    street: '',
    city: '',
    state: '',
    pincode: '',
  })
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'netbanking'>('card')
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  })
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderId, setOrderId] = useState('')

  if (!user) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 max-w-7xl mx-auto px-4 py-8 w-full">
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground mb-6">You need to be logged in to checkout</p>
            <Link href="/login">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8">
                Sign In to Continue
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 max-w-7xl mx-auto px-4 py-8 w-full">
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground mb-6">Your cart is empty</p>
            <Link href="/shop">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const shipping = cartTotal > 500 ? 0 : 100
  const tax = Math.round(cartTotal * 0.05)
  const total = cartTotal + shipping + tax

  const handleAddAddress = () => {
    if (newAddress.name && newAddress.street && newAddress.city && newAddress.state && newAddress.pincode) {
      addAddress({
        id: Math.random().toString(),
        ...newAddress,
      })
      setSelectedAddress(newAddress.name)
      setNewAddress({ name: '', street: '', city: '', state: '', pincode: '' })
    }
  }

  const handlePayment = async () => {
    if (!selectedAddress) {
      alert('Please select or add an address')
      return
    }

    if (currentStep === 'payment') {
      setIsProcessing(true)
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000))
      
      const newOrderId = `ORD-${Date.now()}`
      setOrderId(newOrderId)
      clearCart()
      setCurrentStep('confirmation')
      setIsProcessing(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex items-center gap-4">
              {(['address', 'payment', 'confirmation'] as const).map((step, idx) => (
                <div key={step} className="flex items-center gap-4">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition ${
                      currentStep === step || (currentStep !== 'address' && idx < 2)
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-foreground'
                    }`}
                  >
                    {idx + 1}
                  </div>
                  <span className="text-sm font-semibold text-foreground capitalize">{step}</span>
                  {idx < 2 && <div className="flex-1 h-1 bg-secondary mx-4" />}
                </div>
              ))}
            </div>
          </div>

          {currentStep === 'confirmation' ? (
            <div className="max-w-2xl mx-auto">
              <div className="bg-card border border-border rounded-lg p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Order Confirmed!</h1>
                <p className="text-muted-foreground mb-6">Thank you for your purchase</p>
                <div className="bg-secondary rounded-lg p-4 mb-8">
                  <p className="text-sm text-muted-foreground mb-1">Order Number</p>
                  <p className="text-2xl font-bold text-foreground">{orderId}</p>
                </div>
                <div className="space-y-3 mb-8">
                  <p className="text-foreground">
                    A confirmation email has been sent to <span className="font-semibold">{user.email}</span>
                  </p>
                  <p className="text-muted-foreground">You can track your order from your account dashboard</p>
                </div>
                <div className="flex gap-4 justify-center">
                  <Link href="/account">
                    <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8">
                      View Orders
                    </Button>
                  </Link>
                  <Link href="/shop">
                    <Button variant="outline" className="border-border hover:bg-secondary font-semibold px-8 bg-transparent">
                      Continue Shopping
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2">
                {/* Address Step */}
                {currentStep === 'address' && (
                  <div className="bg-card border border-border rounded-lg p-6">
                    <div className="flex items-center gap-3 mb-6">
                      <MapPin size={24} className="text-primary" />
                      <h2 className="text-2xl font-bold text-foreground">Delivery Address</h2>
                    </div>

                    {/* Saved Addresses */}
                    {user.addresses && user.addresses.length > 0 && (
                      <div className="mb-8">
                        <p className="font-semibold text-foreground mb-4">Select from Saved Addresses</p>
                        <div className="space-y-3 mb-6">
                          {user.addresses.map((address) => (
                            <label key={address.id} className="border border-border rounded-lg p-4 cursor-pointer hover:border-primary transition">
                              <div className="flex items-start gap-3">
                                <input
                                  type="radio"
                                  name="address"
                                  value={address.id}
                                  checked={selectedAddress === address.id}
                                  onChange={() => setSelectedAddress(address.id)}
                                  className="w-4 h-4 text-primary mt-1"
                                />
                                <div>
                                  <p className="font-semibold text-foreground">{address.name}</p>
                                  <p className="text-sm text-foreground">{address.street}</p>
                                  <p className="text-sm text-foreground">
                                    {address.city}, {address.state} {address.pincode}
                                  </p>
                                </div>
                              </div>
                            </label>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Add New Address */}
                    <div className="border-t border-border pt-6">
                      <p className="font-semibold text-foreground mb-4">Or Add a New Address</p>
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <input
                            type="text"
                            placeholder="Address Name (Home/Office)"
                            value={newAddress.name}
                            onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
                            className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                          <input
                            type="text"
                            placeholder="Street Address"
                            value={newAddress.street}
                            onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
                            className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <input
                            type="text"
                            placeholder="City"
                            value={newAddress.city}
                            onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                            className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                          <input
                            type="text"
                            placeholder="State"
                            value={newAddress.state}
                            onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                            className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                          <input
                            type="text"
                            placeholder="Pincode"
                            value={newAddress.pincode}
                            onChange={(e) => setNewAddress({ ...newAddress, pincode: e.target.value })}
                            className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                        </div>
                        <Button
                          onClick={handleAddAddress}
                          className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold w-full"
                        >
                          Use This Address
                        </Button>
                      </div>
                    </div>

                    <div className="mt-8 flex justify-end">
                      <Button
                        onClick={() => {
                          if (!selectedAddress) {
                            alert('Please select or add an address')
                            return
                          }
                          setCurrentStep('payment')
                        }}
                        className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8"
                      >
                        Continue to Payment
                      </Button>
                    </div>
                  </div>
                )}

                {/* Payment Step */}
                {currentStep === 'payment' && (
                  <div className="bg-card border border-border rounded-lg p-6">
                    <div className="flex items-center gap-3 mb-6">
                      <CreditCard size={24} className="text-primary" />
                      <h2 className="text-2xl font-bold text-foreground">Payment Method</h2>
                    </div>

                    <div className="space-y-4 mb-8">
                      {[
                        { id: 'card', label: 'Credit/Debit Card', icon: CreditCard },
                        { id: 'upi', label: 'UPI', icon: Lock },
                        { id: 'netbanking', label: 'Net Banking', icon: Lock },
                      ].map((method) => (
                        <label key={method.id} className="border border-border rounded-lg p-4 cursor-pointer hover:border-primary transition">
                          <div className="flex items-center gap-3">
                            <input
                              type="radio"
                              name="payment"
                              value={method.id}
                              checked={paymentMethod === method.id as any}
                              onChange={(e) => setPaymentMethod(e.target.value as any)}
                              className="w-4 h-4 text-primary"
                            />
                            <method.icon size={18} className="text-primary" />
                            <span className="font-semibold text-foreground">{method.label}</span>
                          </div>
                        </label>
                      ))}
                    </div>

                    {/* Card Details */}
                    {paymentMethod === 'card' && (
                      <div className="border border-border rounded-lg p-6 mb-8 bg-secondary">
                        <div className="space-y-4">
                          <input
                            type="text"
                            placeholder="Card Number"
                            value={cardDetails.cardNumber}
                            onChange={(e) => setCardDetails({ ...cardDetails, cardNumber: e.target.value.replace(/\s/g, '').slice(0, 16) })}
                            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                          <input
                            type="text"
                            placeholder="Cardholder Name"
                            value={cardDetails.cardName}
                            onChange={(e) => setCardDetails({ ...cardDetails, cardName: e.target.value })}
                            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                          <div className="grid grid-cols-2 gap-4">
                            <input
                              type="text"
                              placeholder="MM/YY"
                              value={cardDetails.expiryDate}
                              onChange={(e) => setCardDetails({ ...cardDetails, expiryDate: e.target.value })}
                              className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                            <input
                              type="text"
                              placeholder="CVV"
                              value={cardDetails.cvv}
                              onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value.slice(0, 3) })}
                              className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8 flex items-start gap-3">
                      <Lock size={18} className="text-blue-600 shrink-0 mt-0.5" />
                      <p className="text-sm text-blue-900">Your payment information is secure and encrypted</p>
                    </div>

                    <div className="flex gap-4 justify-between">
                      <Button
                        onClick={() => setCurrentStep('address')}
                        variant="outline"
                        className="border-border hover:bg-secondary font-semibold px-8 flex items-center gap-2"
                      >
                        <ChevronLeft size={18} />
                        Back
                      </Button>
                      <Button
                        onClick={handlePayment}
                        disabled={isProcessing}
                        className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8"
                      >
                        {isProcessing ? 'Processing...' : `Pay ₹${total}`}
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-card border border-border rounded-lg p-6 sticky top-24">
                  <h3 className="text-xl font-bold text-foreground mb-6">Order Summary</h3>

                  <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                    {items.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <div>
                          <p className="text-foreground font-medium truncate">{item.name}</p>
                          <p className="text-muted-foreground">Qty: {item.quantity}</p>
                        </div>
                        <p className="text-foreground font-semibold">₹{item.price * item.quantity}</p>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-border pt-6 space-y-4">
                    <div className="flex justify-between text-foreground">
                      <span>Subtotal</span>
                      <span>₹{cartTotal}</span>
                    </div>
                    <div className="flex justify-between text-foreground">
                      <span>Shipping</span>
                      <span className={shipping === 0 ? 'text-green-600 font-semibold' : ''}>
                        {shipping === 0 ? 'FREE' : `₹${shipping}`}
                      </span>
                    </div>
                    <div className="flex justify-between text-foreground">
                      <span>Tax (5%)</span>
                      <span>₹{tax}</span>
                    </div>
                    <div className="border-t border-border pt-4 flex justify-between text-lg font-bold text-foreground">
                      <span>Total</span>
                      <span>₹{total}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
