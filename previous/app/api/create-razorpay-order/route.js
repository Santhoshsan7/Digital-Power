import Razorpay from 'razorpay';
import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const { amount, currency } = await request.json();

        // ⚠️ REAL PAYMENT GATEWAY INTEGRATION
        // You must add these keys in your .env.local file
        // To get keys: Sign up at https://dashboard.razorpay.com/
        const instance = new Razorpay({
            key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        });

        const options = {
            amount: amount * 100, // amount in the smallest currency unit (paise)
            currency: currency,
            receipt: "order_rcptid_" + Date.now(),
        };

        const order = await instance.orders.create(options);

        return NextResponse.json(order);
    } catch (error) {
        console.error("Razorpay Error:", error);
        // Fallback for development if keys are missing
        if (!process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID) {
            return NextResponse.json({
                error: "Razorpay API Keys Not Found",
                message: "Please add NEXT_PUBLIC_RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET to .env.local"
            }, { status: 500 });
        }
        return NextResponse.json({ message: error.message || "Razorpay Error" }, { status: 500 });
    }
}
