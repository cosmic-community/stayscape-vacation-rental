import { getAllListings, getReviewsForListing } from '@/lib/cosmic-helpers'
import ReviewList from '@/components/ReviewList'
import type { Review } from '@/types'

export default async function ReviewsPage() {
  const listings = await getAllListings()
  
  // Fetch all reviews from all listings
  const allReviewsPromises = listings.map(listing => 
    getReviewsForListing(listing.id)
  )
  
  const reviewsArrays = await Promise.all(allReviewsPromises)
  const allReviews: Review[] = reviewsArrays.flat()
  
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-600 mb-2">
            All Reviews
          </h1>
          <p className="text-gray-400">
            See what our guests are saying about their stays
          </p>
        </div>
        
        {allReviews.length > 0 ? (
          <ReviewList reviews={allReviews} />
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No reviews available yet.</p>
          </div>
        )}
      </div>
    </div>
  )
}