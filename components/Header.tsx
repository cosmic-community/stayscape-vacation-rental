'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

interface HeaderProps {
  user?: {
    metadata: {
      name: string
    }
  } | null
}

export default function Header({ user }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Close mobile menu when screen size changes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [mobileMenuOpen])

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
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-400 hover:text-gray-600 transition-colors">
              Home
            </Link>
            <Link href="/about" className="text-gray-400 hover:text-gray-600 transition-colors">
              About
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
          
          {/* Desktop User Actions */}
          <div className="hidden md:flex items-center space-x-4">
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

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-gray-800 transition-colors"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
          
          {/* Mobile Menu Panel */}
          <div className="fixed top-[73px] left-0 right-0 bottom-0 bg-white z-50 md:hidden overflow-y-auto">
            <nav className="px-4 py-6 space-y-1">
              <Link 
                href="/" 
                className="block px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/about" 
                className="block px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                href="/hosts" 
                className="block px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Hosts
              </Link>
              <Link 
                href="/listings" 
                className="block px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Listings
              </Link>
              <Link 
                href="/reviews" 
                className="block px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Reviews
              </Link>
              <Link 
                href="/contact" 
                className="block px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>

              {/* Mobile User Actions */}
              <div className="pt-6 mt-6 border-t border-gray-100 space-y-2">
                {user ? (
                  <Link 
                    href="/profile" 
                    className="block px-4 py-3 text-gray-600 font-medium hover:bg-gray-50 rounded-lg transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {user.metadata.name}
                  </Link>
                ) : (
                  <>
                    <Link 
                      href="/login" 
                      className="block px-4 py-3 text-gray-600 font-medium hover:bg-gray-50 rounded-lg transition-colors text-center"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Sign In
                    </Link>
                    <Link 
                      href="/signup" 
                      className="block px-4 py-3 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg transition-colors text-center"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </div>
        </>
      )}
    </header>
  )
}