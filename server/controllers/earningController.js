const Order = require('../models/Order');

// Get earnings for a seller (total, paid, pending, refunded)
const getEarnings = async (req, res) => {
  try {
    // Only for sellers or admins
    if (!['seller', 'admin'].includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied' });
    }
    // Find all orders where this user is a seller in any item
    const orders = await Order.find({ 'items.seller': req.user._id, status: { $in: ['paid', 'pending', 'refunded'] } });
    let totalEarnings = 0;
    let paidEarnings = 0;
    let pendingEarnings = 0;
    let refundedEarnings = 0;
    let salesCount = 0;
    orders.forEach(order => {
      order.items.forEach(item => {
        if (item.seller.toString() === req.user._id.toString()) {
          salesCount += item.quantity;
          totalEarnings += item.netAmount;
          if (order.status === 'paid') paidEarnings += item.netAmount;
          if (order.status === 'pending') pendingEarnings += item.netAmount;
          if (order.status === 'refunded') refundedEarnings += item.netAmount;
        }
      });
    });
    res.json({
      totalEarnings,
      paidEarnings,
      pendingEarnings,
      refundedEarnings,
      salesCount
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getEarnings };