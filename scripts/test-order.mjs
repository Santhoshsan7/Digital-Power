import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

// Import after env config
const { createOrder } = await import('../backend/controllers/orderController.js');

async function test() {
    try {
        console.log('Testing order creation...');
        
        const testOrder = {
            userDetails: {
                name: "Test Customer",
                email: "sandsparkey@gmail.com",
                phone: "9876543210",
                address: "123, Test Street, Chennai"
            },
            items: [
                {
                    id: 1,
                    name: "Microtek Super Power 1100",
                    brand: "Microtek",
                    salePrice: 6299,
                    quantity: 1,
                    image: "/images/products/microtek.png"
                }
            ],
            total: 6299,
            gstAmount: 1133,
            shippingCost: 0
        };

        const result = await createOrder(testOrder);
        console.log('Order created:', result);
        
        process.exit(0);
    } catch (e) {
        console.error('Test failed:', e);
        process.exit(1);
    }
}

test();
