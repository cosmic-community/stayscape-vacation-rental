interface PageHeroProps {
  title: string
  description: string
  backgroundImage?: string
}

export default function PageHero({ title, description, backgroundImage }: PageHeroProps) {
  const defaultBgImage = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=2000&auto=format,compress'
  const bgImage = backgroundImage || defaultBgImage

  return (
    <div className="relative text-white py-16 overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      {/* Black Opacity Overlay */}
      <div className="absolute inset-0 bg-black/70" />
      
      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">{title}</h1>
        <p className="text-xl text-white/90">
          {description}
        </p>
      </div>
    </div>
  )
}