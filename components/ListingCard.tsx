import Link from 'next/link'
import type { Listing } from '@/types'

interface ListingCardProps {
  listing: Listing
}

export default function ListingCard({ listing }: ListingCardProps) {
  const featuredImage = listing.metadata.photos?.[0]
  const host = listing.metadata.host
  
  return (
    <Link href={`/listings/${listing.slug}`}>
      <div className="listing-card">
        {featuredImage && (
          <div className="relative h-64 overflow-hidden">
            <img
              src={`${featuredImage.imgix_url}?w=600&h=400&fit=crop&auto=format,compress`}
              alt={listing.metadata.title}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
            />
            {listing.metadata.property_type && (
              <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full text-sm font-medium text-gray-600">
                {listing.metadata.property_type.value}
              </div>
            )}
          </div>
        )}
        
        <div className="p-6">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-xl font-semibold text-gray-600 line-clamp-1">
              {listing.metadata.title}
            </h3>
          </div>
          
          <p className="text-gray-400 text-sm mb-4">
            {listing.metadata.location}
          </p>
          
          <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
            <span>{listing.metadata.guests} guests</span>
            <span>{listing.metadata.bedrooms} bedrooms</span>
            <span>{listing.metadata.bathrooms} baths</span>
          </div>
          
          {host && (
            <div className="flex items-center space-x-3 mb-4 pb-4 border-b border-gray-100">
              {host.metadata.profile_photo && (
                <img
                  src={`${host.metadata.profile_photo.imgix_url}?w=80&h=80&fit=crop&auto=format,compress`}
                  alt={host.metadata.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
              )}
              <div>
                <p className="text-sm font-medium text-gray-600">Hosted by {host.metadata.name}</p>
                {host.metadata.response_rate && (
                  <p className="text-xs text-gray-400">{host.metadata.response_rate}% response rate</p>
                )}
              </div>
            </div>
          )}
          
          <div className="flex items-center justify-between">
            <div>
              <span className="text-2xl font-bold text-gray-600">
                ${listing.metadata.price_per_night}
              </span>
              <span className="text-gray-400 ml-1">/ night</span>
            </div>
            
            {listing.metadata.available && (
              <span className="text-secondary text-sm font-medium">Available</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}