import { getAllReviews } from '@/lib/cosmic-helpers'
import Link from 'next/link'

export default async function ReviewsPage() {
  const reviews = await getAllReviews()
  
  if (!reviews || reviews.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-gray-600 mb-8">Guest Reviews</h1>
        <div className="bg-white border border-gray-100 rounded-xl p-12 text-center">
          <p className="text-gray-400 text-lg">No reviews yet. Be the first to leave a review!</p>
        </div>
      </div>
    )
  }
  
  // Calculate overall statistics
  const averageRating = reviews.reduce((sum, review) => sum + review.metadata.rating, 0) / reviews.length
  const fiveStarCount = reviews.filter(r => r.metadata.rating === 5).length
  const fourStarCount = reviews.filter(r => r.metadata.rating === 4).length
  
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-600 mb-4">Guest Reviews</h1>
        <p className="text-gray-400 text-lg">
          See what our guests are saying about their StayScape experiences
        </p>
      </div>
      
      {/* Statistics Card */}
      <div className="bg-white border border-gray-100 rounded-xl p-8 mb-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-5xl font-bold text-gray-600 mb-2">
              {averageRating.toFixed(1)}
            </div>
            <div className="flex items-center justify-center space-x-1 mb-2">
              {Array.from({ length: 5 }).map((_, index) => (
                <svg
                  key={index}
                  className={`w-6 h-6 ${
                    index < Math.round(averageRating) ? 'text-yellow-400' : 'text-gray-200'
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-gray-400">Average Rating</p>
          </div>
          
          <div className="text-center">
            <div className="text-5xl font-bold text-gray-600 mb-2">
              {reviews.length}
            </div>
            <p className="text-gray-400">Total Reviews</p>
          </div>
          
          <div className="text-center">
            <div className="text-5xl font-bold text-gray-600 mb-2">
              {Math.round((fiveStarCount / reviews.length) * 100)}%
            </div>
            <p className="text-gray-400">5-Star Reviews</p>
          </div>
        </div>
      </div>
      
      {/* Reviews Grid */}
      <div className="space-y-6">
        {reviews.map((review) => {
          const reviewDate = review.metadata.review_date 
            ? new Date(review.metadata.review_date).toLocaleDateString('en-US', { 
                month: 'long', 
                day: 'numeric',
                year: 'numeric' 
              })
            : null
          
          const listing = review.metadata.listing
          
          return (
            <div key={review.id} className="bg-white border border-gray-100 rounded-xl p-8 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-4">
                  <div className="w-14 h-14 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-gray-600 font-semibold text-lg">
                      {review.metadata.guest_name.charAt(0)}
                    </span>
                  </div>
                  
                  <div>
                    <h3 className="font-bold text-gray-600 text-lg mb-1">
                      {review.metadata.guest_name}
                    </h3>
                    <div className="flex items-center space-x-1 mb-2">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <svg
                          key={index}
                          className={`w-5 h-5 ${
                            index < review.metadata.rating ? 'text-yellow-400' : 'text-gray-200'
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    {reviewDate && (
                      <p className="text-sm text-gray-400">{reviewDate}</p>
                    )}
                  </div>
                </div>
              </div>
              
              <p className="text-gray-400 leading-relaxed mb-4">
                {review.metadata.comment}
              </p>
              
              {listing && (
                <div className="pt-4 border-t border-gray-100">
                  <Link 
                    href={`/listings/${listing.slug}`}
                    className="flex items-center space-x-3 group"
                  >
                    {listing.thumbnail && (
                      <img
                        src={`${listing.thumbnail}?w=160&h=120&fit=crop&auto=format,compress`}
                        alt={listing.title}
                        className="w-20 h-16 object-cover rounded-lg"
                      />
                    )}
                    <div>
                      <p className="text-sm text-gray-400 mb-1">Review for:</p>
                      <p className="font-semibold text-gray-600 group-hover:text-primary transition-colors">
                        {listing.title}
                      </p>
                    </div>
                  </Link>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}