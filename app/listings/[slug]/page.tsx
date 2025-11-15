import { getListingBySlug, getReviewsForListing, getAllListings } from '@/lib/cosmic-helpers'
import { notFound } from 'next/navigation'
import ListingDetails from '@/components/ListingDetails'
import ReviewList from '@/components/ReviewList'
import HostCard from '@/components/HostCard'
import BookingCard from '@/components/BookingCard'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const listings = await getAllListings()
  
  return listings.map((listing) => ({
    slug: listing.slug,
  }))
}

export default async function ListingPage({ params }: PageProps) {
  const { slug } = await params
  const listing = await getListingBySlug(slug)
  
  if (!listing) {
    notFound()
  }
  
  const reviews = await getReviewsForListing(listing.id)
  
  return (
    <div className="min-h-screen bg-white">
      <ListingDetails listing={listing} />
      
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            {listing.metadata.host && (
              <HostCard host={listing.metadata.host} />
            )}
            
            {reviews.length > 0 && (
              <ReviewList reviews={reviews} />
            )}
          </div>
          
          <div className="lg:col-span-1">
            <BookingCard listing={listing} />
          </div>
        </div>
      </div>
    </div>
  )
}