import { getAllHosts } from '@/lib/cosmic-helpers'
import type { Host } from '@/types'
import PageHero from '@/components/PageHero'

export default async function HostsPage() {
  const hosts = await getAllHosts()
  
  return (
    <div className="min-h-screen bg-white">
      <PageHero 
        title="Meet Our Hosts"
        description="Get to know the amazing people who make StayScape special"
        backgroundImage="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=2000&auto=format,compress"
      />
      
      <div className="max-w-7xl mx-auto px-4 py-12">
        {hosts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No hosts found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {hosts.map((host) => (
              <HostProfileCard key={host.id} host={host} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function HostProfileCard({ host }: { host: Host }) {
  const profilePhoto = host.metadata.profile_photo
  const memberSince = host.metadata.member_since 
    ? new Date(host.metadata.member_since).getFullYear() 
    : null
  
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
      <div className="flex flex-col items-center text-center">
        {profilePhoto && (
          <img
            src={`${profilePhoto.imgix_url}?w=320&h=320&fit=crop&auto=format,compress`}
            alt={host.metadata.name}
            className="w-32 h-32 rounded-full object-cover mb-4"
          />
        )}
        
        <h3 className="text-xl font-bold text-gray-600 mb-2">
          {host.metadata.name}
        </h3>
        
        <div className="flex items-center justify-center space-x-3 text-sm text-gray-400 mb-4">
          {memberSince && (
            <span>Joined {memberSince}</span>
          )}
          {host.metadata.response_rate && (
            <>
              <span>•</span>
              <span>{host.metadata.response_rate}% response</span>
            </>
          )}
        </div>
        
        {host.metadata.bio && (
          <p className="text-gray-400 leading-relaxed line-clamp-4">
            {host.metadata.bio}
          </p>
        )}
      </div>
    </div>
  )
}