import LoginForm from '@/components/LoginForm'
import { getSessionUser } from '@/lib/session'
import { redirect } from 'next/navigation'
import PageHero from '@/components/PageHero'

export default async function LoginPage() {
  const user = await getSessionUser()
  
  // Redirect if already logged in
  if (user) {
    redirect('/profile')
  }
  
  return (
    <div className="min-h-screen bg-white">
      <PageHero 
        title="Welcome Back"
        description="Sign in to your account to continue"
        backgroundImage="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=2000&auto=format,compress"
      />
      
      {/* Login Form */}
      <div className="max-w-md mx-auto px-4 -mt-8">
        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
          <LoginForm />
        </div>
      </div>
    </div>
  )
}