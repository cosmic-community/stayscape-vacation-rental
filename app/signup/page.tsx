import SignupForm from '@/components/SignupForm'
import { getSessionUser } from '@/lib/session'
import { redirect } from 'next/navigation'
import PageHero from '@/components/PageHero'

export default async function SignupPage() {
  const user = await getSessionUser()
  
  // Redirect if already logged in
  if (user) {
    redirect('/profile')
  }
  
  return (
    <div className="min-h-screen bg-white">
      <PageHero 
        title="Join StayScape"
        description="Create an account to start booking amazing vacation rentals"
        backgroundImage="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=2000&auto=format,compress"
      />
      
      {/* Signup Form */}
      <div className="max-w-md mx-auto px-4 -mt-8">
        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
          <SignupForm />
        </div>
      </div>
    </div>
  )
}