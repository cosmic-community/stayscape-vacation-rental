import Link from 'next/link'
import type { Booking } from '@/types'

interface TripsListProps {
  bookings: Booking[]
}

export default function TripsList({ bookings }: TripsListProps) {
  if (bookings.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-400 mb-4">No trips booked yet</p>
        <Link href="/listings" className="text-primary hover:text-primary-dark">
          Browse listings
        </Link>
      </div>
    )
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const getStatusColor = (status: string) => {
    // Changed: Handle status as string, normalize case for comparison
    const normalizedStatus = status.toLowerCase()
    switch (normalizedStatus) {
      case 'confirmed':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusDisplay = (status: string) => {
    // Changed: Capitalize first letter for display
    return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()
  }

  return (
    <div className="space-y-4">
      {bookings.map((booking) => {
        const listing = booking.metadata.listing
        const photo = listing?.metadata?.photos?.[0]
        
        // Changed: Safely extract status as string
        const status = typeof booking.metadata.status === 'string' 
          ? booking.metadata.status 
          : 'Pending'
        
        return (
          <div key={booking.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
            {photo && (
              <Link href={`/listings/${listing.slug}`}>
                <img
                  src={`${photo.imgix_url}?w=600&h=200&fit=crop&auto=format,compress`}
                  alt={listing.metadata.title}
                  className="w-full h-32 object-cover"
                />
              </Link>
            )}
            
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Link 
                  href={`/listings/${listing.slug}`}
                  className="font-semibold text-gray-600 hover:text-primary"
                >
                  {listing.metadata.title}
                </Link>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
                  {getStatusDisplay(status)}
                </span>
              </div>
              
              <p className="text-sm text-gray-400 mb-2">
                📍 {listing.metadata.location}
              </p>
              
              <div className="text-sm text-gray-400 space-y-1">
                <p>
                  <span className="font-medium">Check-in:</span> {formatDate(booking.metadata.check_in_date)}
                </p>
                <p>
                  <span className="font-medium">Check-out:</span> {formatDate(booking.metadata.check_out_date)}
                </p>
                <p>
                  <span className="font-medium">Guests:</span> {booking.metadata.guests}
                </p>
              </div>
              
              <div className="mt-3 pt-3 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">{booking.metadata.total_nights} nights</span>
                  <span className="font-semibold text-gray-600">${booking.metadata.total_price}</span>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}