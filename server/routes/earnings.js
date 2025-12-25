const express = require('express');
const { getEarnings } = require('../controllers/earningController');
const { auth } = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, getEarnings);

module.exports = router;
