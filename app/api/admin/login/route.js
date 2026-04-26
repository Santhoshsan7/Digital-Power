import dbConnect from '@/backend/lib/mongodb';
import Admin from '@/backend/models/Admin';
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        await dbConnect();
        const { username, password } = await req.json();

        const admin = await Admin.findOne({ username: username.toLowerCase() });

        if (!admin || admin.password !== password) {
            return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 });
        }

        return NextResponse.json({ success: true, message: "Login successful" });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
