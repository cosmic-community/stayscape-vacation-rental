import { NextResponse } from 'next/server'
import { getSessionUser } from '@/lib/session'
import { updateUserProfile } from '@/lib/auth'

export async function PUT(request: Request) {
  try {
    const user = await getSessionUser()
    
    if (!user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      )
    }
    
    const { name, bio, phone } = await request.json()
    
    const updatedUser = await updateUserProfile(user.id, {
      name,
      bio,
      phone
    })
    
    if (!updatedUser) {
      return NextResponse.json(
        { error: 'Failed to update profile' },
        { status: 500 }
      )
    }
    
    return NextResponse.json({
      success: true,
      user: {
        id: updatedUser.id,
        name: updatedUser.metadata.name,
        email: updatedUser.metadata.email,
        bio: updatedUser.metadata.bio,
        phone: updatedUser.metadata.phone
      }
    })
  } catch (error) {
    console.error('Update profile error:', error)
    return NextResponse.json(
      { error: 'An error occurred' },
      { status: 500 }
    )
  }
}