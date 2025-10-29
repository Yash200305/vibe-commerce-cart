
// src/pages/CartPage.jsx
import { useMemo, useState } from 'react';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';
import CheckoutForm from '../components/CheckoutForm';
import CheckoutModal from '../components/CheckoutModal';

export default function CartPage() {
  const { cart } = useCart();
  const [receipt, setReceipt] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const totals = useMemo(() => ({
    subtotal: cart.subtotal || 0,
    total: cart.total || cart.subtotal || 0
  }), [cart]);

  const handleCheckoutSuccess = (rcpt) => {
    setReceipt(rcpt);
    setShowModal(true);
  };

  return (
    <main style={{ padding: '1rem' }}>
      <h2>Your Cart</h2>

      {cart.items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <section style={{ display: 'grid', gap: '12px' }}>
            {cart.items.map((it) => (
              <CartItem key={it._id} item={it} />
            ))}
          </section>

          <section style={{ marginTop: '1rem' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              maxWidth: 420
            }}>
              <span>Subtotal:</span>
              <strong>₹ {totals.subtotal.toFixed(2)}</strong>
            </div>
          </section>

          <section style={{ marginTop: '1.25rem', maxWidth: 480 }}>
            <CheckoutForm onSuccess={handleCheckoutSuccess} />
          </section>
        </>
      )}

      <CheckoutModal
        open={showModal}
        receipt={receipt}
        onClose={() => setShowModal(false)}
      />
    </main>
  );
}
