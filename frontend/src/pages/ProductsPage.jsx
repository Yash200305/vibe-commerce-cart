// src/pages/ProductsPage.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    const api = axios.create({ baseURL: API_BASE });
    api
      .get('/api/products')
      .then(({ data }) => setProducts(data))
      .catch(() => setProducts([]));
  }, []);

  return (
    <main style={{ padding: '1rem' }}>
      <h2>Products</h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
        gap: '16px'
      }}>
        {products.map((p) => (
          <ProductCard key={p._id} product={p} onAdd={() => addToCart(p._id, 1)} />
        ))}
      </div>
    </main>
  );
}
