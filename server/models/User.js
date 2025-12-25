const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, index: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['buyer', 'seller', 'admin'], default: 'buyer', index: true },
    status: { type: String, enum: ['active', 'blocked'], default: 'active', index: true },
    avatar: { type: String },
    bio: { type: String },
    website: { type: String },
    socialLinks: {
      twitter: String,
      linkedin: String,
      github: String,
    },
    refreshToken: { type: String },
    isVerified: { type: Boolean, default: false },
    seller: {
      earnings: { type: Number, default: 0 },
      pendingPayout: { type: Number, default: 0 },
      totalPayouts: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);