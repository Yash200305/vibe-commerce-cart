// src/components/CartItem.jsx
import { useCart } from '../context/CartContext';

export default function CartItem({ item }) {
  const { updateQuantity, removeFromCart, addToCart } = useCart();

  const inc = () => {
    // Faster path: just add 1 more of the same product
    addToCart(item.productId, 1);
  };    

  const dec = () => {
    const nextQty = item.quantity - 1;
    if (nextQty < 1) return removeFromCart(item._id);
    updateQuantity(item, nextQty);
  };

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr auto auto',
      alignItems: 'center',
      gap: 12,
      border: '1px solid #e5e7eb',
      borderRadius: 8,
      padding: 12
    }}>
      <div>
        <div style={{ fontWeight: 600 }}>{item.name}</div>
        <div style={{ color: '#6b7280', fontSize: 14 }}>₹ {item.price.toFixed(2)}</div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <button onClick={dec} aria-label="Decrease" style={{ padding: '4px 10px' }}>-</button>
        <span>{item.quantity}</span>
        <button onClick={inc} aria-label="Increase" style={{ padding: '4px 10px' }}>+</button>
      </div>

      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <strong>₹ {(item.price * item.quantity).toFixed(2)}</strong>
        <button
          onClick={() => removeFromCart(item._id)}
          style={{ padding: '6px 10px', background: '#ef4444', color: 'white', borderRadius: 6, border: 'none' }}
        >
          Remove
        </button>
      </div>
    </div>
  );
}
