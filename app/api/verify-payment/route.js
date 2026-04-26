import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request) {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await request.json();

        const sign = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSign = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(sign.toString())
            .digest("hex");

        if (razorpay_signature === expectedSign) {
            return NextResponse.json({ success: true, message: "Payment Verified" });
        } else {
            return NextResponse.json({ success: false, message: "Invalid Signature" }, { status: 400 });
        }
    } catch (error) {
        return NextResponse.json({ success: false, message: "Verification failed" }, { status: 500 });
    }
}
