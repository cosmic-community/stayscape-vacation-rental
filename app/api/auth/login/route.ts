import { NextResponse } from 'next/server'
import { getUserByEmail, verifyPassword } from '@/lib/auth'
import { createSession } from '@/lib/session'

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()
    
    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }
    
    // Get user by email
    const user = await getUserByEmail(email)
    
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }
    
    // Verify password
    const isValid = await verifyPassword(password, user.metadata.password_hash)
    
    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }
    
    // Create session
    await createSession(user.id)
    
    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.metadata.name,
        email: user.metadata.email
      }
    })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'An error occurred during login' },
      { status: 500 }
    )
  }
}