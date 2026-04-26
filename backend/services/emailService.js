import nodemailer from 'nodemailer';

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

export const sendOrderEmail = async (orderId, userDetails, orderItems, total, type = 'customer') => {
    const currentDate = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    const generateEmailHtml = (headingText, detailsHeading, statusTitle, statusMessage, showCancelButton = false) => {
        // We might need to handle baseUrl differently if this is called from different contexts
        let baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
        
        const mainItem = orderItems[0];
        const productName = encodeURIComponent(mainItem.name || 'Product');
        const productImage = encodeURIComponent(mainItem.image || '');
        const productQty = mainItem.quantity || 1;
        const productTotal = total || 0;

        const cancelLink = `${baseUrl}/cancel-order?orderId=${orderId}&email=${userDetails.email}&name=${productName}&image=${productImage}&qty=${productQty}&total=${productTotal}`;

        const normalizeImageUrl = (img) => {
            if (!img) return `https://placehold.co/100x100?text=Product`;
            if (img.startsWith('http')) return img;
            return `${baseUrl}${img.startsWith('/') ? img : `/${img}`}`;
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
                        ${orderItems.map(item => `
                            <tr style="border-bottom: 1px solid #eee;">
                                <td style="padding: 10px 0; width: 60px;">
                                    <img src="${normalizeImageUrl(item.image)}" alt="Product" width="50" height="50" style="width: 50px; height: 50px; display: block; object-fit: contain; border-radius: 4px; border: 1px solid #eee;">
                                </td>
                                <td style="padding: 10px;">
                                    <div style="font-weight: bold; color: #333; font-size: 14px;">${item.name}</div>
                                    <div style="font-size: 12px; color: #777;">Brand: ${item.brand || 'N/A'}</div>
                                </td>
                                <td style="padding: 10px; text-align: center; color: #333;">x${item.quantity}</td>
                                <td style="padding: 10px; text-align: right; font-weight: bold; color: #555;">₹${(item.price * item.quantity).toLocaleString('en-IN')}</td>
                            </tr>
                        `).join('')}
                        <tr>
                            <td colspan="4" style="padding-top: 15px; border-top: 2px solid #f0f0f0;">
                                <table style="width: 100%;">
                                    <tr>
                                        <td style="text-align: right; padding: 10px 0; color: #333; font-size: 16px; font-weight: bold;">Grand Total:</td>
                                        <td style="text-align: right; padding: 10px 0; font-weight: bold; color: #F15A24; font-size: 20px;">₹${total.toLocaleString('en-IN')}</td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                    <h3 style="color: #333; border-bottom: 2px solid #f0f0f0; padding-bottom: 10px;">${detailsHeading}</h3>
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr><td style="padding: 8px 0; color: #666;">Name:</td><td style="padding: 8px 0; font-weight: bold; color: #333;">${userDetails.name}</td></tr>
                        <tr><td style="padding: 8px 0; color: #666;">Phone:</td><td style="padding: 8px 0; color: #333;">${userDetails.phone}</td></tr>
                        <tr><td style="padding: 8px 0; color: #666;">Email:</td><td style="padding: 8px 0; color: #333;">${userDetails.email || 'Not Provided'}</td></tr>
                        <tr><td style="padding: 8px 0; color: #666; vertical-align: top;">Address:</td><td style="padding: 8px 0; color: #333; line-height: 1.4;">${userDetails.address}</td></tr>
                    </table>
                    <div style="margin-top: 30px; font-size: 12px; color: #999; text-align: center; border-top: 1px solid #eee; padding-top: 20px;">
                        Order placed on: ${currentDate}<br>Digital Power
                    </div>
                    ${showCancelButton ? `
                    <div style="text-align: center; margin-top: 25px; padding-top: 20px; border-top: 1px dashed #e0e0e0;">
                        <a href="${cancelLink}" style="background-color: #d32f2f; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">Cancel Order</a>
                    </div>
                    ` : ''}
                </div>
            </div>
        `;
    };

    if (type === 'admin') {
        return transporter.sendMail({
            from: process.env.SMTP_EMAIL,
            to: 'admin@digitalpower.in', // Admin Email
            subject: `New Order - ${orderId}`,
            html: generateEmailHtml("New Order Placed", "👤 Customer Details", "Order Received", "New order in system.", false)
        });
    } else {
        return transporter.sendMail({
            from: process.env.SMTP_EMAIL,
            to: userDetails.email,
            subject: `Order Confirmed - ${orderId}`,
            html: generateEmailHtml("Your Order Placed", "👤 Your Details", "Thanks!", "We received your order.", true)
        });
    }
};
