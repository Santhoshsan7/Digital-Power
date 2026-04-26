"use client";

export default function AdminSettings() {
    const handleSave = () => {
        alert("Settings saved successfully! System preferences updated.");
    };

    return (
        <div className="space-y-8 animate-fadeIn w-full px-4 sm:px-8 pb-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-brand-navy tracking-tight">Dashboard Settings</h1>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1 italic">
                        Node Server: v18.1.0 • Last Config Sync: 10:20 AM
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-6">
                    <section className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
                        <h2 className="text-sm font-black text-brand-navy uppercase tracking-widest flex items-center gap-2">
                            <svg className="w-5 h-5 text-brand-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                            Business Profile
                        </h2>
                        
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Store Name</label>
                                    <input type="text" defaultValue="Digital Power" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold text-brand-navy focus:border-brand-orange outline-none" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Admin Email</label>
                                    <input type="email" defaultValue="admin@digitalpower.in" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold text-brand-navy focus:border-brand-orange outline-none" />
                                </div>
                            </div>
                            
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Business Address</label>
                                <textarea rows="3" defaultValue="Chennai, Tamil Nadu, India" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold text-brand-navy focus:border-brand-orange outline-none resize-none" />
                            </div>
                        </div>
                    </section>

                    <section className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
                        <h2 className="text-sm font-black text-brand-navy uppercase tracking-widest flex items-center gap-2">
                            <svg className="w-5 h-5 text-brand-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                            </svg>
                            Taxation & Billing
                        </h2>
                        
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Default GST (%)</label>
                                <input type="text" defaultValue="18%" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold text-brand-navy focus:border-brand-orange outline-none" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Invoice Prefix</label>
                                <input type="text" defaultValue="DP-" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold text-brand-navy focus:border-brand-orange outline-none" />
                            </div>
                        </div>
                    </section>
                </div>

                <div className="space-y-6">
                    <div className="bg-brand-navy p-8 rounded-3xl shadow-xl shadow-brand-navy/20 text-white space-y-6">
                        <h3 className="text-lg font-black tracking-tight leading-tight">System Status</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest opacity-60">
                                <span>API Status</span>
                                <span className="text-green-400">Stable</span>
                            </div>
                            <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest opacity-60">
                                <span>DB Connection</span>
                                <span className="text-green-400">Active</span>
                            </div>
                            <div className="pt-4 space-y-2">
                                <button className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">Clear Cache</button>
                                <button className="w-full py-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">Maintenance Mode</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-end pt-4">
                <button 
                    onClick={handleSave}
                    className="px-10 py-4 bg-brand-orange text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-brand-orange/20 hover:scale-105 transition-all"
                >
                    Save Changes
                </button>
            </div>
        </div>
    );
}
