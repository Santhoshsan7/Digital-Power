import Link from "next/link";
import Image from "next/image";

export default function BrandSection() {
  const brands = [
    {
      name: "Massimo",
      tagline: "Premium Inverters",
      src: "/images/brands/Pic 1.png",
      color: "from-red-500/10 to-red-600/5"
    },
    {
      name: "Eastman",
      tagline: "High Quality Solar",
      src: "/images/brands/Pic 2.png",
      color: "from-blue-500/10 to-blue-600/5"
    },
    {
      name: "Amaron",
      tagline: "Hi-Life Batteries",
      src: "/images/brands/Pic 3.png",
      color: "from-green-500/10 to-green-600/5"
    },
    {
      name: "Luminous",
      tagline: "Trusted Quality",
      src: "/images/brands/pic 4.png",
      color: "from-orange-500/10 to-orange-600/5"
    },
    {
      name: "Microtek",
      tagline: "India's No.1 Brand",
      src: "/images/brands/pic 5.png",
      color: "from-purple-500/10 to-purple-600/5"
    },
    {
      name: "Exide",
      tagline: "Power You Can Trust",
      src: "/images/brands/Pic 6.png",
      color: "from-teal-500/10 to-teal-600/5"
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block font-bold text-sm uppercase tracking-wider mb-2 text-brand-orange">
            Our Partners
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-brand-navy">
            Trusted Power Brands
          </h2>
          <p className="text-lg max-w-2xl mx-auto text-gray-600">
            We partner with India's leading power solution manufacturers
          </p>
        </div>

        {/* Brand Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {brands.map((brand, index) => (
            <Link
              key={index}
              href={`/brands/${brand.name.toLowerCase()}`}
              className="group bg-gray-50/50 rounded-2xl p-6 text-center hover:bg-white transition-all duration-300 border border-gray-100 hover:border-brand-orange hover:shadow-xl"
            >
              {/* Logo */}
              <div className={`relative w-20 h-10 mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <Image
                  src={brand.src}
                  alt={brand.name}
                  fill
                  className="object-contain"
                />
              </div>

              {/* Name */}
              <h3 className="font-bold text-brand-navy text-lg mb-1 transition-colors">
                {brand.name}
              </h3>
              <p className="text-gray-400 group-hover:text-gray-600 text-[10px] uppercase font-bold tracking-tight transition-colors">
                {brand.tagline}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
