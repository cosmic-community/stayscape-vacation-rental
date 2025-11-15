'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function BecomeHostButton() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [bio, setBio] = useState('')
  const router = useRouter()
  
  const handleCreateHost = async () => {
    setError('')
    setLoading(true)
    
    try {
      const response = await fetch('/api/hosts/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ bio })
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        setError(data.error || 'Failed to create host profile')
        setLoading(false)
        return
      }
      
      // Redirect to host dashboard
      router.push('/host/dashboard')
      router.refresh()
    } catch (err) {
      setError('An error occurred. Please try again.')
      setLoading(false)
    }
  }
  
  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="btn-primary"
      >
        Become a Host
      </button>
      
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold text-gray-600 mb-4">Become a Host</h2>
            <p className="text-gray-400 mb-6">
              Start your hosting journey and share your space with travelers from around the world.
            </p>
            
            {error && (
              <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm mb-4">
                {error}
              </div>
            )}
            
            <div className="mb-6">
              <label htmlFor="bio" className="block text-sm font-medium text-gray-600 mb-2">
                Host Bio (Optional)
              </label>
              <textarea
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                placeholder="Tell guests about yourself and your hosting style..."
              />
            </div>
            
            <div className="flex space-x-4">
              <button
                onClick={handleCreateHost}
                disabled={loading}
                className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Creating...' : 'Create Host Profile'}
              </button>
              <button
                onClick={() => setShowModal(false)}
                disabled={loading}
                className="flex-1 px-6 py-3 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}