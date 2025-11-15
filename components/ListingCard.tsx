import Link from 'next/link'
import { Listing, Host } from '@/types'

interface ListingCardProps {
  listing: Listing
}

// Type guard to check if host is a Host object (not just a string ID)
function isHostObject(host: Host | string | undefined): host is Host {
  return typeof host === 'object' && host !== null && 'metadata' in host
}

export default function ListingCard({ listing }: ListingCardProps) {
  const {
    title,
    description,
    price_per_night,
    location,
    property_type,
    guests,
    bedrooms,
    bathrooms,
    photos,
    host
  } = listing.metadata

  // Get the first photo or use a placeholder
  const mainPhoto = photos?.[0]?.imgix_url || listing.thumbnail || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop&auto=format,compress'

  // Changed: Only access host metadata if host is a Host object
  const hostName = isHostObject(host) ? host.metadata?.name : undefined
  const hostPhoto = isHostObject(host) ? host.metadata?.profile_photo?.imgix_url : undefined
  const hostSlug = isHostObject(host) ? host.slug : undefined

  return (
    <Link href={`/listings/${listing.slug}`} className="group">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
        {/* Listing Image */}
        <div className="relative h-64 overflow-hidden">
          <img
            src={`${mainPhoto}?w=800&h=600&fit=crop&auto=format,compress`}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full shadow-sm">
            <span className="text-sm font-semibold text-gray-600">
              ${price_per_night}/night
            </span>
          </div>
        </div>

        {/* Listing Details */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">
              {property_type.value}
            </span>
            {hostName && (
              <div className="flex items-center space-x-2">
                {hostPhoto && (
                  <img
                    src={`${hostPhoto}?w=64&h=64&fit=crop&auto=format,compress`}
                    alt={hostName}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                )}
                <span className="text-xs text-gray-400">
                  {hostSlug ? (
                    <Link href={`/hosts/${hostSlug}`} className="hover:text-primary">
                      {hostName}
                    </Link>
                  ) : (
                    hostName
                  )}
                </span>
              </div>
            )}
          </div>

          <h3 className="text-xl font-semibold text-gray-600 mb-2 line-clamp-1">
            {title}
          </h3>

          <p className="text-sm text-gray-400 mb-4 line-clamp-2">
            {description}
          </p>

          <div className="flex items-center text-sm text-gray-400 mb-4">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="line-clamp-1">{location}</span>
          </div>

          <div className="flex items-center space-x-4 text-sm text-gray-400 border-t border-gray-100 pt-4">
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span>{guests} guests</span>
            </div>
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span>{bedrooms} beds</span>
            </div>
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{bathrooms} baths</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}