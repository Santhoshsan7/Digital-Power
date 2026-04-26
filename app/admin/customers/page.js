"use client";
import { useState, useEffect } from "react";

export default function CustomerManagement() {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const res = await fetch('/api/admin/customers');
                const data = await res.json();
                if (data.success) {
                    setCustomers(data.customers);
                }
            } catch (error) {
                console.error("Fetch Customers Error:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCustomers();
    }, []);

    const exportToCSV = () => {
        const headers = ["Name", "Email", "Phone", "Address", "Total Orders"];
        const rows = customers.map(c => [
            c.name,
            c.email,
            c.phone,
            `"${c.address}"`,
            c.orders?.length || 0
        ]);
        
        const csvContent = "data:text/csv;charset=utf-8," 
            + headers.join(",") + "\n" 
            + rows.map(r => r.join(",")).join("\n");
            
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `digital_power_customers_${new Date().toLocaleDateString()}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    if (loading) return <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8 animate-pulse text-gray-400 font-black uppercase tracking-widest">Accessing CRM Vault...</div>;

    return (
        <div className="space-y-8 animate-fadeIn w-full px-4 sm:px-8 pb-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-brand-navy tracking-tight">Customer CRM</h1>
                    <div className="flex items-center gap-2 mt-1">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                            Database: {customers.length} Contacts
                        </p>
                    </div>
                </div>
                <button 
                    onClick={exportToCSV}
                    className="flex items-center gap-2 px-6 py-3 bg-brand-navy text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-brand-orange transition-all shadow-lg shadow-brand-navy/10 group"
                >
                    <svg className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Export Contacts
                </button>
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50/50 text-[10px] font-black text-gray-400 tracking-widest uppercase border-b border-gray-100">
                            <tr>
                                <th className="px-8 py-5">Customer Name</th>
                                <th className="px-8 py-5">Contact Details</th>
                                <th className="px-8 py-5">Recent Activity</th>
                                <th className="px-8 py-5">Joined</th>
                                <th className="px-8 py-5 text-right">Marketing</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {customers.map((c, i) => (
                                <tr key={c._id || i} className="hover:bg-gray-50/50 transition-all group">
                                    <td className="px-8 py-7">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-brand-orange/10 text-brand-orange rounded-full flex items-center justify-center font-black text-xs uppercase">
                                                {c.name?.split(' ').map(n => n[0]).join('') || 'CU'}
                                            </div>
                                            <span className="text-sm font-black text-brand-navy">{c.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-7">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-black text-gray-800">{c.email}</span>
                                            <span className="text-[10px] text-gray-400 font-bold tracking-wider">{c.phone}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-7">
                                        <span className="text-sm font-black text-brand-navy bg-gray-100 px-3 py-1 rounded-lg">
                                            {c.orders?.length || 0} Orders
                                        </span>
                                    </td>
                                    <td className="px-8 py-7">
                                        <span className="text-xs text-gray-500 font-bold">
                                            {c.joinedAt ? new Date(c.joinedAt).toLocaleDateString('en-GB') : "Recently"}
                                        </span>
                                    </td>
                                    <td className="px-8 py-7 text-right">
                                        <a href={`mailto:${c.email}`} className="text-brand-orange hover:text-brand-navy transition-colors inline-block px-4 py-2 bg-brand-orange/5 rounded-lg border border-brand-orange/10 uppercase text-[10px] font-black tracking-widest">
                                            Connect
                                        </a>
                                    </td>
                                </tr>
                            ))}
                            {customers.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="px-8 py-12 text-center text-gray-400 font-black uppercase tracking-widest bg-gray-50/50">
                                        CRM records are currently empty
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
