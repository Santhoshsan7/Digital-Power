"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function FeaturedProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch('/api/products?limit=8');
                const data = await res.json();
                if (data.success) {
                    setProducts(data.products);
                }
            } catch (error) {
                console.error("Failed to fetch featured products:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    if (loading) return <div className="py-24 text-center animate-pulse font-black text-brand-navy lowercase tracking-widest px-8">Syncing latest products...</div>;
    
    // Fallback if no products in DB yet
    if (products.length === 0) return null;

    const featuredProducts = products;

    return (
        <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-7xl mx-auto px-6 md:px-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
                    <div className="md:text-left">
                        <span className="inline-block bg-brand-orange/10 text-brand-orange text-[10px] font-black px-4 py-2 rounded-full mb-4 uppercase tracking-[2px]">
                            Top Rated Products
                        </span>
                        <h2 className="text-3xl md:text-5xl font-black text-brand-navy tracking-tight">
                            Featured <span className="text-brand-orange">Products</span>
                        </h2>
                        <p className="text-gray-500 mt-3 text-lg font-medium max-w-lg">
                            Discover our best-selling inverters, batteries, and combo packages
                        </p>
                    </div>
                    <Link
                        href="/inverter"
                        className="btn-secondary group/all"
                    >
                        View Collection
                        <svg className="w-4 h-4 group-hover/all:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {featuredProducts.map((product, index) => (
                        <div
                            key={product.id}
                            className="group card-glass overflow-hidden flex flex-col h-full p-0!"
                        >
                            {/* Product Image Section - Fixed Height */}
                            <div className="relative h-48 bg-gray-50/50 p-6 flex-shrink-0 flex items-center justify-center">
                                {/* Discount Badge */}
                                <span className="absolute top-4 left-4 z-10 bg-brand-orange text-white text-[10px] font-black px-3 py-1 rounded-full shadow-lg shadow-brand-orange/20">
                                    {product.discount}
                                </span>

                                {/* Warranty Badge */}
                                {product.warranty && (
                                    <span className="absolute top-4 right-4 z-10 bg-green-600 text-white text-[10px] font-black px-3 py-1 rounded-full shadow-lg shadow-green-600/20">
                                        {product.warranty}
                                    </span>
                                )}

                                {/* Product Image */}
                                <div className="relative w-full h-full">
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        fill
                                        className="object-contain group-hover:scale-110 transition-transform duration-700"
                                    />
                                </div>
                            </div>

                            {/* Product Details - Flex Grow */}
                            <div className="p-6 flex flex-col flex-grow">
                                {/* Brand */}
                                <span className="text-[10px] font-black text-brand-orange uppercase tracking-[2px] mb-2">
                                    {product.brand}
                                </span>

                                {/* Product Name - Fixed Height */}
                                <h3 className="font-bold text-brand-navy text-base mb-3 line-clamp-2 min-h-[48px] group-hover:text-brand-orange transition-colors duration-300">
                                    {product.shortName || product.name}
                                </h3>

                                {/* Star Rating */}
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="flex items-center gap-0.5">
                                        {[...Array(5)].map((_, i) => (
                                            <svg
                                                key={i}
                                                className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-200 fill-gray-200"}`}
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        ))}
                                    </div>
                                    <span className="text-gray-400 text-xs font-bold leading-none">({product.reviews})</span>
                                </div>

                                {/* Price Section */}
                                <div className="flex items-baseline gap-3 mb-6">
                                    <span className="text-2xl font-black text-brand-navy">
                                        ₹{product.salePrice.toLocaleString()}
                                    </span>
                                    <span className="text-xs text-gray-400 line-through font-bold">
                                        ₹{product.originalPrice.toLocaleString()}
                                    </span>
                                </div>

                                {/* Spacer to push button down */}
                                <div className="flex-grow"></div>

                                {/* Add to Cart Button - Always at bottom */}
                                <button className="w-full bg-gray-50 hover:bg-brand-orange text-brand-navy hover:text-white py-3.5 rounded-2xl font-black text-sm transition-all duration-500 flex items-center justify-center gap-3 group/btn shadow-sm hover:shadow-xl hover:shadow-brand-orange/30">
                                    <svg className="w-5 h-5 transition-transform duration-500 group-hover/btn:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                    </svg>
                                    <span>Add to Cart</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Promotion Banner */}
                <div className="mt-20 bg-brand-navy rounded-[40px] p-10 md:p-14 text-white overflow-hidden relative shadow-2xl group">
                    {/* Background Decorations */}
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-orange/10 to-transparent pointer-events-none"></div>
                    <div className="absolute -right-20 -top-20 w-80 h-80 bg-brand-orange/10 rounded-full blur-[100px] pointer-events-none group-hover:scale-150 transition-transform duration-1000"></div>

                    <div className="relative flex flex-col md:flex-row items-center justify-between gap-10">
                        <div className="text-center md:text-left">
                            <span className="inline-block bg-brand-orange text-white font-black text-[10px] px-4 py-2 rounded-full mb-6 uppercase tracking-[2px] shadow-lg shadow-brand-orange/30">
                                Limited Time Exclusive
                            </span>
                            <h3 className="text-3xl md:text-5xl font-black mb-4 tracking-tight">
                                Special Combo <span className="text-brand-orange">Deals!</span>
                            </h3>
                            <p className="text-gray-400 text-lg font-medium max-w-lg leading-relaxed">
                                Get Inverter + Battery combo with FREE installation and delivery. Save up to ₹5,000 on select packages today!
                            </p>
                        </div>
                        <Link
                            href="/combo-offer"
                            className="flex-shrink-0 btn-primary group/btn-p"
                        >
                            Explore Deals
                            <svg className="w-5 h-5 group-hover/btn-p:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Section Divider */}
            <div className="max-w-7xl mx-auto px-6 md:px-8">
                <div className="mt-16 border-t-2 border-gray-100"></div>
            </div>
        </section>
    );
}
