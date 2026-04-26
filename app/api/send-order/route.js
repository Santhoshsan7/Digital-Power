import { NextResponse } from 'next/server';
import { createOrder } from '@/backend/controllers/orderController';

export const dynamic = 'force-dynamic';

export async function POST(request) {
    try {
        const data = await request.json();
        const result = await createOrder(data);
        
        if (result.success) {
            return NextResponse.json({ success: true, orderId: result.orderId });
        } else {
            throw new Error(result.message || 'Failed to create order');
        }
    } catch (error) {
        console.error('Order Route Error:', error);
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}

