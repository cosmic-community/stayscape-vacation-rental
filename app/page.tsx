import { getAllListings } from '@/lib/cosmic-helpers'
import Hero from '@/components/Hero'
import ListingGrid from '@/components/ListingGrid'
import FeaturedSection from '@/components/FeaturedSection'

export default async function HomePage() {
  const listings = await getAllListings()
  
  return (
    <>
      <Hero />
      <FeaturedSection />
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-600 mb-2">
            Explore our properties
          </h2>
          <p className="text-gray-400">
            Discover unique places to stay around the world
          </p>
        </div>
        <ListingGrid listings={listings} />
      </section>
    </>
  )
}