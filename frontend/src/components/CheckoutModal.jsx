// src/components/CheckoutModal.jsx
export default function CheckoutModal({ open, receipt, onClose }) {
  if (!open || !receipt) return null;

  return (
    <div role="dialog" aria-modal="true" style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
      display: 'grid', placeItems: 'center', padding: 16, zIndex: 50
    }}>
      <div style={{
        background: 'white', borderRadius: 10, padding: 16, width: 'min(640px, 92vw)'
      }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: 0 }}>Order Receipt</h3>
          <button onClick={onClose} aria-label="Close" style={{
            border: 'none', background: 'transparent', fontSize: 18, cursor: 'pointer'
          }}>✕</button>
        </header>

        <section style={{ marginTop: 12, display: 'grid', gap: 8 }}>
          <div><strong>Order ID:</strong> {receipt.orderId}</div>
          <div><strong>Name:</strong> {receipt.customerName}</div>
          <div><strong>Email:</strong> {receipt.customerEmail}</div>
          <div><strong>Total:</strong> ₹ {Number(receipt.total).toFixed(2)}</div>
          <div><strong>Timestamp:</strong> {new Date(receipt.timestamp).toLocaleString()}</div>
        </section>

        <section style={{ marginTop: 12 }}>
          <h4 style={{ marginTop: 0 }}>Items</h4>
          <ul style={{ margin: 0, paddingLeft: 18 }}>
            {receipt.items.map((it, idx) => (
              <li key={idx}>
                {it.name} × {it.quantity} — ₹ {(it.price * it.quantity).toFixed(2)}
              </li>
            ))}
          </ul>
        </section>

        <footer style={{ marginTop: 16, textAlign: 'right' }}>
          <button onClick={onClose} style={{
            padding: '8px 12px', borderRadius: 6, border: '1px solid #e5e7eb', background: '#f9fafb'
          }}>
            Close
          </button>
        </footer>
      </div>
    </div>
  );
}
