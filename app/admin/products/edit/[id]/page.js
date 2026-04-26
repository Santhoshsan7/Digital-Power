"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
// Removed legacy allProducts import

export default function EditProductPage() {
    const params = useParams();
    const router = useRouter();
    const [mounted, setMounted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [formData, setFormData] = useState({
        name: "",
        brand: "Luminous",
        category: "Inverters",
        price: 0,
        gst: "18%",
        stock: 0,
        imageUrl: "",
        description: ""
    });

    useEffect(() => {
        setMounted(true);
        const fetchProduct = async () => {
            try {
                const res = await fetch(`/api/products/${params.id}`);
                const data = await res.json();
                if (data.success) {
                    const product = data.product;
                    setFormData({
                        name: product.name,
                        brand: product.brand,
                        category: product.category,
                        price: product.salePrice || product.price,
                        gst: product.gst || "18%",
                        stock: product.stock || 0,
                        imageUrl: product.image,
                        description: product.description || ""
                    });
                }
            } catch (error) {
                console.error("Fetch Error:", error);
            } finally {
                setFetching(false);
            }
        };
        fetchProduct();
    }, [params.id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await fetch(`/api/products/${params.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            if (data.success) {
                alert("Product updated successfully!");
                router.push("/admin/products");
            } else {
                alert("Update failed: " + data.message);
            }
        } catch (error) {
            console.error("Update Error:", error);
            alert("Failed to connect to API");
        } finally {
            setLoading(false);
        }
    };

    if (!mounted || fetching) return <div className="min-h-screen bg-gray-50 flex items-center justify-center font-black text-brand-navy lowercase tracking-widest animate-pulse">Syncing Product Data...</div>;

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn pb-12">
            <nav className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gray-400">
                <Link href="/admin/products" className="hover:text-brand-orange">Products</Link>
                <span>/</span>
                <span className="text-brand-navy">Edit Product</span>
            </nav>

            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-black text-brand-navy tracking-tight">Edit Product</h1>
                    <p className="text-sm text-gray-500 font-medium">Update details for {formData.name}</p>
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
                                value={formData.name}
                                placeholder="e.g. Luminous Zelio 1100"
                                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:border-brand-orange focus:ring-0 text-sm font-bold"
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-xs font-black text-brand-navy uppercase tracking-wider">Brand</label>
                                <select 
                                    value={formData.brand}
                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:border-brand-orange focus:ring-0 text-sm font-bold"
                                    onChange={(e) => setFormData({...formData, brand: e.target.value})}
                                >
                                    <option>Luminous</option>
                                    <option>Microtek</option>
                                    <option>Exide</option>
                                    <option>Amaron</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-black text-brand-navy uppercase tracking-wider">Category</label>
                                <select 
                                    value={formData.category}
                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:border-brand-orange focus:ring-0 text-sm font-bold"
                                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                                >
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
                                value={formData.description}
                                placeholder="Briefly describe the product features..."
                                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:border-brand-orange focus:ring-0 text-sm font-bold resize-none"
                                onChange={(e) => setFormData({...formData, description: e.target.value})}
                            />
                        </div>
                    </div>

                    <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 space-y-5">
                        <h2 className="text-sm font-black text-gray-400 uppercase tracking-widest border-b border-gray-50 pb-4">Media</h2>
                        <div className="space-y-2">
                            <label className="text-xs font-black text-brand-navy uppercase tracking-wider">Product Image URL</label>
                            <input 
                                type="text" 
                                value={formData.imageUrl}
                                placeholder="Paste image path or URL..."
                                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:border-brand-orange focus:ring-0 text-sm font-bold"
                                onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                            />
                            {formData.imageUrl && (
                                <div className="mt-4 p-2 border border-gray-100 rounded-xl bg-gray-50 flex items-center justify-center">
                                    <img src={formData.imageUrl} alt="Preview" className="h-32 object-contain" />
                                </div>
                            )}
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
                                        value={formData.price}
                                        placeholder="0.00"
                                        className="w-full pl-8 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:border-brand-orange focus:ring-0 text-sm font-bold"
                                        onChange={(e) => setFormData({...formData, price: e.target.value})}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-black text-brand-navy uppercase tracking-wider">GST (%)</label>
                                <input 
                                    type="text" 
                                    value={formData.gst}
                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:border-brand-orange focus:ring-0 text-sm font-bold"
                                    onChange={(e) => setFormData({...formData, gst: e.target.value})}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-black text-brand-navy uppercase tracking-wider">Current Stock</label>
                            <input 
                                type="number" 
                                value={formData.stock}
                                placeholder="Available units"
                                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:border-brand-orange focus:ring-0 text-sm font-bold"
                                onChange={(e) => setFormData({...formData, stock: e.target.value})}
                            />
                        </div>

                        <div className="pt-6 flex flex-col gap-3">
                            <button type="submit" className="w-full py-4 bg-brand-orange text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-brand-orange/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
                                Update Product
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
