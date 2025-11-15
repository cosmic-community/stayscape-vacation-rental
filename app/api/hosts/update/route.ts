import { NextResponse } from 'next/server'
import { getSessionUser } from '@/lib/session'
import { getUserWithHost } from '@/lib/cosmic-helpers'
import { cosmic } from '@/lib/cosmic'

export async function PUT(request: Request) {
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
        { error: 'User does not have a host profile' },
        { status: 400 }
      )
    }
    
    const { bio, response_rate } = await request.json()
    
    // Get host ID
    const hostId = typeof userWithHost.metadata.host_profile === 'string' 
      ? userWithHost.metadata.host_profile 
      : userWithHost.metadata.host_profile.id
    
    // Update host profile
    const updateData: any = {}
    if (bio !== undefined) updateData.bio = bio
    if (response_rate !== undefined) updateData.response_rate = response_rate
    
    const hostResponse = await cosmic.objects.updateOne(hostId, {
      metadata: updateData
    })
    
    return NextResponse.json({
      success: true,
      host: hostResponse.object
    })
  } catch (error) {
    console.error('Update host error:', error)
    return NextResponse.json(
      { error: 'Failed to update host profile' },
      { status: 500 }
    )
  }
}