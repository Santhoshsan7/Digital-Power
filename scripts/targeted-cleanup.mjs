import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env.local') });

const { default: dbConnect } = await import('../backend/lib/mongodb.js');
const { default: Order } = await import('../backend/models/Order.js');
const { default: Customer } = await import('../backend/models/Customer.js');

async function targetedCleanup() {
    await dbConnect();
    console.log("Connected to DB...");

    // 1. Remove Customer "Santhanam Kumar"
    const custResult = await Customer.deleteMany({ name: "Santhanam Kumar" });
    console.log(`Deleted ${custResult.deletedCount} customer records for Santhanam Kumar.`);

    // 2. Remove Orders for santhoshpalanivel00@gmail.com
    const orderResult = await Order.deleteMany({ "customer.email": "santhoshpalanivel00@gmail.com" });
    console.log(`Deleted ${orderResult.deletedCount} orders for santhoshpalanivel00@gmail.com.`);

    // 3. Remove orders by Santhanam Kumar as well (to be safe)
    const orderResult2 = await Order.deleteMany({ "customer.name": "Santhanam Kumar" });
    console.log(`Deleted ${orderResult2.deletedCount} additional orders for Santhanam Kumar.`);

    console.log("Cleanup complete.");
    process.exit(0);
}

targetedCleanup().catch(err => {
    console.error(err);
    process.exit(1);
});
