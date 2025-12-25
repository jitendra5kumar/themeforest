const Payout = require('../models/Payout');

// Get all payouts for the logged-in user
const getPayouts = async (req, res) => {
  try {
    const payouts = await Payout.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(payouts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Request a new payout
const requestPayout = async (req, res) => {
  try {
    const payout = new Payout({
      user: req.user._id,
      amount: req.body.amount,
      method: req.body.method || 'stripe',
      status: 'pending',
    });
    await payout.save();
    res.status(201).json(payout);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getPayouts, requestPayout };