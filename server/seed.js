const mongoose = require('mongoose');
const User = require('./models/User');
const Product = require('./models/Product');
const Category = require('./models/Category');
require('dotenv').config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    // Clear existing data
    await User.deleteMany();
    await Product.deleteMany();
    await Category.deleteMany();

    // Create categories
    const categories = await Category.insertMany([
      { name: 'WordPress', slug: 'wordpress' },
      { name: 'HTML', slug: 'html' },
      { name: 'React', slug: 'react' },
    ]);

    // Create users
    const users = await User.insertMany([
      { name: 'Admin', email: 'admin@example.com', password: '$2a$10$hashedpassword', role: 'admin' },
      { name: 'Seller', email: 'seller@example.com', password: '$2a$10$hashedpassword', role: 'seller' },
      { name: 'Buyer', email: 'buyer@example.com', password: '$2a$10$hashedpassword', role: 'user' },
    ]);

    // Create products
    await Product.insertMany([
      {
        title: 'Premium WordPress Theme',
        description: 'A beautiful WordPress theme',
        price: 49,
        images: ['https://via.placeholder.com/300'],
        category: categories[0]._id,
        seller: users[1]._id,
        status: 'active',
      },
      {
        title: 'React Dashboard',
        description: 'Modern React dashboard template',
        price: 79,
        images: ['https://via.placeholder.com/300'],
        category: categories[2]._id,
        seller: users[1]._id,
        status: 'active',
      },
    ]);

    console.log('Data seeded successfully');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedData();