// app/api/listings/update/[id]/route.ts
import { NextResponse } from 'next/server'
import { getSessionUser } from '@/lib/session'
import { getUserWithHost } from '@/lib/cosmic-helpers'
import { cosmic } from '@/lib/cosmic'

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
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
        { error: 'You must be a host to update listings' },
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
      amenities,
      available
    } = await request.json()
    
    // Build update object with only provided fields
    const updateData: any = {}
    if (title !== undefined) {
      updateData.title = title
    }
    if (description !== undefined) updateData.description = description
    if (price_per_night !== undefined) updateData.price_per_night = Number(price_per_night)
    if (location !== undefined) updateData.location = location
    if (property_type !== undefined) {
      updateData.property_type = {
        key: property_type,
        value: property_type === 'entire_place' ? 'Entire Place' : 
               property_type === 'private_room' ? 'Private Room' : 'Shared Room'
      }
    }
    if (guests !== undefined) updateData.guests = Number(guests)
    if (bedrooms !== undefined) updateData.bedrooms = Number(bedrooms)
    if (bathrooms !== undefined) updateData.bathrooms = Number(bathrooms)
    if (amenities !== undefined) updateData.amenities = amenities
    if (available !== undefined) updateData.available = available
    
    // Update listing
    const listingResponse = await cosmic.objects.updateOne(id, {
      title: title,
      metadata: updateData
    })
    
    return NextResponse.json({
      success: true,
      listing: listingResponse.object
    })
  } catch (error) {
    console.error('Update listing error:', error)
    return NextResponse.json(
      { error: 'Failed to update listing' },
      { status: 500 }
    )
  }
}