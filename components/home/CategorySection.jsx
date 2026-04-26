import Image from "next/image";
import Link from "next/link";

export default function CategorySection() {
    const categories = [
        {
            name: "Inverters",
            description: "Home & Commercial Inverters",
            image: "/images/categories/inverter-cat.png",
            href: "/inverter",
            count: "50+ Products",
            icon: "⚡"
        },
        {
            name: "Batteries",
            description: "Tubular & Flat Plate Batteries",
            image: "/images/categories/battery-cat.png",
            href: "/batteries",
            count: "40+ Products",
            icon: "🔋"
        },
        {
            name: "Online UPS",
            description: "Business Grade UPS",
            image: "/images/categories/ups-cat.png",
            href: "/online-ups",
            count: "30+ Products",
            icon: "🔌"
        },
        {
            name: "Combo Offers",
            description: "Inverter + Battery Deals",
            image: "/images/categories/combo-cat.png",
            href: "/combo-offer",
            count: "Special Deals",
            icon: "🎁"
        },
    ];

    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 md:px-8">

                {/* Header */}
                <div className="text-center mb-12">
                    <span className="font-bold uppercase text-sm tracking-wider" style={{ color: '#F57C00' }}>
                        Shop by Category
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold mt-2" style={{ color: '#0B3C5D' }}>
                        Power Solutions for Every Need
                    </h2>
                </div>

                {/* Categories */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {categories.map((cat, i) => (
                        <Link
                            key={i}
                            href={cat.href}
                            className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden transition-all duration-300 border border-gray-100 hover:border-brand-orange"
                        >
                            {/* IMAGE */}
                            <div className="relative h-48 overflow-hidden">
                                <Image
                                    src={cat.image}
                                    alt={cat.name}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                {/* Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/60 to-transparent"></div>
                                {/* Icon Badge */}
                                <div className="absolute top-4 right-4 w-12 h-12 bg-white rounded-full flex items-center justify-center text-2xl shadow-lg">
                                    {cat.icon}
                                </div>
                            </div>

                            {/* TEXT */}
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-brand-navy mb-1 group-hover:text-brand-orange transition">
                                    {cat.name}
                                </h3>
                                <p className="text-gray-600 text-sm mb-3">
                                    {cat.description}
                                </p>
                                <div className="flex items-center justify-between">
                                    <span className="text-brand-orange font-semibold text-sm">
                                        {cat.count}
                                    </span>
                                    <span className="bg-brand-navy group-hover:bg-brand-orange text-white px-3 py-1 rounded-full text-sm font-semibold transition">
                                        Shop →
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
