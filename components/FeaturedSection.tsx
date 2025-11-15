export default function FeaturedSection() {
  const features = [
    {
      icon: '🏠',
      title: 'Unique Properties',
      description: 'From cozy cabins to luxury villas'
    },
    {
      icon: '⭐',
      title: 'Verified Reviews',
      description: 'Real feedback from real guests'
    },
    {
      icon: '💼',
      title: 'Trusted Hosts',
      description: 'Experienced and highly-rated hosts'
    },
    {
      icon: '🔒',
      title: 'Secure Booking',
      description: 'Safe and protected transactions'
    }
  ]
  
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}