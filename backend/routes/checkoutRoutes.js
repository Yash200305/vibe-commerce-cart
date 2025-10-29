// routes/checkoutRoutes.js
const express = require('express');
const Order = require('../models/Order');
const Cart = require('../models/Cart');

const router = express.Router();

const generateOrderId = () =>
  'ORD-' + Date.now() + '-' + Math.random().toString(36).slice(2, 10).toUpperCase();

router.post('/', async (req, res, next) => {
  try {
    const { cartItems, name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: 'Name and email are required' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // simple email validation
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    if (!Array.isArray(cartItems) || cartItems.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    const total = cartItems.reduce(
      (sum, it) => sum + (Number(it.price) * Number(it.quantity)),
      0
    );

    const order = await Order.create({
      orderId: generateOrderId(),
      customerName: name,
      customerEmail: email,
      items: cartItems.map((it) => ({
        productId: it.productId,
        name: it.name,
        price: it.price,
        quantity: it.quantity,
        total: Number(it.price) * Number(it.quantity)
      })),
      total,
      timestamp: new Date()
    });

    const userId = req.headers['x-session-id'] || 'guest';
    await Cart.findOneAndUpdate(
      { userId, active: true },
      { $set: { items: [], subtotal: 0, active: false } }
    );

    return res.json({
      message: 'Order placed successfully',
      receipt: {
        orderId: order.orderId,
        total: order.total,
        timestamp: order.timestamp,
        items: order.items,
        customerName: order.customerName,
        customerEmail: order.customerEmail
      }
    });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
