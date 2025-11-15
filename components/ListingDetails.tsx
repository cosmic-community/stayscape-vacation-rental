import type { Listing } from '@/types'

interface ListingDetailsProps {
  listing: Listing
}

export default function ListingDetails({ listing }: ListingDetailsProps) {
  const photos = listing.metadata.photos || []
  const amenities = listing.metadata.amenities || []
  
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-600 mb-2">
          {listing.metadata.title}
        </h1>
        <p className="text-gray-400 text-lg">
          📍 {listing.metadata.location}
        </p>
      </div>
      
      {photos.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12 rounded-xl overflow-hidden">
          <div className="md:row-span-2">
            <img
              src={`${photos[0].imgix_url}?w=1200&h=800&fit=crop&auto=format,compress`}
              alt={listing.metadata.title}
              className="w-full h-full object-cover"
            />
          </div>
          {photos.slice(1, 5).map((photo, index) => (
            <div key={index}>
              <img
                src={`${photo.imgix_url}?w=600&h=400&fit=crop&auto=format,compress`}
                alt={`${listing.metadata.title} - Photo ${index + 2}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2">
          <div className="mb-8">
            <div className="flex items-center space-x-6 text-gray-400 mb-6 pb-6 border-b border-gray-100">
              <span>{listing.metadata.guests} guests</span>
              <span>•</span>
              <span>{listing.metadata.bedrooms} bedrooms</span>
              <span>•</span>
              <span>{listing.metadata.bathrooms} bathrooms</span>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-600 mb-4">About this place</h2>
            <p className="text-gray-400 leading-relaxed">
              {listing.metadata.description}
            </p>
          </div>
          
          {amenities.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-600 mb-4">What this place offers</h2>
              <div className="grid grid-cols-2 gap-4">
                {amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center space-x-3 text-gray-400">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}