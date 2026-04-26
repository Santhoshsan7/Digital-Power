import dbConnect from '@/backend/lib/mongodb';
import Admin from '@/backend/models/Admin';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req) {
    try {
        await dbConnect();
        const { username } = await req.json();

        const admin = await Admin.findOne({ username: username.toLowerCase() });

        if (!admin) {
            return NextResponse.json({ success: false, message: "Admin not found" }, { status: 404 });
        }

        // Generate a simple 6-digit recovery token
        const token = Math.floor(100000 + Math.random() * 900000).toString();
        admin.recoveryToken = token;
        await admin.save();

        // Send Email
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.SMTP_EMAIL,
                pass: process.env.SMTP_PASSWORD
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        const mailOptions = {
            from: `"Digital Power Security" <${process.env.SMTP_EMAIL}>`,
            to: admin.recoveryEmail,
            subject: 'Admin Recovery Protocol - Reset Code',
            html: `
                <div style="font-family: sans-serif; padding: 40px; background: #0a0e14; color: white; border-radius: 20px;">
                    <h2 style="color: #ff6b00; margin-bottom: 20px;">Digital Power Admin Recovery</h2>
                    <p style="font-size: 16px; color: #94a3b8;">You have requested a password reset for the Digital Power Hub.</p>
                    <div style="background: rgba(255,107,0,0.1); border: 1px solid #ff6b00; padding: 20px; border-radius: 12px; margin: 30px 0; text-align: center;">
                        <span style="font-size: 32px; font-weight: 900; letter-spacing: 15px; color: #ff6b00;">${token}</span>
                    </div>
                    <p style="font-size: 13px; color: #475569;">If you did not request this, please ignore this email and secure your account.</p>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json({ success: true, message: "Recovery code sent to " + admin.recoveryEmail });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
