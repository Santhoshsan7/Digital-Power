import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
    try {
        const data = await request.json();
        const { fullName, email, phone, message } = data;

        // Create a transporter using Google SMTP (same as order API)
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

        const mailOptions = {
            from: process.env.SMTP_EMAIL,
            to: 'sandsparkey@gmail.com', // Admin email to receive inquiries
            subject: `New Contact Inquiry from ${fullName}`,
            html: `
                <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
                    <div style="background-color: #F15A24; padding: 25px; text-align: center;">
                        <h1 style="color: #ffffff; margin: 0; font-size: 24px;">New Website Inquiry</h1>
                        <p style="color: #ffffff; margin: 5px 0 0; opacity: 0.9;">Inquiry from ${fullName}</p>
                    </div>
                    
                    <div style="padding: 30px; background-color: #ffffff;">
                        <div style="background-color: #fff3e0; border: 1px solid #ffe0b2; padding: 15px; border-radius: 6px; margin-bottom: 25px; text-align: center;">
                            <strong style="color: #e65100; font-size: 16px;">📩 New Message Received</strong>
                            <p style="margin: 5px 0 0; color: #555;">A customer has sent a message through the website contact form.</p>
                        </div>

                        <h3 style="color: #333; border-bottom: 2px solid #f0f0f0; padding-bottom: 10px; margin-top: 0;">👤 Customer Information</h3>
                        <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px;">
                            <tr>
                                <td style="padding: 10px 0; color: #666; width: 100px;">Name:</td>
                                <td style="padding: 10px 0; font-weight: bold; color: #333;">${fullName}</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px 0; color: #666;">Email:</td>
                                <td style="padding: 10px 0; color: #333;"><a href="mailto:${email}" style="color: #F15A24; text-decoration: none;">${email}</a></td>
                            </tr>
                            <tr>
                                <td style="padding: 10px 0; color: #666;">Phone:</td>
                                <td style="padding: 10px 0; color: #333;"><a href="tel:${phone}" style="color: #333; text-decoration: none;">${phone}</a></td>
                            </tr>
                        </table>

                        <h3 style="color: #333; border-bottom: 2px solid #f0f0f0; padding-bottom: 10px;">💬 Message Content</h3>
                        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; border-left: 4px solid #F15A24; margin-top: 15px;">
                            <p style="font-size: 16px; line-height: 1.6; color: #333; margin: 0;">${message.replace(/\n/g, '<br>')}</p>
                        </div>
                        
                        <div style="margin-top: 40px; font-size: 12px; color: #999; text-align: center; border-top: 1px solid #eee; padding-top: 20px;">
                            Sent on ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}<br>
                            <strong>Digital Power Inverters & Solutions</strong>
                        </div>
                    </div>
                </div>
            `,
        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json({ success: true, message: 'Message sent successfully!' });
    } catch (error) {
        console.error('Error sending contact email:', error);
        return NextResponse.json({ success: false, message: 'Failed to send message.' }, { status: 500 });
    }
}
