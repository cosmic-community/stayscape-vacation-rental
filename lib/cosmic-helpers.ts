import { cosmic, hasStatus } from './cosmic'
import type { Listing, Review, Host, Booking, User } from '@/types'

// Fetch all listings with host information
export async function getAllListings(): Promise<Listing[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'listings' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.objects as Listing[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch listings')
  }
}

// Fetch a single listing by slug
export async function getListingBySlug(slug: string): Promise<Listing | null> {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'listings',
        slug
      })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1)
    
    return response.object as Listing
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch listing')
  }
}

// Fetch reviews for a specific listing
export async function getReviewsForListing(listingId: string): Promise<Review[]> {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'reviews',
        'metadata.listing': listingId
      })
      .props(['id', 'title', 'metadata'])
      .depth(1)
    
    // Sort reviews manually (SDK v1.5+)
    const reviews = response.objects as Review[]
    return reviews.sort((a, b) => {
      const dateA = new Date(a.metadata.review_date || '').getTime()
      const dateB = new Date(b.metadata.review_date || '').getTime()
      return dateB - dateA // Newest first
    })
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch reviews')
  }
}

// Fetch all hosts
export async function getAllHosts(): Promise<Host[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'hosts' })
      .props(['id', 'title', 'slug', 'metadata'])
    
    return response.objects as Host[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch hosts')
  }
}

// Filter listings by property type
export async function getListingsByPropertyType(propertyTypeKey: string): Promise<Listing[]> {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'listings',
        'metadata.property_type.key': propertyTypeKey
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.objects as Listing[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch listings by property type')
  }
}

// Search listings by location
export async function searchListingsByLocation(location: string): Promise<Listing[]> {
  const allListings = await getAllListings()
  
  return allListings.filter(listing => 
    listing.metadata.location.toLowerCase().includes(location.toLowerCase())
  )
}

// Fetch bookings for a specific user
export async function getBookingsForUser(userId: string): Promise<Booking[]> {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'bookings',
        'metadata.user': userId
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    // Sort bookings manually (SDK v1.5+) - newest first
    const bookings = response.objects as Booking[]
    return bookings.sort((a, b) => {
      const dateA = new Date(a.metadata.booking_date || '').getTime()
      const dateB = new Date(b.metadata.booking_date || '').getTime()
      return dateB - dateA
    })
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch bookings')
  }
}

// Changed: Added function to fetch listings for a specific host
export async function getListingsForHost(hostId: string): Promise<Listing[]> {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'listings',
        'metadata.host': hostId
      })
      .props(['id', 'title', 'slug', 'metadata', 'thumbnail'])
      .depth(1)
    
    return response.objects as Listing[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch host listings')
  }
}

// Changed: Added function to get host by ID
export async function getHostById(hostId: string): Promise<Host | null> {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'hosts',
        id: hostId
      })
      .props(['id', 'title', 'slug', 'metadata'])
    
    return response.object as Host
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch host')
  }
}

// Changed: Added function to get user with host profile
export async function getUserWithHost(userId: string): Promise<User | null> {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'users',
        id: userId
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1) // Changed: Include host profile if it exists
    
    return response.object as User
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch user')
  }
}