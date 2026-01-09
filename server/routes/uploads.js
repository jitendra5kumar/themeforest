const express = require('express');
const { uploadImage } = require('../controllers/uploadController');
const { auth, sellerAuth, adminAuth } = require('../middlewares/auth');

const router = express.Router();

// Allow sellers and admins to upload images
router.post('/', auth, sellerAuth, uploadImage);

module.exports = router;
