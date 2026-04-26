import Link from "next/link";
import Image from "next/image";

export default function SEOContentSection() {
    const seoBlocks = [
        {
            keyword: "Best Inverter for Home in India",
            description: "Discover top-rated home inverters from trusted brands. Pure sine wave technology ensures smooth power for all your appliances with zero noise.",
            image: "/images/products/microtek-superpower.png",
            href: "/inverter",
            icon: "🏠"
        },
        {
            keyword: "Top Battery Brands for Long Backup",
            description: "Choose from Exide, Luminous, Amaron & Massimo batteries. Tall tubular technology provides up to 4 hours of backup with 5-year warranty.",
            image: "/images/products/combo-banner-dark.png",
            href: "/batteries",
            icon: "🔋"
        },
        {
            keyword: "Pure Sine Wave Inverter Price",
            description: "Get the best prices on pure sine wave inverters starting ₹4,999. Safe for computers, ACs, and sensitive electronics with surge protection.",
            image: "/images/products/luminous-inverter.png",
            href: "/inverter",
            icon: "⚡"
        },
        {
            keyword: "Reliable Power Backup Solutions",
            description: "Complete power backup systems with inverter + battery combos. Free installation, doorstep delivery, and expert consultation available.",
            image: "/images/products/microtek-solar.png",
            href: "/combo-offer",
            icon: "🔌"
        },
        {
            keyword: "Trusted Inverter Dealers Near You",
            description: "Chennai's most trusted inverter dealer with 10+ years experience. Visit our Kolathur store or get doorstep service across Chennai.",
            image: "/images/products/online-ups.png",
            href: "/contact",
            icon: "📍"
        }
    ];

    return (
        <section className="py-16 md:py-24 bg-gradient-to-br from-emerald-50 via-teal-50/50 to-cyan-50/30 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute inset-0">
                <div className="absolute top-10 right-10 w-72 h-72 bg-emerald-200/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-10 left-10 w-80 h-80 bg-teal-200/15 rounded-full blur-3xl"></div>
            </div>
            <div className="relative max-w-7xl mx-auto px-6 md:px-8">
                {/* Section Header */}
                <div className="section-center">
                    <span className="inline-block bg-brand-navy/5 text-xs font-bold px-4 py-2 rounded-full mb-4 uppercase tracking-wider" style={{ color: '#0B3C5D' }}>
                        Expert Guide
                    </span>
                    <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-center" style={{ color: '#0B3C5D' }}>
                        Choose the Best <span style={{ color: '#F57C00' }}>Power Backup</span>
                    </h2>
                    <p className="max-w-2xl mx-auto text-lg text-center" style={{ color: '#4B5563' }}>
                        Explore our range of inverters, batteries, and UPS systems designed for Indian homes and businesses.
                    </p>
                </div>

                {/* SEO Keyword Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
                    {seoBlocks.map((block, index) => (
                        <article
                            key={index}
                            className="group bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-100 hover:border-brand-orange/30 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
                        >
                            {/* Image Section */}
                            <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-50 p-4">
                                <div className="absolute top-3 left-3 w-10 h-10 bg-white rounded-full flex items-center justify-center text-xl shadow-md">
                                    {block.icon}
                                </div>
                                <div className="relative w-full h-full">
                                    <Image
                                        src={block.image}
                                        alt={block.keyword}
                                        fill
                                        className="object-contain group-hover:scale-110 transition-transform duration-500"
                                    />
                                </div>
                            </div>

                            {/* Content Section */}
                            <div className="p-6">
                                {/* SEO Keyword as H3 */}
                                <h3 className="text-lg font-bold text-brand-navy mb-3 group-hover:text-brand-orange transition-colors">
                                    {block.keyword}
                                </h3>

                                {/* Description */}
                                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                    {block.description}
                                </p>

                                {/* Explore More Button */}
                                <Link
                                    href={block.href}
                                    className="inline-flex items-center gap-2 text-brand-orange font-semibold text-sm group-hover:gap-3 transition-all"
                                >
                                    <span>Explore More</span>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>

                {/* Additional SEO Text Block */}
                <div className="mt-14 bg-brand-navy rounded-2xl p-8 md:p-10 text-white shadow-xl">
                    <div className="max-w-4xl mx-auto text-center">
                        <h3 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: 'white' }}>
                            Looking for the Best Inverter Battery Combo in Chennai?
                        </h3>
                        <p className="mb-6 leading-relaxed" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                            Digital Power offers the widest range of <strong className="text-white">home inverters</strong>,
                            <strong className="text-white"> tubular batteries</strong>, and <strong className="text-white">online UPS systems</strong> at
                            unbeatable prices. Whether you need a <strong className="text-white">power backup for home</strong>,
                            <strong className="text-white"> office UPS</strong>, or <strong className="text-white">solar inverter</strong>,
                            we have the perfect solution for you.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link
                                href="/combo-offer"
                                className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-orange to-brand-orange-dark text-white px-6 py-3 rounded-xl font-bold transition-all hover:shadow-xl hover:-translate-y-1"
                            >
                                🎁 View Combo Offers
                            </Link>
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-bold transition-all"
                            >
                                📞 Get Expert Advice
                            </Link>
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
