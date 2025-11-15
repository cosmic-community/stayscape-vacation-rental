import { getSessionUser } from '@/lib/session'
import { redirect } from 'next/navigation'
import { getBookingsForUser } from '@/lib/cosmic-helpers'
import ProfileForm from '@/components/ProfileForm'
import LogoutButton from '@/components/LogoutButton'
import TripsList from '@/components/TripsList'

export default async function ProfilePage() {
  const user = await getSessionUser()
  
  // Redirect if not logged in
  if (!user) {
    redirect('/login')
  }

  // Fetch user's bookings
  const bookings = await getBookingsForUser(user.id)
  
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-gray-600">My Profile</h1>
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
                    <h2 className="text-2xl font-semibold text-gray-600">{user.metadata.name}</h2>
                    <p className="text-gray-400">{user.metadata.email}</p>
                  </div>
                </div>
              </div>
              
              <ProfileForm user={user} />
            </div>
          </div>

          {/* Trips Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-600 mb-6">My Trips</h2>
              <TripsList bookings={bookings} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}