const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    type: { type: String, enum: ['sale', 'commission', 'payout', 'refund'], required: true },
    amount: { type: Number, required: true },
    direction: { type: String, enum: ['credit', 'debit'], required: true },
    stripePaymentIntentId: { type: String },
    status: { type: String, enum: ['success', 'failed', 'pending'], default: 'success', index: true },
    metadata: { type: Object },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Transaction', transactionSchema);