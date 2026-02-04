'use client'

import React from "react"

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { User, Mail, Lock, Eye, EyeOff, CheckCircle } from 'lucide-react'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { useAuth } from '@/lib/auth-context'
import { Button } from '@/components/ui/button'

export default function SignupPage() {
  const router = useRouter()
  const { signup } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    setIsLoading(true)

    try {
      await signup(name, email, password)
      router.push('/account')
    } catch (err) {
      setError('Signup failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <div className="bg-card border border-border rounded-lg p-8">
            <h1 className="text-3xl font-bold text-foreground text-center mb-2">Create Account</h1>
            <p className="text-center text-muted-foreground mb-8">Join Cilory and start shopping</p>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
                <div className="relative">
                  <User size={18} className="absolute left-3 top-3 text-muted-foreground" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Email Address</label>
                <div className="relative">
                  <Mail size={18} className="absolute left-3 top-3 text-muted-foreground" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Password</label>
                <div className="relative">
                  <Lock size={18} className="absolute left-3 top-3 text-muted-foreground" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a password"
                    className="w-full pl-10 pr-10 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Confirm Password</label>
                <div className="relative">
                  <Lock size={18} className="absolute left-3 top-3 text-muted-foreground" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your password"
                    className="w-full pl-10 pr-10 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-border mt-1" required />
                <span className="text-sm text-foreground">
                  I agree to the{' '}
                  <Link href="#" className="text-primary hover:underline">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link href="#" className="text-primary hover:underline">
                    Privacy Policy
                  </Link>
                </span>
              </label>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-2"
              >
                {isLoading ? 'Creating account...' : 'Create Account'}
              </Button>
            </form>

            <p className="text-center text-sm text-muted-foreground mt-6">
              Already have an account?{' '}
              <Link href="/login" className="text-primary hover:underline font-semibold">
                Sign in
              </Link>
            </p>
          </div>

          {/* Benefits */}
          <div className="mt-8 grid grid-cols-1 gap-4">
            {[
              { icon: CheckCircle, text: 'Access saved addresses' },
              { icon: CheckCircle, text: 'Track your orders' },
              { icon: CheckCircle, text: 'Exclusive offers' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-muted-foreground">
                <item.icon size={20} className="text-primary shrink-0" />
                <span className="text-sm">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
