const express = require('express');
const { getUsers, getUser, updateUser, deleteUser } = require('../controllers/userController');
const { auth, adminAuth } = require('../middlewares/auth');

const router = express.Router();

router.get('/', auth,  getUsers);
router.get('/:id', auth, getUser);
router.put('/:id', auth, updateUser);
router.delete('/:id', auth, adminAuth, deleteUser);

module.exports = router;