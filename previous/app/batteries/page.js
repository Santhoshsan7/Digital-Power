"use client";
import Image from "next/image";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { batteryProducts } from "@/data/products";
import { useState } from "react";


export default function BatteriesPage() {
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [sortBy, setSortBy] = useState("featured");

  const products = batteryProducts;
  const brands = ["All", "Microtek", "Luminous", "Exide", "Eastman", "Massimo", "Amaron"];

  // Filter products by brand
  let filteredProducts = products;
  if (selectedBrand !== "All") {
    filteredProducts = products.filter(p => p.brand === selectedBrand);
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
      <section className="py-8 md:py-10 relative overflow-hidden" style={{ background: '#15803d' }}>
        <div className="container-wide relative z-10">
          {/* Breadcrumb */}
          <nav className="section-breadcrumb mb-6">
            <Link href="/" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Home</Link>
            <span className="mx-2" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>›</span>
            <span className="active" style={{ color: '#F57C00' }}>Batteries</span>
          </nav>

          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-8 md:gap-12 text-center md:text-left">
            <div className="flex-1 max-w-2xl">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-4 flex items-center justify-center md:justify-start gap-3 md:gap-4 tracking-tight drop-shadow-md">
                <span className="text-3xl">🔋</span>
                Batteries
              </h1>
              <p className="text-white text-base md:text-lg lg:text-xl leading-relaxed font-semibold mb-4 drop-shadow-sm">
                Long-lasting tall tubular and flat plate batteries from top brands. All batteries come with up to 5 years warranty.
              </p>

              {/* SEO Content Text */}
              <div className="text-white/80 text-sm space-y-2 hidden lg:block max-w-lg">
                <p>
                  Explore our premium range of <strong className="text-white">Tall Tubular and Flat Plate Inverter Batteries</strong> designed for deep discharge recovery and ultra-low maintenance.
                </p>
                <p>
                  We stock factory-fresh <strong className="text-white">Exide, Luminous, Amaron, and Microtek batteries</strong> with free doorstep delivery and installation across Chennai.
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
            src="/images/battery-hero-v2.png"
            alt="Premium Inverter Battery"
            fill
            className="object-cover object-center md:object-right transition-transform duration-1000 hover:scale-[1.03]"
            priority
          />
          {/* Mobile: top-to-bottom gradient for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#15803d]/95 via-[#15803d]/70 to-[#15803d]/40 md:hidden"></div>
          {/* Desktop: left-to-right gradient for side text layout */}
          <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-[#15803d] via-[#15803d]/90 via-[40%] to-transparent"></div>
        </div>
      </section >

      {/* Brand Filter Bar */}
      <section className="filter-bar border-b border-gray-200 relative z-40 shadow-sm" style={{ background: '#ffffff', opacity: 1 }}>
        <div className="container-wide bg-white">
          <div className="flex flex-nowrap items-center justify-between gap-4 py-4 overflow-x-auto no-scrollbar bg-white">
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="filter-label whitespace-nowrap font-medium text-gray-700">Filter by Brand:</span>
              <div className="flex items-center gap-1.5 md:gap-2">
                {brands.map((brand) => (
                  <button
                    key={brand}
                    onClick={() => setSelectedBrand(brand)}
                    className={`px-3 py-1 md:px-4 md:py-1.5 rounded-full text-xs md:text-sm font-medium transition-all whitespace-nowrap border ${selectedBrand === brand
                      ? "bg-green-600 text-white border-green-600 shadow-md"
                      : "bg-white text-gray-600 border-gray-200 hover:border-green-600 hover:text-green-600"
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
                className="py-1.5 pl-3 pr-8 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600/20 cursor-pointer bg-white"
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
        {/* Sort & Results Bar */}
        < div className="flex justify-start items-center mb-6" >
          <p className="text-gray-600">
            Showing <span className="font-bold text-brand-navy">{filteredProducts.length}</span> batteries
            {selectedBrand !== "All" && (
              <span className="text-green-600 ml-2">• {selectedBrand}</span>
            )}
          </p>
        </div >

        {/* Products Grid */}
        < div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6" >
          {
            filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} productType="batteries" />
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
                  : "No batteries found"}
              </h3>
              <p className="empty-state-text text-gray-500 mb-6 max-w-md mx-auto">
                {selectedBrand !== "All"
                  ? `We're restocking ${selectedBrand} products soon! Check back later or explore other premium brands.`
                  : "Try selecting a different brand or check back later."}
              </p>
              <button onClick={() => setSelectedBrand("All")} className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-bold transition-colors duration-300">
                Show All Batteries
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
              { icon: "🛡️", title: "5 Year Warranty", desc: "On Select Models" },
              { icon: "🔄", title: "Exchange Offer", desc: "Up to ₹5000 Off" },
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
