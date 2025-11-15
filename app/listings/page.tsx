import { getAllListings } from '@/lib/cosmic-helpers'
import ListingGrid from '@/components/ListingGrid'

export const metadata = {
  title: 'All Listings - StayScape',
  description: 'Browse all available vacation rentals and find your perfect getaway.',
}

export default async function ListingsPage() {
  const listings = await getAllListings()

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-primary to-secondary text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">All Listings</h1>
          <p className="text-xl text-white/90">
            Discover amazing vacation rentals for your next adventure
          </p>
        </div>
      </div>

      {/* Listings Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {listings.length > 0 ? (
          <>
            <div className="mb-8">
              <p className="text-gray-600">
                Showing {listings.length} {listings.length === 1 ? 'listing' : 'listings'}
              </p>
            </div>
            <ListingGrid listings={listings} />
          </>
        ) : (
          <div className="text-center py-20">
            <h2 className="text-2xl font-semibold text-gray-600 mb-4">
              No listings available
            </h2>
            <p className="text-gray-400">
              Check back soon for new vacation rentals!
            </p>
          </div>
        )}
      </div>
    </div>
  )
}