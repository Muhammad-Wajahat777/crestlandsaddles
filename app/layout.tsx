import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { CartProvider } from '@/components/CartProvider'

export const metadata: Metadata = {
  title: 'Crestland Saddlery — Handcrafted Horse Saddles',
  description: 'Premium handcrafted horse saddles for every rider. Western, English, custom-made to order.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  )
}
