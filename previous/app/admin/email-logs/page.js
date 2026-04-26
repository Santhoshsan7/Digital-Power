"use client";

export default function EmailLogs() {
    const logs = [
        { id: "#DP-8854", email: "rahul.sharma@example.com", status: "Sent", type: "Order Confirmation", date: "18 Mar, 10:30 AM" },
        { id: "#DP-8853", email: "priya.s@example.com", status: "Sent", type: "Order Update", date: "18 Mar, 09:15 AM" },
        { id: "#DP-8850", email: "amit.p@gmail.com", status: "Failed", type: "Welcome Email", date: "17 Mar, 05:45 PM", error: "Invalid Address" },
        { id: "#DP-8848", email: "care@customer.com", status: "Sent", type: "Cancellation Conf.", date: "17 Mar, 12:20 PM" },
    ];

    return (
        <div className="space-y-8 animate-fadeIn w-full px-4 sm:px-8 pb-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-brand-navy tracking-tight">System Email Logs</h1>
                    <div className="flex items-center gap-2 mt-1">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                            SMTP Relay: Connected • Queue: 0 Pending
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50/50 text-[10px] font-black text-gray-400 tracking-widest uppercase border-b border-gray-100">
                            <tr>
                                <th className="px-8 py-5">Event Detail</th>
                                <th className="px-8 py-5">Recipient</th>
                                <th className="px-8 py-5">Delivery Status</th>
                                <th className="px-8 py-5 text-right">Timestamp</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {logs.map((log, i) => (
                                <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-8 py-6">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-black text-brand-navy">{log.type}</span>
                                            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Ref: {log.id}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-sm font-bold text-gray-600">{log.email}</td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-2">
                                            <span className={`w-2 h-2 rounded-full ${log.status === 'Sent' ? 'bg-green-500' : 'bg-red-500 animate-pulse'}`} />
                                            <span className={`text-[10px] font-black uppercase tracking-widest ${log.status === 'Sent' ? 'text-green-700' : 'text-red-700'}`}>
                                                {log.status} {log.error && `(${log.error})`}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-right text-[11px] font-bold text-gray-400">{log.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
