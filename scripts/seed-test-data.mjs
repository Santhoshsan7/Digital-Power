import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env.local') });

const { default: dbConnect } = await import('../backend/lib/mongodb.js');
const { default: Order } = await import('../backend/models/Order.js');

async function seedTodayOrder() {
    await dbConnect();
    console.log("Seeding a test order for today to verify graph...");

    // Create a dummy order for roughly 2 PM (index 2 in Daily slot)
    const today = new Date();
    today.setHours(14, 30, 0);

    const orderId = `ORD-TEST-${Math.floor(Math.random() * 1000)}`;
    
    await Order.create({
        orderId,
        items: [{
            name: "Luminous Zelio 1100 + RC18000 Combo",
            quantity: 1,
            price: 18500
        }],
        totalAmount: 18500,
        customer: {
            name: "Test Verification",
            email: "test@example.com",
            phone: "919000000000",
            address: "Dashboard Test Lab"
        },
        createdAt: today,
        updatedAt: today
    });

    console.log(`Created order ${orderId} for today at 2:30 PM.`);
    process.exit(0);
}

seedTodayOrder().catch(err => {
    console.error(err);
    process.exit(1);
});
