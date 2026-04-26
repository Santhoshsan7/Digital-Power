import Link from "next/link";
import Image from "next/image";

export default function CategoryGrid() {
    const categories = [
        {
            name: "Inverters",
            subtitle: "Pure Sine Wave & DG",
            description: "Premium inverters for home & office. Wide input range, digital display, and overload protection with up to 3 years warranty.",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            ),
            image: "/images/categories/inverter-cat.png",
            href: "/inverter",
            color: "from-blue-500 to-blue-600",
            iconColor: "text-blue-600",
            bgColor: "bg-blue-50",
            products: "10+ Models"
        },
        {
            name: "Batteries",
            subtitle: "Tall Tubular & Flat Plate",
            description: "Long-lasting inverter batteries from top brands. Deep cycle technology, low maintenance, and up to 5 years warranty.",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
            ),
            image: "/images/categories/battery-cat.png",
            href: "/batteries",
            color: "from-green-500 to-green-600",
            iconColor: "text-green-600",
            bgColor: "bg-green-50",
            products: "8+ Models"
        },
        {
            name: "Online UPS",
            subtitle: "For Computers & Servers",
            description: "Zero transfer time UPS systems for sensitive electronics. Double conversion technology with SNMP support.",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            ),
            image: "/images/categories/ups-cat.png",
            href: "/online-ups",
            color: "from-purple-500 to-purple-600",
            iconColor: "text-purple-600",
            bgColor: "bg-purple-50",
            products: "5+ Models"
        },
        {
            name: "Combo Offers",
            subtitle: "Inverter + Battery Deals",
            description: "Save more with our combo packages. Complete power backup solutions with free installation and delivery.",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            image: "/images/categories/combo-cat.png",
            href: "/combo-offer",
            color: "from-brand-orange to-brand-orange-dark",
            iconColor: "text-brand-orange",
            bgColor: "bg-orange-50",
            products: "Save up to 20%",
            featured: true
        },
    ];

    return (
        <section className="py-16 md:py-24 bg-white relative overflow-hidden">
            <div className="relative max-w-7xl mx-auto px-6 md:px-8">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <span className="inline-block bg-brand-orange/10 text-brand-orange text-[11px] font-black px-5 py-2 rounded-full mb-6 uppercase tracking-[2px]">
                        Shop by Category
                    </span>
                    <h2 className="text-3xl md:text-5xl font-black text-brand-navy mb-6 tracking-tight text-center">
                        Browse Our <span className="text-brand-orange">Product Categories</span>
                    </h2>
                    <p className="text-gray-500 max-w-2xl mx-auto text-lg font-medium text-center leading-relaxed">
                        Find the perfect power solution for your home or business from our wide range of products.
                    </p>
                </div>

                {/* Category Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
                    {categories.map((category, index) => (
                        <div
                            key={category.name}
                            className={`group relative card-glass overflow-hidden flex flex-col w-full h-full p-0! ${category.featured ? "ring-2 ring-brand-orange/40" : ""
                                }`}
                        >
                            {/* Featured Badge */}
                            {category.featured && (
                                <div className="absolute top-4 right-4 z-10 bg-brand-orange text-white text-[10px] font-black px-3 py-1 rounded-full shadow-lg shadow-brand-orange/30">
                                    HOT OFFER
                                </div>
                            )}

                            {/* Image Section - Fully Visible & High Quality */}
                            <div className="relative h-64 bg-white flex items-center justify-center transition-all duration-700 group-hover:bg-gray-50 overflow-hidden">
                                {/* Product Image */}
                                <div className="relative w-full h-full">
                                    <Image
                                        src={category.image}
                                        alt={category.name}
                                        fill
                                        style={{ objectFit: 'contain', padding: '1.5rem' }}
                                        className="group-hover:scale-105 transition-transform duration-700 drop-shadow-2xl"
                                        priority={index < 4}
                                    />
                                </div>
                            </div>

                            {/* Content Section */}
                            <div className="p-8 flex flex-col flex-1 bg-white/40">
                                {/* Category Title */}
                                <h3 className="text-xl font-black text-brand-navy mb-1 group-hover:text-brand-orange transition-colors">
                                    {category.name}
                                </h3>

                                {/* Subtitle */}
                                <p className="text-sm text-brand-orange font-bold mb-3">
                                    {category.subtitle}
                                </p>

                                {/* Description */}
                                <p className="text-gray-600 text-[15px] mb-6 line-clamp-2 leading-relaxed font-medium">
                                    {category.description}
                                </p>

                                {/* Products Count */}
                                <div className="mb-6 mt-auto">
                                    <span className={`inline-flex items-center gap-1 text-[11px] font-black bg-white/80 border border-gray-200 text-gray-700 px-4 py-1.5 rounded-full shadow-sm`}>
                                        {category.products}
                                    </span>
                                </div>

                                {/* Shop Now Button */}
                                <Link
                                    href={category.href}
                                    className="flex items-center justify-center gap-2 w-full btn-secondary text-sm group/btn"
                                >
                                    <span>Explore Collection</span>
                                    <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7-7 7" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Trust Stats Bar */}
                <div className="mt-20 bg-brand-navy rounded-[40px] p-8 md:p-12 shadow-2xl relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-navy-light/20 to-transparent"></div>
                    <div className="relative grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
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
                                label: "Brands Available",
                                icon: (
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                    </svg>
                                )
                            },
                            {
                                value: "24/7",
                                label: "Customer Support",
                                icon: (
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                )
                            },
                        ].map((stat, i) => (
                            <div key={i} className="flex flex-col items-center">
                                <div className="text-amber-600 mb-4 transform group-hover:scale-110 transition-transform duration-700">
                                    {stat.icon}
                                </div>
                                <p className="text-3xl md:text-5xl font-black text-white mb-2">
                                    {stat.value}
                                </p>
                                <p className="text-[10px] font-black text-white/50 uppercase tracking-[3px]">{stat.label}</p>
                            </div>
                        ))}
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
