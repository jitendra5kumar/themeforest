const User = require('../models/User');

const getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    // Prevent self-blocking or self-demotion for admins
    if (req.user._id.toString() === req.params.id) {
      if (req.body.role && req.body.role !== 'admin') {
        return res.status(400).json({ message: "You cannot change your own role from admin." });
      }
      if (req.body.status && req.body.status === 'blocked') {
        return res.status(400).json({ message: "You cannot block your own account." });
      }
    }

    // Only allow updating allowed fields
    const allowedFields = ['role', 'status', 'isVerified', 'name', 'email', 'avatar', 'bio', 'website', 'socialLinks'];
    const update = {};
    for (const key of allowedFields) {
      if (req.body[key] !== undefined) update[key] = req.body[key];
    }

    // Validate role and status
    if (update.role && !['admin', 'seller', 'buyer'].includes(update.role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }
    if (update.status && !['active', 'blocked'].includes(update.status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const user = await User.findByIdAndUpdate(req.params.id, update, { new: true }).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getUsers, getUser, updateUser, deleteUser };