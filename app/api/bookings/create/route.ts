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

    const { 
      listing_id, 
      check_in_date, 
      check_out_date, 
      guests, 
      total_nights, 
      total_price 
    } = await request.json()

    // Validate input
    if (!listing_id || !check_in_date || !check_out_date || !guests || !total_nights || !total_price) {
      return NextResponse.json(
        { error: 'Missing required booking information' },
        { status: 400 }
      )
    }

    // Create booking in Cosmic
    const bookingDate = new Date().toISOString().split('T')[0]
    const response = await cosmic.objects.insertOne({
      title: `Booking for ${user.metadata.name}`,
      type: 'bookings',
      metadata: {
        listing: listing_id,
        user: user.id,
        check_in_date,
        check_out_date,
        guests: Number(guests),
        total_nights: Number(total_nights),
        total_price: Number(total_price),
        status: 'Confirmed',
        booking_date: bookingDate
      }
    })

    return NextResponse.json({
      success: true,
      booking: response.object
    })
  } catch (error) {
    console.error('Booking creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create booking' },
      { status: 500 }
    )
  }
}