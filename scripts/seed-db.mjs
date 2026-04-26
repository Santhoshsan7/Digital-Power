import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

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
  inStock: { type: Boolean },
  stock: { type: Number },
  gallery: [String],
  createdAt: { type: Date, default: Date.now }
});

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

const MONGODB_URI = process.env.MONGODB_URI;

const sampleProducts = [
    {
        id: 1,
        name: "Microtek Super Power 1100 Pure Sine wave 12V Inverter",
        shortName: "Super Power 1100",
        brand: "Microtek",
        category: "Inverter",
        originalPrice: 10090,
        salePrice: 6299,
        image: "/images/products/microtek-superpower-1100-v2-front.png",
        stock: 15
    },
    {
        id: 2,
        name: "Exide Inva Master IMTT1500 150AH Tubular Battery",
        shortName: "IMTT1500 150AH",
        brand: "Exide",
        category: "Battery",
        originalPrice: 18500,
        salePrice: 14500,
        image: "/images/products/exide-invamaster-imtt1500.png",
        stock: 8
    },
    {
        id: 3,
        name: "Luminous Zelio+ 1100 Home Pure Sine Wave Inverter",
        shortName: "Zelio+ 1100",
        brand: "Luminous",
        category: "Inverter",
        originalPrice: 9500,
        salePrice: 5800,
        image: "/images/products/luminous-zelio-1100.png",
        stock: 4
    }
];

async function seed() {
  if (!MONGODB_URI) {
    console.error('MONGODB_URI not found');
    process.exit(1);
  }

  await mongoose.connect(MONGODB_URI);
  console.log('Connected to MongoDB');

  console.log(`Seeding ${sampleProducts.length} sample products...`);

  for (const p of sampleProducts) {
    try {
      await Product.findOneAndUpdate(
        { id: p.id },
        { ...p, inStock: true },
        { upsert: true, new: true }
      );
    } catch (err) {
      console.error(`Failed: ${p.name}`, err.message);
    }
  }

  console.log('Seed completed successfully!');
  process.exit(0);
}

seed();
