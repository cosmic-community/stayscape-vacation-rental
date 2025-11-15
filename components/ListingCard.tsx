import Link from 'next/link'
import type { Listing, Host } from '@/types'

interface ListingCardProps {
  listing: Listing
}

export default function ListingCard({ listing }: ListingCardProps) {
  // Changed: Added type guard to safely access host metadata
  const host = listing.metadata.host
  const isHostObject = host && typeof host === 'object' && 'metadata' in host
  
  const hostName = isHostObject 
    ? (host as Host).metadata.name 
    : 'Host'
  
  const hostPhoto = isHostObject 
    ? (host as Host).metadata.profile_photo?.imgix_url 
    : null
  
  const hostResponseRate = isHostObject 
    ? (host as Host).metadata.response_rate 
    : null

  return (
    <Link 
      href={`/listings/${listing.slug}`}
      className="group block bg-white rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100"
    >
      {/* Listing Image */}
      <div className="relative h-64 overflow-hidden">
        {listing.metadata.photos && listing.metadata.photos.length > 0 && listing.metadata.photos[0] ? (
          <img
            src={`${listing.metadata.photos[0].imgix_url}?w=800&h=600&fit=crop&auto=format,compress`}
            alt={listing.metadata.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400">No image available</span>
          </div>
        )}
        {listing.metadata.property_type && (
          <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full text-sm font-medium text-gray-600">
            {listing.metadata.property_type.value}
          </div>
        )}
      </div>

      {/* Listing Details */}
      <div className="p-6">
        {/* Host Info */}
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
            {hostPhoto ? (
              <img
                src={`${hostPhoto}?w=80&h=80&fit=crop&auto=format,compress`}
                alt={hostName}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                {hostName.charAt(0)}
              </div>
            )}
          </div>
          <div>
            <p className="font-medium text-gray-600">{hostName}</p>
            {hostResponseRate && (
              <p className="text-sm text-gray-400">{hostResponseRate}% response rate</p>
            )}
          </div>
        </div>

        {/* Location */}
        <p className="text-sm text-gray-400 mb-2">{listing.metadata.location}</p>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-600 mb-3 group-hover:text-primary transition-colors">
          {listing.metadata.title}
        </h3>

        {/* Property Details */}
        <div className="flex items-center space-x-4 text-sm text-gray-400 mb-4">
          <span>{listing.metadata.guests} guests</span>
          <span>•</span>
          <span>{listing.metadata.bedrooms} bedrooms</span>
          <span>•</span>
          <span>{listing.metadata.bathrooms} bathrooms</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline">
          <span className="text-2xl font-bold text-primary">
            ${listing.metadata.price_per_night}
          </span>
          <span className="text-gray-400 ml-1">/ night</span>
        </div>
      </div>
    </Link>
  )
}