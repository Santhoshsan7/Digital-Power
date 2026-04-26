"use client";
import { useState } from "react";
import Image from "next/image";
import ProductImage from "./ProductImage";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/CartContext";
import { useWishlist } from "@/lib/WishlistContext";

export default function ProductCard({ product, productType = "inverter" }) {
    const { addToCart } = useCart();
    const { toggleWishlist, isInWishlist } = useWishlist();
    const router = useRouter();
    const [imageError, setImageError] = useState(false);

    // Determine the URL path based on product category
    const getProductUrl = () => {
        const category = product.category?.toLowerCase();
        if (category === 'battery') return `/batteries/product/${product.id}`;
        if (category === 'online ups') return `/online-ups/product/${product.id}`;
        if (category === 'combo') return `/combo-offer/product/${product.id}`;
        return `/${productType}/product/${product.id}`;
    };

    const handleWishlistClick = (e) => {
        e.stopPropagation();
        e.preventDefault();
        toggleWishlist(product);
    };

    const inWishlist = isInWishlist(product.id);

    return (
        <div className="group card-glass flex flex-col h-full overflow-hidden p-0!">
            {/* Clickable Product Link */}
            <Link href={getProductUrl()} className="flex-1 flex flex-col">
                {/* Product Image Section - Compact Height */}
                <div className={`relative h-36 md:h-44 ${product.id === 22 ? "p-1" : "p-4"} cursor-pointer flex items-center justify-center border-b border-gray-100`}>

                    {/* Discount Badge */}
                    {product.discount && (
                        <div className="absolute top-0 left-0 bg-brand-orange text-white text-[10px] font-bold px-2 py-1 rounded-br-lg z-10 shadow-sm">
                            {product.discount}
                        </div>
                    )}

                    {/* Wishlist Button */}
                    <button
                        onClick={handleWishlistClick}
                        className={`absolute top-2 right-2 z-20 transition-all transform hover:scale-110 ${inWishlist ? "text-brand-orange" : "text-gray-400 hover:text-red-500"
                            }`}
                    >
                        <svg
                            className="w-6 h-6"
                            fill={inWishlist ? "currentColor" : "none"}
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                        </svg>
                    </button>

                    {/* Product Image */}
                    <div className="relative w-full h-full flex items-center justify-center bg-gray-50">
                        {imageError ? (
                            <div className="text-xs text-gray-400 text-center p-2">
                                <span className="block mb-1">📷</span>
                                Image Not Found
                            </div>
                        ) : (
                            <ProductImage
                                src={product.image || '/images/placeholder.png'}
                                alt={product.name}
                                fill
                                className="object-contain group-hover:scale-105 transition-transform duration-500"
                            />
                        )}
                    </div>
                </div>

                {/* Product Details - Compact Padding */}
                <div className="p-3 flex flex-col flex-1">
                    {/* Brand */}
                    {product.brand && (
                        <div className="text-[10px] font-medium text-gray-500 uppercase tracking-wide mb-1">
                            {product.brand}
                        </div>
                    )}

                    {/* Product Name */}
                    <h3 className="font-bold text-brand-navy text-xs md:text-sm leading-tight mb-2 line-clamp-2 group-hover:text-brand-orange transition-colors min-h-[32px] md:min-h-[40px]" title={product.name}>
                        {product.shortName ? product.shortName : product.name}
                    </h3>

                    {/* Rating - Horizontal Layout */}
                    <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center gap-0.5">
                            {[...Array(5)].map((_, i) => (
                                <svg
                                    key={i}
                                    className={`w-3 h-3 ${i < Math.floor(product.rating || 4) ? "text-yellow-400 fill-yellow-400" : "text-gray-200 fill-gray-200"}`}
                                    stroke="currentColor"
                                    strokeWidth="0.5"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            ))}
                        </div>
                        <span className="text-gray-400 text-[10px] font-bold">({product.reviews || 0})</span>
                    </div>

                    {/* Price Section */}
                    {/* Price Section */}
                    <div className="mt-auto pt-2 border-t border-gray-50">
                        <div className="flex items-baseline gap-2 flex-wrap">
                            <span className="text-lg font-bold text-brand-navy">
                                ₹{product.salePrice?.toLocaleString()}
                            </span>
                            {product.originalPrice && (
                                <span className="text-xs text-gray-400 line-through">
                                    ₹{product.originalPrice?.toLocaleString()}
                                </span>
                            )}
                        </div>
                    </div>

                </div >
            </Link >

            {/* Offer Section Removed */}
        </div >
    );
}
