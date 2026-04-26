import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env.local') });

// Dynamically import backend modules after dotenv is ready
const { default: dbConnect } = await import('../backend/lib/mongodb.js');
const { default: Product } = await import('../backend/models/Product.js');

async function fixImageExtensions() {
    await dbConnect();
    console.log("Connected to DB to fix image extensions...");

    const products = await Product.find({ 
        image: /luminous-zelio-1100-rc18000-combo-v1-front\.png$/ 
    });

    if (products.length === 0) {
        console.log("No products found with .png extension for Luminous Zelio combo.");
    }

    for (const product of products) {
        product.image = product.image.replace('.png', '.jpg');
        await product.save();
        console.log(`Updated image for: ${product.name}`);
    }

    console.log("Fix complete.");
    process.exit(0);
}

fixImageExtensions().catch(err => {
    console.error(err);
    process.exit(1);
});
