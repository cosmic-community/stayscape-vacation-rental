import type { Review } from '@/types'

interface ReviewListProps {
  reviews: Review[]
}

export default function ReviewList({ reviews }: ReviewListProps) {
  if (!reviews || reviews.length === 0) {
    return null
  }
  
  const averageRating = reviews.reduce((sum, review) => sum + review.metadata.rating, 0) / reviews.length
  
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-8">
      <div className="flex items-center space-x-2 mb-6">
        <h2 className="text-2xl font-bold text-gray-600">
          ⭐ {averageRating.toFixed(1)} · {reviews.length} reviews
        </h2>
      </div>
      
      <div className="space-y-6">
        {reviews.map((review) => {
          const reviewDate = review.metadata.review_date 
            ? new Date(review.metadata.review_date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
            : null
          
          return (
            <div key={review.id} className="border-b border-gray-100 last:border-0 pb-6 last:pb-0">
              <div className="flex items-start space-x-4 mb-3">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-gray-600 font-semibold">
                    {review.metadata.guest_name.charAt(0)}
                  </span>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-semibold text-gray-600">
                      {review.metadata.guest_name}
                    </h4>
                    {reviewDate && (
                      <span className="text-sm text-gray-400">{reviewDate}</span>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-1 mb-3">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <svg
                        key={index}
                        className={`w-4 h-4 ${
                          index < review.metadata.rating ? 'text-yellow-400' : 'text-gray-200'
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  
                  <p className="text-gray-400 leading-relaxed">
                    {review.metadata.comment}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}