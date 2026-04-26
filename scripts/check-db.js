const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env.local') });

async function check() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');
        
        const productsCount = await mongoose.connection.collection('products').countDocuments();
        const ordersCount = await mongoose.connection.collection('orders').countDocuments();
        const customersCount = await mongoose.connection.collection('customers').countDocuments();
        
        console.log('Product count:', productsCount);
        console.log('Order count:', ordersCount);
        console.log('Customer count:', customersCount);
        
        process.exit(0);
    } catch (e) {
        console.error('Check failed:', e);
        process.exit(1);
    }
}

check();
