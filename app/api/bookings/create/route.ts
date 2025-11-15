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
    
    const { listingId, checkInDate, checkOutDate, guests, totalNights, totalPrice } = await request.json()
    
    // Validate required fields
    if (!listingId || !checkInDate || !checkOutDate || !guests || !totalNights || !totalPrice) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }
    
    // Create booking title
    const bookingTitle = `Booking for ${user.metadata.name}`
    const bookingDate = new Date().toISOString().split('T')[0]
    
    // Create the booking in Cosmic CMS
    const response = await cosmic.objects.insertOne({
      title: bookingTitle,
      type: 'bookings',
      metadata: {
        listing: listingId,
        user: user.id,
        check_in_date: checkInDate,
        check_out_date: checkOutDate,
        guests: Number(guests),
        total_nights: Number(totalNights),
        total_price: Number(totalPrice),
        status: 'Pending',
        booking_date: bookingDate
      }
    })
    
    return NextResponse.json({
      success: true,
      booking: response.object
    })
  } catch (error) {
    console.error('Create booking error:', error)
    return NextResponse.json(
      { error: 'An error occurred while creating the booking' },
      { status: 500 }
    )
  }
}