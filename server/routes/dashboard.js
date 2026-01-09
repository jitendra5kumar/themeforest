const express = require('express');
const { getDashboardMetrics } = require('../controllers/dashboardController');
const { auth, sellerAuth } = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, sellerAuth, getDashboardMetrics);

module.exports = router;
