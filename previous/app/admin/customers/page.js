"use client";

export default function CustomerManagement() {
    const customers = [
        { name: "Rahul Sharma", email: "rahul.sharma@example.com", phone: "+91 98765 43210", orders: 3, joined: "Jan 2026" },
        { name: "Priya Singh", email: "priya.s@example.com", phone: "+91 91234 56789", orders: 1, joined: "Feb 2026" },
        { name: "Amit Patel", email: "amit.patel@gmail.com", phone: "+91 88888 77777", orders: 5, joined: "Dec 2025" },
        { name: "Sneha G.", email: "sneha.g@outlook.com", phone: "+91 70000 11111", orders: 2, joined: "Mar 2026" },
    ];

    return (
        <div className="space-y-8 animate-fadeIn w-full px-4 sm:px-8 pb-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-brand-navy tracking-tight">Customer CRM</h1>
                    <div className="flex items-center gap-2 mt-1">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                            8 Customers Online • Total Database: 1,240
                        </p>
                    </div>
                </div>
                <button className="flex items-center gap-2 px-6 py-3 bg-brand-navy text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-brand-orange transition-all shadow-lg shadow-brand-navy/10">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                                <th className="px-8 py-5">Total Orders</th>
                                <th className="px-8 py-5">Joined</th>
                                <th className="px-8 py-5 text-right">Marketing</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {customers.map((c, i) => (
                                <tr key={i} className="hover:bg-gray-50/50 transition-all group">
                                    <td className="px-8 py-7">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-brand-orange/10 text-brand-orange rounded-full flex items-center justify-center font-black text-xs uppercase">
                                                {c.name.split(' ').map(n => n[0]).join('')}
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
                                        <span className="text-sm font-black text-brand-navy bg-gray-100 px-3 py-1 rounded-lg">{c.orders} Orders</span>
                                    </td>
                                    <td className="px-8 py-7">
                                        <span className="text-xs text-gray-500 font-bold">{c.joined}</span>
                                    </td>
                                    <td className="px-8 py-7 text-right">
                                        <button className="text-brand-orange hover:text-brand-navy transition-colors">
                                            <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                        </button>
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
