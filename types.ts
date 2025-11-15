// Base Cosmic object interface
interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
  status: string;
  thumbnail?: string;
}

// Property type literal (select-dropdown values from content model)
type PropertyTypeKey = 'entire_place' | 'private_room' | 'shared_room';

interface PropertyType {
  key: PropertyTypeKey;
  value: string;
}

// Photo interface
interface Photo {
  url: string;
  imgix_url: string;
}

// Host interface
export interface Host extends CosmicObject {
  type: 'hosts';
  metadata: {
    name: string;
    bio?: string;
    profile_photo?: Photo;
    member_since?: string;
    response_rate?: number;
  };
}

// Listing interface
export interface Listing extends CosmicObject {
  type: 'listings';
  metadata: {
    title: string;
    description: string;
    price_per_night: number;
    location: string;
    property_type: PropertyType;
    guests: number;
    bedrooms: number;
    bathrooms: number;
    amenities?: string[];
    photos?: Photo[];
    host?: Host;
    available?: boolean;
  };
}

// Review interface
export interface Review extends CosmicObject {
  type: 'reviews';
  metadata: {
    listing?: Listing;
    guest_name: string;
    rating: number;
    comment: string;
    review_date?: string;
  };
}

// User interface
export interface User extends CosmicObject {
  type: 'users';
  metadata: {
    name: string;
    email: string;
    password_hash: string;
    profile_photo?: Photo | null;
    bio?: string | null;
    phone?: string | null;
    created_at?: string;
  };
}

// Booking status type
export type BookingStatus = 'Confirmed' | 'Pending' | 'Cancelled';

// Booking interface
export interface Booking extends CosmicObject {
  type: 'bookings';
  metadata: {
    listing: Listing;
    user: string; // User ID reference
    check_in_date: string;
    check_out_date: string;
    guests: number;
    total_nights: number;
    total_price: number;
    status: BookingStatus;
    booking_date: string;
  };
}

// API response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
}

// Type guards
export function isListing(obj: CosmicObject): obj is Listing {
  return obj.type === 'listings';
}

export function isHost(obj: CosmicObject): obj is Host {
  return obj.type === 'hosts';
}

export function isReview(obj: CosmicObject): obj is Review {
  return obj.type === 'reviews';
}

export function isBooking(obj: CosmicObject): obj is Booking {
  return obj.type === 'bookings';
}

// Utility types
export type CreateListingData = Omit<Listing, 'id' | 'created_at' | 'modified_at' | 'status'>;
export type CreateReviewData = Omit<Review, 'id' | 'created_at' | 'modified_at' | 'status'>;
export type CreateBookingData = Omit<Booking, 'id' | 'created_at' | 'modified_at' | 'status'>;