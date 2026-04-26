import { NextResponse } from 'next/server';
import { getOrders, updateOrderStatus } from '@/backend/controllers/orderController';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const result = await getOrders();
        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}

export async function PATCH(request) {
    try {
        const { id, status } = await request.json();
        const result = await updateOrderStatus(id, status);
        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
