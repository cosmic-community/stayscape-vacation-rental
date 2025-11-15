'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { Listing } from '@/types'

interface BookingCardProps {
  listing: Listing
  userId: string | null
}

export default function BookingCard({ listing, userId }: BookingCardProps) {
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [guests, setGuests] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const calculateTotalNights = () => {
    if (!checkIn || !checkOut) return 0
    const start = new Date(checkIn)
    const end = new Date(checkOut)
    const diffTime = Math.abs(end.getTime() - start.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const totalNights = calculateTotalNights()
  const totalPrice = totalNights * listing.metadata.price_per_night

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!userId) {
      router.push('/login')
      return
    }

    if (!checkIn || !checkOut) {
      setError('Please select check-in and check-out dates')
      return
    }

    if (guests < 1 || guests > listing.metadata.guests) {
      setError(`Guest count must be between 1 and ${listing.metadata.guests}`)
      return
    }

    if (new Date(checkIn) >= new Date(checkOut)) {
      setError('Check-out date must be after check-in date')
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/bookings/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          listingId: listing.id,
          checkInDate: checkIn,
          checkOutDate: checkOut,
          guests,
          totalNights,
          totalPrice
        })
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Booking failed')
        setLoading(false)
        return
      }

      // Redirect to profile page to see the booking
      router.push('/profile')
    } catch (err) {
      setError('An error occurred. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
      <div className="mb-4">
        <div className="flex items-baseline">
          <span className="text-3xl font-bold text-gray-600">
            ${listing.metadata.price_per_night}
          </span>
          <span className="text-gray-400 ml-1">/ night</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="checkIn" className="block text-sm font-medium text-gray-600 mb-2">
              Check-in
            </label>
            <input
              id="checkIn"
              type="date"
              required
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div>
            <label htmlFor="checkOut" className="block text-sm font-medium text-gray-600 mb-2">
              Check-out
            </label>
            <input
              id="checkOut"
              type="date"
              required
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              min={checkIn || new Date().toISOString().split('T')[0]}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label htmlFor="guests" className="block text-sm font-medium text-gray-600 mb-2">
            Guests
          </label>
          <select
            id="guests"
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            {Array.from({ length: listing.metadata.guests }, (_, i) => i + 1).map((num) => (
              <option key={num} value={num}>
                {num} {num === 1 ? 'guest' : 'guests'}
              </option>
            ))}
          </select>
        </div>

        {totalNights > 0 && (
          <div className="border-t border-gray-100 pt-4 space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>${listing.metadata.price_per_night} × {totalNights} nights</span>
              <span>${totalPrice}</span>
            </div>
            <div className="flex justify-between font-semibold text-gray-600 text-lg">
              <span>Total</span>
              <span>${totalPrice}</span>
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={loading || !checkIn || !checkOut}
          className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Booking...' : 'Reserve'}
        </button>

        {!userId && (
          <p className="text-xs text-gray-400 text-center">
            You'll be redirected to login
          </p>
        )}
      </form>
    </div>
  )
}