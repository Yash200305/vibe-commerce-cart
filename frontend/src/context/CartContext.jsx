// src/context/CartContext.jsx
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

// In App.jsx, mount once:
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// <ToastContainer position="top-right" autoClose={2000} />

// Use Vite env for API base (fallback to localhost during dev) [243]
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const api = axios.create({ baseURL: API_BASE });

// Temporary no-op defaults so consumers won’t crash outside Provider while debugging [265]
const defaultValue = {
  cart: { items: [], subtotal: 0, total: 0 },
  loading: false,
  fetchCart: () => {},
  addToCart: async () => {},
  removeFromCart: async () => {},
  updateQuantity: async () => {}
};

// Create Context with a concrete defaultValue (Provider overrides this when mounted) [265]
const CartContext = createContext(defaultValue);

// Consumer hook
export const useCart = () => {
  const ctx = useContext(CartContext); // returns Provider value or defaultValue if no Provider is found [233]
  // While debugging with a concrete defaultValue, no guard is necessary because ctx is never undefined. [265]
  // For production, prefer createContext(undefined) plus a guard to catch misuse early. [265][233]
  return ctx;
};

// Provider with real implementations
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [], subtotal: 0, total: 0 });
  const [loading, setLoading] = useState(false);

  const fetchCart = async () => {
    try {
      const { data } = await api.get('/api/cart');
      setCart(data);
    } catch (err) {
      console.error(err);
      toast.error('Failed to load cart');
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const addToCart = async (productId, qty = 1) => {
    try {
      setLoading(true);
      const { data } = await api.post('/api/cart', { productId, qty });
      setCart(data.cart);
      toast.success('Added to cart');
    } catch (err) {
      console.error(err);
      const msg = err?.response?.data?.message || 'Add to cart failed';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (cartItemId) => {
    try {
      const { data } = await api.delete(`/api/cart/${cartItemId}`);
      setCart(data.cart);
      toast.info('Removed from cart');
    } catch (err) {
      console.error(err);
      const msg = err?.response?.data?.message || 'Remove failed';
      toast.error(msg);
    }
  };

  // Update by removing and re-adding with newQuantity to match backend endpoints shape
  const updateQuantity = async (cartItem, newQuantity) => {
    if (newQuantity < 1) return removeFromCart(cartItem._id);
    try {
      setLoading(true);
      // Remove then re-add desired quantity
      await api.delete(`/api/cart/${cartItem._id}`);
      const { data } = await api.post('/api/cart', {
        productId: cartItem.productId,
        qty: newQuantity
      });
      setCart(data.cart);
      toast.success('Quantity updated');
    } catch (err) {
      console.error(err);
      toast.error('Update quantity failed');
      fetchCart(); // resync from server
    } finally {
      setLoading(false);
    }
  };

  const value = useMemo(
    () => ({ cart, loading, fetchCart, addToCart, removeFromCart, updateQuantity }),
    [cart, loading]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartContext;
