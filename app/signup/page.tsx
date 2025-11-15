import SignupForm from '@/components/SignupForm'
import { getSessionUser } from '@/lib/session'
import { redirect } from 'next/navigation'

export default async function SignupPage() {
  const user = await getSessionUser()
  
  // Redirect if already logged in
  if (user) {
    redirect('/profile')
  }
  
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Background */}
      <div className="relative bg-gradient-to-r from-primary to-secondary text-white py-16 overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=2000&auto=format,compress)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        
        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Join StayScape</h1>
          <p className="text-xl text-white/90">
            Create an account to start booking amazing vacation rentals
          </p>
        </div>
      </div>
      
      {/* Signup Form */}
      <div className="max-w-md mx-auto px-4 -mt-8">
        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
          <SignupForm />
        </div>
      </div>
    </div>
  )
}