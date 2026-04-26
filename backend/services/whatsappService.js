/**
 * WhatsApp Cloud API - Order Notification Utility
 * Provider: Meta WhatsApp Cloud API (Official)
 * Business: Digital Power Inverters Pvt Ltd
 * Business Phone: +91 94459 55555
 */

const WHATSAPP_API_URL = 'https://graph.facebook.com/v21.0';

/**
 * Send a WhatsApp message using the Cloud API
 */
async function sendWhatsAppMessage(to, templateName, templateParams, languageCode = 'en') {
    const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
    const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;

    if (!phoneNumberId || !accessToken) {
        console.warn('WhatsApp credentials not configured. Skipping WhatsApp notification.');
        return { success: false, reason: 'not_configured' };
    }

    // Format phone number: ensure it starts with country code (91 for India)
    let formattedPhone = to.replace(/[\s\-\(\)]/g, ''); // Remove spaces, dashes, parentheses
    if (formattedPhone.startsWith('+')) formattedPhone = formattedPhone.slice(1);
    if (formattedPhone.startsWith('0')) formattedPhone = '91' + formattedPhone.slice(1);
    if (!formattedPhone.startsWith('91') && formattedPhone.length === 10) formattedPhone = '91' + formattedPhone;

    try {
        const response = await fetch(`${WHATSAPP_API_URL}/${phoneNumberId}/messages`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                messaging_product: 'whatsapp',
                to: formattedPhone,
                type: 'template',
                template: {
                    name: templateName,
                    language: { code: languageCode },
                    components: templateParams
                }
            })
        });

        const data = await response.json();

        if (response.ok) {
            console.log(`✅ WhatsApp message sent to ${formattedPhone}`, data);
            return { success: true, messageId: data.messages?.[0]?.id };
        } else {
            console.error('❌ WhatsApp API Error:', data);
            return { success: false, error: data };
        }
    } catch (error) {
        console.error('❌ WhatsApp Send Error:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Send Order Confirmation via WhatsApp
 * Uses a pre-approved template named "order_confirmation"
 * 
 * Template body example:
 * "Thank you for your order, {{1}}! 🎉
 *  Order ID: {{2}}
 *  Items: {{3}}
 *  Total: ₹{{4}}
 *  We'll notify you once shipped. Call +91 94459 55555 for queries."
 */
export async function sendOrderConfirmation(customerPhone, orderData) {
    const { orderId, customerName, itemNames, totalAmount } = orderData;

    // Template parameters map to {{1}}, {{2}}, {{3}}, {{4}} in the approved template
    const templateParams = [
        {
            type: 'body',
            parameters: [
                { type: 'text', text: customerName },
                { type: 'text', text: orderId },
                { type: 'text', text: itemNames },
                { type: 'text', text: totalAmount.toLocaleString('en-IN') }
            ]
        }
    ];

    return sendWhatsAppMessage(customerPhone, 'order_confirmation', templateParams);
}

/**
 * Send a simple text message (for testing with test phone numbers only)
 * This works only when using the WhatsApp test phone number from Meta dashboard
 */
export async function sendTestMessage(to, messageText) {
    const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
    const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;

    if (!phoneNumberId || !accessToken) {
        console.warn('WhatsApp credentials not configured.');
        return { success: false, reason: 'not_configured' };
    }

    let formattedPhone = to.replace(/[\s\-\(\)]/g, '');
    if (formattedPhone.startsWith('+')) formattedPhone = formattedPhone.slice(1);
    if (!formattedPhone.startsWith('91') && formattedPhone.length === 10) formattedPhone = '91' + formattedPhone;

    try {
        const response = await fetch(`${WHATSAPP_API_URL}/${phoneNumberId}/messages`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                messaging_product: 'whatsapp',
                to: formattedPhone,
                type: 'text',
                text: { body: messageText }
            })
        });

        const data = await response.json();
        if (response.ok) {
            console.log(`✅ WhatsApp test message sent to ${formattedPhone}`);
            return { success: true, messageId: data.messages?.[0]?.id };
        } else {
            console.error('❌ WhatsApp Test Error:', data);
            return { success: false, error: data };
        }
    } catch (error) {
        console.error('❌ WhatsApp Test Send Error:', error);
        return { success: false, error: error.message };
    }
}

export default sendWhatsAppMessage;
