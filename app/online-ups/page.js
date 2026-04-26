"use client";
import Image from "next/image";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { upsProducts } from "@/data/products";
import PromotionBanner from "@/components/PromotionBanner";
import SidebarOffer from "@/components/SidebarOffer";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

function OnlineUPSContent() {
  const searchParams = useSearchParams();
  const initialBrand = searchParams.get("brand");

  const getBrandFromParam = (param) => {
    if (!param) return "All";
    return param;
  };

  const [selectedBrand, setSelectedBrand] = useState(getBrandFromParam(initialBrand));
  const [sortBy, setSortBy] = useState("featured");

  const products = upsProducts;
  const brands = ["All", "APC", "Digital", "Luminous"];

  // Sync state when URL updates
  useEffect(() => {
    const brandParam = searchParams.get("brand");
    setSelectedBrand(getBrandFromParam(brandParam));
  }, [searchParams]);

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
      {/* Page Header */}
      <section className="section-hero relative py-10 md:py-14 flex items-center justify-center overflow-hidden">
        {/* Animated CSS Background - Unique Design */}
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950">
          {/* Grid Pattern */}
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(rgba(59,130,246,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.3) 1px, transparent 1px)', backgroundSize: '60px 60px' }}></div>

          {/* Floating Orbs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-screen filter blur-[120px] opacity-20 animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-400 rounded-full mix-blend-screen filter blur-[100px] opacity-15 animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-600 rounded-full mix-blend-screen filter blur-[150px] opacity-10 animate-pulse" style={{ animationDelay: '2s' }}></div>

          {/* Accent Lines */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-400/40 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent"></div>

          {/* Electric bolt decorations */}
          <div className="absolute top-12 right-20 text-8xl opacity-5 select-none">⚡</div>
          <div className="absolute bottom-16 left-16 text-6xl opacity-5 select-none rotate-12">⚡</div>
        </div>

        <div className="container-wide relative z-20 text-center">
          <nav className="section-breadcrumb justify-center mb-6">
            <Link href="/" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Home</Link>
            <span className="mx-2" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>›</span>
            <span className="active" style={{ color: '#F57C00' }}>Online UPS</span>
          </nav>

          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 drop-shadow-lg tracking-tight">
              ⚡ Premium Online UPS Systems
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed font-light mb-8">
              Professional grade online UPS with <span className="text-brand-orange font-bold">zero transfer time</span>.
              The ultimate power protection for critical servers, medical equipment, and sensitive electronics.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <button onClick={() => document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-3 bg-brand-orange text-white font-bold rounded-full hover:bg-orange-600 transition-all transform hover:scale-105 shadow-lg flex items-center gap-2">
                View Products <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" /></svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Filter Bar */}
      <section className="filter-bar border-b border-gray-200 relative z-40" style={{ background: '#ffffff', opacity: 1 }}>
        <div className="container-wide">
          <div className="flex flex-nowrap items-center justify-between gap-4 py-4 overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="filter-label whitespace-nowrap font-medium text-gray-700">Filter by Brand:</span>
              <div className="flex items-center gap-2">
                {brands.map((brand) => (
                  <button
                    key={brand}
                    onClick={() => setSelectedBrand(brand)}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap border ${selectedBrand === brand
                      ? "bg-brand-navy text-white border-brand-navy shadow-md"
                      : "bg-white text-gray-600 border-gray-200 hover:border-brand-orange hover:text-brand-orange"
                      }`}
                  >
                    {brand}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 flex-shrink-0 ml-auto">
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
      </section>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row min-h-screen relative z-10">

        {/* Sidebar - Fixed/Sticky Left */}
        <aside className="hidden lg:block lg:w-[320px] flex-shrink-0 relative z-30">
          <SidebarOffer />
        </aside>

        {/* Products Area */}
        <main id="products-section" className="flex-1 bg-gray-50">
          <div className="container-wide py-12 px-4 md:px-8">
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">
                Showing <span className="font-bold text-brand-navy">{filteredProducts.length}</span> UPS systems
                {selectedBrand !== "All" && (
                  <span className="text-brand-orange ml-2">• {selectedBrand}</span>
                )}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} productType="online-ups" />
              ))}
            </div>

            {/* No Results */}
            {filteredProducts.length === 0 && (
              <div className="empty-state bg-white rounded-2xl p-8 text-center border border-gray-100 shadow-sm flex flex-col items-center justify-center">
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
                    <div className="relative w-48 h-48 mx-auto">
                      <Image
                        src="/images/man-looking-in-box.png"
                        alt="Coming Soon"
                        fill
                        className="object-contain"
                      />
                    </div>
                  )}
                </div>
                <h3 className="text-xl font-bold text-brand-navy mb-2">
                  {selectedBrand !== "All"
                    ? `${selectedBrand} Products Are Currently Out of Stock`
                    : "UPS Products Coming Soon"}
                </h3>
                <p className="text-gray-500 mb-6 max-w-md mx-auto">
                  {selectedBrand !== "All"
                    ? `We're restocking ${selectedBrand} products soon! Check back later or explore other premium brands.`
                    : "We're adding new UPS systems shortly. Check back soon or explore our other product categories."}
                </p>
                <button
                  onClick={() => setSelectedBrand("All")}
                  className="bg-brand-orange text-white px-6 py-3 rounded-xl font-bold hover:bg-orange-600 transition-colors duration-300"
                >
                  View All Products
                </button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default function OnlineUPSPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-orange"></div></div>}>
      <OnlineUPSContent />
    </Suspense>
  );
}
