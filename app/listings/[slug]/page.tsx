// app/listings/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { getListingBySlug, getReviewsForListing } from '@/lib/cosmic-helpers'
import { getSessionUser } from '@/lib/session'
import ListingDetails from '@/components/ListingDetails'
import ReviewList from '@/components/ReviewList'
import BookingCard from '@/components/BookingCard'

interface ListingPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function ListingPage({ params }: ListingPageProps) {
  const { slug } = await params
  const listing = await getListingBySlug(slug)
  
  if (!listing) {
    notFound()
  }

  const reviews = await getReviewsForListing(listing.id)
  const user = await getSessionUser()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <ListingDetails listing={listing} />
            <div className="mt-8">
              <ReviewList reviews={reviews} />
            </div>
          </div>
          <div className="lg:col-span-1">
            <BookingCard listing={listing} userId={user?.id || null} />
          </div>
        </div>
      </div>
    </div>
  )
}