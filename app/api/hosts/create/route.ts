import { NextResponse } from 'next/server'
import { getSessionUser } from '@/lib/session'
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
    
    // Check if user already has a host profile
    if (user.metadata.host_profile) {
      return NextResponse.json(
        { error: 'User already has a host profile' },
        { status: 400 }
      )
    }
    
    const { bio } = await request.json()
    
    // Create host profile
    const hostResponse = await cosmic.objects.insertOne({
      title: user.metadata.name,
      type: 'hosts',
      metadata: {
        name: user.metadata.name,
        bio: bio || '',
        member_since: new Date().toISOString().split('T')[0],
        response_rate: 100
      }
    })
    
    // Update user with host profile reference
    await cosmic.objects.updateOne(user.id, {
      metadata: {
        host_profile: hostResponse.object.id
      }
    })
    
    return NextResponse.json({
      success: true,
      host: hostResponse.object
    })
  } catch (error) {
    console.error('Create host error:', error)
    return NextResponse.json(
      { error: 'Failed to create host profile' },
      { status: 500 }
    )
  }
}