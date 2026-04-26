import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env.local') });

const { default: dbConnect } = await import('../backend/lib/mongodb.js');
const { default: Order } = await import('../backend/models/Order.js');
const { default: Product } = await import('../backend/models/Product.js');
const { default: Customer } = await import('../backend/models/Customer.js');

async function cleanupAndSetup() {
    await dbConnect();
    console.log("Connected to DB...");

    // 1. Remove specific orders
    const deleteResult = await Order.deleteMany({
        $or: [
            { orderId: "ORD-1001" },
            { orderId: "ORD-1002" },
            { "customer.name": "Santhanam Kumar" },
            { "customer.name": "Santhosh" }
        ]
    });
    console.log(`Deleted ${deleteResult.deletedCount} orders.`);

    // 2. Set one item to Low Stock
    // Find a product and set stock to 3
    const product = await Product.findOne({ stock: { $gt: 5 } });
    if (product) {
        product.stock = 3;
        await product.save();
        console.log(`Updated ${product.name} to low stock (3).`);
    } else {
        console.log("No product found to set low stock.");
    }

    console.log("Cleanup and Setup complete.");
    process.exit(0);
}

cleanupAndSetup().catch(err => {
    console.error(err);
    process.exit(1);
});
