"use client";
import { useState } from "react";

export default function OrdersManagement() {
    const [statusFilter, setStatusFilter] = useState("All");
    const [orders, setOrders] = useState([
        { 
            id: "#DP-8854", 
            customer: "Rahul Sharma", 
            phone: "+91 98765 43210", 
            address: "12, MG Road, Chennai - 600001",
            product: "Luminous Zelio 1100", 
            price: "₹8,400", 
            status: "Pending",
            date: "18 Mar, 2026"
        },
        { 
            id: "#DP-8853", 
            customer: "Priya Singh", 
            phone: "+91 91234 56789", 
            address: "Apt 4B, Skyview, Anna Nagar, Chennai",
            product: "Exide 150AH Battery", 
            price: "₹14,500", 
            status: "Confirmed",
            date: "17 Mar, 2026"
        },
        { 
            id: "#DP-8852", 
            customer: "Amit Patel", 
            phone: "+91 88888 77777", 
            address: "Plot 45, Velachery Main Road, Chennai",
            product: "Microtek E2 Combo", 
            price: "₹21,800", 
            status: "Delivered",
            date: "16 Mar, 2026"
        },
        { 
            id: "#DP-8851", 
            customer: "Sneha G.", 
            phone: "+91 70000 11111", 
            address: "5th Cross, Adyar, Chennai",
            product: "Solar Inverter 2kW", 
            price: "₹45,000", 
            status: "Cancelled",
            date: "15 Mar, 2026"
        },
    ]);

    const updateStatus = (id, newStatus) => {
        setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o));
    };

    const filteredOrders = statusFilter === "All" 
        ? orders 
        : orders.filter(o => o.status === statusFilter);

    const getStatusStyle = (status) => {
        switch (status) {
            case "Pending": return "bg-orange-100 text-orange-700 border-orange-200";
            case "Confirmed": return "bg-blue-100 text-blue-700 border-blue-200";
            case "Delivered": return "bg-green-100 text-green-700 border-green-200";
            case "Cancelled": return "bg-red-100 text-red-700 border-red-200";
            default: return "bg-gray-100 text-gray-700 border-gray-200";
        }
    };

    return (
        <div className="space-y-8 animate-fadeIn w-full px-4 sm:px-8 pb-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-brand-navy tracking-tight">Orders Management</h1>
                    <p className="text-sm text-gray-500 font-medium">Track and update customer order lifecycles.</p>
                </div>
                <div className="flex bg-white p-1 rounded-xl shadow-sm border border-gray-100 uppercase text-[10px] font-black tracking-widest">
                    {["All", "Pending", "Confirmed", "Delivered"].map(f => (
                        <button 
                            key={f}
                            onClick={() => setStatusFilter(f)}
                            className={`px-4 py-2 rounded-lg transition-all ${statusFilter === f ? "bg-brand-navy text-white shadow-lg" : "text-gray-400 hover:text-brand-navy"}`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50/50 text-[10px] font-black text-gray-400 tracking-widest uppercase border-b border-gray-100">
                            <tr>
                                <th className="px-8 py-5">Order ID & Date</th>
                                <th className="px-8 py-5">Customer info</th>
                                <th className="px-8 py-5">Product Details</th>
                                <th className="px-8 py-5">Status</th>
                                <th className="px-8 py-5 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredOrders.map((o) => (
                                <tr key={o.id} className="hover:bg-gray-50/50 transition-all group">
                                    <td className="px-8 py-7">
                                        <div className="flex flex-col gap-1">
                                            <span className="text-sm font-black text-brand-navy">{o.id}</span>
                                            <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">{o.date}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-7">
                                        <div className="flex flex-col gap-1 max-w-[200px]">
                                            <span className="text-sm font-black text-gray-800">{o.customer}</span>
                                            <span className="text-[11px] text-brand-orange font-bold tracking-wider">{o.phone}</span>
                                            <span className="text-[10px] text-gray-400 truncate leading-relaxed" title={o.address}>{o.address}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-7">
                                        <div className="flex flex-col gap-1">
                                            <span className="text-sm font-black text-brand-navy">{o.product}</span>
                                            <span className="text-sm font-black text-brand-orange">{o.price}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-7">
                                        <span className={`text-[9px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest border ${getStatusStyle(o.status)}`}>
                                            {o.status}
                                        </span>
                                    </td>
                                    <td className="px-8 py-7 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <div className="relative group/status">
                                                <button className="px-4 py-2 bg-brand-orange/5 text-brand-orange rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-brand-orange hover:text-white transition-all border border-brand-orange/10">
                                                    Update Status
                                                </button>
                                                <div className="absolute right-0 bottom-full mb-2 hidden group-hover/status:block bg-white border border-gray-100 rounded-xl shadow-xl p-2 z-50 min-w-[140px]">
                                                    {["Pending", "Confirmed", "Delivered", "Cancelled"].map(s => (
                                                        <button 
                                                            key={s}
                                                            onClick={() => updateStatus(o.id, s)}
                                                            className="w-full text-left px-3 py-2 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-brand-orange hover:bg-orange-50 rounded-lg transition-all"
                                                        >
                                                            {s}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                            <button className="px-4 py-2 bg-gray-50 text-gray-500 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-brand-navy hover:text-white transition-all border border-gray-100">
                                                Details
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
