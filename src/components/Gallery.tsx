export default function Gallery() {
  return (
    <section id="gallery" className="min-h-screen py-20 px-4 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-serif text-slate-900 text-center mb-12">
          Gallery
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Gallery images will go here */}
          <div className="aspect-square bg-slate-200 rounded-2xl overflow-hidden">
            <img
              src="/images/Hall.jpg"
              alt="Grace Garden Hall"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="aspect-square bg-slate-200 rounded-2xl overflow-hidden">
            <img
              src="/images/Luxury Room.jpg"
              alt="Luxury Room"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="aspect-square bg-slate-200 rounded-2xl overflow-hidden">
            <img
              src="/images/Balcony.jpg"
              alt="Balcony View"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
