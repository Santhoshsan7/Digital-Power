import { NextResponse } from 'next/server';
import dbConnect from '@/backend/lib/mongodb';
import Product from '@/backend/models/Product';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const limit = parseInt(searchParams.get('limit')) || 100;
    
    let query = {};
    if (category) {
        // More robust category matching:
        // 'battery' matches 'Battery', 'Batteries', etc.
        // 'inverter' matches 'Inverter', 'Inverters', etc.
        const base = category.toLowerCase().replace(/ies$/, 'y').replace(/s$/, '');
        query.category = { $regex: new RegExp(`^${base}`, 'i') };
    }

    const products = await Product.find(query)
      .limit(limit)
      .sort({ createdAt: -1 });

    return NextResponse.json({ success: true, products });
  } catch (error) {
    console.error('Products Fetch Error:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function POST(request) {
    try {
        await dbConnect();
        const data = await request.json();
        
        // Ensure numeric fields are numbers
        const productData = {
            ...data,
            originalPrice: Number(data.originalPrice),
            salePrice: Number(data.salePrice),
            stock: Number(data.stock)
        };

        const product = await Product.create(productData);
        return NextResponse.json({ success: true, product });
    } catch (error) {
        console.error('Product Create Error:', error);
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
