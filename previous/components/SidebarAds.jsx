"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const ADS = [
    {
        id: 1,
        image: "/images/ads/ups_sidebar_ad_exide.png",
        fallback: "https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?q=80&w=300&h=400&auto=format&fit=crop",
        title: "Exide Power",
        desc: "Unleash Endless Energy"
    },
    {
        id: 2,
        image: "/images/ads/inverter_ad_v2.png", // Updated to v2 that we have
        fallback: "https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?q=80&w=300&h=400&auto=format&fit=crop",
        title: "Premium Inverters",
        desc: "Power your home"
    },
    {
        id: 3,
        image: "/images/ads/battery_ad.png",
        fallback: "https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?q=80&w=300&h=400&auto=format&fit=crop",
        title: "Long Lasting Batteries",
        desc: "5 Year Warranty"
    },
    {
        id: 4,
        image: "https://images.unsplash.com/photo-1590959651373-a3db0f38a961?q=80&w=300&h=400&auto=format&fit=crop",
        title: "Online UPS",
        desc: "Zero Downtime"
    },
    {
        id: 5,
        image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=300&h=400&auto=format&fit=crop",
        title: "Solar Solutions",
        desc: "Go Green Today"
    }
];

export default function SidebarAds() {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % ADS.length);
        }, 4000); // Change slide every 4 seconds
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="w-full bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden sticky top-24">
            <div className="relative aspect-[3/4] w-full">
                {ADS.map((ad, index) => (
                    <div
                        key={ad.id}
                        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
                            }`}
                    >
                        {/* Image */}
                        <Image
                            src={ad.image}
                            alt={ad.title}
                            fill
                            className="object-cover"
                            onError={(e) => {
                                if (ad.fallback) e.target.src = ad.fallback;
                            }}
                        />

                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                        {/* Text Content */}
                        <div className="absolute bottom-0 left-0 right-0 p-6 text-white text-center transform transition-transform duration-700">
                            <span className="inline-block px-3 py-1 bg-brand-orange text-xs font-bold rounded-full mb-2 uppercase tracking-wider">
                                Featured
                            </span>
                            <h3 className="text-xl font-bold mb-1 drop-shadow-md">{ad.title}</h3>
                            <p className="text-sm opacity-90 drop-shadow-sm">{ad.desc}</p>
                        </div>
                    </div>
                ))}

                {/* Indicators */}
                <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-20">
                    {ADS.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentSlide ? "bg-brand-orange w-4" : "bg-white/50 hover:bg-white"
                                }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
