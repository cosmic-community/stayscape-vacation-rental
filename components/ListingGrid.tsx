import type { Listing } from '@/types'
import ListingCard from './ListingCard'

interface ListingGridProps {
  listings: Listing[]
}

export default function ListingGrid({ listings }: ListingGridProps) {
  if (!listings || listings.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400 text-lg">No listings available at the moment.</p>
      </div>
    )
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {listings.map((listing) => (
        <ListingCard key={listing.id} listing={listing} />
      ))}
    </div>
  )
}