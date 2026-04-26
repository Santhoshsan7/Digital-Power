"use client";

import { useState } from 'react';

export default function LowStockDashboard() {
    const [lastCheck] = useState(new Date());
    const lowStockItems = [
        { name: "Microtek Luxe 800", brand: "Microtek", stock: 2, status: "Critical", trend: "Fast Selling" },
        { name: "Microtek E2 Combo", brand: "Microtek", stock: 1, status: "Critical", trend: "Depleting" },
        { name: "Luminous Red Charge 15000", brand: "Luminous", stock: 4, status: "Low", trend: "Stable" },
        { name: "Luminous Eco Watt 700", brand: "Luminous", stock: 3, status: "Low", trend: "Fast Selling" },
    ];

    return (
        <div className="space-y-8 animate-fadeIn w-full px-4 sm:px-8 pb-12">
            <div className="text-center space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-100 text-red-600 rounded-lg text-[10px] font-black uppercase tracking-widest mb-2 shadow-sm border border-red-200">
                    <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-ping" />
                    Live Alert System Active
                </div>
                <h1 className="text-3xl font-black text-brand-navy tracking-tight">Inventory Console</h1>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                    Last System Check: {lastCheck.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • All Sensors Online
                </p>
            </div>

            <div className="bg-white rounded-[2rem] shadow-xl border border-red-50 overflow-hidden">
                <div className="p-8 border-b border-red-50 bg-red-50/20">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-black">
                        <span className="text-red-600 text-sm uppercase tracking-widest">Active Stock Shortages</span>
                        <div className="flex gap-4 text-[10px] uppercase tracking-widest text-gray-400">
                             <span className="flex items-center gap-2"><span className="w-2 h-2 bg-red-600 rounded-full"/> Critical (&lt;3)</span>
                             <span className="flex items-center gap-2"><span className="w-2 h-2 bg-orange-400 rounded-full"/> Low (&lt;5)</span>
                        </div>
                    </div>
                </div>
                
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50/50 text-[10px] font-black text-gray-400 tracking-widest uppercase">
                            <tr>
                                <th className="px-10 py-5">Product Details</th>
                                <th className="px-10 py-5 text-center">Current Stock</th>
                                <th className="px-10 py-5">System Flag</th>
                                <th className="px-10 py-5">Market Trend</th>
                                <th className="px-10 py-5 text-right">Procure</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {lowStockItems.map((item, i) => (
                                <tr key={i} className="hover:bg-red-50/10 transition-colors group">
                                    <td className="px-10 py-7">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-black text-brand-navy group-hover:text-red-600 transition-colors">{item.name}</span>
                                            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{item.brand}</span>
                                        </div>
                                    </td>
                                    <td className="px-10 py-7 text-center">
                                        <div className="flex flex-col items-center">
                                            <span className={`text-xl font-black ${item.status === 'Critical' ? 'text-red-600' : 'text-orange-600'}`}>
                                                {item.stock}
                                            </span>
                                            <span className="text-[9px] text-gray-400 font-bold uppercase">Units</span>
                                        </div>
                                    </td>
                                    <td className="px-10 py-7">
                                        <span className={`text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest ${
                                            item.status === 'Critical' ? 'bg-red-100 text-red-600' : 'bg-orange-100 text-orange-600'
                                        }`}>
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="px-10 py-7">
                                        <span className="text-[11px] font-bold text-gray-600 italic">
                                            {item.trend}
                                        </span>
                                    </td>
                                    <td className="px-10 py-7 text-right">
                                        <button className="px-5 py-2.5 bg-brand-navy text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-brand-orange transition-all shadow-md">
                                            Quick Restock
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Professional Tip Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                 <div className="bg-white p-8 rounded-3xl border border-gray-100 flex gap-5 items-start">
                    <div className="p-3 bg-brand-orange/10 text-brand-orange rounded-2xl shrink-0">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div>
                        <h4 className="font-black text-brand-navy mb-1 uppercase text-xs tracking-widest">Replenishment Tip</h4>
                        <p className="text-gray-500 text-sm font-medium leading-relaxed">Consider ordering <span className="text-brand-navy font-bold">10% extra</span> for "Microtek" items this month as seasonal demand is rising in South Chennai area.</p>
                    </div>
                 </div>
                 <div className="bg-white p-8 rounded-3xl border border-gray-100 flex gap-5 items-start">
                    <div className="p-3 bg-brand-navy/5 text-brand-navy rounded-2xl shrink-0">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </div>
                    <div>
                        <h4 className="font-black text-brand-navy mb-1 uppercase text-xs tracking-widest">Procurement Summary</h4>
                        <p className="text-gray-500 text-sm font-medium leading-relaxed">You have <span className="text-red-600 font-bold">2 critical items</span> that need urgent restocking avoid high lead times of 3-5 days.</p>
                    </div>
                 </div>
            </div>
        </div>
    );
}
