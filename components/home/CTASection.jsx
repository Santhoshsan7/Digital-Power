import Link from "next/link";

export default function CTASection() {
    return (
        <section className="py-16 md:py-20 bg-gray-50 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-96 h-96 bg-brand-orange/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-navy/5 rounded-full blur-3xl"></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-6 md:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <div className="text-center lg:text-left">
                        {/* Urgency Badge */}
                        <div className="inline-flex items-center gap-3 bg-brand-orange/10 border border-brand-orange/20 text-brand-orange px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[2px] mb-8 animate-pulse">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            <span>Limited Time Offer — Act Now!</span>
                        </div>

                        <h2 className="text-4xl md:text-6xl font-black text-brand-navy mb-8 tracking-tighter leading-[1.1]">
                            Ready to <span className="text-brand-orange">Power Up</span> Your Life?
                        </h2>

                        <p className="text-xl text-gray-600 mb-10 max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed">
                            Get expert advice and find the perfect power backup solution for your home or business.
                            Enjoy free consultation, unbeatable prices, and professional same-day installation.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start mb-10">
                            <Link
                                href="/contact"
                                className="group inline-flex items-center justify-center gap-3 bg-brand-navy text-white px-10 py-5 rounded-2xl font-black text-lg transition-all duration-500 shadow-2xl hover:scale-105 hover:-translate-y-1 shadow-brand-navy/20"
                            >
                                <svg className="w-6 h-6 text-brand-orange group-hover:rotate-12 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <span>Get Free Quote</span>
                            </Link>
                            <a
                                href="https://wa.me/919445955555"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group inline-flex items-center justify-center gap-3 bg-green-600 text-white px-10 py-5 rounded-2xl font-black text-lg transition-all duration-500 shadow-2xl shadow-green-600/20 hover:scale-105 hover:-translate-y-1"
                            >
                                <div className="w-6 h-6 group-hover:scale-110 transition-transform duration-500">
                                    <svg fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                    </svg>
                                </div>
                                <span>WhatsApp Now</span>
                            </a>
                        </div>

                        {/* Contact Info */}
                        <div className="flex flex-wrap justify-center lg:justify-start gap-10 text-gray-500 text-[11px] font-black uppercase tracking-[2px]">
                            <a href="tel:9445955555" className="flex items-center gap-3 hover:text-brand-orange transition-colors group">
                                <div className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center group-hover:border-brand-orange transition-colors shadow-sm">
                                    <svg className="w-4 h-4 text-brand-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                </div>
                                <span>94459 55555</span>
                            </a>
                            <a href="mailto:admin@digitalpower.in" className="flex items-center gap-3 hover:text-brand-orange transition-colors group">
                                <div className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center group-hover:border-brand-orange transition-colors shadow-sm">
                                    <svg className="w-4 h-4 text-brand-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <span>admin@digitalpower.in</span>
                            </a>
                        </div>
                    </div>

                    {/* Right Content - Offer Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {[
                            {
                                icon: (
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                    </svg>
                                ),
                                title: "Free Installation",
                                description: "Expert setup on all inverter & battery purchases",
                                highlight: "WORTH ₹1500"
                            },
                            {
                                icon: (
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                    </svg>
                                ),
                                title: "Exchange Offer",
                                description: "Get massive discounts on old battery exchange",
                                highlight: "FLAT ₹5000 OFF"
                            },
                            {
                                icon: (
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9a1 1 0 01-1-1m3 0V8.272l2.59-3.25L15 8v8a1 1 0 01-1 1zm-3 0a1 1 0 01-1 1H5a1 1 0 01-1-1V7h7v9z" />
                                    </svg>
                                ),
                                title: "Free Delivery",
                                description: "Lightning fast same day delivery across Chennai",
                                highlight: "SAME DAY"
                            },
                            {
                                icon: (
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                ),
                                title: "Extended Warranty",
                                description: "Comprehensive long-term protection on all batteries",
                                highlight: "5 YEARS"
                            }
                        ].map((offer, index) => (
                            <div
                                key={index}
                                className="group/card bg-white border border-gray-100 rounded-[24px] p-6 hover:border-brand-orange/30 transition-all duration-500 flex flex-col h-full shadow-lg hover:shadow-xl hover:-translate-y-1"
                            >
                                <div className="flex flex-col items-start gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-brand-orange/10 flex items-center justify-center text-brand-orange group-hover/card:bg-brand-orange group-hover/card:text-white transition-all duration-500">
                                        {offer.icon}
                                    </div>
                                    <div className="flex-grow">
                                        <h3 className="font-black text-lg text-brand-navy mb-2 tracking-tight">{offer.title}</h3>
                                        <p className="text-sm text-gray-500 mb-4 font-medium leading-relaxed">{offer.description}</p>
                                        <span className="inline-block text-[10px] font-black px-4 py-2 rounded-xl bg-brand-orange/10 text-brand-orange tracking-widest">
                                            {offer.highlight}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>

    );
}
