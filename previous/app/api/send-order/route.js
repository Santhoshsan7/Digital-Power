import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const dynamic = 'force-dynamic';

import fs from 'fs';
import path from 'path';

export async function POST(request) {
    try {
        const data = await request.json();
        const { product, quantity, total, userDetails } = data;

        // Generate Unique Sequential Order ID
        const counterPath = path.join(process.cwd(), 'data', 'orderCounter.json');
        let orderCount = 1000; // Start from 1000 as requested

        // Simple file-based locking/increment (Best effort for non-DB setup)
        try {
            if (fs.existsSync(counterPath)) {
                const fileContent = fs.readFileSync(counterPath, 'utf8');
                const json = JSON.parse(fileContent);
                // Use existing counter if it's already higher than 1000
                orderCount = Math.max(1000, json.lastOrderNumber || 1000);
            }
        } catch (readError) {
            console.error('Error reading order counter:', readError);
        }

        orderCount++;
        const orderId = `ORD-${orderCount}`;

        try {
            fs.writeFileSync(counterPath, JSON.stringify({ lastOrderNumber: orderCount }, null, 2));
        } catch (writeError) {
            console.error('Error updating order counter:', writeError);
        }

        // Create a transporter
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

        const currentDate = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

        const generateEmailHtml = (headingText, detailsHeading, statusTitle, statusMessage, showCancelButton = false) => {
            // Robust Site URL detection for absolute image paths in emails
            let baseUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.URL || '';
            
            if (!baseUrl || baseUrl.includes('localhost')) {
                const host = request.headers.get('host');
                const proto = request.headers.get('x-forwarded-proto') || 'https';
                if (host) {
                    baseUrl = `${proto}://${host}`;
                } else {
                    baseUrl = new URL(request.url).origin;
                }
            }

            // Ensure HTTPS for production domains (Netlify often uses HTTPS)
            if (!baseUrl.includes('localhost') && baseUrl.startsWith('http://')) {
                baseUrl = baseUrl.replace('http://', 'https://');
            }

            // Remove trailing slash to avoid double slashes
            if (baseUrl.endsWith('/')) {
                baseUrl = baseUrl.slice(0, -1);
            }

            // Encode product details for the cancellation page
            const mainItem = data.items && data.items.length > 0 ? data.items[0] : (product || {});
            const productName = encodeURIComponent(mainItem.name || 'Product');
            const productImage = encodeURIComponent(mainItem.image || '');
            const productQty = mainItem.quantity || quantity || 1;
            const productTotal = total || 0;
            const productCapacity = encodeURIComponent(mainItem.capacity || '');

            const cancelLink = `${baseUrl}/cancel-order?orderId=${orderId}&email=${userDetails.email}&name=${productName}&image=${productImage}&qty=${productQty}&total=${productTotal}&capacity=${productCapacity}`;

            // Helper to ensure image URLs are absolute and valid
            const normalizeImageUrl = (img) => {
                if (!img) return `https://placehold.co/100x100?text=Product`; // Fallback
                if (img.startsWith('http')) return img;
                const path = img.startsWith('/') ? img : `/${img}`;
                const finalUrl = `${baseUrl}${path}`;
                return finalUrl;
            };

            return `
                <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
                    <div style="background-color: #F15A24; padding: 20px; text-align: center;">
                        <h1 style="color: #ffffff; margin: 0; font-size: 24px;">${headingText}</h1>
                        <p style="color: #ffffff; margin: 5px 0 0; opacity: 0.9;">Order ID: ${orderId}</p>
                    </div>
                    
                    <div style="padding: 30px; background-color: #ffffff;">
                        <div style="background-color: #e8f5e9; border: 1px solid #c8e6c9; padding: 15px; border-radius: 6px; margin-bottom: 25px; text-align: center;">
                            <strong style="color: #2e7d32; font-size: 16px;">✅ ${statusTitle}</strong>
                            <p style="margin: 5px 0 0; color: #555;">${statusMessage}</p>
                        </div>

                        <h3 style="color: #333; border-bottom: 2px solid #f0f0f0; padding-bottom: 10px; margin-top: 0;">📦 Order Item(s)</h3>
                        
                        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                            ${data.items && data.items.length > 0 ? data.items.map(item => `
                                <tr style="border-bottom: 1px solid #eee;">
                                    <td style="padding: 10px 0; width: 60px;">
                                        <img src="${normalizeImageUrl(item.image)}" alt="Product" width="50" height="50" style="width: 50px; height: 50px; display: block; object-fit: contain; border-radius: 4px; border: 1px solid #eee;">
                                    </td>
                                    <td style="padding: 10px;">
                                        <div style="font-weight: bold; color: #333; font-size: 14px;">${item.name}</div>
                                        <div style="font-size: 12px; color: #777;">Brand: ${item.brand || 'N/A'} ${item.capacity ? `| Capacity: ${item.capacity}` : ''}</div>
                                    </td>
                                    <td style="padding: 10px; text-align: center; color: #333;">x${item.quantity || quantity}</td>
                                    <td style="padding: 10px; text-align: right; font-weight: bold; color: #555;">₹${((item.salePrice || 0) * (item.quantity || 1)).toLocaleString('en-IN')}</td>
                                </tr>
                            `).join('') : `
                                <tr>
                                    <td style="padding: 10px 0; width: 60px;">
                                        <img src="${normalizeImageUrl(product?.image)}" alt="Product" style="width: 50px; height: 50px; display: block; object-fit: contain; border-radius: 4px; border: 1px solid #eee;">
                                    </td>
                                    <td style="padding: 10px;">
                                        <div style="font-weight: bold; color: #333; font-size: 14px;">${product?.name}</div>
                                        <div style="font-size: 12px; color: #777;">Brand: ${product?.brand} ${product?.capacity ? `| Capacity: ${product?.capacity}` : ''} / ${product?.shortName || 'N/A'}</div>
                                    </td>
                                    <td style="padding: 10px; text-align: center; color: #333;">x${quantity}</td>
                                    <td style="padding: 10px; text-align: right; font-weight: bold; color: #F15A24;">₹${total}</td>
                                </tr>
                            `}
                            
                            <!-- Subtotals -->
                            <tr>
                                <td colspan="4" style="padding-top: 15px; border-top: 2px solid #f0f0f0;">
                                    <table style="width: 100%;">
                                        <tr>
                                            <td style="text-align: right; padding: 3px 0; color: #777; font-size: 13px;">Item Subtotal:</td>
                                            <td style="text-align: right; padding: 3px 0; width: 120px; color: #333;">₹${(data.items && data.items.length > 0 ? data.items.reduce((acc, curr) => acc + (curr.salePrice * (curr.quantity || 1)), 0) : (product?.salePrice * quantity)).toLocaleString('en-IN')}</td>
                                        </tr>
                                        ${data.gstAmount ? `
                                        <tr>
                                            <td style="text-align: right; padding: 3px 0; color: #777; font-size: 13px;">GST (18%):</td>
                                            <td style="text-align: right; padding: 3px 0; width: 120px; color: #333;">₹${data.gstAmount.toLocaleString('en-IN')}</td>
                                        </tr>
                                        ` : ''}
                                        ${data.promoDiscount ? `
                                        <tr>
                                            <td style="text-align: right; padding: 3px 0; color: #F15A24; font-size: 13px;">Promo Discount:</td>
                                            <td style="text-align: right; padding: 3px 0; width: 120px; color: #F15A24;">- ₹${data.promoDiscount.toLocaleString('en-IN')}</td>
                                        </tr>
                                        ` : ''}
                                        <tr>
                                            <td style="text-align: right; padding: 3px 0; color: #777; font-size: 13px;">Delivery Charges:</td>
                                            <td style="text-align: right; padding: 3px 0; width: 120px; color: #333;">${data.shippingCost === 0 ? '<span style="color: #2e7d32; font-weight: bold;">FREE</span>' : `₹${data.shippingCost.toLocaleString('en-IN')}`}</td>
                                        </tr>
                                        <tr>
                                            <td style="text-align: right; padding: 10px 0; color: #333; font-size: 16px; font-weight: bold;">Grand Total:</td>
                                            <td style="text-align: right; padding: 10px 0; font-weight: bold; color: #F15A24; font-size: 20px;">₹${total}</td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>

                         <h3 style="color: #333; border-bottom: 2px solid #f0f0f0; padding-bottom: 10px;">${detailsHeading}</h3>
                         <table style="width: 100%; border-collapse: collapse;">
                            <tr>
                                <td style="padding: 8px 0; color: #666;">Name:</td>
                                <td style="padding: 8px 0; font-weight: bold; color: #333;">${userDetails?.name || 'Not Provided'}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 0; color: #666;">Phone:</td>
                                <td style="padding: 8px 0; color: #333;">${userDetails?.phone || 'Not Provided'}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 0; color: #666;">Email:</td>
                                <td style="padding: 8px 0; color: #333;">${userDetails?.email || 'Not Provided'}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 0; color: #666; vertical-align: top;">Delivery Address:</td>
                                <td style="padding: 8px 0; color: #333; line-height: 1.4;">${userDetails?.address || 'Not Provided'}</td>
                            </tr>
                        </table>
                        
                        <div style="margin-top: 30px; font-size: 12px; color: #999; text-align: center; border-top: 1px solid #eee; padding-top: 20px;">
                            Order placed on: ${currentDate}<br>
                            Digital Power Inverters
                        </div>

                        ${showCancelButton ? `
                        <div style="text-align: center; margin-top: 25px; padding-top: 20px; border-top: 1px dashed #e0e0e0;">
                            <p style="color: #666; margin-bottom: 10px; font-size: 13px;">Changed your mind?</p>
                            <a href="${cancelLink}" style="background-color: #d32f2f; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">Cancel Order</a>
                        </div>
                        ` : ''}

                    </div>
                </div>
            `;
        };

        // 1. Send to Admin (Company) -> No Cancel Button
        await transporter.sendMail({
            from: process.env.SMTP_EMAIL,
            to: 'sandsparkey@gmail.com',
            subject: `New Order Placed - ${orderId}`,
            html: generateEmailHtml("New Order Placed", "👤 Customer Details", "Order Received", "Order has been confirmed.", false)
        });

        // 2. Send to Customer -> WITH Cancel Button
        if (userDetails.email) {
            try {
                await transporter.sendMail({
                    from: process.env.SMTP_EMAIL,
                    to: userDetails.email,
                    subject: `Order Confirmation - ${orderId}`,
                    html: generateEmailHtml("Your Order Placed", "👤 Your Details", "Thank You for Your Order", "We have received your order. Our team will contact you shortly.", true)
                });
            } catch (custError) {
                console.error("Failed to send email to customer:", custError);
                // Continue execution
            }
        }

        return NextResponse.json({
            success: true,
            message: 'Order sent successfully!',
            orderId: orderId,
            date: currentDate
        });
    } catch (error) {
        console.error('Error sending email or generating ID:', error);
        return NextResponse.json({ success: false, message: 'Failed to process order.' }, { status: 500 });
    }
}

