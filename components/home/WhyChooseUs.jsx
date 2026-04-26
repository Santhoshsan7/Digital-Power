import Link from "next/link";
import Image from "next/image";

export default function WhyChooseUs() {
    const features = [
        {
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 00-1 1v1a1 1 0 001 1h2a1 1 0 001-1v-1a1 1 0 00-1-1m-6 0a1 1 0 00-1 1v1a1 1 0 001 1h2a1 1 0 001-1v-1a1 1 0 00-1-1" />
                </svg>
            ),
            title: "Free Delivery",
            description: "Free delivery across Chennai on all orders. Same day delivery available.",
            bgColor: "bg-green-50",
            iconColor: "text-green-600"
        },
        {
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                </svg>
            ),
            title: "Free Installation",
            description: "Professional installation by trained technicians at no extra cost.",
            bgColor: "bg-blue-50",
            iconColor: "text-blue-600"
        },
        {
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
            ),
            title: "5 Year Warranty",
            description: "Up to 5 years warranty on batteries. Extended warranty options available.",
            bgColor: "bg-purple-50",
            iconColor: "text-purple-600"
        },
        {
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4M7.835 4.697a4.347 4.347 0 002.143-.888 4.347 4.347 0 015.044 0 4.347 4.347 0 002.143.888 4.347 4.347 0 013.39 3.39 4.347 4.347 0 00.888 2.143 4.347 4.347 0 010 5.044 4.347 4.347 0 00-.888 2.143 4.347 4.347 0 01-3.39 3.39 4.347 4.347 0 00-2.143.888 4.347 4.347 0 01-5.044 0 4.347 4.347 0 00-2.143-.888 4.347 4.347 0 01-3.39-3.39 4.347 4.347 0 00-.888-2.143 4.347 4.347 0 010-5.044 4.347 4.347 0 00.888-2.143 4.347 4.347 0 013.39-3.39z" />
                </svg>
            ),
            title: "Genuine Products",
            description: "100% genuine products from authorized dealers. No refurbished items.",
            bgColor: "bg-orange-50",
            iconColor: "text-brand-orange"
        },
        {
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            title: "Best Price",
            description: "Best prices guaranteed. Price match promise on all products.",
            bgColor: "bg-yellow-50",
            iconColor: "text-yellow-600"
        },
        {
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            ),
            title: "24/7 Support",
            description: "Round the clock customer support. Quick response to all queries.",
            bgColor: "bg-red-50",
            iconColor: "text-red-600"
        }
    ];

    return (
        <section className="py-16 md:py-24 bg-white relative overflow-hidden">
            <div className="relative max-w-7xl mx-auto px-6 md:px-8">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <span className="inline-block bg-brand-orange/10 text-brand-orange text-[11px] font-black px-5 py-2 rounded-full mb-6 uppercase tracking-[2px]">
                        Why Digital Power?
                    </span>
                    <h2 className="text-3xl md:text-5xl font-black mb-6 text-brand-navy tracking-tight">
                        Experience <span className="text-brand-orange">Excellence</span> in Power
                    </h2>
                    <p className="max-w-2xl mx-auto text-lg text-gray-500 font-medium">
                        We're committed to providing the best power solutions with exceptional service and support.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="group bg-white p-8 rounded-[32px] border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-500 flex flex-col h-full"
                        >
                            {/* Icon Container */}
                            <div className={`w-14 h-14 ${feature.bgColor} rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110`}>
                                <div className={feature.iconColor}>
                                    {feature.icon}
                                </div>
                            </div>

                            {/* Content */}
                            <h3 className="text-xl font-bold text-brand-navy mb-3 group-hover:text-brand-orange transition-colors">
                                {feature.title}
                            </h3>
                            <p className="text-gray-500 text-[15px] leading-relaxed font-medium">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* New Attractive Section - Exchange Offer Banner */}
                <div className="transform hover:-translate-y-1 transition-transform duration-500">
                    <div className="relative overflow-hidden rounded-[30px] bg-gradient-to-r from-brand-navy to-brand-navy-light shadow-2xl shadow-brand-navy/20 p-8 md:p-12">
                        {/* Decorative Background Elements */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-orange/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
                            {/* Left Content */}
                            <div className="flex-1 text-center md:text-left">
                                <div className="inline-flex items-center gap-2 bg-brand-orange/20 border border-brand-orange/30 rounded-full px-4 py-1.5 mb-4 backdrop-blur-md">
                                    <span className="animate-pulse w-2 h-2 bg-brand-orange rounded-full"></span>
                                    <span className="text-brand-orange text-xs font-black uppercase tracking-widest">Limited Time Deal</span>
                                </div>
                                <h3 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight tracking-tight">
                                    Exchange Your Old Battery
                                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-amber-400">
                                        Get Flat ₹5000 OFF*
                                    </span>
                                </h3>
                                <p className="text-blue-100 text-lg font-medium max-w-xl leading-relaxed">
                                    Upgrade to a massive power backup system today! We offer the best exchange value for your old inverter & batteries.
                                </p>
                            </div>

                            {/* Right Action */}
                            <div className="flex-shrink-0">
                                <Link
                                    href="/contact"
                                    className="group relative inline-flex items-center justify-center gap-3 bg-white text-brand-navy px-8 py-4 rounded-2xl font-black text-lg shadow-xl shadow-brand-navy/30 transition-all duration-300 hover:scale-105 hover:shadow-brand-orange/20"
                                >
                                    <span>Claim Offer Now</span>
                                    <svg className="w-5 h-5 text-brand-orange group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </Link>
                                <div className="flex items-center justify-center gap-2 mt-4">
                                    <span className="relative flex h-2.5 w-2.5">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                                    </span>
                                    <span className="text-brand-navy text-[10px] font-bold tracking-wider uppercase">Offer Expires Soon</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {/* Section Divider */}
            <div className="max-w-7xl mx-auto px-6 md:px-8">
                <div className="mt-16 border-t-2 border-gray-100"></div>
            </div>
        </section>
    );
}
