const Category = require('../models/Category');

const slugify = (value = '') =>
  value
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createCategory = async (req, res) => {
  try {
    const { name, description, image, parent } = req.body;
    if (!name) return res.status(400).json({ message: 'Name is required' });

    const slug = slugify(req.body.slug || name);
    const existing = await Category.findOne({ slug });
    if (existing) return res.status(409).json({ message: 'Category slug already exists' });

    const category = new Category({ name, description, image, parent, slug });
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateCategory = async (req, res) => {
  try {
    const updates = { ...req.body };

    if (updates.name && !updates.slug) {
      updates.slug = slugify(updates.name);
    }

    if (updates.slug) {
      const slug = slugify(updates.slug);
      const exists = await Category.findOne({ slug, _id: { $ne: req.params.id } });
      if (exists) return res.status(409).json({ message: 'Category slug already exists' });
      updates.slug = slug;
    }

    const category = await Category.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.json(category);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.json({ message: 'Category deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getCategories, getCategory, createCategory, updateCategory, deleteCategory };