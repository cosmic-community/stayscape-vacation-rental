import Link from 'next/link'
import { getSessionUser } from '@/lib/session'

export default async function Header() {
  const user = await getSessionUser()
  
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white text-xl font-bold">S</span>
            </div>
            <span className="text-xl font-bold text-gray-600">StayScape</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-400 hover:text-gray-600 transition-colors">
              Home
            </Link>
            <Link href="/hosts" className="text-gray-400 hover:text-gray-600 transition-colors">
              Hosts
            </Link>
            <Link href="/listings" className="text-gray-400 hover:text-gray-600 transition-colors">
              Listings
            </Link>
            <Link href="/reviews" className="text-gray-400 hover:text-gray-600 transition-colors">
              Reviews
            </Link>
            <Link href="/contact" className="text-gray-400 hover:text-gray-600 transition-colors">
              Contact
            </Link>
          </nav>
          
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link href="/profile" className="text-gray-400 hover:text-gray-600 transition-colors font-medium">
                  {user.metadata.name}
                </Link>
              </>
            ) : (
              <>
                <Link href="/login" className="text-gray-400 hover:text-gray-600 transition-colors font-medium">
                  Sign In
                </Link>
                <Link href="/signup" className="btn-primary">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}