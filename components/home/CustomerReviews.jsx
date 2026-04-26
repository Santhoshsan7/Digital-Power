"use client";
import { useState, useEffect } from "react";

export default function CustomerReviews() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    const reviews = [
        {
            name: "Ramesh Kumar",
            location: "Kolathur, Chennai",
            rating: 5,
            feedback: "Excellent service! Got my Microtek inverter installed same day. The team was professional and the price was the best I found anywhere.",
            date: "2 weeks ago"
        },
        {
            name: "Priya Sharma",
            location: "Anna Nagar, Chennai",
            rating: 5,
            feedback: "Bought a combo package - inverter and battery. Great savings compared to buying separately. Installation was done perfectly!",
            date: "1 month ago"
        },
        {
            name: "Suresh Babu",
            location: "Velachery, Chennai",
            rating: 5,
            feedback: "The staff helped me choose the right battery for my inverter. They even did a load calculation for free. Will buy again!",
            date: "3 weeks ago"
        },
        {
            name: "Lakshmi Narayanan",
            location: "T Nagar, Chennai",
            rating: 4,
            feedback: "Good quality products and reasonable prices. Delivery was on time and installation was professional.",
            date: "1 week ago"
        },
        {
            name: "Vijay Anand",
            location: "Adyar, Chennai",
            rating: 5,
            feedback: "Been a customer for 3 years. Recently upgraded my old inverter. The exchange offer gave me great value!",
            date: "2 months ago"
        },
        {
            name: "Meena Patel",
            location: "Porur, Chennai",
            rating: 5,
            feedback: "Needed an Online UPS for my home office. The team helped me understand my requirements perfectly!",
            date: "3 weeks ago"
        }
    ];

    // Auto-scroll animation
    useEffect(() => {
        const timer = setInterval(() => {
            setIsAnimating(true);
            setTimeout(() => {
                setCurrentIndex((prev) => (prev + 1) % reviews.length);
                setIsAnimating(false);
            }, 300);
        }, 4000);
        return () => clearInterval(timer);
    }, [reviews.length]);

    // Get 3 reviews to display
    const getVisibleReviews = () => {
        const result = [];
        for (let i = 0; i < 3; i++) {
            result.push(reviews[(currentIndex + i) % reviews.length]);
        }
        return result;
    };

    return (
        <section className="py-16 md:py-24 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute inset-0">
                <div className="absolute top-20 left-20 w-72 h-72 bg-brand-orange/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-yellow-200/20 rounded-full blur-3xl"></div>
            </div>
            <div className="relative max-w-7xl mx-auto px-6 md:px-8">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <span className="inline-block bg-brand-orange/10 text-brand-orange text-[11px] font-black px-5 py-2 rounded-full mb-6 uppercase tracking-[2px]">
                        Customer Testimonials
                    </span>
                    <h2 className="text-3xl md:text-5xl font-black mb-6 text-brand-navy tracking-tight">
                        What Our <span className="text-brand-orange">Customers Say</span>
                    </h2>
                    <p className="max-w-2xl mx-auto text-lg text-gray-500 font-medium leading-relaxed">
                        Join thousands of happy customers who trust Digital Power for their power backup needs.
                    </p>
                </div>

                {/* Stats Bar */}
                {/* Stats Bar */}
                <div className="bg-brand-navy rounded-[40px] shadow-2xl shadow-brand-navy/20 border border-brand-navy-light/10 p-8 md:p-12 mb-16">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {[
                            {
                                value: "4.9",
                                label: "Average Rating",
                                icon: (
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                )
                            },
                            {
                                value: "5000+",
                                label: "Happy Customers",
                                icon: (
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                )
                            },
                            {
                                value: "98%",
                                label: "Satisfaction Rate",
                                icon: (
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                )
                            },
                            {
                                value: "2000+",
                                label: "5-Star Reviews",
                                icon: (
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                )
                            },
                        ].map((stat, i) => (
                            <div key={i} className="group flex flex-col items-center">
                                <div className="text-brand-orange mb-3 transform group-hover:scale-110 transition-transform duration-500">{stat.icon}</div>
                                <div className="text-2xl md:text-4xl font-black text-white mb-1">
                                    {stat.value}
                                </div>
                                <div className="text-[10px] font-black text-white/50 uppercase tracking-widest">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Reviews Slider */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {getVisibleReviews().map((review, index) => (
                        <div
                            key={`${review.name}-${currentIndex}-${index}`}
                            className={`bg-white rounded-[32px] p-8 border border-gray-100 shadow-xl shadow-gray-500/5 hover:shadow-2xl hover:border-brand-orange/20 transition-all duration-700 flex flex-col h-full ${isAnimating ? "opacity-50 blur-[2px]" : "opacity-100 blur-0"}`}
                        >
                            {/* Header with Avatar */}
                            <div className="flex items-start justify-between mb-6 flex-shrink-0">
                                <div className="flex items-center gap-4">
                                    {/* Customer Avatar */}
                                    <div className="w-12 h-12 bg-gradient-to-br from-brand-orange to-brand-accent rounded-full flex items-center justify-center text-white font-black text-lg shadow-lg shadow-brand-orange/20">
                                        {review.name.charAt(0)}
                                    </div>
                                    <div>
                                        {/* Customer Name */}
                                        <h4 className="font-bold text-brand-navy text-sm flex items-center gap-2">
                                            {review.name}
                                            <div className="bg-green-100 p-0.5 rounded-full">
                                                <svg className="w-2.5 h-2.5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                        </h4>
                                        <p className="text-[11px] font-bold text-gray-400 tracking-wide">{review.location}</p>
                                    </div>
                                </div>
                                <span className="text-[10px] font-black text-gray-300 uppercase tracking-wider">{review.date}</span>
                            </div>

                            {/* Star Rating */}
                            <div className="flex items-center gap-1 mb-6 flex-shrink-0">
                                {[...Array(5)].map((_, i) => (
                                    <svg
                                        key={i}
                                        className={`w-4 h-4 ${i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-100 fill-gray-100"}`}
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>

                            {/* Feedback */}
                            <p className="text-gray-600 text-sm leading-relaxed italic flex-grow">
                                "{review.feedback}"
                            </p>
                        </div>
                    ))}
                </div>

                {/* Carousel Dots */}
                <div className="flex justify-center gap-2 mt-8">
                    {reviews.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                setIsAnimating(true);
                                setTimeout(() => {
                                    setCurrentIndex(index);
                                    setIsAnimating(false);
                                }, 300);
                            }}
                            className={`transition-all duration-300 rounded-full ${index === currentIndex
                                ? "w-8 h-2 bg-brand-orange"
                                : "w-2 h-2 bg-gray-300 hover:bg-gray-400"
                                }`}
                        />
                    ))}
                </div>

                {/* CTA */}
                <div className="text-center mt-10">
                    <a
                        href="https://g.page/r/digitalpowerchennai/review"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-white border-2 border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white px-6 py-3 rounded-xl font-bold transition-all"
                    >
                        Read More Reviews on Google
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                    </a>
                </div>
            </div>

            {/* Section Divider */}
            <div className="max-w-7xl mx-auto px-6 md:px-8">
                <div className="mt-16 border-t-2 border-gray-100"></div>
            </div>
        </section>
    );
}
