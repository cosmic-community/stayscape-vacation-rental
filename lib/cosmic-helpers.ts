import { cosmic, hasStatus } from './cosmic'
import type { Listing, Review, Host } from '@/types'

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