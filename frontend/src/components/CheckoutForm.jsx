// src/components/CheckoutForm.jsx
import { useMemo, useState } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function CheckoutForm({ onSuccess }) {
  const { cart, fetchCart } = useCart();
  const [form, setForm] = useState({ name: '', email: '' });
  const [loading, setLoading] = useState(false);

  const disabled = useMemo(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return (
      !form.name.trim() ||
      !emailRegex.test(form.email) ||
      cart.items.length === 0
    );
  }, [form, cart.items.length]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (disabled) return;

    try {
      setLoading(true);
      const api = axios.create({ baseURL: API_BASE });
      const payload = {
        name: form.name.trim(),
        email: form.email.trim(),
        cartItems: cart.items.map((it) => ({
          productId: it.productId,
          name: it.name,
          price: it.price,
          quantity: it.quantity
        }))
      };
      const { data } = await api.post('/api/checkout', payload);
      toast.success('Order placed!');
      await fetchCart(); // cart is cleared on server
      onSuccess?.(data.receipt);
    } catch (err) {
      const msg = err?.response?.data?.message || 'Checkout failed';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{
      display: 'grid',
      gap: 12,
      border: '1px solid #e5e7eb',
      borderRadius: 8,
      padding: 12
    }}>
      <h3>Checkout</h3>
      <label style={{ display: 'grid', gap: 6 }}>
        <span>Name</span>
        <input
          type="text"
          value={form.name}
          onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
          placeholder="Your name"
          required
        />
      </label>

      <label style={{ display: 'grid', gap: 6 }}>
        <span>Email</span>
        <input
          type="email"
          value={form.email}
          onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
          placeholder="you@example.com"
          required
        />
      </label>

      <button
        type="submit"
        disabled={loading || disabled}
        style={{
          padding: '10px 14px',
          borderRadius: 6,
          background: loading || disabled ? '#9ca3af' : '#0f172a',
          color: 'white',
          border: 'none',
          cursor: loading || disabled ? 'not-allowed' : 'pointer'
        }}
      >
        {loading ? 'Processing…' : 'Place Order'}
      </button>
    </form>
  );
}
