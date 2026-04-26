"use client";

import Link from "next/link";
import Image from "next/image";
import ProductImage from "./ProductImage";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useCart } from "@/lib/CartContext";

export default function ProductDetailView({ product, categoryLabel, backUrl }) {
    const router = useRouter();
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState('description');
    const [mainImage, setMainImage] = useState(product.image);
    const { addToCart, setIsCartOpen } = useCart();

    // Category-specific review templates
    const inverterReviews = [
        "This inverter is a lifesaver during frequent power cuts. The switchover is so fast, my computer doesn't even reboot.",
        "Smooth operation and silent performance. Can run my TV and fans comfortably.",
        "Microtek has always been reliable. This model handles load very well.",
        "Best inverter for home use. Simple design and effective backup.",
        "I am running a gaming PC on this UPS mode, and it works flawlessly.",
        "Compact size, doesn't take much space. Installation was easy.",
        "Great efficiency. My electricity bill hasn't increased much after installing this.",
        "The LCD display is very helpful to know the battery status and load.",
        "Handles voltage fluctuations perfectly. Safe for sensitive electronics.",
        "Very happy with this inverter. Digital Power delivered it quickly."
    ];

    const batteryReviews = [
        "Excellent backup time! Provides more than 6 hours for my 2BHK flat.",
        "Heavy duty battery. You can feel the quality just by the weight.",
        "Low maintenance battery. Water topping is required very rarely.",
        "Best replacement for my old battery. The backup has doubled.",
        "Eastman/Luminous batteries are the best. Trustworthy performance.",
        "Tubular technology is definitely better for long power cuts.",
        "Received a fresh stock unit (checked manufacturing date). Very satisfied.",
        "Charging is quick compared to my previous flat plate battery.",
        "No acid spillage or heating issues. Very safe for indoor use.",
        "Warranty registration was smooth. Good support from the dealer."
    ];

    const commonReviews = [
        "Value for money product. Highly recommended.",
        "Delivery was on time and packaging was secure.",
        "Great service by Digital Power. They guided me to buy the right product.",
        "Five stars for performance and pricing.",
        "Don't think twice, just go for it. Worth every penny.",
        "Genuine product with proper warranty card.",
        "Installation guy was very polite and professional.",
        "Working perfectly for the last 3 months. No complaints.",
        "Good build quality and aesthetic look.",
        "Exceeded my expectations. Very happy customer."
    ];

    const indianNames = [
        "Rajesh Kumar", "Amit Sharma", "Priya Menon", "Sneha Reddy", "Vikram Jha",
        "Anjali Desai", "Suresh Babu", "Rahul Tiwari", "Nisha Patel", "Arjun Kapoor",
        "Kavita Lakshmi", "Deepak Chopra", "Meera Nair", "Sanjay Gupta", "Divya Verma",
        "Rohan Mehta", "Ishaan Malhotra", "Karthik Subramaniam", "Neha Singh", "Manish Pandey"
    ];

    // Seeded random number generator to ensure consistent reviews per product
    const seededRandom = (seed) => {
        var x = Math.sin(seed++) * 10000;
        return x - Math.floor(x);
    };

    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        // Generate deterministic reviews based on product ID
        const generateReviews = () => {
            const seed = product.id * 123;

            // Select appropriate bucket based on category
            let selectedTemplates = [...commonReviews];
            if (product?.category === 'Inverter' || product?.category === 'Online UPS') {
                selectedTemplates = [...inverterReviews, ...commonReviews];
            } else if (product?.category === 'Battery') {
                selectedTemplates = [...batteryReviews, ...commonReviews];
            } else {
                selectedTemplates = [...inverterReviews, ...batteryReviews, ...commonReviews]; // Combo or others
            }

            // Shuffle templates deterministically to prevent duplicates
            // Fisher-Yates shuffle with seeded random
            let shuffled = [...selectedTemplates];
            for (let i = shuffled.length - 1; i > 0; i--) {
                const j = Math.floor(seededRandom(seed + i + 500) * (i + 1));
                [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
            }

            const count = Math.floor(seededRandom(seed) * (12 - 6 + 1)) + 6; // 6 to 12 reviews
            const uniqueTemplates = shuffled.slice(0, count);
            const generatedReviews = [];

            uniqueTemplates.forEach((template, i) => {
                const nameIndex = Math.floor(seededRandom(seed + i) * indianNames.length);
                const daysAgo = Math.floor(seededRandom(seed + i + 200) * 30); // 0-30 days ago
                const randomRating = Math.floor(seededRandom(seed + i + 300) * 2) + 4; // 4 or 5

                const date = new Date();
                date.setDate(date.getDate() - daysAgo);
                const dateStr = date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

                generatedReviews.push({
                    id: i + 1,
                    user: indianNames[nameIndex],
                    rating: randomRating,
                    date: dateStr,
                    comment: template
                });
            });
            return generatedReviews;
        };

        setReviews(generateReviews());
    }, [product.id]);

    const [newReview, setNewReview] = useState({
        user: "",
        rating: 5,
        comment: ""
    });

    const handleReviewSubmit = (e) => {
        e.preventDefault();
        const review = {
            id: reviews.length + 1,
            ...newReview,
            date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
        };
        setReviews([review, ...reviews]); // Add new review to the top
        setNewReview({ user: "", rating: 5, comment: "" });
    };

    // Determine placeholders based on category and brand
    const getPlaceholders = () => {
        const cat = categoryLabel?.toLowerCase() || '';
        const brand = product.brand?.toLowerCase() || '';

        if (cat.includes('inverter') || cat.includes('combo')) {
            // Luminous is typically blue/white
            if (brand.includes('luminous') || brand.includes('amaron')) {
                return [
                    '/images/placeholders/inverter_blue_side.png',
                    '/images/placeholders/inverter_blue_top.png',
                    '/images/placeholders/inverter_blue_back.png'
                ];
            }
            // Default to Red (Microtek, Massimo, etc.)
            return [
                '/images/placeholders/inverter_red_side.png',
                '/images/placeholders/inverter_red_top.png',
                '/images/placeholders/inverter_red_back.png'
            ];
        }

        if (cat.includes('batteries') || cat.includes('battery')) {
            // For now using the generic battery placeholder (Red/White) for all
            // matches generic Microtek/Exide style
            return [
                '/images/placeholders/battery_side.png',
                '/images/placeholders/battery_top.png',
                '/images/placeholders/battery_back.png'
            ];
        }

        if (cat.includes('ups') || cat.includes('online')) {
            return [
                '/images/placeholders/ups_side.png',
                '/images/placeholders/ups_top.png',
                '/images/placeholders/ups_back.png'
            ];
        }

        return [product.image, product.image, product.image]; // Fallback
    };

    const galleryImages = product.gallery && product.gallery.length > 0
        ? product.gallery
        : [product.image, ...getPlaceholders()];

    const handleAddToCart = () => {
        addToCart(product, quantity);
        setIsCartOpen(true);
    };

    const handleBuyNow = () => {
        router.push(`/order-confirmation?productId=${product.id}&quantity=${quantity}`);
    };

    const savings = product.originalPrice - product.salePrice;
    const discountPercentage = Math.round((savings / product.originalPrice) * 100);

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
            {/* Breadcrumb - Clean & Simple */}
            <div className="bg-white border-b border-gray-200">
                <div className="container-wide py-3">
                    <nav className="flex items-center gap-2 text-xs text-gray-600 font-medium">
                        <Link href="/" className="hover:text-brand-orange transition-colors opacity-80 hover:opacity-100">Home</Link>
                        <span className="text-gray-400">/</span>
                        <Link href={backUrl} className="hover:text-brand-orange transition-colors opacity-80 hover:opacity-100">{categoryLabel}</Link>
                        <span className="text-gray-400">/</span>
                        <span className="text-gray-900 font-bold truncate">{product.shortName || product.name}</span>
                    </nav>
                </div>
            </div>

            {/* Main Product Layout - Amazon Style */}
            <section className="py-8">
                <div className="container-wide bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

                        {/* LEFT: Image Gallery (5 columns) */}
                        <div className="lg:col-span-5 flex flex-col gap-4">
                            {/* Main Image */}
                            <div className="relative rounded-2xl flex items-center justify-center h-[400px] border border-gray-100 overflow-hidden group">
                                {product.discount && (
                                    <div className="absolute top-6 left-6 bg-gradient-to-r from-red-600 to-red-500 text-white text-xs font-black px-4 py-1.5 rounded-full z-20 flex items-center justify-center uppercase tracking-wider scale-110">
                                        {product.discount}
                                    </div>
                                )}
                                <div className="relative w-full h-full p-6">
                                    <ProductImage
                                        src={mainImage}
                                        alt={product.name}
                                        fill
                                        className="object-contain transition-all duration-300 group-hover:scale-105"
                                        priority
                                    />
                                </div>
                            </div>

                            {/* Thumbnails (Below Main Image) */}
                            <div className="flex gap-4 justify-center">
                                {galleryImages.map((img, index) => (
                                    <button
                                        key={index}
                                        onMouseEnter={() => setMainImage(img)}
                                        className={`w-20 h-20 border rounded-lg overflow-hidden relative cursor-pointer hover:border-brand-orange hover:shadow-md transition-all ${mainImage === img ? 'border-brand-orange ring-1 ring-brand-orange shadow-md' : 'border-gray-200'}`}
                                    >
                                        <ProductImage src={img} alt={`${product.name} View ${index + 1}`} fill className="object-contain p-1" />
                                    </button>
                                ))}
                            </div>



                        </div>

                        {/* RIGHT: Product Info (7 columns) */}
                        <div className="lg:col-span-7 flex flex-col">
                            {/* Product Name */}
                            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight mb-2">
                                {product.name}
                            </h1>

                            {/* Ratings & Buyers */}
                            <div className="flex items-center gap-4 mb-4 border-b border-gray-100 pb-4">
                                <div className="flex items-center gap-1">
                                    <div className="flex text-amber-500 text-sm">
                                        {[...Array(5)].map((_, i) => (
                                            <span key={i} className="drop-shadow-sm">{i < Math.floor(product.rating) ? "★" : "☆"}</span>
                                        ))}
                                    </div>
                                    <span className="text-blue-600 text-sm font-medium hover:underline cursor-pointer ml-1">
                                        {product.rating}
                                    </span>
                                </div>
                                <div className="text-sm text-gray-500 border-l border-gray-300 pl-4">
                                    <span className="font-semibold text-gray-800">
                                        {(product.id * 37 % 1500 + 500).toLocaleString()}+
                                    </span> people bought this recently
                                </div>
                            </div>

                            {/* Pricing Section */}
                            <div className="mb-6">
                                <div className="flex items-baseline gap-3">
                                    <span className="text-red-600 text-sm font-medium">-{discountPercentage}%</span>
                                    <span className="text-4xl font-bold text-gray-900">₹{product.salePrice.toLocaleString()}</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
                                    <span>M.R.P.:</span>
                                    <span className="line-through">₹{product.originalPrice.toLocaleString()}</span>
                                </div>
                                <div className="text-gray-900 text-sm mt-1">
                                    You save: <span className="text-red-600 font-bold">₹{savings.toLocaleString()} ({discountPercentage}%)</span>
                                </div>
                                <div className="mt-2 text-sm text-gray-800 bg-gray-50 p-3 rounded-lg border border-gray-200 inline-block">
                                    <span className="font-bold text-brand-orange">Offer:</span> Get additional ₹500 off on exchange of old battery.
                                </div>
                            </div>



                            {/* Specs Grid */}
                            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm max-w-lg mb-6">
                                <div className="flex gap-2"><span className="font-bold text-gray-700 w-24">Brand:</span> <span>{product.brand}</span></div>
                                <div className="flex gap-2"><span className="font-bold text-gray-700 w-24">Model:</span> <span>{product.shortName}</span></div>
                                <div className="flex gap-2"><span className="font-bold text-gray-700 w-24">Capacity:</span> <span>{product.capacity}</span></div>
                                <div className="flex gap-2"><span className="font-bold text-gray-700 w-24">Voltage:</span> <span>{product.voltage || '12V'}</span></div>
                                <div className="flex gap-2"><span className="font-bold text-gray-700 w-24">Warranty:</span> <span>{product.warranty}</span></div>
                                <div className="flex gap-2">
                                    <span className="font-bold text-gray-700 w-24">Availability:</span>
                                    <span className={product.inStock ? "text-green-600 font-bold" : "text-red-600 font-bold"}>
                                        {product.inStock ? "In Stock" : "Unavailable"}
                                    </span>
                                </div>
                            </div>

                            {/* Key Features */}
                            <div className="mb-12">
                                <h3 className="font-bold text-gray-900 mb-2">About this item</h3>
                                <ul className="list-disc list-outside ml-5 space-y-1 text-sm text-gray-700">
                                    {product.features.map((feature, i) => (
                                        <li key={i}>{feature}</li>
                                    ))}
                                </ul>
                            </div>

                            {/* Actions */}
                            <div className="mt-8 md:mt-12 bg-gray-50 p-4 lg:p-6 rounded-xl border border-gray-200 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                                {/* Quantity */}
                                <div className="flex items-center justify-between sm:justify-start gap-4 mb-2 sm:mb-0">
                                    <label className="text-sm font-semibold text-gray-700">Quantity:</label>
                                    <div className="flex items-center border border-gray-300 rounded-md bg-white">
                                        <button
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            className="px-4 py-2 text-gray-600 hover:bg-gray-100 border-r border-gray-300 transition-colors"
                                        >
                                            -
                                        </button>
                                        <span className="px-4 py-2 font-medium text-gray-900 min-w-[3rem] text-center">{quantity}</span>
                                        <button
                                            onClick={() => setQuantity(quantity + 1)}
                                            className="px-4 py-2 text-gray-600 hover:bg-gray-100 border-l border-gray-300 transition-colors"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                {/* Buttons Container */}
                                <div className="flex flex-col sm:flex-row gap-3 flex-1">
                                    {/* Cart Button */}
                                    <button
                                        onClick={handleAddToCart}
                                        disabled={!product.inStock}
                                        className={`flex-1 py-3.5 px-6 rounded-xl font-bold text-white shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 ${product.inStock
                                            ? 'bg-brand-orange hover:bg-orange-600 text-white shadow-orange-500/20'
                                            : 'bg-gray-300 cursor-not-allowed'
                                            }`}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                                        </svg>
                                        {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                                    </button>

                                    {/* WhatsApp/Order Now */}
                                    <button
                                        onClick={handleBuyNow}
                                        className="flex-1 py-3.5 px-6 rounded-xl font-bold text-white shadow-md bg-green-600 hover:bg-green-700 shadow-green-600/20 text-center transition-all active:scale-95 flex items-center justify-center gap-2 whitespace-nowrap"
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" /></svg>
                                        Order Now
                                    </button>
                                </div>
                            </div>

                            {/* Product Overview */}
                            <div className="mt-16 pt-8 border-t border-gray-100">
                                <h4 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wide">Product Overview</h4>
                                <p className="text-sm text-gray-600 leading-relaxed text-justify">
                                    The <strong>{product.name}</strong> is a high-performance power solution engineered for reliability and efficiency. Featuring advanced <strong>{product.type}</strong> technology and a capacity of <strong>{product.capacity}</strong>, it ensures consistent and stable power delivery. Built with durability in mind, this product comes with a comprehensive <strong>{product.warranty} warranty</strong>. It is suitable for both <strong>home and office environments</strong>. Trust in the quality of <strong>{product.brand}</strong> to keep your life running smoothly.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section >

            {/* Detailed Description / Technical Specs Tabs */}
            < section className="pb-16 pt-6" >
                <div className="container-wide">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="flex border-b border-gray-200 bg-gray-50">
                            {['description', 'specifications', 'reviews'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`flex-1 px-2 md:px-8 py-3 md:py-4 text-[10px] md:text-sm font-bold uppercase tracking-wide text-center transition-colors ${activeTab === tab
                                        ? 'bg-white border-b-2 border-brand-orange text-brand-orange'
                                        : 'text-gray-500 hover:text-gray-700'
                                        }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                        <div className="p-4 md:p-8">
                            {activeTab === 'description' && (
                                <div className="prose max-w-none text-gray-700">
                                    <p className="mb-4">The <strong>{product.name}</strong> offers superior performance and reliability.</p>
                                    <p>Designed with advanced technology, it ensures long-lasting power backup for your home and office needs. With a {product.warranty} warranty, you can be assured of its quality and durability.</p>
                                </div>
                            )}
                            {activeTab === 'specifications' && (
                                <div className="max-w-4xl mx-auto">
                                    <div className="bg-gray-50 p-6 md:p-8 rounded-xl border border-gray-100 shadow-sm">
                                        <h4 className="font-bold text-gray-900 mb-6 text-lg border-b border-gray-200 pb-4">Technical Details</h4>
                                        <div className="space-y-3 text-sm">
                                            <div className="flex justify-between border-b pb-2"><span>Brand</span> <span className="font-medium">{product.brand}</span></div>
                                            <div className="flex justify-between border-b pb-2"><span>Model Number</span> <span className="font-medium">{product.shortName}</span></div>
                                            <div className="flex justify-between border-b pb-2"><span>Capacity</span> <span className="font-medium">{product.capacity}</span></div>
                                            <div className="flex justify-between border-b pb-2"><span>Voltage</span> <span className="font-medium">{product.voltage || '12V'}</span></div>
                                            <div className="flex justify-between border-b pb-2"><span>Type</span> <span className="font-medium">{product.type}</span></div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {activeTab === 'reviews' && (
                                <div className="space-y-8">
                                    {/* Reviews List */}
                                    <div className="space-y-6">
                                        <h3 className="text-lg font-bold text-gray-900 border-b pb-2">Customer Reviews ({reviews.length})</h3>

                                        {reviews.length === 0 ? (
                                            <p className="text-gray-500 italic">No reviews yet. Be the first to review!</p>
                                        ) : (
                                            reviews.map((review) => (
                                                <div key={review.id} className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                                    <div className="flex justify-between items-start mb-2">
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-8 h-8 rounded-full bg-brand-orange text-white flex items-center justify-center font-bold text-xs">
                                                                {review.user.charAt(0)}
                                                            </div>
                                                            <div>
                                                                <h4 className="font-bold text-sm text-gray-900">{review.user}</h4>
                                                                <div className="flex text-yellow-400 text-xs">
                                                                    {[...Array(5)].map((_, i) => (
                                                                        <span key={i}>{i < review.rating ? "★" : "☆"}</span>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <span className="text-xs text-gray-400">{review.date}</span>
                                                    </div>
                                                    <p className="text-gray-600 text-sm mt-2">{review.comment}</p>
                                                </div>
                                            ))
                                        )}
                                    </div>

                                    {/* Write a Review Form */}
                                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                                        <h4 className="font-bold text-gray-900 mb-4">Write a Review</h4>
                                        <form onSubmit={handleReviewSubmit} className="space-y-4">
                                            {/* Star Rating Input */}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                                                <div className="flex gap-1 text-2xl cursor-pointer">
                                                    {[1, 2, 3, 4, 5].map((star) => (
                                                        <span
                                                            key={star}
                                                            onClick={() => setNewReview({ ...newReview, rating: star })}
                                                            className={`transition-colors ${star <= newReview.rating ? "text-yellow-400" : "text-gray-300 hover:text-yellow-200"}`}
                                                        >
                                                            ★
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                                                    <input
                                                        type="text"
                                                        required
                                                        placeholder="John Doe"
                                                        value={newReview.user}
                                                        onChange={(e) => setNewReview({ ...newReview, user: e.target.value })}
                                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-orange focus:border-transparent outline-none transition-all"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Your Review</label>
                                                <textarea
                                                    required
                                                    rows="3"
                                                    placeholder="Share your experience with this product..."
                                                    value={newReview.comment}
                                                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-orange focus:border-transparent outline-none transition-all"
                                                ></textarea>
                                            </div>

                                            <button
                                                type="submit"
                                                className="px-6 py-2 bg-brand-navy hover:bg-brand-navy/90 text-white font-bold rounded-lg transition-colors shadow-md"
                                            >
                                                Submit Review
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section >
        </div >
    );
}
