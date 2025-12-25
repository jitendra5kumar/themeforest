const express = require('express');
const { getPreview } = require('../controllers/previewController');

const router = express.Router();

router.get('/:id', getPreview);

module.exports = router;