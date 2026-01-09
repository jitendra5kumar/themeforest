const Product = require('../models/Product');
const Order = require('../models/Order');

// Get dashboard metrics for a seller
const getDashboardMetrics = async (req, res) => {
  try {
    const sellerId = req.user._id;
    // Total sales and revenue
    const orders = await Order.find({ 'items.seller': sellerId, status: { $in: ['paid', 'pending', 'refunded'] } });
    let totalSales = 0;
    let totalRevenue = 0;
    let pendingProducts = 0;
    let activeProducts = 0;
    let refundRequests = 0;
    let topProducts = {};
    orders.forEach(order => {
      order.items.forEach(item => {
        if (item.seller.toString() === sellerId.toString()) {
          totalSales += item.quantity;
          totalRevenue += item.netAmount;
          if (!topProducts[item.product]) {
            topProducts[item.product] = { sales: 0, revenue: 0 };
          }
          topProducts[item.product].sales += item.quantity;
          topProducts[item.product].revenue += item.netAmount;
        }
      });
      if (order.status === 'refunded') refundRequests++;
    });
    // Pending and active products
    pendingProducts = await Product.countDocuments({ seller: sellerId, status: 'pending' });
    activeProducts = await Product.countDocuments({ seller: sellerId, status: 'approved' });
    // Get product names for top products
    const productIds = Object.keys(topProducts);
    const products = await Product.find({ _id: { $in: productIds } });
    const topProductsArr = products.map(p => ({
      name: p.title,
      sales: topProducts[p._id]?.sales || 0,
      revenue: topProducts[p._id]?.revenue || 0,
      status: p.status
    })).sort((a, b) => b.sales - a.sales).slice(0, 5);
    res.json({
      totalSales,
      totalRevenue,
      pendingProducts,
      activeProducts,
      refundRequests,
      topProducts: topProductsArr
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getDashboardMetrics };