'use client'

import React from "react"

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { LogOut, MapPin, Package, User as UserIcon, Plus, Trash2, Edit } from 'lucide-react'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { useAuth } from '@/lib/auth-context'
import { Button } from '@/components/ui/button'

export default function AccountPage() {
  const router = useRouter()
  const { user, logout, addAddress, removeAddress } = useAuth()
  const [activeTab, setActiveTab] = useState<'profile' | 'addresses' | 'orders'>('profile')
  const [showAddressForm, setShowAddressForm] = useState(false)
  const [newAddress, setNewAddress] = useState({
    name: '',
    street: '',
    city: '',
    state: '',
    pincode: '',
  })

  if (!user) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 max-w-7xl mx-auto px-4 py-8 w-full">
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground mb-6">You need to be logged in to view your account</p>
            <div className="flex gap-4 justify-center">
              <Link href="/login">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8">
                  Sign In
                </Button>
              </Link>
              <Link href="/signup">
                <Button variant="outline" className="border-border hover:bg-secondary font-semibold px-8 bg-transparent">
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault()
    addAddress({
      id: Math.random().toString(),
      name: newAddress.name,
      street: newAddress.street,
      city: newAddress.city,
      state: newAddress.state,
      pincode: newAddress.pincode,
    })
    setNewAddress({ name: '', street: '', city: '', state: '', pincode: '' })
    setShowAddressForm(false)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-foreground">My Account</h1>
            <Button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 text-white font-semibold">
              <LogOut size={18} className="mr-2" />
              Logout
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-lg">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{user.name}</p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                </div>

                <nav className="space-y-2">
                  {[
                    { id: 'profile', label: 'Profile', icon: UserIcon },
                    { id: 'addresses', label: 'Addresses', icon: MapPin },
                    { id: 'orders', label: 'Orders', icon: Package },
                  ].map((tab) => {
                    const Icon = tab.icon
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                          activeTab === tab.id
                            ? 'bg-primary text-primary-foreground'
                            : 'text-foreground hover:bg-secondary'
                        }`}
                      >
                        <Icon size={18} />
                        <span className="font-medium">{tab.label}</span>
                      </button>
                    )
                  })}
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div className="bg-card border border-border rounded-lg p-6">
                  <h2 className="text-2xl font-bold text-foreground mb-6">Profile Information</h2>
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
                        <input
                          type="text"
                          defaultValue={user.name}
                          className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                        <input
                          type="email"
                          defaultValue={user.email}
                          className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Phone Number</label>
                      <input
                        type="tel"
                        placeholder="+91 XXXXX XXXXX"
                        defaultValue={user.phone || ''}
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8">
                      Save Changes
                    </Button>
                  </form>
                </div>
              )}

              {/* Addresses Tab */}
              {activeTab === 'addresses' && (
                <div className="space-y-6">
                  <div className="bg-card border border-border rounded-lg p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-bold text-foreground">Saved Addresses</h2>
                      <Button
                        onClick={() => setShowAddressForm(!showAddressForm)}
                        className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                      >
                        <Plus size={18} className="mr-2" />
                        Add Address
                      </Button>
                    </div>

                    {showAddressForm && (
                      <form onSubmit={handleAddAddress} className="border-b border-border pb-6 mb-6 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <input
                            type="text"
                            placeholder="Address Name"
                            value={newAddress.name}
                            onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
                            className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                            required
                          />
                          <input
                            type="text"
                            placeholder="Street Address"
                            value={newAddress.street}
                            onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
                            className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                            required
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <input
                            type="text"
                            placeholder="City"
                            value={newAddress.city}
                            onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                            className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                            required
                          />
                          <input
                            type="text"
                            placeholder="State"
                            value={newAddress.state}
                            onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                            className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                            required
                          />
                          <input
                            type="text"
                            placeholder="Pincode"
                            value={newAddress.pincode}
                            onChange={(e) => setNewAddress({ ...newAddress, pincode: e.target.value })}
                            className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                            required
                          />
                        </div>
                        <div className="flex gap-4">
                          <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
                            Save Address
                          </Button>
                          <Button
                            type="button"
                            onClick={() => setShowAddressForm(false)}
                            variant="outline"
                            className="border-border hover:bg-secondary"
                          >
                            Cancel
                          </Button>
                        </div>
                      </form>
                    )}

                    {user.addresses && user.addresses.length > 0 ? (
                      <div className="space-y-4">
                        {user.addresses.map((address) => (
                          <div key={address.id} className="border border-border rounded-lg p-4 flex items-start justify-between">
                            <div>
                              <p className="font-semibold text-foreground">{address.name}</p>
                              <p className="text-sm text-foreground">{address.street}</p>
                              <p className="text-sm text-foreground">
                                {address.city}, {address.state} {address.pincode}
                              </p>
                            </div>
                            <div className="flex gap-2">
                              <button className="p-2 text-foreground hover:bg-secondary rounded-lg transition">
                                <Edit size={18} />
                              </button>
                              <button
                                onClick={() => removeAddress(address.id)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-center text-muted-foreground py-8">No saved addresses yet</p>
                    )}
                  </div>
                </div>
              )}

              {/* Orders Tab */}
              {activeTab === 'orders' && (
                <div className="bg-card border border-border rounded-lg p-6">
                  <h2 className="text-2xl font-bold text-foreground mb-6">My Orders</h2>
                  {user.orders && user.orders.length > 0 ? (
                    <div className="space-y-4">
                      {user.orders.map((order) => (
                        <div key={order.id} className="border border-border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <p className="font-semibold text-foreground">Order {order.id}</p>
                              <p className="text-sm text-muted-foreground">{new Date(order.date).toLocaleDateString()}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-foreground">₹{order.total}</p>
                              <p className={`text-sm font-semibold capitalize ${order.status === 'delivered' ? 'text-green-600' : 'text-blue-600'}`}>
                                {order.status}
                              </p>
                            </div>
                          </div>
                          <div className="space-y-2 border-t border-border pt-4">
                            {order.items.map((item) => (
                              <div key={item.id} className="flex justify-between text-sm">
                                <span className="text-foreground">{item.name}</span>
                                <span className="text-muted-foreground">₹{item.price} × {item.quantity}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-muted-foreground py-8">No orders yet</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
