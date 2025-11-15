'use client'

import { useState } from 'react'
import type { Listing } from '@/types'

interface BookingCardProps {
  listing: Listing
}

export default function BookingCard({ listing }: BookingCardProps) {
  const [checkInDate, setCheckInDate] = useState('')
  const [checkOutDate, setCheckOutDate] = useState('')
  const [guests, setGuests] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  // Calculate number of nights
  const calculateNights = () => {
    if (!checkInDate || !checkOutDate) return 0
    const start = new Date(checkInDate)
    const end = new Date(checkOutDate)
    const nights = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
    return nights > 0 ? nights : 0
  }

  const nights = calculateNights()
  const subtotal = listing.metadata.price_per_night * nights
  const serviceFee = Math.round(subtotal * 0.1)
  const total = subtotal + serviceFee

  const handleReserve = async () => {
    setError('')
    setSuccess(false)
    setIsLoading(true)

    // Validate dates
    if (!checkInDate || !checkOutDate) {
      setError('Please select check-in and check-out dates')
      setIsLoading(false)
      return
    }

    if (nights <= 0) {
      setError('Check-out date must be after check-in date')
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch('/api/bookings/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          listing_id: listing.id,
          check_in_date: checkInDate,
          check_out_date: checkOutDate,
          guests,
          total_nights: nights,
          total_price: total
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create booking')
      }

      setSuccess(true)
      // Reset form
      setCheckInDate('')
      setCheckOutDate('')
      setGuests(1)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="sticky top-24 bg-white border border-gray-200 rounded-xl shadow-listing p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <span className="text-3xl font-bold text-gray-600">
            ${listing.metadata.price_per_night}
          </span>
          <span className="text-gray-400 ml-2">/ night</span>
        </div>
      </div>
      
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-600 text-sm">
          Booking confirmed! View your trips in your profile.
        </div>
      )}
      
      <div className="space-y-4 mb-6">
        <div className="border border-gray-200 rounded-lg">
          <div className="grid grid-cols-2">
            <div className="p-3 border-r border-gray-200">
              <label className="block text-xs font-medium text-gray-600 mb-1">
                CHECK-IN
              </label>
              <input
                type="date"
                value={checkInDate}
                onChange={(e) => setCheckInDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full text-sm text-gray-600 focus:outline-none"
              />
            </div>
            <div className="p-3">
              <label className="block text-xs font-medium text-gray-600 mb-1">
                CHECKOUT
              </label>
              <input
                type="date"
                value={checkOutDate}
                onChange={(e) => setCheckOutDate(e.target.value)}
                min={checkInDate || new Date().toISOString().split('T')[0]}
                className="w-full text-sm text-gray-600 focus:outline-none"
              />
            </div>
          </div>
          
          <div className="p-3 border-t border-gray-200">
            <label className="block text-xs font-medium text-gray-600 mb-1">
              GUESTS
            </label>
            <select 
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className="w-full text-sm text-gray-600 focus:outline-none"
            >
              {Array.from({ length: listing.metadata.guests }, (_, i) => i + 1).map((num) => (
                <option key={num} value={num}>
                  {num} {num === 1 ? 'guest' : 'guests'}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      <button 
        onClick={handleReserve}
        disabled={isLoading || !checkInDate || !checkOutDate}
        className="w-full btn-primary mb-4 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Reserving...' : 'Reserve'}
      </button>
      
      <p className="text-center text-sm text-gray-400">
        You won't be charged yet
      </p>
      
      {nights > 0 && (
        <div className="border-t border-gray-100 mt-6 pt-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-400">${listing.metadata.price_per_night} × {nights} nights</span>
            <span className="text-gray-600">${subtotal}</span>
          </div>
          
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-400">Service fee</span>
            <span className="text-gray-600">${serviceFee}</span>
          </div>
          
          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <span className="font-semibold text-gray-600">Total</span>
            <span className="font-semibold text-gray-600">${total}</span>
          </div>
        </div>
      )}
    </div>
  )
}