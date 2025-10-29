// routes/cartRoutes.js
const express = require('express');
const Cart = require('../models/Cart');
const Product = require('../models/Product');

const router = express.Router();

const calcSubtotal = (items) =>
  items.reduce((sum, it) => sum + it.price * it.quantity, 0);

// GET /api/cart - fetch active cart
router.get('/', async (req, res, next) => {
  try {
    const userId = req.headers['x-session-id'] || 'guest';
    let cart = await Cart.findOne({ userId, active: true }).lean();

    if (!cart) {
      cart = await Cart.create({ userId, items: [], subtotal: 0, active: true });
      // fetch the created doc lean again for consistent shape
      cart = await Cart.findById(cart._id).lean();
    }

    return res.json({
      items: cart.items,
      subtotal: cart.subtotal,
      total: cart.subtotal
    });
  } catch (err) {
    return next(err);
  }
});

// POST /api/cart - add or increment an item
router.post('/', async (req, res, next) => {
  try {
    const { productId, qty } = req.body;
    if (!productId || !qty || qty < 1) {
      return res.status(400).json({ message: 'productId and qty (>=1) are required' });
    }

    const product = await Product.findById(productId).lean();
    if (!product) return res.status(404).json({ message: 'Product not found' });

    const userId = req.headers['x-session-id'] || 'guest';
    let cart = await Cart.findOne({ userId, active: true });

    if (!cart) {
      cart = new Cart({ userId, items: [], subtotal: 0, active: true });
    }

    const idx = cart.items.findIndex((it) => String(it.productId) === String(productId));

    if (idx > -1) {
      cart.items[idx].quantity += qty;
      cart.items[idx].total = cart.items[idx].price * cart.items[idx].quantity;
    } else {
      cart.items.push({
        productId: product._id,
        name: product.name,
        price: product.price,
        quantity: qty,
        total: product.price * qty
      });
    }

    cart.subtotal = calcSubtotal(cart.items);
    await cart.save();

    return res.json({
      message: 'Item added to cart',
      cart: { items: cart.items, subtotal: cart.subtotal, total: cart.subtotal }
    });
  } catch (err) {
    return next(err);
  }
});

// DELETE /api/cart/:id - remove item by cart item _id
router.delete('/:id', async (req, res, next) => {
  try {
    const itemId = req.params.id;
    const userId = req.headers['x-session-id'] || 'guest';

    const cart = await Cart.findOne({ userId, active: true });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    const before = cart.items.length;
    cart.items = cart.items.filter((it) => String(it._id) !== String(itemId));
    if (cart.items.length === before) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    cart.subtotal = calcSubtotal(cart.items);
    await cart.save();

    return res.json({
      message: 'Item removed from cart',
      cart: { items: cart.items, subtotal: cart.subtotal, total: cart.subtotal }
    });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
