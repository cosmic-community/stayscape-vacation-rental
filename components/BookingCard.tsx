'use client'

import type { Listing } from '@/types'

interface BookingCardProps {
  listing: Listing
}

export default function BookingCard({ listing }: BookingCardProps) {
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
      
      <div className="space-y-4 mb-6">
        <div className="border border-gray-200 rounded-lg">
          <div className="grid grid-cols-2">
            <div className="p-3 border-r border-gray-200">
              <label className="block text-xs font-medium text-gray-600 mb-1">
                CHECK-IN
              </label>
              <input
                type="date"
                className="w-full text-sm text-gray-600 focus:outline-none"
              />
            </div>
            <div className="p-3">
              <label className="block text-xs font-medium text-gray-600 mb-1">
                CHECKOUT
              </label>
              <input
                type="date"
                className="w-full text-sm text-gray-600 focus:outline-none"
              />
            </div>
          </div>
          
          <div className="p-3 border-t border-gray-200">
            <label className="block text-xs font-medium text-gray-600 mb-1">
              GUESTS
            </label>
            <select className="w-full text-sm text-gray-600 focus:outline-none">
              {Array.from({ length: listing.metadata.guests }, (_, i) => i + 1).map((num) => (
                <option key={num} value={num}>
                  {num} {num === 1 ? 'guest' : 'guests'}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      <button className="w-full btn-primary mb-4">
        Reserve
      </button>
      
      <p className="text-center text-sm text-gray-400">
        You won't be charged yet
      </p>
      
      <div className="border-t border-gray-100 mt-6 pt-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-gray-400">${listing.metadata.price_per_night} × 5 nights</span>
          <span className="text-gray-600">${listing.metadata.price_per_night * 5}</span>
        </div>
        
        <div className="flex items-center justify-between mb-3">
          <span className="text-gray-400">Service fee</span>
          <span className="text-gray-600">${Math.round(listing.metadata.price_per_night * 5 * 0.1)}</span>
        </div>
        
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <span className="font-semibold text-gray-600">Total</span>
          <span className="font-semibold text-gray-600">
            ${listing.metadata.price_per_night * 5 + Math.round(listing.metadata.price_per_night * 5 * 0.1)}
          </span>
        </div>
      </div>
    </div>
  )
}