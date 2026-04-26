"use client";
import { useState, useEffect } from "react";

export default function OrdersManagement() {
    const [statusFilter, setStatusFilter] = useState("All");
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const [selectedOrder, setSelectedOrder] = useState(null);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const res = await fetch('/api/admin/orders');
            const data = await res.json();
            if (data.success) {
                setOrders(data.orders);
            }
        } catch (error) {
            console.error("Fetch Orders Error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const updateStatus = async (id, newStatus) => {
        try {
            const res = await fetch('/api/admin/orders', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, status: newStatus })
            });
            const data = await res.json();
            if (data.success) {
                fetchOrders(); // Refresh list
            }
        } catch (error) {
            console.error("Update Status Error:", error);
        }
    };

    const filteredOrders = statusFilter === "All" 
        ? orders 
        : orders.filter(o => o.orderStatus === statusFilter);

    const getStatusStyle = (status) => {
        switch (status) {
            case "Pending": return "bg-orange-100 text-orange-700 border-orange-200";
            case "Confirmed": return "bg-blue-100 text-blue-700 border-blue-200";
            case "Delivered": return "bg-green-100 text-green-700 border-green-200";
            case "Cancelled": return "bg-red-100 text-red-700 border-red-200";
            default: return "bg-gray-100 text-gray-700 border-gray-200";
        }
    };

    if (loading) return <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8 animate-pulse text-gray-400 font-black uppercase tracking-widest">Loading Transaction Vault...</div>;

    return (
        <div className="space-y-8 animate-fadeIn w-full px-4 sm:px-8 pb-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-brand-navy tracking-tight">Orders Management</h1>
                    <p className="text-sm text-gray-500 font-medium">Track and update customer order lifecycles.</p>
                </div>
                <div className="flex bg-white p-1 rounded-xl shadow-sm border border-gray-100 uppercase text-[10px] font-black tracking-widest overflow-x-auto no-scrollbar">
                    {["All", "Pending", "Confirmed", "Delivered", "Cancelled"].map(f => (
                        <button 
                            key={f}
                            onClick={() => setStatusFilter(f)}
                            className={`px-4 py-2 rounded-lg transition-all whitespace-nowrap ${statusFilter === f ? "bg-brand-navy text-white shadow-lg" : "text-gray-400 hover:text-brand-navy"}`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left table-fixed min-w-[1000px]">
                        <thead className="bg-gray-50/50 text-[10px] font-black text-gray-400 tracking-widest uppercase border-b border-gray-100">
                            <tr>
                                <th className="px-8 py-5 w-[150px]">Order ID & Date</th>
                                <th className="px-8 py-5 w-[220px]">Customer info</th>
                                <th className="px-8 py-5">Product Details</th>
                                <th className="px-8 py-5 w-[130px]">Status</th>
                                <th className="px-8 py-5 w-[250px] text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredOrders.map((o) => (
                                <tr key={o._id || o.orderId} className="hover:bg-gray-50/5 transition-colors group">
                                    <td className="px-8 py-7">
                                        <div className="flex flex-col gap-1">
                                            <span className="text-sm font-black text-brand-navy">{o.orderId}</span>
                                            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                                                {new Date(o.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-7">
                                        <div className="flex flex-col gap-1 min-w-0">
                                            <span className="text-sm font-black text-gray-800 truncate">{o.customer?.name}</span>
                                            <span className="text-[11px] text-brand-orange font-bold tracking-wider">{o.customer?.phone}</span>
                                            <p className="text-[10px] text-gray-400 truncate leading-relaxed" title={o.customer?.address}>{o.customer?.address}</p>
                                        </div>
                                    </td>
                                    <td className="px-8 py-7">
                                        <div className="flex items-center gap-4 min-w-0">
                                            <div className="w-12 h-12 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-center overflow-hidden shrink-0">
                                                {o.items?.[0]?.image ? (
                                                    <img 
                                                        src={o.items[0].image} 
                                                        alt="" 
                                                        className="w-10 h-10 object-contain"
                                                        onError={(e) => {
                                                            e.target.src = "https://cdn-icons-png.flaticon.com/512/1170/1170577.png";
                                                            e.target.className = "w-6 h-6 opacity-20 grayscale";
                                                        }}
                                                    />
                                                ) : (
                                                    <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                                    </svg>
                                                )}
                                            </div>
                                            <div className="flex flex-col gap-1 min-w-0 flex-1">
                                                <span className="text-sm font-black text-brand-navy truncate">
                                                    {o.items?.map(i => i.name).join(", ") || "Order Items"}
                                                </span>
                                                <span className="text-sm font-black text-brand-orange">₹{o.totalAmount?.toLocaleString('en-IN')}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-7">
                                        <span className={`text-[9px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest border ${getStatusStyle(o.orderStatus)}`}>
                                            {o.orderStatus || "Pending"}
                                        </span>
                                    </td>
                                    <td className="px-8 py-7 text-right">
                                        <div className="flex items-center justify-end gap-3">
                                            <div className="relative group/status">
                                                <button className="px-3 py-2 bg-brand-orange/5 text-brand-orange rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-brand-orange hover:text-white transition-all border border-brand-orange/10 whitespace-nowrap">
                                                    Update Status
                                                </button>
                                                <div className="absolute right-0 top-full mt-1 hidden group-hover/status:block bg-white border border-gray-100 rounded-xl shadow-2xl p-2 z-[999] min-w-[140px] animate-fadeIn origin-top-right">
                                                    {["Pending", "Confirmed", "Delivered", "Cancelled"].map(s => (
                                                        <button 
                                                            key={s}
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                updateStatus(o._id || o.orderId, s);
                                                            }}
                                                            className="w-full text-left px-3 py-2 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-brand-orange hover:bg-orange-50 rounded-lg transition-all"
                                                        >
                                                            {s}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                            <button 
                                                onClick={() => setSelectedOrder(o)}
                                                className="px-3 py-2 bg-gray-50 text-gray-500 rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-brand-navy hover:text-white transition-all border border-gray-100"
                                            >
                                                Details
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {filteredOrders.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="px-8 py-12 text-center text-gray-400 font-black uppercase tracking-widest bg-gray-50/50">
                                        No transactions recorded in vault
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Order Details Modal */}
            {selectedOrder && (
                <div className="fixed inset-0 bg-brand-navy/60 backdrop-blur-sm z-[1000] flex items-center justify-center p-4">
                    <div className="bg-white w-full max-w-2xl rounded-[40px] shadow-2xl overflow-hidden animate-slideUp">
                        <div className="p-8 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
                            <div>
                                <h2 className="text-xl font-black text-brand-navy tracking-tight">Order {selectedOrder.orderId}</h2>
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Transaction Details</p>
                            </div>
                            <button 
                                onClick={() => setSelectedOrder(null)}
                                className="w-10 h-10 bg-white shadow-sm border border-gray-100 rounded-full flex items-center justify-center text-gray-400 hover:text-brand-orange transition-all"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        
                        <div className="p-8 space-y-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
                            {/* Customer Section */}
                            <div className="grid grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <h3 className="text-[10px] font-black text-brand-orange uppercase tracking-widest">Customer Info</h3>
                                    <div className="space-y-1">
                                        <p className="font-black text-brand-navy">{selectedOrder.customer?.name}</p>
                                        <p className="text-sm font-bold text-gray-500">{selectedOrder.customer?.phone}</p>
                                        <p className="text-sm font-bold text-gray-500">{selectedOrder.customer?.email}</p>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <h3 className="text-[10px] font-black text-brand-orange uppercase tracking-widest">Shipping Address</h3>
                                    <p className="text-sm font-medium text-gray-600 leading-relaxed">{selectedOrder.customer?.address}</p>
                                </div>
                            </div>

                            {/* Items Section */}
                            <div className="space-y-4">
                                <h3 className="text-[10px] font-black text-brand-orange uppercase tracking-widest">Order Items</h3>
                                <div className="bg-gray-50 rounded-3xl p-6 space-y-4">
                                    {selectedOrder.items?.map((item, idx) => (
                                        <div key={idx} className="flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 bg-white rounded-xl border border-gray-100 flex items-center justify-center overflow-hidden">
                                                    <img 
                                                        src={item.image} 
                                                        alt="" 
                                                        className="w-8 h-8 object-contain" 
                                                        onError={(e) => {
                                                            e.target.src = "https://cdn-icons-png.flaticon.com/512/1170/1170577.png";
                                                            e.target.className = "w-6 h-6 opacity-20 grayscale";
                                                        }}
                                                    />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-black text-brand-navy">{item.name}</p>
                                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Qty: {item.quantity}</p>
                                                </div>
                                            </div>
                                            <p className="text-sm font-black text-brand-navy">₹{(item.price * item.quantity).toLocaleString()}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Summary Section */}
                            <div className="pt-6 border-t border-gray-100 space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400 font-bold">Subtotal</span>
                                    <span className="text-brand-navy font-black">₹{selectedOrder.totalAmount?.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400 font-bold">GST (Incl.)</span>
                                    <span className="text-brand-navy font-black">₹{selectedOrder.gstAmount?.toLocaleString() || '0'}</span>
                                </div>
                                <div className="flex justify-between pt-4 border-t border-gray-50">
                                    <span className="text-lg font-black text-brand-navy">Total Pay</span>
                                    <span className="text-2xl font-black text-brand-orange">₹{selectedOrder.totalAmount?.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
