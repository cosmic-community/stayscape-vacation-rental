import { getSessionUser } from '@/lib/session'
import { redirect } from 'next/navigation'
import { getBookingsForUser, getUserWithHost } from '@/lib/cosmic-helpers'
import ProfileForm from '@/components/ProfileForm'
import LogoutButton from '@/components/LogoutButton'
import TripsList from '@/components/TripsList'
import PageHero from '@/components/PageHero'
import BecomeHostButton from '@/components/BecomeHostButton'
import Link from 'next/link'

export default async function ProfilePage() {
  const user = await getSessionUser()
  
  // Redirect if not logged in
  if (!user) {
    redirect('/login')
  }

  // Fetch user's bookings
  const bookings = await getBookingsForUser(user.id)
  
  // Changed: Get user with host profile
  const userWithHost = await getUserWithHost(user.id)
  const isHost = !!userWithHost?.metadata.host_profile
  
  return (
    <div className="min-h-screen bg-white">
      <PageHero 
        title="My Profile"
        description="Manage your account and view your bookings"
        backgroundImage="https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=2000&auto=format,compress"
      />
      
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-100">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-600">Account Information</h2>
                <LogoutButton />
              </div>
              
              <div className="mb-8 pb-8 border-b border-gray-100">
                <div className="flex items-center space-x-4">
                  {user.metadata.profile_photo ? (
                    <img
                      src={`${user.metadata.profile_photo.imgix_url}?w=160&h=160&fit=crop&auto=format,compress`}
                      alt={user.metadata.name}
                      className="w-20 h-20 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center">
                      <span className="text-3xl text-white font-bold">
                        {user.metadata.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-600">{user.metadata.name}</h3>
                    <p className="text-gray-400">{user.metadata.email}</p>
                    {isHost && (
                      <span className="inline-block mt-2 px-3 py-1 bg-primary text-white text-xs font-medium rounded-full">
                        Host
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
              <ProfileForm user={user} />
              
              {/* Changed: Host section */}
              <div className="mt-8 pt-8 border-t border-gray-100">
                <h3 className="text-xl font-bold text-gray-600 mb-4">Hosting</h3>
                {isHost ? (
                  <div>
                    <p className="text-gray-400 mb-4">
                      You're a StayScape host! Manage your listings and bookings from your dashboard.
                    </p>
                    <Link href="/host/dashboard" className="btn-primary inline-block">
                      Go to Host Dashboard
                    </Link>
                  </div>
                ) : (
                  <div>
                    <p className="text-gray-400 mb-4">
                      Want to share your space? Become a host and start earning by welcoming travelers.
                    </p>
                    <BecomeHostButton />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Trips Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-600 mb-6">My Trips</h2>
              <TripsList bookings={bookings} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}