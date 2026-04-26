"use client";

import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { allProducts } from '@/data/products';
import { useCart } from '@/lib/CartContext';

function OrderConfirmationContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [product, setProduct] = useState(null);
    const { cartItems, getCartTotal, clearCart, promoDiscount } = useCart();
    const [status, setStatus] = useState('review'); // review | sending | success | error
    const [isCartMode, setIsCartMode] = useState(false);

    // Detailed User Details State
    const [userDetails, setUserDetails] = useState({
        name: '',
        phone: '',
        email: '',
        flat: '',      // House No, Building, Company
        area: '',      // Area, Street, Sector
        landmark: '',
        city: '',
        state: 'Tamil Nadu', // Default
        pincode: ''
    });

    const [errors, setErrors] = useState({}); // State for inline error messages

    // Helper to handle strict Input Logic
    const handleInput = (field, value, type) => {
        let cleanValue = value;

        if (type === 'text') {
            // STRICT: Allow ONLY Alphabets (A-Z, a-z) and Spaces. No numbers, no symbols.
            if (!/^[a-zA-Z\s]*$/.test(value)) {
                return; // Do NOT update state if invalid char contains
            }
        } else if (type === 'number') {
            // STRICT: Allow ONLY Digits (0-9).
            if (!/^\d*$/.test(value)) {
                return; // Do NOT update state
            }
        }

        setUserDetails(prev => ({ ...prev, [field]: cleanValue }));

        // Clear specific error when user types valid data
        if (errors[field]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[field];
                return newErrors;
            });
        }
    };

    const [loading, setLoading] = useState(true);
    const [shippingCost, setShippingCost] = useState(0);

    // Calculate Shipping Cost based on City & State
    useEffect(() => {
        const calculateShipping = () => {
            // 1. Chennai is ALWAYS Free
            // Check if city contains 'chennai' (e.g. "Chennai", "Chennai - 600028")
            if (userDetails.city && userDetails.city.toLowerCase().includes('chennai')) {
                return 0;
            }

            const state = userDetails.state;
            if (!state) return 0; // Fallback

            const s = state.toLowerCase();

            // 2. South India (inc. Rest of TN) -> ₹500
            if (['tamil nadu', 'kerala', 'karnataka', 'andhra pradesh', 'telangana', 'pondicherry'].includes(s)) {
                return 500;
            }

            // 3. Rest of India -> ₹1500
            return 1500;
        };

        setShippingCost(calculateShipping());
    }, [userDetails.state, userDetails.city]);

    const [confirmed, setConfirmed] = useState(false);
    const [orderResult, setOrderResult] = useState(null);

    useEffect(() => {
        const productId = searchParams.get('productId');
        const qty = searchParams.get('quantity');

        if (productId) {
            const foundProduct = allProducts.find(p => p.id === parseInt(productId));
            if (foundProduct) {
                setProduct({ ...foundProduct, orderQuantity: parseInt(qty) || 1 });
            }
        } else {
            setIsCartMode(true);
        }
        setLoading(false);
    }, [searchParams]);

    const getProductLink = (prod) => {
        if (!prod) return '/';
        const cat = prod.category?.toLowerCase();
        if (cat === 'inverter') return `/inverter/product/${prod.id}`;
        if (cat === 'battery') return `/batteries/product/${prod.id}`;
        if (cat === 'online ups') return `/online-ups/product/${prod.id}`;
        if (cat === 'combo') return `/combo-offer/product/${prod.id}`;
        return `/inverter/product/${prod.id}`;
    };

    // --- Validation Helper ---
    const isJunkData = (str) => {
        if (!str) return false;
        const s = str.toLowerCase().trim();
        
        // 1. Check if all characters are identical (e.g., "xxxx", "111111")
        if (s.length > 2 && new Set(s).size === 1) return true;
        
        // 2. Check for too many repeated alphabetical character sequences (e.g., "aaaa", "bbbb")
        // We allow digits to repeat (like 000 in 600028)
        if (/[a-z]/.test(s)) {
            if (/(.)\1{3,}/.test(s)) return true; // 4 or more repeats of ANY char if string contains letters
        }
        
        // 3. Check for repetitive pairs in text (e.g., "ababab", "jkjkjk")
        if (s.length >= 6 && !/^\d+$/.test(s)) {
            const pair = s.substring(0, 2);
            if (s.split(pair).join('').length === 0) return true;
        }

        // 4. Check for obvious junk / keyboard rows
        const junkWords = ['asdf', 'test', 'demo', 'junk', 'qwerty', 'zxcv'];
        if (junkWords.some(word => s.includes(word))) return true;

        return false;
    };

    const validateField = (name, value) => {
        let error = "";
        const val = (value || "").trim();

        if (!val && name !== 'landmark') {
            error = "This field is required";
        } else if (val && isJunkData(val)) {
            error = "Please enter valid details (No 'xxxx' or filler data)";
        } else if (val) {
            switch (name) {
                case 'name':
                    if (val.length < 3) error = "Name must be at least 3 characters";
                    break;
                case 'phone':
                    if (val.length !== 10) error = "Phone must be exactly 10 digits";
                    break;
                case 'email':
                    if (!/^\S+@\S+\.\S+$/.test(val)) error = "Invalid email format";
                    break;
                case 'flat':
                case 'area':
                    if (val.length < 5) error = "Address details must be at least 5 characters";
                    break;
                case 'city':
                    if (val.length < 3) error = "City name is too short";
                    break;
                case 'pincode':
                    if (val.length !== 6) error = "Pincode must be exactly 6 digits";
                    break;
                default:
                    break;
            }
        }

        setErrors(prev => {
            const newErrors = { ...prev };
            if (error) newErrors[name] = error;
            else delete newErrors[name];
            return newErrors;
        });
        return !error;
    };

    const handleStrictSubmit = async (e) => {
        e.preventDefault();
        console.log("Strict Submit Handler Triggered (Buy Now)");

        setErrors({});
        let hasError = false;

        // Run a full sweep of all required fields
        const fieldsToValidate = ['name', 'phone', 'email', 'flat', 'area', 'city', 'pincode'];
        
        fieldsToValidate.forEach(field => {
            if (!validateField(field, userDetails[field])) {
                hasError = true;
            }
        });

        // Landmark is optional but if filled, it should be valid
        if (userDetails.landmark && !validateField('landmark', userDetails.landmark)) {
            hasError = true;
        }

        // 7. Checkbox Confirmation
        if (!confirmed) {
            alert("Please check the confirmation box to proceed.");
            hasError = true;
        }

        if (hasError) {
            console.log("Validation Failed.");
            // Scroll to the first field that has an error
            const firstErrorField = fieldsToValidate.find(f => !validateField(f, userDetails[f]));
            const element = document.getElementById(firstErrorField);
            if (element) element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
        }

        setStatus('sending');

        // Construct full address from components
        const fullAddress = `
${userDetails.flat},
${userDetails.area},
${userDetails.landmark ? userDetails.landmark + ',' : ''}
${userDetails.city}, ${userDetails.state} - ${userDetails.pincode}
`.trim();

        // Place COD Order
        await placeOrder('COD-' + Date.now(), fullAddress);
    };

    const placeOrder = async (transactionId, formattedAddress) => {
        try {
            const itemTotal = isCartMode ? getCartTotal() : (product.salePrice * product.orderQuantity);
            const gstAmount = Math.round(itemTotal * 0.18);
            let finalTotal = itemTotal + gstAmount + shippingCost;

            if (isCartMode && promoDiscount > 0) {
                finalTotal = Math.max(0, finalTotal - promoDiscount);
            }

            // Restore API Order Placement (Standard Email + Database/File Logic)
            const response = await fetch('/api/send-order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    items: isCartMode ? cartItems : [{
                        ...product,
                        quantity: product.orderQuantity
                    }],
                    product: isCartMode ? cartItems[0] : product,
                    quantity: isCartMode ? cartItems.reduce((acc, curr) => acc + curr.quantity, 0) : product.orderQuantity,
                    total: finalTotal.toLocaleString('en-IN'),
                    userDetails: {
                        ...userDetails,
                        address: formattedAddress
                    },
                    shippingCost,
                    gstAmount,
                    promoDiscount: isCartMode ? promoDiscount : 0
                }),
            });

            const data = await response.json();

            if (data.success) {
                const orderId = data.orderId;
                const currentDate = data.date || new Date().toLocaleString('en-IN');

                // Set order result for success screen
                setOrderResult({ orderId, date: currentDate, finalTotal, success: true });
                setStatus('success');
                
                if (isCartMode) {
                    clearCart();
                }
            } else {
                throw new Error(data.message || "Failed to place order");
            }

        } catch (error) {
            console.error(error);
            setStatus('error');
            alert(error.message || "Something went wrong. Please try again.");
        }
    };

    const openWhatsApp = () => {
        const finalTotal = orderResult?.finalTotal || 0;
        const orderId = orderResult?.orderId || 'N/A';
        const currentDate = orderResult?.date || new Date().toLocaleString();

        const itemsList = isCartMode
            ? cartItems.map(item => `• ${item.name} (x${item.quantity || 1})`).join('\n')
            : `• ${product.name} (x${product.orderQuantity})`;

        const fullAddress = `
${userDetails.flat},
${userDetails.area},
${userDetails.landmark ? userDetails.landmark + ',' : ''}
${userDetails.city}, ${userDetails.state} - ${userDetails.pincode}
`.trim();

        const message = `🛒 *Order Confirmation - ${orderId}*

📦 *Items:*
${itemsList}

💰 *Total Amount:* ₹${finalTotal.toLocaleString('en-IN')}
💳 *Payment:* Cash on Delivery

👤 *Customer Info:*
Name: ${userDetails.name}
Phone: ${userDetails.phone}
Address: ${fullAddress}

📅 *Date:* ${currentDate}`;

        // Send to business number
        window.open(`https://wa.me/919445955555?text=${encodeURIComponent(message)}`, '_blank');
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-10 h-10 border-4 border-brand-orange border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <h2 className="text-xl font-bold text-gray-800">Loading Order Details...</h2>
                </div>
            </div>
        );
    }

    if (!isCartMode && !product) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center p-8 bg-white rounded-xl shadow-lg max-w-md">
                    <div className="text-5xl mb-4">🔍</div>
                    <h2 className="text-xl font-bold text-gray-800 mb-2">Order Details Not Found</h2>
                    <p className="text-gray-600 mb-6">We couldn't find the product details for your order.</p>
                    <Link href="/" className="btn-primary inline-flex">Return to Home</Link>
                </div>
            </div>
        );
    }

    if (status === 'success') {
        const finalTotal = orderResult?.finalTotal || 0;

        return (
            <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
                <div className="max-w-xl w-full bg-white rounded-2xl shadow-xl p-4 sm:p-8 text-center animate-fade-in-up border-t-4 border-green-500">

                    {/* Visual Stepper */}
                    <div className="grid grid-cols-4 mb-10 relative px-1 sm:px-2 gap-x-3 sm:gap-x-0">
                        {/* Connecting Line */}
                        <div className="absolute left-[12.5%] right-[12.5%] top-3 h-1 bg-gray-200 -z-0 rounded-full">
                            <div className="h-full bg-green-500 rounded-full transition-all duration-1000" style={{ width: '33.33%' }}></div>
                        </div>

                        {/* Step 1 */}
                        <div className="flex flex-col items-center gap-1.5 relative z-10">
                            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-green-500 flex items-center justify-center text-white text-[10px] sm:text-xs font-bold">✓</div>
                            <span className="text-[6.5px] sm:text-[10px] font-bold text-green-700 text-center leading-[1.1] max-w-[34px] sm:max-w-none tracking-tighter">Order placed</span>
                        </div>
                        {/* Step 2 */}
                        <div className="flex flex-col items-center gap-1.5 relative z-10">
                            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-blue-100 border-2 border-blue-500 flex items-center justify-center text-blue-600 text-[8px] sm:text-[10px] font-bold animate-pulse">2</div>
                            <span className="text-[6.5px] sm:text-[10px] font-bold text-blue-700 text-center leading-[1.1] max-w-[34px] sm:max-w-none tracking-tighter">Confirmation call</span>
                        </div>
                        {/* Step 3 */}
                        <div className="flex flex-col items-center gap-1.5 relative z-10">
                            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-[8px] sm:text-[10px] font-bold">3</div>
                            <span className="text-[6.5px] sm:text-[10px] font-medium text-gray-400 text-center leading-[1.1] max-w-[34px] sm:max-w-none tracking-tighter">Packed</span>
                        </div>
                        {/* Step 4 */}
                        <div className="flex flex-col items-center gap-1.5 relative z-10">
                            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-[8px] sm:text-[10px] font-bold">4</div>
                            <span className="text-[6.5px] sm:text-[10px] font-medium text-gray-400 text-center leading-[1.1] max-w-[34px] sm:max-w-none tracking-tighter">Delivered</span>
                        </div>
                    </div>

                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>

                    <h2 className="text-2xl font-bold text-brand-navy mb-2">Thank You for Your Order!</h2>
                    <p className="text-lg text-gray-800 font-medium mb-1">Order Received Successfully</p>
                    <p className="text-sm text-gray-500 mb-6">
                        Our team will contact you shortly to confirm delivery.<br />
                        <span className="font-bold text-brand-orange">Please keep your phone available.</span>
                    </p>

                    {orderResult?.orderId && (
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
                            <p className="text-xs text-gray-500 mb-1 uppercase tracking-wider">Order ID</p>
                            <p className="text-xl font-mono font-bold text-brand-navy tracking-wider">{orderResult.orderId}</p>
                            <p className="text-xs text-gray-400 mt-2">Total Amount: ₹{finalTotal.toLocaleString()}</p>
                        </div>
                    )}

                    <button
                        onClick={openWhatsApp}
                        className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all mb-4 shadow-lg shadow-green-200"
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.248-.57-.397m-5.473 6.94c-1.93 0-3.712-.524-5.266-1.439l-.377-.223-3.899 1.02 1.041-3.793-.245-.39c-1.044-1.649-1.597-3.575-1.597-5.592 0-5.772 4.697-10.469 10.473-10.469 2.798 0 5.428 1.089 7.406 3.068 1.977 1.98 3.064 4.611 3.064 7.41 0 5.774-4.697 10.471-10.47 10.471" /></svg>
                        Get Order Details on WhatsApp
                    </button>

                    <Link href="/" className="text-sm text-gray-500 hover:text-brand-navy underline mt-4 block">
                        Return to Home
                    </Link>
                </div>
            </div>
        );
    }

    if (isCartMode && cartItems.length === 0) {
        return <div className="min-h-screen flex items-center justify-center">Redirecting...</div>;
    }

    const itemTotal = isCartMode ? getCartTotal() : (product.salePrice * product.orderQuantity);

    // Calculate Original Total
    const originalTotal = isCartMode
        ? cartItems.reduce((total, item) => total + ((item.originalPrice || item.salePrice) * item.quantity), 0)
        : ((product?.originalPrice || product?.salePrice) * (product?.orderQuantity || 1));

    const baseSavings = originalTotal - itemTotal;

    // Calculate GST (Exclusive 18%)
    const gstAmount = Math.round(itemTotal * 0.18);
    let finalTotal = itemTotal + gstAmount + shippingCost;
    if (isCartMode && promoDiscount > 0) {
        finalTotal = Math.max(0, finalTotal - promoDiscount);
    }

    const totalSavings = baseSavings + (isCartMode && promoDiscount > 0 ? promoDiscount : 0);

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 relative">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    {isCartMode ? (
                        <Link href="/cart" className="text-sm text-gray-500 hover:text-brand-orange flex items-center gap-1 mb-4">
                            ← Back to Cart
                        </Link>
                    ) : (
                        <Link href={getProductLink(product)} className="text-sm text-gray-500 hover:text-brand-orange flex items-center gap-1 mb-4">
                            ← Back to Product
                        </Link>
                    )}
                    <h1 className="text-3xl font-extrabold text-brand-navy">Checkout</h1>
                    <p className="text-gray-600 mt-1">Complete your order with Cash on Delivery.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* LEFT [8 cols]: Details Form */}
                    <div className="lg:col-span-8 space-y-6">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                            <div className="bg-gray-50 p-4 border-b border-gray-200">
                                <h2 className="font-bold text-gray-800 flex items-center gap-2">
                                    <span>📍</span> Delivery Address
                                </h2>
                            </div>
                            <div className="p-6">
                                <form id="checkout-form" onSubmit={handleStrictSubmit} className="space-y-4">

                                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2">Contact Details</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="md:col-span-2">
                                            {/* NAME */}
                                            <input
                                                id="name"
                                                type="text"
                                                required
                                                minLength={3}
                                                className={`w-full px-4 py-3 rounded-lg border outline-none ${errors.name ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300 focus:ring-2 focus:ring-brand-orange/20'}`}
                                                placeholder="Full Name (Text Only) *"
                                                value={userDetails.name}
                                                onChange={(e) => handleInput('name', e.target.value, 'text')}
                                                onBlur={(e) => validateField('name', e.target.value)}
                                            />
                                            {errors.name && <p className="text-red-500 text-xs mt-1 font-medium">{errors.name}</p>}
                                        </div>
                                        <div>
                                            {/* PHONE */}
                                            <input
                                                id="phone"
                                                type="tel"
                                                required
                                                maxLength={10}
                                                className={`w-full px-4 py-3 rounded-lg border outline-none ${errors.phone ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300 focus:ring-2 focus:ring-brand-orange/20'}`}
                                                placeholder="Mobile Number *"
                                                value={userDetails.phone}
                                                onChange={(e) => handleInput('phone', e.target.value, 'number')}
                                                onBlur={(e) => validateField('phone', e.target.value)}
                                            />
                                            {errors.phone && <p className="text-red-500 text-xs mt-1 font-medium">{errors.phone}</p>}
                                        </div>
                                        <div>
                                            <input
                                                id="email"
                                                type="email"
                                                required
                                                className={`w-full px-4 py-3 rounded-lg border outline-none ${errors.email ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300 focus:ring-2 focus:ring-brand-orange/20'}`}
                                                placeholder="Email Address *"
                                                value={userDetails.email}
                                                onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
                                                onBlur={(e) => validateField('email', e.target.value)}
                                            />
                                            {errors.email && <p className="text-red-500 text-xs mt-1 font-medium">{errors.email}</p>}
                                        </div>
                                    </div>

                                    <div className="border-t border-gray-100 my-4"></div>

                                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2">Address Details</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="md:col-span-2">
                                            <input
                                                id="flat"
                                                type="text"
                                                required
                                                className={`w-full px-4 py-3 rounded-lg border outline-none ${errors.flat ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300 focus:ring-2 focus:ring-brand-orange/20'}`}
                                                placeholder="Flat, House no., Building, Company, Apartment *"
                                                value={userDetails.flat}
                                                onChange={(e) => setUserDetails({ ...userDetails, flat: e.target.value })}
                                                onBlur={(e) => validateField('flat', e.target.value)}
                                            />
                                            {errors.flat && <p className="text-red-500 text-xs mt-1 font-medium">{errors.flat}</p>}
                                        </div>
                                        <div className="md:col-span-2">
                                            <input
                                                id="area"
                                                type="text"
                                                required
                                                className={`w-full px-4 py-3 rounded-lg border outline-none ${errors.area ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300 focus:ring-2 focus:ring-brand-orange/20'}`}
                                                placeholder="Area, Street, Sector, Village *"
                                                value={userDetails.area}
                                                onChange={(e) => setUserDetails({ ...userDetails, area: e.target.value })}
                                                onBlur={(e) => validateField('area', e.target.value)}
                                            />
                                            {errors.area && <p className="text-red-500 text-xs mt-1 font-medium">{errors.area}</p>}
                                        </div>
                                        <div>
                                            <input
                                                id="landmark"
                                                type="text"
                                                required
                                                className={`w-full px-4 py-3 rounded-lg border outline-none ${errors.landmark ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300 focus:ring-2 focus:ring-brand-orange/20'}`}
                                                placeholder="Landmark *"
                                                value={userDetails.landmark}
                                                onChange={(e) => setUserDetails({ ...userDetails, landmark: e.target.value })}
                                                onBlur={(e) => validateField('landmark', e.target.value)}
                                            />
                                            {errors.landmark && <p className="text-red-500 text-xs mt-1 font-medium">{errors.landmark}</p>}
                                        </div>
                                        <div>
                                            {/* PINCODE */}
                                            <input
                                                id="pincode"
                                                type="tel"
                                                required
                                                maxLength={6}
                                                className={`w-full px-4 py-3 rounded-lg border outline-none ${errors.pincode ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300 focus:ring-2 focus:ring-brand-orange/20'}`}
                                                placeholder="Pincode *"
                                                value={userDetails.pincode}
                                                onChange={(e) => handleInput('pincode', e.target.value, 'number')}
                                                onBlur={(e) => validateField('pincode', e.target.value)}
                                            />
                                            {errors.pincode && <p className="text-red-500 text-xs mt-1 font-medium">{errors.pincode}</p>}
                                        </div>
                                        <div>
                                            <input
                                                id="city"
                                                type="text"
                                                required
                                                className={`w-full px-4 py-3 rounded-lg border outline-none ${errors.city ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300 focus:ring-2 focus:ring-brand-orange/20'}`}
                                                placeholder="Town/City *"
                                                value={userDetails.city}
                                                onChange={(e) => handleInput('city', e.target.value, 'text')}
                                                onBlur={(e) => validateField('city', e.target.value)}
                                            />
                                            {errors.city && <p className="text-red-500 text-xs mt-1 font-medium">{errors.city}</p>}
                                        </div>
                                        <div>
                                            <select
                                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange outline-none transition-all bg-white"
                                                value={userDetails.state}
                                                onChange={(e) => setUserDetails({ ...userDetails, state: e.target.value })}
                                            >
                                                <option value="Tamil Nadu">Tamil Nadu</option>
                                                <option value="Andhra Pradesh">Andhra Pradesh</option>
                                                <option value="Karnataka">Karnataka</option>
                                                <option value="Kerala">Kerala</option>
                                                <option value="Telangana">Telangana</option>
                                                <option value="Pondicherry">Pondicherry</option>
                                                <option value="Maharashtra">Maharashtra</option>
                                                <option value="Delhi">Delhi</option>
                                                <option value="Other">Other</option>
                                            </select>
                                        </div>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT [4 cols]: Order Summary */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden sticky top-6">
                            <div className="bg-gray-50 p-4 border-b border-gray-200">
                                <h2 className="font-bold text-gray-800 flex items-center gap-2">
                                    <span>🧾</span> Order Summary
                                </h2>
                            </div>
                            <div className="p-6">
                                {isCartMode ? (
                                    <div className="max-h-60 overflow-y-auto pr-2 mb-4 space-y-4">
                                        {cartItems.map((item) => (
                                            <div key={item.id} className="flex gap-4">
                                                <div className="relative w-12 h-12 bg-gray-50 rounded border border-gray-100 flex-shrink-0">
                                                    <Image src={item.image} alt={item.name} fill className="object-contain p-1" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="font-bold text-gray-800 text-xs truncate">{item.name}</h3>
                                                    <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="flex gap-4 mb-4">
                                        <div className="relative w-16 h-16 bg-gray-50 rounded border border-gray-100 flex-shrink-0">
                                            <Image src={product?.image} alt={product?.name} fill className="object-contain p-1" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-bold text-gray-800 text-sm truncate">{product?.name}</h3>
                                            <p className="text-xs text-gray-500">Qty: {product?.orderQuantity}</p>
                                        </div>
                                    </div>
                                )}

                                <div className="space-y-2 text-sm border-t border-gray-100 pt-4 text-gray-600">
                                    <div className="flex justify-between">
                                        <span>Item Total</span>
                                        <span>₹{itemTotal.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-brand-orange">
                                        <span>Delivery Charges</span>
                                        <span className="font-extrabold uppercase">
                                            {shippingCost === 0 ? 'FREE' : `+ ₹${shippingCost.toLocaleString()}`}
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-green-600">
                                        <span>Installation</span>
                                        <span className="font-bold">FREE</span>
                                    </div>
                                    <div className="flex justify-between text-gray-500">
                                        <span>GST (18%)</span>
                                        <span>₹{gstAmount.toLocaleString()}</span>
                                    </div>
                                    {isCartMode && promoDiscount > 0 && (
                                        <div className="flex justify-between text-brand-orange font-medium animate-pulse">
                                            <span>Promo Discount</span>
                                            <span>- ₹{promoDiscount?.toLocaleString()}</span>
                                        </div>
                                    )}
                                    {totalSavings > 0 && (
                                        <div className="flex justify-between text-green-600 font-bold bg-green-50 px-3 py-2 rounded-lg mt-2">
                                            <span>Total Savings</span>
                                            <span>₹{totalSavings.toLocaleString()}</span>
                                        </div>
                                    )}
                                </div>

                                <div className="flex justify-between pt-4 mt-4 border-t-2 border-dashed border-gray-200 text-xl font-extrabold text-brand-navy">
                                    <span>Order Total</span>
                                    <span>₹{finalTotal.toLocaleString()}</span>
                                </div>

                                {/* Confirmation Section inside Summary */}
                                <div className="mt-6">
                                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                                        <h3 className="text-xs font-bold text-yellow-800 uppercase mb-1">
                                            Confirmation
                                        </h3>
                                        <div className="flex items-start gap-2">
                                            <input
                                                id="confirm_terms"
                                                type="checkbox"
                                                checked={confirmed}
                                                onChange={(e) => setConfirmed(e.target.checked)}
                                                className="w-4 h-4 mt-0.5 text-brand-orange border-gray-300 rounded focus:ring-brand-orange cursor-pointer flex-shrink-0"
                                            />
                                            <label htmlFor="confirm_terms" className="text-xs text-yellow-900 cursor-pointer select-none leading-tight">
                                                I confirm that I am placing this COD order and will accept delivery.
                                            </label>
                                        </div>
                                    </div>

                                    {status === 'error' && (
                                        <div className="text-red-600 text-xs bg-red-50 p-2 rounded mb-2 text-center">
                                            Order Failed. Try again.
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        form="checkout-form"
                                        disabled={!confirmed || status === 'sending'}
                                        className="w-full bg-brand-orange text-white py-3.5 rounded-xl font-bold hover:bg-orange-600 transition-all shadow-lg shadow-brand-orange/20 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:shadow-none"
                                    >
                                        {status === 'sending' ? (
                                            <>
                                                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                                Processing...
                                            </>
                                        ) : (
                                            <>
                                                Place Order
                                            </>
                                        )}
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default function OrderConfirmationPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
            <OrderConfirmationContent />
        </Suspense>
    );
}
