const mongoose = require('mongoose');
const Product = require('../models/Product');

const getPreview = async (req, res) => {
  try {
    const ref = req.params.id;
    const query = mongoose.isValidObjectId(ref) ? { _id: ref } : { slug: ref };
    const product = await Product.findOne(query);

    if (!product || !product.livePreviewUrl) {
      return res.status(404).json({ message: 'Preview not found' });
    }

    res.redirect(product.livePreviewUrl);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getPreview };