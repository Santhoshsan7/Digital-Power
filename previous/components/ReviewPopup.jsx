"use client";
import { useState, useEffect } from "react";

export default function ReviewPopup() {
    const [isVisible, setIsVisible] = useState(false);
    const [currentReview, setCurrentReview] = useState(0);

    const reviews = [
        {
            rating: "4.8/5",
            text: "Excellent service and fast installation!",
            name: "Ramesh",
            location: "Chennai"
        },
        {
            rating: "5/5",
            text: "Best prices in the market. Highly recommended!",
            name: "Priya",
            location: "Anna Nagar"
        },
        {
            rating: "4.9/5",
            text: "Great quality inverter. Running perfectly for 2 years!",
            name: "Suresh",
            location: "Velachery"
        },
        {
            rating: "5/5",
            text: "Free installation saved me ₹1500. Thank you!",
            name: "Lakshmi",
            location: "T Nagar"
        },
        {
            rating: "4.7/5",
            text: "Quick delivery and professional support team.",
            name: "Vijay",
            location: "Kolathur"
        }
    ];

    // Show popup after 3 seconds
    useEffect(() => {
        const showTimer = setTimeout(() => {
            setIsVisible(true);
        }, 3000);

        return () => clearTimeout(showTimer);
    }, []);

    // Auto-rotate reviews every 5 seconds
    useEffect(() => {
        if (!isVisible) return;

        const rotateTimer = setInterval(() => {
            setCurrentReview((prev) => (prev + 1) % reviews.length);
        }, 5000);

        return () => clearInterval(rotateTimer);
    }, [isVisible, reviews.length]);

    const review = reviews[currentReview];

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white shadow-2xl p-4 rounded-xl w-80 z-50 border border-gray-100 animate-fadeIn">
            {/* Close Button */}
            <button
                onClick={() => setIsVisible(false)}
                className="absolute -top-2 -right-2 w-6 h-6 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center text-gray-500 text-sm transition-colors"
            >
                ✕
            </button>

            {/* Rating */}
            <p className="font-semibold text-primary flex items-center gap-2">
                <span className="text-yellow-500">⭐</span>
                {review.rating}
                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full ml-auto">Verified</span>
            </p>

            {/* Review Text */}
            <p className="text-sm text-gray-600 mt-2 italic">"{review.text}"</p>

            {/* Customer Name */}
            <p className="text-xs mt-2 text-gray-400">
                – {review.name}, {review.location}
            </p>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-1 mt-3">
                {reviews.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentReview(index)}
                        className={`w-2 h-2 rounded-full transition-all ${index === currentReview ? "bg-accent w-4" : "bg-gray-300"
                            }`}
                    />
                ))}
            </div>
        </div>
    );
}
