"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const PROMOS = {
    inverter: [
        {
            image: "/images/ads/inverter_ad_v2.png",
            actor: "",
            text: "",
            color: "#F57C00",
            showOverlay: false // Hide text since image has it
        }
    ],
    batteries: [
        {
            image: "/images/ads/battery_ad.png",
            actor: "",
            text: "",
            color: "#4ade80", // Amaron Green
            showOverlay: false
        },
        {
            image: "/images/ads/battery_ad_massimo.png",
            actor: "",
            text: "",
            color: "#1e3a8a", // Massimo Blue
            showOverlay: false
        },
        {
            image: "/images/ads/battery_ad_eastman.png",
            actor: "",
            text: "",
            color: "#ca8a04", // Eastman Gold
            showOverlay: false
        },
        {
            image: "/images/ads/battery_ad_exide.png",
            actor: "",
            text: "",
            color: "#dc2626", // Exide Red
            showOverlay: false
        }
    ],
    ups: [
        {
            image: "/images/products/microtek-superpower-1100-v2-front-transparent.png",
            actor: "Microtek",
            text: "Reliable Power",
            color: "#2563eb", // Blue
            showOverlay: true,
            contain: true
        },
        {
            image: "/images/products/luminous-icon-1050-front-transparent.png",
            actor: "Luminous",
            text: "Smart Design",
            color: "#ca8a04", // Gold
            showOverlay: true,
            contain: true
        },
        {
            image: "/images/products/amaron-current-150ah-front-transparent.png",
            actor: "Amaron",
            text: "Long Lasting",
            color: "#16a34a", // Green
            showOverlay: true,
            contain: true
        }
    ],
    default: [
        {
            image: "/images/ads/online_ups_promo.png",
            actor: "",
            text: "",
            color: "#F57C00",
            showOverlay: false
        }
    ]
};

export default function PromotionBanner({ type = "inverter" }) {
    const [index, setIndex] = useState(0);
    const currentPromos = PROMOS[type] || PROMOS.default;
    const currentPromo = currentPromos[index];

    useEffect(() => {
        if (currentPromos.length <= 1) return;
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % currentPromos.length);
        }, 4000);
        return () => clearInterval(timer);
    }, [currentPromos.length]);

    return (
        <div className="relative w-[550px] h-[350px] overflow-hidden rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl group cursor-pointer lg:flex hidden transition-all duration-300 hover:scale-[1.02]">
            {/* Animated Motion Layer */}
            <div className="absolute inset-0 z-0">
                {currentPromo.showOverlay && (
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10" />
                )}

                {/* Spotlight for contained images */}
                {currentPromo.contain && (
                    <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent opacity-50" />
                )}

                <Image
                    src={currentPromo.image}
                    alt="Ad"
                    fill
                    className={`${currentPromo.contain ? 'object-contain p-8 translate-x-16' : 'object-cover'} transition-opacity duration-1000 ease-in-out ${currentPromo.showOverlay && !currentPromo.contain ? 'opacity-60' : 'opacity-100'}`}
                />
            </div>

            {/* Content Layer - Only if overlay is enabled */}
            {currentPromo.showOverlay && (
                <div className="relative z-20 flex flex-col justify-center px-10 py-8 w-full animate-fadeIn">
                    <span className="text-[14px] font-black tracking-[6px] text-white/60 mb-3 flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-red-600 animate-pulse shadow-[0_0_10px_rgba(220,38,38,0.8)]" /> LIVE PROMO
                    </span>
                    <h4 className="text-white font-black text-4xl leading-tight drop-shadow-[0_4px_6px_rgba(0,0,0,0.9)]">
                        {currentPromo.text}
                    </h4>
                    <div className="mt-6 flex items-center gap-3">
                        <div className="w-16 h-[3px] bg-brand-orange shadow-sm" />
                        <span className="text-[14px] text-brand-orange font-black uppercase tracking-[3px] drop-shadow-md">{currentPromo.actor}</span>
                    </div>
                </div>
            )}

            {/* Glossy Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
        </div>
    );
}
