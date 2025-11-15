export default function Hero() {
  return (
    <section className="relative bg-gray-900 text-white py-20 px-4 min-h-[600px] flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=2000&h=1200&fit=crop&auto=format,compress"
          alt="Beautiful vacation home"
          className="w-full h-full object-cover"
        />
        {/* Overlay for better text readability - Changed to black opacity */}
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto text-center relative z-10">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Find your perfect getaway
        </h1>
        <p className="text-xl md:text-2xl mb-12 text-white/90">
          Discover unique vacation rentals and unforgettable experiences
        </p>
        
        <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600 mb-2">Location</label>
              <input
                type="text"
                placeholder="Where are you going?"
                className="input-field text-gray-600"
              />
            </div>
            
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600 mb-2">Guests</label>
              <input
                type="number"
                placeholder="Add guests"
                className="input-field text-gray-600"
                min="1"
              />
            </div>
            
            <div className="flex items-end">
              <button className="w-full btn-primary">
                <svg className="w-5 h-5 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}