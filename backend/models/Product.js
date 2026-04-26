import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  id: { type: Number, unique: true }, // Legacy ID from data/products.js
  name: { type: String, required: true },
  shortName: { type: String },
  brand: { type: String },
  category: { type: String },
  type: { type: String },
  originalPrice: { type: Number },
  salePrice: { type: Number },
  discount: { type: String },
  image: { type: String },
  rating: { type: Number, default: 4.5 },
  reviews: { type: Number, default: 0 },
  warranty: { type: String },
  voltage: { type: String },
  capacity: { type: String },
  features: [String],
  inStock: { type: Boolean, default: true },
  stock: { type: Number, default: 10 },
  gallery: [String],
  topView: { type: String }, // For special cases identified in previous tasks
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
