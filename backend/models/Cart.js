// models/Cart.js
const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema(
  {
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    quantity: { type: Number, required: true, min: 1, default: 1 },
    total: { type: Number, required: true, min: 0 }
  },
  { _id: true }
);

const cartSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, index: true }, // session/user key
    items: { type: [cartItemSchema], default: [] },
    subtotal: { type: Number, default: 0, min: 0 },
    active: { type: Boolean, default: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Cart', cartSchema);
