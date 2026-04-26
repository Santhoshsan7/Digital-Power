"use client";
import Image from "next/image";

export default function SidebarOffer() {
    return (
        <div className="w-full h-full min-h-screen sticky top-0 md:top-[80px] group border-r border-white/10 shadow-2xl z-40">
            <div className="relative h-full w-full bg-gradient-to-b from-blue-900 via-blue-700 to-blue-900 overflow-hidden flex flex-col">

                {/* Background Effects */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 mix-blend-overlay"></div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full mix-blend-screen filter blur-[100px] opacity-20 animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500 rounded-full mix-blend-screen filter blur-[100px] opacity-20 animate-pulse delay-1000"></div>

                {/* Content Container */}
                <div className="relative h-full flex flex-col z-10 font-sans">

                    {/* Top Section - Brand Identity */}
                    <div className="p-8 pb-6 text-center bg-gradient-to-b from-white/10 to-transparent backdrop-blur-md border-b border-white/10 flex-shrink-0 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>

                        <h2 className="font-black drop-shadow-2xl uppercase leading-none tracking-widest active-text-glow">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-600 to-red-500 text-[2.8rem] block mb-1 filter drop-shadow-lg transform hover:scale-105 transition-transform duration-500">DIGITAL</span>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-600 to-red-500 text-[2.8rem] block mb-2 filter drop-shadow-lg transform hover:scale-105 transition-transform duration-500 delay-100">POWER</span>
                            <div className="flex flex-col items-center justify-center gap-1 mt-3">
                                <span className="text-white text-2xl tracking-[0.2em] font-light border-b border-white/20 pb-1">INVERTERS</span>
                                <span className="text-blue-200 text-xs font-bold tracking-widest uppercase opacity-80">Private Limited</span>
                            </div>
                        </h2>

                        <div className="mt-8 relative group cursor-pointer">
                            <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full blur opacity-40 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                            <div className="relative flex items-center justify-center gap-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-blue-900 px-6 py-3.5 rounded-full font-black shadow-xl transform group-hover:-translate-y-1 transition-all duration-300 border border-yellow-300">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20 15.5c-1.2 0-2.4-.2-3.6-.6-.3-.1-.7 0-1 .2l-2.2 2.2c-2.8-1.4-5.1-3.8-6.6-6.6l2.2-2.2c.3-.3.4-.7.2-1-.3-1.2-.5-2.3-.5-3.6 0-.6-.4-1-1-1H4c-.6 0-1 .4-1 1 0 9.4 7.6 17 17 17 .6 0 1-.4 1-1v-3.5c0-.6-.4-1-1-1zM19 12h2a9 9 0 00-9-9v2a7 7 0 017 7z" />
                                </svg>
                                <span className="text-2xl tracking-wide">94459 55555</span>
                            </div>
                        </div>
                    </div>

                    {/* Middle Section - Premium Features */}
                    <div className="flex-1 relative px-6 py-6 flex flex-col justify-center">
                        <div className="grid grid-cols-1 gap-5 relative z-10">
                            {[
                                {
                                    icon: (
                                        <svg className="w-8 h-8 text-yellow-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    ),
                                    title: "100% Genuine",
                                    desc: "Certified Original Products",
                                    bg: "from-green-500/20 to-green-900/20",
                                    border: "border-green-500/30"
                                },
                                {
                                    icon: (
                                        <svg className="w-8 h-8 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    ),
                                    title: "24/7 Support",
                                    desc: "Always Available For You",
                                    bg: "from-blue-500/20 to-blue-900/20",
                                    border: "border-blue-500/30"
                                },
                                {
                                    icon: (
                                        <svg className="w-8 h-8 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                    ),
                                    title: "Best Prices",
                                    desc: "Market Beating Value",
                                    bg: "from-purple-500/20 to-purple-900/20",
                                    border: "border-purple-500/30"
                                }
                            ].map((item, index) => (
                                <div key={index} className={`relative group flex items-center gap-5 p-4 rounded-2xl border ${item.border} bg-gradient-to-r ${item.bg} backdrop-blur-xl hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] cursor-default shadow-lg hover:shadow-2xl overflow-hidden`}>
                                    <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    <div className="bg-white/10 p-3 rounded-xl backdrop-blur-md shadow-inner">
                                        {item.icon}
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-white font-bold text-lg leading-tight tracking-wide mb-1 group-hover:text-yellow-300 transition-colors">{item.title}</h4>
                                        <p className="text-blue-100 text-xs font-medium opacity-80">{item.desc}</p>
                                    </div>
                                    <div className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Bottom Section - Authorised Dealer Product Showcase */}
                    <div className="mt-auto p-0 pb-0 flex-shrink-0 relative">
                        {/* Premium Dark Stage */}
                        <div className="relative pt-8 pb-10 px-4 overflow-hidden" style={{ background: 'linear-gradient(180deg, #0c1a2e 0%, #0f2137 30%, #132d4a 60%, #0a1929 100%)' }}>
                            {/* Top Gold Accent Line */}
                            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-amber-400/60 to-transparent"></div>

                            {/* Ambient Glow */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-32 rounded-full blur-[60px]" style={{ background: 'radial-gradient(ellipse, rgba(251,191,36,0.15) 0%, rgba(59,130,246,0.08) 50%, transparent 70%)' }}></div>

                            {/* Grid Pattern */}
                            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

                            <div className="relative">
                                <h3 className="text-center mb-6 font-bold text-sm tracking-[0.3em] uppercase drop-shadow-md flex items-center justify-center gap-4">
                                    <span className="h-[1px] w-10 bg-gradient-to-r from-transparent to-amber-400/50"></span>
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-white to-amber-200">Authorised Dealer</span>
                                    <span className="h-[1px] w-10 bg-gradient-to-l from-transparent to-amber-400/50"></span>
                                </h3>

                                {/* Scrolling Products Marquee */}
                                <div className="relative h-28 w-full overflow-hidden mask-fade-sides">
                                    <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center">
                                        <div className="flex gap-8 animate-marquee whitespace-nowrap items-center px-4">
                                            {/* Repeating diverse product images for marquee effect */}
                                            {[
                                                "/images/products/luminous-redcharge-18000-front-transparent.png",
                                                "/images/products/amaron-current-150ah-front-transparent.png",
                                                "/images/products/exide-tube-master-tm500-front-transparent.png",
                                                "/images/products/luminous-iltt-18060-front-transparent.png",
                                                "/images/products/microtek-durasmart-150ah-front-transparent.png",
                                                "/images/products/Luminous Shakti Charge SC12054-transparent.png",
                                                "/images/products/eastman-150ah-front-transparent.png",
                                                "/images/products/massimo-150ah-front-transparent.png",
                                                "/images/products/exide-sf-sonic-88ah-front-transparent.png"
                                            ].map((src, i) => (
                                                <div key={i} className="w-24 h-24 relative flex-shrink-0 filter drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)] transform hover:scale-125 hover:-translate-y-2 transition-all duration-500 z-10 hover:z-20 cursor-pointer">
                                                    <Image
                                                        src={src}
                                                        alt={`Product ${i}`}
                                                        fill
                                                        className="object-contain"
                                                    />
                                                </div>
                                            ))}
                                            {/* Duplicate set for seamless loop */}
                                            {[
                                                "/images/products/luminous-redcharge-18000-front-transparent.png",
                                                "/images/products/amaron-current-150ah-front-transparent.png",
                                                "/images/products/exide-tube-master-tm500-front-transparent.png",
                                                "/images/products/luminous-iltt-18060-front-transparent.png",
                                                "/images/products/microtek-durasmart-150ah-front-transparent.png",
                                                "/images/products/Luminous Shakti Charge SC12054-transparent.png",
                                                "/images/products/eastman-150ah-front-transparent.png",
                                                "/images/products/massimo-150ah-front-transparent.png",
                                                "/images/products/exide-sf-sonic-88ah-front-transparent.png"
                                            ].map((src, i) => (
                                                <div key={`dup-${i}`} className="w-24 h-24 relative flex-shrink-0 filter drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)] transform hover:scale-125 hover:-translate-y-2 transition-all duration-500 z-10 hover:z-20 cursor-pointer">
                                                    <Image
                                                        src={src}
                                                        alt={`Product ${i}`}
                                                        fill
                                                        className="object-contain"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <style jsx>{`
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-marquee {
                    animation: marquee 20s linear infinite;
                }
                .mask-fade-sides {
                    mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
                    -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
                }
                .active-text-glow {
                     text-shadow: 0 0 20px rgba(239, 68, 68, 0.5);
                }
            `}</style>
        </div>
    );
}
