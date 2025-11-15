import { cookies } from 'next/headers'
import { getUserByEmail } from './auth'
import type { User } from '@/types'

const SESSION_COOKIE_NAME = 'stayscape_session'

// Create session after successful login
export async function createSession(userId: string): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE_NAME, userId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/'
  })
}

// Get current session user
export async function getSessionUser(): Promise<User | null> {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME)
  
  if (!sessionCookie?.value) {
    return null
  }
  
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'users',
        id: sessionCookie.value
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(0)
    
    return response.object as User
  } catch (error) {
    console.error('Error fetching session user:', error)
    return null
  }
}

// Destroy session (logout)
export async function destroySession(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE_NAME)
}

// Check if user is authenticated
export async function isAuthenticated(): Promise<boolean> {
  const user = await getSessionUser()
  return user !== null
}