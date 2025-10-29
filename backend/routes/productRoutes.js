// routes/productRoutes.js
const express = require('express');
const Product = require('../models/Product');

const router = express.Router();

// GET /api/products - list all products (auto-seed if empty)
router.get('/', async (_req, res, next) => {
  try {
    let products = await Product.find().lean();

    if (products.length === 0) {
      const mockProducts = [
        { name: 'Wireless Headphones', price: 79.99, description: 'Noise-cancelling headphones', image: '', category: 'Electronics' },
        { name: 'Smartphone Stand', price: 24.99, description: 'Adjustable desk holder', image: '', category: 'Accessories' },
        { name: 'USB-C Cable', price: 12.99, description: 'Fast charging 6ft', image: '', category: 'Accessories' },
        { name: 'Laptop Backpack', price: 49.99, description: 'Water-resistant backpack', image: '', category: 'Bags' },
        { name: 'Mechanical Keyboard', price: 129.99, description: 'RGB gaming keyboard', image: '', category: 'Electronics' },
        { name: 'Wireless Mouse', price: 34.99, description: 'Ergonomic mouse', image: '', category: 'Electronics' },
        { name: 'Desk Lamp', price: 39.99, description: 'LED desk lamp', image: '', category: 'Home' },
        { name: 'Water Bottle', price: 19.99, description: 'Insulated steel bottle', image: '', category: 'Lifestyle' }
      ];
      products = await Product.insertMany(mockProducts);
    }

    return res.json(products);
  } catch (err) {
    return next(err);
  }
});

// GET /api/products/:id - single product
router.get('/:id', async (req, res, next) => {
  try {
    const prod = await Product.findById(req.params.id).lean();
    if (!prod) return res.status(404).json({ message: 'Product not found' });
    return res.json(prod);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
