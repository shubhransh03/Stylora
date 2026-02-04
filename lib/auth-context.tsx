'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

export type User = {
  id: string
  email: string
  name: string
  phone?: string
  addresses?: Address[]
  orders?: Order[]
}

export type Address = {
  id: string
  name: string
  street: string
  city: string
  state: string
  pincode: string
  isDefault?: boolean
}

export type Order = {
  id: string
  date: string
  items: OrderItem[]
  total: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered'
}

export type OrderItem = {
  id: string
  name: string
  price: number
  quantity: number
}

type AuthContextType = {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  updateProfile: (data: Partial<User>) => void
  addAddress: (address: Address) => void
  removeAddress: (addressId: string) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('cilory-user')
    if (saved) {
      try {
        setUser(JSON.parse(saved))
      } catch (e) {
        console.error('Failed to load user:', e)
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    const newUser: User = {
      id: Math.random().toString(),
      email,
      name: email.split('@')[0],
      addresses: [],
      orders: [
        {
          id: 'order-1',
          date: '2024-01-15',
          items: [
            { id: 'p1', name: 'Classic Black Winter Coat', price: 4999, quantity: 1 },
          ],
          total: 4999,
          status: 'delivered',
        },
      ],
    }

    setUser(newUser)
    localStorage.setItem('cilory-user', JSON.stringify(newUser))
  }

  const signup = async (name: string, email: string, password: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    const newUser: User = {
      id: Math.random().toString(),
      email,
      name,
      addresses: [],
      orders: [],
    }

    setUser(newUser)
    localStorage.setItem('cilory-user', JSON.stringify(newUser))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('cilory-user')
  }

  const updateProfile = (data: Partial<User>) => {
    if (user) {
      const updated = { ...user, ...data }
      setUser(updated)
      localStorage.setItem('cilory-user', JSON.stringify(updated))
    }
  }

  const addAddress = (address: Address) => {
    if (user) {
      const updated = {
        ...user,
        addresses: [...(user.addresses || []), address],
      }
      setUser(updated)
      localStorage.setItem('cilory-user', JSON.stringify(updated))
    }
  }

  const removeAddress = (addressId: string) => {
    if (user) {
      const updated = {
        ...user,
        addresses: (user.addresses || []).filter((a) => a.id !== addressId),
      }
      setUser(updated)
      localStorage.setItem('cilory-user', JSON.stringify(updated))
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        signup,
        logout,
        updateProfile,
        addAddress,
        removeAddress,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
