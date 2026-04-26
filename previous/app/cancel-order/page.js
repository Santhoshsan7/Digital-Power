"use client";

import { useSearchParams } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { allProducts } from '@/data/products';

function CancelOrderContent() {
    const searchParams = useSearchParams();
    const orderId = searchParams.get('orderId');
    const email = searchParams.get('email');
    const productName = searchParams.get('name') || 'Order Item';
    const productImage = searchParams.get('image');
    const productQty = searchParams.get('qty') || '1';
    const productTotal = searchParams.get('total');
    const productCapacity = searchParams.get('capacity');

    // Find the product in catalog to ensure price accuracy
    const catalogProduct = allProducts.find(p => 
        p.name?.toLowerCase() === productName?.toLowerCase() || 
        p.shortName?.toLowerCase() === productName?.toLowerCase()
    );

    const currentPrice = catalogProduct ? catalogProduct.salePrice : productTotal;

    const [status, setStatus] = useState('loading'); // loading | confirm | processing | success | already_cancelled | error
    const [message, setMessage] = useState('');

    // Check if order is already cancelled on load
    useEffect(() => {
        const checkStatus = async () => {
            if (!orderId) {
                setStatus('error');
                return;
            }
            try {
                const res = await fetch(`/api/cancel-order?orderId=${orderId}`);
                const data = await res.json();
                if (data.isCancelled) {
                    setStatus('already_cancelled');
                } else {
                    setStatus('confirm');
                }
            } catch (error) {
                setStatus('confirm'); // Fallback to confirm if check fails
            }
        };
        checkStatus();
    }, [orderId]);

    const handleCancel = async () => {
        setStatus('processing');
        try {
            const res = await fetch('/api/cancel-order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    orderId, 
                    email,
                    productName,
                    productImage,
                    productQty,
                    productTotal,
                    productCapacity
                })
            });
            const data = await res.json();

            if (res.ok) {
                setStatus('success');
            } else {
                setMessage(data.message || 'Failed to cancel order');
                setStatus('error');
            }
        } catch (error) {
            setMessage('Something went wrong. Please try again.');
            setStatus('error');
        }
    };

    if (status === 'loading') {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 text-center">
                <div className="animate-pulse space-y-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-full mx-auto"></div>
                    <div className="h-4 bg-gray-200 rounded w-48 mx-auto"></div>
                </div>
            </div>
        );
    }

    if (!orderId || !email) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
                <div className="bg-white p-10 rounded-2xl shadow-xl text-center max-w-md w-full border border-gray-100 animate-in fade-in zoom-in duration-300">
                    <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                    </div>
                    <h1 className="text-2xl font-black text-gray-900 mb-3">Invalid Link</h1>
                    <p className="text-gray-500 mb-8 leading-relaxed">We couldn't find your order details. Please check the link in your confirmation email or contact support.</p>
                    <Link href="/" className="inline-flex items-center justify-center px-8 py-3 bg-brand-navy text-white font-bold rounded-xl hover:bg-black transition-all shadow-lg">Go Home</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 sm:p-6 font-sans">
            <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-gray-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
                
                {/* Header branding */}
                <div className="bg-brand-navy p-6 flex justify-center border-b border-white/10">
                    <img src="/images/logo.png" alt="Digital Power" className="h-10 w-auto brightness-0 invert" />
                </div>

                <div className="p-8 sm:p-10">
                    {status === 'confirm' && (
                        <div className="space-y-8">
                            <div className="text-center">
                                <h1 className="text-3xl font-black text-gray-900 mb-2 tracking-tight">Request Cancellation</h1>
                                <p className="text-gray-500 text-sm">Order ID: <span className="font-bold text-gray-800">{orderId}</span></p>
                            </div>

                            {/* Product Card - Professional/Unique Attributes */}
                            <div className="bg-gray-50 rounded-2xl p-5 border border-gray-200 flex gap-5 group hover:border-brand-orange/30 transition-colors">
                                <div className="w-24 h-24 bg-white rounded-xl border border-gray-100 flex items-center justify-center flex-shrink-0 shadow-sm overflow-hidden p-2">
                                    <img 
                                        src={productImage || 'https://placehold.co/400x400?text=Product'} 
                                        alt={productName} 
                                        className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300" 
                                        onError={(e) => { e.target.src = 'https://placehold.co/400x400?text=Digital+Power'; }}
                                    />
                                </div>
                                <div className="flex flex-col justify-center min-w-0">
                                    <h3 className="text-sm font-bold text-gray-900 line-clamp-2 leading-tight mb-2" title={productName}>{productName}</h3>
                                    <div className="flex flex-wrap gap-2 mb-2">
                                        <span className="text-[10px] bg-white border border-gray-200 px-2 py-0.5 rounded-full text-gray-500 font-bold">Qty: {productQty}</span>
                                        {productCapacity && <span className="text-[10px] bg-brand-orange/10 border border-brand-orange/20 px-2 py-0.5 rounded-full text-brand-orange font-bold uppercase">{productCapacity}</span>}
                                    </div>
                                    {currentPrice && (
                                        <p className="text-sm font-black text-gray-900">
                                            ₹{(!isNaN(Number(String(currentPrice).replace(/[^0-9.]/g, ''))) 
                                                ? Number(String(currentPrice).replace(/[^0-9.]/g, '')).toLocaleString('en-IN') 
                                                : currentPrice)}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="bg-red-50 rounded-xl p-4 border border-red-100">
                                <p className="text-red-700 text-xs leading-relaxed text-center font-medium">
                                    Are you sure? Once cancelled, this order cannot be reclaimed at its current promotional price.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                                <Link 
                                    href="/" 
                                    className="w-full bg-green-600 text-white py-4 rounded-xl font-black flex items-center justify-center hover:bg-green-700 active:scale-95 transition-all shadow-lg shadow-green-600/20 order-2 sm:order-1"
                                    style={{ backgroundColor: '#2e7d32' }}
                                >
                                    Keep Order
                                </Link>
                                <button
                                    onClick={handleCancel}
                                    className="w-full bg-red-600 text-white py-4 rounded-xl font-black hover:bg-red-700 active:scale-95 transition-all shadow-lg shadow-red-600/20 order-1 sm:order-2"
                                    style={{ backgroundColor: '#d32f2f' }}
                                >
                                    Confirm Cancel
                                </button>
                            </div>
                        </div>
                    )}

                    {status === 'processing' && (
                        <div className="py-20 text-center space-y-6">
                            <div className="relative w-20 h-20 mx-auto">
                                <div className="absolute inset-0 border-4 border-gray-100 rounded-full"></div>
                                <div className="absolute inset-0 border-4 border-brand-orange border-t-transparent rounded-full animate-spin"></div>
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-gray-900 mb-1">Processing...</h2>
                                <p className="text-gray-500 text-sm">We're updating your order status.</p>
                            </div>
                        </div>
                    )}

                    {status === 'already_cancelled' && (
                        <div className="text-center space-y-8 animate-in zoom-in duration-300">
                            <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mx-auto ring-8 ring-blue-50/50">
                                <svg className="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            </div>
                            <div className="space-y-2">
                                <h1 className="text-3xl font-black text-gray-900 tracking-tight leading-tight">Already Cancelled</h1>
                                <p className="text-gray-500 leading-relaxed max-w-[280px] mx-auto text-sm">
                                    Order <span className="font-bold text-gray-800">{orderId}</span> has already been cancelled successfully. No further action is required.
                                </p>
                            </div>

                            <Link href="/" className="inline-flex items-center justify-center w-full bg-brand-navy text-white py-4 rounded-xl font-black hover:bg-black transition-all shadow-xl shadow-brand-navy/20">
                                Return to Store
                            </Link>
                        </div>
                    )}

                    {status === 'success' && (
                        <div className="text-center space-y-8 animate-in zoom-in duration-300">
                            <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto ring-8 ring-green-50/50">
                                <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                            </div>
                            <div className="space-y-2">
                                <h1 className="text-3xl font-black text-gray-900 tracking-tight">Order Cancelled</h1>
                                <p className="text-gray-500 leading-relaxed max-w-[280px] mx-auto text-sm">
                                    Order <span className="font-bold text-gray-800">{orderId}</span> has been successfully removed from our queue.
                                </p>
                            </div>

                            {/* Item Summary (Success State) */}
                            <div className="bg-gray-50 rounded-2xl p-4 flex items-center gap-4 opacity-70 grayscale scale-95 border border-dashed border-gray-300 mx-auto max-w-[320px]">
                                <div className="w-12 h-12 bg-white rounded-lg border border-gray-100 flex items-center justify-center flex-shrink-0 p-1">
                                    <img 
                                        src={productImage || 'https://placehold.co/100x100?text=Product'} 
                                        className="w-full h-full object-contain" 
                                        onError={(e) => { e.target.src = 'https://placehold.co/100x100?text=Digital+Power'; }}
                                    />
                                </div>
                                <div className="text-left min-w-0">
                                    <p className="text-xs font-bold text-gray-700 truncate">{productName}</p>
                                    <p className="text-[10px] text-gray-400">Cancelled successfully</p>
                                </div>
                            </div>

                            <Link href="/" className="inline-flex items-center justify-center w-full bg-brand-navy text-white py-4 rounded-xl font-black hover:bg-black transition-all shadow-xl shadow-brand-navy/20">
                                Return to Store
                            </Link>
                            <p className="text-[10px] text-gray-400 font-medium">A confirmation email has been dispatched.</p>
                        </div>
                    )}

                    {status === 'error' && (
                        <div className="text-center space-y-8">
                            <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto">
                                <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                            </div>
                            <div>
                                <h1 className="text-2xl font-black text-gray-900 mb-2">Something went wrong</h1>
                                <p className="text-red-500 text-sm font-medium">{message}</p>
                            </div>
                            <button
                                onClick={() => setStatus('confirm')}
                                className="w-full bg-gray-900 text-white py-4 rounded-xl font-black hover:bg-black transition-all"
                            >
                                Try Again
                            </button>
                        </div>
                    )}
                </div>
                
                {/* Footer simple */}
                <div className="p-6 bg-gray-50 border-t border-gray-100 text-center">
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Digital Power Inverters & Solutions</p>
                </div>
            </div>
        </div>
    );
}

export default function CancelOrderPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <CancelOrderContent />
        </Suspense>
    );
}
