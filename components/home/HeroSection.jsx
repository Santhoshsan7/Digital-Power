"use client";
import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";

const slides = [
    {
        id: 1,
        image: "/images/slider/slide1-v2.jpg", // User's premium home inverter image
        title: "Uninterrupted Power",
        subtitle: "Premium Inverters & Batteries for Modern Living",
        accent: "text-amber-400",
        buttonColor: "bg-brand-orange hover:bg-orange-600 shadow-orange-900/40",
    },
    {
        id: 2,
        image: "/images/slider/slide2.png", // Batteries
        title: "Power You Can Trust",
        subtitle: "Premium Tubular Batteries for Unmatched Reliability",
        accent: "text-blue-400",
        buttonColor: "bg-blue-600 hover:bg-blue-700 shadow-blue-900/40",
    },
    {
        id: 3,
        image: "/images/slider/slide3-v2.jpg", // User's high-tech UPS image
        title: "Digital Power Series",
        subtitle: "Enterprise-Grade UPS Solutions for Your Business",
        accent: "text-cyan-400",
        buttonColor: "bg-brand-navy hover:bg-black border border-cyan-400/30 shadow-blue-900/40",
    },
    {
        id: 4,
        image: "/images/slider/solar-hero-2026-v2.jpg", // Optimized 16:9 Solar image
        title: "Solar Solutions",
        subtitle: "Sustainable Energy",
        accent: "text-green-400",
        buttonColor: "bg-green-600 hover:bg-green-700 shadow-green-900/40",
        hideContent: true, // Content is baked into the image
    },
    {
        id: 5,
        image: "/images/slider/expert-installation-v2.jpg", // New Expert Installation image
        title: "Expert Installation",
        subtitle: "Professional Service You Can Rely On",
        accent: "text-brand-orange",
        buttonColor: "bg-brand-orange hover:bg-orange-600 shadow-orange-900/40",
    }
];


export default function HeroSection() {
    const [current, setCurrent] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const nextSlide = useCallback(() => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
        setTimeout(() => setIsTransitioning(false), 800);
    }, [isTransitioning]);

    const prevSlide = useCallback(() => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
        setTimeout(() => setIsTransitioning(false), 800);
    }, [isTransitioning]);

    // Auto-play
    useEffect(() => {
        const timer = setInterval(() => {
            nextSlide();
        }, 7000);
        return () => clearInterval(timer);
    }, [nextSlide]);

    return (
        <section className="relative w-full h-[450px] md:h-[550px] lg:h-[650px] overflow-hidden bg-black p-0!">

            {/* Slides */}
            {slides.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === current ? "opacity-100 z-10" : "opacity-0 z-0"
                        }`}
                >
                    {/* Background Container with Zoom Animation */}
                    <div className={`relative w-full h-full transform transition-transform duration-[8000ms] ease-out ${index === current ? "scale-110" : "scale-100"}`}>
                        <Image
                            src={slide.image}
                            alt={slide.title}
                            fill
                            className="object-cover object-center"
                            priority={index === 0}
                        />
                        {/* Multi-layered Overlays for depth and readability */}
                        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent"></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30"></div>
                        <div className="absolute inset-0 bg-black/20"></div>
                    </div>

                    {/* Content */}
                    {!slide.hideContent && (
                        <div className="absolute inset-0 flex items-center">
                            <div className="container-wide px-6 md:px-12">
                                <div className={`max-w-3xl transition-all duration-1000 transform ${index === current ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"}`}>
                                    <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full bg-brand-orange/20 backdrop-blur-md border border-brand-orange/30">
                                        <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse"></span>
                                        <span className="text-xs md:text-sm font-bold tracking-widest uppercase text-white">
                                            Premium Power Solutions
                                        </span>
                                    </div>
                                    <h2 className="text-3xl md:text-6xl lg:text-8xl font-black mb-4 md:mb-6 leading-[1.05] tracking-tighter text-white!">
                                        {slide.title}
                                    </h2>
                                    <p className="text-base md:text-xl lg:text-2xl font-medium mb-6 md:mb-10 text-white opacity-90 max-w-xl leading-relaxed">
                                        {slide.subtitle}
                                    </p>
                                    <div className="flex flex-wrap gap-3 md:gap-5">
                                        <Link
                                            href="/inverter"
                                            className={`group relative overflow-hidden px-6 md:px-8 py-3 md:py-3.5 rounded-full text-sm md:text-base font-black shadow-2xl transition-all duration-500 hover:scale-105 active:scale-95 ${slide.buttonColor} text-white`}
                                        >
                                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                                            <span className="relative z-10 flex items-center gap-2 md:gap-3">
                                                {slide.button1Text || "EXPLORE NOW"}
                                                <svg className="w-4 h-4 md:w-5 md:h-5 transition-transform group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                </svg>
                                            </span>
                                        </Link>
                                        <Link
                                            href="/contact"
                                            className="px-6 md:px-8 py-3 md:py-3.5 rounded-full text-sm md:text-base font-bold text-white border-2 border-white/20 hover:border-white/50 hover:bg-white/10 transition-all backdrop-blur-sm"
                                        >
                                            {slide.button2Text || "Get a Quote"}
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            ))}



            {/* Trust Bar (Bottom Overlay) */}
            <div className="absolute bottom-0 left-0 w-full z-20 hidden lg:block">
                <div className="bg-black/40 backdrop-blur-xl border-t border-white/10 py-6">
                    <div className="container-wide flex justify-between items-center px-12">
                        <div className="flex items-center gap-12 flex-1 justify-between">
                            <div className="flex items-center gap-4">
                                <div className="text-brand-orange">
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9a1 1 0 01-1-1m3 0V8.272l2.59-3.25L15 8v8a1 1 0 01-1 1zm-3 0a1 1 0 01-1 1H5a1 1 0 01-1-1V7h7v9z" /></svg>
                                </div>
                                <div className="flex flex-col">
                                    <h4 className="text-white font-bold text-sm leading-tight">Free Delivery</h4>
                                    <p className="text-white/70 text-[11px] font-medium tracking-wide">Across Chennai</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="text-brand-orange">
                                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                                </div>
                                <div className="flex flex-col">
                                    <h4 className="text-white font-bold text-sm leading-tight">Free Installation</h4>
                                    <p className="text-white/70 text-[11px] font-medium tracking-wide">By Expert Technicians</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="text-brand-orange">
                                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                                </div>
                                <div className="flex flex-col">
                                    <h4 className="text-white font-bold text-sm leading-tight">Warranty</h4>
                                    <p className="text-white/70 text-[11px] font-medium tracking-wide">Up to 3 Years</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="text-brand-orange">
                                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
                                </div>
                                <div className="flex flex-col">
                                    <h4 className="text-white font-bold text-sm leading-tight">24/7 Support</h4>
                                    <p className="text-white/70 text-[11px] font-medium tracking-wide">Always Online</p>
                                </div>
                            </div>
                        </div>

                        {/* Pagination Dots - Integrated into Trust Bar - Moved to Right End */}
                        <div className="flex gap-3 pl-8 border-l border-white/10 ml-8">
                            {slides.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrent(index)}
                                    className="group relative flex items-center"
                                    aria-label={`Go to slide ${index + 1}`}
                                >
                                    <div className={`h-1.5 rounded-full transition-all duration-500 ${current === index ? "w-10 bg-brand-orange" : "w-4 bg-white/20 hover:bg-white/40"}`} />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Pagination Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2 lg:hidden">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrent(index)}
                        className={`h-2 rounded-full transition-all duration-500 ${current === index ? "w-8 bg-brand-orange" : "w-2 bg-white/40"}`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>

            {/* Navigation arrows removed per user request */}

            <style jsx>{`
                .writing-vertical {
                    writing-mode: vertical-rl;
                    text-orientation: mixed;
                }
            `}</style>
        </section>
    );
}

