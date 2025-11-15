import { cosmic } from './cosmic'
import type { User } from '@/types'

// Hash password using Web Crypto API
export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(password)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

// Verify password against hash
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  const passwordHash = await hashPassword(password)
  return passwordHash === hash
}

// Get user by email
export async function getUserByEmail(email: string): Promise<User | null> {
  try {
    const response = await cosmic.objects
      .find({
        type: 'users',
        'metadata.email': email
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(0)
    
    if (response.objects.length === 0) {
      return null
    }
    
    return response.objects[0] as User
  } catch (error) {
    console.error('Error fetching user by email:', error)
    return null
  }
}

// Create new user
export async function createUser(name: string, email: string, password: string): Promise<User | null> {
  try {
    const passwordHash = await hashPassword(password)
    const now = new Date().toISOString().split('T')[0]
    
    const response = await cosmic.objects.insertOne({
      title: name,
      type: 'users',
      metadata: {
        name,
        email,
        password_hash: passwordHash,
        created_at: now
      }
    })
    
    return response.object as User
  } catch (error) {
    console.error('Error creating user:', error)
    return null
  }
}

// Update user profile
export async function updateUserProfile(
  userId: string,
  data: {
    name?: string
    bio?: string
    phone?: string
  }
): Promise<User | null> {
  try {
    const response = await cosmic.objects.updateOne(userId, {
      title: data.name,
      metadata: data
    })
    
    return response.object as User
  } catch (error) {
    console.error('Error updating user profile:', error)
    return null
  }
}