import { NextResponse } from 'next/server';
import dbConnect from '@/backend/lib/mongodb';
import Product from '@/backend/models/Product';
import { inverterProducts, batteryProducts } from '@/data/products';

export async function POST(request) {
    try {
        await dbConnect();
        
        // Only seed if empty
        const count = await Product.countDocuments();
        if (count > 0) {
            return NextResponse.json({ 
                success: true, 
                message: `Database already has ${count} products. No seeding needed.` 
            });
        }

        const all = [...inverterProducts, ...batteryProducts];
        
        // Prepare data with stock
        const formatted = all.map(p => ({
            ...p,
            stock: Math.floor(Math.random() * 25) + 5 // Real data usually has some stock
        }));

        const result = await Product.insertMany(formatted);

        return NextResponse.json({ 
            success: true, 
            message: `Successfully seeded ${result.length} products.`,
            count: result.length
        });
    } catch (error) {
        console.error('Seed Error:', error);
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
