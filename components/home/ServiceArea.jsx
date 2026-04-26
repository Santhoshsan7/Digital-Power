export default function ServiceArea() {
  const areas = [
    { name: "Kolathur", customers: "100+" },
    { name: "Retteri", customers: "80+" },
    { name: "Madhavaram", customers: "90+" },
    { name: "Redhills", customers: "120+" },
    { name: "Padi", customers: "70+" },
    { name: "Surapet", customers: "60+" },
    { name: "Koyambedu", customers: "50+" },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12">

          {/* Left Content */}
          <div className="flex-1 text-center lg:text-left">
            <span className="inline-block font-bold text-sm uppercase tracking-wider mb-2" style={{ color: '#F57C00' }}>
              Service Locations
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#0B3C5D' }}>
              🚚 Our Service Areas
            </h2>
            <p className="text-lg mb-8 max-w-xl" style={{ color: '#4B5563' }}>
              Fast delivery and professional installation across Chennai. We serve these areas with same-day service!
            </p>

            {/* Area Pills - Centered with uniform spacing */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 mt-2">
              {areas.map((area, index) => (
                <div
                  key={index}
                  className="bg-white border-2 px-5 py-3 rounded-full shadow-md hover:shadow-lg transition-all cursor-pointer group"
                  style={{ borderColor: '#0B3C5D' }}
                >
                  <span className="flex items-center gap-2">
                    <span className="text-lg">📍</span>
                    <span className="font-semibold" style={{ color: '#0B3C5D' }}>{area.name}</span>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: '#F57C00', color: 'white' }}>
                      {area.customers}
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Map Visual */}
          <div className="flex-1">
            <div className="bg-gradient-to-br from-brand-navy to-brand-navy-light rounded-3xl p-8 shadow-2xl" style={{ background: 'linear-gradient(135deg, #0B3C5D 0%, #0d4a70 100%)' }}>
              <div className="bg-white/10 rounded-2xl p-6 text-center">
                <div className="text-6xl mb-4">🗺️</div>
                <h3 className="font-bold text-xl mb-2" style={{ color: 'white' }}>Chennai Coverage</h3>
                <p className="mb-6" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>North Chennai & Surrounding Areas</p>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/10 rounded-xl p-4">
                    <div className="text-2xl font-bold" style={{ color: '#F57C00' }}>5+</div>
                    <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Service Areas</div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4">
                    <div className="text-2xl font-bold" style={{ color: '#FFB800' }}>500+</div>
                    <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Deliveries</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
