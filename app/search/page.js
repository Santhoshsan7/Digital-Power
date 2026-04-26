"use client";
import { Suspense, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import { allProducts } from "@/data/products";

function SearchResults() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState("");
    const [displayQuery, setDisplayQuery] = useState("");
    const [isMounted, setIsMounted] = useState(false);

    // Handle "Page refresh must reset search state" logic
    useEffect(() => {
        setIsMounted(true);
        // Only set state from URL if it's a fresh navigation (not a refresh ideally, but we can't easily detect)
        // For now, we respect the URL for navigation from Header, BUT we ensure strict emptiness if no URL.
        const q = searchParams.get("q") || "";
        setSearchTerm(q);
        setDisplayQuery(q);

        // strict filter: if empty, ensure we don't show random stuff.
    }, [searchParams]);

    const handleSearch = (e) => {
        e.preventDefault();
        const term = searchTerm.trim();
        if (term) {
            router.push(`/search?q=${encodeURIComponent(term)}`);
        } else {
            // If empty, clear results
            router.push('/search');
        }
    };

    // Strict Filtering Logic
    const filteredProducts = displayQuery.trim() ? allProducts.filter((product) => {
        const lowerQuery = displayQuery.toLowerCase();
        // 1. Strict Name Match Only (Case-insensitive)
        return product.name.toLowerCase().includes(lowerQuery);
    }).sort((a, b) => {
        const lowerQuery = displayQuery.toLowerCase();
        const aName = a.name.toLowerCase();
        const bName = b.name.toLowerCase();

        // 1. Priority: Starts with Query
        const aStarts = aName.startsWith(lowerQuery);
        const bStarts = bName.startsWith(lowerQuery);
        if (aStarts && !bStarts) return -1;
        if (!aStarts && bStarts) return 1;

        // 2. Priority: Contains Word starting with Query (" Zelio")
        const aWordStart = aName.includes(" " + lowerQuery);
        const bWordStart = bName.includes(" " + lowerQuery);
        if (aWordStart && !bWordStart) return -1;
        if (!aWordStart && bWordStart) return 1;

        // 3. Priority: Alphabetical
        return aName.localeCompare(bName);
    }) : [];

    if (!isMounted) return null;

    return (
        <>

            {/* Results Header - Only show if query exists */}
            {displayQuery && (
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-brand-navy">
                            Search Results for <span className="text-brand-orange">"{displayQuery}"</span>
                        </h1>
                        <p className="text-gray-500 text-sm mt-1">
                            Found {filteredProducts.length} products
                        </p>
                    </div>
                </div>
            )}

            {/* Results Grid */}
            {displayQuery ? (
                filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
                        <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                            <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">No products found</h2>
                        <p className="text-gray-500 mb-8 max-w-md">
                            We couldn't find any products matching "{displayQuery}". Try checking your spelling or using different keywords.
                        </p>
                        <button
                            onClick={() => { setSearchTerm(""); setDisplayQuery(""); router.push('/search'); }}
                            className="bg-brand-orange hover:bg-brand-orange-dark text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg shadow-brand-orange/20 hover:-translate-y-1"
                        >
                            Clear Search
                        </button>
                    </div>
                )
            ) : (
                <div className="text-center py-20 text-gray-400">
                    <p>Enter a product name to search</p>
                </div>
            )}
        </>
    );
}

export default function SearchPage() {
    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <Suspense fallback={<div className="text-center py-12">Loading...</div>}>
                    <SearchResults />
                </Suspense>
            </div>
        </div>
    );
}
