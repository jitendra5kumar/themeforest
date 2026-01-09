const express = require('express');
const { getOrders, getOrder, createOrder, updateOrder } = require('../controllers/orderController');
const { auth } = require('../middlewares/auth');

const router = express.Router();

router.get('/', auth, getOrders);
router.get('/:id', auth, getOrder);
router.post('/', auth, createOrder);
router.put('/:id', auth, updateOrder);

module.exports = router;