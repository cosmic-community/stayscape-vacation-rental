import { getSessionUser } from '@/lib/session'
import { redirect } from 'next/navigation'
import { getUserWithHost, getListingsForHost } from '@/lib/cosmic-helpers'
import Link from 'next/link'
import PageHero from '@/components/PageHero'

export default async function HostDashboardPage() {
  const user = await getSessionUser()
  
  if (!user) {
    redirect('/login')
  }
  
  const userWithHost = await getUserWithHost(user.id)
  
  if (!userWithHost?.metadata.host_profile) {
    redirect('/profile')
  }
  
  const hostId = typeof userWithHost.metadata.host_profile === 'string' 
    ? userWithHost.metadata.host_profile 
    : userWithHost.metadata.host_profile.id
  
  const listings = await getListingsForHost(hostId)
  
  return (
    <div className="min-h-screen bg-white">
      <PageHero 
        title="Host Dashboard"
        description="Manage your listings and hosting profile"
        backgroundImage="https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=2000&auto=format,compress"
      />
      
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-600">My Listings</h2>
          <Link href="/host/listings/new" className="btn-primary">
            Create New Listing
          </Link>
        </div>
        
        {listings.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-400 text-lg mb-4">You haven't created any listings yet.</p>
            <Link href="/host/listings/new" className="btn-primary inline-block">
              Create Your First Listing
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((listing) => (
              <div key={listing.id} className="bg-white border border-gray-100 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                {listing.thumbnail && (
                  <img
                    src={`${listing.thumbnail}?w=800&h=600&fit=crop&auto=format,compress`}
                    alt={listing.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-600 mb-2">{listing.title}</h3>
                  <p className="text-gray-400 text-sm mb-4">{listing.metadata.location}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-primary">
                      ${listing.metadata.price_per_night}
                      <span className="text-sm text-gray-400 font-normal">/night</span>
                    </span>
                    <Link 
                      href={`/host/listings/${listing.id}/edit`}
                      className="text-primary hover:text-primary-dark font-medium"
                    >
                      Edit
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}