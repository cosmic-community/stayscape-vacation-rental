import { getAllListings } from '@/lib/cosmic-helpers'
import ListingGrid from '@/components/ListingGrid'
import PageHero from '@/components/PageHero'

export const metadata = {
  title: 'All Listings - StayScape',
  description: 'Browse all available vacation rentals and find your perfect getaway.',
}

export default async function ListingsPage() {
  const listings = await getAllListings()

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <PageHero 
        title="All Listings"
        description="Discover amazing vacation rentals for your next adventure"
        backgroundImage="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=2000&auto=format,compress"
      />

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