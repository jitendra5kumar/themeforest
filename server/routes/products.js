const express = require('express');
const { getProducts, getProduct, createProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const { auth, sellerAuth } = require('../middleware/auth');

const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProduct);
router.post('/', auth, sellerAuth, createProduct);
router.put('/:id', auth, sellerAuth, updateProduct);
router.delete('/:id', auth, sellerAuth, deleteProduct);

module.exports = router;