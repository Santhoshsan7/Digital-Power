import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const dynamic = 'force-dynamic';

// Path to store cancelled orders
const cancelledOrdersPath = path.join(process.cwd(), 'data', 'cancelledOrders.json');

// Helper to check/store cancellation
const checkCancellation = (orderId) => {
    try {
        if (!fs.existsSync(cancelledOrdersPath)) return false;
        const data = JSON.parse(fs.readFileSync(cancelledOrdersPath, 'utf8'));
        return data.includes(orderId);
    } catch (e) {
        return false;
    }
};

const recordCancellation = (orderId) => {
    try {
        let data = [];
        if (fs.existsSync(cancelledOrdersPath)) {
            data = JSON.parse(fs.readFileSync(cancelledOrdersPath, 'utf8'));
        }
        if (!data.includes(orderId)) {
            data.push(orderId);
            fs.writeFileSync(cancelledOrdersPath, JSON.stringify(data, null, 2));
        }
    } catch (e) {
        console.error('Error recording cancellation:', e);
    }
};

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get('orderId');
    if (!orderId) return NextResponse.json({ success: false }, { status: 400 });
    
    const isCancelled = checkCancellation(orderId);
    return NextResponse.json({ success: true, isCancelled });
}

export async function POST(request) {
    try {
        const { orderId, email, productName, productImage, productQty, productTotal, productCapacity } = await request.json();

        if (!orderId || !email) {
            return NextResponse.json({ success: false, message: 'Invalid Request' }, { status: 400 });
        }

        // Create a transporter inside the handler
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.SMTP_EMAIL,
                pass: process.env.SMTP_PASSWORD,
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        // Check if already cancelled
        if (checkCancellation(orderId)) {
            return NextResponse.json({ success: true, alreadyCancelled: true, message: 'Order already cancelled' });
        }

        // Record it first to prevent race conditions during email sending
        recordCancellation(orderId);

        const currentDate = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

        const generateCancelEmailHtml = (title, message, accentColor) => {
            return `
                <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
                    <div style="background-color: ${accentColor}; padding: 20px; text-align: center;">
                        <h1 style="color: #ffffff; margin: 0; font-size: 24px;">${title}</h1>
                        <p style="color: #ffffff; margin: 5px 0 0; opacity: 0.9;">Order ID: ${orderId}</p>
                    </div>
                    
                    <div style="padding: 30px; background-color: #ffffff;">
                        <div style="background-color: #fff5f5; border: 1px solid #fed7d7; padding: 15px; border-radius: 6px; margin-bottom: 25px; text-align: center;">
                            <strong style="color: #c53030; font-size: 16px;">❌ ${message}</strong>
                        </div>

                        <h3 style="color: #333; border-bottom: 2px solid #f0f0f0; padding-bottom: 10px; margin-top: 0;">📦 Cancelled Item</h3>
                        
                        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                            <tr style="border-bottom: 1px solid #eee;">
                                <td style="padding: 10px 0; width: 60px; vertical-align: top;">
                                    ${productImage ? `<img src="${productImage.startsWith('http') ? productImage : `https://digital-power-inverters.vercel.app${productImage}`}" alt="Product" width="50" height="50" style="width: 50px; height: 50px; display: block; object-fit: contain; border-radius: 4px; border: 1px solid #eee;">` : '<div style="width: 50px; height: 50px; background: #f0f0f0; border-radius: 4px;"></div>'}
                                </td>
                                <td style="padding: 10px; vertical-align: top;">
                                    <div style="font-weight: bold; color: #333; font-size: 14px;">${productName || 'Order Item'}</div>
                                    <div style="font-size: 12px; color: #777;">Quantity: ${productQty || 1} ${productCapacity ? `| Capacity: ${productCapacity}` : ''}</div>
                                </td>
                                <td style="padding: 10px; text-align: right; vertical-align: top; font-weight: bold; color: #d32f2f;">
                                    ${productTotal ? `₹${productTotal}` : ''}
                                </td>
                            </tr>
                        </table>

                         <h3 style="color: #333; border-bottom: 2px solid #f0f0f0; padding-bottom: 10px;">👤 Customer Information</h3>
                         <table style="width: 100%; border-collapse: collapse;">
                            <tr>
                                <td style="padding: 8px 0; color: #666; width: 120px;">Email:</td>
                                <td style="padding: 8px 0; font-weight: bold; color: #333;">${email}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 0; color: #666;">Date:</td>
                                <td style="padding: 8px 0; color: #333;">${currentDate}</td>
                            </tr>
                        </table>
                        
                        <div style="margin-top: 30px; font-size: 12px; color: #999; text-align: center; border-top: 1px solid #eee; padding-top: 20px;">
                            Digital Power Inverters & Solutions<br>
                            Quality Inverters, Batteries & Solar Solutions
                        </div>
                    </div>
                </div>
            `;
        };

        // Send emails in parallel to improve speed
        await Promise.all([
            // 1. Email to Admin (Alert)
            transporter.sendMail({
                from: process.env.SMTP_EMAIL,
                to: 'sandsparkey@gmail.com',
                subject: `⚠️ ORDER CANCELLED - ${orderId}`,
                html: generateCancelEmailHtml("Order Cancelled by Customer", "Action Required: Stop Dispatch", "#d32f2f")
            }),
            // 2. Email to Customer (Confirmation)
            transporter.sendMail({
                from: process.env.SMTP_EMAIL,
                to: email,
                subject: `Order Cancelled Successfully - ${orderId}`,
                html: generateCancelEmailHtml("Cancellation Confirmed", "Your order has been cancelled successfully", "#4a5568")
            })
        ]);

        return NextResponse.json({ success: true, message: 'Order cancelled successfully' });

    } catch (error) {
        console.error('Cancellation Error:', error);
        return NextResponse.json({ success: false, message: 'Server Error' }, { status: 500 });
    }
}
