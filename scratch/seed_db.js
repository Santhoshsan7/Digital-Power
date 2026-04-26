import dbConnect from '../backend/lib/mongodb.js';
import Product from '../backend/models/Product.js';
import { inverterProducts } from '../data/products.js';
import { batteryProducts } from '../data/products.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const seed = async () => {
    try {
        console.log("Connecting to MongoDB...");
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected.");

        const count = await Product.countDocuments();
        if (count > 0) {
            console.log(`Database already has ${count} products. Skipping seed.`);
            process.exit(0);
        }

        console.log("Seeding products...");
        const all = [...inverterProducts, ...batteryProducts];
        
        // Add random stock for demo
        const seeded = all.map(p => ({
            ...p,
            stock: Math.floor(Math.random() * 20) + 2
        }));

        await Product.insertMany(seeded);
        console.log(`Successfully seeded ${all.length} products.`);

        process.exit(0);
    } catch (error) {
        console.error("Seed Failed:", error);
        process.exit(1);
    }
};

seed();
