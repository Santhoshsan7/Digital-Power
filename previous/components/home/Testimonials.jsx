export default function Testimonials() {
    const reviews = [
        {
            name: "Rajesh Kumar",
            location: "Kolathur, Chennai",
            rating: 5,
            review: "Excellent service! Got my Luminous inverter installed the same day. Very professional team.",
            avatar: "👨"
        },
        {
            name: "Priya Sharma",
            location: "Villivakkam, Chennai",
            rating: 5,
            review: "Best prices I found in Chennai. The battery is working perfectly for 6 months now.",
            avatar: "👩"
        },
        {
            name: "Mohammed Ali",
            location: "Madhavaram, Chennai",
            rating: 4,
            review: "Quick delivery and great after-sales support. Highly recommended for power solutions!",
            avatar: "👨"
        },
    ];

    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <span className="inline-block font-bold text-sm uppercase tracking-wider mb-2" style={{ color: '#F57C00' }}>
                        Testimonials
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#0B3C5D' }}>
                        What Our Customers Say
                    </h2>
                    <p className="text-lg max-w-2xl mx-auto" style={{ color: '#4B5563' }}>
                        Real reviews from our satisfied customers across Chennai
                    </p>
                </div>

                {/* Reviews Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {reviews.map((review, index) => (
                        <div
                            key={index}
                            className="bg-gray-50 rounded-2xl p-8 relative hover:shadow-xl transition-shadow border border-gray-100"
                        >
                            {/* Quote Icon */}
                            <div className="absolute -top-4 left-8 w-10 h-10 bg-brand-orange rounded-full flex items-center justify-center text-white text-xl">
                                "
                            </div>

                            {/* Stars */}
                            <div className="flex gap-1 mb-4 mt-2 text-yellow-400">
                                {"★".repeat(review.rating)}
                                {"☆".repeat(5 - review.rating)}
                            </div>

                            {/* Review Text */}
                            <p className="text-gray-700 mb-6 leading-relaxed">
                                "{review.review}"
                            </p>

                            {/* Customer Info */}
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-brand-navy rounded-full flex items-center justify-center text-2xl">
                                    {review.avatar}
                                </div>
                                <div>
                                    <h4 className="font-bold" style={{ color: '#0B3C5D' }}>{review.name}</h4>
                                    <p className="text-sm" style={{ color: '#6B7280' }}>📍 {review.location}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Trust Stats */}
                <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[
                        { value: "500+", label: "Happy Customers" },
                        { value: "1000+", label: "Products Sold" },
                        { value: "4.8★", label: "Average Rating" },
                        { value: "5+", label: "Years Experience" },
                    ].map((stat, index) => (
                        <div key={index} className="text-center">
                            <div className="text-3xl md:text-4xl font-bold mb-1" style={{ color: '#F57C00' }}>{stat.value}</div>
                            <div style={{ color: '#4B5563' }}>{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
