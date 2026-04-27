import dbConnect from '../lib/mongodb.js';
import Order from '../models/Order.js';
import Customer from '../models/Customer.js';
import Product from '../models/Product.js';
import { sendOrderEmail } from '../services/emailService.js';
import { sendOrderConfirmation as sendWhatsAppConfirmation } from '../services/whatsappService.js';

export const createOrder = async (orderData) => {
    await dbConnect();
    const { product, quantity, total, userDetails, items, gstAmount, promoDiscount, shippingCost } = orderData;

    // Generate Unique Sequential Order ID
    const orderCount = await Order.countDocuments();
    const nextOrderNumber = 1000 + orderCount + 1;
    const orderId = `ORD-${nextOrderNumber}`;

    // 1. Prepare Order Data
    const orderItems = items && items.length > 0 ? items.map(item => ({
        productId: item._id || item.id,
        name: item.name,
        brand: item.brand,
        image: item.image,
        quantity: item.quantity,
        price: item.salePrice
    })) : [{
        name: product?.name,
        brand: product?.brand,
        image: product?.image,
        quantity: quantity,
        price: product?.salePrice || (total / quantity)
    }];

    // 2. Save Order to MongoDB
    const sanitizePrice = (val) => {
        if (!val) return 0;
        return Number(String(val).replace(/[^\d.]/g, ''));
    };

    const newOrder = await Order.create({
        orderId,
        items: orderItems,
        totalAmount: sanitizePrice(total),
        gstAmount: sanitizePrice(gstAmount),
        promoDiscount: sanitizePrice(promoDiscount),
        shippingCost: sanitizePrice(shippingCost),
        customer: {
            name: userDetails.name,
            email: userDetails.email,
            phone: userDetails.phone,
            address: userDetails.address
        }
    });

    // 3. Upsert Customer Profile
    await Customer.findOneAndUpdate(
        { $or: [{ phone: userDetails.phone }, { email: userDetails.email }] },
        { 
            $set: { 
                name: userDetails.name, 
                email: userDetails.email, 
                address: userDetails.address,
                lastActive: new Date()
            },
            $push: { orders: newOrder._id }
        },
        { upsert: true, new: true }
    );

    // 4. Update Product Stock
    for (const item of orderItems) {
        if (item.productId) {
            const isObjectId = typeof item.productId === 'string' && item.productId.length === 24 && /^[0-9a-fA-F]+$/.test(item.productId);
            const query = isObjectId 
                ? { $or: [{ _id: item.productId }, { id: item.productId }] }
                : { id: item.productId };
                
            await Product.findOneAndUpdate(query, { $inc: { stock: -(item.quantity) } });
        }
    }

    // 5. Send Emails
    try {
        await sendOrderEmail(orderId, userDetails, orderItems, total, 'admin');
        if (userDetails.email) {
            await sendOrderEmail(orderId, userDetails, orderItems, total, 'customer');
        }
    } catch (emailError) {
        console.error('Email sending failed:', emailError);
    }

    // 6. Send WhatsApp
    try {
        const itemNamesList = orderItems.map(i => i.name).join(', ');
        await sendWhatsAppConfirmation(userDetails.phone, {
            orderId,
            customerName: userDetails.name,
            itemNames: itemNamesList,
            totalAmount: total
        });
    } catch (waError) {
        console.error('WhatsApp notification failed:', waError);
    }

    return { success: true, orderId };
};

export const getOrders = async () => {
    await dbConnect();
    const orders = await Order.find().sort({ createdAt: -1 });
    return { success: true, orders };
};

export const updateOrderStatus = async (id, status) => {
    await dbConnect();
    const order = await Order.findByIdAndUpdate(id, { orderStatus: status }, { new: true });
    if (!order) {
        // Try fallback for legacy IDs
        const altOrder = await Order.findOneAndUpdate({ orderId: id }, { orderStatus: status }, { new: true });
        if (!altOrder) return { success: false, message: 'Order not found' };
        return { success: true, order: altOrder };
    }
    return { success: true, order };
};
