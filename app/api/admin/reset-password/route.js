import dbConnect from '@/backend/lib/mongodb';
import Admin from '@/backend/models/Admin';
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        await dbConnect();
        const { username, token, newPassword } = await req.json();

        const admin = await Admin.findOne({ username: username.toLowerCase() });

        if (!admin || !admin.recoveryToken || admin.recoveryToken !== token) {
            return NextResponse.json({ success: false, message: "Invalid or expired recovery code" }, { status: 401 });
        }

        admin.password = newPassword;
        admin.recoveryToken = null;
        await admin.save();

        return NextResponse.json({ success: true, message: "Password updated successfully" });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
