const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    items: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        quantity: { type: Number, default: 1 },
        price: { type: Number, required: true },
        netAmount: { type: Number, required: true },
        commissionAmount: { type: Number, required: true },
      },
    ],
    totalAmount: { type: Number, required: true },
    netAmount: { type: Number, required: true },
    commissionAmount: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'paid', 'failed', 'refunded'], default: 'pending', index: true },
    paymentIntentId: { type: String },
    checkoutSessionId: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);