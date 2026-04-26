"use client";
import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { allProducts } from "@/data/products";

function ProductsManagementContent() {
    const searchParams = useSearchParams();
    const catFilter = searchParams.get("cat");
    
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedBrand, setSelectedBrand] = useState("All Brands");
    const [loading, setLoading] = useState(true);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const res = await fetch(`/api/products?category=${catFilter || ''}`);
            const data = await res.json();
            if (data.success) {
                setProducts(data.products);
            }
        } catch (error) {
            console.error("Failed to fetch products:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [catFilter]);
    
    const handleDelete = async (id, name) => {
        if (confirm(`Are you sure you want to delete "${name}"?`)) {
            try {
                const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
                const data = await res.json();
                if (data.success) {
                    setProducts(products.filter(p => (p._id !== id && p.id !== id)));
                } else {
                    alert("Delete failed: " + data.message);
                }
            } catch (error) {
                console.error("Delete Error:", error);
            }
        }
    };

    const filteredProducts = products.filter(p => {
        const matchesSearch = (p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             p.brand?.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesBrand = selectedBrand === "All Brands" || p.brand === selectedBrand;
        return matchesSearch && matchesBrand;
    });

    if (loading) return <div className="min-h-screen bg-gray-50 p-8 animate-pulse text-center">Loading Inventory...</div>;

    return (
        <div className="space-y-8 animate-fadeIn w-full px-4 sm:px-8 pb-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-brand-navy tracking-tight">
                        {catFilter ? `${catFilter.charAt(0).toUpperCase() + catFilter.slice(1)} Management` : "Product Management"}
                    </h1>
                    <p className="text-sm text-gray-500 font-medium">Manage your inventory, prices, and stock levels.</p>
                </div>
                <Link href="/admin/products/new" className="flex items-center gap-2 px-6 py-3 bg-brand-orange text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-brand-orange/20 hover:scale-105 transition-all">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Add New Product
                </Link>
            </div>

            {/* Filters & Search */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-1">
                    <input 
                        type="text" 
                        placeholder="Search by name or brand..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 border border-gray-100 focus:border-brand-orange focus:ring-0 text-sm transition-all"
                    />
                    <svg className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
                <div className="flex gap-2">
                    <select 
                        value={selectedBrand}
                        onChange={(e) => setSelectedBrand(e.target.value)}
                        className="bg-gray-50 border border-gray-100 text-xs font-bold p-2.5 rounded-xl text-gray-600 outline-none hover:border-brand-orange transition-colors cursor-pointer"
                    >
                        <option>All Brands</option>
                        {Array.from(new Set(products.map(p => p.brand))).filter(Boolean).map(brand => (
                            <option key={brand} value={brand}>{brand}</option>
                        ))}
                    </select>
                    <div className="bg-gray-50 border border-gray-100 text-[10px] font-black p-2.5 rounded-xl text-brand-orange uppercase tracking-widest">
                        Category: {catFilter || "All"}
                    </div>
                </div>
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50/50 text-[10px] font-black text-gray-400 tracking-widest uppercase border-b border-gray-100">
                            <tr>
                                <th className="px-8 py-5">Product Info</th>
                                <th className="px-8 py-5">Price & GST</th>
                                <th className="px-8 py-5">Stock</th>
                                <th className="px-8 py-5 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredProducts.map((p) => (
                                <tr key={p._id || p.id} className="hover:bg-gray-50/50 transition-all group">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-gray-50 rounded-xl overflow-hidden border border-gray-100 group-hover:border-brand-orange transition-colors shrink-0 flex items-center justify-center">
                                                <img 
                                                    src={p.image} 
                                                    alt={p.name} 
                                                    className="w-10 h-10 object-contain"
                                                    onError={(e) => {
                                                        e.target.src = "https://cdn-icons-png.flaticon.com/512/1170/1170577.png";
                                                        e.target.className = "w-6 h-6 opacity-20 grayscale";
                                                    }}
                                                />
                                            </div>
                                            <div className="flex flex-col min-w-0">
                                                <span className="text-sm font-black text-brand-navy truncate">{p.shortName || p.name || "Unnamed Product"}</span>
                                                <span className="text-[11px] text-brand-orange font-bold uppercase tracking-wider">{p.brand}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-black text-gray-800">₹{(p.salePrice || p.price || 0).toLocaleString()}</span>
                                            <span className="text-[10px] text-gray-400 font-bold">Incl. 18% GST</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-2">
                                            <span className={`w-2 h-2 rounded-full ${p.stock < 5 ? "bg-red-500 animate-pulse" : "bg-green-500"}`} />
                                            <span className="text-sm font-black text-brand-navy">{p.stock || 0} Units</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link 
                                                href={`/admin/products/edit/${p._id || p.id}`}
                                                className="p-2 text-gray-400 hover:text-brand-orange hover:bg-orange-50 rounded-lg transition-all"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                            </Link>
                                            <button 
                                                onClick={() => handleDelete(p._id || p.id, p.name)}
                                                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {filteredProducts.length === 0 && (
                                <tr>
                                    <td colSpan="4" className="px-8 py-12 text-center text-gray-400 font-black uppercase tracking-widest bg-gray-50/50">
                                        No products found in this category
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default function ProductsManagement() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-gray-50 p-8 animate-pulse" />}>
            <ProductsManagementContent />
        </Suspense>
    );
}
