import { getAllListings } from '@/lib/cosmic-helpers'
import ListingGrid from '@/components/ListingGrid'

export default async function ListingsPage() {
  const listings = await getAllListings()
  
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-600 mb-4">
            All Listings
          </h1>
          <p className="text-gray-400 text-lg">
            Discover unique places to stay around the world
          </p>
        </div>
        
        <ListingGrid listings={listings} />
      </section>
    </div>
  )
}