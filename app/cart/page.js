"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useCart } from "@/lib/CartContext";
import CarouselModal from "@/components/ui/CarouselModal";
import CartHeroSlider from "@/components/ui/CartHeroSlider";

export default function CartPage() {
    const { cartItems, setCartItems, getCartTotal, removeFromCart, updateQuantity, promoDiscount, applyDiscount } = useCart();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [promoCode, setPromoCode] = useState('');
    const [promoError, setPromoError] = useState("");

    // --- Calculate Savings ---
    const itemTotal = getCartTotal();
    const originalTotal = cartItems.reduce((total, item) => total + ((item.originalPrice || item.salePrice) * item.quantity), 0);
    const baseSavings = originalTotal - itemTotal;
    const totalSavings = baseSavings + promoDiscount;
    // --- Calculate Savings ---

    const getProductLink = (prod) => {
        if (!prod) return '/';
        const cat = prod.category?.toLowerCase();
        if (cat === 'inverter') return `/inverter/product/${prod.id}`;
        if (cat === 'battery') return `/batteries/product/${prod.id}`;
        if (cat === 'online ups') return `/online-ups/product/${prod.id}`;
        if (cat === 'combo') return `/combo-offer/product/${prod.id}`;
        return `/inverter/product/${prod.id}`;
    };

    const handleApplyPromo = () => {
        if (promoCode.trim().toUpperCase() === 'SAVE300' || promoCode.trim().length > 0) {
            applyDiscount(300);
            alert("Promo code applied successfully! ₹300 saved.");
        } else {
            alert("Please enter a valid promo code.");
        }
    };

    // Empty cart state
    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50">
                {/* Header */}
                <section className="relative py-16 md:py-24 md:min-h-[500px] overflow-hidden" style={{ background: 'linear-gradient(135deg, #0B3C5D 0%, #0a3350 50%, #082840 100%)' }}>
                    {/* Hero Slider (Right Side - Full Height) */}
                    <div className="hidden md:block absolute right-0 top-0 bottom-0 w-[55%] h-full">
                        <CartHeroSlider />
                    </div>

                    <div className="container-wide relative z-10">
                        <div className="md:w-1/2 mt-12 md:mt-16">
                            <nav className="flex items-center text-sm font-medium mb-4">
                                <Link href="/" className="text-white hover:text-brand-orange transition-colors">Home</Link>
                                <span className="mx-2 text-white/50">›</span>
                                <span className="font-semibold" style={{ color: '#F57C00' }}>Shopping Cart</span>
                            </nav>
                            <h1 className="text-3xl md:text-5xl font-extrabold text-white flex items-center gap-3 mb-6">
                                <span>🛒</span>
                                Shopping Cart
                            </h1>
                            <p className="text-white/80 text-lg max-w-lg mb-8">
                                Review your selected items and proceed to checkout. We ensure a secure and seamless shopping experience.
                            </p>

                            {/* Related Content / Benefits */}
                            <div className="flex flex-wrap gap-6 text-white/90 font-medium">
                                <div className="flex items-center gap-2">
                                    <span className="p-1.5 bg-white/10 rounded-full">✅</span>
                                    <span>Easy Ordering</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="p-1.5 bg-white/10 rounded-full">🚚</span>
                                    <span>Fast Delivery</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="p-1.5 bg-white/10 rounded-full">🛡️</span>
                                    <span>Warranty Assured</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Empty Cart */}
                <section className="py-20">
                    <div className="container-narrow">
                        <div className="bg-white rounded-3xl shadow-xl p-12 text-center">
                            <div className="empty-state-icon">🛒</div>
                            <h2 className="empty-state-title">Your Cart is Empty</h2>
                            <p className="empty-state-text">
                                Looks like you haven't added any products to your cart yet.
                                Browse our collection and find the perfect power solution for your home.
                            </p>
                            <Link href="/inverter" className="btn-primary inline-flex">
                                🔍 Browse Products
                            </Link>

                            {/* Quick Links */}
                            <div className="mt-10 pt-8 border-t border-gray-100">
                                <p className="text-gray-500 text-sm mb-4">Popular Categories</p>
                                <div className="flex flex-wrap justify-center gap-3">
                                    {[
                                        { name: "Inverters", href: "/inverter", icon: "⚡" },
                                        { name: "Batteries", href: "/batteries", icon: "🔋" },
                                        { name: "Online UPS", href: "/online-ups", icon: "🔌" },
                                        { name: "Combo Offers", href: "/combo-offer", icon: "🎁" },
                                    ].map((cat) => (
                                        <Link
                                            key={cat.name}
                                            href={cat.href}
                                            className="flex items-center gap-2 bg-gray-100 hover:bg-brand-orange/10 text-gray-700 hover:text-brand-orange px-4 py-2 rounded-full text-sm font-medium transition-colors"
                                        >
                                            <span>{cat.icon}</span>
                                            {cat.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Trust Badges */}
                        <div className="mt-8 flex flex-wrap justify-center gap-6 text-gray-500 text-sm">
                            {[
                                "✅ Genuine Products",
                                "🚚 Free Delivery",
                                "🔧 Free Installation",
                            ].map((badge, i) => (
                                <span key={i}>{badge}</span>
                            ))}
                        </div>
                    </div>
                </section>
                <CarouselModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            </div>
        );
    }

    // Cart with items
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <section className="relative py-16 md:py-24 md:min-h-[500px] overflow-hidden" style={{ background: 'linear-gradient(135deg, #0B3C5D 0%, #0a3350 50%, #082840 100%)' }}>
                {/* Hero Slider (Right Side - Full Height) */}
                <div className="hidden md:block absolute right-0 top-0 bottom-0 w-[55%] h-full">
                    <CartHeroSlider />
                </div>

                <div className="container-wide relative z-10">
                    <div className="md:w-1/2 mt-12 md:mt-16">
                        <nav className="flex items-center text-sm font-medium mb-4">
                            <Link href="/" className="text-white hover:text-brand-orange transition-colors">Home</Link>
                            <span className="mx-2 text-white/50">›</span>
                            <span className="font-semibold" style={{ color: '#F57C00' }}>Shopping Cart</span>
                        </nav>
                        <h1 className="text-3xl md:text-5xl font-extrabold text-white flex items-center gap-3 mb-6">
                            <span>🛒</span>
                            Shopping Cart

                        </h1>

                        {/* Related Content / Benefits */}
                        <div className="flex flex-wrap gap-6 text-white/90 font-medium">
                            <div className="flex items-center gap-2">
                                <span className="p-1.5 bg-white/10 rounded-full">✅</span>
                                <span>Easy Ordering</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="p-1.5 bg-white/10 rounded-full">🚚</span>
                                <span>Fast Delivery</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="p-1.5 bg-white/10 rounded-full">🛡️</span>
                                <span>Warranty Assured</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Cart Content */}
            <section className="py-12">
                <div className="container-wide">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Cart Items */}
                        <div className="lg:col-span-2 space-y-4">
                            {cartItems.map((item) => (
                                <div key={item.id} className="bg-white p-4 rounded-xl border border-gray-100 flex flex-col sm:flex-row gap-4 items-center shadow-sm hover:shadow-md transition-all">
                                    {/* Image */}
                                    <Link href={getProductLink(item)} className="relative w-24 h-24 bg-gray-50 rounded-lg shrink-0 flex items-center justify-center hover:opacity-80 transition-opacity">
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            fill
                                            className="object-contain p-2"
                                        />
                                    </Link>

                                    {/* Info */}
                                    <div className="flex-1 text-center sm:text-left w-full">
                                        <Link href={getProductLink(item)}>
                                            <h3 className="font-bold text-brand-navy line-clamp-2 hover:text-brand-orange transition-colors">{item.name}</h3>
                                        </Link>
                                        <p className="text-xs text-gray-500 mb-2">{item.brand}</p>
                                        <div className="font-bold text-brand-orange text-lg">
                                            ₹{item.salePrice?.toLocaleString()}
                                            {item.originalPrice && (
                                                <span className="text-xs text-gray-400 line-through ml-2 font-normal">
                                                    ₹{item.originalPrice?.toLocaleString()}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center gap-4">
                                        {/* Quantity */}
                                        <div className="flex items-center gap-3 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-brand-orange font-bold"
                                                disabled={item.quantity <= 1}
                                            >
                                                −
                                            </button>
                                            <span className="w-4 text-center font-semibold text-gray-700">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-brand-orange font-bold"
                                            >
                                                +
                                            </button>
                                        </div>

                                        {/* Remove */}
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-lg transition-all"
                                            title="Remove Item"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm sticky top-24">
                                <h3 className="text-xl font-bold text-brand-navy mb-6">Order Summary</h3>

                                {/* Summary Details */}
                                <div className="space-y-4 mb-6">
                                    <div className="flex justify-between text-gray-600">
                                        <span>Subtotal</span>
                                        <span className="font-semibold">₹{getCartTotal().toLocaleString('en-IN')}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>GST (18%)</span>
                                        <span className="font-semibold">₹{(getCartTotal() * 0.18).toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>Delivery</span>
                                        <span className="text-green-600 font-medium">FREE</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>Installation</span>
                                        <span className="text-green-600 font-medium">FREE</span>
                                    </div>

                                    {promoDiscount > 0 && (
                                        <div className="flex justify-between text-brand-orange font-medium animate-pulse">
                                            <span>Promo Discount</span>
                                            <span>- ₹{promoDiscount.toLocaleString('en-IN')}</span>
                                        </div>
                                    )}

                                    {totalSavings > 0 && (
                                        <div className="flex justify-between text-green-600 font-bold bg-green-50 px-3 py-2 rounded-lg mt-2">
                                            <span>Total Savings</span>
                                            <span>₹{totalSavings.toLocaleString('en-IN')}</span>
                                        </div>
                                    )}

                                    <hr className="border-gray-100" />
                                    <div className="flex justify-between text-lg font-bold text-brand-navy">
                                        <span>Total</span>
                                        <span>₹{Math.max(0, Math.round(getCartTotal() * 1.18) - promoDiscount).toLocaleString('en-IN')}</span>
                                    </div>
                                </div>

                                {/* Checkout Button */}
                                <Link href="/order-confirmation" className="w-full block text-center bg-brand-orange text-white py-4 rounded-xl font-bold text-base shadow-lg shadow-brand-orange/30 hover:bg-orange-600 hover:scale-[1.02] transition-all duration-300">
                                    Proceed to Checkout
                                </Link>

                                {/* Trust Badges */}
                                <div className="mt-6 text-center">
                                    <div className="flex justify-center gap-4 text-gray-400 text-xs">
                                        <span>✅ Genuine Products</span>
                                        <span>📞 Expert Support</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <CarouselModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
}
