const express = require('express');
const { getPayouts, requestPayout } = require('../controllers/payoutController');
const { auth } = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, getPayouts);
router.post('/', auth, requestPayout);

module.exports = router;
