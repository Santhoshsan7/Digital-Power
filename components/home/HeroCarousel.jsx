"use client";
import Link from "next/link";

export default function HeroCarousel() {
  return (
    <section className="relative min-h-[550px] bg-gradient-to-br from-brand-navy via-brand-navy-light to-brand-navy overflow-hidden" style={{ background: 'linear-gradient(135deg, #0B3C5D 0%, #0d4a70 50%, #082840 100%)' }}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-brand-orange/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-20 w-96 h-96 bg-brand-accent/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-orange/5 rounded-full blur-3xl"></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
        backgroundSize: '50px 50px'
      }}></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-16 flex flex-col lg:flex-row items-center gap-12">

        {/* Left Content */}
        <div className="flex-1 text-center lg:text-left">
          {/* Promo Badge */}
          <div className="inline-flex items-center gap-2 bg-brand-orange/20 border border-brand-orange/50 text-brand-orange px-4 py-2 rounded-full mb-6 animate-bounce">
            <span className="text-xl">🎉</span>
            <span className="font-bold text-sm uppercase tracking-wider">SPL BONANZA YEAR END EXCHANGE</span>
          </div>

          {/* Discount Banner */}
          <div className="inline-block bg-brand-accent text-brand-navy-dark font-bold px-6 py-2 rounded-lg mb-6 shadow-lg transform -rotate-2">
            💰 DISCOUNT FOR OLD BATTERY ₹ 5000/-
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
            STAY <span className="text-brand-orange">POWERED</span> UP
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-4">
            WITH THE ALL-NEW
          </p>
          <p className="text-2xl md:text-3xl font-bold text-brand-accent mb-8">
            HEAVY DUTY INVERTER BATTERY!
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-10">
            <Link
              href="/inverter"
              className="bg-brand-orange hover:bg-brand-orange-dark text-white px-8 py-4 rounded-xl font-bold text-lg transition shadow-lg hover:shadow-2xl transform hover:scale-105 flex items-center gap-2"
            >
              🛒 Shop Now
            </Link>
            <Link
              href="/contact"
              className="border-2 border-white text-white hover:bg-white hover:text-brand-navy px-8 py-4 rounded-xl font-bold text-lg transition flex items-center gap-2"
            >
              📞 Get Free Quote
            </Link>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-6 text-white/80">
            <div className="flex items-center gap-2">
              <span className="text-2xl">✅</span>
              <span>Free Installation</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🛡️</span>
              <span>2 Year Warranty</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🚚</span>
              <span>Free Delivery</span>
            </div>
          </div>
        </div>

        {/* Right Side - Product Showcase */}
        <div className="flex-1 relative">
          {/* Main Product Card */}
          <div className="relative bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl">
            {/* Badge */}
            <div className="absolute -top-4 -right-4 bg-brand-orange text-white px-4 py-2 rounded-full font-bold shadow-lg">
              No.1 UPS BRAND
            </div>

            {/* Product Image Placeholder */}
            <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl h-64 flex items-center justify-center mb-6">
              <div className="text-center">
                <div className="text-6xl mb-2">🔋</div>
                <p className="text-brand-navy font-bold">MICROTEK</p>
                <p className="text-gray-600 text-sm">ADC Technology</p>
              </div>
            </div>

            {/* Product Info */}
            <div className="text-center">
              <span className="inline-block bg-brand-accent text-brand-navy-dark px-3 py-1 rounded-full text-sm font-bold mb-2">
                New Addition: 160Ah Tall Tubular
              </span>
              <h3 className="text-xl font-bold text-white mb-2">Advanced Dura Core Battery</h3>
              <p className="text-gray-300 text-sm mb-4">Powered by COPPER Technology</p>
              <div className="flex justify-center gap-4">
                <span className="text-gray-400 line-through">₹18,999</span>
                <span className="text-2xl font-bold text-brand-orange">₹14,999</span>
              </div>
            </div>
          </div>

          {/* Floating Elements */}
          <div className="absolute -left-8 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 shadow-xl hidden lg:block">
            <div className="text-3xl mb-1">⚡</div>
            <p className="text-white text-sm font-bold">500+</p>
            <p className="text-gray-400 text-xs">Happy Customers</p>
          </div>

          <div className="absolute -right-4 bottom-10 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 shadow-xl hidden lg:block">
            <div className="text-3xl mb-1">🏆</div>
            <p className="text-white text-sm font-bold">4.8★</p>
            <p className="text-gray-400 text-xs">Rating</p>
          </div>
        </div>
      </div>
    </section>
  );
}
