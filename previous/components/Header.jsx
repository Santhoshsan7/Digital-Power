"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCart } from "@/lib/CartContext";
import { useWishlist } from "@/lib/WishlistContext";
import { allProducts } from "@/data/products";

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [menuDropdownOpen, setMenuDropdownOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    const searchParams = useSearchParams();
    const router = useRouter();

    const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
    const dropdownRef = useRef(null);
    const { getCartCount, setIsCartOpen } = useCart();
    const { getWishlistCount } = useWishlist();

    const [suggestions, setSuggestions] = useState([]);
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const searchRef = useRef(null);
    const mobileSearchRef = useRef(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        setSearchQuery(searchParams.get("q") || "");
    }, [searchParams]);

    const cartCount = getCartCount();
    const wishlistCount = getWishlistCount();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setMenuDropdownOpen(false);
            }
            if (searchRef.current && !searchRef.current.contains(event.target) &&
                mobileSearchRef.current && !mobileSearchRef.current.contains(event.target)) {
                setIsSearchFocused(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        if (query.trim().length > 0) {
            const lowerQuery = query.toLowerCase();
            const filtered = allProducts.filter(p =>
                p.name?.toLowerCase().includes(lowerQuery)
            ).sort((a, b) => {
                const aName = a.name?.toLowerCase() || '';
                const bName = b.name?.toLowerCase() || '';
                const aStarts = aName.startsWith(lowerQuery);
                const bStarts = bName.startsWith(lowerQuery);
                if (aStarts && !bStarts) return -1;
                if (!aStarts && bStarts) return 1;
                const aWordStart = aName.includes(" " + lowerQuery);
                const bWordStart = bName.includes(" " + lowerQuery);
                if (aWordStart && !bWordStart) return -1;
                if (!aWordStart && bWordStart) return 1;
                return aName.indexOf(lowerQuery) - bName.indexOf(lowerQuery);
            }).slice(0, 5);
            setSuggestions(filtered);
            setIsSearchFocused(true);
        } else {
            setSuggestions([]);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
            setIsSearchFocused(false);
        }
    };

    const getProductUrl = (product) => {
        const category = product.category?.toLowerCase();
        if (category === 'battery') return `/batteries/product/${product.id}`;
        if (category === 'online ups') return `/online-ups/product/${product.id}`;
        if (category === 'combo') return `/combo-offer/product/${product.id}`;
        return `/inverter/product/${product.id}`;
    };

    const mainMenuItems = [
        { name: "Home", href: "/" },
    ];

    const dropdownItems = [
        {
            name: "Inverters",
            href: "/inverter",
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            )
        },
        {
            name: "Batteries",
            href: "/batteries",
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
            )
        },
        {
            name: "Online UPS",
            href: "/online-ups",
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            ),
            subItems: [
                { name: "Digital", href: "/online-ups?brand=Digital" },
                { name: "Luminous", href: "/online-ups?brand=Luminous" }
            ]
        },
        {
            name: "Combo Offers",
            href: "/combo-offer",
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            highlight: true
        },
        {
            name: "Services",
            href: "/services",
            icon: (
                <svg className="w-5 h-5 text-brand-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                </svg>
            )
        },
    ];

    const secondaryMenuItems = [
        { name: "About Us", href: "/about" },
        { name: "Contact", href: "/contact" },
    ];

    const [expandedMobileItem, setExpandedMobileItem] = useState(null);

    const toggleMobileSubMenu = (name) => {
        setExpandedMobileItem(expandedMobileItem === name ? null : name);
    };

    const allMobileNavItems = [
        ...mainMenuItems,
        ...dropdownItems,
        ...secondaryMenuItems,
    ];

    // Search suggestions dropdown component
    const SearchSuggestions = ({ containerClass = "", isMobile = false }) => (
        isSearchFocused && searchQuery.length > 0 && (
            <div className={`
                ${isMobile 
                    ? "relative w-full mt-4 bg-white border-0 shadow-none scrollbar-hide" 
                    : "absolute top-full left-0 right-0 mt-1 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden"
                } z-50 ${containerClass}
            `}>
                <div className={`${isMobile ? "px-0" : "p-0"}`}>
                    {suggestions.length > 0 ? (
                        <>
                            <div className={`${isMobile ? "mb-2 px-1 text-[10px] font-bold text-gray-400 uppercase tracking-wider" : "hidden"}`}>
                                Product Suggestions
                            </div>
                            {suggestions.map((product) => (
                                <Link
                                    key={product.id}
                                    href={getProductUrl(product)}
                                    onClick={() => {
                                        setIsSearchFocused(false);
                                        setMobileMenuOpen(false);
                                    }}
                                    className={`flex items-center gap-4 p-3 hover:bg-gray-50 transition-all border-b border-gray-50 last:border-0 ${isMobile ? "rounded-xl bg-gray-50/50 mb-2 border-0" : ""}`}
                                >
                                    <div className="bg-white p-1 rounded-lg w-12 h-12 flex items-center justify-center flex-shrink-0 shadow-sm border border-gray-100">
                                        <Image
                                            src={product.image}
                                            alt={product.name}
                                            width={48}
                                            height={48}
                                            className="w-full h-full object-contain"
                                        />
                                    </div>
                                    <div className="flex flex-col min-w-0 flex-1">
                                        <span className="text-sm font-bold text-brand-navy truncate">
                                            {product.name}
                                        </span>
                                        <div className="flex items-center gap-2 mt-0.5">
                                            <span className="text-[10px] font-bold text-brand-orange bg-brand-orange/5 px-1.5 py-0.5 rounded">
                                                {product.category}
                                            </span>
                                            <span className="text-[10px] font-bold text-green-600">
                                                ₹{product.salePrice?.toLocaleString()}
                                            </span>
                                        </div>
                                    </div>
                                    <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                    </svg>
                                </Link>
                            ))}
                            <Link
                                href={`/search?q=${encodeURIComponent(searchQuery)}`}
                                onClick={() => {
                                    setIsSearchFocused(false);
                                    setMobileMenuOpen(false);
                                }}
                                className="flex items-center justify-center gap-2 w-full p-4 mt-2 text-sm font-black text-white bg-brand-orange rounded-xl hover:bg-brand-orange-dark transition-all shadow-lg shadow-brand-orange/20"
                            >
                                <span>View all results</span>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Link>
                        </>
                    ) : (
                        <div className="py-12 flex flex-col items-center justify-center text-center px-6">
                            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                                <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <h3 className="text-gray-800 font-bold">No results for "{searchQuery}"</h3>
                            <p className="text-xs text-gray-500 mt-1 italic">Try checking for typos or use a more general term</p>
                        </div>
                    )}
                </div>
            </div>
        )
    );

    return (
        <header
            className={`sticky top-0 z-50 transition-all duration-300 bg-white ${isScrolled
                ? "shadow-xl"
                : "shadow-md"
                }`}
        >
            {/* ===== MAIN HEADER ROW ===== */}
            <div className="max-w-[1400px] mx-auto px-3 sm:px-4 md:px-6">
                <div className="flex items-center justify-between h-14 lg:h-[4.5rem] gap-3 lg:gap-6">

                    {/* LEFT: Logo */}
                    <Link href="/" className="flex-shrink-0 flex items-center group">
                        <Image
                            src="/images/logo.png"
                            alt="Digital Power Inverters Logo"
                            width={200}
                            height={60}
                            priority
                            className="h-10 sm:h-11 lg:h-14 w-auto object-contain"
                        />
                    </Link>

                    {/* CENTER: Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-1 xl:gap-2 flex-shrink-0">
                        {mainMenuItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="px-3 xl:px-4 py-2 rounded-lg text-sm font-semibold text-gray-700 hover:text-brand-navy hover:bg-gray-100 transition-all whitespace-nowrap"
                            >
                                {item.name}
                            </Link>
                        ))}

                        {/* Products Dropdown */}
                        <div
                            className="relative h-full flex items-center"
                            ref={dropdownRef}
                            onMouseEnter={() => setMenuDropdownOpen(true)}
                            onMouseLeave={() => setMenuDropdownOpen(false)}
                        >
                            <button
                                onClick={() => setMenuDropdownOpen(!menuDropdownOpen)}
                                className={`flex items-center gap-1.5 px-3 xl:px-4 py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${menuDropdownOpen
                                    ? "bg-brand-navy text-white"
                                    : "text-gray-700 hover:text-brand-navy hover:bg-gray-100"
                                    }`}
                            >
                                <span>Products</span>
                                <svg className={`w-3.5 h-3.5 transition-transform duration-200 ${menuDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {menuDropdownOpen && (
                                <div className="absolute top-full right-0 pt-3 w-64 z-50">
                                    <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 animate-fadeIn">
                                        <div className="p-2">
                                            {dropdownItems.map((item) => (
                                                <div key={item.name} className="group/item relative flex flex-col">
                                                    <Link
                                                        href={item.href}
                                                        onClick={(e) => {
                                                            if (!item.subItems) setMenuDropdownOpen(false);
                                                        }}
                                                        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${item.highlight
                                                            ? "bg-gradient-to-r from-brand-orange/10 to-brand-accent/5 text-brand-orange hover:from-brand-orange/20"
                                                            : "text-gray-700 hover:bg-gray-100 hover:text-brand-navy"
                                                            }`}
                                                    >
                                                        <span className="text-brand-orange">{item.icon}</span>
                                                        <span className="flex-1">{item.name}</span>
                                                        {item.subItems && (
                                                            <svg className="w-4 h-4 text-gray-400 group-hover/item:text-brand-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                                            </svg>
                                                        )}
                                                        {item.highlight && (
                                                            <span className="ml-auto text-[10px] font-bold bg-brand-orange text-white px-2 py-0.5 rounded-full">
                                                                HOT
                                                            </span>
                                                        )}
                                                    </Link>

                                                    {item.subItems && (
                                                        <div className="hidden group-hover/item:block absolute left-full top-0 pl-2 w-48 z-50">
                                                            <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden p-2 animate-fadeIn">
                                                                {item.subItems.map((sub) => (
                                                                    <Link
                                                                        key={sub.name}
                                                                        href={sub.href}
                                                                        onClick={() => setMenuDropdownOpen(false)}
                                                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-brand-orange rounded-lg transition-colors"
                                                                    >
                                                                        {sub.name}
                                                                    </Link>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {secondaryMenuItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="px-3 xl:px-4 py-2 rounded-lg text-sm font-semibold text-gray-700 hover:text-brand-navy hover:bg-gray-100 transition-all whitespace-nowrap"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </nav>

                    {/* RIGHT SECTION: Search (desktop) + Icons */}
                    <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">

                        {/* Desktop Search Bar - Prominent */}
                        <div className="hidden md:block relative" ref={searchRef}>
                            <form onSubmit={handleSearch} className="relative">
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                    onFocus={() => setIsSearchFocused(true)}
                                    className="w-52 lg:w-72 xl:w-80 pl-4 pr-11 py-2.5 rounded-full bg-gray-50 border-2 border-gray-200 focus:border-brand-orange focus:bg-white focus:ring-0 text-sm transition-all placeholder:text-gray-400"
                                />
                                <button type="submit" className="absolute right-1 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-brand-orange text-white flex items-center justify-center hover:bg-orange-600 transition-colors">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </button>
                            </form>
                            <SearchSuggestions />
                        </div>

                        {/* Divider */}
                        <div className="hidden lg:block w-px h-8 bg-gray-200"></div>

                        {/* Wishlist */}
                        <Link
                            href="/wishlist"
                            className="relative p-2 text-gray-500 hover:text-brand-orange rounded-full transition-all hover:bg-gray-100"
                            aria-label="Wishlist"
                        >
                            <svg className="w-[22px] h-[22px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                            {mounted && wishlistCount > 0 && (
                                <span className="absolute -top-0.5 -right-0.5 bg-brand-orange text-white text-[10px] font-bold min-w-[18px] h-[18px] rounded-full flex items-center justify-center">
                                    {wishlistCount}
                                </span>
                            )}
                        </Link>

                        {/* Cart */}
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                setIsCartOpen(true);
                            }}
                            className="relative p-2 text-gray-500 hover:text-brand-orange rounded-full transition-all hover:bg-gray-100"
                            aria-label="Open Cart"
                        >
                            <svg className="w-[22px] h-[22px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            {mounted && cartCount > 0 && (
                                <span className="absolute -top-0.5 -right-0.5 bg-brand-orange text-white text-[10px] font-bold min-w-[18px] h-[18px] rounded-full flex items-center justify-center">
                                    {cartCount}
                                </span>
                            )}
                        </button>

                        {/* Mobile Menu Button */}
                        <button
                            className="lg:hidden p-2 text-gray-700 hover:text-brand-orange hover:bg-gray-100 rounded-full transition-all"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            {mobileMenuOpen ? (
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>


            {/* ===== MOBILE NAVIGATION DRAWER ===== */}
            {/* Backdrop */}
            {mobileMenuOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/40 z-40 animate-fadeIn"
                    onClick={() => setMobileMenuOpen(false)}
                />
            )}

            <div
                className={`lg:hidden fixed top-0 right-0 h-full w-[280px] sm:w-[320px] bg-white z-50 transform transition-transform duration-300 ease-in-out shadow-2xl ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                {/* Drawer Header */}
                <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100 bg-brand-navy">
                    <span className="text-white font-bold text-base">Menu</span>
                    <button
                        onClick={() => setMobileMenuOpen(false)}
                        className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-all"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Drawer Content */}
                <nav className="py-2 overflow-y-auto h-[calc(100%-60px)]">
                    {/* Mobile Search - Now inside Drawer */}
                    <div className="px-5 py-3 border-b border-gray-50" ref={mobileSearchRef}>
                        <form onSubmit={handleSearch} className="relative">
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchQuery}
                                onChange={handleSearchChange}
                                onFocus={() => setIsSearchFocused(true)}
                                className="w-full pl-4 pr-11 py-2.5 rounded-xl bg-gray-50 border border-gray-200 focus:border-brand-orange focus:bg-white focus:ring-0 text-sm transition-all"
                            />
                            <button type="submit" className="absolute right-1 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-brand-orange text-white flex items-center justify-center">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </button>
                        </form>
                        <SearchSuggestions isMobile={true} />
                    </div>

                    <div className={`flex flex-col transition-all duration-300 ${isSearchFocused && searchQuery.length > 0 ? "hidden" : "block"}`}>
                        {allMobileNavItems.map((item) => (
                            <div key={item.name} className="flex flex-col">
                                <div className="flex items-center justify-between">
                                    <Link
                                        href={item.href}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className={`flex-1 flex items-center gap-3 px-5 py-3.5 text-sm font-semibold transition-all ${item.highlight
                                            ? "text-brand-orange bg-orange-50"
                                            : "text-gray-700 hover:bg-gray-50 hover:text-brand-navy"
                                            }`}
                                    >
                                        {item.icon && <span className="text-brand-orange">{item.icon}</span>}
                                        <span>{item.name}</span>
                                        {item.highlight && (
                                            <span className="text-[10px] font-bold bg-brand-orange text-white px-2 py-0.5 rounded-full ml-auto">
                                                HOT
                                            </span>
                                        )}
                                    </Link>
                                    {item.subItems && (
                                        <button
                                            onClick={() => toggleMobileSubMenu(item.name)}
                                            className="p-3 text-gray-400 hover:text-brand-orange"
                                        >
                                            <svg
                                                className={`w-4 h-4 transition-transform duration-300 ${expandedMobileItem === item.name ? "rotate-180" : ""}`}
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </button>
                                    )}
                                </div>

                                {item.subItems && (
                                    <div
                                        className={`overflow-hidden transition-all duration-300 ease-in-out ${expandedMobileItem === item.name ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}
                                    >
                                        <div className="bg-gray-50 mx-4 rounded-xl mb-1">
                                            {item.subItems.map((sub) => (
                                                <Link
                                                    key={sub.name}
                                                    href={sub.href}
                                                    onClick={() => setMobileMenuOpen(false)}
                                                    className="block px-5 py-2.5 text-sm text-gray-600 hover:text-brand-orange hover:bg-gray-100 first:rounded-t-xl last:rounded-b-xl"
                                                >
                                                    {sub.name}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Drawer Footer */}
                    <div className="mt-4 pt-4 border-t border-gray-100 px-5 space-y-3">
                        <a
                            href="tel:9445955555"
                            className="flex items-center justify-center gap-3 w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-xl font-bold shadow-lg shadow-green-500/30 text-sm"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            <span>Call: 94459 55555</span>
                        </a>
                    </div>
                </nav>
            </div>
        </header>
    );
}
