const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, index: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    discountPrice: { type: Number },
    images: [{ type: String }],
    thumbnail: { type: String },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true, index: true },
    seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    tags: [{ type: String }],
    livePreviewUrl: { type: String },
    downloadUrl: { type: String },
    fileSize: { type: Number },
    downloads: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    reviewsCount: { type: Number, default: 0 },
    status: { type: String, enum: ['draft', 'pending', 'approved', 'rejected'], default: 'pending', index: true },
    rejectionReason: { type: String },
    license: { type: String, enum: ['single', 'multi', 'extended'], default: 'single' },
    earnings: {
      gross: { type: Number, default: 0 },
      net: { type: Number, default: 0 },
      commission: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);