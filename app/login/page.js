"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [mounted, setMounted] = useState(false);
    
    // Forgot Password Flow States
    const [forgotMode, setForgotMode] = useState(false);
    const [recoveryStep, setRecoveryStep] = useState(0); // 0: Request, 1: Reset
    const [recoveryToken, setRecoveryToken] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [showNewPassword, setShowNewPassword] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch('/api/admin/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: id, password })
            });
            const data = await res.json();

            if (data.success) {
                setSuccessMsg("Authorization Granted. Patching to Hub...");
                setTimeout(() => {
                    router.push("/admin/dashboard");
                }, 1200);
            } else {
                setError(data.message || "Authentication failed. Invalid UID or Password.");
                setLoading(false);
            }
        } catch (err) {
            setError("Server connection error. Please retry.");
            setLoading(false);
        }
    };

    const handleRequestCode = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            const res = await fetch('/api/admin/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: id })
            });
            const data = await res.json();
            if (data.success) {
                setRecoveryStep(1);
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError("Failed to reach security server.");
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            const res = await fetch('/api/admin/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: id, token: recoveryToken, newPassword })
            });
            const data = await res.json();
            if (data.success) {
                setSuccessMsg("Security Credential Updated. Returning to Login...");
                setTimeout(() => {
                    setForgotMode(false);
                    setRecoveryStep(0);
                    setSuccessMsg("");
                    setPassword("");
                }, 2000);
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError("Protocol failure. Try again.");
        } finally {
            setLoading(false);
        }
    };

    if (!mounted) return null;

    return (
        <div className="min-h-screen bg-brand-navy relative flex items-center justify-center p-6 overflow-hidden">
            {/* Dynamic Background Elements */}
            <div className="absolute inset-0 bg-[url('/power_grid_bg_1776800125235.png')] opacity-20 mix-blend-overlay scale-125 animate-pulse-slow"></div>
            <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-brand-orange/20 rounded-full blur-[120px] animate-blob"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/20 rounded-full blur-[120px] animate-blob animation-delay-2000"></div>

            {/* Main Login Card - Glass Design */}
            <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 bg-white/5 backdrop-blur-3xl rounded-[40px] border border-white/10 shadow-2xl relative z-10 overflow-hidden transition-all duration-500">
                
                {/* Left Side: Brand & Visuals */}
                <div className="hidden md:flex flex-col justify-between p-16 lg:p-20 border-r border-white/5">
                    <Link href="/" className="inline-flex items-center gap-4 group">
                        <div className="w-14 h-14 bg-brand-orange rounded-2xl flex items-center justify-center text-white shadow-2xl shadow-brand-orange/30 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <span className="text-3xl font-black tracking-tighter text-white">Digital <span className="text-brand-orange">Power</span></span>
                    </Link>

                    <div className="space-y-8">
                        <div className="inline-flex px-4 py-2 bg-brand-orange/10 border border-brand-orange/20 rounded-full">
                            <span className="text-[10px] font-black text-brand-orange uppercase tracking-[0.3em]">Precision Engineering</span>
                        </div>
                        <h1 className="text-6xl font-black text-white leading-[1.1] tracking-tight">
                            Control <br/>
                            <span className="text-brand-orange opacity-90 italic">Intelligence.</span>
                        </h1>
                        <p className="text-white/40 text-lg font-medium leading-relaxed max-w-sm">
                            The ultimate command center for Digital Power operations. Secure, real-time, and high-fidelity data management.
                        </p>
                    </div>

                    <div className="grid grid-cols-3 gap-6 pt-10 border-t border-white/5">
                        <div>
                            <div className="text-xl font-black text-white">100%</div>
                            <div className="text-[10px] font-bold text-white/30 uppercase tracking-widest mt-1">Encrypted</div>
                        </div>
                        <div>
                            <div className="text-xl font-black text-white">24/7</div>
                            <div className="text-[10px] font-bold text-white/30 uppercase tracking-widest mt-1">Live Sync</div>
                        </div>
                        <div>
                            <div className="text-xl font-black text-white">4K</div>
                            <div className="text-[10px] font-bold text-white/30 uppercase tracking-widest mt-1">Analytics</div>
                        </div>
                    </div>
                </div>

                {/* Right Side: Forms */}
                <div className="p-10 md:p-16 lg:p-20 flex flex-col justify-center animate-fadeIn">
                    <div className="max-w-sm mx-auto w-full space-y-10">
                        
                        {!forgotMode ? (
                            <>
                                <div>
                                    <h2 className="text-3xl font-black text-white tracking-tight">Admin Login</h2>
                                    <p className="text-white/40 font-bold mt-2 text-sm tracking-wide">Enter your credentials to enter the hub.</p>
                                </div>

                                <form onSubmit={handleLogin} className="space-y-6">
                                    {error && (
                                        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 text-red-500 text-[12px] font-black animate-shake">
                                            <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            {error}
                                        </div>
                                    )}
                                    {successMsg && (
                                        <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-2xl flex items-center gap-3 text-green-500 text-[12px] font-black">
                                            <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            {successMsg}
                                        </div>
                                    )}

                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] ml-2">Username</label>
                                        <div className="relative group">
                                            <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none text-brand-orange group-focus-within:scale-110 transition-transform">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                            </div>
                                            <input 
                                                type="text" 
                                                required
                                                placeholder="Admin UID"
                                                value={id}
                                                onChange={(e) => setId(e.target.value)}
                                                className="w-full pl-16 pr-6 py-5 rounded-2xl bg-white/5 border border-white/10 outline-none focus:border-brand-orange/50 focus:ring-8 focus:ring-brand-orange/5 transition-all text-[15px] font-bold text-white placeholder:text-white/10"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] ml-2">Password</label>
                                        <div className="relative group">
                                            <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none text-brand-orange group-focus-within:scale-110 transition-transform">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                                </svg>
                                            </div>
                                            <input 
                                                type={showPassword ? "text" : "password"}
                                                required
                                                placeholder="••••••••"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                className="w-full pl-16 pr-16 py-5 rounded-2xl bg-white/5 border border-white/10 outline-none focus:border-brand-orange/50 focus:ring-8 focus:ring-brand-orange/5 transition-all text-[15px] font-bold text-white placeholder:text-white/10"
                                            />
                                            <button 
                                                type="button" 
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-6 top-1/2 -translate-y-1/2 text-brand-orange hover:scale-125 transition-all"
                                            >
                                                {showPassword ? (
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542 7z" />
                                                    </svg>
                                                ) : (
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                                                    </svg>
                                                )}
                                            </button>
                                        </div>
                                    </div>

                                    <button 
                                        type="submit" 
                                        disabled={loading}
                                        className="w-full py-5 bg-brand-orange text-white rounded-2xl text-[11px] font-black uppercase tracking-[0.3em] shadow-2xl shadow-brand-orange/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-4 group disabled:opacity-50 disabled:scale-100"
                                    >
                                        {loading ? "Decrypting Hub..." : (
                                            <>
                                                Authorize Access
                                                <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                </svg>
                                            </>
                                        )}
                                    </button>
                                </form>

                                <div className="flex items-center justify-between pt-4">
                                    <label className="flex items-center gap-3 cursor-pointer">
                                        <input type="checkbox" className="w-5 h-5 rounded-lg border-white/10 bg-white/5 text-brand-orange focus:ring-offset-brand-navy" />
                                        <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">Keep Session</span>
                                    </label>
                                    <button 
                                        onClick={() => setForgotMode(true)}
                                        className="text-[10px] font-black text-brand-orange uppercase tracking-widest hover:underline underline-offset-4"
                                    >
                                        Forgot Password
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <div>
                                    <button 
                                        onClick={() => setForgotMode(false)}
                                        className="text-[10px] font-black text-brand-orange uppercase tracking-widest flex items-center gap-2 mb-6 hover:-translate-x-1 transition-transform"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
                                        </svg>
                                        Back to Login
                                    </button>
                                    <h2 className="text-3xl font-black text-white tracking-tight">Recover Hub</h2>
                                    <p className="text-white/40 font-bold mt-2 text-sm tracking-wide">
                                        {recoveryStep === 0 ? "Enter your UID to receive recovery code." : "Set your new security credentials."}
                                    </p>
                                </div>

                                <form onSubmit={recoveryStep === 0 ? handleRequestCode : handleResetPassword} className="space-y-6">
                                    {error && (
                                        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 text-red-500 text-[12px] font-black animate-shake">
                                            <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            {error}
                                        </div>
                                    )}
                                    {successMsg && (
                                        <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-2xl flex items-center gap-3 text-green-500 text-[12px] font-black">
                                            <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            {successMsg}
                                        </div>
                                    )}

                                    {recoveryStep === 0 ? (
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] ml-2">Username</label>
                                            <div className="relative group">
                                                <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none text-brand-orange group-focus-within:scale-110 transition-transform">
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                    </svg>
                                                </div>
                                                <input 
                                                    type="text" 
                                                    required
                                                    placeholder="Enter Admin UID"
                                                    value={id}
                                                    onChange={(e) => setId(e.target.value)}
                                                    className="w-full pl-16 pr-6 py-5 rounded-2xl bg-white/5 border border-white/10 outline-none focus:border-brand-orange/50 focus:ring-8 focus:ring-brand-orange/5 transition-all text-[15px] font-bold text-white placeholder:text-white/10"
                                                />
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="space-y-6">
                                            <div className="space-y-3">
                                                <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] ml-2">Recovery Code</label>
                                                <input 
                                                    type="text" 
                                                    required
                                                    placeholder="XXXXXX"
                                                    maxLength={6}
                                                    value={recoveryToken}
                                                    onChange={(e) => setRecoveryToken(e.target.value)}
                                                    className="w-full px-6 py-5 rounded-2xl bg-white/5 border border-white/10 outline-none focus:border-brand-orange/50 transition-all text-[24px] tracking-[1em] text-center font-black text-brand-orange placeholder:text-white/10"
                                                />
                                            </div>
                                            <div className="space-y-3">
                                                <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] ml-2">New Password</label>
                                                <div className="relative group">
                                                    <input 
                                                        type={showNewPassword ? "text" : "password"}
                                                        required
                                                        placeholder="Create New Password"
                                                        value={newPassword}
                                                        onChange={(e) => setNewPassword(e.target.value)}
                                                        className="w-full px-6 pr-16 py-5 rounded-2xl bg-white/5 border border-white/10 outline-none focus:border-brand-orange/50 transition-all text-[15px] font-bold text-white placeholder:text-white/10"
                                                    />
                                                    <button 
                                                        type="button" 
                                                        onClick={() => setShowNewPassword(!showNewPassword)}
                                                        className="absolute right-6 top-1/2 -translate-y-1/2 text-brand-orange hover:scale-125 transition-all"
                                                    >
                                                        {showNewPassword ? (
                                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542 7z" />
                                                            </svg>
                                                        ) : (
                                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                                                            </svg>
                                                        )}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    <button 
                                        type="submit" 
                                        disabled={loading}
                                        className="w-full py-5 bg-brand-orange text-white rounded-2xl text-[11px] font-black uppercase tracking-[0.3em] shadow-2xl shadow-brand-orange/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-4 group disabled:opacity-50 disabled:scale-100"
                                    >
                                        {loading ? "Processing Hub..." : (
                                            <>
                                                {recoveryStep === 0 ? "Request Reset Code" : "Update Credentials"}
                                                <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                </svg>
                                            </>
                                        )}
                                    </button>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            </div>

            <p className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[9px] font-black text-white/20 uppercase tracking-[0.5em]">
                Secure SSL Encrypted Protocol V2.1
            </p>
        </div>
    );
}
