"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function BrandVideoAd() {
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [progress, setProgress] = useState(0);

    const texts = [
        "Reliable Energy Solutions",
        "Expert Engineering Team",
        "Smart Inverter Technology",
        "Professional Installation",
        "Digital Power – Powering Your Life Without Limits"
    ];

    const images = [
        "/images/ads/brand_video_poster.png",
        "/images/ads/worker_inverter.png",
        "/images/ads/worker_battery.png",
        "/images/ads/worker_team.png"
    ];

    // Total video duration in milliseconds (2 minutes)
    const totalDuration = 120000;
    // Duration for each text slide
    const slideDuration = 5000;
    // Duration for each image slide (faster for video feel)
    const imageDuration = 4000;
    // Update interval for smooth animation
    const updateInterval = 50;

    useEffect(() => {
        const textTimer = setInterval(() => {
            setCurrentTextIndex((prev) => (prev + 1) % texts.length);
        }, slideDuration);

        const imageTimer = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % images.length);
        }, imageDuration);

        const progressTimer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) return 0;
                // Increment progress based on total duration
                return prev + (100 / (totalDuration / updateInterval));
            });
        }, updateInterval);

        return () => {
            clearInterval(textTimer);
            clearInterval(imageTimer);
            clearInterval(progressTimer);
        };
    }, []);

    // Calculate current time string (MM:SS) based on progress
    const getCurrentTime = () => {
        const totalSeconds = 120;
        const currentSeconds = Math.floor((progress / 100) * totalSeconds);
        const mins = Math.floor(currentSeconds / 60);
        const secs = currentSeconds % 60;
        return `0${mins}:${secs < 10 ? `0${secs}` : secs}`;
    };

    return (
        <div className="w-full bg-black rounded-2xl shadow-2xl border border-gray-800 overflow-hidden sticky top-24 group relative">
            {/* Container aspect ratio - Long Vertical for clean look */}
            <div className="relative aspect-[9/16] w-full bg-gray-900">

                {/* Simulated Video Scenes (Crossfading Images) */}
                <div className="absolute inset-0 z-0">
                    {images.map((src, index) => (
                        <Image
                            key={src}
                            src={src}
                            alt={`Digital Power Scene ${index + 1}`}
                            fill
                            className={`object-cover transition-all duration-1000 ease-in-out ${index === currentImageIndex ? "opacity-100 scale-105" : "opacity-0 scale-100"
                                }`}
                            priority={index === 0}
                        />
                    ))}
                </div>

                {/* Cinematic Overlays - Cleaner gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 z-10" />

                {/* Animated Glow Effect */}
                <div className="absolute inset-0 bg-blue-500/10 mix-blend-overlay z-10 animate-pulse" />

                {/* Video UI Overlay - Just Text */}
                <div className="absolute inset-0 z-20 flex flex-col justify-center p-6">

                    {/* Center Content - Animated Text */}
                    <div className="flex-1 flex items-center justify-center text-center">
                        <div className="relative w-full">
                            {texts.map((text, index) => (
                                <h3
                                    key={index}
                                    className={`text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-gray-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full transition-all duration-700 ease-in-out ${index === currentTextIndex
                                        ? "opacity-100 scale-100 blur-0 translate-y-0"
                                        : "opacity-0 scale-90 blur-sm translate-y-4"
                                        }`}
                                    style={{
                                        textShadow: "0 0 20px rgba(59, 130, 246, 0.5)"
                                    }}
                                >
                                    {text}
                                </h3>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
