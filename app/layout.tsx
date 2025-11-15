import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CosmicBadge from '@/components/CosmicBadge'
import { getSessionUser } from '@/lib/session'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'StayScape - Find Your Perfect Vacation Rental',
  description: 'Discover and book unique vacation rentals around the world. From cozy cabins to beachfront villas, find your perfect getaway.',
  icons: {
    icon: '/favicon.svg',
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const bucketSlug = process.env.COSMIC_BUCKET_SLUG as string
  const user = await getSessionUser()
  
  return (
    <html lang="en">
      <head>
        <script src="/dashboard-console-capture.js" />
      </head>
      <body className={inter.className}>
        <Header user={user} />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <CosmicBadge bucketSlug={bucketSlug} />
      </body>
    </html>
  )
}