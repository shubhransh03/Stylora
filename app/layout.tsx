import React from "react"
import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { CartProvider } from '@/lib/cart-context'
import { AuthProvider } from '@/lib/auth-context'
import './globals.css'

const inter = Inter({
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-inter'
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-playfair',
  weight: ['400', '500', '600', '700']
});

export const metadata: Metadata = {
  title: 'CILORY — Premium Fashion & Designer Wear',
  description: 'Discover curated collections of luxury winter wear, designer clothes, fashion jewellery & nightwear. Elevate your style with premium fashion.',
  keywords: ['fashion', 'designer clothes', 'winter wear', 'luxury fashion', 'premium clothing', 'jewellery'],
  authors: [{ name: 'CILORY' }],
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: 'CILORY — Premium Fashion & Designer Wear',
    description: 'Discover curated collections of luxury winter wear, designer clothes, fashion jewellery & nightwear.',
    type: 'website',
    locale: 'en_US',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased">
        <AuthProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
