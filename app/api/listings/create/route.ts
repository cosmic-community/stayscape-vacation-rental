import { NextResponse } from 'next/server'
import { getSessionUser } from '@/lib/session'
import { getUserWithHost } from '@/lib/cosmic-helpers'
import { cosmic } from '@/lib/cosmic'

export async function POST(request: Request) {
  try {
    const user = await getSessionUser()
    
    if (!user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      )
    }
    
    // Get user with host profile
    const userWithHost = await getUserWithHost(user.id)
    
    if (!userWithHost?.metadata.host_profile) {
      return NextResponse.json(
        { error: 'You must be a host to create listings' },
        { status: 403 }
      )
    }
    
    const {
      title,
      description,
      price_per_night,
      location,
      property_type,
      guests,
      bedrooms,
      bathrooms,
      amenities
    } = await request.json()
    
    // Validate required fields
    if (!title || !description || !price_per_night || !location || !property_type || !guests || !bedrooms || !bathrooms) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }
    
    // Get host ID
    const hostId = typeof userWithHost.metadata.host_profile === 'string' 
      ? userWithHost.metadata.host_profile 
      : userWithHost.metadata.host_profile.id
    
    // Create listing
    const listingResponse = await cosmic.objects.insertOne({
      title,
      type: 'listings',
      metadata: {
        title,
        description,
        price_per_night: Number(price_per_night),
        location,
        property_type: {
          key: property_type,
          value: property_type === 'entire_place' ? 'Entire Place' : 
                 property_type === 'private_room' ? 'Private Room' : 'Shared Room'
        },
        guests: Number(guests),
        bedrooms: Number(bedrooms),
        bathrooms: Number(bathrooms),
        amenities: amenities || [],
        host: hostId,
        available: true
      }
    })
    
    return NextResponse.json({
      success: true,
      listing: listingResponse.object
    })
  } catch (error) {
    console.error('Create listing error:', error)
    return NextResponse.json(
      { error: 'Failed to create listing' },
      { status: 500 }
    )
  }
}