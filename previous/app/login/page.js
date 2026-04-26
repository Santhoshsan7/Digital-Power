"use client";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
            <div className="container-narrow">
                {/* Logo */}
                <div className="text-center mb-8">
                    <Link href="/" className="inline-flex items-center gap-3">
                        <div className="w-14 h-14 bg-gradient-to-br from-brand-orange to-brand-orange-dark rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-brand-orange/30">
                            ⚡
                        </div>
                        <span className="text-2xl font-bold">
                            <span className="text-brand-navy">Digital</span>
                            <span className="text-brand-orange">Power</span>
                        </span>
                    </Link>
                </div>

                {/* Card */}
                <div className="form-container p-0 overflow-hidden">
                    {/* Tabs */}
                    <div className="flex border-b border-gray-100">
                        <button
                            onClick={() => setIsLogin(true)}
                            className={`flex-1 py-4 text-center font-bold transition-colors ${isLogin
                                ? "text-brand-orange border-b-2 border-brand-orange bg-brand-orange/5"
                                : "text-gray-500 hover:text-gray-700"
                                }`}
                        >
                            Login
                        </button>
                        <button
                            onClick={() => setIsLogin(false)}
                            className={`flex-1 py-4 text-center font-bold transition-colors ${!isLogin
                                ? "text-brand-orange border-b-2 border-brand-orange bg-brand-orange/5"
                                : "text-gray-500 hover:text-gray-700"
                                }`}
                        >
                            Register
                        </button>
                    </div>

                    {/* Form Content */}
                    <div className="p-8">
                        {isLogin ? (
                            /* Login Form */
                            <form className="space-y-6">
                                <div className="form-group">
                                    <label className="form-label">Email or Phone Number</label>
                                    <input type="text" placeholder="Enter email or phone" className="form-input" />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Password</label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Enter password"
                                            className="form-input pr-12"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                        >
                                            {showPassword ? "🙈" : "👁️"}
                                        </button>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between text-sm">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input type="checkbox" className="w-4 h-4 accent-brand-orange rounded" />
                                        <span className="text-gray-600">Remember me</span>
                                    </label>
                                    <a href="#" className="text-brand-orange hover:underline font-medium">
                                        Forgot Password?
                                    </a>
                                </div>

                                <button type="submit" className="form-submit">Login</button>
                            </form>
                        ) : (
                            /* Register Form */
                            <form className="space-y-5">
                                <div className="form-group">
                                    <label className="form-label">Full Name</label>
                                    <input type="text" placeholder="Enter your full name" className="form-input" />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Phone Number</label>
                                    <input type="tel" placeholder="Enter phone number" className="form-input" />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Email (Optional)</label>
                                    <input type="email" placeholder="Enter email address" className="form-input" />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Password</label>
                                    <input type="password" placeholder="Create a password" className="form-input" />
                                </div>

                                <div className="flex items-start gap-2">
                                    <input type="checkbox" className="w-4 h-4 accent-brand-orange rounded mt-1" />
                                    <span className="text-gray-600 text-sm">
                                        I agree to the <a href="#" className="text-brand-orange hover:underline">Terms of Service</a> and{" "}
                                        <a href="#" className="text-brand-orange hover:underline">Privacy Policy</a>
                                    </span>
                                </div>

                                <button type="submit" className="form-submit">Create Account</button>
                            </form>
                        )}

                        {/* Divider */}
                        <div className="flex items-center gap-4 my-6">
                            <hr className="flex-1 border-gray-200" />
                            <span className="text-gray-400 text-sm">or continue with</span>
                            <hr className="flex-1 border-gray-200" />
                        </div>

                        {/* Social Login */}
                        <div className="grid grid-cols-2 gap-4">
                            <button className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 py-3 rounded-xl font-medium transition-colors">
                                <span>📱</span>
                                Google
                            </button>
                            <button className="flex items-center justify-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-600 py-3 rounded-xl font-medium transition-colors">
                                <span>📘</span>
                                Facebook
                            </button>
                        </div>
                    </div>
                </div>

                {/* Guest Checkout */}
                <div className="mt-6 text-center">
                    <p className="text-gray-500 text-sm mb-3">Just want to browse?</p>
                    <Link
                        href="/inverter"
                        className="inline-flex items-center gap-2 text-brand-orange hover:text-brand-orange-dark font-medium transition-colors"
                    >
                        Continue as Guest
                        <span>→</span>
                    </Link>
                </div>

                {/* Help */}
                <div className="mt-8 text-center text-gray-400 text-sm">
                    Need help?{" "}
                    <a href="tel:9445955555" className="text-brand-orange hover:underline">
                        Call 94459 55555
                    </a>
                </div>
            </div>
        </div>
    );
}
