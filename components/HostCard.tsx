import type { Host } from '@/types'

interface HostCardProps {
  host: Host
}

export default function HostCard({ host }: HostCardProps) {
  const profilePhoto = host.metadata.profile_photo
  const memberSince = host.metadata.member_since ? new Date(host.metadata.member_since).getFullYear() : null
  
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-8">
      <h2 className="text-2xl font-bold text-gray-600 mb-6">Meet your host</h2>
      
      <div className="flex items-start space-x-6">
        {profilePhoto && (
          <img
            src={`${profilePhoto.imgix_url}?w=200&h=200&fit=crop&auto=format,compress`}
            alt={host.metadata.name}
            className="w-24 h-24 rounded-full object-cover"
          />
        )}
        
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-600 mb-2">
            {host.metadata.name}
          </h3>
          
          <div className="flex items-center space-x-4 text-sm text-gray-400 mb-4">
            {memberSince && (
              <span>Joined in {memberSince}</span>
            )}
            {host.metadata.response_rate && (
              <>
                <span>•</span>
                <span>{host.metadata.response_rate}% response rate</span>
              </>
            )}
          </div>
          
          {host.metadata.bio && (
            <p className="text-gray-400 leading-relaxed">
              {host.metadata.bio}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}