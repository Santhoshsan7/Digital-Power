import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { allProducts } from './temp_products.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

const ProductSchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  name: { type: String, required: true },
  shortName: { type: String },
  brand: { type: String },
  category: { type: String },
  type: { type: String },
  originalPrice: { type: Number },
  salePrice: { type: Number },
  discount: { type: String },
  image: { type: String },
  rating: { type: Number },
  reviews: { type: Number },
  warranty: { type: String },
  voltage: { type: String },
  capacity: { type: String },
  features: [String],
  inStock: { type: Boolean, default: true },
  stock: { type: Number, default: 10 },
  gallery: [String],
  createdAt: { type: Date, default: Date.now }
});

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

const MONGODB_URI = process.env.MONGODB_URI;

async function seed() {
  if (!MONGODB_URI) {
    console.error('MONGODB_URI not found');
    process.exit(1);
  }

  await mongoose.connect(MONGODB_URI);
  console.log('Connected to MongoDB');

  // Clear existing products first to avoid duplicates or stale data
  await Product.deleteMany({});
  console.log('Cleared existing products');

  console.log(`Seeding all ${allProducts.length} products...`);

  let count = 0;
  for (const p of allProducts) {
    if (!p.id || !p.name) continue;
    try {
      await Product.create({
        ...p,
        stock: p.stock || Math.floor(Math.random() * 20) + 5,
        inStock: p.inStock !== undefined ? p.inStock : true
      });
      count++;
    } catch (err) {
      console.error(`Failed: ${p.name}`, err.message);
    }
  }

  console.log(`${count} products seeded successfully!`);
  process.exit(0);
}

seed();
