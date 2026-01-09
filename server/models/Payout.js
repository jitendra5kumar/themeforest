const mongoose = require('mongoose');

const payoutSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    amount: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'approved', 'rejected', 'paid'], default: 'pending', index: true },
    method: { type: String, default: 'stripe' },
    requestedAt: { type: Date, default: Date.now },
    processedAt: { type: Date },
    rejectionReason: { type: String },
    transaction: { type: mongoose.Schema.Types.ObjectId, ref: 'Transaction' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Payout', payoutSchema);
