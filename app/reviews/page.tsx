import { getAllListings, getReviewsForListing } from '@/lib/cosmic-helpers'
import ReviewList from '@/components/ReviewList'
import type { Review } from '@/types'
import PageHero from '@/components/PageHero'

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
      <PageHero 
        title="All Reviews"
        description="See what our guests are saying about their stays"
        backgroundImage="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=2000&auto=format,compress"
      />
      
      <div className="max-w-7xl mx-auto px-4 py-12">
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