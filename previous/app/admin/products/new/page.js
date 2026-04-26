"use client";
import { useState } from "react";
import Link from "next/link";

export default function NewProductPage() {
    const [formData, setFormData] = useState({
        name: "",
        brand: "Luminous",
        category: "Inverters",
        price: "",
        gst: "18%",
        stock: "",
        imageUrl: "",
        description: ""
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Product entry simulated. In a live system, this would save to the DB.");
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn pb-12">
            <nav className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gray-400">
                <Link href="/admin/products" className="hover:text-brand-orange">Products</Link>
                <span>/</span>
                <span className="text-brand-navy">Add New</span>
            </nav>

            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-black text-brand-navy tracking-tight">Add New Product</h1>
                    <p className="text-sm text-gray-500 font-medium">Create a new entry in your digital catalog.</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Column - General Info */}
                <div className="space-y-6">
                    <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 space-y-5">
                        <h2 className="text-sm font-black text-gray-400 uppercase tracking-widest border-b border-gray-50 pb-4">General Information</h2>
                        
                        <div className="space-y-2">
                            <label className="text-xs font-black text-brand-navy uppercase tracking-wider">Product Name</label>
                            <input 
                                required
                                type="text" 
                                placeholder="e.g. Luminous Zelio 1100"
                                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:border-brand-orange focus:ring-0 text-sm font-bold"
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-xs font-black text-brand-navy uppercase tracking-wider">Brand</label>
                                <select className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:border-brand-orange focus:ring-0 text-sm font-bold">
                                    <option>Luminous</option>
                                    <option>Microtek</option>
                                    <option>Exide</option>
                                    <option>Amaron</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-black text-brand-navy uppercase tracking-wider">Category</label>
                                <select className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:border-brand-orange focus:ring-0 text-sm font-bold">
                                    <option>Inverters</option>
                                    <option>Batteries</option>
                                    <option>Combos</option>
                                    <option>Solar</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-black text-brand-navy uppercase tracking-wider">Description</label>
                            <textarea 
                                rows="4"
                                placeholder="Briefly describe the product features..."
                                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:border-brand-orange focus:ring-0 text-sm font-bold resize-none"
                            />
                        </div>
                    </div>

                    <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 space-y-5">
                        <h2 className="text-sm font-black text-gray-400 uppercase tracking-widest border-b border-gray-50 pb-4">Media</h2>
                        <div className="space-y-2">
                            <label className="text-xs font-black text-brand-navy uppercase tracking-wider">Product Image URL</label>
                            <input 
                                type="text" 
                                placeholder="Paste image path or URL..."
                                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:border-brand-orange focus:ring-0 text-sm font-bold"
                            />
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest pt-1 italic">Prefer square high-resolution images (PNG/JPG)</p>
                        </div>
                    </div>
                </div>

                {/* Right Column - Inventory & Pricing */}
                <div className="space-y-6">
                    <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 space-y-5">
                        <h2 className="text-sm font-black text-gray-400 uppercase tracking-widest border-b border-gray-50 pb-4">Inventory & Pricing</h2>
                        
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-xs font-black text-brand-navy uppercase tracking-wider">Price (Base)</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-black text-xs">₹</span>
                                    <input 
                                        type="number" 
                                        placeholder="0.00"
                                        className="w-full pl-8 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:border-brand-orange focus:ring-0 text-sm font-bold"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-black text-brand-navy uppercase tracking-wider">GST (%)</label>
                                <input 
                                    type="text" 
                                    defaultValue="18%"
                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:border-brand-orange focus:ring-0 text-sm font-bold"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-black text-brand-navy uppercase tracking-wider">Current Stock</label>
                            <input 
                                type="number" 
                                placeholder="Available units"
                                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:border-brand-orange focus:ring-0 text-sm font-bold"
                            />
                        </div>

                        <div className="pt-6 flex flex-col gap-3">
                            <button type="submit" className="w-full py-4 bg-brand-orange text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-brand-orange/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
                                Publish Product
                            </button>
                            <Link href="/admin/products" className="w-full py-4 bg-gray-50 text-gray-400 rounded-2xl text-[10px] font-black uppercase tracking-widest text-center hover:bg-gray-100 transition-all border border-transparent hover:border-gray-200">
                                Discard & Cancel
                            </Link>
                        </div>
                    </div>

                    {/* Stock Rules Reminder */}
                    <div className="bg-brand-navy text-white p-8 rounded-3xl shadow-xl shadow-brand-navy/20">
                         <h3 className="text-lg font-black mb-4 tracking-tight">Stock Rule Reminder</h3>
                         <ul className="space-y-3 text-xs text-white/60 font-medium">
                            <li className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                                <span>Stock &lt; 3: **Critical Red Alert**</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                                <span>Stock &lt; 5: **Low Stock Warning**</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                                <span>Stock ≥ 5: **Safe Status**</span>
                            </li>
                         </ul>
                    </div>
                </div>
            </form>
        </div>
    );
}
