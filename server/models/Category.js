const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String },
    slug: { type: String, required: true, unique: true, lowercase: true, index: true },
    image: { type: String },
    parent: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Category', categorySchema);