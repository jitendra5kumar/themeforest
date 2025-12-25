const Order = require('../models/Order');

const getOrders = async (req, res) => {
  try {
   
    const orders = await Order.find({ buyer: req.user._id }).populate('items.product');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('items.product');
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createOrder = async (req, res) => {
  try {
    console.log("req.body",req.body)
    const order = new Order({ ...req.body, user: req.user._id });
    await order.save();
    res.status(201).json(order);
  } catch (error) {
 
    res.status(400).json({ message: error.message });
  }
};

const updateOrder = async (req, res) => {
  try {
    const order = await Order.findOneAndUpdate({ _id: req.params.id, user: req.user._id }, req.body, { new: true });
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getOrders, getOrder, createOrder, updateOrder };