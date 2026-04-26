"use client";
import { useState } from "react";

export default function InventoryManagement() {
    const [filter, setFilter] = useState("All");

    const inventoryItems = [
        { name: "Luminous Zelio 1100", category: "Inverter", stock: 12, status: "OK" },
        { name: "Exide 150AH Tall Tubular", category: "Battery", stock: 10, status: "OK" },
        { name: "Microtek Luxe 800", category: "Inverter", stock: 2, status: "Critical" },
        { name: "Luminous Red Charge 15000", category: "Battery", stock: 4, status: "Low" },
        { name: "Amaron Current 150AH", category: "Battery", stock: 8, status: "OK" },
        { name: "Microtek E2 Combo", category: "Combo", stock: 1, status: "Critical" },
        { name: "Solar Inverter 2kW", category: "Solar", stock: 5, status: "OK" },
    ];

    const getStatus = (stock) => {
        if (stock <= 0) return "Out of Stock";
        if (stock < 3) return "Critical";
        if (stock < 5) return "Low";
        return "OK";
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "Critical": 
            case "Out of Stock": return "bg-red-500";
            case "Low": return "bg-orange-500";
            default: return "bg-green-500";
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case "Critical": 
            case "Out of Stock": return "bg-red-50 text-red-600 border-red-100";
            case "Low": return "bg-orange-50 text-orange-600 border-orange-100";
            default: return "bg-green-50 text-green-600 border-green-100";
        }
    };

    const [lastScanned] = useState(new Date());

    return (
        <div className="space-y-8 animate-fadeIn w-full px-4 sm:px-8 pb-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-brand-navy tracking-tight">Inventory Management</h1>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">
                        Warehouse A-1 • Last Scanned: {lastScanned.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-100 rounded-xl shadow-sm">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Real-time Tracking Active</span>
                </div>
            </div>

            {/* Visual Stock Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {inventoryItems.map((item, i) => {
                    const status = getStatus(item.stock);
                    return (
                        <div key={i} className={`bg-white p-6 rounded-3xl shadow-sm border ${status !== 'OK' ? 'border-orange-100' : 'border-gray-100'} hover:shadow-md transition-shadow relative overflow-hidden group`}>
                            {status !== 'OK' && (
                                <div className={`absolute top-0 right-0 px-4 py-1.5 rounded-bl-2xl text-[10px] font-black uppercase tracking-widest text-white ${getStatusColor(status)}`}>
                                    {status} ALERT
                                </div>
                            )}
                        
                        <div className="flex flex-col h-full">
                            <div className="space-y-1 mb-6">
                                <span className="text-[10px] font-black text-brand-orange uppercase tracking-widest">{item.category}</span>
                                <h3 className="text-lg font-black text-brand-navy leading-tight truncate">{item.name}</h3>
                            </div>

                            <div className="mt-auto space-y-4">
                                <div className="flex items-end justify-between">
                                    <div className="space-y-1">
                                        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Current Stock</p>
                                        <p className="text-3xl font-black text-brand-navy">{item.stock} <span className="text-xs text-gray-400 font-bold uppercase">Units</span></p>
                                    </div>
                                    <span className={`text-[10px] font-black px-3 py-1.5 rounded-full border border-gray-100 ${getStatusText(status)}`}>
                                        {status}
                                    </span>
                                </div>

                                {/* Progress Bar */}
                                <div className="space-y-2">
                                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                    <div 
                                            className={`h-full transition-all duration-1000 ${getStatusColor(status)}`} 
                                            style={{ width: `${Math.min((item.stock/20)*100, 100)}%` }} 
                                        />
                                    </div>
                                    <p className="text-[10px] text-gray-400 font-bold text-right tracking-widest uppercase">Capacity: 20 units</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    )
                })}
            </div>

            {/* Quick Action */}
            <div className="bg-brand-navy text-white p-10 rounded-3xl shadow-2xl shadow-brand-navy/30 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="relative z-10 max-w-xl">
                    <h2 className="text-2xl font-black mb-2 tracking-tight">Need a Full Inventory Audit?</h2>
                    <p className="text-white/60 text-sm font-medium leading-relaxed">Download a complete spreadsheet of your current warehouse state, including SKU performance and turnover rates.</p>
                </div>
                <button className="relative z-10 whitespace-nowrap px-8 py-4 bg-white text-brand-navy rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-brand-orange hover:text-white transition-all shadow-xl shadow-black/10">
                    Export CSV Report
                </button>
                <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/5 rounded-full" />
            </div>
        </div>
    );
}
