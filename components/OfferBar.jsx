"use client";
import { useState, useEffect } from "react";

export default function OfferBar() {
    const [currentOffer, setCurrentOffer] = useState(0);

    const offers = [
        { icon: "🎉", text: "MEGA SALE: Get up to 40% OFF on all Inverters!", highlight: "40% OFF" },
        { icon: "🔋", text: "Free Installation on all Battery purchases!", highlight: "FREE" },
        { icon: "🚚", text: "Free Delivery across Chennai - Order Now!", highlight: "Chennai" },
        { icon: "⚡", text: "Exchange your old battery & get ₹5000 OFF!", highlight: "₹5000" },
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentOffer((prev) => (prev + 1) % offers.length);
        }, 4000);
        return () => clearInterval(timer);
    }, [offers.length]);

    return (
        <div className="relative overflow-hidden bg-brand-navy text-white">

            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="flex items-center justify-between h-10 md:h-11">
                    {/* Offers Carousel */}
                    <div className="flex-1 flex items-center justify-center gap-2 text-xs md:text-sm font-medium overflow-hidden">
                        <div
                            key={currentOffer}
                            className="flex items-center gap-2 animate-fadeIn"
                        >
                            <span className="text-lg">{offers[currentOffer].icon}</span>
                            <span>
                                {offers[currentOffer].text.split(offers[currentOffer].highlight)[0]}
                                <span className="font-bold text-brand-orange bg-white/10 px-1.5 py-0.5 rounded mx-1">
                                    {offers[currentOffer].highlight}
                                </span>
                                {offers[currentOffer].text.split(offers[currentOffer].highlight)[1]}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
