"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const slides = [
    {
        id: 1,
        image: "/images/slider/slide_new_1.png",
        subtitle: "New Arrival",
        title: "Smart Digital Inverter",
        discount: "Launch Offer",
        bg: "bg-blue-600"
    },
    {
        id: 2,
        image: "/images/slider/slide_new_2.png",
        subtitle: "Heavy Duty",
        title: "Tubular Battery",
        discount: "Long Backup",
        bg: "bg-red-600"
    },
    {
        id: 3,
        image: "/images/slider/slide_new_3.png",
        subtitle: "Go Green",
        title: "Solar Hybrid System",
        discount: "Save Efficiency",
        bg: "bg-green-600"
    },
    {
        id: 4,
        image: "/images/slider/slide_final_4.png",
        subtitle: "Enterprise",
        title: "Online UPS",
        discount: "Reliable Power",
        bg: "bg-cyan-600"
    },
    {
        id: 5,
        image: "/images/slider/slide_new_5.png",
        subtitle: "Next Gen",
        title: "Lithium Powerwall",
        discount: "10 Year Life",
        bg: "bg-gray-600"
    },
    {
        id: 6,
        image: "/images/slider/slide_final_6.png",
        subtitle: "Connected",
        title: "Smart Wi-Fi Inverter",
        discount: "App Control",
        bg: "bg-indigo-600"
    },
    {
        id: 7,
        image: "/images/slider/slide_new_7.png",
        subtitle: "Exchange Mela",
        title: "Upgrade Your Power",
        discount: "Up to ₹5000 OFF",
        bg: "bg-brand-orange"
    }
];

export default function CartHeroSlider() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % slides.length);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="relative w-full h-full rounded-l-3xl overflow-hidden animate-fade-in-right group">
            {slides.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
                        }`}
                >
                    <div className="relative w-full h-full">
                        <Image
                            src={slide.image}
                            alt={slide.title}
                            fill
                            className="object-cover"
                            priority={index === 0}
                        />
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent p-8 flex flex-col justify-end pb-12">
                            <span className={`inline-block px-4 py-1.5 rounded-full text-sm font-bold text-white w-fit mb-3 shadow-lg ${slide.bg}`}>
                                {slide.subtitle}
                            </span>
                            <h3 className="text-3xl md:text-5xl font-bold text-white mb-2 leading-tight drop-shadow-md">
                                {slide.title}
                            </h3>
                            <p className="text-white/90 font-medium text-lg">
                                <span className="text-brand-orange font-bold text-2xl drop-shadow-sm">{slide.discount}</span>
                            </p>
                        </div>
                    </div>
                </div>
            ))}


        </div>
    );
}
