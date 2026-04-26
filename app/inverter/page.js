"use client";
import Image from "next/image";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { inverterProducts } from "@/data/products";
import { useState } from "react";
import PromotionBanner from "@/components/PromotionBanner";

export default function InverterPage() {
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [sortBy, setSortBy] = useState("featured");

  const products = inverterProducts;
  const brands = ["All", "Microtek", "Massimo", "Luminous", "Solar Inverter"];

  // Filter products by brand
  let filteredProducts = products;
  if (selectedBrand !== "All") {
    filteredProducts = products.filter(p => p.brand === selectedBrand || p.type === selectedBrand);
  }

  // Sort products
  if (sortBy === "price-low") {
    filteredProducts = [...filteredProducts].sort((a, b) => a.salePrice - b.salePrice);
  } else if (sortBy === "price-high") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.salePrice - a.salePrice);
  } else if (sortBy === "rating") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.rating - a.rating);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <section className="relative py-8 md:py-10 overflow-hidden" style={{ background: '#0B3C5D' }}>
        {/* Electric Background Effect using SVG and Gradients */}
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <filter id="glow">
              <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            {/* Lightning veins */}
            <path d="M-10,50 Q150,120 300,50 T600,100 T900,20 T1300,80" stroke="#4DA8DA" strokeWidth="0.5" fill="none" opacity="0.6" />
            <path d="M-10,120 Q200,80 400,150 T800,90 T1200,140" stroke="#4DA8DA" strokeWidth="0.5" fill="none" opacity="0.4" />
            <path d="M400,-10 Q500,100 600,200" stroke="#4DA8DA" strokeWidth="1" fill="none" opacity="0.3" filter="url(#glow)" />
          </svg>
          <div className="absolute inset-0" style={{
            background: 'radial-gradient(circle at 75% 50%, rgba(77, 168, 218, 0.2) 0%, transparent 60%)'
          }}></div>
        </div>

        <div className="container-wide relative">
          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center gap-2 text-xs font-medium">
            <Link href="/" className="text-gray-400 hover:text-white transition-colors">Home</Link>
            <span className="text-gray-600">›</span>
            <span className="text-brand-orange">Inverters</span>
          </nav>

          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-8 md:gap-12 text-center md:text-left">
            <div className="flex-1 max-w-2xl">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-4 flex items-center justify-center md:justify-start gap-3 md:gap-4 tracking-tight drop-shadow-md">
                <span className="text-brand-orange animate-pulse">⚡</span>
                Inverters
              </h1>
              <p className="text-gray-100 text-base md:text-lg lg:text-xl leading-relaxed font-semibold mb-4 drop-shadow-sm">
                Shop premium inverters from Microtek, Luminous, Massimo. Pure Sine Wave, DG Compatible & Solar options.
              </p>

              {/* SEO Content Text */}
              <div className="text-gray-300 text-sm space-y-2 hidden lg:block max-w-lg">
                <p>
                  Discover the best <strong className="text-white">Pure Sine Wave Inverters</strong> for your home. Our energy-efficient solutions ensure seamless performance for sensitive appliances.
                </p>
                <p>
                  Built for reliability with <strong className="text-white">assured warranty and free professional installation</strong> across Chennai.
                </p>
              </div>
            </div>

            {/* Space for the absolute image */}
            <div className="hidden md:block w-1/3"></div>
          </div>
        </div>

        {/* Full Cover Hero Image with Responsive Overlays */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Image
            src="/images/products/inverter-hero-v3.png"
            alt="Premium Inverters and Batteries"
            fill
            className="object-cover object-center md:object-right transition-transform duration-1000 hover:scale-[1.03]"
            priority
          />
          {/* Mobile: top-to-bottom gradient for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B3C5D]/95 via-[#0B3C5D]/70 to-[#0B3C5D]/40 md:hidden"></div>
          {/* Desktop: left-to-right gradient for side text layout */}
          <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-[#0B3C5D] via-[#0B3C5D]/90 via-[40%] to-transparent"></div>
        </div>
      </section>

      {/* Brand Filter Bar */}
      <section className="filter-bar border-b border-gray-200 relative z-40" style={{ background: '#ffffff', opacity: 1 }}>
        <div className="container-wide">
          <div className="flex flex-nowrap items-center justify-between gap-4 py-4 overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="filter-label whitespace-nowrap font-medium text-gray-700">Filter by Brand:</span>
              <div className="flex items-center gap-1.5 md:gap-2">
                {brands.map((brand) => (
                  <button
                    key={brand}
                    onClick={() => setSelectedBrand(brand)}
                    className={`px-3 py-1 md:px-4 md:py-1.5 rounded-full text-xs md:text-sm font-medium transition-all whitespace-nowrap border ${selectedBrand === brand
                      ? "bg-brand-navy text-white border-brand-navy shadow-md"
                      : "bg-white text-gray-600 border-gray-200 hover:border-brand-orange hover:text-brand-orange"
                      }`}
                  >
                    {brand}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 flex-shrink-0 ml-auto pl-4 border-l border-gray-200">
              <span className="filter-label whitespace-nowrap font-medium text-gray-700">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="py-1.5 pl-3 pr-8 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange/20 cursor-pointer bg-white"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>
      </section >

      {/* Main Content */}
      < div className="container-wide py-8 md:py-12 relative z-10" >
        {/* Results Bar */}
        < div className="flex justify-start items-center mb-6" >
          <p className="text-gray-600">
            Showing <span className="font-bold text-brand-navy">{filteredProducts.length}</span> inverters
            {selectedBrand !== "All" && (
              <span className="text-brand-orange ml-2">• {selectedBrand}</span>
            )}
          </p>
        </div >

        {/* Products Grid */}
        < div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6" >
          {
            filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} productType="inverter" />
            ))
          }
        </div >

        {/* No Results */}
        {
          filteredProducts.length === 0 && (
            <div className="empty-state bg-white rounded-2xl p-8 text-center border border-gray-100 shadow-sm">
              <div className="empty-state-icon mb-4 flex justify-center">
                {selectedBrand !== "All" ? (
                  <div className="relative w-64 h-64 mx-auto">
                    <Image
                      src="/images/man-in-box-v2.png"
                      alt="No Stock Available"
                      fill
                      className="object-contain opacity-90"
                    />
                  </div>
                ) : (
                  <span className="text-4xl">🔍</span>
                )}
              </div>
              <h3 className="empty-state-title text-xl font-bold text-brand-navy mb-2">
                {selectedBrand !== "All"
                  ? `${selectedBrand} Products Are Currently Out of Stock`
                  : "No inverters found"}
              </h3>
              <p className="empty-state-text text-gray-500 mb-6 max-w-md mx-auto">
                {selectedBrand !== "All"
                  ? `We're restocking soon! Check back later or explore other premium brands.`
                  : "Try adjusting your filters or search criteria to find what you're looking for."}
              </p>
              <button
                onClick={() => setSelectedBrand("All")}
                className="bg-brand-navy hover:bg-brand-orange text-white px-6 py-3 rounded-xl font-bold transition-colors duration-300"
              >
                Show All Inverters
              </button>
            </div>
          )
        }
      </div >

      {/* Info Banner */}
      < section className="section-info-banner-light" >
        <div className="container-wide">
          <div className="info-grid">
            {[
              { icon: "🚚", title: "Free Delivery", desc: "Across Chennai" },
              { icon: "🔧", title: "Free Installation", desc: "By Expert Technicians" },
              { icon: "🛡️", title: "Warranty", desc: "Up to 3 Years" },
              { icon: "💬", title: "24/7 Support", desc: "Always Available" },
            ].map((item, i) => (
              <div key={i} className="info-item">
                <div className="info-item-icon">{item.icon}</div>
                <h4 className="info-item-title">{item.title}</h4>
                <p className="info-item-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section >
    </div >
  );
}
