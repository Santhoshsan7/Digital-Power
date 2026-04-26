import dbConnect from '../../../../backend/lib/mongodb.js';
import Order from '../../../../backend/models/Order.js';

export async function GET(request) {
    try {
        await dbConnect();
        // Since we don't store actual email logs, we derive them from order events
        const orders = await Order.find().sort({ createdAt: -1 }).limit(50);
        
        const logs = [];
        orders.forEach(order => {
            // Confirmation Email Log
            logs.push({
                id: order.orderId,
                email: order.customer.email,
                status: "Sent",
                type: "Order Confirmation",
                date: new Date(order.createdAt).toLocaleString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })
            });
            
            // Cancellation Email Log if applicable
            if (order.orderStatus === 'Cancelled') {
                logs.push({
                    id: order.orderId,
                    email: order.customer.email,
                    status: "Sent",
                    type: "Order Cancellation",
                    date: new Date(order.updatedAt).toLocaleString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })
                });
            }
        });

        return new Response(JSON.stringify({ success: true, logs: logs.sort((a, b) => new Date(b.date) - new Date(a.date)) }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        return new Response(JSON.stringify({ success: false, message: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
