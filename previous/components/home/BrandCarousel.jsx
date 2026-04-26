"use client";

import Image from "next/image";

const brands = [
    { name: "Microtek", src: "/images/brands/Pic 2.png" },
    { name: "Amaron", src: "/images/brands/Pic 3.png" },
    { name: "Luminous", src: "/images/brands/pic 4.png" },
    { name: "Eastman", src: "/images/brands/Pic 5.png" },
    { name: "Massimo", src: "/images/brands/Pic 1.png" },
    { name: "Luminous", src: "/images/brands/Pic 6.png" },
];

export default function BrandCarousel() {
    return (
        <section className="py-16 bg-gray-50 overflow-hidden">

            {/* Authorized Partner Title - Centered */}
            <div className="max-w-7xl mx-auto px-4 md:px-6 mb-10">
                <div className="text-center">
                    <p className="text-lg font-bold text-gray-400 uppercase tracking-widest">Authorized Premium Partner</p>
                </div>
            </div>

            {/* Carousel - Full Width End-to-End */}
            <div className="mb-10 md:mb-14 w-full">
                <div className="flex animate-infinite-scroll gap-16 md:gap-24 items-center w-max">
                    {/* Increased duplication to ensure continuous flow on large screens */}
                    {[...brands, ...brands, ...brands, ...brands, ...brands, ...brands].map((brand, index) => (
                        <div
                            key={`${brand.name}-${index}`}
                            className="flex-shrink-0 flex items-center justify-center p-4 hover:scale-110 transition-all duration-300"
                        >
                            <div className="relative h-12 w-32 md:h-16 md:w-48 transition-all duration-500">
                                <Image
                                    src={brand.src}
                                    alt={brand.name}
                                    fill
                                    className="object-contain"
                                    sizes="(max-width: 768px) 128px, 192px"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>


            <style jsx global>{`
                @keyframes infinite-scroll {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-infinite-scroll {
                    animation: infinite-scroll 40s linear infinite;
                    width: max-content;
                }
                .animate-infinite-scroll:hover {
                    animation-play-state: paused;
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fadeIn {
                    animation: fadeIn 1s ease-out forwards;
                }
            `}</style>
        </section>
    );
}
