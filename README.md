# 🏠 StayScape - Vacation Rental Marketplace

![App Preview](https://imgix.cosmicjs.com/492edd80-c1a8-11f0-a34a-efbcf979242c-photo-1520250497591-112f2f40a3f4-1763158897195.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A beautiful, full-featured vacation rental marketplace built with Next.js 16 and Cosmic CMS. Browse stunning properties, read guest reviews, and discover your perfect getaway.

## ✨ Features

- 🏡 **Property Listings** - Browse vacation rentals with detailed information, pricing, and availability
- 🔍 **Smart Search & Filters** - Find properties by location, guests, amenities, and property type
- 📸 **Photo Galleries** - Stunning image showcases with imgix optimization
- 👤 **Host Profiles** - Meet your hosts with detailed bios and ratings
- ⭐ **Guest Reviews** - Read authentic reviews with star ratings
- 📱 **Fully Responsive** - Beautiful experience on all devices
- ⚡ **Lightning Fast** - Built with Next.js 16 App Router for optimal performance
- 🎨 **Modern Design** - Clean, professional interface inspired by leading booking platforms

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](http://localhost:3040/projects/new?clone_bucket=6917aaddd08bae0bc234bd56&clone_repository=6917fc920616ea305e10abb0)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create an arbnb clone"

### Code Generation Prompt

> "Build a Next.js website that uses my existing objects in this bucket"

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## 🛠 Technologies Used

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Cosmic CMS** - Headless CMS for content management
- **Imgix** - Image optimization and transformation
- **Bun** - Fast JavaScript runtime and package manager

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or Bun installed
- A Cosmic account with your bucket set up
- Cosmic API credentials (bucket slug, read key, write key)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd stayscape
   ```

2. **Install dependencies**
   ```bash
   bun install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   COSMIC_BUCKET_SLUG=your-bucket-slug
   COSMIC_READ_KEY=your-read-key
   COSMIC_WRITE_KEY=your-write-key
   ```

4. **Run the development server**
   ```bash
   bun dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📚 Cosmic SDK Examples

### Fetching Listings with Host Information

```typescript
import { cosmic } from '@/lib/cosmic'

// Fetch listings with related host data using depth parameter
const { objects: listings } = await cosmic.objects
  .find({ type: 'listings' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1) // This includes the connected host object

console.log(listings[0].metadata.host.metadata.name) // Access host name
```

### Fetching Reviews for a Specific Listing

```typescript
// Query reviews by listing ID
const { objects: reviews } = await cosmic.objects
  .find({ 
    type: 'reviews',
    'metadata.listing': listingId // Query by object relationship
  })
  .props(['id', 'title', 'metadata'])
  .depth(1) // Include full listing details

// Sort reviews manually (SDK v1.5+)
const sortedReviews = reviews.sort((a, b) => {
  const dateA = new Date(a.metadata.review_date || '').getTime()
  const dateB = new Date(b.metadata.review_date || '').getTime()
  return dateB - dateA // Newest first
})
```

### Filtering Listings by Property Type

```typescript
// Filter by select-dropdown value (use exact key from content model)
const { objects: entirePlaces } = await cosmic.objects
  .find({ 
    type: 'listings',
    'metadata.property_type.key': 'entire_place'
  })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Creating a New Review

```typescript
// Create a new review with proper metadata structure
await cosmic.objects.insertOne({
  type: 'reviews',
  title: 'Amazing stay!',
  metadata: {
    listing: listingId, // Reference listing by ID
    guest_name: 'John Smith',
    rating: 5,
    comment: 'Had a wonderful time at this property!',
    review_date: '2024-01-15'
  }
})
```

## 🎨 Cosmic CMS Integration

This application is fully integrated with Cosmic CMS and leverages your existing content model:

### Content Types Used

- **Listings** - Main property objects with title, description, pricing, location, amenities, photos, and host relationships
- **Hosts** - Host profiles with bios, photos, member since dates, and response rates
- **Reviews** - Guest reviews connected to specific listings with ratings and comments
- **Users** - User management for future authentication features

### Key Features

- **Object Relationships** - Listings are connected to Hosts using Cosmic's object metafield type
- **Depth Queries** - Related host data is fetched automatically using `depth(1)` parameter
- **Rich Media** - Property photos use Cosmic's imgix integration for optimized delivery
- **Dynamic Content** - All content is managed through Cosmic dashboard
- **Type Safety** - Complete TypeScript interfaces matching your content model

### Content Management

To manage your content:

1. Log in to your Cosmic dashboard
2. Navigate to your bucket
3. Add, edit, or remove Listings, Hosts, Reviews, or Users
4. Changes are reflected immediately in the application

## 🚢 Deployment Options

### Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone)

1. Click the "Deploy to Vercel" button
2. Connect your GitHub repository
3. Add your environment variables in Vercel dashboard:
   - `COSMIC_BUCKET_SLUG`
   - `COSMIC_READ_KEY`
   - `COSMIC_WRITE_KEY`
4. Deploy!

### Deploy to Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start)

1. Click the "Deploy to Netlify" button
2. Connect your GitHub repository
3. Add your environment variables in Netlify dashboard
4. Deploy!

### Environment Variables for Production

Make sure to set these environment variables in your hosting platform:

```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

## 📖 Learn More

- [Cosmic CMS Documentation](https://www.cosmicjs.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

## 📝 License

MIT

---

Built with ❤️ using [Cosmic CMS](https://www.cosmicjs.com) and [Next.js](https://nextjs.org)

<!-- README_END -->