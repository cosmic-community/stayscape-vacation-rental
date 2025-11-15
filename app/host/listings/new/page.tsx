import { getSessionUser } from '@/lib/session'
import { redirect } from 'next/navigation'
import { getUserWithHost } from '@/lib/cosmic-helpers'
import PageHero from '@/components/PageHero'
import CreateListingForm from '@/components/CreateListingForm'

export default async function NewListingPage() {
  const user = await getSessionUser()
  
  if (!user) {
    redirect('/login')
  }
  
  const userWithHost = await getUserWithHost(user.id)
  
  if (!userWithHost?.metadata.host_profile) {
    redirect('/profile')
  }
  
  return (
    <div className="min-h-screen bg-white">
      <PageHero 
        title="Create New Listing"
        description="Share your space with travelers"
        backgroundImage="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=2000&auto=format,compress"
      />
      
      <div className="max-w-3xl mx-auto px-4 py-12">
        <CreateListingForm />
      </div>
    </div>
  )
}