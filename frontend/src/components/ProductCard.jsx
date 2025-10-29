// src/components/ProductCard.jsx
export default function ProductCard({ product, onAdd }) {
  return (
    <article style={{
      border: '1px solid #e5e7eb',
      borderRadius: 8,
      padding: 12,
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }}>
      <div style={{
        width: '100%',
        aspectRatio: '1 / 1',
        background: '#f3f4f6',
        borderRadius: 6,
        display: 'grid',
        placeItems: 'center',
        fontSize: 12,
        color: '#6b7280'
      }}>
        {product.image ? (
          <img src={product.image} alt={product.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
        ) : (
          <span>No Image</span>
        )}
      </div>
      <h3 style={{ margin: 0, fontSize: 16 }}>{product.name}</h3>
      <p style={{ margin: 0, color: '#6b7280', fontSize: 14 }}>{product.description}</p>
      <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <strong>₹ {Number(product.price).toFixed(2)}</strong>
        <button onClick={onAdd} style={{
          padding: '8px 12px',
          borderRadius: 6,
          background: '#111827',
          color: 'white',
          border: 'none',
          cursor: 'pointer'
        }}>
          Add to Cart
        </button>
      </div>
    </article>
  );
}
