import { NextResponse } from 'next/server';
import dbConnect from '@/backend/lib/mongodb';
import Customer from '@/backend/models/Customer';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        await dbConnect();
        const customers = await Customer.find().sort({ joinedAt: -1 });
        return NextResponse.json({ success: true, customers });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
