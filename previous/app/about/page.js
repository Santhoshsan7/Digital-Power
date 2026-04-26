import Link from "next/link";
import Image from "next/image";

import StatsCounter from "@/components/ui/StatsCounter";

export const metadata = {
    title: "About Us - Digital Power | Chennai's Trusted Power Solutions Provider",
    description: "Learn about Digital Power - Chennai's leading inverter, battery & UPS dealer since 2014. 10+ years experience, 5000+ happy customers, authorized dealer for top brands.",
};

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="section-hero py-20" style={{ background: 'linear-gradient(135deg, #0B3C5D 0%, #0a3350 50%, #082840 100%)' }}>
                <div className="container-wide text-center relative">
                    <nav className="section-breadcrumb">
                        <Link href="/">Home</Link>
                        <span className="mx-2">›</span>
                        <span className="active">About Us</span>
                    </nav>

                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6" style={{ color: 'white' }}>
                        Powering Chennai{" "}
                        <span style={{ color: '#F57C00' }}>
                            Since 2014
                        </span>
                    </h1>
                    <p className="text-lg max-w-xl mx-auto text-center" style={{ color: 'rgba(255, 255, 255, 0.85)' }}>
                        Your trusted partner for premium inverters, batteries, and UPS solutions.
                        Committed to quality, trust, and exceptional service.
                    </p>
                </div>
            </section>

            {/* Stats Section */}
            <section className="relative -mt-16 z-10 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-white rounded-[40px] shadow-2xl shadow-gray-200/50 border border-gray-100 p-10 md:p-12">
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
                            {[
                                {
                                    value: "10+",
                                    label: "Years Experience",
                                    icon: (
                                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    )
                                },
                                {
                                    value: "5000+",
                                    label: "Happy Customers",
                                    icon: (
                                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    )
                                },
                                {
                                    value: "20+",
                                    label: "Brand Partners",
                                    icon: (
                                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                    )
                                },
                                {
                                    value: "15000+",
                                    label: "Products Sold",
                                    icon: (
                                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                        </svg>
                                    )
                                },
                            ].map((stat, i) => (
                                <div key={i} className="flex flex-col items-center text-center group">
                                    <div className="w-16 h-16 rounded-2xl bg-brand-orange/5 flex items-center justify-center text-brand-orange mb-4 group-hover:scale-110 transition-transform duration-500 shadow-sm border border-brand-orange/10">
                                        {stat.icon}
                                    </div>
                                    <div className="text-3xl md:text-4xl font-black text-brand-navy mb-1 tracking-tight">
                                        <StatsCounter value={stat.value} />
                                    </div>
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Company Background */}
            <section className="section-content">
                <div className="container-wide">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <span className="section-tag">
                                Our Story
                            </span>
                            <h2 className="section-title text-center lg:text-left">
                                Chennai's Most Trusted{" "}
                                <span className="text-brand-orange">Power Partner</span>
                            </h2>
                            <div className="space-y-5 text-gray-600 leading-relaxed text-justify">
                                <p className="text-base">
                                    <strong className="text-brand-navy">Digital Power</strong> was founded in 2014 with a simple yet powerful mission:
                                    to provide Chennai's homes and businesses with reliable, affordable, and high-quality power backup solutions.
                                </p>
                                <p className="text-base">
                                    What started as a small shop in Kolathur has grown into one of Chennai's most trusted power solutions
                                    providers, serving over <strong className="text-brand-navy">5,000+ satisfied customers</strong> across the city.
                                </p>
                                <p className="text-base">
                                    Our journey has been built on the foundation of <strong className="text-brand-navy">trust, quality, and customer satisfaction</strong>.
                                    We understand that power backup is not just about products – it's about peace of mind for your family and business.
                                </p>
                                <p className="text-base">
                                    Today, we are proud to be authorized dealers for India's leading power solution brands, offering a comprehensive
                                    range of inverters, batteries, UPS systems, and solar solutions.
                                </p>
                            </div>
                        </div>

                        {/* Vision Card */}
                        <div className="bg-[#0B3C5D] rounded-[40px] p-10 text-white shadow-2xl relative overflow-hidden group">

                            <div className="text-center mb-10 relative z-10">
                                <div className="w-20 h-20 bg-gradient-to-br from-brand-orange to-brand-accent rounded-3xl flex items-center justify-center mx-auto mb-6 text-white shadow-xl shadow-brand-orange/20 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <h3 className="text-3xl font-black mb-2">Digital Power</h3>
                                <p className="text-brand-orange/80 text-[10px] uppercase font-black tracking-[4px]">Powering Your World</p>
                            </div>

                            <div className="space-y-5 relative z-10">
                                {[
                                    "100% Genuine products from authorized sources",
                                    "Free installation by trained technicians",
                                    "24/7 customer support & service",
                                    "Best price guarantee in Chennai",
                                    "Up to 5 years warranty on batteries"
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-4 group/item">
                                        <div className="w-6 h-6 bg-brand-orange/20 rounded-full flex items-center justify-center text-brand-orange flex-shrink-0 group-hover/item:bg-brand-orange group-hover/item:text-white transition-colors duration-300">
                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <span className="text-sm font-bold text-gray-200 group-hover/item:text-white transition-colors capitalize">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Vision & Mission */}
            <section className="section-content">
                <div className="container-wide">
                    <div className="text-center mb-12">
                        <span className="section-tag section-tag-navy">
                            Our Purpose
                        </span>
                        <h2 className="section-title">
                            Vision & <span className="text-brand-orange">Mission</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        {/* Vision */}
                        <div className="group bg-white rounded-[32px] p-10 border border-gray-100 shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:border-brand-orange/20 transition-all duration-700 hover:-translate-y-2">
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center text-white mb-8 shadow-lg shadow-blue-500/20 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-black text-brand-navy mb-5 uppercase tracking-tight">Our Vision</h3>
                            <p className="text-gray-500 text-base leading-relaxed font-medium">
                                To be Chennai's <strong className="text-brand-navy">leading power solutions provider</strong>, recognized for our commitment to
                                quality products, exceptional service, and customer satisfaction. We envision a future where every
                                home and business has access to reliable, efficient, and affordable power backup solutions.
                            </p>
                        </div>

                        {/* Mission */}
                        <div className="group bg-white rounded-[32px] p-10 border border-gray-100 shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:border-brand-orange/20 transition-all duration-700 hover:-translate-y-2">
                            <div className="w-16 h-16 bg-gradient-to-br from-brand-orange to-brand-orange-dark rounded-2xl flex items-center justify-center text-white mb-8 shadow-lg shadow-brand-orange/20 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-black text-brand-navy mb-5 uppercase tracking-tight">Our Mission</h3>
                            <p className="text-gray-500 text-base leading-relaxed font-medium">
                                To <strong className="text-brand-navy">empower every customer</strong> with the right power backup solution through expert guidance,
                                genuine products, and unmatched after-sales service. We are committed to building long-lasting
                                relationships based on trust, transparency, and mutual success.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Goals & Commitment */}
            <section className="section-content-gray">
                <div className="container-wide">
                    <div className="text-center mb-12">
                        <span className="bg-green-100 text-green-700 text-xs font-bold px-4 py-2 rounded-full mb-4 uppercase tracking-wider inline-block">
                            Our Commitment
                        </span>
                        <h2 className="section-title">
                            Customer-First <span className="text-brand-orange">Approach</span>
                        </h2>
                        <p className="section-subtitle">
                            Every decision we make is guided by one simple question: "How does this benefit our customers?"
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: (
                                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                    </svg>
                                ),
                                title: "Quality First",
                                description: "We only sell 100% genuine products from authorized sources. No compromises on quality, ever. Each product is tested and verified before delivery.",
                                color: "text-yellow-500 bg-yellow-50 border-yellow-100"
                            },
                            {
                                icon: (
                                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                ),
                                title: "Trust & Transparency",
                                description: "Honest pricing with no hidden charges. Clear communication about product specifications, warranties, and service terms. Your trust is our priority.",
                                color: "text-blue-500 bg-blue-50 border-blue-100"
                            },
                            {
                                icon: (
                                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-7.714 2.143L11 21l-2.286-6.857L1 12l7.714-2.143L11 3z" />
                                    </svg>
                                ),
                                title: "Service Excellence",
                                description: "From pre-sales consultation to post-installation support, we go above and beyond. Quick response times, expert technicians, and genuine care.",
                                color: "text-purple-500 bg-purple-50 border-purple-100"
                            },
                            {
                                icon: (
                                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                    </svg>
                                ),
                                title: "Expert Guidance",
                                description: "Our trained team helps you choose the right solution based on your specific needs, load requirements, and budget. Free consultation for all customers.",
                                color: "text-green-500 bg-green-50 border-green-100"
                            },
                            {
                                icon: (
                                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                ),
                                title: "Technical Support",
                                description: "Professional installation by certified technicians. Annual maintenance contracts available. 24/7 emergency support for critical issues.",
                                color: "text-red-500 bg-red-50 border-red-100"
                            },
                            {
                                icon: (
                                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                ),
                                title: "Best Value",
                                description: "Competitive pricing with regular offers and combo deals. Exchange programs for old batteries. EMI options available for all products.",
                                color: "text-brand-orange bg-orange-50 border-orange-100"
                            }
                        ].map((goal, i) => (
                            <div key={i} className="group bg-white rounded-[32px] p-8 shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:border-brand-orange/20 transition-all duration-700 hover:-translate-y-2 border border-gray-100 flex flex-col h-full">
                                <div className={`w-14 h-14 ${goal.color} rounded-2xl flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 border flex-shrink-0`}>
                                    {goal.icon}
                                </div>
                                <h3 className="text-xl font-black text-brand-navy mb-4 tracking-tight">{goal.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed font-medium flex-grow">{goal.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Brand Partnerships */}
            <section className="section-content">
                <div className="container-wide">
                    <div className="text-center mb-12">
                        <span className="section-tag">
                            Our Partners
                        </span>
                        <h2 className="section-title">
                            Authorized Dealer for{" "}
                            <span className="text-brand-orange">Premium Brands</span>
                        </h2>
                        <p className="section-subtitle">
                            We partner with India's leading power solution manufacturers to bring you the best products with full warranty support.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                        {[
                            {
                                name: "Microtek",
                                icon: (
                                    <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                                    </svg>
                                ),
                                type: "Inverters & Batteries"
                            },
                            {
                                name: "Luminous",
                                icon: (
                                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                    </svg>
                                ),
                                type: "Inverters & Batteries"
                            },
                            {
                                name: "Exide",
                                icon: (
                                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                    </svg>
                                ),
                                type: "Batteries"
                            },
                            {
                                name: "Amaron",
                                icon: (
                                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                ),
                                type: "Batteries"
                            },
                            {
                                name: "APC",
                                icon: (
                                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                                    </svg>
                                ),
                                type: "UPS Systems"
                            },
                            {
                                name: "Massimo",
                                icon: (
                                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                    </svg>
                                ),
                                type: "Batteries"
                            },
                        ].map((brand, i) => (
                            <div key={i} className="group bg-white rounded-[32px] p-8 text-center border border-gray-100 hover:border-brand-orange/30 hover:shadow-2xl transition-all duration-700 flex flex-col h-full justify-center items-center hover:-translate-y-2">
                                <div className="text-brand-orange mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">{brand.icon}</div>
                                <h4 className="font-black text-brand-navy mb-1 transition-colors">{brand.name}</h4>
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-tight">{brand.type}</p>
                            </div>
                        ))}
                    </div>

                    {/* Certification Badges */}
                    <div className="mt-16 flex flex-wrap justify-center gap-6">
                        {["Authorized Dealer", "ISO Certified", "Quality Assured", "Genuine Products"].map((cert, i) => (
                            <span key={i} className="flex items-center gap-3 bg-white text-brand-navy px-8 py-4 rounded-2xl text-[11px] font-black uppercase tracking-[2px] border border-gray-100 shadow-sm hover:border-brand-orange/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-default group">
                                <div className="p-1.5 bg-green-50 rounded-full group-hover:bg-green-100 transition-colors">
                                    <svg className="w-3.5 h-3.5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                {cert}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact CTA - Redesigned */}
            <section className="relative py-20 overflow-hidden">
                {/* Background Gradient & Pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand-navy to-brand-navy-dark z-0" style={{ background: 'linear-gradient(135deg, #0B3C5D 0%, #051e2e 100%)' }}></div>

                {/* Decorative Circles */}
                <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-brand-orange/10 rounded-full blur-3xl z-0"></div>
                <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-brand-accent/10 rounded-full blur-3xl z-0"></div>

                {/* Decorative Icons Pattern */}
                <div className="absolute inset-0 z-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

                <div className="container-narrow relative z-10 text-center">
                    {/* Floating Badge */}
                    <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 px-6 py-2.5 rounded-full text-brand-orange font-black text-[10px] uppercase tracking-[3px] mb-8 animate-bounce" style={{ animationDuration: '3s' }}>
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        <span>Get Started Today</span>
                    </div>

                    <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter leading-tight drop-shadow-2xl">
                        Ready to <span className="text-brand-orange relative inline-block">
                            Power Up
                            <svg className="absolute w-full h-4 -bottom-3 left-0 text-brand-orange opacity-40" viewBox="0 0 200 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.00025 6.99999C47.2891 2.37397 101.996 -1.02559 198 2.00004" stroke="currentColor" strokeWidth="4" strokeLinecap="round" /></svg>
                        </span> Your Home?
                    </h2>

                    <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-12 leading-relaxed font-medium opacity-80">
                        Don't let power cuts disrupt your life. Get superior inverters and batteries with expert installation.
                        Visit our store or contact us for a free consultation.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <Link
                            href="/contact"
                            className="w-full sm:w-auto min-w-[240px] flex items-center justify-center gap-4 bg-brand-orange hover:bg-orange-600 text-white px-10 py-5 rounded-2xl font-black text-lg shadow-2xl shadow-brand-orange/40 hover:shadow-brand-orange/60 hover:-translate-y-1.5 transition-all duration-500 group"
                        >
                            <svg className="w-6 h-6 group-hover:rotate-12 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            <span>Contact Us</span>
                        </Link>

                        <a
                            href="https://wa.me/919445955555"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto min-w-[240px] flex items-center justify-center gap-4 bg-white text-green-600 px-10 py-5 rounded-2xl font-black text-lg shadow-2xl hover:shadow-gray-300/50 hover:-translate-y-1.5 transition-all duration-500 group border-2 border-transparent hover:border-green-100"
                        >
                            <div className="w-7 h-7 group-hover:scale-110 transition-transform duration-500 flex items-center justify-center">
                                <svg fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                            </div>
                            <span>WhatsApp Now</span>
                        </a>
                    </div>

                    {/* Trust Indicators */}
                    <div className="mt-12 pt-8 border-t border-white/10 flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm font-medium text-gray-400">
                        <span className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-green-400"></span>
                            Free Consultation
                        </span>
                        <span className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-brand-orange"></span>
                            Fast Installation
                        </span>
                        <span className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                            Best Prices
                        </span>
                    </div>
                </div>
            </section>
        </div>
    );
}
