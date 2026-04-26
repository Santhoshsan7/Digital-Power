"use client";
import Image from "next/image";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { comboProducts } from "@/data/products";
import PromotionBanner from "@/components/PromotionBanner";



export default function ComboOfferPage() {
  const products = comboProducts;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <section className="relative py-10 md:py-14 overflow-hidden" style={{ background: '#1c665d' }}>
        <div className="container-wide relative">
          <nav className="section-breadcrumb relative z-10 mb-4">
            <Link href="/" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Home</Link>
            <span className="mx-2" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>›</span>
            <span className="active" style={{ color: '#FFB800' }}>Combo Offers</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 relative z-10 text-center md:text-left">
            <div className="flex-1 max-w-2xl">
              <div className="flex items-center justify-center md:justify-start gap-3 md:gap-4 mb-4">
                <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 md:w-14 md:h-14 lg:w-16 lg:h-16 drop-shadow-lg transform hover:scale-105 transition-transform flex-shrink-0">
                  <g filter="url(#drop-shadow)">
                    <rect x="14" y="32" width="36" height="24" rx="3" fill="#FFC107" />
                    <rect x="14" y="32" width="36" height="24" rx="3" fill="url(#box-grad)" />
                    <rect x="28" y="32" width="8" height="24" fill="#E91E63" />
                    <rect x="28" y="32" width="8" height="24" fill="url(#ribbon-grad)" />
                    <rect x="12" y="24" width="40" height="8" rx="2" fill="#FFD54F" />
                    <rect x="12" y="24" width="40" height="8" rx="2" fill="url(#lid-grad)" />
                    <rect x="28" y="24" width="8" height="8" fill="#D81B60" />
                    <path d="M32 24 C18 10, 10 24, 28 24 Z" fill="#E91E63" />
                    <path d="M32 24 C46 10, 54 24, 36 24 Z" fill="#E91E63" />
                    <rect x="29" y="22" width="6" height="6" rx="3" fill="#C2185B" />
                  </g>
                  <defs>
                    <linearGradient id="box-grad" x1="14" y1="32" x2="50" y2="56" gradientUnits="userSpaceOnUse">
                      <stop stopColor="white" stopOpacity="0.4" />
                      <stop offset="1" stopColor="black" stopOpacity="0.1" />
                    </linearGradient>
                    <linearGradient id="lid-grad" x1="12" y1="24" x2="52" y2="32" gradientUnits="userSpaceOnUse">
                      <stop stopColor="white" stopOpacity="0.5" />
                      <stop offset="1" stopColor="black" stopOpacity="0.0" />
                    </linearGradient>
                    <linearGradient id="ribbon-grad" x1="28" y1="32" x2="36" y2="56" gradientUnits="userSpaceOnUse">
                      <stop stopColor="white" stopOpacity="0.2" />
                      <stop offset="1" stopColor="black" stopOpacity="0.2" />
                    </linearGradient>
                    <filter id="drop-shadow" x="0" y="0" width="64" height="64" filterUnits="userSpaceOnUse">
                      <feDropShadow dx="0" dy="4" stdDeviation="3" floodOpacity="0.2" />
                    </filter>
                  </defs>
                </svg>
                <div>
                  <h1 className="text-2xl md:text-4xl lg:text-5xl font-black text-white mb-1 tracking-tight drop-shadow-md">
                    Combo Offers
                  </h1>
                  <p className="text-sm md:text-base text-white/90 font-semibold">Save Big with Inverter + Battery Packages</p>
                </div>
              </div>

              {/* SEO Content Text */}
              <div className="text-white/80 text-sm max-w-xl space-y-2 hidden md:block mt-2 font-medium">
                <p>
                  Get the best value with our expertly paired <strong className="text-white font-semibold">Inverter and Battery Combo Packages</strong>. Designed for optimal compatibility and maximum backup time, these bundles take the guesswork out of building your perfect power solution.
                </p>
                <p>
                  Enjoy <strong className="text-white font-semibold">exclusive combo discounts</strong> on top-tier brands like Luminous and Microtek. Every package includes a pure sine wave inverter, heavy-duty tubular battery, heavy-duty trolley, and <strong className="text-white font-semibold">free professional installation</strong>.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 md:gap-4 mt-4 md:mt-6 justify-center md:justify-start">
                <div className="bg-black/20 backdrop-blur px-3 md:px-4 py-1.5 md:py-2 rounded-full text-[11px] md:text-xs font-bold border border-white/10" style={{ color: 'white' }}>
                  💰 Save up to 20%
                </div>
                <div className="bg-black/20 backdrop-blur px-3 md:px-4 py-1.5 md:py-2 rounded-full text-[11px] md:text-xs font-bold border border-white/10" style={{ color: 'white' }}>
                  🔧 Free Installation
                </div>
                <div className="bg-black/20 backdrop-blur px-3 md:px-4 py-1.5 md:py-2 rounded-full text-[11px] md:text-xs font-bold border border-white/10" style={{ color: 'white' }}>
                  📦 Complete Package
                </div>
              </div>
            </div>

            {/* Empty space for image bleed in desktop */}
            <div className="hidden md:block w-1/3"></div>
          </div>
        </div>

        {/* Full Cover Image with Responsive Overlays */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Image
            src="/images/products/combo_hero_v10.jpg"
            alt="Premium Inverter and Battery Combo"
            fill
            className="object-cover object-center md:object-right transition-transform duration-1000 hover:scale-[1.03]"
            priority
          />
          {/* Mobile: top-to-bottom gradient for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#1c665d]/95 via-[#1c665d]/70 to-[#1c665d]/40 md:hidden"></div>
          {/* Desktop: left-to-right gradient for side text layout */}
          <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-[#1c665d] via-[#1c665d]/90 via-[40%] to-transparent"></div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container-wide py-12">
        <div className="text-center mb-12">
          <h2 className="section-title" style={{ color: '#0B3C5D' }}>Best Value Combo Deals</h2>
          <p className="section-subtitle" style={{ color: '#4B5563' }}>
            Get complete power backup solutions at unbeatable prices. All combos include
            free delivery, installation, and extended warranty.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} productType="combo" />
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 section-cta section-cta-purple rounded-3xl">
          <h2 className="section-cta-title">Need a Custom Combo?</h2>
          <p className="section-cta-text">
            Let us create a perfect power backup package based on your requirements.
            Free consultation and site visit!
          </p>
          <Link href="/contact" className="bg-white hover:bg-gray-50 text-brand-orange px-8 py-4 rounded-xl font-black transition-all duration-300 shadow-xl hover:-translate-y-1 hover:shadow-2xl flex items-center justify-center gap-2 max-w-xs mx-auto">
            📞 Get Custom Quote
          </Link>
        </div>
      </div>
    </div>
  );
}
