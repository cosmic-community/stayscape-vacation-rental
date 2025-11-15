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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-600 mb-2">Create an account</h1>
          <p className="text-gray-400">Join StayScape today</p>
        </div>
        
        <SignupForm />
      </div>
    </div>
  )
}