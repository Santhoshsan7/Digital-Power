"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { allProducts } from "@/data/products";

export default function DashboardOverview() {
    const [mounted, setMounted] = useState(false);
    const [lastUpdated, setLastUpdated] = useState(new Date());

    useEffect(() => {
        setMounted(true);
        const timer = setInterval(() => {
            setLastUpdated(new Date());
        }, 30000); // Update every 30s
        return () => clearInterval(timer);
    }, []);

    const [revenuePeriod, setRevenuePeriod] = useState("Weekly"); // Weekly, Monthly, Yearly

    const totalProducts = allProducts.length;
    const lowStockCount = allProducts.filter(p => p.stock > 0 && p.stock < 5).length;

    // Mock Revenue Data based on Period
    const revenueData = {
        "Weekly": { total: "₹42,500", change: "+12.5%", isPositive: true, orders: "24" },
        "Monthly": { total: "₹1,85,200", change: "+8.2%", isPositive: true, orders: "112" },
        "Yearly": { total: "₹24,50,000", change: "+15.4%", isPositive: true, orders: "1,450" }
    };

    const currentRevenue = revenueData[revenuePeriod];

    const stats = [
        { 
            label: `Orders (${revenuePeriod})`, 
            value: currentRevenue.orders, 
            change: currentRevenue.change, 
            isPositive: currentRevenue.isPositive,
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
            )
        },
        { 
            label: `Revenue (${revenuePeriod})`, 
            value: currentRevenue.total, 
            change: currentRevenue.change, 
            isPositive: true,
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            )
        },
        { 
            label: "Total Products", 
            value: totalProducts, 
            change: "+2 New", 
            isPositive: true,
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
            )
        },
        { 
            label: "Low Stock Items", 
            value: lowStockCount.toString().padStart(2, '0'), 
            change: lowStockCount > 2 ? "Critical" : "Concern", 
            isPositive: false,
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
            )
        },
    ];

    const recentOrders = [
        { id: "#DP-8854", customer: "Rahul Sharma", product: "Luminous Zelio 1100", amount: "₹8,400", status: "In Progress", date: "2 mins ago" },
        { id: "#DP-8853", customer: "Priya Singh", product: "Exide 150AH Battery", amount: "₹14,500", status: "Delivered", date: "15 mins ago" },
        { id: "#DP-8852", customer: "Amit Patel", product: "Microtek E2 Combo", amount: "₹21,800", status: "Scheduled", date: "1 hour ago" },
        { id: "#DP-8851", customer: "Sneha G.", product: "Solar Inverter 2kW", amount: "₹45,000", status: "Processing", date: "3 hours ago" },
    ];

    // Mock Chart Data
    const chartData = {
        "Weekly": {
            path: "M0,80 Q50,40 100,60 T200,30 T300,50 T400,20",
            fill: "M0,80 Q50,40 100,60 T200,30 T300,50 T400,20 L400,100 L0,100 Z",
            labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        },
        "Monthly": {
            path: "M0,60 Q100,20 200,50 T400,30",
            fill: "M0,60 Q100,20 200,50 T400,30 L400,100 L0,100 Z",
            labels: ["Week 1", "Week 2", "Week 3", "Week 4"]
        },
        "Yearly": {
            path: "M0,90 Q50,50 100,70 T150,40 T200,60 T250,30 T300,50 T350,20 T400,40",
            fill: "M0,90 Q50,50 100,70 T150,40 T200,60 T250,30 T300,50 T350,20 T400,40 L400,100 L0,100 Z",
            labels: ["Jan", "Mar", "May", "Jul", "Sep", "Nov"]
        }
    };

    const currentChart = chartData[revenuePeriod];

    if (!mounted) return <div className="min-h-screen bg-gray-50 p-8 animate-pulse" />;

    return (
        <div className="space-y-8 w-full px-4 sm:px-8 pb-12">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-brand-navy tracking-tight">Dashboard Overview</h1>
                    <div className="flex items-center gap-2 mt-1">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                            Live Stats • Last Updated: {lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex bg-white border border-gray-200 rounded-xl p-1 shadow-sm mr-2">
                        {["Weekly", "Monthly", "Yearly"].map((p) => (
                            <button
                                key={p}
                                onClick={() => setRevenuePeriod(p)}
                                className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all ${
                                    revenuePeriod === p 
                                    ? "bg-brand-orange text-white shadow-lg shadow-brand-orange/20" 
                                    : "text-gray-400 hover:text-brand-navy"
                                }`}
                            >
                                {p}
                            </button>
                        ))}
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all shadow-sm">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Export
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all group overflow-hidden relative">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-brand-orange/5 rounded-full -mr-8 -mt-8 group-hover:scale-150 transition-transform duration-500" />
                        <div className="flex items-center justify-between mb-5 relative z-10">
                            <div className="p-3 bg-brand-orange/10 text-brand-orange rounded-2xl group-hover:bg-brand-orange group-hover:text-white transition-colors duration-300">
                                {stat.icon}
                            </div>
                            <span className={`text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider ${
                                stat.isPositive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                            }`}>
                                {stat.change}
                            </span>
                        </div>
                        <h3 className="text-gray-400 text-xs font-black tracking-widest uppercase mb-1 relative z-10">{stat.label}</h3>
                        <p className="text-3xl font-black text-brand-navy relative z-10">{stat.value}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Sales Analytics Chart */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h2 className="text-xl font-black text-brand-navy tracking-tight">Sales Analytics</h2>
                                <p className="text-xs text-gray-400 font-bold">Revenue growth - {revenuePeriod} View</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] font-black text-gray-400 uppercase">View:</span>
                                <select 
                                    value={revenuePeriod}
                                    onChange={(e) => setRevenuePeriod(e.target.value)}
                                    className="bg-gray-50 border-none text-[10px] font-black p-2 rounded-lg text-brand-navy outline-none cursor-pointer uppercase tracking-widest"
                                >
                                    <option value="Weekly">Weekly</option>
                                    <option value="Monthly">Monthly</option>
                                    <option value="Yearly">Yearly</option>
                                </select>
                            </div>
                        </div>
                        <div className="h-64 w-full relative">
                            <svg className="w-full h-full" viewBox="0 0 400 100" preserveAspectRatio="none">
                                <defs>
                                    <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                        <stop offset="0%" stopColor="#f97316" stopOpacity="0.2" />
                                        <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
                                    </linearGradient>
                                </defs>
                                <path 
                                    d={currentChart.fill} 
                                    fill="url(#chartGradient)" 
                                    className="transition-all duration-700"
                                />
                                <path 
                                    d={currentChart.path} 
                                    fill="none" 
                                    stroke="#f97316" 
                                    strokeWidth="3" 
                                    strokeLinecap="round" 
                                    className="transition-all duration-700"
                                />
                                {[0, 25, 50, 75, 100].map(y => (
                                    <line key={y} x1="0" y1={y} x2="400" y2={y} stroke="#f1f5f9" strokeWidth="1" />
                                ))}
                            </svg>
                            <div className="absolute inset-0 flex items-end justify-between px-2 pt-4">
                                {currentChart.labels.map(label => (
                                    <span key={label} className="text-[10px] font-bold text-gray-400">{label}</span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Recent Orders Table */}
                    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-8 border-b border-gray-50 flex items-center justify-between">
                            <h2 className="text-xl font-black text-brand-navy tracking-tight">Recent Activity</h2>
                            <Link href="/admin/orders" className="text-xs font-black text-brand-orange hover:gap-2 flex items-center gap-1 transition-all uppercase tracking-widest">
                                View Full Log
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Link>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50/50 text-[10px] font-black text-gray-400 tracking-widest uppercase">
                                    <tr>
                                        <th className="px-8 py-5">Order Details</th>
                                        <th className="px-8 py-5">Value</th>
                                        <th className="px-8 py-5">Status</th>
                                        <th className="px-8 py-5 text-right">Time</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {recentOrders.map((order, i) => (
                                        <tr key={i} className="hover:bg-gray-50/50 transition-all cursor-pointer group">
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center text-brand-navy font-black text-xs group-hover:bg-brand-orange group-hover:text-white transition-all">
                                                        {order.customer.charAt(0)}
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-sm font-black text-brand-navy">{order.customer}</span>
                                                        <span className="text-[11px] text-gray-400 font-bold">{order.product}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6 text-sm font-black text-gray-800">{order.amount}</td>
                                            <td className="px-8 py-6">
                                                <span className={`text-[9px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest ${
                                                    order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                                                }`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="px-8 py-6 text-right text-[11px] font-bold text-gray-400">{order.date}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Right Column: Inventory & Traffic */}
                <div className="space-y-8">
                    {/* Inventory Card */}
                    <div className="bg-brand-navy text-white p-8 rounded-3xl shadow-2xl shadow-brand-navy/30 relative overflow-hidden group">
                        <div className="relative z-10">
                            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
                                <svg className="w-6 h-6 text-brand-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-black mb-2 tracking-tight">Stock Alert</h2>
                            <p className="text-white/50 text-sm mb-8 font-medium leading-relaxed">You have <span className="text-brand-orange font-black">5 items</span> reaching critical stock levels. Orders might be delayed.</p>
                            <Link href="/admin/products" className="flex items-center justify-center gap-2 bg-brand-orange text-white w-full py-4 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-white hover:text-brand-navy transition-all shadow-xl shadow-brand-orange/30">
                                Restock Inventory
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </Link>
                        </div>
                        {/* Decorative Circles */}
                        <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full translate-x-1/2 -translate-y-1/2" />
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-brand-orange/10 rounded-full -translate-x-1/2 translate-y-1/2" />
                    </div>

                    {/* Traffic Status Card */}
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-lg font-black text-brand-navy tracking-tight flex items-center gap-2">
                                <CirclePulse />
                                Live Status
                            </h2>
                            <span className="text-[10px] font-black text-brand-orange bg-brand-orange/10 px-2 py-1 rounded tracking-widest uppercase">Syncing</span>
                        </div>
                        
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Active Customers</p>
                                    <p className="text-2xl font-black text-brand-navy">12 <span className="text-xs text-green-500 font-bold tracking-normal">Online</span></p>
                                </div>
                                <div className="flex h-12 items-end gap-1">
                                    {[30, 60, 45, 80, 50, 90, 70].map((h, i) => (
                                        <div key={i} className="w-1.5 bg-brand-orange/20 rounded-t-full transition-all duration-500 hover:bg-brand-orange" style={{ height: `${h}%` }}></div>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-6 border-t border-gray-50 flex flex-col gap-3">
                                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-gray-400">
                                    <span>Server Health</span>
                                    <span className="text-green-500">99.8%</span>
                                </div>
                                <div className="h-1.5 w-full bg-gray-50 rounded-full overflow-hidden">
                                    <div className="h-full bg-green-500 w-[99%]" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Access */}
                    <div className="grid grid-cols-2 gap-4">
                         <button className="p-6 bg-white border border-gray-100 rounded-3xl hover:border-brand-orange hover:shadow-xl transition-all group">
                            <div className="w-10 h-10 bg-brand-navy rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <p className="text-xs font-black text-brand-navy uppercase tracking-widest text-left">Inbox</p>
                         </button>
                         <button className="p-6 bg-white border border-gray-100 rounded-3xl hover:border-brand-orange hover:shadow-xl transition-all group">
                            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                </svg>
                            </div>
                            <p className="text-xs font-black text-brand-navy uppercase tracking-widest text-left">Alerts</p>
                         </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function CirclePulse() {
    return (
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-orange opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-orange"></span>
        </span>
    );
}
