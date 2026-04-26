"use client";
import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/lib/CartContext";

export default function CartDrawer() {
    const { isCartOpen, setIsCartOpen, cartItems, updateQuantity, removeFromCart, getCartTotal } = useCart();

    // Prevent scrolling when cart is open
    useEffect(() => {
        if (isCartOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isCartOpen]);

    if (!isCartOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
                onClick={() => setIsCartOpen(false)}
            />

            {/* Drawer */}
            <div className="absolute top-0 right-0 bottom-0 w-full md:w-[450px] bg-white shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out z-10">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gray-50/50">
                    <h2 className="text-xl font-black text-brand-navy flex items-center gap-2">
                        <span>🛒</span> Your Cart
                        <span className="text-sm font-bold bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full ml-2">
                            {cartItems.length}
                        </span>
                    </h2>
                    <button
                        onClick={() => setIsCartOpen(false)}
                        className="p-2 text-gray-400 hover:text-brand-orange hover:bg-orange-50 rounded-full transition-colors flex-shrink-0"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {cartItems.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center p-6">
                            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-3xl mb-4">
                                🛒
                            </div>
                            <h3 className="text-lg font-bold text-gray-800 mb-2">Your cart is empty</h3>
                            <p className="text-sm text-gray-500 mb-6">Looks like you haven't added any products yet.</p>
                            <Link
                                href="/inverter"
                                onClick={() => setIsCartOpen(false)}
                                className="btn-primary w-full max-w-[200px] text-center"
                            >
                                Continue Shopping
                            </Link>
                        </div>
                    ) : (
                        cartItems.map((item) => (
                            <div key={item.id} className="group flex gap-4 bg-white border border-gray-100 p-3 rounded-2xl hover:border-orange-200 hover:shadow-md transition-all">
                                {/* Product Image */}
                                <div className="relative w-20 h-20 bg-gray-50 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden">
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        fill
                                        className="object-contain p-2 mix-blend-multiply"
                                    />
                                </div>

                                {/* Product Info */}
                                <div className="flex flex-col flex-1 justify-between py-1">
                                    <div className="flex justify-between items-start gap-2">
                                        <div>
                                            <h4 className="text-sm font-bold text-brand-navy line-clamp-2 leading-tight group-hover:text-brand-orange transition-colors">
                                                {item.name}
                                            </h4>
                                            <p className="text-[11px] text-gray-400 font-medium mt-1">{item.brand}</p>
                                        </div>
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="text-gray-300 hover:text-red-500 transition-colors p-1"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </div>

                                    <div className="flex items-center justify-between mt-3">
                                        <div className="font-bold text-brand-orange">
                                            ₹{item.salePrice?.toLocaleString()}
                                        </div>

                                        {/* Quantity Controls */}
                                        <div className="flex items-center gap-2 bg-gray-50 border border-gray-100 rounded-lg p-1">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                disabled={item.quantity <= 1}
                                                className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-brand-orange hover:bg-white rounded-md transition-all disabled:opacity-50"
                                            >
                                                −
                                            </button>
                                            <span className="text-xs font-bold text-gray-700 w-4 text-center">
                                                {item.quantity}
                                            </span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-brand-orange hover:bg-white rounded-md transition-all"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer / Checkout */}
                {cartItems.length > 0 && (
                    <div className="border-t border-gray-100 bg-white p-4 space-y-4">
                        <div className="flex justify-between items-center text-brand-navy font-bold">
                            <span>Subtotal</span>
                            <span className="text-xl">₹{getCartTotal().toLocaleString()}</span>
                        </div>
                        <p className="text-xs text-gray-500 text-center">Shipping, taxes, and discounts calculated at checkout.</p>

                        <div className="flex gap-3">
                            <Link
                                href="/cart"
                                onClick={() => setIsCartOpen(false)}
                                className="flex-1 py-3 text-center border-2 border-brand-orange text-brand-orange font-bold rounded-xl hover:bg-orange-50 transition-colors"
                            >
                                View Cart
                            </Link>
                            <Link
                                href="/order-confirmation"
                                onClick={() => setIsCartOpen(false)}
                                className="flex-1 py-3 text-center bg-brand-orange text-white font-bold rounded-xl shadow-lg shadow-brand-orange/30 hover:bg-orange-600 hover:-translate-y-0.5 transition-all"
                            >
                                Checkout
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
