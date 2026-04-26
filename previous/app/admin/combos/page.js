"use client";

export default function ComboOffersManagement() {
    const combos = [
        { name: "Microtek E2 Super Saver", products: "Luxe 800 + Exide 150AH", price: "₹22,500", savings: "₹1,500", status: "Active" },
        { name: "Luminous Solar Power Duo", products: "Solar Inverter + 200AH Battery", price: "₹65,000", savings: "₹5,000", status: "Active" },
        { name: "Emergency Light Combo", products: "700VA Inverter + 100AH Battery", price: "₹14,000", savings: "₹800", status: "Draft" },
    ];

    return (
        <div className="space-y-8 animate-fadeIn w-full px-4 sm:px-8 pb-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-brand-navy tracking-tight">Combo Offers Management</h1>
                    <p className="text-sm text-gray-500 font-medium">Create and manage high-value product bundles.</p>
                </div>
                <button className="flex items-center gap-2 px-6 py-3 bg-brand-orange text-white rounded-xl text-xs font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-brand-orange/20">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    New Combo Deal
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {combos.map((c, i) => (
                    <div key={i} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all group overflow-hidden relative">
                         <div className={`absolute top-0 right-0 px-4 py-1.5 rounded-bl-xl text-[9px] font-black uppercase tracking-wider text-white ${c.status === 'Active' ? 'bg-green-500' : 'bg-gray-400'}`}>
                            {c.status}
                        </div>
                        <div className="space-y-4 pt-2">
                             <div className="w-12 h-12 bg-brand-orange/10 rounded-2xl flex items-center justify-center text-brand-orange">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                                </svg>
                             </div>
                             <div className="space-y-1">
                                <h3 className="text-lg font-black text-brand-navy leading-tight">{c.name}</h3>
                                <p className="text-xs text-gray-400 font-medium">{c.products}</p>
                             </div>
                             <div className="pt-4 flex items-end justify-between border-t border-gray-50">
                                <div className="space-y-1">
                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Offer Price</p>
                                    <p className="text-2xl font-black text-brand-orange">{c.price}</p>
                                </div>
                                <span className="text-[10px] font-black text-green-600 bg-green-50 px-2 py-1 rounded">Save {c.savings}</span>
                             </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
