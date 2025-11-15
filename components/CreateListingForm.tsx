'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function CreateListingForm() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [pricePerNight, setPricePerNight] = useState('')
  const [location, setLocation] = useState('')
  const [propertyType, setPropertyType] = useState('entire_place')
  const [guests, setGuests] = useState('1')
  const [bedrooms, setBedrooms] = useState('1')
  const [bathrooms, setBathrooms] = useState('1')
  const [amenities, setAmenities] = useState<string[]>([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  
  const availableAmenities = [
    'WiFi', 'Kitchen', 'Air Conditioning', 'Heating', 
    'Parking', 'Pool', 'Hot Tub', 'Washer', 'Dryer'
  ]
  
  const toggleAmenity = (amenity: string) => {
    setAmenities(prev => 
      prev.includes(amenity) 
        ? prev.filter(a => a !== amenity)
        : [...prev, amenity]
    )
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    
    try {
      const response = await fetch('/api/listings/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title,
          description,
          price_per_night: pricePerNight,
          location,
          property_type: propertyType,
          guests,
          bedrooms,
          bathrooms,
          amenities
        })
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        setError(data.error || 'Failed to create listing')
        setLoading(false)
        return
      }
      
      router.push('/host/dashboard')
      router.refresh()
    } catch (err) {
      setError('An error occurred. Please try again.')
      setLoading(false)
    }
  }
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}
        
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-600 mb-2">
            Listing Title *
          </label>
          <input
            id="title"
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Cozy Downtown Loft with Amazing Views"
          />
        </div>
        
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-600 mb-2">
            Description *
          </label>
          <textarea
            id="description"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={6}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
            placeholder="Describe your space, amenities, and what makes it special..."
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-600 mb-2">
              Price per Night ($) *
            </label>
            <input
              id="price"
              type="number"
              required
              min="1"
              value={pricePerNight}
              onChange={(e) => setPricePerNight(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="100"
            />
          </div>
          
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-600 mb-2">
              Location *
            </label>
            <input
              id="location"
              type="text"
              required
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="San Francisco, California"
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="property-type" className="block text-sm font-medium text-gray-600 mb-2">
            Property Type *
          </label>
          <select
            id="property-type"
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="entire_place">Entire Place</option>
            <option value="private_room">Private Room</option>
            <option value="shared_room">Shared Room</option>
          </select>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label htmlFor="guests" className="block text-sm font-medium text-gray-600 mb-2">
              Guests *
            </label>
            <input
              id="guests"
              type="number"
              required
              min="1"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          
          <div>
            <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-600 mb-2">
              Bedrooms *
            </label>
            <input
              id="bedrooms"
              type="number"
              required
              min="0"
              value={bedrooms}
              onChange={(e) => setBedrooms(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          
          <div>
            <label htmlFor="bathrooms" className="block text-sm font-medium text-gray-600 mb-2">
              Bathrooms *
            </label>
            <input
              id="bathrooms"
              type="number"
              required
              min="0"
              step="0.5"
              value={bathrooms}
              onChange={(e) => setBathrooms(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-3">
            Amenities
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {availableAmenities.map((amenity) => (
              <label
                key={amenity}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={amenities.includes(amenity)}
                  onChange={() => toggleAmenity(amenity)}
                  className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary"
                />
                <span className="text-gray-600">{amenity}</span>
              </label>
            ))}
          </div>
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Creating listing...' : 'Create Listing'}
        </button>
      </form>
    </div>
  )
}