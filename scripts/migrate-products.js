const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env.local') });

// Import schemas using require (since this is a standalone script)
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

async function migrate() {
  if (!MONGODB_URI) {
    console.error('MONGODB_URI not found in .env.local');
    process.exit(1);
  }

  await mongoose.connect(MONGODB_URI);
  console.log('Connected to MongoDB');

  // Load products from data/products.js
  // Since it's an ES Module, we might need to handle it or just use the compiled version
  // For simplicity in this script, I'll use a hack to read the data
  // Alternatively, I'll just write a JS file that exports a simple array
  
  const { inverterProducts, batteryProducts, comboProducts, solarProducts, stabilizerProducts, onlineUpsProducts } = require('../data/products_legacy.js');
  
  const allProducts = [
    ...inverterProducts,
    ...batteryProducts,
    ...comboProducts,
    ...solarProducts,
    ...stabilizerProducts,
    ...onlineUpsProducts
  ];

  console.log(`Found ${allProducts.length} products to migrate`);

  for (const p of allProducts) {
    try {
      // Add a default stock if missing
      const productData = {
        ...p,
        stock: p.stock || (p.inStock ? 10 : 0)
      };
      
      await Product.findOneAndUpdate({ id: p.id }, productData, { upsert: true, new: true });
      console.log(`Migrated: ${p.name}`);
    } catch (err) {
      console.error(`Failed to migrate ${p.id}:`, err.message);
    }
  }

  console.log('Migration completed!');
  process.exit(0);
}

migrate();
