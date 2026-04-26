import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const check = async () => {
    await mongoose.connect(process.env.MONGODB_URI);
    const Order = mongoose.model('Order', new mongoose.Schema({ totalAmount: Number }));
    const orders = await Order.find();
    console.log("Found Orders:", JSON.stringify(orders, null, 2));
    process.exit(0);
};
check();
