import { NextResponse } from 'next/server';
import { getDashboardStats } from '@/backend/controllers/statsController';

export const dynamic = 'force-dynamic';

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const period = searchParams.get('period') || 'Weekly';
        
        const result = await getDashboardStats(period);
        return NextResponse.json(result);
    } catch (error) {
        console.error('Stats Route Error:', error);
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
